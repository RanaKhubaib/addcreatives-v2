/**
 * Process as sticky stacked cards: each card sticks to the top while the
 * next one slides over it. Pure CSS position: sticky — no JavaScript.
 */
const STEPS = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the business, audience, and goals behind the brief.",
    tone: "bg-white text-ink",
    sub: "text-steel",
  },
  {
    number: "02",
    title: "Define",
    text: "Set the strategy and creative direction before making the work.",
    tone: "bg-mist text-ink",
    sub: "text-steel",
  },
  {
    number: "03",
    title: "Create",
    text: "Bring the right creative, technical, and marketing skills together.",
    tone: "bg-navy text-white",
    sub: "text-white/70",
  },
  {
    number: "04",
    title: "Evolve",
    text: "Launch with care, review what happens, and identify useful next steps.",
    tone: "bg-deep text-white",
    sub: "text-white/70",
  },
];

export function ProcessStack() {
  return (
    <div className="space-y-6">
      {STEPS.map((step) => (
        <article
          key={step.number}
          className={`sticky top-24 rounded-2xl border border-slate-200 p-7 shadow-[0_18px_40px_-28px_rgba(17,65,114,0.5)] sm:p-10 ${step.tone}`}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-sm font-semibold text-royal">
                <span className={step.tone.includes("text-white") ? "text-skyline" : ""}>
                  {step.number}
                </span>
                <span className="mx-3 text-slate-300" aria-hidden="true">/</span>
                <span className="eyebrow opacity-70">Step {step.number}</span>
              </p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {step.title}
              </h3>
            </div>
            <p className={`max-w-md text-base leading-7 sm:text-lg ${step.sub}`}>
              {step.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
