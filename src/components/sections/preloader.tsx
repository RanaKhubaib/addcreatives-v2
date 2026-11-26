"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const FLAG = 'ac-preloader-seen';
const MAX_MS = 1800;

/**
 * Full-screen navy intro overlay. Counts 0 → 100, then slides up like a
 * curtain. Skippable (click / Escape), shows once per session, and never
 * blocks content: it dismisses itself after 1.8s at the latest.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [instant, setInstant] = useState(false);
  const [count, setCount] = useState(0);
  const dismissedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    try {
      sessionStorage.setItem(FLAG, '1');
    } catch {
      // Session storage unavailable — the preloader simply shows again next visit.
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    // Already seen this session: hide immediately, with no exit animation.
    try {
      if (sessionStorage.getItem(FLAG)) {
        queueMicrotask(() => {
          dismissedRef.current = true;
          setInstant(true);
          setVisible(false);
        });
        return;
      }
    } catch {
      // Ignore storage errors and show the preloader once.
    }

    if (reduceMotion) {
      const t = window.setTimeout(dismiss, 300);
      return () => window.clearTimeout(t);
    }

    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startedAt) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(dismiss, 150);
      }
    };
    raf = requestAnimationFrame(tick);

    // Hard cap: content is never blocked longer than MAX_MS.
    const cap = window.setTimeout(dismiss, MAX_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
      window.removeEventListener('keydown', onKey);
    };
  }, [dismiss, reduceMotion]);

  if (!visible) return null;

  const overlay = (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') dismiss();
      }}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-navy text-white"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Diagonal-stripe motif sweeping across the overlay. */}
      <div
        aria-hidden
        className="preloader-stripes pointer-events-none absolute inset-0 opacity-20"
      />
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        {/* Logo mark: striped tile + wordmark. */}
        <div className="flex items-center gap-4">
          <div
            aria-hidden
            className="preloader-mark flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25"
          >
            <span className="font-display text-2xl font-bold tracking-tight">A</span>
          </div>
          <div className="text-left">
            <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              ADD CREATIVES
            </p>
            <p className="text-xs font-semibold tracking-[0.3em] text-peri uppercase">
              Digital Solutions
            </p>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <span className="font-display text-7xl leading-none font-bold tabular-nums sm:text-8xl">
            {count}
          </span>
          <span className="pb-2 text-sm font-semibold tracking-[0.25em] text-white/60 uppercase">
            / 100
          </span>
        </div>

        <div
          aria-hidden
          className="h-1 w-56 overflow-hidden rounded-full bg-white/15 sm:w-72"
        >
          <div
            className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>

        <p className="text-xs tracking-wide text-white/50">
          Click anywhere or press Escape to skip
        </p>
      </div>

      <style jsx>{`
        .preloader-stripes {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.35) 0 2px,
            transparent 2px 26px
          );
          background-size: 200% 200%;
          animation: preloader-sweep 2.4s linear infinite;
        }
        @keyframes preloader-sweep {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 74px 0;
          }
        }
        .preloader-mark {
          background-image: repeating-linear-gradient(
            -45deg,
            rgba(91, 127, 192, 0.55) 0 6px,
            transparent 6px 14px
          );
          background-size: 200% 200%;
          animation: preloader-sweep 1.8s linear infinite;
        }
      `}</style>
    </motion.div>
  );

  if (instant) return null;

  return <AnimatePresence>{overlay}</AnimatePresence>;
}
