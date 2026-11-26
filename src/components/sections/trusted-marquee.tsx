"use client";

import { clients } from '@/data/clients';
import { siteConfig } from '@/data/site-config';

// TODO: Replace these placeholder names with real client logos (with
// permission). This section stays hidden until SHOW_CLIENT_LOGOS is true.
const SHOW = siteConfig.features.SHOW_CLIENT_LOGOS;

const WORDMARK_STYLES = [
  'font-display font-bold tracking-tight',
  'font-sans font-extrabold tracking-[0.18em] uppercase',
  'font-display font-medium italic',
  'font-sans font-black tracking-tight',
  'font-display font-bold tracking-[0.08em] uppercase',
  'font-sans font-semibold italic tracking-tight',
] as const;

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // Duplicate the list so the -50% loop is seamless.
  const items = [...clients, ...clients];
  return (
    <div className="marquee flex overflow-hidden" aria-hidden="true">
      <div
        className={`marquee-track flex shrink-0 items-center gap-14 pr-14 ${reverse ? 'marquee-reverse' : ''}`}
      >
        {items.map((client, i) => (
          <span key={`${client.name}-${i}`} className="flex shrink-0 items-center gap-3">
            <span
              className={`text-2xl whitespace-nowrap text-ink/45 transition-colors hover:text-navy sm:text-3xl ${WORDMARK_STYLES[i % WORDMARK_STYLES.length]}`}
            >
              {client.name}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-ink/30 uppercase">
              {client.industry}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrustedMarquee() {
  if (!SHOW) return null;

  return (
    <section aria-label="Trusted by" className="border-y border-ink/8 bg-mist py-12">
      <p className="mb-8 text-center text-xs font-bold tracking-[0.28em] text-ink/50 uppercase">
        Trusted by growing businesses
      </p>
      <p className="sr-only">
        Clients include {clients.map((c) => c.name).join(', ')}.
      </p>
      <div className="space-y-6">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 46s linear infinite;
          will-change: transform;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
