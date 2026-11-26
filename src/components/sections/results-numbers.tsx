"use client";

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { stats } from '@/data/stats';
import { siteConfig } from '@/data/site-config';

// TODO: Replace the sample figures in src/data/stats.ts with verified
// numbers before launch. This section stays hidden until SHOW_STATS is true.
const SHOW = siteConfig.features.SHOW_STATS;

function Counter({
  value,
  suffix = '',
  prefix = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      queueMicrotask(() => setDisplay(value));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Sample monthly figures for the mini charts — replace with real data. */
const MONTHLY_PROJECTS = [4, 6, 5, 8, 7, 10, 12];
const ENQUIRY_TREND = [12, 18, 15, 24, 22, 31, 38];

function BarChart({ data, label }: { data: number[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const max = Math.max(...data);

  return (
    <div ref={ref} role="img" aria-label={label}>
      <div className="flex h-28 items-end gap-2">
        {data.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-royal"
            initial={{ height: '6%' }}
            animate={inView ? { height: `${(value / max) * 100}%` } : {}}
            transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
            title={`Month ${i + 1}: ${value}`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-semibold text-ink/45">
        <span>Jan</span>
        <span>Jul</span>
      </div>
    </div>
  );
}

function LineChart({ data, label }: { data: number[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const max = Math.max(...data);
  const w = 320;
  const h = 110;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - 12 - (v / max) * (h - 28)}`)
    .join(' ');

  return (
    <div ref={ref} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full">
        <motion.polyline
          points={points}
          fill="none"
          stroke="#0b4da2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {data.map((v, i) => (
          <motion.circle
            key={i}
            cx={(i / (data.length - 1)) * w}
            cy={h - 12 - (v / max) * (h - 28)}
            r="4"
            fill="#163e73"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300, damping: 14 }}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] font-semibold text-ink/45">
        <span>Jan</span>
        <span>Jul</span>
      </div>
    </div>
  );
}

const STAT_ITEMS = [
  { label: 'Projects delivered', value: stats.projectsDelivered, suffix: '+', prefix: '' },
  { label: 'Clients served', value: stats.clientsServed, suffix: '+', prefix: '' },
  { label: 'Years of experience', value: stats.yearsExperience, suffix: '', prefix: '' },
  { label: 'Channels managed', value: stats.channelsManaged, suffix: '', prefix: '' },
  { label: 'Average response time', value: stats.avgResponseHours, suffix: 'h', prefix: '<' },
] as const;

export default function ResultsNumbers() {
  if (!SHOW) return null;

  return (
    <section aria-label="Results in numbers" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] text-royal uppercase">
            Results
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl">
            Numbers that speak for the work.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-card border border-ink/10 bg-mist p-7"
            >
              <p className="font-display text-5xl font-bold text-navy sm:text-6xl">
                <Counter value={item.value} suffix={item.suffix} prefix={item.prefix} />
              </p>
              <p className="mt-3 text-sm font-bold tracking-wide text-ink/60 uppercase">
                {item.label}
              </p>
            </div>
          ))}

          <div className="rounded-card border border-ink/10 bg-mist p-7 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-bold tracking-wide text-ink/60 uppercase">
              Projects per month
            </p>
            <div className="mt-4">
              <BarChart data={MONTHLY_PROJECTS} label="Bar chart of sample projects delivered per month, rising from 4 to 12" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-card border border-ink/10 bg-mist p-7">
          <p className="text-sm font-bold tracking-wide text-ink/60 uppercase">
            Enquiries over time
          </p>
          <div className="mt-4">
            <LineChart data={ENQUIRY_TREND} label="Line chart of sample enquiries per month, rising from 12 to 38" />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-ink/50">
          Sample figures for illustration — replace with verified numbers before
          launch.
        </p>
      </div>
    </section>
  );
}
