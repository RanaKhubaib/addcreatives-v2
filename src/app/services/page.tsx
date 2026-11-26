import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { SectionHead } from "@/components/site/section-head";
import { ServiceIndex } from "@/components/site/service-index";
import { siteConfig } from "@/data/site-config";

const CONNECTIONS = [
  {
    number: "01",
    title: "A clear foundation",
    text: "Strategy and brand direction help every later decision stay connected to the audience and purpose.",
  },
  {
    number: "02",
    title: "A useful experience",
    text: "Design, development, and content make it easier for people to understand the offer and take a next step.",
  },
  {
    number: "03",
    title: "A way to learn",
    text: "Search, social, and paid campaigns create opportunities to share the work and learn from real response.",
  },
];

export const metadata: Metadata = {
  title: "Creative and Digital Services | ADD Creatives",
  description:
    "Explore web design, SEO, social media, branding, paid ads, and content services from ADD Creatives.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Services"
        title={
          <>
            Creative and digital services built{" "}
            <span className="serif-accent text-royal">around your goals.</span>
          </>
        }
        description="Build a stronger digital presence with a team that connects strategy, creative, and technology around your goals. Every service can stand on its own — when a brief needs more than one discipline, we connect the work around a shared direction."
        image="/images/digital-product.jpg"
        imageAlt="A desktop monitor and tablet displaying digital interface designs; illustrative stock photography."
        imageNote="Illustrative stock image — not a client website or ADD Creatives project."
      />

      <section className="pb-20 sm:pb-28">
        <div className="wrap">
          <SectionHead
            eyebrow="What we can do together"
            title={
              <>
                Choose the right{" "}
                <span className="serif-accent text-royal">next step.</span>
              </>
            }
          />
          <div className="mt-12">
            <ServiceIndex services={siteConfig.services} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-mist py-20 sm:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="Connected thinking"
            title={
              <>
                One clear direction,{" "}
                <span className="serif-accent text-royal">carried through.</span>
              </>
            }
            description="Services are most useful when they support one another. We keep the plan focused on what your audience and business need."
          />
          <div className="mt-12 border-b border-slate-300">
            {CONNECTIONS.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.04}>
                <div className="group grid gap-2 border-t border-slate-300 py-7 transition-colors duration-300 hover:bg-white sm:grid-cols-[4rem_1fr_1.5fr] sm:items-baseline sm:gap-6 sm:px-4">
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

      <CtaBand />
    </main>
  );
}
