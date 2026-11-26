import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';
import ServicesFilter from './services-filter';

export const metadata: Metadata = {
  title: 'Our Services | ADD Creatives',
  description:
    'Web development, e-commerce, SEO, social media, paid advertising, branding, and content creation — digital services built around your goals.',
  openGraph: {
    title: 'Our Services | ADD Creatives',
    description:
      'Web development, e-commerce, SEO, social media, paid advertising, branding, and content creation — digital services built around your goals.',
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            What we do
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Services that help your business grow
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            Every service is delivered by one small team, so nothing gets lost between
            design, development, and marketing. Pick a service to see what is included,
            or tell us about your project and we will recommend the right mix.
          </p>
        </div>
      </section>

      <section aria-label="All services" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <ServicesFilter services={services} />
          <div className="mt-12 rounded-3xl bg-navy px-6 py-10 text-center text-white sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Tell us about your business and your goals. We will recommend the simplest
              option that gets the job done — even if that means a smaller project.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-navy transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
