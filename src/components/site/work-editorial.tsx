"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/data/sample-content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial work list: alternating large images with transform-only
 * parallax, oversized serif titles, mono meta labels. No pinned scroll.
 */
export function WorkEditorial({ studies }: { studies: CaseStudy[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".work-photo").forEach((photo) => {
          gsap.fromTo(
            photo,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            },
          );
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="space-y-20 sm:space-y-28">
      {studies.map((study, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <article
            key={study.slug}
            className="work-item grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
          >
            <Link
              href={`/case-studies/${study.slug}`}
              aria-label={`Read the case study: ${study.title}`}
              className={`group relative block overflow-hidden rounded-xl bg-ice lg:col-span-7 ${
                imageFirst ? "" : "lg:order-2"
              }`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={study.coverImage}
                  alt={study.coverImageAlt}
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="work-photo scale-[1.16] object-cover transition-transform duration-500 group-hover:scale-[1.2]"
                />
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy">
                {study.isSample ? "Illustrative concept" : "Case study"}
              </span>
            </Link>

            <div className={imageFirst ? "lg:col-span-5" : "lg:order-1 lg:col-span-5"}>
              <p className="eyebrow flex items-center gap-3 text-royal">
                <span className="font-mono">0{index + 1}</span>
                <span aria-hidden="true" className="h-px w-8 bg-royal" />
                {study.category} · {study.industry}
              </p>
              <h3 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="transition-colors duration-300 hover:text-royal"
                >
                  {study.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-md text-base leading-7 text-steel">{study.excerpt}</p>
              <p className="mt-4 text-sm font-semibold leading-6 text-navy">
                {study.result}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-navy"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
              >
                Read the case study
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
