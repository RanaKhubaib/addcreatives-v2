"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site-config";

type SubmissionState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "sending" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submission = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message:
            result.message ??
            "We couldn't send your message. Please try WhatsApp or email instead.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message:
          result.message ??
          "Thanks for getting in touch. We'll reply as soon as we can.",
      });
    } catch {
      setState({
        status: "error",
        message:
          "We couldn't reach the form service. Please try WhatsApp or email instead.",
      });
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field
          label="Email address"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Phone number"
          name="phone"
          placeholder="+92 300 0000000"
          type="tel"
        />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">
            What can we help with?
          </span>
          <select
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-royal/30"
            defaultValue=""
            name="service"
            required
          >
            <option disabled value="">
              Choose a service
            </option>
            {siteConfig.services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">
          Approximate budget
        </span>
        <select
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-royal/30"
          defaultValue=""
          name="budget"
        >
          <option value="">Prefer not to say</option>
          <option value="Under PKR 100,000">Under PKR 100,000</option>
          <option value="PKR 100,000 - 300,000">PKR 100,000 - 300,000</option>
          <option value="PKR 300,000 - 700,000">PKR 300,000 - 700,000</option>
          <option value="PKR 700,000+">PKR 700,000+</option>
          <option value="Let's discuss">Let&apos;s discuss</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-ink">
          Tell us about your project
        </span>
        <textarea
          className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-royal/30"
          maxLength={4000}
          name="message"
          placeholder="What are you hoping to achieve?"
          required
          rows={5}
        />
      </label>
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input autoComplete="off" name="website" tabIndex={-1} />
        </label>
      </div>
      {state.status === "success" ? (
        <p
          aria-live="polite"
          className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
          role="status"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
          {state.message}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p
          aria-live="assertive"
          className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        disabled={state.status === "sending"}
        type="submit"
      >
        {state.status === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
            Sending your message
          </>
        ) : (
          <>
            Send project enquiry <ArrowRight aria-hidden="true" size={17} />
          </>
        )}
      </button>
      <p className="text-xs leading-5 text-slate-500">
        Your details are used only to respond to this enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <input
        autoComplete={name === "name" ? "name" : name === "email" ? "email" : "tel"}
        className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-royal/30"
        maxLength={160}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}
