import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { GsCounter } from "@/components/motion/gsap-counter";
import { GsReveal } from "@/components/motion/gsap-reveal";
import { BlogCard } from "@/components/site/content-cards";
import { HomeHero } from "@/components/site/home-hero";
import { MagneticButton } from "@/components/site/magnetic-button";
import { Marquee } from "@/components/site/marquee";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { TechnologyStack } from "@/components/site/technology-stack";
import { WorkShowcase } from "@/components/site/work-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";
import { getBlogPosts, getCaseStudies } from "@/lib/content";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, audience, and goals behind the brief.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Set the strategy and creative direction before making the work.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Bring the right creative, technical, and marketing skills together.",
  },
  {
    number: "04",
    title: "Evolve",
    description:
      "Launch with care, review what happens, and identify useful next steps.",
  },
];

const principles = [
  {
    number: "01",
    title: "Straight answers",
    copy: "We explain the thinking, the trade-offs, and what happens next in plain language.",
  },
  {
    number: "02",
    title: "Creative with a purpose",
    copy: "Every visual, message, and interaction has a job to do for your audience.",
  },
  {
    number: "03",
    title: "A team in your corner",
    copy: "We work collaboratively, listen carefully, and stay focused on your goals.",
  },
];

/* Honest counts about what the agency offers — not client results. */
const stats = [
  { value: 6, pad: 2, suffix: "", label: "Services offered", note: "From brand to growth" },
  { value: 4, pad: 2, suffix: "", label: "Connected disciplines", note: "Strategy · Design · Tech · Growth" },
  { value: 10, pad: 2, suffix: "", label: "Tools in our stack", note: "Design, code & delivery" },
  { value: 1, pad: 2, suffix: "", label: "Shared direction", note: "One team per project" },
];

const faqs = [
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

export const metadata: Metadata = {
  title: "ADD Creatives | Creative Solutions. Digital Growth.",
  description:
    "ADD Creatives brings strategy, design, technology, and digital marketing together to help brands build stronger digital experiences and grow with confidence.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [blogPosts, caseStudies] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
  ]);
  const featuredPost = blogPosts[0];

  return (
    <main>
      <HomeHero />
      <Marquee />

      {/* Intro */}
      <section className="border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <GsReveal>
            <SectionHeading
              description="We connect creative thinking, technology, and marketing to make digital work easier to understand, use, and improve. Every engagement begins with the needs behind the brief—not a one-size-fits-all playbook."
              eyebrow="Digital Solutions That Drive Growth"
              title="Bring the right disciplines around one clear direction."
            />
            <Link
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal"
              href="/about"
            >
              Get to know ADD Creatives
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={16}
              />
            </Link>
          </GsReveal>
          <GsReveal delay={0.08}>
            <figure>
              <div className="image-frame group relative aspect-[1.48] overflow-hidden rounded-[1.75rem] bg-mist">
                <Image
                  alt="A group of people collaborating around a laptop; illustrative stock photography, not a photograph of ADD Creatives staff."
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="/images/creative-collaboration.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <figcaption className="mt-2 text-xs text-muted">
                Illustrative stock image—not a photograph of the ADD Creatives
                team.
              </figcaption>
            </figure>
          </GsReveal>
        </Container>
      </section>

      <TechnologyStack />

      {/* Services bento */}
      <section className="border-b border-slate-200 bg-mist py-16 sm:py-20 lg:py-24">
        <Container>
          <GsReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                description="From a single focused project to a connected digital presence, choose the capabilities that fit your goals."
                eyebrow="What we do"
                title="Everything your brand needs to move forward."
              />
              <Link
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal"
                href="/services"
              >
                Explore all services
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={16}
                />
              </Link>
            </div>
          </GsReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service, index) => (
              <GsReveal
                className={index === 0 ? "lg:row-span-2" : ""}
                delay={(index % 3) * 0.05}
                key={service.slug}
              >
                <ServiceCard index={index} service={service} tall={index === 0} />
              </GsReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Selected work — pinned horizontal scroll on desktop */}
      <WorkShowcase studies={caseStudies.slice(0, 4)} />

      {/* Why us — navy */}
      <section className="grain relative overflow-hidden border-b border-white/10 bg-navy py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-50" />
        <p
          aria-hidden="true"
          className="outline-word pointer-events-none absolute -top-4 right-0 select-none whitespace-nowrap font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-none opacity-50"
        >
          WHY US
        </p>
        <Container className="relative">
          <GsReveal>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <SectionHeading
                  light
                  eyebrow="Why ADD Creatives"
                  title="Creative thinking. Clear direction. Meaningful work."
                />
              </div>
              <div className="divide-y divide-white/20 border-y border-white/20">
                {principles.map((item) => (
                  <div
                    className="group grid gap-3 py-6 transition-all duration-300 hover:bg-white/[0.04] hover:px-3 sm:grid-cols-[3rem_0.8fr_1.2fr] sm:gap-5"
                    key={item.number}
                  >
                    <span className="font-mono text-xs font-semibold text-sky transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.number}
                    </span>
                    <h3 className="font-display font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="max-w-lg text-sm leading-6 text-blue-100/75">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GsReveal>
        </Container>
      </section>

      {/* Stats — honest counts of the offering */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-200 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                className="group bg-white p-6 transition-colors duration-300 hover:bg-navy sm:p-8"
                key={stat.label}
              >
                <p className="font-display text-4xl font-bold tracking-[-0.04em] text-navy transition-colors duration-300 group-hover:text-white sm:text-5xl">
                  <GsCounter pad={stat.pad} suffix={stat.suffix} value={stat.value} />
                </p>
                <p className="mt-3 text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted transition-colors duration-300 group-hover:text-blue-100/70">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About teaser */}
      <section className="border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <GsReveal>
            <figure>
              <div className="image-frame group relative aspect-[1.3] overflow-hidden rounded-[1.75rem] bg-mist">
                <Image
                  alt="A close view of design sketches and notes on a notebook, used as illustrative stock photography."
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  src="/images/digital-studio.jpg"
                />
              </div>
              <figcaption className="mt-2 text-xs text-muted">
                Illustrative stock image; no team or client work is represented.
              </figcaption>
            </figure>
          </GsReveal>
          <GsReveal delay={0.08}>
            <SectionHeading
              description="Based in Lahore, ADD Creatives helps businesses make their digital presence clearer and more useful. We listen first, agree on what matters, and bring together the skills needed to move the work forward."
              eyebrow="About the agency"
              title="A thoughtful partner from the first question to the next step."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Curiosity before assumptions",
                "Clear communication and purposeful craft",
                "Collaborative work shaped around your goals",
              ].map((value) => (
                <li
                  className="group flex items-start gap-3 text-sm text-ink"
                  key={value}
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mist text-royal transition-all duration-300 group-hover:bg-navy group-hover:text-white">
                    <Check aria-hidden="true" size={12} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <MagneticButton>
                <Button href="/about" variant="secondary">
                  More about us <ArrowRight aria-hidden="true" size={16} />
                </Button>
              </MagneticButton>
            </div>
          </GsReveal>
        </Container>
      </section>

      {/* Process */}
      <section className="border-b border-slate-200 bg-mist py-16 sm:py-20 lg:py-24">
        <Container>
          <GsReveal>
            <SectionHeading
              description="Good work gets better when the path is clear. We keep the process collaborative, focused, and built around the outcome."
              eyebrow="How we work"
              title="From first conversation to final delivery."
            />
          </GsReveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <GsReveal as="li" delay={index * 0.06} key={step.number}>
                <div className="group h-full rounded-[1.25rem] border border-transparent bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-royal/40 hover:bg-white hover:shadow-[0_22px_44px_-30px_rgba(17,65,114,0.6)]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-royal">
                    {step.number}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink transition-colors group-hover:text-royal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </GsReveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Journal */}
      {featuredPost ? (
        <section className="border-b border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <GsReveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                  description="Practical ideas and perspectives on building brands, improving websites, and making digital marketing work harder."
                  eyebrow="From the journal"
                  title="Insights, ideas, and perspectives."
                />
                <Link
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-royal"
                  href="/blog"
                >
                  Visit the journal
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={16}
                  />
                </Link>
              </div>
            </GsReveal>
            <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <GsReveal>
                <Link className="group block" href={`/blog/${featuredPost.slug}`}>
                  <figure>
                    <div className="image-frame group relative aspect-[1.5] overflow-hidden rounded-[1.5rem] bg-mist">
                      <Image
                        alt={featuredPost.coverImageAlt}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        src={featuredPost.coverImage}
                      />
                    </div>
                    <figcaption className="mt-2 text-xs text-muted">
                      {featuredPost.category} · {featuredPost.readTime}
                    </figcaption>
                  </figure>
                  <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink transition-colors group-hover:text-royal sm:text-3xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                    {featuredPost.excerpt}
                  </p>
                </Link>
              </GsReveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                {blogPosts.slice(1, 3).map((post, index) => (
                  <GsReveal delay={index * 0.05} key={post.slug}>
                    <BlogCard post={post} />
                  </GsReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <GsReveal>
            <SectionHeading
              description="A few quick answers to help you decide whether we are the right team for your next project."
              eyebrow="Questions, answered"
              title="Before we get started."
            />
            <div className="mt-7">
              <MagneticButton>
                <Button href="/contact" variant="secondary">
                  Ask us directly <ArrowRight aria-hidden="true" size={16} />
                </Button>
              </MagneticButton>
            </div>
          </GsReveal>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq, index) => (
              <GsReveal delay={index * 0.02} key={faq.question}>
                <details className="group py-5 transition-colors hover:bg-mist/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-1 font-semibold text-ink marker:hidden">
                    <span className="transition-colors group-hover:text-royal">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-royal transition-all duration-300 group-open:rotate-45 group-open:border-royal group-open:bg-navy group-open:text-white">
                      <span aria-hidden="true" className="text-xl leading-none">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl px-1 text-sm leading-6 text-muted">
                    {faq.answer}
                  </p>
                </details>
              </GsReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Big CTA */}
      <section className="grain relative overflow-hidden bg-navy py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-50" />
        <div
          aria-hidden="true"
          className="hero-glow absolute -left-24 top-0 h-72 w-72 rounded-full bg-royal/40 blur-[90px]"
        />
        <p
          aria-hidden="true"
          className="outline-word pointer-events-none absolute bottom-0 left-0 select-none whitespace-nowrap font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-none opacity-60"
        >
          LET&apos;S TALK
        </p>
        <Container className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <GsReveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
              <span aria-hidden="true" className="h-px w-8 bg-sky" />
              Your next move starts here
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Let&apos;s build something that moves your brand forward.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100/80 sm:text-base">
              Have a project in mind? Tell us what you want to achieve and
              let&apos;s discuss how we can help.
            </p>
          </GsReveal>
          <GsReveal className="flex flex-wrap gap-3" delay={0.08}>
            <MagneticButton>
              <Button href="/contact" variant="light">
                Start a project <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </MagneticButton>
            <a
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white"
              href={`https://wa.me/${siteConfig.company.whatsapp}?text=${encodeURIComponent("Hi ADD Creatives, I'd like to discuss a project.")}`}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp us
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={16}
              />
            </a>
          </GsReveal>
        </Container>
      </section>
    </main>
  );
}
