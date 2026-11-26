import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

/**
 * Floating WhatsApp button: fixed bottom-right, green with a pulse ring,
 * tooltip bubble on hover. Links to https://wa.me/923224687045.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp — replies within a day"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-ink text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-[240px] group-hover:px-4 group-hover:py-2.5 group-hover:opacity-100 dark:bg-white dark:text-ink">
        Chat with us — replies within a day
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition-transform duration-300 group-hover:scale-110">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30"
        />
        <MessageCircle className="relative h-7 w-7" />
      </span>
    </a>
  );
}
