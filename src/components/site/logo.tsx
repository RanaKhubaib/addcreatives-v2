import Link from "next/link";

/** ADD CREATIVES wordmark — ADD in royal blue, CREATIVES in dark,
    with the navy cursor mark from the letterhead. */
export function LogoMark({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-[-0.04em] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-royal bg-navy text-white"
      >
        <svg
          className="h-4.5 w-4.5"
          fill="none"
          height="18"
          viewBox="0 0 24 24"
          width="18"
        >
          <path
            d="M5 3h11a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-2.5l-2 3.5a1 1 0 0 1-1.7-.9L11 16H8a3 3 0 0 1-3-3V6a3 3 0 0 1 0-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 9.5 13.5 12 11 13.2l-1 2.6L9 9.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>
        <span className="text-royal">ADD</span>{" "}
        <span className={dark ? "text-white" : "text-ink"}>CREATIVES</span>
      </span>
    </span>
  );
}

export function LogoLink({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      aria-label="ADD Creatives — home"
      className="group inline-flex shrink-0 items-center transition-transform duration-300 hover:-translate-y-0.5"
      href="/"
    >
      <LogoMark dark={dark} />
    </Link>
  );
}
