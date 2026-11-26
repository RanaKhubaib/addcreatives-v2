import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | ADD Creatives',
  description:
    'Tell ADD Creatives about your project — web development, e-commerce, SEO, branding, or marketing. We reply within one working day.',
  openGraph: {
    title: 'Contact Us | ADD Creatives',
    description:
      'Tell ADD Creatives about your project — web development, e-commerce, SEO, branding, or marketing. We reply within one working day.',
  },
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            Get in touch
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Let&rsquo;s talk about your project
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            Tell us what you need in a few sentences. We reply within one working day —
            usually much faster — with honest next steps and a clear quote.
          </p>
        </div>
      </section>

      <section aria-label="Contact form and office details" className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-ink/10 p-6 dark:border-white/10">
              <h2 className="font-display text-xl font-bold">Office</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                  <span>Working hours: {siteConfig.hours}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-navy p-6 text-white">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Prefer WhatsApp?
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Message us directly — it is the fastest way to reach us during working
                hours.
              </p>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Chat on WhatsApp ({siteConfig.whatsapp})
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-ink/10 dark:border-white/10">
              <iframe
                title="Map showing the ADD Creatives office in Lahore"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
