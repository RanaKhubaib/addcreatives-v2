import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/data/sample-content";

function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  return {
    day: date.toLocaleDateString("en", { day: "2-digit" }),
    monthYear: date.toLocaleDateString("en", { month: "short", year: "numeric" }),
    full: date.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" }),
  };
}

/** Editorial journal list: big dates, big titles, no cards. */
export function JournalList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="border-b border-slate-300">
      {posts.map((post) => {
        const date = formatDate(post.date);
        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-4 border-t border-slate-300 py-8 transition-colors duration-300 hover:bg-mist sm:grid-cols-[7rem_1fr_auto] sm:items-start sm:gap-8 sm:px-4 sm:py-10"
          >
            <div className="flex items-baseline gap-2 sm:block">
              <p className="font-display text-4xl font-bold leading-none tracking-tight text-navy transition-colors duration-300 group-hover:text-royal">
                {date.day}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                {date.monthYear}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                {post.category} · {post.readTime}
              </p>
              <h3 className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-ink transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-royal sm:text-3xl">
                {post.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-steel sm:text-base">
                {post.excerpt}
              </p>
              <time dateTime={post.date} className="sr-only">
                {date.full}
              </time>
            </div>
            <span className="hidden h-11 w-11 place-items-center rounded-full border border-slate-300 text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:grid">
              <ArrowUpRight aria-hidden="true" size={18} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
