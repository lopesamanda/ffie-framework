"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Ludic narrative panel — ambient drift + portal-style reveal (Stage 4 motion). */
export function CreateNarrativeScene({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl border border-ffie-line/80 bg-ffie-surface/70 px-4 py-4 shadow-[0_4px_24px_rgba(35,19,82,0.06)] ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={
          reduceMotion
            ? undefined
            : {
                background: [
                  "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(110,82,196,0.08) 0%, transparent 60%)",
                  "radial-gradient(ellipse 70% 50% at 80% 70%, rgba(110,82,196,0.1) 0%, transparent 60%)",
                  "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(110,82,196,0.08) 0%, transparent 60%)",
                ],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
