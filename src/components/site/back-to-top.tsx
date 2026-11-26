"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Back-to-top button that fades in after scrolling past one viewport. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={`fixed bottom-5 left-5 z-30 grid h-12 w-12 place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-[0_14px_30px_-14px_rgba(17,65,114,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-navy hover:text-white sm:bottom-7 sm:left-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      type="button"
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
