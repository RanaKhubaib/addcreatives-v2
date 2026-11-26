import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Wordmark } from "./wordmark";

/**
 * Footer: giant outlined ADD CREATIVES wordmark on navy, contact details,
 * and a single thin diagonal slash — the one letterhead nod, used once.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const mapQuery = encodeURIComponent(siteConfig.company.address);

  return (
    <footer className="bg-deep text-white">
      <div className="wrap pt-16 sm:pt-20">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-skyline">Have a project in mind?</p>
            <p className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Let&rsquo;s make something{" "}
              <span className="serif-accent text-skyline">worth choosing.</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-colors duration-300 hover:bg-skyline"
          >
            Start a project
            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-10 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
              {siteConfig.company.tagline}. A Lahore-based creative and digital
              agency connecting strategy, design, technology, and marketing.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-white/45">Explore</p>
            <ul className="mt-5 space-y-3">
              {siteConfig.menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-skyline transition-all duration-300 group-hover:w-4"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-white/45">Services</p>
            <ul className="mt-5 space-y-3">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-skyline transition-all duration-300 group-hover:w-4"
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/45">Contact</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/80">
              <li>
                <a
                  href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-white transition-colors duration-300 hover:text-skyline"
                >
                  {siteConfig.company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.company.email}`}
                  className="transition-colors duration-300 hover:text-skyline"
                >
                  {siteConfig.company.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-skyline"
                >
                  {siteConfig.company.address}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors duration-300 hover:text-skyline"
                >
                  WhatsApp us
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant outlined wordmark. */}
        <div aria-hidden="true" className="select-none overflow-hidden border-t border-white/10 pt-8">
          <p className="outline-word whitespace-nowrap text-center font-display text-[13.5vw] font-extrabold leading-none tracking-tight">
            ADD CREATIVES
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ADD Creatives. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-[2px] w-10 -rotate-[24deg] bg-royal"
            />
            {siteConfig.company.tagline}
          </p>
          <a href="#top" className="font-semibold text-white/80 transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
