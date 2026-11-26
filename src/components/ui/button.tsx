'use client';

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-royal text-white shadow-[0_10px_30px_-10px_rgb(11_77_162/0.6)]',
  outline:
    'border border-ink/15 bg-transparent text-ink hover:border-royal hover:text-royal dark:border-white/20 dark:text-white dark:hover:border-peri dark:hover:text-peri',
  ghost: 'bg-transparent text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10',
  dark: 'bg-ink text-white dark:bg-white dark:text-ink',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders an anchor instead of a button when provided. */
  href?: string;
  children: ReactNode;
}

/**
 * Primary button. `primary` and `dark` get a fill-wipe hover (a second
 * colour slides up over the base). Wrap in <Magnetic> for magnetic hover.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  // Fill-wipe overlay: slides up on hover for filled variants.
  const wipe =
    variant === 'primary' || variant === 'dark' ? (
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
          variant === 'primary' ? 'bg-navy' : 'bg-royal',
        )}
      />
    ) : null;

  const label = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );

  if (href) {
    // Only anchor-safe props cross over; button-only props (type, disabled,
    // form handlers, …) must not spread onto <a>.
    const {
      onClick,
      'aria-label': ariaLabel,
      title,
      id,
      tabIndex,
    } = rest;
    return (
      <a
        href={href}
        id={id}
        title={title}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
      >
        {wipe}
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {wipe}
      {label}
    </button>
  );
}
