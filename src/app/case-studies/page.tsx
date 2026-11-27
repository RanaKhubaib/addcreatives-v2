import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/case-studies';
import CaseStudiesFilter from './case-studies-filter';

/** The honest 4-step process — generic working method, not client claims. */
const PROCESS = [
  {
    step: 'Discover',
    text: 'We listen first: goals, customers, and what is working today.',
  },
  {
    step: 'Define',
    text: 'We agree on scope, timeline, and a fixed price before building.',
  },
  {
    step: 'Create',
    text: 'We design and build in the open, sharing progress as we go.',
  },
  {
    step: 'Evolve',
    text: 'We launch, measure, and keep improving after go-live.',
  },
];

export const metadata: Metadata = {
  title: 'Case Studies | ADD Creatives',
  description:
    'Illustrative concepts showing how ADD Creatives approaches branding, e-commerce, and campaigns — from challenge to outcome.',
  openGraph: {
    title: 'Case Studies | ADD Creatives',
    description:
      'Illustrative concepts showing how ADD Creatives approaches branding, e-commerce, and campaigns — from challenge to outcome.',
  },
};

export default function CaseStudiesPage() {
  const featured = caseStudies[0];

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            Our work
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            These are illustrative concepts — sample projects that show how we think,
            plan, and deliver. Real client work will be added here as it is published.
          </p>
        </div>
      </section>

      {/* Featured concept hero — the first study, big image + excerpt. */}
      {featured && (
        <section aria-label="Featured case study" className="px-6 pt-12 sm:pt-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-ink/10 bg-white dark:border-white/10 dark:bg-white/5">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={75}
                priority
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                Featured · Illustrative concept
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-royal">
                {featured.category} · {featured.year}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-3xl text-ink/70 dark:text-white/70">
                {featured.excerpt}
              </p>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
              >
                Read the concept <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section aria-label="Case studies" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <CaseStudiesFilter studies={caseStudies} />
        </div>
      </section>

      {/* How we approach every project */}
      <section
        aria-labelledby="approach-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="approach-heading" className="font-display text-2xl font-bold sm:text-3xl">
            How we approach every project
          </h2>
          <p className="mt-2 max-w-2xl text-ink/70 dark:text-white/70">
            The same four steps, whatever the project — a website, a brand, or a
            campaign.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, index) => (
              <li
                key={item.step}
                className="rounded-3xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-royal">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{item.step}</h3>
                <p className="mt-2 text-sm text-ink/70 dark:text-white/70">{item.text}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
