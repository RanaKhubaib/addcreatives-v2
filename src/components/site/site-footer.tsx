import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div aria-hidden="true" className="slash-strip h-2 w-full opacity-90" />
      <div aria-hidden="true" className="hero-glow absolute -right-32 -top-40 h-80 w-80 rounded-full bg-royal/30 blur-[90px]" />

      {/* Big wordmark moment */}
      <Container className="relative pt-14 sm:pt-16">
        <p
          aria-hidden="true"
          className="outline-word select-none whitespace-nowrap font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-bold leading-none tracking-[-0.04em]"
        >
          ADD CREATIVES
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/70 sm:text-base">
          {siteConfig.company.tagline}. Thoughtful digital work for brands
          ready to move forward.
        </p>
      </Container>

      <Container className="relative grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.2fr] lg:py-16">
        <div>
          <Link aria-label="ADD Creatives — home" className="inline-block" href="/">
            <LogoMark dark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-blue-100/70">
            A creative and digital agency based in Lahore, Pakistan — strategy,
            design, technology, and marketing around one clear direction.
          </p>
          <a
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy"
            href={`https://wa.me/${siteConfig.company.whatsapp}?text=${encodeURIComponent("Hi ADD Creatives, I'd like to discuss a project.")}`}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={16} />
            Chat on WhatsApp
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={15}
            />
          </a>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {siteConfig.menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="group inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  href={item.href}
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-sky transition-all duration-300 group-hover:w-3"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
            What we do
          </h2>
          <ul className="mt-5 space-y-3">
            {siteConfig.services.map((service) => (
              <li key={service.slug}>
                <Link
                  className="group inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  href={`/services/${service.slug}`}
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-sky transition-all duration-300 group-hover:w-3"
                  />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
            Say hello
          </h2>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3 text-sm leading-6 text-blue-100/70">
              <MapPin aria-hidden="true" className="mt-1 shrink-0 text-sky" size={17} />
              {siteConfig.company.address}
            </li>
            <li>
              <a
                className="group flex items-center gap-3 text-sm text-blue-100/70 transition-colors hover:text-white"
                href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
              >
                <Phone aria-hidden="true" className="shrink-0 text-sky transition-transform duration-300 group-hover:-rotate-12" size={17} />
                {siteConfig.company.phone}
              </a>
            </li>
            <li>
              <a
                className="group flex items-center gap-3 text-sm text-blue-100/70 transition-colors hover:text-white"
                href={`mailto:${siteConfig.company.email}`}
              >
                <Mail aria-hidden="true" className="shrink-0 text-sky transition-transform duration-300 group-hover:scale-110" size={17} />
                {siteConfig.company.email}
              </a>
            </li>
            <li>
              <a
                className="text-sm text-blue-100/70 underline decoration-sky/50 underline-offset-4 transition-colors hover:text-white"
                href={siteConfig.company.website}
              >
                {siteConfig.company.website.replace(/^https?:\/\//, "")}
              </a>
            </li>
            <li>
              <Link
                className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-sky transition-colors hover:text-white"
                href="/contact"
              >
                Start a project
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={16}
                />
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="relative flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-blue-100/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ADD Creatives. All rights reserved.</p>
        <p>Based in Lahore, Pakistan · {siteConfig.company.website.replace(/^https?:\/\//, "")}</p>
      </Container>
    </footer>
  );
}
