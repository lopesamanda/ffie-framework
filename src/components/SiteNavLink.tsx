"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

type SiteNavLinkProps = {
  href: string;
  label: string;
};

export function SiteNavLink({ href, label }: SiteNavLinkProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group relative px-1 py-1 text-sm font-medium uppercase tracking-[0.12em] transition-colors ${
        active ? "text-ffie-ink" : "text-ffie-muted hover:text-ffie-ink"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ffie-accent/50 transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-3 bg-ffie-accent/0 blur-md transition-colors group-hover:bg-ffie-accent/15"
          layout={false}
        />
      )}
    </Link>
  );
}
