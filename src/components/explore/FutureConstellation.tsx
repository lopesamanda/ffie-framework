"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FutureCommonsCard } from "@/components/FutureCommonsCard";
import type { FutureEntry } from "@/types/future";

const SCATTER = [
  { x: "6%", y: "6%", rotate: -3, scale: 0.92 },
  { x: "50%", y: "2%", rotate: 2, scale: 1 },
  { x: "26%", y: "28%", rotate: -1, scale: 0.95 },
  { x: "66%", y: "24%", rotate: 4, scale: 0.88 },
  { x: "10%", y: "48%", rotate: -2, scale: 1 },
  { x: "42%", y: "52%", rotate: 1, scale: 0.9 },
  { x: "70%", y: "56%", rotate: -4, scale: 0.94 },
  { x: "22%", y: "72%", rotate: 2, scale: 0.86 },
  { x: "54%", y: "74%", rotate: -1, scale: 0.93 },
  { x: "82%", y: "38%", rotate: 3, scale: 0.89 },
  { x: "4%", y: "78%", rotate: -2, scale: 0.91 },
  { x: "36%", y: "12%", rotate: 1, scale: 0.97 },
];

type FutureConstellationProps = {
  entries: FutureEntry[];
  emptyMessage?: string;
  className?: string;
};

/** Loose atlas-style constellation browse — shared by Explore and Create Discovery. */
export function FutureConstellation({
  entries,
  emptyMessage = "No futures to show yet.",
  className = "",
}: FutureConstellationProps) {
  const reduceMotion = useReducedMotion();

  if (entries.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
        {emptyMessage}
      </p>
    );
  }

  const slotCount = Math.max(
    SCATTER.length,
    Math.min(entries.length, SCATTER.length),
  );
  const minHeight = Math.max(520, 280 + Math.ceil(entries.length / 3) * 120);

  return (
    <div
      className={`relative isolate w-full pb-6 ${className}`}
      style={{ minHeight }}
    >
      {entries.map((entry, index) => {
        const pos = SCATTER[index % SCATTER.length];
        const layer = index % slotCount;
        return (
          <motion.div
            key={entry.id}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: pos.scale }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            transition={{ delay: (index % 8) * 0.04, duration: 0.38 }}
            className="absolute w-[min(260px,44vw)]"
            style={{
              left: pos.x,
              top: pos.y,
              rotate: pos.rotate,
              zIndex: layer,
            }}
          >
            <FutureCommonsCard
              entry={entry}
              compact
              className="transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(35,19,82,0.12)]"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
