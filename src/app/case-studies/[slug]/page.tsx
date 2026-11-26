import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { CaseStudyCard } from "@/components/site/content-cards";
import { PageHero } from "@/components/site/page-hero";
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
      <PageHero
        description={study.excerpt}
        eyebrow={study.isSample ? "Sample concept" : "Case study"}
        image={study.coverImage}
        imageAlt={study.coverImageAlt}
        imageNote={
          study.isSample
            ? "Illustrative stock image—not completed client work."
            : undefined
        }
        actionLabel="All case studies"
        actionHref="/case-studies"
        title={study.title}
      />
      <article>
        <Container className="py-12 sm:py-16">
          {study.isSample ? (
            <div className="border-l-2 border-brand-blue bg-light-blue px-5 py-4 text-sm leading-6 text-navy">
              This is an illustrative concept created for the website. It is
              not a completed client project or a verified performance result.
            </div>
          ) : null}
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <FadeIn>
              <div className="sticky top-28 space-y-6 border-y border-slate-300 py-5">
                <Info label="Project" value={study.client} />
                <Info label="Industry" value={study.industry} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Disciplines
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <span
                        className="border border-slate-300 px-3 py-1.5 text-xs font-medium text-navy"
                        key={service}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-l-2 border-brand-blue bg-light-blue p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
                    {study.isSample ? "Concept direction" : "Project outcome"}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-navy">
                    {study.result}
                  </p>
                </div>
              </div>
            </FadeIn>
            <div className="max-w-3xl">
              {study.sections.map((section, index) => (
                <FadeIn className="mb-10" delay={index * 0.06} key={section.heading}>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                    0{index + 1}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-muted">
                    {section.body}
                  </p>
                </FadeIn>
              ))}
              <div className="bg-deep-blue p-6 text-white sm:p-8">
                <h2 className="font-display text-2xl font-semibold">
                  Have a challenge like this?
                </h2>
                <p className="mt-2 text-sm leading-6 text-blue-100/70">
                  Tell us what you are trying to change. We can help you find a
                  useful direction.
                </p>
                <Link
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white"
                  href="/contact"
                >
                  Talk to us <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>
      {relatedStudies.length ? (
        <section className="bg-soft py-16 sm:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                Explore related thinking
              </h2>
              <Link
                className="hidden items-center gap-2 text-sm font-bold text-brand-blue sm:inline-flex"
                href="/case-studies"
              >
                All case studies <ArrowLeft aria-hidden="true" size={15} />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {relatedStudies.slice(0, 2).map((related) => (
                <CaseStudyCard key={related.slug} study={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
