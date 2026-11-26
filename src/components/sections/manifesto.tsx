"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const TEXT =
  'We believe good work starts with listening. Strategy before pixels, clarity before noise, and every choice made for the people who will use it.';

const WORDS = TEXT.split(' ');

function Word({
  word,
  progress,
  range,
  reduceMotion,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['#94a3b8', '#0a0f1c']);
  return (
    <motion.span
      style={reduceMotion ? undefined : { opacity, color }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  // Diagonal stripes drift across the background as the reader scrolls.
  const stripeX = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const stripeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our manifesto"
      className="relative overflow-hidden bg-mist py-28 sm:py-40"
    >
      {/* Diagonal-stripe layer sweeping with scroll progress. */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { x: stripeX, opacity: stripeOpacity }}
        className="pointer-events-none absolute inset-y-0 -left-1/4 w-[150%] bg-[repeating-linear-gradient(-45deg,rgba(22,62,115,0.16)_0_2px,transparent_2px_30px)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <p className="mb-8 flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-royal uppercase">
          <span className="h-px w-10 bg-royal" aria-hidden />
          Our manifesto
        </p>
        <p className="flex flex-wrap gap-x-[0.28em] font-display text-[clamp(1.9rem,4.6vw,3.75rem)] leading-[1.18] font-bold tracking-tight text-balance">
          {WORDS.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[i / WORDS.length, Math.min(1, (i + 1.5) / WORDS.length)]}
              reduceMotion={reduceMotion}
            />
          ))}
        </p>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/60">
          That is how every project at ADD Creatives begins — with your customers,
          your goals, and a plan before a single pixel is placed.
        </p>
      </div>
    </section>
  );
}
