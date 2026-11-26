'use client';

import { useState } from 'react';
import { Check, Copy, Link2 } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard unavailable — fall back to selecting the URL via a prompt-free path.
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
    }
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this post">
      <span className="mr-1 text-sm font-semibold">Share:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-royal hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal dark:border-white/20"
        >
          {link.name}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-royal hover:text-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal dark:border-white/20"
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden="true" /> Copy link
          </>
        )}
      </button>
      <Link2 className="h-4 w-4 text-ink/40" aria-hidden="true" />
    </div>
  );
}
