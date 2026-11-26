import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/data/site-config";

/**
 * Services as a uniform card grid — 3 columns, 2 rows. Each card has an
 * image on top (4/3), a number, title, short description, up to three
 * feature tags, and an "Explore service" link. Hover: the card lifts,
 * the border turns royal, the image slowly zooms, and the arrow slides.
 * Staggered GSAP reveal on scroll. Used on the homepage and /services.
 */
export function ServiceCards({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={index * 0.05} className="h-full">
          <Link
            href={`/services/${service.slug}`}
            aria-label={`${service.title} — explore this service`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-royal hover:shadow-[0_28px_50px_-28px_rgba(17,65,114,0.45)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ice">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 font-mono text-xs font-semibold text-navy">
                0{index + 1}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-royal sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-steel sm:text-[0.9375rem]">
                {service.shortDescription}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full border border-slate-200 bg-mist px-3 py-1 text-xs font-medium text-navy"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="mt-auto block pt-6">
                <span className="flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-bold text-navy transition-colors duration-300 group-hover:text-royal">
                  Explore service
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <ArrowUpRight
                      aria-hidden="true"
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
