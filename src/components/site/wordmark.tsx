import Link from "next/link";

/** Letterhead wordmark: ADD in blue, CREATIVES in ink/white, navy cursor mark. */
export function Wordmark({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const add = tone === "dark" ? "text-royal" : "text-skyline";
  const creatives = tone === "dark" ? "text-ink" : "text-white";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="ADD Creatives — home"
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-navy bg-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-navy" role="presentation">
          <path d="M6 3.5h11.5a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-2.6l-1.2 2.6a1 1 0 0 1-1.8-.3L10.6 19H6a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Zm0 2v11.5h5.4l1 2.1 1.3-2.7.4-.4h2.4a.5.5 0 0 0 .5-.5V5.5a.5.5 0 0 0-.5-.5H6Z" />
          <path
            d="M9.2 8.2 13.4 12l-2.5.6-.9 2.4-1.3-.6.9-2.3-2.6-.6 2.2-3.3Z"
            fill="#fff"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[1.35rem] font-extrabold tracking-tight ${add}`}
        >
          ADD
        </span>
        <span
          className={`block font-display text-[1.35rem] font-extrabold tracking-tight ${creatives}`}
        >
          CREATIVES
        </span>
      </span>
    </Link>
  );
}
