import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { CaseStudyFilter } from "@/components/site/case-study-filter";
import { SectionHeading } from "@/components/site/section-heading";
import { getCaseStudies } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Case Studies | ADD Creatives",
  description:
    "Explore the thinking behind ADD Creatives projects and illustrative concepts.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main>
      <PageHero
        description="A look at how clear strategy and thoughtful creative can shape stronger digital experiences. Sample concepts are labelled while client work is being prepared."
        eyebrow="Case studies"
        image="/images/campaign-workshop.jpg"
        imageAlt="A team reviewing campaign materials around a table; illustrative stock photography, not a client project."
        imageNote="Illustrative stock image—not completed client work."
        title="The thinking behind the work."
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          {caseStudies.some((study) => study.isSample) ? (
            <div className="mb-10 border-l-2 border-brand-blue bg-light-blue px-5 py-4 text-sm leading-6 text-navy">
              Items marked as illustrative concepts are not completed client
              projects or verified results.
            </div>
          ) : null}
          <SectionHeading
            description="Filter by discipline to explore the challenges and creative directions behind each entry."
            eyebrow="Selected work"
            title="Ideas, approaches, and outcomes."
          />
          <div className="mt-8">
            <CaseStudyFilter studies={caseStudies} />
          </div>
        </Container>
      </section>
    </main>
  );
}
