"use client";

import { useMemo, useState } from "react";
import { CaseStudyCard } from "@/components/site/content-cards";
import type { CaseStudy } from "@/data/sample-content";

export function CaseStudyFilter({ studies }: { studies: CaseStudy[] }) {
  const [activeCategory, setActiveCategory] = useState("All work");
  const categories = useMemo(
    () => ["All work", ...new Set(studies.map((study) => study.category))],
    [studies],
  );
  const visibleStudies =
    activeCategory === "All work"
      ? studies
      : studies.filter((study) => study.category === activeCategory);

  return (
    <>
      <div
        aria-label="Filter work by category"
        className="mb-8 flex flex-wrap gap-2"
        role="group"
      >
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              activeCategory === category
                ? "border-navy bg-navy text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-navy hover:text-navy"
            }`}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  );
}
