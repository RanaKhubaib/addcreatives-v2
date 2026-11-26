'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useMediaQuery } from '@/lib/use-media-query';

/**
 * Custom cursor: one small royal dot that follows the pointer with a
 * slight spring lag. Nothing else — no ring, no labels, no grow-on-hover.
 * Hidden on touch devices (pointer: coarse) and fully disabled under
 * prefers-reduced-motion. pointer-events-none, so it never interferes
 * with clicks or text selection. Adds `has-custom-cursor` to <html>
 * (see globals.css) so the native cursor is hidden while it is active.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = finePointer && !reducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Slight lag behind the pointer — stiff enough to feel attached.
  const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[120] h-2.5 w-2.5"
      style={{ x: sx, y: sy }}
    >
      <span className="block h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal ring-2 ring-white/70" />
    </motion.div>
  );
}
