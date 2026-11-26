'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/lib/use-media-query';

export interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Show a light glare that follows the cursor. */
  glare?: boolean;
}

/**
 * 3D tilt card: rotates on the X/Y axes toward the cursor with a
 * perspective transform. Pointer:fine only; disabled on touch and when
 * prefers-reduced-motion is set.
 */
export function Tilt({ children, className, max = 10, glare = false }: TiltProps) {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = finePointer && !reducedMotion;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set((0.5 - py) * max * 2);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('[perspective:1000px]', className)}>
      <motion.div
        ref={ref}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
        {glare ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.22), transparent 60%)',
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
