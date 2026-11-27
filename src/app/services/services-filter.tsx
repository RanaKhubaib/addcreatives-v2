'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Service, ServiceCategory } from '@/data/services';
import { SERVICE_ICON_MAP } from '@/components/sections/services-bento';

type Filter = 'All' | ServiceCategory;

const FILTERS: Filter[] = ['All', 'Build', 'Grow', 'Brand'];

export default function ServicesFilter({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const visible =
    filter === 'All' ? services : services.filter((service) => service.category === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter services by category"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                active
                  ? 'bg-navy text-white'
                  : 'bg-mist text-ink hover:bg-peri/20 dark:bg-white/10 dark:text-white'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visible.map((service) => {
          const Icon = SERVICE_ICON_MAP[service.icon] ?? Sparkles;
          return (
            <li
              key={service.slug}
              className="group flex flex-col rounded-[24px] border-2 border-ink/10 bg-white p-8 shadow-[0_10px_36px_rgba(10,15,28,0.10)] transition-all duration-300 hover:-translate-y-1.5 hover:border-royal/50 hover:shadow-[0_28px_56px_rgba(22,62,115,0.22)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white shadow-md transition-colors duration-300 group-hover:bg-royal">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="inline-flex rounded-full bg-mist px-3 py-1 text-xs font-semibold tracking-wide text-royal uppercase dark:bg-white/10">
                  {service.category}
                </span>
              </div>
              <h2 className="font-display mt-6 text-2xl font-extrabold tracking-tight">
                {service.title}
              </h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink/70 dark:text-white/70">
                {service.short}
              </p>
              <ul className="mt-5 space-y-1.5 text-sm font-medium text-ink/70 dark:text-white/70">
                {service.subServices.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="font-bold text-royal">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="mt-7 inline-flex items-center gap-1.5 py-2 text-sm font-bold text-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal dark:text-peri"
              >
                Learn more
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
