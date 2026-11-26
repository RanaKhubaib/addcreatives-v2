import { ArrowUpRight } from "lucide-react";
import { GsReveal } from "@/components/motion/gsap-reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Container } from "@/components/ui/container";

const toolkit = [
  { mark: "LO", name: "Lovable", category: "Rapid prototyping" },
  { mark: "GIT", name: "Git + GitHub", category: "Version control" },
  { mark: "N", name: "Next.js", category: "Web framework" },
  { mark: "R", name: "React", category: "Interfaces" },
  { mark: "TS", name: "TypeScript", category: "Reliable code" },
  { mark: "TW", name: "Tailwind CSS", category: "Design systems" },
  { mark: "FB", name: "Firebase", category: "App services" },
  { mark: "V", name: "Vercel", category: "Deployment" },
  { mark: "F", name: "Figma", category: "Product design" },
  { mark: "GS", name: "GSAP", category: "Motion design" },
];

export function TechnologyStack() {
  return (
    <section className="grid-light border-y border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <GsReveal>
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <SectionHeading
              eyebrow="Technologies & tools we use"
              title="Good thinking, powered by the right tools."
            />
            <p className="max-w-xl text-sm leading-6 text-muted sm:text-base">
              A considered mix of design, development, and collaboration tools
              helps us turn a strong brief into a useful digital experience.
            </p>
          </div>
        </GsReveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {toolkit.map((tool, index) => (
            <GsReveal delay={(index % 5) * 0.05} key={tool.name}>
              <article className="group relative flex h-full min-h-32 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-royal/50 hover:bg-navy hover:shadow-[0_22px_44px_-28px_rgba(17,65,114,0.7)] sm:p-5">
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-mist font-mono text-xs font-bold text-navy transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
                    {tool.mark}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky"
                    size={16}
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted transition-colors duration-300 group-hover:text-blue-100/70">
                    {tool.category}
                  </p>
                </div>
              </article>
            </GsReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
