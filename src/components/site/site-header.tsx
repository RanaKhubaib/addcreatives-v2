"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "@/components/site/logo";
import { MagneticButton } from "@/components/site/magnetic-button";
import { ServiceIcon } from "@/components/site/service-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-navy/10 bg-white/90 shadow-[0_12px_36px_-22px_rgba(17,65,114,0.45)] backdrop-blur-xl"
          : "border-slate-200/70 bg-white/80 backdrop-blur-md"
      }`}
      onBlur={(event) => {
        const nextFocused = event.relatedTarget;
        if (!(nextFocused instanceof Node) || !event.currentTarget.contains(nextFocused)) {
          setServicesOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setServicesOpen(false);
          setMobileOpen(false);
        }
      }}
      onMouseLeave={() => setServicesOpen(false)}
    >
      {/* letterhead diagonal slash strip */}
      <div aria-hidden="true" className="slash-strip h-1.5 w-full" />
      <Container
        className={`flex items-center justify-between gap-6 transition-all duration-300 ${
          scrolled ? "h-[68px]" : "h-[82px]"
        }`}
      >
        <span onClick={closeMenu}>
          <LogoLink />
        </span>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {siteConfig.menuItems.map((item) =>
            item.href === "/services" ? (
              <div className="group" key={item.href}>
                <button
                  aria-controls="services-mega-menu"
                  aria-expanded={servicesOpen}
                  className={`nav-link inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 text-sm font-medium transition hover:bg-mist hover:text-navy ${
                    pathname.startsWith("/services")
                      ? "text-royal"
                      : "text-slate-600"
                  }`}
                  data-active={pathname.startsWith("/services") || undefined}
                  onClick={() => setServicesOpen((open) => !open)}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(":focus-visible")) {
                      setServicesOpen(true);
                    }
                  }}
                  onMouseEnter={() => setServicesOpen(true)}
                  type="button"
                >
                  {item.label}
                  <ArrowDown
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    size={14}
                  />
                </button>
              </div>
            ) : (
              <Link
                className={`nav-link rounded-full px-3.5 py-2.5 text-sm font-medium transition hover:bg-mist hover:text-navy ${
                  pathname === item.href ? "text-royal" : "text-slate-600"
                }`}
                data-active={pathname === item.href || undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            className="group hidden items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal xl:inline-flex"
            href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-royal transition-all duration-300 group-hover:bg-navy group-hover:text-white">
              <Phone aria-hidden="true" size={15} />
            </span>
            {siteConfig.company.phone}
          </a>
          <MagneticButton>
            <Button className="min-h-11 px-5 py-2.5 text-xs" href="/contact">
              Get a free quote
            </Button>
          </MagneticButton>
        </div>

        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-navy transition-colors hover:border-navy hover:bg-mist lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {servicesOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-label="Services menu"
            className="absolute inset-x-0 top-full z-30 border-y border-slate-200 bg-white/98 shadow-[0_28px_70px_-35px_rgba(17,65,114,0.4)] backdrop-blur-xl"
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            role="region"
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
          >
            <Container className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.7fr_0.85fr] lg:py-9">
              <div className="max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                  What we do
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.05em] text-ink">
                  One connected team. Every next step.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Strategy, creative, and technology come together around the
                  growth your business needs.
                </p>
                <Link
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-royal"
                  href="/services"
                  onClick={closeMenu}
                >
                  Explore all services
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={16}
                  />
                </Link>
              </div>

              <nav
                aria-label="Services"
                className="grid gap-2 sm:grid-cols-2"
                id="services-mega-menu"
              >
                {siteConfig.services.map((service, index) => (
                  <Link
                    className="group/service flex items-start gap-3 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-royal/25 hover:bg-mist"
                    href={`/services/${service.slug}`}
                    key={service.slug}
                    onClick={closeMenu}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f0fa] text-royal transition-all duration-300 group-hover/service:scale-110 group-hover/service:bg-navy group-hover/service:text-white">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-ink transition-colors group-hover/service:text-royal">
                          {service.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          0{index + 1}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {service.shortDescription}
                      </span>
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="grain relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#05367b] via-[#114172] to-[#0b4ea2] p-5 text-white">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-14 -z-10 h-40 w-40 rounded-full border border-white/20 transition-transform duration-500 hover:scale-110"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky">
                  A good place to start
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight">
                  Tell us what you want to move forward.
                </h3>
                <Link
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky hover:text-deep"
                  href="/contact"
                  onClick={closeMenu}
                >
                  Start a conversation <ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100vh-82px)] overflow-y-auto border-t border-slate-200 bg-white px-5 pb-8 pt-4 shadow-xl lg:hidden"
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {siteConfig.menuItems.map((item) => (
              <div className="border-b border-slate-100" key={item.href}>
                <Link
                  className="block py-4 font-medium text-ink transition-colors hover:text-royal"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.href === "/services" ? (
                  <div className="grid grid-cols-2 gap-x-3 pb-4">
                    {siteConfig.services.map((service) => (
                      <Link
                        className="py-2 text-sm text-slate-500 transition-colors hover:text-royal"
                        href={`/services/${service.slug}`}
                        key={service.slug}
                        onClick={closeMenu}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy"
              href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
            >
              <Phone aria-hidden="true" size={16} /> {siteConfig.company.phone}
            </a>
            <Button className="mt-5 w-full" href="/contact" onClick={closeMenu}>
              Get a free quote
            </Button>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
