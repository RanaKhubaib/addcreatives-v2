import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-[0_12px_42px_-28px_rgba(10,15,28,0.28)] ${className}`.trim()}
      {...props}
    />
  );
}
