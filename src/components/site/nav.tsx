"use client";

import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { Wordmark } from "./wordmark";

/**
 * Sticky nav with a full-width Services mega menu.
 * Desktop: hovering or clicking "Services" opens a white panel spanning the
 * full header width — all six services on the left, a navy "Start a
 * project" block on the right. Closes on Escape, outside click, route
 * change, or mouse leave. CSS transitions only, no layout thrash.
 * Mobile: Services expands as an accordion inside the full navy menu.
 * Over the navy home hero the header is transparent with white text;
 * once scrolled (or on light pages, or while the mega menu is open) it
 * becomes solid white with navy text. No backdrop blur — solid only.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mega menu on Escape or a click outside the header.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const onDarkHero = pathname === "/" && !scrolled && !megaOpen;
  const solid = scrolled || megaOpen || pathname !== "/";
  const linkTone = onDarkHero
    ? "text-white/80 hover:text-white"
    : "text-ink/70 hover:text-royal";
  const servicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "border-b border-slate-200 bg-white"
            : "border-b border-white/10 bg-transparent"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <Wordmark tone={onDarkHero ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {siteConfig.menuItems
              .filter((item) => item.href !== "/")
              .map((item) => {
                if (item.label === "Services") {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        onClick={() => setMegaOpen((value) => !value)}
                        className={`group relative flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-wide transition-colors duration-300 ${linkTone} ${
                          servicesActive ? "text-royal" : ""
                        }`}
                      >
                        Services
                        <ChevronDown
                          aria-hidden="true"
                          size={14}
                          className={`transition-transform duration-300 ${
                            megaOpen ? "rotate-180" : "group-hover:translate-y-0.5"
                          }`}
                        />
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-1.5 left-0 h-px bg-royal transition-all duration-300 ${
                            servicesActive || megaOpen
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative text-[0.8125rem] font-semibold tracking-wide transition-colors duration-300 ${linkTone} ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "text-royal"
                        : ""
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px bg-royal transition-all duration-300 ${
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
              className={`hidden text-[0.8125rem] font-semibold transition-colors duration-300 md:block ${linkTone}`}
            >
              {siteConfig.company.phone}
            </a>
            <Link
              href="/contact"
              className="group hidden items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-[0.8125rem] font-bold text-white transition-colors duration-300 hover:bg-royal sm:inline-flex"
            >
              Start a project
              <ArrowUpRight
                aria-hidden="true"
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                onDarkHero
                  ? "border-white/30 text-white"
                  : "border-slate-300 text-navy"
              }`}
            >
              {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>

        {/* Full-width Services mega menu (desktop). */}
        <div
          className={`absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-[0_36px_60px_-32px_rgba(5,54,123,0.4)] transition-all duration-300 lg:block ${
            megaOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_19rem] lg:gap-14">
            <div>
              <p className="eyebrow flex items-center gap-3 text-royal">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-royal" />
                What we do
              </p>
              <div className="mt-7 grid gap-2 sm:grid-cols-2 sm:gap-x-8">
                {siteConfig.services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    tabIndex={megaOpen ? 0 : -1}
                    className={`group flex items-start gap-4 rounded-xl px-4 py-4 transition-all duration-300 hover:bg-mist ${
                      megaOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                    style={{ transitionDelay: megaOpen ? `${60 + index * 35}ms` : "0ms" }}
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-royal">
                      0{index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-royal">
                        {service.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={15}
                          className="shrink-0 text-royal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-steel">
                        {service.shortDescription}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                tabIndex={megaOpen ? 0 : -1}
                className={`group mt-4 inline-flex items-center gap-2 px-4 text-sm font-bold text-navy transition-all duration-300 hover:text-royal ${
                  megaOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: megaOpen ? "280ms" : "0ms" }}
              >
                View all services
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <aside className="rounded-2xl bg-navy p-7 text-white">
              <p className="eyebrow text-skyline">Start a project</p>
              <p className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight">
                Not sure where to{" "}
                <span className="serif-accent text-skyline">begin?</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Tell us what you want to achieve and we will suggest a clear
                first step — no pressure, no jargon.
              </p>
              <Link
                href="/contact"
                tabIndex={megaOpen ? 0 : -1}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition-colors duration-300 hover:bg-skyline"
              >
                Start a project
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-white/70">
                <a
                  href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
                  tabIndex={megaOpen ? 0 : -1}
                  className="font-semibold text-white transition-colors duration-300 hover:text-skyline"
                >
                  {siteConfig.company.phone}
                </a>
                <br />
                <a
                  href={`mailto:${siteConfig.company.email}`}
                  tabIndex={megaOpen ? 0 : -1}
                  className="transition-colors duration-300 hover:text-skyline"
                >
                  {siteConfig.company.email}
                </a>
              </p>
            </aside>
          </div>
        </div>
      </header>

      {/* Mobile menu — full navy panel, links rise in with staggered CSS delay. */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-deep pb-10 pt-28 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex flex-col">
          {siteConfig.menuItems.map((item, index) => {
            if (item.label === "Services") {
              return (
                <div key={item.href} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((value) => !value)}
                    aria-expanded={mobileServicesOpen}
                    tabIndex={open ? 0 : -1}
                    className={`group flex w-full items-baseline gap-4 py-5 text-left transition-all duration-300 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                  >
                    <span className="font-mono text-xs text-skyline">0{index + 1}</span>
                    <span className="flex-1 font-display text-3xl font-semibold text-white transition-colors group-hover:text-skyline">
                      Services
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      className={`text-skyline transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      mobileServicesOpen
                        ? "[grid-template-rows:1fr]"
                        : "[grid-template-rows:0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-1 pb-5 pl-9">
                        {siteConfig.services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            tabIndex={open && mobileServicesOpen ? 0 : -1}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                          >
                            {service.title}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          tabIndex={open && mobileServicesOpen ? 0 : -1}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm font-bold text-skyline transition-colors duration-300 hover:bg-white/10"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline gap-4 border-b border-white/10 py-5 transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
              >
                <span className="font-mono text-xs text-skyline">0{index + 1}</span>
                <span className="font-display text-3xl font-semibold text-white transition-colors group-hover:text-skyline">
                  {item.label}
                </span>
              </Link>
            );
          })}
          <div
            className={`mt-8 flex flex-col gap-3 transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
          >
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy"
            >
              Start a project <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.company.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white"
            >
              Chat on WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-white/60">
              {siteConfig.company.email} · {siteConfig.company.phone}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
