'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';

export default function CaseStudiesFilter({ studies }: { studies: CaseStudy[] }) {
  const categories = ['All', ...Array.from(new Set(studies.map((study) => study.category)))];
  const [filter, setFilter] = useState('All');
  const visible =
    filter === 'All' ? studies : studies.filter((study) => study.category === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter case studies by category" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                active
                  ? 'bg-navy text-white'
                  : 'bg-mist text-ink hover:bg-peri/20 dark:bg-white/10 dark:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <li
            key={study.slug}
            className="flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                Illustrative concept
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-royal">
                {study.category} · {study.year}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold">{study.title}</h2>
              <p className="mt-2 flex-1 text-ink/70 dark:text-white/70">{study.excerpt}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy dark:bg-white/10 dark:text-white"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
              >
                Read the concept <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
