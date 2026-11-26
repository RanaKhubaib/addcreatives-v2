"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap-reveal";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** max travel in px */
  strength?: number;
}

/** Magnetic hover: the child drifts toward the cursor. Desktop only. */
export function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div className={className} ref={ref} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
