"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FutureCommonsCard } from "@/components/FutureCommonsCard";
import type { FutureEntry } from "@/types/future";

type Props = {
  futures: FutureEntry[];
};

/** Scattered constellation layout — Figma Discovery of Other Futures frame. */
const SCATTER = [
  { x: "8%", y: "8%", rotate: -3, scale: 0.92 },
  { x: "52%", y: "4%", rotate: 2, scale: 1 },
  { x: "28%", y: "32%", rotate: -1, scale: 0.95 },
  { x: "68%", y: "28%", rotate: 4, scale: 0.88 },
  { x: "12%", y: "52%", rotate: -2, scale: 1 },
  { x: "44%", y: "56%", rotate: 1, scale: 0.9 },
  { x: "72%", y: "60%", rotate: -4, scale: 0.94 },
];

export function DiscoveryConstellation({ futures }: Props) {
  const reduceMotion = useReducedMotion();

  if (futures.length === 0) {
    return (
      <p className="text-sm text-ffie-muted">
        No published futures yet. Yours may be the first.
      </p>
    );
  }

  return (
    <div className="relative isolate min-h-[640px] w-full pb-8">
      {futures.slice(0, SCATTER.length).map((future, index) => {
        const pos = SCATTER[index % SCATTER.length];
        return (
          <motion.div
            key={future.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: pos.scale }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="absolute z-0 w-[min(260px,44vw)]"
            style={{
              left: pos.x,
              top: pos.y,
              rotate: pos.rotate,
            }}
          >
            <FutureCommonsCard
              entry={future}
              compact
              className="transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(35,19,82,0.12)]"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
