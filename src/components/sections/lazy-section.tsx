'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Reserve this much vertical space before the section mounts, to avoid layout shift. */
  minHeight: number;
  /** Stable marker written to the placeholder so the section is visible in the SSR HTML. */
  label: string;
}

/**
 * Below-fold gate: renders nothing but a min-height placeholder until the
 * section is near the viewport (IntersectionObserver, 200px rootMargin),
 * then mounts its children — which are next/dynamic imports, so their JS
 * chunks are only fetched on approach, never in the first load. Once
 * mounted it stays mounted. Content therefore appears on scroll (every
 * section below already animates in on scroll), while the first load
 * stays small. The placeholder keeps its data-lazy-section marker in the
 * server-rendered HTML so the section is still discoverable pre-scroll.
 */
export function LazySection({ children, minHeight, label }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      // No observer (very old browser): mount on the next tick.
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-lazy-section={label}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? children : null}
    </div>
  );
}
