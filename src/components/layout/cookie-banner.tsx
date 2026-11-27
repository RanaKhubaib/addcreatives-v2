'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const COOKIE_CONSENT_KEY = 'ac-consent';
export type CookieConsent = 'accepted' | 'declined';

/**
 * Minimal cookie banner: appears once (localStorage `ac-consent`).
 * On Accept/Decline it stores the choice and dispatches a `cookie-consent`
 * window event (detail: { consent }) for the analytics agent to read.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      stored = null;
    }
    if (stored) return;
    const id = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (consent: CookieConsent) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    } catch {
      // Storage unavailable — banner just hides for this session.
    }
    window.dispatchEvent(
      new CustomEvent('cookie-consent', { detail: { consent } }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[95] rounded-2xl border border-ink/10 bg-white/95 p-5 shadow-2xl backdrop-blur sm:left-6 sm:right-auto sm:max-w-md dark:border-white/10 dark:bg-ink/95"
    >
      <p className="font-display text-base font-bold text-ink dark:text-white">
        We use cookies
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink/65 dark:text-white/65">
        We use cookies to analyse traffic and improve your experience. You can
        accept or decline — the site works either way.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="h-11 flex-1 cursor-pointer rounded-full bg-royal text-sm font-semibold text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose('declined')}
          className="h-11 flex-1 cursor-pointer rounded-full border border-ink/15 text-sm font-semibold text-ink transition-colors hover:border-royal hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 dark:border-white/20 dark:text-white dark:hover:border-peri dark:hover:text-peri"
        >
          Decline
        </button>
      </div>
    </motion.div>
  );
}
