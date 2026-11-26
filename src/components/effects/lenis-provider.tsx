'use client';

import Lenis from 'lenis';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface LenisContextValue {
  /** Pause (true) / resume (false) smooth scrolling, e.g. while a modal is open. */
  setPaused: (paused: boolean) => void;
}

const LenisContext = createContext<LenisContextValue>({
  setPaused: () => {},
});

/** Read the Lenis controls anywhere inside <LenisProvider>. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth-scroll provider: `new Lenis({ lerp: 0.1 })` with a
 * requestAnimationFrame loop. Not initialised when prefers-reduced-motion
 * is set. Pauses via the context `setPaused` (used by the command palette).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);

  return (
    <LenisContext.Provider value={{ setPaused }}>
      {children}
    </LenisContext.Provider>
  );
}
