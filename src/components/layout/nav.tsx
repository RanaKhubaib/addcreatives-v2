'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/data/services';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * How long the mega menu waits after the pointer leaves the header before
 * closing. The delay forgives the short trip between the Services button
 * and the panel, so the menu never flickers shut mid-move.
 */
const MEGA_CLOSE_DELAY_MS = 150;

/**
 * Sticky nav: logo left, links, "Start a project" CTA, full-screen
 * staggered mobile menu. Solid white at every scroll position, on every
 * page — the header is never transparent, so the ink/navy links are
 * always readable. Desktop Services link opens a full-width mega menu
 * with all 7 services.
 *
 * Mega-menu visibility fix (2026-11-27): the menu used to close the moment
 * the pointer left the small Services button, because the mouseleave
 * handler lived on the button's <li> — there is a ~16px strip of nav
 * between the button and the panel, and crossing it killed the menu
 * before the pointer could reach the panel. Hover is now handled at the
 * <header> level instead: the panel is a child of the header, so moving
 * from the button into the panel never leaves the header, and the close
 * is delayed by 150ms so a brief exit is forgiven. The panel is a solid
 * white, full-width sheet that paints above all page content.
 */
export function Nav() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change (React's adjust-state-during-render pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  // Close menus on Escape; lock body scroll for the mobile menu.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Clear any pending delayed close (component unmount).
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = () => {
    cancelClose();
    setMegaOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), MEGA_CLOSE_DELAY_MS);
  };

  // The header is solid white at all times — no scrolled state, no
  // transparent variant — so it can never be transparent.
  return (
    <>
      <header
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className="sticky top-0 z-50 border-b border-ink/10 bg-white shadow-[0_8px_30px_rgba(10,15,28,0.08)] transition-all duration-300"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-6"
        >
          <Link href="/" aria-label="ADD Creatives — home" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            <li onMouseEnter={openMega}>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="services-mega-menu"
                onClick={() => setMegaOpen((open) => !open)}
                className={cn(
                  'flex cursor-pointer items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                  // Links are always dark navy on the white header — no
                  // `dark:` variant here: a dark-mode OS must never be
                  // able to flip them white-on-white (see globals.css).
                  megaOpen ? 'text-royal' : 'text-ink/80',
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    megaOpen && 'rotate-180',
                  )}
                />
              </button>
            </li>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-4 py-2.5 text-sm font-semibold transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                    // Always dark navy on the white header — never white.
                    pathname === link.href ? 'text-royal' : 'text-ink/80',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* The hide-below-sm lives on this wrapper, NOT on the Button:
                Button's own base classes include `inline-flex`, and `cn()`
                is a plain join (no tailwind-merge), so `hidden` + `inline-flex`
                on the same element loses to `inline-flex` in Tailwind v4's
                cascade — the CTA showed at 390px, the header row's
                min-content hit 439px, and the whole document got a sideways
                scroll on every page. Wrapping it hides it for real. */}
            <div className="hidden sm:block">
              <Button href="/contact" size="md">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Services mega menu (desktop). Solid white sheet, full width, above
            all page content. Kept open by the header-level hover handlers
            above — the panel is a child of the header, so moving from the
            trigger into the panel never triggers a close. */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              id="services-mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-white shadow-[0_30px_60px_-30px_rgb(10_15_28/0.25)] lg:block"
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
            >
              <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2 px-6 py-8">
                {services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group rounded-2xl p-4 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
                  >
                    <span className="text-xs font-bold tracking-widest text-royal">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 flex items-center gap-2 font-display text-lg font-bold text-ink group-hover:text-royal">
                      {service.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink/60">
                      {service.short}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="col-span-3 mt-2 flex items-center justify-between rounded-2xl bg-navy px-5 py-4 font-display text-lg font-bold text-white transition-colors hover:bg-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
                >
                  All services
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Mobile menu — full-screen overlay, staggered links, Services accordion */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-navy text-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-6">
              <Logo variant="dark" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center px-6 py-6">
              <ul className="space-y-1">
                {/* Services accordion */}
                <motion.li
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.4 }}
                >
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-list"
                    className="flex w-full items-center justify-between border-b border-white/10 py-4 font-display text-4xl font-bold tracking-tight transition-colors hover:text-peri"
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        'h-6 w-6 shrink-0 text-white/50 transition-transform duration-300',
                        mobileServicesOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen ? (
                      <motion.ul
                        id="mobile-services-list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center justify-between border-b border-white/5 py-3 pl-2 text-lg font-semibold text-white/85 transition-colors hover:text-peri"
                            >
                              {service.title}
                              <ArrowUpRight className="h-5 w-5 text-white/40" />
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/services"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between border-b border-white/5 py-3 pl-2 text-lg font-bold text-peri"
                          >
                            All services
                            <ArrowUpRight className="h-5 w-5" />
                          </Link>
                        </li>
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
                {NAV_LINKS.slice(1).map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + index * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-white/10 py-4 font-display text-4xl font-bold tracking-tight transition-colors hover:text-peri"
                    >
                      {link.label}
                      <ArrowUpRight className="h-6 w-6 text-white/50" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="mt-10 flex flex-col gap-3"
              >
                <Button href="/contact" size="lg" className="w-full">
                  Start a project
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
