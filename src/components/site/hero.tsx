"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { siteConfig } from "@/data/site-config";

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Digital" },
  { text: "solutions" },
  { text: "that" },
  { text: "drive" },
  { text: "growth.", accent: true },
];

/**
 * Full-screen deep navy hero. Giant kinetic headline: words rise out of
 * masks on load (GSAP, transform only). One arched editorial image.
 * No grid background, no glow blobs, no marquee.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-word",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.05,
            delay: 0.1,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          ".hero-fade",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.55,
            ease: "power2.out",
          },
        );
        gsap.fromTo(
          ".hero-image",
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-photo",
          { scale: 1.12 },
          { scale: 1, duration: 1.2, delay: 0.35, ease: "power3.out" },
        );
      }, root);
      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden bg-deep text-white"
    >
      <div className="wrap pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-44">
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <p className="hero-fade eyebrow flex flex-wrap items-center gap-3 text-skyline">
              <span className="inline-block h-px w-10 bg-skyline" aria-hidden="true" />
              ADD Creatives · Lahore, Pakistan
            </p>
            <h1 className="mt-7 font-display text-[clamp(3rem,9vw,6.75rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              {HEADLINE.map((word) => (
                <span
                  key={word.text}
                  className="inline-block overflow-hidden pb-1 align-bottom"
                >
                  <span
                    className={`hero-word inline-block will-change-transform ${
                      word.accent ? "serif-accent pr-2 text-skyline" : ""
                    }`}
                  >
                    {word.text}&nbsp;
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              We bring strategy, design, technology, and marketing together so
              ambitious ideas become easier to see, use, and grow.
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-colors duration-300 hover:bg-skyline"
              >
                Start a project
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>

          <figure className="hero-image relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="arch relative aspect-[3/4] overflow-hidden bg-navy">
              <Image
                src="/images/creative-collaboration.jpg"
                alt="A group of people collaborating around a laptop; illustrative stock photography, not ADD Creatives staff."
                fill
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="hero-photo object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-white/50">
              Illustrative stock image — not a photograph of the ADD Creatives team.
            </figcaption>
          </figure>
        </div>

        <div className="hero-fade mt-14 flex items-end justify-between border-t border-white/10 pt-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              ["06", "Services"],
              ["04", "Disciplines"],
              ["01", "Shared direction"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold text-white">{value}</dd>
                <dd className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
          <p className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:flex">
            Scroll
            <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="cue-line absolute inset-x-0 h-full bg-skyline" />
            </span>
            <ArrowDown aria-hidden="true" size={14} />
          </p>
        </div>
      </div>
      <p className="sr-only">{siteConfig.company.tagline}</p>
    </section>
  );
}
