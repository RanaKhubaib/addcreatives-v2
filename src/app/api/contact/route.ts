import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/data/site-config";
import { getContactDatabase } from "@/lib/firebase-admin";

export const runtime = "nodejs";

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  website: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const requestCounts = new Map<string, RateLimitEntry>();
const allowedServices = new Set([
  ...siteConfig.services.map((service) => service.title),
  "Something else",
]);

function rateLimitResponse(ip: string) {
  const now = Date.now();

  for (const [key, entry] of requestCounts) {
    if (entry.resetAt <= now) requestCounts.delete(key);
  }

  const entry = requestCounts.get(ip);
  if (!entry || entry.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return null;
  }

  if (entry.count >= rateLimitMax) {
    return NextResponse.json(
      { message: "Too many enquiries. Please try again in a few minutes." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)) },
      },
    );
  }

  entry.count += 1;
  return null;
}

function asText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function getEmailConfig() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || "ADD Creatives Website";
  const hasAnyEmailSetting = Boolean(user || password || recipient);

  if (!hasAnyEmailSetting) return { configured: false as const };
  if (!user || !password || !recipient || !Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP settings are incomplete.");
  }

  return {
    configured: true as const,
    host,
    port,
    user,
    password,
    recipient,
    fromName,
  };
}

async function deliverEmail(
  submission: ContactSubmission,
  config: Exclude<ReturnType<typeof getEmailConfig>, { configured: false }>,
) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
  });
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || "Not provided"),
    service: escapeHtml(submission.service),
    budget: escapeHtml(submission.budget || "Not provided"),
    message: escapeHtml(submission.message).replace(/\n/g, "<br />"),
  };

  await transporter.sendMail({
    from: `"${config.fromName}" <${config.user}>`,
    to: config.recipient,
    replyTo: submission.email,
    subject: `New website enquiry: ${submission.service}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#0a0f1c;line-height:1.6">
        <h1 style="color:#143f7a">New project enquiry</h1>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Service:</strong> ${safe.service}</p>
        <p><strong>Budget:</strong> ${safe.budget}</p>
        <p><strong>Message:</strong><br />${safe.message}</p>
      </div>
    `,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone || "Not provided"}`,
      `Service: ${submission.service}`,
      `Budget: ${submission.budget || "Not provided"}`,
      "",
      submission.message,
    ].join("\n"),
  });

  await transporter.sendMail({
    from: `"${config.fromName}" <${config.user}>`,
    to: submission.email,
    subject: "We received your message | ADD Creatives",
    text: `Hi ${submission.name},\n\nThanks for contacting ADD Creatives. We have received your enquiry about ${submission.service} and will be in touch soon.\n\nADD Creatives\n${config.recipient}`,
  });
}

async function saveSubmission(submission: ContactSubmission): Promise<void> {
  const database = getContactDatabase();
  if (!database) throw new Error("Contact database is unavailable.");

  await database.collection("contactSubmissions").add({
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    service: submission.service,
    budget: submission.budget,
    message: submission.message,
    createdAt: new Date(),
    status: "new",
  });
}

export async function POST(request: NextRequest) {
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedIp || request.headers.get("x-real-ip") || "unknown";
  const limited = rateLimitResponse(ip);
  if (limited) return limited;

  let rawData: unknown;
  try {
    rawData = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please submit the form using the website." },
      { status: 400 },
    );
  }

  if (!rawData || typeof rawData !== "object") {
    return NextResponse.json(
      { message: "The submitted form data is invalid." },
      { status: 400 },
    );
  }

  const data = rawData as Record<string, unknown>;
  const submission: ContactSubmission = {
    name: asText(data.name, 120),
    email: asText(data.email, 254),
    phone: asText(data.phone, 40),
    service: asText(data.service, 120),
    budget: asText(data.budget, 80),
    message: asText(data.message, 4000),
    website: asText(data.website, 200),
  };

  if (submission.website) {
    return NextResponse.json(
      { message: "The enquiry could not be accepted." },
      { status: 400 },
    );
  }

  if (
    !submission.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) ||
    !allowedServices.has(submission.service) ||
    submission.message.length < 10
  ) {
    return NextResponse.json(
      {
        message:
          "Please provide your name, a valid email, a service, and a message of at least 10 characters.",
      },
      { status: 400 },
    );
  }

  let emailConfig: ReturnType<typeof getEmailConfig>;
  let databaseConfigured = false;
  try {
    emailConfig = getEmailConfig();
    const database = getContactDatabase();
    databaseConfigured = Boolean(database);
  } catch (error) {
    console.error("Contact form configuration error:", error);
    return NextResponse.json(
      { message: "The enquiry service is not configured correctly yet." },
      { status: 503 },
    );
  }

  if (!emailConfig.configured && !databaseConfigured) {
    return NextResponse.json(
      {
        message:
          "The enquiry form is not connected yet. Please contact us on WhatsApp or email while setup is completed.",
      },
      { status: 503 },
    );
  }

  const deliveries: Promise<unknown>[] = [];
  if (emailConfig.configured) {
    deliveries.push(deliverEmail(submission, emailConfig));
  }
  if (databaseConfigured) {
    deliveries.push(saveSubmission(submission));
  }

  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    console.error(
      "Contact form delivery failed:",
      failures.map((failure) =>
        failure.status === "rejected" && failure.reason instanceof Error
          ? failure.reason.message
          : "Unknown delivery error",
      ),
    );
    return NextResponse.json(
      {
        message:
          "We could not complete your enquiry. Please contact us using WhatsApp or email instead.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Thanks for getting in touch. We'll reply as soon as we can.",
  });
}
