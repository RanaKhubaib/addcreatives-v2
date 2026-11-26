import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi ADD Creatives, I'd like to discuss a project.",
  );

  return (
    <a
      aria-label="Chat with ADD Creatives on WhatsApp"
      className="whatsapp-pulse fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1fae62] text-white shadow-[0_12px_30px_-10px_rgba(13,123,65,0.65)] transition hover:scale-105 hover:bg-[#14884b] sm:bottom-7 sm:right-7"
      href={`https://wa.me/${siteConfig.company.whatsapp}?text=${message}`}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={24} />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
}
