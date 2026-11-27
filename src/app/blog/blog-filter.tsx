'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Loader2, Search, Send } from 'lucide-react';
import type { BlogPostMeta } from './posts';

function PostCard({ post, large = false }: { post: BlogPostMeta; large?: boolean }) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition hover:shadow-lg dark:border-white/10 dark:bg-white/5 ${
        large ? 'sm:p-0' : ''
      }`}
    >
      {post.image && (
        <div className={`relative w-full ${large ? 'aspect-[16/8]' : 'aspect-[16/9]'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={
              large
                ? '(max-width: 1024px) 100vw, 66vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            quality={75}
            className="object-cover"
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${large ? 'p-6 sm:p-8' : 'p-6'}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-royal">
          {post.category}
          {post.date ? ` · ${post.date}` : ''}
          {post.readTime > 0 ? ` · ${post.readTime} min read` : ''}
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
      </div>
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

  // "Editor's picks" is an honest label for the two newest posts (posts are
  // sorted newest first) — there is no popularity data to rank by.
  const picks = useMemo(() => {
    const pool = posts.filter((post) => post.slug !== featured?.slug);
    return pool.slice(0, 2);
  }, [posts, featured]);
  const remaining = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.slug !== featured?.slug &&
          !picks.some((pick) => pick.slug === post.slug),
      ),
    [posts, featured, picks],
  );

  // Newsletter signup — same real endpoint as the footer form
  // (POST /api/contact, type "newsletter").
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );

  const onSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subStatus === 'sending') return;
    setSubStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      });
      if (!response.ok) throw new Error('Newsletter signup failed');
      setSubStatus('success');
      setEmail('');
    } catch {
      setSubStatus('error');
    }
  };

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
              className={`rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ${
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
          {/* Featured post hero — the post flagged featured:true. */}
          {filteredFeatured && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-royal">
                Featured post
              </p>
              <div className="mt-3">
                <PostCard post={filteredFeatured} large />
              </div>
            </div>
          )}

          {/* Editor's picks — the two newest posts, labelled honestly as newest. */}
          {picks.length > 0 && (
            <section aria-labelledby="editors-picks-heading" className="mt-12">
              <h2
                id="editors-picks-heading"
                className="font-display text-2xl font-bold sm:text-3xl"
              >
                Editor&rsquo;s picks
              </h2>
              <p className="mt-2 text-ink/70 dark:text-white/70">
                Our two newest posts — fresh from the studio.
              </p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {picks.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {remaining.length > 0 && (
            <section aria-labelledby="all-posts-heading" className="mt-12">
              <h2
                id="all-posts-heading"
                className="font-display text-2xl font-bold sm:text-3xl"
              >
                All posts
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remaining.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Newsletter signup — same real endpoint as the footer form
          (POST /api/contact, type "newsletter"). */}
      <section
        aria-labelledby="stay-in-touch-heading"
        className="mt-16 rounded-3xl bg-navy px-6 py-10 text-white sm:px-12"
      >
        <h2 id="stay-in-touch-heading" className="font-display text-2xl font-bold sm:text-3xl">
          Get the next post in your inbox
        </h2>
        <p className="mt-3 max-w-2xl text-white/85">
          New notes on websites, branding, and marketing — when we write them, not
          every week. No spam, and you can leave any time.
        </p>
        <form onSubmit={onSubscribe} className="mt-6 max-w-md" aria-label="Newsletter signup">
          <div className="flex overflow-hidden rounded-full border border-white/20 bg-white/10 focus-within:border-white">
            <label htmlFor="blog-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="blog-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              disabled={subStatus === 'sending' || subStatus === 'success'}
              className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={subStatus === 'sending' || subStatus === 'success'}
              aria-label="Subscribe to the newsletter"
              className="flex w-12 shrink-0 cursor-pointer items-center justify-center bg-white text-navy transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
            >
              {subStatus === 'sending' ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : subStatus === 'success' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {subStatus === 'success' ? (
            <p className="mt-3 text-sm text-emerald-300" role="status">
              You&apos;re in — welcome aboard.
            </p>
          ) : subStatus === 'error' ? (
            <p className="mt-3 text-sm text-red-300" role="alert">
              Something went wrong — please try again or email us directly.
            </p>
          ) : null}
        </form>
        <p className="mt-6 text-sm text-white/70">
          Rather talk about a project?{' '}
          <Link
            href="/contact"
            className="font-semibold text-white underline underline-offset-2 hover:text-peri focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get in touch
          </Link>{' '}
          — we reply within one working day.
        </p>
      </section>
    </div>
  );
}
