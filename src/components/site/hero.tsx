"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site-config";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Digital" },
  { text: "solutions" },
  { text: "that" },
  { text: "drive" },
  { text: "growth.", accent: true },
];

const FACTS: [string, string][] = [
  ["06", "Services"],
  ["04", "Disciplines"],
  ["09", "Tools we use"],
];

/**
 * Split editorial hero. Left: giant Manrope headline, short support line,
 * two CTAs and a mono meta row. Right: a layered image composition —
 * one main photograph, a smaller offset photograph, and a small floating
 * fact chip — with gentle transform-only parallax on scroll. The bottom
 * edge carries three honest facts and a scroll cue. No grid background,
 * no glow blobs, no marquee, no arched mask.
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
          ".hero-photo-main",
          { scale: 1.12 },
          { scale: 1, duration: 1.2, delay: 0.35, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-visual",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-visual",
          { yPercent: 0 },
          {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
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
      <div className="wrap pb-20 pt-36 lg:pb-24 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy — left. */}
          <div className="lg:col-span-7">
            <p className="hero-fade eyebrow flex flex-wrap items-center gap-3 text-skyline">
              <span className="inline-block h-px w-10 bg-skyline" aria-hidden="true" />
              ADD Creatives · Lahore, Pakistan
            </p>
            <h1 className="mt-7 font-display text-[clamp(3.25rem,8.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
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
            <p className="hero-fade mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              <span>Lahore, Pakistan</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-skyline" />
              <span>Brand · Digital · Growth</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-skyline" />
              <span>One shared direction</span>
            </p>
          </div>

          {/* Layered image composition — right. */}
          <div className="hero-visual relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy">
              <Image
                src="/images/digital-studio.jpg"
                alt="A notebook with interface sketches and planning notes, shown as illustrative stock photography."
                fill
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="hero-photo-main object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 w-36 overflow-hidden rounded-xl border-4 border-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.55)] sm:-left-8 sm:w-48">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/team-strategy.jpg"
                  alt="A team planning a project together, shown as illustrative stock photography."
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 9rem, 12rem"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -right-2 -top-5 rounded-xl bg-white px-4 py-3 text-navy shadow-[0_20px_36px_-20px_rgba(0,0,0,0.5)] sm:-right-4">
              <p className="font-display text-lg font-extrabold leading-none tracking-tight">
                06 services
              </p>
              <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-steel">
                04 disciplines · 09 tools
              </p>
            </div>
            <p className="mt-12 text-xs leading-5 text-white/50">
              Illustrative stock images — not photographs of the ADD Creatives team.
            </p>
          </div>
        </div>

        {/* Bottom facts strip. */}
        <div className="hero-fade mt-16 flex items-end justify-between gap-6 border-t border-white/10 pt-7 lg:mt-20">
          <dl className="flex flex-wrap gap-x-10 gap-y-3">
            {FACTS.map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2.5">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-extrabold text-white">{value}</dd>
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
