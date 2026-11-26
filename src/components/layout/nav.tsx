'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { services } from '@/data/services';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Opens the command palette (listened to by <CommandPalette />). */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent('ac:open-command-palette'));
}

/**
 * Sticky nav: logo left, links, theme toggle, Cmd+K button, "Start a
 * project" CTA, full-screen staggered mobile menu. Transparent over the
 * hero, solid (blur + border) once scrolled. Desktop Services link opens
 * a full-width mega menu with all 7 services.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change (React's adjust-state-during-render pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
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

  const solid = scrolled || megaOpen;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          solid
            ? 'border-b border-ink/10 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink/85'
            : 'border-b border-transparent bg-transparent',
        )}
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
            <li
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                aria-controls="services-mega-menu"
                onClick={() => setMegaOpen((open) => !open)}
                className={cn(
                  'flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                  megaOpen ? 'text-royal' : 'text-ink/80 dark:text-white/80',
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
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal',
                    pathname === link.href
                      ? 'text-royal'
                      : 'text-ink/80 dark:text-white/80',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Search — open command palette (Control or Command K)"
              className="hidden h-10 cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 text-sm text-ink/60 transition-colors hover:border-royal hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal md:flex dark:border-white/15 dark:bg-white/5 dark:text-white/60 dark:hover:border-peri dark:hover:text-peri"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="rounded-md border border-ink/10 bg-ink/5 px-1.5 py-0.5 text-[11px] font-semibold dark:border-white/15 dark:bg-white/10">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <Button href="/contact" size="md" className="hidden sm:inline-flex">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition-colors hover:text-royal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Services mega menu (desktop) */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              id="services-mega-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-white/95 shadow-[0_30px_60px_-30px_rgb(10_15_28/0.25)] backdrop-blur-xl lg:block dark:border-white/10 dark:bg-ink/95"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2 px-6 py-8">
                {services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group rounded-2xl p-4 transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal dark:hover:bg-white/5"
                  >
                    <span className="text-xs font-bold tracking-widest text-royal dark:text-peri">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 flex items-center gap-2 font-display text-lg font-bold text-ink group-hover:text-royal dark:text-white">
                      {service.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink/60 dark:text-white/60">
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

      {/* Mobile menu — full-screen overlay, staggered links */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex flex-col bg-navy text-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <Logo variant="dark" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center px-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.4 }}
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
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openCommandPalette();
                  }}
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Search className="h-4 w-4" />
                  Search — press ⌘K
                </button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
