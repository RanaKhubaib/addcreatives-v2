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
 * Work, BASIC/DEPT-style: one large full-width image per project, then a
 * meta row underneath — big serif title and excerpt on the left, category,
 * tags and the link on the right. Transform-only parallax on the images,
 * snappy reveals. No pinned scroll.
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
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
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
    <div ref={root} className="space-y-16 md:space-y-24">
      {studies.map((study, index) => (
        <article key={study.slug} className="work-item">
          <Link
            href={`/case-studies/${study.slug}`}
            aria-label={`Read the case study: ${study.title}`}
            className="group relative block overflow-hidden rounded-2xl bg-ice"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Image
                src={study.coverImage}
                alt={study.coverImageAlt}
                fill
                quality={75}
                sizes="(max-width: 1280px) 100vw, 80rem"
                className="work-photo scale-[1.14] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.18]"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy sm:left-5 sm:top-5">
              {study.isSample ? "Illustrative concept" : "Case study"}
            </span>
            <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:bottom-5 sm:right-5">
              <ArrowUpRight aria-hidden="true" size={20} />
            </span>
          </Link>

          <div className="mt-7 grid gap-6 md:mt-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-royal">
                <span className="font-mono">0{index + 1}</span>
                <span aria-hidden="true" className="h-px w-8 bg-royal" />
                {study.category} · {study.industry}
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="transition-colors duration-300 hover:text-royal"
                >
                  {study.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-steel">{study.excerpt}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-navy">
                {study.result}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end md:pt-1">
              <div className="flex flex-wrap gap-2 md:justify-end">
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
                className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
              >
                Read the case study
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
