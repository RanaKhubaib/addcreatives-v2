'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import type { BlogPostMeta } from './posts';

function PostCard({ post, large = false }: { post: BlogPostMeta; large?: boolean }) {
  return (
    <article
      className={`flex flex-col rounded-3xl border border-ink/10 bg-white p-6 transition hover:shadow-lg dark:border-white/10 dark:bg-white/5 ${
        large ? 'sm:p-8' : ''
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-royal">
        {post.category}
        {post.date ? ` · ${post.date}` : ''}
        {post.comingSoon ? ' · Coming soon' : ''}
      </p>
      <h2 className={`mt-2 font-display font-bold ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
        {post.title}
      </h2>
      <p className="mt-2 flex-1 text-ink/70 dark:text-white/70">{post.excerpt}</p>
      {post.comingSoon ? (
        <p className="mt-5 text-sm font-semibold text-ink/50 dark:text-white/50">
          This post is being written — check back soon.
        </p>
      ) : (
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          Read post <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

export default function BlogFilter({
  posts,
  featured,
  rest,
}: {
  posts: BlogPostMeta[];
  featured: BlogPostMeta | undefined;
  rest: BlogPostMeta[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );

  const matches = (post: BlogPostMeta) => {
    const inCategory = category === 'All' || post.category === category;
    const needle = query.trim().toLowerCase();
    const inQuery =
      needle === '' ||
      post.title.toLowerCase().includes(needle) ||
      post.excerpt.toLowerCase().includes(needle);
    return inCategory && inQuery;
  };

  const searching = query.trim() !== '' || category !== 'All';
  const filteredFeatured = featured && matches(featured) ? featured : undefined;
  const filteredRest = rest.filter(matches);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search blog posts</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-4 text-sm focus:border-royal focus:outline-2 focus:outline-royal dark:border-white/20 dark:bg-white/5"
          />
        </label>
      </div>

      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="mt-4 flex flex-wrap gap-2"
      >
        {categories.map((item) => {
          const active = category === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
                active
                  ? 'bg-navy text-white'
                  : 'bg-mist text-ink hover:bg-peri/20 dark:bg-white/10 dark:text-white'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {searching ? (
        <div className="mt-8">
          {filteredFeatured || filteredRest.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFeatured && (
                <li key={filteredFeatured.slug}>
                  <PostCard post={filteredFeatured} />
                </li>
              )}
              {filteredRest.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-3xl bg-mist p-8 text-center text-ink/70 dark:bg-white/5 dark:text-white/70">
              No posts match your search. Try a different word or category.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8">
          {filteredFeatured && (
            <div>
              <PostCard post={filteredFeatured} large />
            </div>
          )}
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRest.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
