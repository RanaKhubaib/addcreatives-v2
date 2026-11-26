import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { PageIntro } from "@/components/site/page-intro";
import { WorkEditorial } from "@/components/site/work-editorial";
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
      <PageIntro
        eyebrow="Case studies"
        title={
          <>
            The thinking{" "}
            <span className="serif-accent text-royal">behind the work.</span>
          </>
        }
        description="A look at how clear strategy and thoughtful creative can shape stronger digital experiences. Sample concepts are labelled while client work is being prepared."
        image="/images/campaign-workshop.jpg"
        imageAlt="A team reviewing campaign materials around a table; illustrative stock photography, not a client project."
        imageNote="Illustrative stock image — not completed client work."
      />
      <section className="pb-24 md:pb-32 lg:pb-40">
        <div className="wrap">
          {caseStudies.some((study) => study.isSample) ? (
            <div className="mb-12 border-l-2 border-royal bg-ice px-5 py-4 text-sm leading-6 text-navy">
              Items marked as illustrative concepts are not completed client
              projects or verified results.
            </div>
          ) : null}
          <WorkEditorial studies={caseStudies} />
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
