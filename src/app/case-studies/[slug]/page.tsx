import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies';
import BeforeAfterSlider from './before-after-slider';

/** The honest 4-step process — generic working method, not client claims. */
const PROCESS = [
  {
    step: 'Discover',
    text: 'Listen first: goals, customers, and what is working today.',
  },
  {
    step: 'Define',
    text: 'Agree on scope, timeline, and a fixed price before building.',
  },
  {
    step: 'Create',
    text: 'Design and build in the open, sharing progress as we go.',
  },
  {
    step: 'Evolve',
    text: 'Launch, measure, and keep improving after go-live.',
  },
];

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: 'Case study not found | ADD Creatives' };
  return {
    title: `${study.title} | ADD Creatives`,
    description: study.excerpt,
    openGraph: {
      title: `${study.title} | ADD Creatives`,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const beforeSrc = study.gallery[1] ?? study.image;
  const afterSrc = study.gallery[0] ?? study.image;

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      {/* Illustrative concept banner */}
      <div className="bg-navy px-6 py-3 text-center text-sm font-semibold text-white">
        Illustrative concept — a sample project showing how we work, not a real client
        engagement.
      </div>

      {/* Hero */}
      <section className="bg-mist px-6 py-16 sm:py-20 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All case studies
          </Link>
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            {study.category} · {study.year}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            {study.excerpt}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy dark:bg-white/10 dark:text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image
              src={study.image}
              alt={study.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              quality={75}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Highlights — the study's plain-word outcomes, no invented numbers. */}
      <section aria-labelledby="highlights-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="highlights-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Highlights
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {study.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="rounded-3xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <Sparkles className="h-5 w-5 text-royal" aria-hidden="true" />
                <p className="mt-3 font-semibold leading-relaxed">{outcome}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Challenge / Approach */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">The challenge</h2>
            <p className="mt-4 text-ink/80 dark:text-white/80">{study.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Our approach</h2>
            <p className="mt-4 text-ink/80 dark:text-white/80">{study.approach}</p>
          </div>
        </div>
      </section>

      {/* What we did — services covered in this concept, from the study's tags. */}
      <section aria-labelledby="what-we-did-heading" className="px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="what-we-did-heading" className="font-display text-2xl font-bold sm:text-3xl">
            What we did
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deliverables + outcomes */}
      <section
        aria-label="Deliverables and outcomes"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">What we delivered</h2>
            <ul className="mt-6 space-y-3">
              {study.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Outcomes</h2>
            <ul className="mt-6 space-y-3">
              {study.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink/60 dark:text-white/60">
              Outcomes are described in plain words — this concept has no measured
              results to report.
            </p>
          </div>
        </div>
      </section>

      {/* Process mini-timeline — the same four steps behind this concept. */}
      <section aria-labelledby="process-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="process-heading" className="font-display text-2xl font-bold sm:text-3xl">
            How this concept came together
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item, index) => (
              <li
                key={item.step}
                className="rounded-3xl border border-ink/10 p-6 dark:border-white/10"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-royal">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{item.step}</h3>
                <p className="mt-2 text-sm text-ink/70 dark:text-white/70">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="gallery-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Gallery
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.gallery.map((src, i) => (
              <li key={src} className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <Image
                  src={src}
                  alt={`${study.title} — concept image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Before / after concept preview */}
      <section
        aria-labelledby="compare-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="compare-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Concept preview
          </h2>
          <p className="mt-2 text-ink/70 dark:text-white/70">
            A before-and-after style comparison using two images from this concept.
          </p>
          <div className="mt-8">
            <BeforeAfterSlider beforeSrc={beforeSrc} afterSrc={afterSrc} />
          </div>
        </div>
      </section>

      {/* CTA band — short navy accent */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-navy px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Like this approach? Let&rsquo;s talk about your project.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Tell us what you are building — we reply within one working day with
            honest next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-royal">
              Next concept
            </p>
            <Link
              href={`/case-studies/${next.slug}`}
              className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-bold hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              {next.title} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
