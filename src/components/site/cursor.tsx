"use client";

import { useEffect, useRef } from "react";

/**
 * Small cursor dot + trailing ring, desktop pointer:fine only.
 * Transform only, driven by gsap.quickTo. Renders nothing on touch
 * devices or when the user prefers reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cleanup = () => {};
    void import("gsap").then(({ default: gsap }) => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
      };
      const onOver = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest("a, button, summary, [role='button']");
        ring.classList.toggle("cursor-ring--active", Boolean(target));
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseover", onOver);
      };
    });

    return () => cleanup();
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference [@media(pointer:fine)]:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white opacity-0 mix-blend-difference transition-[width,height] duration-300 [@media(pointer:fine)]:block [&.cursor-ring--active]:h-12 [&.cursor-ring--active]:w-12"
      />
    </>
  );
}
