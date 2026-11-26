import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service | ADD Creatives',
  description:
    'The terms that apply when you use the ADD Creatives website and work with us on a project.',
  openGraph: {
    title: 'Terms of Service | ADD Creatives',
    description:
      'The terms that apply when you use the ADD Creatives website and work with us on a project.',
  },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-ink/60 dark:text-white/60">
            Last updated: November 2026
          </p>

          <div className="mt-8 space-y-8 leading-relaxed text-ink/80 dark:text-white/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Using this website
              </h2>
              <p className="mt-3">
                By using this website you agree to these terms. The content here is
                provided for general information about ADD Creatives and our services.
                You may browse and share it, but you may not copy, republish, or use
                our designs, text, or images for commercial purposes without
                permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Enquiries and quotes
              </h2>
              <p className="mt-3">
                Sending an enquiry through our contact form does not create a contract
                or commit either side to a project. When we quote for work, the quote
                itself — including scope, timeline, price, and payment terms — is the
                agreement for that project. If anything in a quote conflicts with
                these terms, the quote applies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Our work and your content
              </h2>
              <p className="mt-3">
                For work we create for you — websites, logos, photos, and copy — you
                own the finished files once the project is paid for in full, as
                described in your quote. We may ask to show finished work in our
                portfolio; you can decline, and we will not use it. You are
                responsible for the accuracy of the content, images, and materials
                you supply to us, and for having the right to use them.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Payments
              </h2>
              <p className="mt-3">
                Project prices, deposits, and payment schedules are set out in your
                quote before work begins. Work may pause if an agreed payment is
                overdue, and we will always tell you first.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Liability
              </h2>
              <p className="mt-3">
                We take care to deliver work that is accurate and works as described.
                We are not liable for losses caused by third-party services, hosting
                providers, or changes you or others make after handover. Nothing in
                these terms limits liability that cannot be limited by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Changes to these terms
              </h2>
              <p className="mt-3">
                We may update these terms from time to time. The version published on
                this page is the one that applies, and the date above shows when it
                was last updated.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">
                Contact
              </h2>
              <p className="mt-3">
                Questions about these terms? Email us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-royal underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>{' '}
                or call {siteConfig.phone}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
