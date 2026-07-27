import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_COLORS, QUADRANT_MATRIX_LABELS, QUADRANT_TEXT_COLORS } from "@/types/future";

export function QuadrantPill({ quadrant }: { quadrant: FutureQuadrant }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
      style={{
        backgroundColor: QUADRANT_COLORS[quadrant],
        color: QUADRANT_TEXT_COLORS[quadrant],
      }}
    >
      {QUADRANT_MATRIX_LABELS[quadrant]}
    </span>
  );
}
