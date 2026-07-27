"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Pronounced “arriving in the future” transition for the matrix reveal screen. */
export function MatrixArrivalScene({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    );
  }

  const streaks = [
    { left: "8%", rotate: 18, delay: 0 },
    { left: "22%", rotate: 8, delay: 0.04 },
    { left: "38%", rotate: -4, delay: 0.02 },
    { left: "52%", rotate: 2, delay: 0.06 },
    { left: "68%", rotate: -10, delay: 0.03 },
    { left: "84%", rotate: 14, delay: 0.05 },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {streaks.map((streak, index) => (
        <motion.div
          key={index}
          aria-hidden
          className="pointer-events-none absolute top-0 z-0 h-full w-px origin-top"
          style={{
            left: streak.left,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(110, 82, 196, 0.55) 45%, rgba(35, 19, 82, 0.2) 100%)",
            transform: `rotate(${streak.rotate}deg)`,
          }}
          initial={{ opacity: 0, scaleY: 0.2, y: "-20%" }}
          animate={{ opacity: [0, 0.7, 0], scaleY: [0.2, 1.4, 2.2], y: ["-20%", "30%", "80%"] }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1],
            delay: streak.delay,
          }}
        />
      ))}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 50%, rgba(110, 82, 196, 0.35) 0%, transparent 55%),
            repeating-linear-gradient(
              105deg,
              transparent 0px,
              transparent 18px,
              rgba(35, 19, 82, 0.07) 18px,
              rgba(110, 82, 196, 0.12) 22px
            )
          `,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ scale: 1.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(110, 82, 196, 0.45) 0%, rgba(35, 19, 82, 0.15) 35%, transparent 70%)",
        }}
      />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
