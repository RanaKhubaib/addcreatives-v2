import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/data/site-config";

/** Closing band used on every public page: giant type, one clear action. */
export function CtaBand() {
  return (
    <section className="border-t border-slate-200 py-20 sm:py-28">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-royal">Your next move starts here</p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
            Let&rsquo;s{" "}
            <span className="serif-accent text-royal">talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-steel sm:text-lg">
            Have a project in mind? Tell us what you want to achieve and
            let&rsquo;s discuss how we can help.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button href="/contact">
              Start a project <ArrowRight aria-hidden="true" size={16} />
            </Button>
            <a
              href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
              className="text-sm font-bold text-navy underline decoration-royal decoration-2 underline-offset-4 transition-colors duration-300 hover:text-royal"
            >
              {siteConfig.company.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
