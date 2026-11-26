"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Service } from "@/data/site-config";

/**
 * Services as an interactive index list — big numbered rows, not cards.
 * Desktop: hovering a row reveals a floating image preview that follows
 * the cursor (transform only). Mobile: first tap expands the row.
 */
export function ServiceIndex({ services }: { services: Service[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Service | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!finePointer || !previewRef.current || !listRef.current) return;
    const preview = previewRef.current;
    const xTo = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3.out" });
    const list = listRef.current;
    const onMove = (event: MouseEvent) => {
      xTo(event.clientX + 28);
      yTo(event.clientY - 140);
    };
    list.addEventListener("mousemove", onMove, { passive: true });
    return () => list.removeEventListener("mousemove", onMove);
  }, [finePointer]);

  function handleRowClick(event: React.MouseEvent, service: Service) {
    if (window.innerWidth < 1024 && expanded !== service.slug) {
      event.preventDefault();
      setExpanded(service.slug);
    }
  }

  return (
    <div ref={listRef} className="relative">
      {/* Floating preview — desktop only, follows the cursor. */}
      {finePointer && active ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[21rem] overflow-hidden rounded-xl shadow-2xl lg:block"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={active.image}
              alt=""
              fill
              quality={75}
              sizes="21rem"
              className="object-cover"
            />
          </div>
          <p className="bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            {active.title}
          </p>
        </div>
      ) : null}

      <div className="border-b border-slate-300">
        {services.map((service, index) => {
          const isOpen = expanded === service.slug;
          return (
            <div key={service.slug} className="border-t border-slate-300">
              <Link
                href={`/services/${service.slug}`}
                onClick={(event) => handleRowClick(event, service)}
                onMouseEnter={() => setActive(service)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(service)}
                onBlur={() => setActive(null)}
                aria-expanded={isOpen}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors duration-300 sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-xs font-semibold text-royal sm:text-sm">
                  0{index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-2xl font-semibold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-royal sm:text-4xl">
                    {service.title}
                  </span>
                  <span className="mt-1.5 hidden max-w-2xl text-sm leading-6 text-steel sm:block">
                    {service.shortDescription}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-steel md:block">
                    Explore
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:h-12 sm:w-12">
                    <ArrowUpRight
                      aria-hidden="true"
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    size={16}
                    className={`text-steel transition-transform duration-300 lg:hidden ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </Link>

              {/* Mobile expand panel. */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
                  isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pl-8 pr-2 sm:pl-14">
                    <p className="text-sm leading-6 text-steel">{service.shortDescription}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-navy"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-royal"
                    >
                      Explore this service
                      <ArrowUpRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
