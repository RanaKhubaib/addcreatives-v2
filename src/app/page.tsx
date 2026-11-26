import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand } from "@/components/site/cta-band";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { JournalList } from "@/components/site/journal-list";
import { Manifesto } from "@/components/site/manifesto";
import { ProcessStack } from "@/components/site/process-stack";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/site/section-head";
import { ServiceIndex } from "@/components/site/service-index";
import { Stats } from "@/components/site/stats";
import { WorkEditorial } from "@/components/site/work-editorial";
import { siteConfig } from "@/data/site-config";
import { getBlogPosts, getCaseStudies } from "@/lib/content";

const HOME_FAQ = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with teams looking for a clearer brand, stronger digital presence, or more focused marketing. Tell us where you are and what you want to improve, and we can see if we are a good fit.",
  },
  {
    question: "Can I hire ADD Creatives for a single service?",
    answer:
      "Yes. You can start with one focused project, such as a website, brand identity, SEO review, or campaign. We recommend connected services only when they genuinely support your goals.",
  },
  {
    question: "How does a project begin?",
    answer:
      "Start with the enquiry form or WhatsApp. We will learn about your goals, timing, and priorities, then suggest a practical next step and a clear scope.",
  },
  {
    question: "Do you work with clients outside Lahore?",
    answer:
      "Yes. ADD Creatives is based in Lahore and can work with teams in other cities and markets through remote workshops and regular project check-ins.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on the scope, schedule, and level of support. Share a little about your needs and budget range, and we will help shape a suitable plan before any work begins.",
  },
  {
    question: "Can you provide support after launch?",
    answer:
      "Yes. We can discuss ongoing updates, content, optimisation, and campaign support. The right plan depends on what your team needs once the first project is live.",
  },
];

export default async function HomePage() {
  const [studies, posts] = await Promise.all([getCaseStudies(), getBlogPosts()]);

  return (
    <main>
      <Hero />

      <section className="py-20 sm:py-28" aria-label="Services">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Six ways to{" "}
                <span className="serif-accent text-royal">move forward.</span>
              </>
            }
            description="From a single focused project to a connected digital presence, choose the capabilities that fit your goals. Hover a service to preview it — or tap to open it."
          />
          <div className="mt-12">
            <ServiceIndex services={siteConfig.services} />
          </div>
          <Reveal className="mt-8">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
            >
              Explore all services
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-20 sm:py-28" aria-label="Selected work">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            title={
              <>
                Ideas,{" "}
                <span className="serif-accent text-royal">made visible.</span>
              </>
            }
            description="The concepts below are clearly labelled and show an illustrative approach — not completed client projects or verified results."
          />
          <div className="mt-14">
            <WorkEditorial studies={studies} />
          </div>
          <Reveal className="mt-14">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
            >
              Explore all work
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <Manifesto />

      <section className="py-20 sm:py-28" aria-label="How we work">
        <div className="wrap">
          <SectionHead
            eyebrow="How we work"
            title={
              <>
                From first conversation{" "}
                <span className="serif-accent text-royal">to final delivery.</span>
              </>
            }
            description="Good work gets better when the path is clear. We keep the process collaborative, focused, and built around the outcome."
          />
          <div className="mt-12">
            <ProcessStack />
          </div>
        </div>
      </section>

      <Stats />

      <section className="py-20 sm:py-28" aria-label="From the journal">
        <div className="wrap">
          <SectionHead
            eyebrow="From the journal"
            title={
              <>
                Notes{" "}
                <span className="serif-accent text-royal">worth sharing.</span>
              </>
            }
            description="Practical ideas and perspectives on building brands, improving websites, and making digital marketing work harder."
          />
          <div className="mt-12">
            <JournalList posts={posts.slice(0, 3)} />
          </div>
          <Reveal className="mt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
            >
              Visit the journal
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-20 sm:py-28" aria-label="Frequently asked questions">
        <div className="wrap grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-royal">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-royal" />
              Questions, answered
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Before you{" "}
              <span className="serif-accent text-royal">ask.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-steel">
              A few quick answers to help you decide whether we are the right
              team for your next project.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Faq items={HOME_FAQ} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
