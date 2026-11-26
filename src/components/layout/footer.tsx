'use client';

import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const SITEMAP = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

const SOCIALS = [
  { label: 'Instagram', href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: siteConfig.socials.facebook, Icon: FacebookIcon },
  { label: 'LinkedIn', href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  { label: 'X', href: siteConfig.socials.x, Icon: XIcon },
  { label: 'YouTube', href: siteConfig.socials.youtube, Icon: YoutubeIcon },
] as const;

// Brand icons (lucide-react 1.x removed brand icons), drawn as inline
// stroke SVGs in the same style. TODO: swap for real brand assets if the
// client supplies official social artwork.
function BrandSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function InstagramIcon() {
  return (
    <BrandSvg>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </BrandSvg>
  );
}

function FacebookIcon() {
  return (
    <BrandSvg>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandSvg>
  );
}

function LinkedinIcon() {
  return (
    <BrandSvg>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </BrandSvg>
  );
}

function XIcon() {
  return (
    <BrandSvg>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </BrandSvg>
  );
}

function YoutubeIcon() {
  return (
    <BrandSvg>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </BrandSvg>
  );
}

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.address,
)}`;

/**
 * Footer: giant hover-reveal wordmark, sitemap, services list, contact
 * block (real facts from site-config), WhatsApp button, map link,
 * newsletter signup (POST /api/contact, type "newsletter"), social icons,
 * back-to-top, live Lahore (Asia/Karachi) clock, © 2026 ADD Creatives.
 */
export function Footer() {
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });
      if (!response.ok) throw new Error('Newsletter signup failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-20">
        {/* Giant wordmark — letters fill white on hover */}
        <div aria-hidden="true" className="select-none">
          <p className="font-display text-[13.5vw] font-extrabold leading-[0.9] tracking-tight lg:text-[11rem]">
            {'ADD'.split('').map((letter, index) => (
              <span key={`add-${index}`} className="wordmark-outline">
                {letter}
              </span>
            ))}
            <span className="wordmark-outline"> </span>
            {'CREATIVES'.split('').map((letter, index) => (
              <span key={`creatives-${index}`} className="wordmark-outline">
                {letter}
              </span>
            ))}
          </p>
        </div>
        <p className="sr-only">ADD Creatives</p>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div>
            <Logo variant="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}. A digital agency in Lahore, building
              websites, brands and campaigns that grow businesses.
            </p>
            <form onSubmit={onSubscribe} className="mt-6" aria-label="Newsletter signup">
              <label htmlFor="footer-newsletter-email" className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Join the newsletter
              </label>
              <div className="mt-3 flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-peri">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  aria-label="Subscribe to the newsletter"
                  className="flex w-12 shrink-0 cursor-pointer items-center justify-center bg-royal text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peri disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : status === 'success' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              {status === 'success' ? (
                <p className="mt-2 text-sm text-emerald-300" role="status">
                  You&apos;re in — welcome aboard.
                </p>
              ) : status === 'error' ? (
                <p className="mt-2 text-sm text-red-300" role="alert">
                  Something went wrong — please try again or email us directly.
                </p>
              ) : null}
            </form>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer sitemap">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              Sitemap
            </p>
            <ul className="mt-4 space-y-2.5">
              {SITEMAP.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              Services
            </p>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              Contact
            </p>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-white/75">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-peri" />
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.address}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-peri" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-peri" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-white/50">{siteConfig.hours}</p>
            </address>
            <Button
              href={siteConfig.whatsappUrl}
              variant="primary"
              size="sm"
              className="mt-5"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">© 2026 ADD Creatives. All rights reserved.</p>
          <p
            className="flex items-center gap-2 text-sm tabular-nums text-white/70"
            aria-label={`Local time in Lahore, Pakistan: ${time || 'loading'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Lahore, PKT — {time || '--:--:--'}
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-royal hover:bg-royal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peri"
              >
                <Icon />
              </a>
            ))}
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Open our address in Google Maps"
              className="flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs font-semibold text-white/70 transition-colors hover:border-royal hover:bg-royal hover:text-white"
            >
              <MapPin className="h-4 w-4" />
              Map
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-royal text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peri"
            >
              <ArrowUp className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
