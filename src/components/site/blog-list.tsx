"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/site/content-cards";
import type { BlogPost } from "@/data/sample-content";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All topics");
  const categories = useMemo(
    () => ["All topics", ...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const visiblePosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) =>
      (activeCategory === "All topics" || post.category === activeCategory) &&
      (!normalized ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLowerCase()
          .includes(normalized)),
    );
  }, [activeCategory, posts, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div aria-label="Filter articles by category" className="flex flex-wrap gap-2" role="group">
          {categories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={`border px-3 py-2 text-xs font-semibold transition-colors ${
                activeCategory === category
                  ? "border-navy bg-navy text-white"
                  : "border-slate-300 text-slate-600 hover:border-navy hover:text-navy"
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <label className="flex max-w-md items-center gap-3 border-b border-slate-300 bg-transparent py-3 focus-within:border-brand-blue">
          <Search aria-hidden="true" className="shrink-0 text-muted" size={18} />
          <span className="sr-only">Search articles</span>
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            type="search"
            value={query}
          />
        </label>
      </div>
      {visiblePosts.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="border-y border-slate-300 py-10 text-center text-sm text-muted">
          No articles match that search. Try another topic.
        </p>
      )}
    </>
  );
}
