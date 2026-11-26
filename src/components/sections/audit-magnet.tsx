"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CircleAlert,
  CircleCheck,
  FileSearch,
  Gauge,
  LoaderCircle,
  MonitorSmartphone,
  Radar,
  Search,
  Send,
} from "lucide-react";

/**
 * Free website & SEO audit — lead magnet.
 *
 * Scanning visual: pure CSS/SVG (a rotating radar sweep + progress ring).
 * lottie-react is available in the project, but a hand-built SVG sweep is
 * lighter here and avoids shipping an animation JSON for a simple effect.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts "example.com" as well as full URLs.
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

const STAGES = [
  { label: "Checking speed…", icon: Gauge },
  { label: "Reviewing on-page SEO…", icon: Search },
  { label: "Looking at mobile experience…", icon: MonitorSmartphone },
] as const;

type Phase = "form" | "scanning" | "done" | "error";

function RadarScan() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timers = STAGES.map((_, i) =>
      window.setTimeout(() => setStageIndex(i), i * 1400),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Radar sweep: conic-gradient wedge rotating (transform only). */}
      <div className="relative h-44 w-44">
        <style>{`
          @keyframes audit-sweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .audit-sweep {
            animation: audit-sweep 2.4s linear infinite;
          }
          @keyframes audit-ping {
            0% { transform: scale(0.6); opacity: 0.7; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .audit-ping {
            animation: audit-ping 2.4s ease-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .audit-sweep, .audit-ping { animation: none; }
          }
        `}</style>
        <span
          aria-hidden="true"
          className="audit-ping absolute inset-0 rounded-full border-2 border-royal/40"
        />
        <div className="absolute inset-0 rounded-full border border-ink/10 bg-mist" />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-royal/20"
          style={{ transform: "scale(0.66)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-royal/20"
          style={{ transform: "scale(0.33)" }}
        />
        <div className="audit-sweep absolute inset-0 overflow-hidden rounded-full">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(11,77,162,0.45), rgba(11,77,162,0.08) 90deg, transparent 120deg)",
            }}
          />
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-royal">
          <Radar className="h-10 w-10" aria-hidden="true" />
        </span>
        {/* Progress ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 176 176"
          aria-hidden="true"
        >
          <circle cx="88" cy="88" r="84" fill="none" stroke="rgba(10,15,28,0.08)" strokeWidth="4" />
          <motion.circle
            cx="88"
            cy="88"
            r="84"
            fill="none"
            stroke="#0b4da2"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 84}
            initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 4.2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <ul className="w-full max-w-xs space-y-2.5" aria-live="polite">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const active = i === stageIndex;
          const done = i < stageIndex;
          return (
            <motion.li
              key={stage.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 1.4, duration: 0.4 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                active || done ? "bg-mist text-ink" : "text-ink/35"
              }`}
            >
              {done ? (
                <Check className="h-4 w-4 shrink-0 text-royal" aria-hidden="true" />
              ) : active ? (
                <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-royal" aria-hidden="true" />
              ) : (
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {stage.label}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export function AuditMagnet() {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const site = website.trim();
    if (!URL_RE.test(site)) {
      setError("Please enter a valid website address, like yoursite.com.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — please check it and try again.");
      return;
    }
    setError("");
    setSending(true);
    setPhase("scanning");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "audit",
          website: site.startsWith("http") ? site : `https://${site}`,
          email: email.trim(),
        }),
      });
      const data: unknown = await res.json().catch(() => null);
      const ok =
        res.ok &&
        typeof data === "object" &&
        data !== null &&
        (data as { ok?: unknown }).ok === true;
      if (!ok) {
        const message =
          typeof data === "object" && data !== null && typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Something went wrong sending your request. Please try again.";
        throw new Error(message);
      }
      // Let the scanning animation play out before confirming.
      window.setTimeout(() => {
        setSending(false);
        setPhase("done");
      }, 4600);
    } catch (err) {
      setSending(false);
      setPhase("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section aria-labelledby="audit-heading" className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Free audit
            </p>
            <h2
              id="audit-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
            >
              Free website &amp; SEO audit
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink/70 sm:text-lg">
              Wondering why your website isn&apos;t bringing in enquiries?
              Send us your URL and we will check speed, on-page SEO, and
              mobile experience — then send you the findings in plain
              language, with what to fix first.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-medium text-ink/80">
              {[
                "Speed and mobile experience check",
                "On-page SEO review",
                "Three clear next steps, no jargon",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist text-royal">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-[24px] border border-ink/10 bg-mist p-6 shadow-[0_16px_48px_rgba(22,62,115,0.08)] sm:p-8"
          >
            <AnimatePresence mode="wait">
              {phase === "form" || phase === "error" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                      <FileSearch className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink">
                      Get your free audit
                    </h3>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="audit-website" className="text-sm font-semibold text-ink">
                        Your website
                      </label>
                      <input
                        id="audit-website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="yoursite.com"
                        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-royal focus:ring-2 focus:ring-royal/25"
                      />
                    </div>
                    <div>
                      <label htmlFor="audit-email" className="text-sm font-semibold text-ink">
                        Email to send it to
                      </label>
                      <input
                        id="audit-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-royal focus:ring-2 focus:ring-royal/25"
                      />
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,62,115,0.30)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Request my free audit
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-ink/50">
                    No spam. We only use your email to send the audit.
                  </p>
                </motion.form>
              ) : phase === "scanning" ? (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-2"
                >
                  <h3 className="text-center font-display text-xl font-bold text-ink">
                    Scanning {website.trim()}
                  </h3>
                  <p className="mt-1 text-center text-sm text-ink/55">
                    This takes a few seconds.
                  </p>
                  <div className="mt-6">
                    <RadarScan />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="py-6 text-center"
                >
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                    <CircleCheck className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                    Request received
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink/70">
                    We&apos;ll send your audit to{" "}
                    <span className="font-semibold text-ink">{email.trim()}</span> within 2
                    working days.
                  </p>
                  <p className="mt-4 text-sm text-ink/50">
                    Want it faster? Message us on WhatsApp and mention your audit.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
