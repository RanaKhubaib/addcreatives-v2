"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./gsap-reveal";

gsap.registerPlugin(ScrollTrigger);

interface GsCounterProps {
  value: number;
  pad?: number;
  suffix?: string;
  className?: string;
}

/** Animated number that counts up when scrolled into view (GSAP). */
export function GsCounter({ className, pad = 0, suffix = "", value }: GsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) =>
      `${String(Math.round(n)).padStart(pad, "0")}${suffix}`;
    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(obj.n);
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pad, suffix, value]);

  return (
    <span className={className} ref={ref}>
      {`${String(0).padStart(pad, "0")}${suffix}`}
    </span>
  );
}
