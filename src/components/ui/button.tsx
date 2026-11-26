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

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-royal",
  secondary: "border border-slate-300 bg-white text-navy hover:border-navy",
  ghost: "text-navy hover:bg-mist",
  light: "bg-white text-navy hover:bg-skyline",
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors duration-300";

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
