"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { siteConfig } from "@/data/site-config";

/**
 * Frequently asked questions — single-open accordion with smooth height
 * animation, plus a side card pointing to WhatsApp for anything else.
 */

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="w-full bg-mist py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Questions
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
            >
              Frequently asked questions
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-ink/70">
              The things people usually ask before starting a project. If your
              question isn&apos;t here, ask us directly — we reply within one
              working day.
            </p>

            <div className="mt-8 divide-y divide-ink/10 rounded-[24px] border border-ink/10 bg-white px-6 shadow-[0_8px_32px_rgba(22,62,115,0.06)] sm:px-8">
              {faqs.map((faq, i) => {
                const open = openIndex === i;
                return (
                  <div key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="font-display text-base font-bold text-ink sm:text-lg">
                          {faq.question}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                            open ? "bg-navy text-white" : "bg-mist text-royal"
                          }`}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </motion.span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 leading-relaxed text-ink/70">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side card — WhatsApp */}
          <aside className="lg:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-[24px] bg-navy p-7 text-white shadow-[0_16px_48px_rgba(22,62,115,0.25)] sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold leading-snug">
                Still curious? Ask us on WhatsApp
              </h3>
              <p className="mt-3 leading-relaxed text-white/75">
                Send a message with your question — or just a sentence about
                your business — and we will take it from there.
              </p>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <div className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
              <p className="mt-4 text-xs text-white/55">{siteConfig.hours}</p>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
