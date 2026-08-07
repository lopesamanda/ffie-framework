"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type PublishedActionButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  success?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <path
        d="M3 8.5 6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Published-screen action with hover lift, press feedback, and optional success state. */
export function PublishedActionButton({
  variant = "secondary",
  children,
  success = false,
  className = "",
  disabled,
  onClick,
}: PublishedActionButtonProps) {
  const reduceMotion = useReducedMotion();
  const isPrimary = variant === "primary";

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={reduceMotion || disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-2.5 font-display text-sm font-bold tracking-[0.01em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent disabled:cursor-not-allowed disabled:opacity-50 ${
        isPrimary
          ? "rounded-full bg-ffie-ink text-ffie-bg shadow-[0_4px_12px_rgba(35,19,82,0.22)]"
          : "rounded-lg border border-ffie-line bg-ffie-surface/80 text-ffie-ink backdrop-blur-sm hover:border-ffie-ink/25"
      } ${className}`}
    >
      {success ? (
        <motion.span
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-1.5 text-ffie-accent"
        >
          <CheckIcon />
          {children}
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
}
