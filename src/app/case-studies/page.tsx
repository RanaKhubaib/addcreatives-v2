import type { Metadata } from 'next';
import { caseStudies } from '@/data/case-studies';
import CaseStudiesFilter from './case-studies-filter';

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

      <section aria-label="Case studies" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <CaseStudiesFilter studies={caseStudies} />
        </div>
      </section>
    </main>
  );
}
