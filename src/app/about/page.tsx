import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools } from '@/data/tools';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'About Us | ADD Creatives',
  description:
    'ADD Creatives is a digital agency in Lahore, Pakistan. Learn about our story, mission, values, and how we work — Discover, Define, Create, Evolve.',
  openGraph: {
    title: 'About Us | ADD Creatives',
    description:
      'ADD Creatives is a digital agency in Lahore, Pakistan. Learn about our story, mission, values, and how we work.',
  },
};

const VALUES = [
  {
    title: 'Honesty first',
    text: 'We say what a project will cost, how long it will take, and what it will not do — before you commit.',
  },
  {
    title: 'Work that earns its keep',
    text: 'Design and marketing should bring enquiries and sales, not just look good in a portfolio.',
  },
  {
    title: 'Plain language',
    text: 'No jargon, no mystery. You always know what we are doing and why.',
  },
  {
    title: 'One team, start to finish',
    text: 'The people who design your site are the people who build it and help it grow.',
  },
  {
    title: 'Built to last',
    text: 'We choose solid tools and clean work over shortcuts that break in six months.',
  },
  {
    title: 'Your business, your assets',
    text: 'You own your website, brand files, and content. We hand everything over at launch.',
  },
];

const PRINCIPLES = [
  {
    title: 'Start with the goal',
    text: 'Every project begins with what success looks like for your business — not with a template or a trend.',
  },
  {
    title: 'Show, don’t just tell',
    text: 'You see designs and working pages early, while changes are still cheap and easy.',
  },
  {
    title: 'Small steps, weekly updates',
    text: 'Work moves in short steps with a weekly update, so there are no surprises at the end.',
  },
  {
    title: 'Measure what matters',
    text: 'After launch we look at real behaviour — enquiries, sales, and search visibility — and improve from there.',
  },
];

const PROCESS = [
  {
    step: 'Discover',
    text: 'We listen: your goals, your customers, and what is working — and what is not — today.',
  },
  {
    step: 'Define',
    text: 'We agree on scope, timeline, and a fixed price, so everyone knows what is being built.',
  },
  {
    step: 'Create',
    text: 'We design and build in the open, sharing progress and gathering your feedback as we go.',
  },
  {
    step: 'Evolve',
    text: 'We launch, measure, and keep improving — because a website is never really finished.',
  },
];

const WHAT_WE_DONT_DO = [
  {
    title: 'No fake reviews',
    text: 'We never invent testimonials or ratings. If a review is shown, it is from a real customer.',
  },
  {
    title: 'No copied designs',
    text: 'Every site and brand is built for the business it belongs to — not lifted from someone else.',
  },
  {
    title: 'No hidden fees',
    text: 'The price we agree is the price you pay. If the scope changes, we say so before we bill it.',
  },
];
// These placeholder cards are intentionally marked "coming soon" in the UI.
const TEAM_PLACEHOLDERS = [
  { initials: 'AK', role: 'Founder & Developer' },
  { initials: 'TM', role: 'Designer' },
  { initials: 'TM', role: 'Marketing' },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      {/* Hero / story */}
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            About ADD Creatives
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            A small agency with a simple job: help your business grow online
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-ink/70 dark:text-white/70">
            ADD Creatives is a digital agency based in Lahore, Pakistan. We design and
            build websites, brands, and campaigns for businesses in Pakistan and
            abroad — from a first website for a new business to a full online store
            for an established brand.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70 dark:text-white/70">
            We started because we kept seeing the same problem: good businesses with
            websites that did not reflect their quality, and marketing that was hard
            to understand or measure. So we built an agency that keeps things clear —
            one team, plain language, and work you can see working.
          </p>
        </div>
      </section>

      {/* Our story — with a studio image */}
      <section aria-labelledby="story-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/digital-studio.jpg"
              alt="The ADD Creatives studio at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="story-heading" className="font-display text-2xl font-bold sm:text-3xl">
              Our story
            </h2>
            <p className="mt-4 text-ink/80 dark:text-white/80">
              ADD Creatives started with a simple observation: good businesses in
              Lahore and beyond had websites that did not reflect the quality of
              their work. The sites were slow, hard to update, or built from a
              template that looked like everyone else&rsquo;s — and the marketing
              around them was hard to understand or measure.
            </p>
            <p className="mt-4 text-ink/80 dark:text-white/80">
              So we built the agency we wanted to hire: one small team that designs,
              builds, and grows a business&rsquo;s online presence in plain language,
              with a fixed price agreed up front and work you can see working. No
              layers of account managers, no mystery — just the people doing the
              work, talking directly to the people it is for.
            </p>
          </div>
        </div>
      </section>

      {/* Why Lahore — local roots, real address from site config */}
      <section
        aria-labelledby="lahore-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="lahore-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Why Lahore
          </h2>
          <p className="mt-4 max-w-3xl text-ink/80 dark:text-white/80">
            We are based in Lahore, Pakistan — a city full of businesses that
            deserve better websites than they usually get. Being here keeps us
            close to the local businesses we serve, and working in Pakistan time
            ({siteConfig.hours}) keeps us a short call away for clients abroad too.
          </p>
          <p className="mt-4 max-w-3xl text-ink/70 dark:text-white/70">
            You can find us at {siteConfig.address}.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-navy px-6 py-10 text-white sm:px-12">
          <h2 id="mission-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Our mission
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            {siteConfig.tagline} — by giving every business, large or small, a
            website, brand, and marketing setup that is honest, well-built, and easy
            to measure.
          </p>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="values-heading" className="font-display text-2xl font-bold sm:text-3xl">
            What we stand for
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className="rounded-3xl border border-ink/10 p-6 dark:border-white/10"
              >
                <h3 className="font-display text-xl font-bold">{value.title}</h3>
                <p className="mt-2 text-ink/70 dark:text-white/70">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Working principles */}
      <section
        aria-labelledby="principles-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="principles-heading" className="font-display text-2xl font-bold sm:text-3xl">
            How we work with you
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="pt-1 font-display text-lg font-bold">{principle.title}</h3>
                  <p className="mt-1 text-ink/70 dark:text-white/70">{principle.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="process-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Our process
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

      {/* What we don't do — an honest note */}
      <section
        aria-labelledby="dont-do-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="dont-do-heading" className="font-display text-2xl font-bold sm:text-3xl">
            What we don&rsquo;t do
          </h2>
          <p className="mt-2 max-w-2xl text-ink/70 dark:text-white/70">
            Saying no to the easy shortcuts is part of the job.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {WHAT_WE_DONT_DO.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-ink/70 dark:text-white/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools strip */}
      <section aria-labelledby="tools-heading" className="px-6 pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="tools-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Tools we work with
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool.name}
                className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy dark:bg-white/10 dark:text-white"
              >
                {tool.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team placeholder */}
      <section
        aria-labelledby="team-heading"
        className="bg-mist px-6 py-12 sm:py-16 dark:bg-white/5"
      >
        <div className="mx-auto max-w-6xl">
          <h2 id="team-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Meet the team
          </h2>
          <p className="mt-2 text-ink/70 dark:text-white/70">
            Team — coming soon. We are putting together proper introductions for the
            people behind the work.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {TEAM_PLACEHOLDERS.map((member, index) => (
              <li
                key={`${member.role}-${index}`}
                className="rounded-3xl border border-dashed border-ink/20 bg-white p-6 text-center dark:border-white/20 dark:bg-white/5"
              >
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mist font-display text-2xl font-bold text-navy dark:bg-white/10 dark:text-white"
                >
                  {member.initials}
                </span>
                <p className="mt-4 font-display text-lg font-bold">Team member</p>
                <p className="text-sm text-ink/60 dark:text-white/60">{member.role}</p>
                <p className="mt-2 inline-block rounded-full bg-mist px-3 py-1 text-xs font-semibold text-royal dark:bg-white/10">
                  Coming soon
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-navy px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Let&rsquo;s build something that works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Whether it is a first website, a rebrand, or a store that needs to sell
            better — tell us about your business. We reply within one working day
            with honest next steps and a fixed price, before you commit to anything.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse our services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
