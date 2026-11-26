import type { Metadata } from 'next';
import { getAllPosts } from './posts';
import BlogFilter from './blog-filter';

export const metadata: Metadata = {
  title: 'Blog | ADD Creatives',
  description:
    'Practical notes on websites, branding, SEO, and marketing from the ADD Creatives team in Lahore.',
  openGraph: {
    title: 'Blog | ADD Creatives',
    description:
      'Practical notes on websites, branding, SEO, and marketing from the ADD Creatives team in Lahore.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <section className="bg-mist px-6 py-16 sm:py-24 dark:bg-ink">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
            Notes from the studio
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-white/70">
            Practical writing on websites, branding, and marketing — what we have
            learned building them, in plain language.
          </p>
        </div>
      </section>

      <section aria-label="Blog posts" className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <BlogFilter posts={posts} featured={featured} rest={rest} />
        </div>
      </section>
    </main>
  );
}
