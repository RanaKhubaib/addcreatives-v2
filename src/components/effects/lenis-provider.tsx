'use client';

import Lenis from 'lenis';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface LenisContextValue {
  /** Pause (true) / resume (false) smooth scrolling, e.g. while a modal is open. */
  setPaused: (paused: boolean) => void;
  /** Current Lenis instance, or null when Lenis is disabled (touch / reduced motion). */
  getLenis: () => Lenis | null;
  /**
   * Hand the rAF loop to an external driver (GSAP ticker, see
   * selected-work.tsx). While driven, the provider stops its own loop so
   * lenis.raf() is called exactly once per frame; call with false to hand
   * the loop back to the provider.
   */
  setGsapDriven: (driven: boolean) => void;
}

const LenisContext = createContext<LenisContextValue>({
  setPaused: () => {},
  getLenis: () => null,
  setGsapDriven: () => {},
});

/** Read the Lenis controls anywhere inside <LenisProvider>. */
export function useLenis() {
  return useContext(LenisContext);
}

/** True on devices whose primary input is touch — Lenis smoothing is off there. */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  // pointer: coarse is the reliable "primary input is touch" signal.
  // ('ontouchstart' alone also matches touch-capable laptops whose primary
  // pointer is a mouse, so it only counts when there is no fine pointer.)
  if (window.matchMedia('(pointer: coarse)').matches) return true;
  return (
    'ontouchstart' in window &&
    !window.matchMedia('(pointer: fine)').matches
  );
}

/**
 * Lenis smooth-scroll provider: `new Lenis({ lerp: 0.18 })` with a
 * requestAnimationFrame loop. Not initialised when prefers-reduced-motion
 * is set or on touch devices (native scroll there — smoother and cheaper).
 * Pauses via the context `setPaused` (used by the command palette).
 * The instance is exposed via `getLenis` so GSAP ScrollTrigger can be
 * kept in sync (see selected-work.tsx): without that wiring the pinned
 * gallery's ScrollTrigger positions desync from Lenis's smoothed scroll
 * and the pin traps scroll at its boundaries.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef(0);
  const gsapDrivenRef = useRef(false);

  const startLoop = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis || gsapDrivenRef.current) return;
    cancelAnimationFrame(rafRef.current);
    const loop = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (isTouchDevice()) return;
    const lenis = new Lenis({ lerp: 0.18 });
    lenisRef.current = lenis;
    startLoop();
    return () => {
      stopLoop();
      lenis.destroy();
      lenisRef.current = null;
      gsapDrivenRef.current = false;
    };
  }, [startLoop, stopLoop]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);

  const getLenis = useCallback(() => lenisRef.current, []);

  const setGsapDriven = useCallback(
    (driven: boolean) => {
      gsapDrivenRef.current = driven;
      if (driven) stopLoop();
      else startLoop();
    },
    [startLoop, stopLoop],
  );

  return (
    <LenisContext.Provider value={{ setPaused, getLenis, setGsapDriven }}>
      {children}
    </LenisContext.Provider>
  );
}
