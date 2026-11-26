'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service, ServiceCategory } from '@/data/services';

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
              className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
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

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <li
            key={service.slug}
            className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 transition hover:border-royal/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <span className="inline-flex w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-wide text-royal dark:bg-white/10">
              {service.category}
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">{service.title}</h2>
            <p className="mt-2 flex-1 text-ink/70 dark:text-white/70">{service.short}</p>
            <ul className="mt-4 space-y-1 text-sm text-ink/70 dark:text-white/70">
              {service.subServices.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-royal">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
