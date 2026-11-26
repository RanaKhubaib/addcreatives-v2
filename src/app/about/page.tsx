import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GsReveal } from "@/components/motion/gsap-reveal";

const values = [
  ["Curiosity", "We ask good questions before reaching for easy answers."],
  ["Clarity", "We make the complex easier to understand and act on."],
  ["Craft", "We care about the thinking and the details in equal measure."],
  ["Collaboration", "The best work happens when people build it together."],
  ["Purpose", "Every creative choice should have a reason behind it."],
  ["Momentum", "We focus on progress your team can carry forward."],
];

const disciplines = [
  {
    number: "01",
    title: "Strategy",
    text: "Research, direction, positioning, and the questions that shape a useful brief.",
  },
  {
    number: "02",
    title: "Design",
    text: "Brand identity, digital experiences, visual systems, and thoughtful creative.",
  },
  {
    number: "03",
    title: "Technology",
    text: "Responsive development, accessible foundations, and practical integrations.",
  },
  {
    number: "04",
    title: "Growth",
    text: "Search, social, content, and campaigns that give the work a way forward.",
  },
];

export const metadata: Metadata = {
  title: "About ADD Creatives",
  description:
    "Meet ADD Creatives, a Lahore-based creative and digital agency connecting strategy, design, technology, and marketing.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        description="We are a creative and digital agency based in Lahore. We help businesses find a clear direction, show up with confidence, and move forward online."
        eyebrow="About ADD Creatives"
        image="/images/creative-collaboration.jpg"
        imageAlt="People reviewing creative work together around a laptop; illustrative stock photography, not ADD Creatives staff."
        imageNote="Illustrative stock image—not a photograph of the ADD Creatives team."
        title="A thoughtful partner for your next digital step."
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <GsReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Our approach
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-4xl">
              Make the complicated feel clear.
            </h2>
          </GsReveal>
          <GsReveal delay={0.06}>
            <div className="space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              <p>
                Strong brands are built on more than a good-looking website.
                They need clear thinking, useful creative, and a consistent
                experience wherever people meet the business.
              </p>
              <p>
                ADD Creatives connects strategy, design, development, and
                marketing. We listen first, build a practical direction
                together, and make work your team can confidently put into the
                world.
              </p>
              <p>
                We are based in Lahore, Pakistan, and work with businesses
                looking for a thoughtful partner to take their next digital
                step.
              </p>
            </div>
          </GsReveal>
        </Container>
      </section>

      <section className="bg-deep-blue py-14 text-white sm:py-18 lg:py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
          {[
            {
              eyebrow: "Our mission",
              title: "Make good ideas easier to understand, choose, and grow.",
              text: "We bring sharp thinking and considered creative together so businesses can show up clearly and make their next move with confidence.",
            },
            {
              eyebrow: "Our vision",
              title: "A digital world with more useful, human experiences.",
              text: "We want to help build brands and products that respect people's time, answer real needs, and make a positive difference for the teams behind them.",
            },
          ].map((item) => (
            <GsReveal key={item.eyebrow}>
              <div className="border-t border-white/30 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                  {item.eyebrow}
                </p>
                <h2 className="mt-5 max-w-lg font-display text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100/80">
                  {item.text}
                </p>
              </div>
            </GsReveal>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <GsReveal>
            <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  What guides us
                </p>
                <h2 className="mt-4 max-w-sm font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
                  The values behind the work.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-muted">
                A few simple principles keep our work focused and our
                partnerships honest, from the first conversation through
                delivery.
              </p>
            </div>
          </GsReveal>
          <div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([title, text], index) => (
              <GsReveal
                className="group border-t border-slate-300 py-5 transition-colors hover:border-brand-blue"
                delay={index * 0.035}
                key={title}
              >
                <p className="text-xs font-semibold text-brand-blue">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </GsReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-soft py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <GsReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              How we think
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
              Different strengths. One shared direction.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">
              The right mix of skills depends on the brief. We bring connected
              disciplines together when they help move the work forward.
            </p>
          </GsReveal>
          <div className="divide-y divide-slate-300 border-y border-slate-300">
            {disciplines.map((item, index) => (
              <GsReveal delay={index * 0.04} key={item.number}>
                <div className="grid gap-3 py-5 sm:grid-cols-[3rem_0.65fr_1.35fr] sm:gap-5">
                  <span className="text-xs font-semibold text-brand-blue">
                    {item.number}
                  </span>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted">{item.text}</p>
                </div>
              </GsReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <GsReveal>
            <figure>
              <div className="image-frame group relative aspect-[1.4] overflow-hidden rounded-[1.75rem] bg-light-blue">
                <Image
                  alt="A notebook with interface sketches and planning notes, shown as illustrative stock photography."
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  src="/images/digital-studio.jpg"
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted">
                Illustrative stock image, not ADD Creatives client work.
              </figcaption>
            </figure>
          </GsReveal>
          <GsReveal delay={0.06}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Working together
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
              A thoughtful partner, not another layer of process.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              We keep the work human: clear conversations, honest feedback, and
              enough structure to make good decisions without slowing ideas
              down.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "You know what is happening and what comes next.",
                "The work connects back to the goal we agreed together.",
                "You leave with useful tools and a clear way forward.",
              ].map((text) => (
                <li className="flex items-start gap-3 text-sm text-ink" key={text}>
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brand-blue"
                    size={17}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </GsReveal>
        </Container>
      </section>

      <section className="bg-navy py-14 text-white sm:py-16">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <GsReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
              Let&apos;s make something meaningful
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-3xl">
              Tell us what you want to move forward.
            </h2>
          </GsReveal>
          <GsReveal delay={0.06}>
            <Button href="/contact" variant="light">
              Start a conversation <ArrowRight aria-hidden="true" size={16} />
            </Button>
          </GsReveal>
        </Container>
      </section>
    </main>
  );
}
