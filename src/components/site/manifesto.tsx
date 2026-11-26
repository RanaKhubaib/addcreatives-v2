"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT: { text: string; accent?: boolean }[] = [
  { text: "We" },
  { text: "believe" },
  { text: "good" },
  { text: "work" },
  { text: "starts" },
  { text: "with" },
  { text: "listening.", accent: true },
  { text: "Strategy" },
  { text: "before" },
  { text: "pixels," },
  { text: "clarity" },
  { text: "before" },
  { text: "noise" },
  { text: "—" },
  { text: "and" },
  { text: "every" },
  { text: "choice" },
  { text: "made" },
  { text: "for" },
  { text: "the" },
  { text: "people" },
  { text: "who" },
  { text: "will" },
  { text: "use" },
  { text: "it." },
];

/**
 * Manifesto: a huge quote-style statement whose words reveal one by one
 * as the reader scrolls (scrubbed opacity, transform-free).
 */
export function Manifesto() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".manifesto-word",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      }, root);
      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <section className="bg-mist py-20 sm:py-28">
      <div ref={root} className="wrap">
        <p className="eyebrow text-royal">Our manifesto</p>
        <p className="mt-8 max-w-5xl font-display text-[clamp(1.75rem,4.6vw,3.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
          {STATEMENT.map((word) => (
            <span
              key={word.text + word.accent}
              className={`manifesto-word ${word.accent ? "serif-accent text-royal" : ""}`}
            >
              {word.text}{" "}
            </span>
          ))}
        </p>
        <p className="mt-8 max-w-xl text-base leading-7 text-steel">
          That is why every engagement begins with the needs behind the brief —
          not a one-size-fits-all playbook.
        </p>
      </div>
    </section>
  );
}
