'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useMediaQuery } from '@/lib/use-media-query';

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the child follows the cursor (0–1). */
  strength?: number;
}

/**
 * Magnetic wrapper: child translates toward the cursor while hovered and
 * springs back on leave. Pointer:fine only; disabled on touch and when
 * prefers-reduced-motion is set.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = finePointer && !reducedMotion;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
