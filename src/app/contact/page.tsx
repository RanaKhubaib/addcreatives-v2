import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { siteConfig } from "@/data/site-config";

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
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s{" "}
            <span className="serif-accent text-royal">talk.</span>
          </>
        }
        description="Tell us what you are working on or what you would like to change. We will help you find a clear next step."
      />

      <section className="pb-24 md:pb-32 lg:pb-40">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal>
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8 lg:p-9">
              <p className="eyebrow text-skyline">Get in touch</p>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight">
                A good conversation is a good place to{" "}
                <span className="serif-accent text-skyline">start.</span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Reach out in the way that works for you. We are based in Lahore
                and happy to talk through your project.
              </p>
              <div className="mt-8 space-y-3">
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
                  external
                />
                <ContactLink
                  href={`mailto:${siteConfig.company.email}`}
                  icon={<Mail aria-hidden="true" size={18} />}
                  label="Email"
                  value={siteConfig.company.email}
                />
                <a
                  className="group flex items-start gap-3 rounded-xl border border-white/15 p-4 text-sm leading-6 text-white transition-colors duration-300 hover:border-skyline/60 hover:bg-white/10"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-skyline" size={18} />
                  <span>
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-skyline">
                      Lahore, Pakistan
                    </span>
                    <span className="mt-1 block text-sm text-white">
                      {siteConfig.company.address}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/80">
                      Open in Google Maps
                      <ArrowUpRight aria-hidden="true" size={13} />
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                title="Map showing ADD Creatives in Lahore"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-38px_rgba(17,65,114,0.45)] sm:p-8 lg:p-10"
              id="project-enquiry"
            >
              <p className="eyebrow text-royal">Project enquiry</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Tell us a little{" "}
                <span className="serif-accent text-royal">about it.</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-steel">
                Share the essentials and we&rsquo;ll get back to you with a useful
                next step.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      className="group flex gap-3 rounded-xl border border-white/15 bg-white/5 p-4 transition-colors duration-300 hover:border-skyline/60 hover:bg-white/10"
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span className="mt-0.5 shrink-0 text-skyline">{icon}</span>
      <span>
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-skyline">
          {label}
        </span>
        <span className="mt-1 block text-sm font-semibold text-white">{value}</span>
      </span>
    </a>
  );
}
