"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/data/site-config";

/**
 * Closing band used on every public page, Clay-style: one giant centred
 * line of type, one clear action. The button is gently magnetic —
 * it drifts a few pixels toward the cursor (transform only) and settles
 * back on leave. Reduced motion: no drift, button renders as-is.
 */
export function CtaBand() {
  const magnetRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = magnetRef.current;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * 0.25);
      yTo((event.clientY - (rect.top + rect.height / 2)) * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <section className="section-pad border-t border-slate-200 text-center">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-3 text-royal">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-royal" />
            Your next move starts here
            <span aria-hidden="true" className="inline-block h-px w-10 bg-royal" />
          </p>
          <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
            Let&rsquo;s{" "}
            <span className="serif-accent text-royal">talk.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-steel sm:text-lg sm:leading-8">
            Have a project in mind? Tell us what you want to achieve and
            let&rsquo;s discuss how we can help.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              ref={magnetRef}
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-royal"
            >
              Start a project
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
              className="text-sm font-bold text-navy underline decoration-royal decoration-2 underline-offset-4 transition-colors duration-300 hover:text-royal"
            >
              {siteConfig.company.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
