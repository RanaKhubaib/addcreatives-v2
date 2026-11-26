import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHead } from "@/components/site/section-head";
import { siteConfig } from "@/data/site-config";

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | ADD Creatives`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedServices = siteConfig.services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const serviceFaq = [
    {
      question: `Is ${service.title.toLowerCase()} right for my business?`,
      answer:
        "It can be a good fit when the work supports a clear audience need or business goal. We start with a conversation to understand your priorities and whether the scope makes sense.",
    },
    {
      question: "Can I combine this with another service?",
      answer:
        "Yes. We can connect services when they support the same direction. You can also begin with one focused project.",
    },
    {
      question: "How do you decide what to include?",
      answer:
        "We build a clear scope around your needs, priorities, and budget, then explain the recommended work before you commit.",
    },
    {
      question: "What happens after delivery?",
      answer:
        "We review the work with you and discuss ongoing support or the next useful improvement if you need it.",
    },
  ];

  return (
    <main>
      <PageIntro
        eyebrow={service.title}
        title={service.heroTitle}
        description={service.shortDescription}
        back={{ label: "All services", href: "/services" }}
        image={service.image}
        imageAlt={service.imageAlt}
        imageNote="Illustrative stock image — not ADD Creatives client work."
      />

      <section className="pb-20 sm:pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-royal">A clear plan, carefully delivered</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              {service.title}, shaped around the{" "}
              <span className="serif-accent text-royal">brief.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-3xl text-base leading-7 text-steel sm:text-lg sm:leading-8">
              {service.introduction}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-20 sm:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-royal">Capabilities</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              The parts that make the{" "}
              <span className="serif-accent text-royal">whole work.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-steel">
              We agree the right scope together, based on your goals, audience,
              timing, and available resources.
            </p>
          </Reveal>
          <div className="border-b border-slate-300">
            {service.features.map((feature, index) => (
              <Reveal key={feature} delay={index * 0.025}>
                <div className="group flex items-baseline gap-4 border-t border-slate-300 py-4 transition-colors duration-300 hover:bg-white sm:px-3">
                  <span className="font-mono text-xs font-semibold text-royal">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium leading-6 text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-base">
                    {feature}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="wrap">
          <SectionHead
            eyebrow="What this supports"
            title={
              <>
                Useful foundations for{" "}
                <span className="serif-accent text-royal">what comes next.</span>
              </>
            }
            description="The right scope depends on the brief. These are practical areas the work can support, not guaranteed business outcomes."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 0.04}>
                <div className="border-t border-slate-300 pt-5">
                  <span className="font-mono text-xs font-semibold text-royal">
                    0{index + 1}
                  </span>
                  <p className="mt-3 max-w-sm font-display text-lg font-semibold leading-7 text-ink">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep py-20 text-white sm:py-24">
        <div className="wrap">
          <SectionHead
            eyebrow="Our process"
            tone="dark"
            title={
              <>
                A thoughtful process{" "}
                <span className="serif-accent text-skyline">from day one.</span>
              </>
            }
            description="The details change with every brief, but the way we work stays clear and collaborative."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {service.process.map((step, index) => (
              <li key={step} className="border-t border-white/25 pt-5">
                <span className="font-mono text-xs font-semibold text-skyline">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {step}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {service.processDetails[index]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-royal">Good to know</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Questions before you{" "}
              <span className="serif-accent text-royal">get started.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Faq items={serviceFaq} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-16 sm:py-20">
        <div className="wrap">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-royal">Related capabilities</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                More ways{" "}
                <span className="serif-accent text-royal">we can help</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
            >
              All services
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="mt-8 border-b border-slate-300">
            {relatedServices.map((related, index) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group flex items-center justify-between gap-4 border-t border-slate-300 py-5"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold text-royal">
                    0{index + 1}
                  </span>
                  <span className="font-display text-lg font-semibold text-ink transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-royal sm:text-xl">
                    {related.title}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-royal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
