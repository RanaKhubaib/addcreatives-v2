'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/lib/use-media-query';

/**
 * Custom cursor: a royal dot + trailing ring. The ring expands over
 * links/buttons (anything matching [data-cursor], a, button, [role=button])
 * and shows a label ("View" / "Drag" etc.) when hovering an element with
 * data-cursor-label. Hidden on touch devices (pointer: coarse) and when
 * prefers-reduced-motion is set. Adds `has-custom-cursor` to <html>
 * (see globals.css) so the native cursor is hidden while active.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = finePointer && !reducedMotion;
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const labelled = target?.closest?.('[data-cursor-label]') as HTMLElement | null;
      const interactive = target?.closest?.(
        'a, button, [role="button"], [data-cursor]',
      );
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHovering(Boolean(interactive || labelled));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — follows the pointer exactly */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-royal"
        style={{ x, y }}
      >
        <span className="block h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal" />
      </motion.div>
      {/* Ring — springs behind the dot, expands on interactive elements */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[119]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-royal/70"
          animate={{
            width: label ? 72 : hovering ? 56 : 36,
            height: label ? 72 : hovering ? 56 : 36,
            backgroundColor: label
              ? 'rgba(11, 77, 162, 0.92)'
              : 'rgba(11, 77, 162, 0)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          {label ? (
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
}
