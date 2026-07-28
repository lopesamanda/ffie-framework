"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

  const lines = Array.from({ length: 14 }, (_, index) => index);

  return (
    <div
      className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-ffie-bg"
      aria-live="polite"
      aria-label={`Traveling to ${endYear}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-50%] h-[200%] w-[200%]"
        initial={{ x: "-40%", y: 0 }}
        animate={{ x: "0%", y: "-8%" }}
        transition={{ duration: TRAVEL_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: `repeating-linear-gradient(
            128deg,
            transparent 0px,
            transparent 10px,
            rgba(35, 19, 82, 0.04) 10px,
            rgba(110, 82, 196, 0.12) 12px
          )`,
        }}
      />

      {lines.map((line) => (
        <motion.div
          key={line}
          aria-hidden
          className="pointer-events-none absolute top-0 h-full w-px origin-top"
          style={{
            left: `${6 + line * 6.5}%`,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(110, 82, 196, 0.45) 50%, transparent 100%)",
            transform: `rotate(${12 + (line % 3) * 4}deg)`,
          }}
          initial={{ opacity: 0, scaleY: 0.3, y: "-30%" }}
          animate={{ opacity: [0, 0.65, 0], scaleY: [0.3, 1.2, 1.8], y: ["-30%", "20%", "70%"] }}
          transition={{
            duration: TRAVEL_MS / 1000,
            ease: "easeInOut",
            delay: line * 0.025,
          }}
        />
      ))}

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
