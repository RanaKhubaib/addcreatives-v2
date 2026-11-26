import { Asterisk } from "lucide-react";

const items = [
  "Web Design",
  "Branding",
  "SEO",
  "Social Media",
  "Performance Ads",
  "Content & Video",
  "E-Commerce",
  "Digital Strategy",
];

export function Marquee({ dark = true }: { dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden py-4 ${
        dark ? "bg-deep text-white" : "bg-mist text-navy"
      }`}
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            className="flex items-center gap-8 font-display text-lg font-semibold tracking-tight sm:text-xl"
            key={`${item}-${i}`}
          >
            {item}
            <Asterisk
              aria-hidden="true"
              className={dark ? "text-sky" : "text-royal"}
              size={20}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
