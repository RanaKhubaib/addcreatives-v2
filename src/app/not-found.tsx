'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

/**
 * A small "catch the dot" game: the dot hops to a random spot in the play
 * area every second. Click it to score. Nothing here can break the build —
 * it is plain React state and timers.
 */
export default function NotFound() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 45, y: 40 });
  const [score, setScore] = useState(0);
  const [hops, setHops] = useState(0);

  const hop = useCallback(() => {
    setPos({ x: 5 + Math.random() * 85, y: 10 + Math.random() * 70 });
    setHops((count) => count + 1);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(hop, 1100);
    return () => window.clearInterval(timer);
  }, [hop]);

  const catchDot = () => {
    setScore((count) => count + 1);
    hop();
  };

  const reset = () => {
    setScore(0);
    setHops(0);
    hop();
  };

  return (
    <main
      id="main-content"
      className="relative overflow-hidden bg-mist px-6 py-16 text-ink sm:py-24 dark:bg-ink dark:text-white"
    >
      {/* Floating shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[8%] top-[12%] h-16 w-16 rounded-full bg-peri/30"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[10%] top-[20%] h-10 w-10 rotate-45 rounded-lg bg-royal/20"
          animate={{ y: [0, 14, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[15%] left-[15%] h-8 w-8 rounded-full bg-navy/20"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold leading-none sm:text-8xl">
          Lost?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70 dark:text-white/70">
          This page doesn&rsquo;t exist — it may have moved, or the link may be wrong.
          While you are here, try to catch the dot.
        </p>

        <div
          ref={areaRef}
          className="relative mx-auto mt-10 h-64 w-full max-w-xl overflow-hidden rounded-3xl border border-ink/10 bg-white dark:border-white/10 dark:bg-white/5"
          aria-label="Catch the dot game area"
        >
          <motion.button
            type="button"
            onClick={catchDot}
            className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-royal font-display text-lg font-bold text-white shadow-lg transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            aria-label="Catch the dot"
          >
            •
          </motion.button>
          <p className="absolute bottom-3 left-4 text-sm font-semibold text-ink/50 dark:text-white/50">
            Caught: {score} · Hops: {hops}
          </p>
          <button
            type="button"
            onClick={reset}
            className="absolute bottom-2 right-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
          </button>
        </div>

        <p className="mt-4 text-sm text-ink/60 dark:text-white/60">
          {score === 0
            ? 'Click the dot before it hops away.'
            : score < 5
              ? `Nice — ${score} caught. Keep going.`
              : `Impressive — ${score} caught. You clearly have fast hands.`}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Back home <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-semibold hover:border-royal hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal dark:border-white/20"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
