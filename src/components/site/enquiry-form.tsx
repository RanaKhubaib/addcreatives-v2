"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site-config";

type SubmissionState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

/** Project enquiry form with floating labels. Posts to /api/contact. */
export function EnquiryForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "sending" });

    const form = event.currentTarget;
    const submission = Object.fromEntries(new FormData(form).entries());

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <input
            id="name"
            name="name"
            type="text"
            placeholder=" "
            autoComplete="name"
            required
            maxLength={160}
          />
          <label htmlFor="name">Full name *</label>
        </div>
        <div className="field">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            required
            maxLength={160}
          />
          <label htmlFor="email">Email address *</label>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder=" "
            autoComplete="tel"
            maxLength={40}
          />
          <label htmlFor="phone">Phone number</label>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">
            What can we help with? *
          </span>
          <select
            name="service"
            required
            defaultValue=""
            className="min-h-[3.4rem] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-ink outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/20"
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
          name="budget"
          defaultValue=""
          className="min-h-[3.4rem] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-ink outline-none transition focus:border-royal focus:ring-4 focus:ring-royal/20"
        >
          <option value="">Prefer not to say</option>
          <option value="Under PKR 100,000">Under PKR 100,000</option>
          <option value="PKR 100,000 - 300,000">PKR 100,000 - 300,000</option>
          <option value="PKR 300,000 - 700,000">PKR 300,000 - 700,000</option>
          <option value="PKR 700,000+">PKR 700,000+</option>
          <option value="Let's discuss">Let&apos;s discuss</option>
        </select>
      </label>

      <div className="field">
        <textarea
          id="message"
          name="message"
          placeholder=" "
          required
          rows={5}
          maxLength={4000}
          className="min-h-36 resize-y"
        />
        <label htmlFor="message">Tell us about your project *</label>
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input autoComplete="off" name="website" tabIndex={-1} />
        </label>
      </div>

      {state.status === "success" ? (
        <p
          aria-live="polite"
          role="status"
          className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
          {state.message}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p
          aria-live="assertive"
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state.status === "sending"}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-royal disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {state.status === "sending" ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
            Sending your message
          </>
        ) : (
          <>
            Send project enquiry
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
      <p className="text-xs leading-5 text-steel">
        Your details are used only to respond to this enquiry.
      </p>
    </form>
  );
}
