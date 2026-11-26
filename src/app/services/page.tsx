import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GsReveal } from "@/components/motion/gsap-reveal";
import { siteConfig } from "@/data/site-config";

const serviceConnections = [
  {
    number: "01",
    title: "A clear foundation",
    text: "Strategy and brand direction help every later decision stay connected to the audience and purpose.",
  },
  {
    number: "02",
    title: "A useful experience",
    text: "Design, development, and content make it easier for people to understand the offer and take a next step.",
  },
  {
    number: "03",
    title: "A way to learn",
    text: "Search, social, and paid campaigns create opportunities to share the work and learn from real response.",
  },
];

export const metadata: Metadata = {
  title: "Creative and Digital Services | ADD Creatives",
  description:
    "Explore web design, SEO, social media, branding, paid ads, and content services from ADD Creatives.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        description="Build a stronger digital presence with a team that connects strategy, creative, and technology around your goals."
        eyebrow="Services"
        image="/images/digital-product.jpg"
        imageAlt="A desktop monitor and tablet displaying digital interface designs; illustrative stock photography."
        imageNote="Illustrative stock image—not a client website or ADD Creatives project."
        title="Creative and digital services built around your goals."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <GsReveal>
            <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  What we can do together
                </p>
                <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
                  Choose the right next step.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-muted">
                Every service can stand on its own. When a brief needs more
                than one discipline, we connect the work around a shared
                direction.
              </p>
            </div>
          </GsReveal>

          <div className="mt-10">
            {siteConfig.services.map((service, index) => {
              const imageFirst = index % 2 === 1;
              return (
                <GsReveal key={service.slug}>
                  <article className="group grid gap-6 border-t border-slate-300 py-8 transition-colors duration-300 hover:border-royal/50 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
                    <Link
                      aria-label={`Explore ${service.title}`}
                      className={`image-frame group relative block aspect-[1.55] overflow-hidden rounded-[1.5rem] bg-light-blue ${
                        imageFirst ? "md:order-2" : ""
                      }`}
                      href={`/services/${service.slug}`}
                    >
                      <Image
                        alt={service.imageAlt}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 48vw"
                        src={service.image}
                      />
                    </Link>
                    <div className={imageFirst ? "md:order-1" : ""}>
                      <p className="text-xs font-semibold text-brand-blue">
                        0{index + 1} <span aria-hidden="true">/</span> Service
                      </p>
                      <h3 className="mt-3 max-w-lg font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
                        <Link
                          className="transition-colors hover:text-brand-blue"
                          href={`/services/${service.slug}`}
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
                        {service.shortDescription}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <li
                            className="text-xs font-medium text-slate-600"
                            key={feature}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal"
                        href={`/services/${service.slug}`}
                      >
                        Explore this service
                        <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={16} />
                      </Link>
                    </div>
                  </article>
                </GsReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-soft py-16 sm:py-20 lg:py-24">
        <Container>
          <GsReveal>
            <SectionHeading
              description="Services are most useful when they support one another. We keep the plan focused on what your audience and business need."
              eyebrow="Connected thinking"
              title="One clear direction, carried through."
            />
          </GsReveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {serviceConnections.map((item, index) => (
              <GsReveal delay={index * 0.05} key={item.number}>
                <div className="h-full rounded-2xl border-t border-slate-300 bg-white/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/50 hover:bg-white hover:shadow-[0_20px_44px_-32px_rgba(19,29,46,0.55)]">
                  <span className="text-xs font-semibold text-brand-blue">
                    {item.number}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.text}
                  </p>
                </div>
              </GsReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-14 text-white sm:py-16">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
              Have a project in mind?
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-3xl">
              Let&apos;s find the right place to start.
            </h2>
          </div>
          <Button href="/contact" variant="light">
            Tell us about it <ArrowRight aria-hidden="true" size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
