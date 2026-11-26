"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MoveHorizontal, Quote, Star } from "lucide-react";
import { SHOW_TESTIMONIALS, testimonials } from "@/data/testimonials";

/**
 * Client testimonials — draggable carousel.
 *
 * Renders ONLY when SHOW_TESTIMONIALS is true in site-config. While the flag
 * is false this component returns null and renders nothing.
 *
 * TODO (placeholder): every slide below is placeholder copy from
 * src/data/testimonials.ts — replace with real client quotes (with
 * permission) before turning SHOW_TESTIMONIALS on.
 */

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = ["bg-navy", "bg-royal", "bg-peri"] as const;

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setMaxDrag(Math.max(0, track.scrollWidth - viewport.clientWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Flag off: render nothing — no placeholder content leaks onto the page.
  if (!SHOW_TESTIMONIALS) {
    return null;
  }

  return (
    <section aria-labelledby="testimonials-heading" className="w-full overflow-hidden bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Client words
            </p>
            <h2
              id="testimonials-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
            >
              What clients say
            </h2>
          </div>
          <p className="flex items-center gap-2 text-sm font-medium text-ink/50">
            <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
            Drag to explore
          </p>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="mx-auto mt-10 w-full max-w-7xl cursor-grab px-6 active:cursor-grabbing"
      >
        <motion.div
          ref={trackRef}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          whileDrag={{ cursor: "grabbing" }}
          className="flex w-max gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <figure
              key={testimonial.name}
              className="flex w-[85vw] max-w-[520px] shrink-0 flex-col justify-between rounded-[24px] bg-white p-7 shadow-[0_16px_48px_rgba(22,62,115,0.08)] sm:p-9"
            >
              <div>
                <Quote className="h-8 w-8 text-peri" aria-hidden="true" />
                {/* TODO: placeholder quote — replace with a real client quote. */}
                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                >
                  {initials(testimonial.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-ink">
                    {testimonial.name}
                  </span>
                  <span className="block truncate text-sm text-ink/55">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
                <span
                  className="ml-auto flex shrink-0 items-center gap-0.5"
                  aria-label={`Rated ${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-ink/10 text-ink/10"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
