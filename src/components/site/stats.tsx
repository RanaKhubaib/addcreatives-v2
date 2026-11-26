"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Honest counts only — what the agency offers, not invented results. */
const STATS = [
  { value: 6, label: "Services", note: "From brand to growth" },
  { value: 4, label: "Disciplines", note: "Strategy, design, technology, growth" },
  { value: 9, label: "Tools we use", note: "Next.js, React, TypeScript, Tailwind, GSAP, Firebase, Figma, Vercel, GitHub" },
  { value: 3, label: "Sample concepts", note: "Illustrative work, labelled as such" },
];

export function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
          const target = Number(el.dataset.value ?? 0);
          const state = { value: 0 };
          gsap.to(state, {
            value: target,
            duration: 1,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => {
              el.textContent = String(Math.round(state.value)).padStart(2, "0");
            },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div ref={root} className="wrap">
        <p className="eyebrow text-skyline">ADD Creatives, in numbers</p>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-t border-white/20 pt-5">
              <p
                className="stat-number font-display text-6xl font-bold tracking-tight text-white"
                data-value={stat.value}
              >
                {String(stat.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-white">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-white/60">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
