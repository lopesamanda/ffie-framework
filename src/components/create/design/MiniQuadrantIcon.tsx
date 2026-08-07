import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_COLORS } from "@/types/future";

const QUADRANT_ORDER: FutureQuadrant[] = [
  "techno_optimist",
  "feminist_preferred",
  "dominant_dystopian",
  "fragmented",
];

/** Four-square mini map with the active quadrant highlighted — reads as a matrix result, not a generic tag. */
export function MiniQuadrantIcon({
  quadrant,
  className = "",
}: {
  quadrant: FutureQuadrant;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      {QUADRANT_ORDER.map((key, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const active = key === quadrant;
        return (
          <rect
            key={key}
            x={col * 8 + 0.5}
            y={row * 8 + 0.5}
            width={7}
            height={7}
            rx={1}
            fill={QUADRANT_COLORS[key]}
            opacity={active ? 1 : 0.35}
            stroke={active ? "#231352" : "transparent"}
            strokeWidth={active ? 0.75 : 0}
          />
        );
      })}
    </svg>
  );
}
