"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { FutureEntry } from "@/types/future";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";

type Props = {
  futures: FutureEntry[];
};

/** Scattered constellation layout — Figma Discovery of Other Futures frame. */
const SCATTER = [
  { x: "8%", y: "12%", rotate: -3, scale: 0.92 },
  { x: "52%", y: "6%", rotate: 2, scale: 1 },
  { x: "28%", y: "38%", rotate: -1, scale: 0.95 },
  { x: "68%", y: "32%", rotate: 4, scale: 0.88 },
  { x: "12%", y: "58%", rotate: -2, scale: 1 },
  { x: "44%", y: "62%", rotate: 1, scale: 0.9 },
  { x: "72%", y: "68%", rotate: -4, scale: 0.94 },
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
    <div className="relative min-h-[420px] w-full">
      {futures.slice(0, SCATTER.length).map((future, index) => {
        const pos = SCATTER[index % SCATTER.length];
        return (
          <motion.div
            key={future.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: pos.scale }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="absolute w-[min(240px,42vw)]"
            style={{
              left: pos.x,
              top: pos.y,
              rotate: pos.rotate,
            }}
          >
            <Link
              href={`/explore/${future.id}`}
              className="block rounded-xl border border-ffie-line bg-ffie-surface p-4 shadow-[0_4px_16px_rgba(35,19,82,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(35,19,82,0.12)]"
            >
              <QuadrantPill quadrant={future.quadrant} />
              <p className="mt-2 font-display text-base font-bold text-ffie-ink">
                {future.title}
              </p>
              {future.artifact.publicPromise && (
                <p className="mt-1 line-clamp-2 text-xs text-ffie-muted">
                  {future.artifact.publicPromise}
                </p>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
