"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/** Custom cursor dot + trailing ring. Desktop (pointer:fine) only; the
    CSS hides it on touch and under reduced motion it never mounts motion. */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      const target = e.target as HTMLElement | null;
      ring.classList.toggle(
        "is-hover",
        Boolean(target?.closest("a, button, summary, [data-cursor]")),
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="cursor-dot" ref={dotRef} />
      <div aria-hidden="true" className="cursor-ring" ref={ringRef} />
    </>
  );
}
