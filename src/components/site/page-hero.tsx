"use client";

import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap-reveal";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  image?: string;
  imageAlt?: string;
  imageNote?: string;
}

export function PageHero({
  actionHref = "/contact",
  actionLabel = "Talk to our team",
  description,
  eyebrow,
  image,
  imageAlt = "",
  imageNote,
  title,
}: PageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".page-hero-line",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.09, ease: "power4.out" },
      );
      gsap.fromTo(
        ".page-hero-fade",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.3, ease: "power3.out" },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const titleWords = title.split(" ");

  return (
    <section
      className="grain relative isolate overflow-hidden bg-deep py-12 text-white sm:py-16 lg:py-20"
      ref={rootRef}
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 z-0 opacity-60" />
      <div
        aria-hidden="true"
        className="hero-glow absolute -right-36 -top-40 z-0 h-[34rem] w-[34rem] rounded-full bg-royal/35 blur-[100px]"
      />
      <div aria-hidden="true" className="slash-strip absolute inset-x-0 bottom-0 z-10 h-2" />
      <Container className="relative z-10">
        <div className="page-hero-fade mb-8 flex items-center gap-2 text-xs font-medium text-blue-100/60">
          <Link className="transition-colors hover:text-sky" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span>{eyebrow}</span>
        </div>
        <div
          className={`grid items-center gap-10 lg:gap-14 ${
            image ? "lg:grid-cols-[1.02fr_0.98fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
          }`}
        >
          <div className="max-w-3xl">
            <p className="page-hero-fade flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              <span aria-hidden="true" className="h-px w-8 bg-sky" />
              ADD Creatives <span aria-hidden="true">/</span> {eyebrow}
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,5.8vw,5.25rem)] font-bold leading-[0.99] tracking-[-0.05em] text-white">
              {titleWords.map((word, i) => (
                <span
                  className="mr-[0.28em] inline-block overflow-hidden pb-1 align-bottom"
                  key={`${word}-${i}`}
                >
                  <span className="page-hero-line inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p className="page-hero-fade mt-6 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">
              {description}
            </p>
            <div className="page-hero-fade mt-8">
              <MagneticButton>
                <Button href={actionHref}>
                  {actionLabel} <ArrowRight aria-hidden="true" size={17} />
                </Button>
              </MagneticButton>
            </div>
          </div>
          {image ? (
            <div className="page-hero-fade relative mx-auto w-full max-w-[32rem]">
              <figure className="image-frame group relative rotate-1 rounded-[2rem] border border-white/15 bg-white/10 p-2 transition-transform duration-700 hover:rotate-0">
                <div className="relative aspect-[1.12] overflow-hidden rounded-[1.5rem] bg-[#e8f0fa]">
                  <Image
                    alt={imageAlt}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    src={image}
                  />
                </div>
                {imageNote ? (
                  <figcaption className="px-2 pb-2 pt-3 text-[10px] leading-5 text-blue-100/55">
                    {imageNote}
                  </figcaption>
                ) : null}
              </figure>
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 -z-10 h-24 w-24 rounded-[1.5rem] bg-royal"
              />
            </div>
          ) : (
            <div className="page-hero-fade relative mx-auto hidden aspect-[1.15] w-full max-w-[32rem] lg:block">
              <div
                aria-hidden="true"
                className="hero-glow absolute inset-[15%] rounded-full bg-royal/40 blur-[75px]"
              />
              <div className="absolute left-[12%] top-[15%] w-[66%] rotate-[-7deg] rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md transition-transform duration-500 hover:rotate-[-4deg]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
                  A thought becomes a direction
                </p>
                <div className="mt-8 h-px bg-white/20" />
                <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  Think clearly.
                </p>
              </div>
              <div className="absolute bottom-[12%] right-[4%] w-[63%] rotate-[6deg] rounded-[1.75rem] border border-white/15 bg-[#0e2242]/90 p-6 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-[3deg]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100/55">
                  Then make it real
                </p>
                <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-sky">
                  Build boldly.
                </p>
                <div className="mt-7 flex gap-2">
                  <span className="h-1.5 w-12 rounded-full bg-sky" />
                  <span className="h-1.5 w-7 rounded-full bg-white/20" />
                  <span className="h-1.5 w-5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
