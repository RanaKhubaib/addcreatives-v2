import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | ADD Creatives',
  description:
    'How ADD Creatives collects, uses, and protects the information you share through our website and contact form.',
  openGraph: {
    title: 'Privacy Policy | ADD Creatives',
    description:
      'How ADD Creatives collects, uses, and protects the information you share through our website and contact form.',
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Last updated: November 2026
          </p>

          <div className="mt-8 space-y-8 leading-relaxed text-ink/80 dark:text-white/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Who we are
              </h2>
              <p className="mt-3">
                ADD Creatives is a digital agency based in Lahore, Pakistan. This policy
                explains what information we collect through this website, why we
                collect it, and what you can ask us to do with it. If you have any
                questions, email us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-royal underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Information we collect
              </h2>
              <p className="mt-3">
                We only collect information you give us directly — for example, when
                you fill in our contact form. That may include your name, email
                address, phone number, company name, and the details of your enquiry.
                We do not ask for payment details, passwords, or other sensitive
                information through this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                How we use it
              </h2>
              <p className="mt-3">
                We use your information only to reply to your enquiry, prepare a
                quote, and deliver the work you ask for. We do not sell your
                information, and we do not add you to a marketing list unless you
                clearly ask us to.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Cookies and analytics
              </h2>
              <p className="mt-3">
                This website may use basic analytics to understand which pages are
                visited, so we can improve the site. Analytics data is aggregated and
                does not identify you personally. If we use cookies for preferences
                (such as a light or dark theme), they are stored in your browser and
                you can clear them at any time in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Third-party services
              </h2>
              <p className="mt-3">
                We may use trusted third-party services to run this website — for
                example, hosting, email delivery, and embedded maps. Those services
                process data under their own privacy policies and only as needed to
                provide their service. Clicking a link to WhatsApp, Google Maps, or a
                social network takes you to that service, which has its own privacy
                policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                How long we keep it
              </h2>
              <p className="mt-3">
                We keep enquiry messages only as long as needed to reply and, where a
                project follows, for the length of that project and any agreed support
                period. After that, we delete or anonymise them.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Your choices
              </h2>
              <p className="mt-3">
                You can ask us at any time to show you the information we hold about
                you, correct it, or delete it. Email{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-royal underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>{' '}
                and we will respond within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Changes to this policy
              </h2>
              <p className="mt-3">
                If we change how we handle information, we will update this page and
                change the date above. The version published here is the one that
                applies.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
