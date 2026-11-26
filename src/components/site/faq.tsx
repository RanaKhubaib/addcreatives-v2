"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Minimal big-type accordion. Answer opens with a grid-rows transition. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-b border-slate-300">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="border-t border-slate-300">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`font-display text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-2xl ${
                  isOpen ? "text-royal" : "text-ink group-hover:text-royal"
                }`}
              >
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-navy bg-navy text-white"
                    : "border-slate-300 text-navy group-hover:border-navy"
                }`}
              >
                <Plus size={18} />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-base leading-7 text-steel">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
