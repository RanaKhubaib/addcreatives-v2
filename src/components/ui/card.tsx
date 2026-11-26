'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Base card: 24px radius, soft border, subtle shadow. */
export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-ink/10 bg-white shadow-[0_1px_2px_rgb(10_15_28/0.04)] dark:border-white/10 dark:bg-white/[0.04]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Radius of the mouse-follow glow in px. */
  glowRadius?: number;
}

/**
 * Card with a mouse-follow radial glow (driven by --mx/--my CSS vars)
 * and a gradient-tinted border on hover.
 */
export function CardSpotlight({
  className,
  children,
  glowRadius = 320,
  ...rest
}: CardSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-[24px] border border-ink/10 bg-white transition-colors duration-300 hover:border-royal/50 hover:shadow-[0_20px_50px_-20px_rgb(11_77_162/0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-peri/60',
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          {
            background: `radial-gradient(${glowRadius}px circle at var(--mx, 50%) var(--my, 50%), rgb(11 77 162 / 0.14), transparent 65%)`,
          } as CSSProperties
        }
      />
      <div className="relative">{children}</div>
    </div>
  );
}
