import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHead } from "@/components/site/section-head";

const VALUES = [
  ["Curiosity", "We ask good questions before reaching for easy answers."],
  ["Clarity", "We make the complex easier to understand and act on."],
  ["Craft", "We care about the thinking and the details in equal measure."],
  ["Collaboration", "The best work happens when people build it together."],
  ["Purpose", "Every creative choice should have a reason behind it."],
  ["Momentum", "We focus on progress your team can carry forward."],
];

const DISCIPLINES = [
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
      <PageIntro
        eyebrow="About ADD Creatives"
        title={
          <>
            A <span className="serif-accent text-royal">thoughtful</span>{" "}
            partner for your next digital step.
          </>
        }
        description="We are a creative and digital agency based in Lahore. We help businesses find a clear direction, show up with confidence, and move forward online."
        image="/images/creative-collaboration.jpg"
        imageAlt="People reviewing creative work together around a laptop; illustrative stock photography, not ADD Creatives staff."
        imageNote="Illustrative stock image — not a photograph of the ADD Creatives team."
      />

      <section className="pb-20 sm:pb-28">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-royal">Our approach</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Make the complicated feel{" "}
              <span className="serif-accent text-royal">clear.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="space-y-5 text-base leading-7 text-steel sm:text-lg sm:leading-8">
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
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
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
            <Reveal key={item.eyebrow}>
              <div className="border-t border-white/25 pt-6">
                <p className="eyebrow text-skyline">{item.eyebrow}</p>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="What guides us"
            title={
              <>
                The values{" "}
                <span className="serif-accent text-royal">behind the work.</span>
              </>
            }
            description="A few simple principles keep our work focused and our partnerships honest, from the first conversation through delivery."
          />
          <div className="mt-12 border-b border-slate-300">
            {VALUES.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.03}>
                <div className="group grid gap-2 border-t border-slate-300 py-6 transition-all duration-300 hover:bg-mist sm:grid-cols-[4rem_1fr_1.5fr] sm:items-baseline sm:gap-6 sm:px-4">
                  <span className="font-mono text-sm font-semibold text-royal">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-steel sm:text-base">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-20 sm:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="How we think"
            title={
              <>
                Different strengths.{" "}
                <span className="serif-accent text-royal">One shared direction.</span>
              </>
            }
            description="The right mix of skills depends on the brief. We bring connected disciplines together when they help move the work forward."
          />
          <div className="mt-12 border-b border-slate-300">
            {DISCIPLINES.map((item) => (
              <Reveal key={item.number}>
                <div className="group grid gap-2 border-t border-slate-300 bg-mist py-6 transition-colors duration-300 hover:bg-white sm:grid-cols-[4rem_1fr_1.5fr] sm:items-baseline sm:gap-6 sm:px-4">
                  <span className="font-mono text-sm font-semibold text-royal">
                    {item.number}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-steel sm:text-base">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <figure>
              <div className="relative aspect-[1.4] overflow-hidden rounded-xl bg-ice">
                <Image
                  alt="A notebook with interface sketches and planning notes, shown as illustrative stock photography."
                  src="/images/digital-studio.jpg"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-2 text-xs text-steel">
                Illustrative stock image, not ADD Creatives client work.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow text-royal">Working together</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              A thoughtful partner, not another layer of{" "}
              <span className="serif-accent text-royal">process.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-steel">
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
                <li className="flex items-start gap-3 text-sm leading-6 text-ink" key={text}>
                  <Check aria-hidden="true" className="mt-0.5 shrink-0 text-royal" size={17} />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
