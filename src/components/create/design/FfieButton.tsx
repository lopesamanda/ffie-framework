"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type FfieButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
};

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-ffie-ink text-ffie-bg shadow-[0_4px_8px_rgba(35,19,82,0.2)] hover:opacity-90 disabled:opacity-50",
  secondary:
    "border border-ffie-line bg-transparent text-ffie-ink hover:border-ffie-ink/30",
  ghost: "text-ffie-muted hover:text-ffie-ink",
};

export function FfieButton({
  variant = "primary",
  children,
  icon,
  iconPosition = "leading",
  className = "",
  ...props
}: FfieButtonProps) {
  const rounded =
    variant === "secondary" ? "rounded-lg" : "rounded-full";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2.5 px-7 py-3 font-display text-[15px] font-bold tracking-[0.01em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent ${rounded} ${VARIANT[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "leading" ? icon : null}
      {children}
      {icon && iconPosition === "trailing" ? icon : null}
    </button>
  );
}
