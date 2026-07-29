"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DiagonalLineSweep } from "@/components/motion/DiagonalLineSweep";

const TRAVEL_MS = 1400;

export function TimeTravelTransition({
  children,
  startYear,
  endYear,
}: {
  children: React.ReactNode;
  startYear: number;
  endYear: number;
}) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setRevealed(true), TRAVEL_MS);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (revealed) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-ffie-bg"
      aria-live="polite"
      aria-label={`Traveling to ${endYear}`}
    >
      <DiagonalLineSweep durationMs={TRAVEL_MS} />

      <motion.p
        className="relative z-10 font-display text-3xl font-light tracking-tight text-ffie-ink sm:text-4xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -6] }}
        transition={{
          duration: TRAVEL_MS / 1000,
          ease: "easeOut",
          times: [0, 0.15, 0.72, 1],
        }}
      >
        <span className="tabular-nums">{startYear}</span>
        <span className="mx-3 text-ffie-muted/60">→</span>
        <span className="tabular-nums">{endYear}</span>
      </motion.p>
    </div>
  );
}
