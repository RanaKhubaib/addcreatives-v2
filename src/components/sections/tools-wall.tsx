"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  siFirebase,
  siFigma,
  siGithub,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siMeta,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siSemrush,
  siShopify,
  siTailwindcss,
  siVercel,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";
import { tools, type Tool } from "@/data/tools";

/**
 * Tech & tools we use — official brand marks from `simple-icons`,
 * rendered in each brand's official colour on a clean white tile.
 *
 * Four tools have no simple-icons entry (Adobe's brand icons and Ahrefs
 * were removed from the set in v16), so those use a neutral navy monogram
 * tile instead — never a faked official mark.
 */

const BRAND_ICONS: Record<string, SimpleIcon> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  firebase: siFirebase,
  figma: siFigma,
  vercel: siVercel,
  github: siGithub,
  shopify: siShopify,
  wordpress: siWordpress,
  woocommerce: siWoocommerce,
  googleanalytics: siGoogleanalytics,
  googleads: siGoogleads,
  meta: siMeta,
  googlesearchconsole: siGooglesearchconsole,
  semrush: siSemrush,
};

function monogram(name: string): string {
  const words = name.replace(/[/&]/g, " ").split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

function BrandMark({ tool }: { tool: Tool }) {
  const icon = tool.icon ? BRAND_ICONS[tool.icon] : undefined;
  if (!icon) {
    // No official mark available — neutral monogram fallback.
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-sm font-bold text-white">
        {monogram(tool.name)}
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white">
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={`${tool.name} logo`}
        className="h-7 w-7"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      title={tool.note}
      className="group relative flex w-44 shrink-0 flex-col items-start gap-3 rounded-[24px] border border-ink/10 bg-white p-4 shadow-[0_1px_2px_rgba(10,15,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-[0_12px_32px_rgba(22,62,115,0.12)] sm:w-52"
    >
      <BrandMark tool={tool} />
      <div>
        <p className="font-display text-sm font-semibold leading-snug text-ink">{tool.name}</p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink/45">
          {tool.category}
        </p>
      </div>
      {/* Styled hover tooltip (title attr above is the accessible fallback). */}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 z-10 w-48 -translate-x-1/2 -translate-y-full rounded-xl bg-ink px-3 py-2 text-center text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
      >
        {tool.note}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Tool[]; reverse?: boolean }) {
  // The track is duplicated so the -50% loop is seamless.
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`tools-marquee-track flex w-max gap-4 py-2 pr-4 ${reverse ? "tools-marquee-reverse" : ""}`}
      >
        {track.map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export function ToolsWall() {
  const reduceMotion = useReducedMotion();
  const firstRow = tools.slice(0, 10);
  const secondRow = tools.slice(10);

  return (
    <section aria-labelledby="tools-heading" className="w-full bg-white py-20 sm:py-24">
      {/* Marquee keyframes live here so this section stays self-contained
          (globals.css is owned by another agent). Transform-only, paused on
          hover, and disabled entirely for prefers-reduced-motion. */}
      <style>{`
        @keyframes tools-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tools-marquee-track {
          animation: tools-marquee 48s linear infinite;
        }
        .tools-marquee-reverse {
          animation-direction: reverse;
        }
        .tools-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .tools-marquee-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
            Our toolkit
          </p>
          <h2
            id="tools-heading"
            className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
          >
            Tech &amp; tools we use
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/70 sm:text-lg">
            The platforms and tools behind the websites, stores, and campaigns
            we build — chosen because they are reliable, not because they are
            fashionable. Hover any tool to see what it does for you.
          </p>
        </motion.div>
      </div>

      {/* Two-row marquee on desktop; the same rows become a wrapping grid on mobile. */}
      {reduceMotion ? (
        <div className="mx-auto mt-10 w-full max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 hidden flex-col gap-4 md:flex">
          <MarqueeRow items={firstRow} />
          <MarqueeRow items={secondRow} reverse />
        </div>
      )}
      <div className="mx-auto mt-10 w-full max-w-7xl px-6 md:hidden">
        {!reduceMotion && (
          <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
