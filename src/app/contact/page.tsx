import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/ui/container";
import { GsReveal } from "@/components/motion/gsap-reveal";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/data/site-config";
import type { ReactNode } from "react";

const mapQuery = encodeURIComponent(siteConfig.company.address);

export const metadata: Metadata = {
  title: "Contact ADD Creatives",
  description:
    "Start a project with ADD Creatives. Tell us what you are building, changing, or trying to solve.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        actionLabel="Message on WhatsApp"
        actionHref={`https://wa.me/${siteConfig.company.whatsapp}`}
        description="Tell us what you are working on or what you would like to change. We will help you find a clear next step."
        eyebrow="Contact"
        image="/images/campaign-workshop.jpg"
        imageAlt="A team reviewing campaign materials around a table; illustrative stock photography, not ADD Creatives staff."
        imageNote="Illustrative stock image—not a photograph of ADD Creatives staff."
        title="Let’s make something meaningful."
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <GsReveal>
            <div className="rounded-[1.5rem] bg-navy p-6 text-white shadow-[0_30px_60px_-35px_rgba(17,65,114,0.8)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                Get in touch
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">
                A good conversation is a good place to start.
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100/70">
                Reach out in the way that works for you. We are based in Lahore
                and happy to talk through your project.
              </p>
              <div className="mt-7 space-y-3">
                <ContactLink
                  href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`}
                  icon={<Phone aria-hidden="true" size={18} />}
                  label="Call us"
                  value={siteConfig.company.phone}
                />
                <ContactLink
                  href={`https://wa.me/${siteConfig.company.whatsapp}`}
                  icon={<MessageCircle aria-hidden="true" size={18} />}
                  label="WhatsApp"
                  value="Chat with our team"
                />
                <ContactLink
                  href={`mailto:${siteConfig.company.email}`}
                  icon={<Mail aria-hidden="true" size={18} />}
                  label="Email"
                  value={siteConfig.company.email}
                />
                <a
                  className="group flex items-start gap-3 border border-white/15 p-4 text-sm leading-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-sky/60 hover:bg-white/10"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-blue-200"
                    size={18}
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200">
                      Lahore, Pakistan
                    </p>
                    <p className="mt-1 text-sm text-white">
                      {siteConfig.company.address}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-100">
                      Open in Google Maps
                      <ArrowUpRight aria-hidden="true" size={13} />
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="mt-5 overflow-hidden border border-slate-200">
              <iframe
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                title="Map showing ADD Creatives in Lahore"
              />
            </div>
          </GsReveal>
          <GsReveal delay={0.08}>
            <div
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-38px_rgba(17,65,114,0.45)] sm:p-9"
              id="project-enquiry"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                Project enquiry
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Tell us a little about it.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share the essentials and we&apos;ll get back to you with a useful
                next step.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </GsReveal>
        </Container>
      </section>
    </main>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      className="group flex gap-3 border border-white/15 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky/60 hover:bg-white/10"
      href={href}
      rel={href.startsWith("https://") ? "noreferrer" : undefined}
      target={href.startsWith("https://") ? "_blank" : undefined}
    >
      <span className="mt-0.5 shrink-0 text-blue-200">{icon}</span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200">
          {label}
        </span>
        <span className="mt-1 block text-sm font-semibold text-white">{value}</span>
      </span>
    </a>
  );
}
