"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";

/**
 * Final call to action — dark navy, oversized split-reveal headline,
 * slow diagonal stripes, and a magnetic "Start a project" button.
 *
 * The magnetism is pointer:fine only (mouse users): on touch devices the
 * button stays put. Stripes and the headline animate transform/opacity
 * only, and respect prefers-reduced-motion.
 */

const HEADLINE = "Let's make something worth choosing.".split(" ");

function MagneticButton() {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    // Only engage for a real mouse/trackpad pointer.
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    // Pull the button part-way toward the cursor, capped at 10px.
    setOffset({ x: Math.max(-10, Math.min(10, x * 0.25)), y: Math.max(-10, Math.min(10, y * 0.25)) });
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      <Link
        href="/contact"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-navy shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-colors hover:bg-mist"
      >
        Start a project
        <ArrowRight
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative w-full overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      {/* Animated diagonal stripes — slow translate, transform only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <style>{`
          @keyframes cta-stripes {
            from { transform: translateX(-160px); }
            to { transform: translateX(0); }
          }
          .cta-stripes {
            animation: cta-stripes 24s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .cta-stripes { animation: none; }
          }
        `}</style>
        <div
          className="cta-stripes absolute -inset-y-1/2 left-[-160px] w-[calc(100%+320px)] opacity-[0.07]"
          style={{
            background:
              "repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 26px)",
          }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-royal/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-peri/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
          Ready when you are
        </p>

        <h2
          id="final-cta-heading"
          className="mx-auto mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.07 }}
              className="mr-[0.28em] inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Tell us about your business and what you need. We reply within one
          working day with honest next steps — no obligation.
        </p>

        <div className="mt-10">
          <MagneticButton />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/15 pt-8 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            WhatsApp {siteConfig.whatsapp}
          </a>
          <span className="flex items-center gap-2 text-center sm:text-left">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {siteConfig.address}
          </span>
        </div>
      </div>
    </section>
  );
}
