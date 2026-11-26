import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceIcon } from "@/components/site/service-icon";
import type { Service } from "@/data/site-config";

interface ServiceCardProps {
  service: Service;
  index?: number;
  /** "tall" cards span two rows in the bento grid */
  tall?: boolean;
}

export function ServiceCard({ index = 0, service, tall = false }: ServiceCardProps) {
  return (
    <Link className="group block h-full" href={`/services/${service.slug}`}>
      <article
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-royal/50 hover:shadow-[0_28px_55px_-36px_rgba(17,65,114,0.7)] ${
          tall ? "lg:row-span-2" : ""
        }`}
      >
        {/* top glow line that sweeps in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-navy via-royal to-sky transition-transform duration-500 group-hover:scale-x-100"
        />
        <div
          className={`image-frame relative overflow-hidden rounded-[1.15rem] bg-mist ${
            tall ? "aspect-[1.05] lg:aspect-auto lg:flex-1" : "aspect-[1.55]"
          }`}
        >
          <Image
            alt={service.imageAlt}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={service.image}
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-deep/75 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            0{index + 1} / Service
          </span>
          <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight aria-hidden="true" size={17} />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-royal transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
            <ServiceIcon name={service.icon} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
              {service.title.split(" ")[0]}
            </span>
          </span>
          <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-ink transition-colors group-hover:text-royal sm:text-xl">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            {service.shortDescription}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold text-navy">
            Explore service
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-royal"
              size={16}
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
