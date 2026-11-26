"use client";

import { useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Megaphone,
  Palette,
  PenLine,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { services, type Service, type ServiceCategory } from '@/data/services';

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  ShoppingBag,
  Search,
  Share2,
  Megaphone,
  Palette,
  PenLine,
};

type Filter = 'All' | ServiceCategory;

const FILTERS: { label: Filter; count: number }[] = [
  { label: 'All', count: services.length },
  { label: 'Build', count: services.filter((s) => s.category === 'Build').length },
  { label: 'Grow', count: services.filter((s) => s.category === 'Grow').length },
  { label: 'Brand', count: services.filter((s) => s.category === 'Brand').length },
];

function ServiceCard({ service, large }: { service: Service; large: boolean }) {
  const Icon = ICON_MAP[service.icon] ?? Sparkles;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 7}deg)`;
  };

  const onLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${large ? 'md:col-span-2' : ''}`}
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative h-full will-change-transform [transition:transform_180ms_ease-out]"
      >
        {/* Animated gradient border, visible on hover. */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-card bg-[linear-gradient(135deg,#0b4da2,#5b7fc0,#163e73,#0b4da2)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        />
        <div className="relative m-[2px] flex h-[calc(100%-4px)] flex-col overflow-hidden rounded-[22px] bg-white p-6 sm:p-7">
          {/* Mouse-follow spotlight glow. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={
              {
                background:
                  'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(91,127,192,0.16), transparent 70%)',
              } as CSSProperties
            }
          />

          <div className="relative flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <span className="rounded-full border border-ink/10 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-ink/60 uppercase">
              {service.category}
            </span>
          </div>

          <h3 className="font-display relative mt-5 text-xl font-bold text-ink sm:text-2xl">
            {service.title}
          </h3>
          <p className="relative mt-2 text-[15px] leading-relaxed text-ink/70">
            {service.short}
          </p>

          {/* Sub-services, revealed on hover / keyboard focus. */}
          <ul className="relative mt-4 grid max-h-0 gap-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
            {service.subServices.map((sub) => (
              <li key={sub} className="flex items-center gap-2 text-sm font-medium text-navy">
                <span className="h-1.5 w-1.5 rounded-full bg-peri" aria-hidden />
                {sub}
              </li>
            ))}
          </ul>

          <div className="relative mt-auto flex items-center justify-between pt-6">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal"
              aria-label={`Learn more about ${service.title}`}
            >
              Learn more
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <span className="text-xs font-semibold text-ink/40">
              {service.tools.slice(0, 2).join(' · ')}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesBento() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () => (filter === 'All' ? services : services.filter((s) => s.category === filter)),
    [filter],
  );

  return (
    <section id="services" aria-label="Services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] text-royal uppercase">
            What we do
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl">
            Everything you need to grow online, under one roof.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/65">
            From the first sketch to the launch — and the marketing after it. Pick a
            service, or let us shape the whole plan.
          </p>
        </div>

        {/* Filter tabs. */}
        <div
          role="tablist"
          aria-label="Filter services by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {FILTERS.map(({ label, count }) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={filter === label}
              onClick={() => setFilter(label)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                filter === label
                  ? 'bg-navy text-white shadow-md'
                  : 'border border-ink/15 bg-white text-ink/70 hover:border-navy hover:text-navy'
              }`}
            >
              {label}
              <span
                className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] ${
                  filter === label ? 'bg-white/20 text-white' : 'bg-mist text-ink/50'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <ServiceCard key={service.slug} service={service} large={i === 0} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View all services
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
