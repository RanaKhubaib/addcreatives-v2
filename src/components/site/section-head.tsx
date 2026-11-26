import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/** Editorial section heading: mono eyebrow, big display title, short intro. */
export function SectionHead({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
}) {
  const eyebrowTone = tone === "dark" ? "text-skyline" : "text-royal";
  const titleTone = tone === "dark" ? "text-white" : "text-ink";
  const descTone = tone === "dark" ? "text-white/70" : "text-steel";
  const ruleTone = tone === "dark" ? "bg-skyline" : "bg-royal";
  return (
    <Reveal>
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <p className={`eyebrow flex items-center gap-3 ${eyebrowTone}`}>
            <span aria-hidden="true" className={`inline-block h-px w-10 ${ruleTone}`} />
            {eyebrow}
          </p>
          <h2
            className={`mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] ${titleTone}`}
          >
            {title}
          </h2>
        </div>
        {description ? (
          <p className={`max-w-2xl text-base leading-7 ${descTone}`}>{description}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
