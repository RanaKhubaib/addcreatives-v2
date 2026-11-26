/**
 * Consent-gated analytics.
 *
 * No third-party script is loaded until the visitor has accepted cookies:
 * consent is stored in localStorage under "ac-consent" === "accepted"
 * (set by the cookie banner). Everything here is a safe no-op on the
 * server, without consent, or when the measurement IDs are not set.
 */

const CONSENT_KEY = 'ac-consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let analyticsLoaded = false;

/** True only in the browser when the visitor has accepted cookies. */
export function hasConsent(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/** Load the Google tag script for a GA4 measurement ID. */
function loadGtag(gaId: string): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    return;
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

/** Load the Meta Pixel base snippet for a pixel ID. */
function loadMetaPixel(pixelId: string): void {
  if (typeof window.fbq === 'function') {
    return;
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  const fbq = (...args: unknown[]) => {
    window._fbq = window._fbq ?? [];
    (window._fbq as unknown[][]).push(args);
  };
  window.fbq = fbq;
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}

/**
 * Load GA4 and/or Meta Pixel — only when consent has been given and the
 * corresponding public ID is configured. Idempotent: safe to call twice
 * (e.g. after the visitor accepts the banner later in the session).
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  if (!hasConsent()) {
    return;
  }
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!gaId && !pixelId) {
    return;
  }
  if (gaId) {
    loadGtag(gaId);
  }
  if (pixelId) {
    loadMetaPixel(pixelId);
  }
  analyticsLoaded = true;
}

/** True once initAnalytics() has loaded at least one provider. */
export function isAnalyticsLoaded(): boolean {
  return analyticsLoaded;
}

/** Send a custom event to GA4 (and Meta Pixel) when loaded; no-op otherwise. */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, params);
  }
}
