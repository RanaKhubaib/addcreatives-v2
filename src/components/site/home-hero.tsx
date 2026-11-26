"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap-reveal";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";

gsap.registerPlugin(ScrollTrigger);

const capabilities = ["Brand", "Digital", "Content", "Growth"];

const headlineLines = [
  { text: "Make your", accent: false },
  { text: "next move", accent: false },
  { text: "matter.", accent: true },
];

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Kinetic headline: each line rises out of its mask, staggered.
      gsap.fromTo(
        ".hero-line-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.55,
          ease: "power3.out",
        },
      );
      // Parallax: hero image drifts slower than the scroll.
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      // Floating chips drift gently.
      gsap.to(".hero-float", {
        y: -10,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="grain relative isolate overflow-hidden bg-deep text-white"
      ref={rootRef}
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 z-0 opacity-70" />
      <div
        aria-hidden="true"
        className="hero-glow absolute -right-36 top-8 z-0 h-[30rem] w-[30rem] rounded-full bg-royal/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="hero-glow absolute -left-40 bottom-0 z-0 h-[24rem] w-[24rem] rounded-full bg-navy/80 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-[36%] z-0 h-[27rem] w-[27rem] rounded-full border border-white/10"
      />
      <p
        aria-hidden="true"
        className="outline-word pointer-events-none absolute -bottom-6 left-0 z-0 select-none whitespace-nowrap font-display text-[clamp(4rem,14vw,13rem)] font-bold leading-none tracking-[-0.04em] opacity-60"
      >
        ADD CREATIVES
      </p>

      <Container className="relative z-10 grid items-center gap-12 pb-10 pt-14 sm:pt-20 lg:min-h-[720px] lg:grid-cols-[1.03fr_0.97fr] lg:gap-10 lg:pb-16 lg:pt-12">
        <div className="max-w-2xl">
          <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100 backdrop-blur sm:text-xs">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            Independent creative studio · Lahore
          </p>

          <h1 className="mt-7 font-display text-[clamp(3.2rem,7.4vw,6.8rem)] font-bold leading-[0.96] tracking-[-0.05em] text-white">
            {headlineLines.map((line) => (
              <span
                aria-label={line.text}
                className="block overflow-hidden pb-1"
                key={line.text}
              >
                <span
                  className={`hero-line-inner block will-change-transform ${
                    line.accent ? "text-sky" : ""
                  }`}
                >
                  {line.text}
                  {line.accent ? (
                    <span
                      aria-hidden="true"
                      className="ml-3 inline-block h-[0.12em] w-[1.1em] -translate-y-[0.1em] -rotate-2 rounded-full bg-sky/80 align-middle"
                    />
                  ) : null}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-7 max-w-xl text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">
            We bring strategy, design, technology, and marketing together to
            make ambitious ideas easier to see, use, and grow.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button href="/contact">
                Start a project <ArrowRight aria-hidden="true" size={17} />
              </Button>
            </MagneticButton>
            <Link
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
              href="/case-studies"
            >
              Explore our work
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={16}
              />
            </Link>
          </div>

          <div className="hero-fade mt-10 flex items-center gap-3 text-xs text-blue-100/60">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-colors hover:border-sky/60 hover:text-sky"
            >
              <ArrowDown aria-hidden="true" size={14} />
            </span>
            Scroll to explore
            <span aria-hidden="true" className="h-px w-16 bg-white/20" />
            <a
              className="font-semibold text-blue-100 transition-colors hover:text-sky"
              href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
            >
              {siteConfig.company.phone}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[33rem]" ref={imageRef}>
          <div
            aria-hidden="true"
            className="hero-float absolute -right-5 top-6 z-20 hidden h-24 w-24 rounded-full border border-sky/50 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 z-0 h-28 w-28 rounded-[2rem] bg-royal"
          />
          <figure className="image-frame group relative z-10 rotate-1 overflow-hidden rounded-[2rem] border border-white/15 bg-[#1a2c47] p-2 shadow-[0_35px_100px_-40px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:rotate-0">
            <div className="relative aspect-[0.98] overflow-hidden rounded-[1.5rem]">
              <Image
                alt="Creative collaborators sharing ideas around a laptop; illustrative stock photography, not ADD Creatives staff."
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                src="/images/creative-collaboration.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-transparent to-deep/10" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
                    From first thought to final detail
                  </p>
                  <p className="mt-2 max-w-xs font-display text-xl font-medium leading-tight text-white sm:text-2xl">
                    Built around what matters to you.
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-royal">
                  <ArrowUpRight aria-hidden="true" size={19} />
                </span>
              </div>
            </div>
          </figure>
          <div className="hero-float absolute -left-4 top-[18%] z-20 hidden rounded-2xl border border-white/15 bg-[#0e2242]/90 p-4 shadow-xl backdrop-blur-md sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100/60">
              The right mix
            </p>
            <div className="mt-3 flex gap-1.5">
              {capabilities.map((item, index) => (
                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
                    index === 0
                      ? "bg-sky text-deep"
                      : "bg-white/10 text-white"
                  }`}
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <figcaption className="relative z-10 mt-3 text-right text-[10px] text-blue-100/45">
            Illustrative stock image—not client work or agency staff.
          </figcaption>
        </div>
      </Container>

      <div className="relative z-10 border-t border-white/15">
        <Container className="grid grid-cols-2 divide-x divide-white/15 sm:grid-cols-4">
          {capabilities.map((item, index) => (
            <div
              className="group flex items-center gap-3 py-4 text-xs font-medium text-blue-100/70 transition-colors hover:text-white sm:py-5"
              key={item}
            >
              <span className="font-mono text-[10px] text-sky transition-transform duration-300 group-hover:-translate-y-0.5">
                0{index + 1}
              </span>
              {item}
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-white/10 transition-colors group-hover:bg-sky/50"
              />
            </div>
          ))}
        </Container>
      </div>
      <div aria-hidden="true" className="slash-strip relative z-10 h-2 w-full" />
    </section>
  );
}
