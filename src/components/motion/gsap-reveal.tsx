"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface GsRevealProps {
  children: ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** vertical travel in px */
  y?: number;
  as?: "div" | "li" | "article" | "section";
}

/** Scroll-triggered reveal (GSAP). No-ops under prefers-reduced-motion. */
export function GsReveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 32,
}: GsRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const el = ref.current;
    const tween = gsap.from(el, {
      opacity: 0,
      y,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  const Tag = as as "div";
  return (
    <Tag className={className} ref={ref}>
      {children}
    </Tag>
  );
}
