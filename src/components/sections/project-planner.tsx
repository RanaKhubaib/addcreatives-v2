"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Send,
} from "lucide-react";

/**
 * "Build your project" — a multi-step planner wizard.
 *
 * Budget options are indicative ranges in USD, not fixed prices: every
 * project gets a fixed quote after the first call (see the FAQ section).
 */

const NEEDS = [
  "Website",
  "Online store",
  "SEO",
  "Social media",
  "Ads",
  "Branding",
  "Content/Video",
] as const;

const STAGES = ["Just starting", "Growing", "Established", "Rebrand"] as const;

// Indicative ranges in USD — not fixed prices.
const BUDGETS = ["Under $1k", "$1–3k", "$3–5k", "$5k+"] as const;

const TIMELINES = ["ASAP", "2–4 weeks", "1–2 months", "Flexible"] as const;

const STEP_TITLES = [
  "What do you need?",
  "What stage is your business at?",
  "What budget range are you thinking of?",
  "When do you need it?",
  "Your project summary",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "success" | "error";

interface Choices {
  needs: string[];
  stage: string;
  budget: string;
  timeline: string;
}

const EMPTY_CHOICES: Choices = { needs: [], stage: "", budget: "", timeline: "" };

function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
        selected
          ? "border-navy bg-navy text-white shadow-[0_8px_20px_rgba(22,62,115,0.25)]"
          : "border-ink/15 bg-white text-ink hover:border-royal/50 hover:text-royal"
      }`}
    >
      {selected && <Check className="h-4 w-4" aria-hidden="true" />}
      {label}
    </button>
  );
}

export function ProjectPlanner() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [choices, setChoices] = useState<Choices>(EMPTY_CHOICES);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = STEP_TITLES.length;
  const isSummary = step === totalSteps - 1;

  function validateStep(current: number): string {
    if (current === 0 && choices.needs.length === 0)
      return "Pick at least one thing you need — you can choose more than one.";
    if (current === 1 && !choices.stage) return "Pick the stage that fits your business best.";
    if (current === 2 && !choices.budget) return "Pick a budget range to continue.";
    if (current === 3 && !choices.timeline) return "Pick a timeline to continue.";
    return "";
  }

  function goNext() {
    const problem = validateStep(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    setError("");
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleNeed(need: string) {
    setChoices((c) => ({
      ...c,
      needs: c.needs.includes(need)
        ? c.needs.filter((n) => n !== need)
        : [...c.needs, need],
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please add your name so we know who to reply to.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — please check it and try again.");
      return;
    }
    setError("");
    setStatus("sending");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "planner", choices, name: name.trim(), email: email.trim() }),
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
            : "Something went wrong sending your plan. Please try again.";
        throw new Error(message);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section id="planner" aria-labelledby="planner-heading" className="w-full bg-mist py-20 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-[24px] bg-white p-8 text-center shadow-[0_16px_48px_rgba(22,62,115,0.12)] sm:p-12"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
              <CircleCheck className="h-8 w-8" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold text-ink">Plan received — thank you, {name.trim()}.</h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/70">
              We have your project outline and will reply to{" "}
              <span className="font-semibold text-ink">{email.trim()}</span> within one working
              day with next steps and a clear quote.
            </p>
            <p className="mt-4 text-sm text-ink/50">
              In a hurry? Message us on WhatsApp and mention your project plan.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="planner" aria-labelledby="planner-heading" className="w-full bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
            Project planner
          </p>
          <h2
            id="planner-heading"
            className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
          >
            Build your project
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink/70">
            Four quick questions, then tell us where to send your plan. No
            obligation — and the budget ranges are only a starting point.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-10" aria-label={`Step ${step + 1} of ${totalSteps}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-ink/50">
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full rounded-full bg-royal"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] bg-white p-6 shadow-[0_16px_48px_rgba(22,62,115,0.10)] sm:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: 40 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * direction }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {STEP_TITLES[step]}
              </h3>
              <p className="mt-1 text-sm text-ink/55">
                {step === 0 && "Select everything that applies."}
                {step === 1 && "This helps us pitch the scope at the right level."}
                {step === 2 && "Indicative ranges in USD — your final quote is fixed after our call."}
                {step === 3 && "We will confirm whether your timeline is realistic."}
                {isSummary && "Check your choices, then leave your details."}
              </p>

              <div className="mt-6">
                {step === 0 && (
                  <div className="flex flex-wrap gap-3">
                    {NEEDS.map((need) => (
                      <Chip
                        key={need}
                        label={need}
                        selected={choices.needs.includes(need)}
                        onToggle={() => toggleNeed(need)}
                      />
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="flex flex-wrap gap-3">
                    {STAGES.map((stage) => (
                      <Chip
                        key={stage}
                        label={stage}
                        selected={choices.stage === stage}
                        onToggle={() => setChoices((c) => ({ ...c, stage }))}
                      />
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-wrap gap-3">
                    {BUDGETS.map((budget) => (
                      <Chip
                        key={budget}
                        label={budget}
                        selected={choices.budget === budget}
                        onToggle={() => setChoices((c) => ({ ...c, budget }))}
                      />
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-wrap gap-3">
                    {TIMELINES.map((timeline) => (
                      <Chip
                        key={timeline}
                        label={timeline}
                        selected={choices.timeline === timeline}
                        onToggle={() => setChoices((c) => ({ ...c, timeline }))}
                      />
                    ))}
                  </div>
                )}

                {isSummary && (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <dl className="space-y-3 rounded-2xl bg-mist p-5 text-sm">
                      <div className="flex flex-wrap gap-2">
                        <dt className="w-24 shrink-0 font-semibold text-ink/55">Needs</dt>
                        <dd className="font-semibold text-ink">{choices.needs.join(", ")}</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="w-24 shrink-0 font-semibold text-ink/55">Stage</dt>
                        <dd className="font-semibold text-ink">{choices.stage}</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="w-24 shrink-0 font-semibold text-ink/55">Budget</dt>
                        <dd className="font-semibold text-ink">{choices.budget}</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="w-24 shrink-0 font-semibold text-ink/55">Timeline</dt>
                        <dd className="font-semibold text-ink">{choices.timeline}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="planner-name" className="text-sm font-semibold text-ink">
                          Your name
                        </label>
                        <input
                          id="planner-name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-royal focus:ring-2 focus:ring-royal/25"
                        />
                      </div>
                      <div>
                        <label htmlFor="planner-email" className="text-sm font-semibold text-ink">
                          Email
                        </label>
                        <input
                          id="planner-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-royal focus:ring-2 focus:ring-royal/25"
                        />
                      </div>
                    </div>

                    {status === "error" && (
                      <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {submitError}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {error && (
                <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-royal/50 hover:text-royal disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </button>
                {isSummary ? (
                  <button
                    type="button"
                    onClick={() => formRef.current?.requestSubmit()}
                    disabled={status === "sending"}
                    className="flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,62,115,0.30)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send my plan
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(22,62,115,0.30)] transition-transform hover:-translate-y-0.5"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
