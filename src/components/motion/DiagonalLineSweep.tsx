"use client";

import { motion } from "framer-motion";

const DEFAULT_LINE_COUNT = 14;

export function DiagonalLineSweep({
  durationMs,
  lineCount = DEFAULT_LINE_COUNT,
  className = "",
}: {
  durationMs: number;
  lineCount?: number;
  className?: string;
}) {
  const duration = durationMs / 1000;
  const lines = Array.from({ length: lineCount }, (_, index) => index);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-[-50%] h-[200%] w-[200%]"
        initial={{ x: "-40%", y: 0 }}
        animate={{ x: "0%", y: "-8%" }}
        transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
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
          className="absolute top-0 h-full w-px origin-top"
          style={{
            left: `${6 + line * 6.5}%`,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(110, 82, 196, 0.45) 50%, transparent 100%)",
            transform: `rotate(${12 + (line % 3) * 4}deg)`,
          }}
          initial={{ opacity: 0, scaleY: 0.3, y: "-30%" }}
          animate={{
            opacity: [0, 0.65, 0],
            scaleY: [0.3, 1.2, 1.8],
            y: ["-30%", "20%", "70%"],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            delay: line * 0.025,
          }}
        />
      ))}
    </div>
  );
}
