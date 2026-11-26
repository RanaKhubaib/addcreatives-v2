'use client';

import { useAnimationFrame, useScroll, useVelocity } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Base loop duration in seconds (at rest). */
  duration?: number;
  /** Pause the loop while hovered. Default true. */
  pauseOnHover?: boolean;
  /**
   * When true, the loop speeds up with page scroll velocity
   * (framer-motion useScroll + useVelocity) and eases back to base speed.
   */
  velocityReactive?: boolean;
}

/**
 * Infinite marquee: content is duplicated (second copy aria-hidden) and
 * translated -50% on a CSS loop. Pause on hover; optionally velocity-reactive.
 */
export function Marquee({
  children,
  className,
  duration = 32,
  pauseOnHover = true,
  velocityReactive = false,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useAnimationFrame(() => {
    if (!velocityReactive) return;
    const track = trackRef.current;
    if (!track) return;
    const speed = Math.abs(velocity.get());
    // Scroll faster -> shorter loop duration (min 8s), eased toward target.
    const target = Math.max(8, duration - Math.min(speed / 60, duration - 8));
    const current = parseFloat(track.style.animationDuration || `${duration}s`);
    const next = current + (target - current) * 0.08;
    track.style.animationDuration = `${next.toFixed(2)}s`;
  });

  return (
    <div
      className={cn(
        'overflow-hidden',
        pauseOnHover && 'marquee-paused',
        className,
      )}
    >
      <div
        ref={trackRef}
        className="animate-marquee flex w-max items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
