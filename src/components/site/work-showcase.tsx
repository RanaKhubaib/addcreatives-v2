"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap-reveal";
import { Container } from "@/components/ui/container";
import type { CaseStudy } from "@/data/sample-content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work: on desktop the section pins and the cards scroll
 * horizontally with the page (GSAP ScrollTrigger). On mobile / touch /
 * reduced-motion it degrades to a swipeable snap row.
 */
export function WorkShowcase({ studies }: { studies: CaseStudy[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
      ref={sectionRef}
    >
      <Container className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-12">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-royal">
            <span aria-hidden="true" className="h-px w-8 bg-royal" />
            Selected work
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-ink sm:text-4xl lg:text-5xl">
            Turning ideas into digital experiences.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            The concepts below are clearly labelled and show an illustrative
            approach — not completed client projects or verified results.
            Scroll to travel through them.
          </p>
        </div>
        <Link
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal"
          href="/case-studies"
        >
          Explore all work
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
            size={16}
          />
        </Link>
      </Container>

      <div
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 lg:snap-none lg:overflow-visible lg:px-0"
        ref={trackRef}
      >
        {/* Intro card */}
        <article className="flex w-[78vw] max-w-sm shrink-0 snap-start flex-col justify-between rounded-[1.5rem] bg-navy p-7 text-white sm:w-[26rem] lg:w-[24rem]">
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight">
            Every concept starts with the people and the goal behind the brief.
          </p>
          <p className="mt-6 text-sm leading-6 text-blue-100/75">
            These illustrative concepts show how we think — the structure,
            the visual direction, and the story a real project would follow.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky">
            Keep scrolling
            <ArrowRight aria-hidden="true" size={14} />
          </span>
        </article>

        {studies.map((study) => (
          <Link
            className="group block w-[82vw] max-w-md shrink-0 snap-start sm:w-[26rem]"
            href={`/case-studies/${study.slug}`}
            key={study.slug}
          >
            <article className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-3 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-royal/50 group-hover:shadow-[0_28px_55px_-36px_rgba(17,65,114,0.7)]">
              <div className="image-frame relative aspect-[1.45] overflow-hidden rounded-[1.15rem] bg-mist">
                <Image
                  alt={study.coverImageAlt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 82vw, 26rem"
                  src={study.coverImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </div>
              <div className="px-2 pb-2 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
                    {study.category}
                  </span>
                  {study.isSample ? (
                    <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Illustrative concept
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-royal">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {study.excerpt}
                </p>
              </div>
            </article>
          </Link>
        ))}

        {/* End card */}
        <Link
          className="group flex w-[78vw] max-w-sm shrink-0 snap-start flex-col items-start justify-center rounded-[1.5rem] border-2 border-dashed border-royal/40 bg-mist p-7 transition-colors hover:border-royal hover:bg-white sm:w-[26rem]"
          href="/case-studies"
        >
          <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-navy">
            Your project could be the next one here.
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal">
            See all concepts
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
