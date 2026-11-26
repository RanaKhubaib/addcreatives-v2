"use client";

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Compass, Lightbulb, PenTool, RefreshCw } from 'lucide-react';

// TODO: Move this copy into src/data/ (e.g. a process.ts) once the wording
// is approved — it is defined here so the section can ship without touching
// src/data/*, which another agent owns.
const STEPS = [
  {
    id: '01',
    title: 'Discover',
    icon: Compass,
    duration: 'Week 1',
    description:
      'We start by listening. A short call and a few focused questions tell us who your customers are, what your business needs, and what success looks like — before anyone opens a design tool.',
    deliverables: ['Discovery call', 'Goals & audience notes', 'Competitor snapshot'],
  },
  {
    id: '02',
    title: 'Define',
    icon: Lightbulb,
    duration: 'Week 1–2',
    description:
      'Everything we learned becomes a plan: the pages or features you need, the words your customers actually use, and a timeline you can hold us to. You approve the plan before we build anything.',
    deliverables: ['Sitemap & scope', 'Content outline', 'Fixed timeline & quote'],
  },
  {
    id: '03',
    title: 'Create',
    icon: PenTool,
    duration: 'Weeks 2–5',
    description:
      'Design first, then build. You see the design early and can ask for changes while they are cheap to make. We build it properly — fast, responsive, and easy for you to update.',
    deliverables: ['Design preview', 'Working build', 'Review rounds'],
  },
  {
    id: '04',
    title: 'Evolve',
    icon: RefreshCw,
    duration: 'After launch',
    description:
      'Launch day is the start, not the finish. We check how the site performs, fix what needs fixing, and keep improving it — SEO, content, and campaigns — so it keeps bringing you business.',
    deliverables: ['Launch & handover', 'Performance checks', 'Ongoing growth plan'],
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });
  // Cards already passed shrink slightly as the next one stacks on top.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const Icon = step.icon;

  return (
    <div ref={cardRef} className="sticky" style={{ top: `${6 + index * 2}rem` }}>
      <motion.article
        style={reduceMotion ? undefined : { scale }}
        className="origin-top rounded-card border border-ink/10 bg-white p-7 shadow-[0_20px_60px_-20px_rgba(10,15,28,0.25)] sm:p-10"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <span className="font-display text-5xl font-bold text-mist [-webkit-text-stroke:1px_#163e73] sm:text-6xl">
            {step.id}
          </span>
        </div>
        <h3 className="font-display mt-6 text-3xl font-bold text-ink sm:text-4xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm font-bold tracking-wide text-royal uppercase">
          {step.duration}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">
          {step.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.2', 'end 0.8'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Our process"
      className="relative bg-mist py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Sticky intro + progress rail. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold tracking-[0.28em] text-royal uppercase">
              How we work
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl">
              A clear process, no surprises.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/65">
              Four steps, from the first call to life after launch. You always know
              what is happening next — and what it costs.
            </p>

            {/* Progress indicator: 01–04 + bar tied to scroll. */}
            <div className="mt-10 hidden lg:block">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-navy">
                  {STEPS[active].id} — {STEPS[active].title}
                </span>
                <span className="text-ink/40">
                  {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                </span>
              </div>
              <div
                aria-hidden
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"
              >
                <motion.div
                  style={
                    reduceMotion ? undefined : { scaleX: scrollYProgress }
                  }
                  className="h-full origin-left rounded-full bg-royal"
                />
              </div>
              <ol className="mt-6 space-y-3">
                {STEPS.map((step, i) => (
                  <li
                    key={step.id}
                    className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
                      i === active ? 'text-navy' : 'text-ink/40'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        i === active ? 'bg-navy text-white' : 'bg-ink/10 text-ink/50'
                      }`}
                    >
                      {step.id}
                    </span>
                    {step.title}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Stacked sticky cards with an animated connecting line. */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-4 hidden w-px bg-ink/10 sm:block"
            />
            <motion.div
              aria-hidden
              style={
                reduceMotion
                  ? undefined
                  : { scaleY: scrollYProgress }
              }
              className="absolute top-0 bottom-0 left-4 hidden w-px origin-top bg-royal sm:block"
            />
            <div className="grid gap-6">
              {STEPS.map((step, i) => (
                <StepCard key={step.id} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
