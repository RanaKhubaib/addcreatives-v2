import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Dark (navy/ink) variant for contrast sections. */
  dark?: boolean;
}

/** Page section: max-w-7xl container, py-24 md:py-32. */
export function Section({ id, dark, className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 md:py-32',
        dark ? 'bg-ink text-white' : 'bg-white text-ink dark:bg-ink dark:text-white',
        className,
      )}
      {...rest}
    >
      <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
    </section>
  );
}

export interface SectionHeadingProps {
  eyebrow?: string;
  /** Main title. Pass ReactNode to embed an italic accent inline. */
  title: ReactNode;
  /** Optional accent phrase rendered in italic display type after the title. */
  accent?: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]',
            align === 'center' && 'justify-center',
            dark ? 'text-peri' : 'text-royal',
          )}
        >
          <span
            aria-hidden="true"
            className={cn('h-px w-8', dark ? 'bg-peri' : 'bg-royal')}
          />
          {eyebrow}
          {align === 'center' ? (
            <span
              aria-hidden="true"
              className={cn('h-px w-8', dark ? 'bg-peri' : 'bg-royal')}
            />
          ) : null}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-5xl">
        {title}
        {accent ? (
          <>
            {' '}
            <em className="font-display font-medium italic text-royal dark:text-peri">
              {accent}
            </em>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            dark ? 'text-white/70' : 'text-ink/65 dark:text-white/70',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
