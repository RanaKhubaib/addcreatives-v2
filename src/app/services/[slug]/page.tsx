import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { getServiceBySlug, services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found | ADD Creatives' };
  return {
    title: `${service.title} | ADD Creatives`,
    description: service.short,
    openGraph: {
      title: `${service.title} | ADD Creatives`,
      description: service.short,
    },
  };
}

const PROCESS_DESCRIPTIONS: Record<string, string> = {
  Discover: 'We listen first — your goals, your customers, and what success looks like.',
  Define: 'We agree on scope, timeline, and price before any work starts.',
  Create: 'We design and build in the open, sharing progress as we go.',
  Evolve: 'We launch, measure, and keep improving based on real results.',
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = caseStudies.slice(0, 2);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      {/* Hero */}
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            {service.category} · Service
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            {service.short}
          </p>
          <p className="mt-4 max-w-2xl text-ink/70 dark:text-white/70">{service.description}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="included-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="included-heading" className="font-display text-2xl font-bold sm:text-3xl">
            What&rsquo;s included
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-3xl border border-ink/10 bg-white p-5 dark:border-white/10 dark:bg-white/5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="benefits-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="benefits-heading" className="font-display text-2xl font-bold sm:text-3xl">
            What you get out of it
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <li key={benefit} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <p className="pt-2 text-ink/80 dark:text-white/80">{benefit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="process-heading" className="font-display text-2xl font-bold sm:text-3xl">
            How we do it
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-3xl border border-ink/10 p-6 dark:border-white/10"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-royal">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{step}</h3>
                <p className="mt-2 text-sm text-ink/70 dark:text-white/70">
                  {PROCESS_DESCRIPTIONS[step] ?? 'We work through this step with you, in the open.'}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="tools-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Tools we use
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy dark:bg-white/10 dark:text-white"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related work */}
      <section
        aria-labelledby="related-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="related-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Related work
          </h2>
          <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
            The projects below are illustrative concepts, shown to explain how we work.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((study) => (
              <li
                key={study.slug}
                className="overflow-hidden rounded-3xl border border-ink/10 bg-white dark:border-white/10 dark:bg-white/5"
              >
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-mist px-3 py-1 text-xs font-semibold text-royal dark:bg-white/10">
                    Illustrative concept
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{study.title}</h3>
                  <p className="mt-2 text-ink/70 dark:text-white/70">{study.excerpt}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                  >
                    View concept <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Questions about {service.title}
          </h2>
          <div className="mt-8 space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-ink/10 p-5 dark:border-white/10"
              >
                <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal">
                  {faq.question}
                </summary>
                <p className="mt-3 text-ink/70 dark:text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="more-heading" className="px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="more-heading" className="font-display text-xl font-bold sm:text-2xl">
            Explore other services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-royal hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal dark:border-white/20"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-navy px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Ready to talk about {service.title.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Send us a message — we reply within one working day, usually much faster.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-navy transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
