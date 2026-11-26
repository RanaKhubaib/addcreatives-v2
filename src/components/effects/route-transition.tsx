'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Route transition: on every pathname change a navy curtain remounts
 * (keyed by pathname) fully covering the viewport, then wipes up in
 * <0.5s to reveal the new page. Skipped when prefers-reduced-motion.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        key={pathname}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-navy"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </>
  );
}
