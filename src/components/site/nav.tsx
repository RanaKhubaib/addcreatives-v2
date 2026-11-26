"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { Wordmark } from "./wordmark";

/**
 * Sticky nav. Over the navy home hero it is transparent with white text;
 * once scrolled (or on light pages) it becomes solid white with navy text.
 * No backdrop blur — solid backgrounds only. Mobile menu is a full navy panel.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const onDarkHero = pathname === "/" && !scrolled;
  const linkTone = onDarkHero
    ? "text-white/80 hover:text-white"
    : "text-ink/70 hover:text-royal";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white"
            : onDarkHero
              ? "border-b border-white/10 bg-transparent"
              : "border-b border-slate-200 bg-white"
        }`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <Wordmark tone={onDarkHero ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {siteConfig.menuItems
              .filter((item) => item.href !== "/")
              .map((item) => (
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
              ))}
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
      </header>

      {/* Mobile menu — full navy panel, links rise in with staggered CSS delay. */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-deep pt-28 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex flex-col">
          {siteConfig.menuItems.map((item, index) => (
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
              <span className="font-mono text-xs text-skyline">
                0{index + 1}
              </span>
              <span className="font-display text-3xl font-semibold text-white transition-colors group-hover:text-skyline">
                {item.label}
              </span>
            </Link>
          ))}
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
