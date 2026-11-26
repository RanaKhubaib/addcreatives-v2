import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

type ButtonProps = PropsWithChildren<{
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}>;

/* Primary = navy fill that slides to royal on hover (btn-fill).
   Light = white fill that slides to navy (btn-fill-light). */
const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-fill bg-navy text-white shadow-[0_14px_32px_-16px_rgba(17,65,114,0.7)] hover:shadow-[0_18px_36px_-16px_rgba(11,78,162,0.8)]",
  secondary:
    "border border-navy/20 bg-white text-navy hover:border-navy hover:bg-mist",
  ghost: "text-navy hover:bg-navy/5",
  light: "btn-fill btn-fill-light bg-white text-navy hover:text-white",
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

export function Button({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const classes = `${baseClassName} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
