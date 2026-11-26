import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { COLLECTIONS, getAdminDb } from '@/lib/firebaseAdmin';
import { siteConfig } from '@/data/site-config';

/**
 * NOTE: no `export const runtime = 'nodejs'` here — this project sets
 * `cacheComponents: true` in next.config.ts, and Next 16 rejects any
 * per-route `runtime` export under that setting (build error). The Node.js
 * runtime is the default anyway, which is what Nodemailer and the
 * Firebase Admin SDK need, so the route runs on Node.js as intended.
 */

/**
 * Contact / planner / audit / newsletter submissions.
 *
 * - Validates + sanitizes every field server-side (HTML tags stripped,
 *   values trimmed, length caps enforced).
 * - Honeypot field `website`: bots that fill it get a fake success and
 *   nothing is stored or emailed.
 * - Rate limited to 5 requests/minute per IP (in-memory).
 * - Emails via Nodemailer ONLY when SMTP env vars are set
 *   (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OWNER_EMAIL, MAIL_FROM).
 *   Without them the request still succeeds — the response reports
 *   `emailed: false` and the server log notes the email was skipped.
 *   Set the env vars to start receiving submissions by email.
 * - Saves to Firestore via getAdminDb() when the Admin SDK is configured;
 *   every Firestore write is wrapped in try/catch and never fails the
 *   request. Without keys the submission is logged and still succeeds.
 */

const MAX = {
  name: 100,
  phone: 30,
  company: 120,
  serviceItem: 100,
  budget: 100,
  timeline: 100,
  message: 5000,
  fileLink: 500,
  website: 200,
  source: 200,
} as const;

const submissionSchema = z.object({
  type: z.enum(['contact', 'planner', 'audit', 'newsletter']),
  name: z.string().max(MAX.name).optional(),
  email: z.email(),
  phone: z.string().max(MAX.phone).optional(),
  company: z.string().max(MAX.company).optional(),
  service: z.array(z.string().max(MAX.serviceItem)).max(10).optional(),
  /** Alias sent by the existing contact form (`services`, plural). */
  services: z.array(z.string().max(MAX.serviceItem)).max(10).optional(),
  budget: z.string().max(MAX.budget).optional(),
  timeline: z.string().max(MAX.timeline).optional(),
  message: z.string().max(MAX.message).optional(),
  fileLink: z.string().max(MAX.fileLink).optional(),
  /** Honeypot — real visitors leave this empty. */
  website: z.string().max(MAX.website).optional(),
  choices: z.record(z.string(), z.unknown()).optional(),
  source: z.string().max(MAX.source).optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

type Submission = z.infer<typeof submissionSchema>;

/* ------------------------------------------------------------------ */
/* Rate limiting: 5 requests / minute per IP, in-memory.              */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimitHits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateLimitHits.set(ip, hits);
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/* ------------------------------------------------------------------ */
/* Sanitization                                                        */
/* ------------------------------------------------------------------ */

/** Strip HTML tags and trim. Never throws on non-strings. */
function cleanString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const cleaned = value.replace(/<[^>]*>/g, '').trim();
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function cleanStringArray(value: unknown, maxItems: number, maxLength: number): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const cleaned = value
    .map((item) => cleanString(item, maxLength))
    .filter((item): item is string => Boolean(item));
  return cleaned.length > 0 ? cleaned.slice(0, maxItems) : undefined;
}

/** Sanitize the validated payload: strip tags, trim, enforce caps. */
function sanitize(data: Submission): Submission {
  return {
    type: data.type,
    name: cleanString(data.name, MAX.name),
    email: data.email.trim().toLowerCase().slice(0, 254),
    phone: cleanString(data.phone, MAX.phone),
    company: cleanString(data.company, MAX.company),
    service: cleanStringArray(data.service ?? data.services, 10, MAX.serviceItem),
    budget: cleanString(data.budget, MAX.budget),
    timeline: cleanString(data.timeline, MAX.timeline),
    message: cleanString(data.message, MAX.message),
    fileLink: cleanString(data.fileLink, MAX.fileLink),
    website: cleanString(data.website, MAX.website),
    choices: data.choices,
    source: cleanString(data.source, MAX.source),
    utm: data.utm,
  };
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.OWNER_EMAIL,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fieldRows(data: Submission): string {
  const rows: Array<[string, string]> = [
    ['Type', data.type],
    ['Name', data.name ?? '—'],
    ['Email', data.email],
    ['Phone', data.phone ?? '—'],
    ['Company', data.company ?? '—'],
    ['Services', data.service?.join(', ') ?? '—'],
    ['Budget', data.budget ?? '—'],
    ['Timeline', data.timeline ?? '—'],
    ['File link', data.fileLink ?? '—'],
    ['Source page', data.source ?? '—'],
  ];
  if (data.utm && Object.keys(data.utm).length > 0) {
    rows.push(['UTM', JSON.stringify(data.utm)]);
  }
  if (data.choices && Object.keys(data.choices).length > 0) {
    rows.push(['Planner choices', JSON.stringify(data.choices)]);
  }
  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#114172;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111111;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
}

function ownerEmailHtml(data: Submission): string {
  return `<!doctype html><html><body style="margin:0;font-family:Arial,Helvetica,sans-serif;background:#f5f7fa;color:#111111;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;">
<div style="background:#114172;color:#ffffff;padding:24px 28px;">
<div style="font-size:20px;font-weight:700;letter-spacing:1px;">ADD CREATIVES</div>
<div style="font-size:13px;opacity:0.85;margin-top:4px;">New ${escapeHtml(data.type)} submission — ${escapeHtml(siteConfig.website)}</div>
</div>
<div style="padding:24px 28px;">
<table style="width:100%;border-collapse:collapse;font-size:14px;">${fieldRows(data)}</table>
${
  data.message
    ? `<div style="margin-top:20px;"><div style="font-weight:700;color:#114172;margin-bottom:6px;">Message</div><div style="background:#f5f7fa;border-radius:8px;padding:14px;white-space:pre-wrap;font-size:14px;">${escapeHtml(data.message)}</div></div>`
    : ''
}
</div>
<div style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">Sent from the ADD Creatives website contact form.</div>
</div></body></html>`;
}

function autoReplyHtml(data: Submission): string {
  const greeting = data.name ? `Hi ${escapeHtml(data.name)},` : 'Hi,';
  return `<!doctype html><html><body style="margin:0;font-family:Arial,Helvetica,sans-serif;background:#f5f7fa;color:#111111;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;">
<div style="background:#114172;color:#ffffff;padding:24px 28px;">
<div style="font-size:20px;font-weight:700;letter-spacing:1px;">ADD CREATIVES</div>
<div style="font-size:13px;opacity:0.85;margin-top:4px;">${escapeHtml(siteConfig.tagline)}</div>
</div>
<div style="padding:24px 28px;font-size:15px;line-height:1.6;">
<p>${greeting}</p>
<p>Thanks for getting in touch — we have received your message and will reply within one business day.</p>
<p>If anything is urgent, you can reach us directly at <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:#0b4ea2;">${escapeHtml(siteConfig.email)}</a> or on WhatsApp at ${escapeHtml(siteConfig.whatsapp)}.</p>
<p style="margin-bottom:0;">Best regards,<br><strong>The ADD Creatives Team</strong></p>
</div>
<div style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">${escapeHtml(siteConfig.address)} · ${escapeHtml(siteConfig.website)}</div>
</div></body></html>`;
}

async function sendEmails(data: Submission): Promise<boolean> {
  if (!smtpConfigured()) {
    console.warn(
      '[contact] SMTP is not configured — skipping email. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OWNER_EMAIL and MAIL_FROM to receive submissions by email.',
    );
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const ownerEmail = process.env.OWNER_EMAIL as string;
    const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;
    const typeLabel = data.type.charAt(0).toUpperCase() + data.type.slice(1);

    await transporter.sendMail({
      from,
      to: ownerEmail,
      subject: `[ADD Creatives] New ${typeLabel} submission — ${data.name ?? data.email}`,
      html: ownerEmailHtml(data),
    });

    // Auto-reply to the visitor (never blocks the request if it fails).
    try {
      await transporter.sendMail({
        from,
        to: data.email,
        subject: 'Thanks for contacting ADD Creatives',
        html: autoReplyHtml(data),
      });
    } catch (error) {
      console.warn('[contact] Auto-reply failed:', error);
    }
    return true;
  } catch (error) {
    console.error('[contact] Failed to send submission email:', error);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Firestore                                                           */
/* ------------------------------------------------------------------ */

async function saveToFirestore(data: Submission): Promise<boolean> {
  const db = getAdminDb();
  if (!db) {
    console.warn(
      '[contact] Firebase Admin is not configured — submission not saved to Firestore.',
    );
    return false;
  }
  try {
    const base = {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      sourcePage: data.source ?? null,
      utm: data.utm ?? null,
    };
    await db.collection(COLLECTIONS.contactSubmissions).add(base);
    if (data.type === 'newsletter') {
      await db.collection(COLLECTIONS.newsletterSubscribers).add({
        email: data.email,
        createdAt: FieldValue.serverTimestamp(),
        sourcePage: data.source ?? null,
      });
    }
    if (data.type === 'audit') {
      await db.collection(COLLECTIONS.auditRequests).add({
        website: data.fileLink ?? data.source ?? null,
        email: data.email,
        name: data.name ?? null,
        createdAt: FieldValue.serverTimestamp(),
      });
    }
    return true;
  } catch (error) {
    console.error('[contact] Failed to save submission to Firestore:', error);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid submission.',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = sanitize(parsed.data);

  // Honeypot filled: pretend everything worked, store and send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, emailed: false, saved: false });
  }

  const [emailed, saved] = await Promise.all([sendEmails(data), saveToFirestore(data)]);

  return NextResponse.json({ ok: true, emailed, saved });
}
