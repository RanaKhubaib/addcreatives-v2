import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return getCaseStudies().then((studies) =>
    studies.map((study) => ({ slug: study.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.title} | ADD Creatives`,
    description: study.excerpt,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const studies = await getCaseStudies();
  const relatedStudies = studies.filter((item) => item.slug !== study.slug);

  return (
    <main>
      <PageIntro
        eyebrow={study.isSample ? "Sample concept" : "Case study"}
        title={study.title}
        description={study.excerpt}
        back={{ label: "All case studies", href: "/case-studies" }}
        image={study.coverImage}
        imageAlt={study.coverImageAlt}
        imageNote={
          study.isSample
            ? "Illustrative stock image — not completed client work."
            : undefined
        }
      />

      <section className="pb-24 md:pb-32 lg:pb-40">
        <div className="wrap">
          {study.isSample ? (
            <div className="mb-10 border-l-2 border-royal bg-ice px-5 py-4 text-sm leading-6 text-navy">
              This is an illustrative concept created for the website. It is
              not a completed client project or a verified performance result.
            </div>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <aside className="space-y-6 border-y border-slate-300 py-6 lg:sticky lg:top-28">
                <Info label="Project" value={study.client} />
                <Info label="Industry" value={study.industry} />
                <div>
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-steel">
                    Disciplines
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-navy"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-l-2 border-royal bg-ice p-4">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-royal">
                    {study.isSample ? "Concept direction" : "Project outcome"}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-navy">
                    {study.result}
                  </p>
                </div>
              </aside>
            </Reveal>

            <div className="max-w-3xl">
              {study.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.04}>
                  <section className="mb-12">
                    <p className="font-mono text-xs font-semibold text-royal">
                      0{index + 1}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                      {section.heading}
                    </h2>
                    <p className="mt-3 text-base leading-8 text-steel">{section.body}</p>
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <div className="rounded-2xl bg-deep p-7 text-white sm:p-9">
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    Have a challenge like this?
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                    Tell us what you are working on and we will help you find
                    a clear next step.
                  </p>
                  <div className="mt-6">
                    <Button href="/contact" variant="light">
                      Start a conversation <ArrowRight aria-hidden="true" size={16} />
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {relatedStudies.length > 0 ? (
            <div className="mt-20 border-t border-slate-300 pt-10">
              <p className="eyebrow text-royal">Keep exploring</p>
              <div className="mt-6 border-b border-slate-300">
                {relatedStudies.map((related, index) => (
                  <Link
                    key={related.slug}
                    href={`/case-studies/${related.slug}`}
                    className="group flex items-center justify-between gap-4 border-t border-slate-300 py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-royal">
                        0{index + 1}
                      </span>
                      <span className="font-display text-lg font-semibold text-ink transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-royal sm:text-xl">
                        {related.title}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      className="shrink-0 text-royal transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-steel">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
