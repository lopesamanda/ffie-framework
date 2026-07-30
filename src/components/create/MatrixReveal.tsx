"use client";

import { motion, useReducedMotion } from "framer-motion";
import { QUADRANT_DESCRIPTIONS } from "@/lib/journey/matrix-copy";
import {
  formatQuadrantLabel,
  quadrantFromPosition,
  signedToUnit,
} from "@/lib/journey/types";
import { QUADRANT_COLORS, QUADRANT_MATRIX_LABELS } from "@/types/future";

const PLOT = { padding: 48, width: 400, height: 400 };

function plotToSvg(unitX: number, unitY: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + unitX * inner,
    cy: PLOT.padding + (1 - unitY) * inner,
  };
}

/**
 * Read-only matrix reveal: animates the marker to the computed placement.
 * Expects signed [−1, 1] coords from Likert placement.
 */
export function MatrixReveal({
  position,
}: {
  position: { x: number; y: number };
}) {
  const unit = signedToUnit(position.x, position.y);
  const { cx, cy } = plotToSvg(unit.x, unit.y);
  const mid = PLOT.width / 2;
  const start = plotToSvg(0.5, 0.5);
  const quadrant = quadrantFromPosition(position.x, position.y);
  const reduceMotion = useReducedMotion();
  const inner = PLOT.width - PLOT.padding * 2;
  const half = inner / 2;

  return (
    <div className="space-y-3">
      <p className="text-sm text-ffie-muted">
        Your answers placed this future here — on the Critical Feminist Matrix.
      </p>
      <svg
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className="mx-auto w-full max-w-md rounded-xl border border-ffie-line bg-ffie-surface"
        role="img"
        aria-label={`Placed in ${formatQuadrantLabel(quadrant)}`}
      >
        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={half}
          height={half}
          fill={QUADRANT_COLORS.techno_optimist}
        />
        <rect
          x={mid}
          y={PLOT.padding}
          width={half}
          height={half}
          fill={QUADRANT_COLORS.feminist_preferred}
        />
        <rect
          x={PLOT.padding}
          y={mid}
          width={half}
          height={half}
          fill={QUADRANT_COLORS.dominant_dystopian}
        />
        <rect
          x={mid}
          y={mid}
          width={half}
          height={half}
          fill={QUADRANT_COLORS.fragmented}
        />

        <line
          x1={mid}
          y1={PLOT.padding}
          x2={mid}
          y2={PLOT.height - PLOT.padding}
          stroke="#231352"
          strokeDasharray="4 4"
          opacity={0.25}
        />
        <line
          x1={PLOT.padding}
          y1={mid}
          x2={PLOT.width - PLOT.padding}
          y2={mid}
          stroke="#231352"
          strokeDasharray="4 4"
          opacity={0.25}
        />

        <text
          x={PLOT.width / 2}
          y={PLOT.padding - 8}
          textAnchor="middle"
          className="fill-ffie-muted text-[7px] font-medium"
        >
          Power Organization → Collective Care
        </text>
        <text
          x={PLOT.width / 2}
          y={PLOT.height - PLOT.padding + 20}
          textAnchor="middle"
          className="fill-ffie-muted text-[7px] font-medium"
        >
          ← Hierarchical
        </text>
        <text
          x={PLOT.padding - 6}
          y={PLOT.height / 2}
          textAnchor="end"
          className="fill-ffie-muted text-[7px] font-medium"
          transform={`rotate(-90 ${PLOT.padding - 6} ${PLOT.height / 2})`}
        >
          Extractive
        </text>
        <text
          x={PLOT.width - PLOT.padding + 6}
          y={PLOT.height / 2}
          textAnchor="start"
          className="fill-ffie-muted text-[7px] font-medium"
          transform={`rotate(90 ${PLOT.width - PLOT.padding + 6} ${PLOT.height / 2})`}
        >
          Emancipatory
        </text>

        <text
          x={PLOT.padding + 6}
          y={PLOT.padding + 12}
          className="fill-ffie-muted text-[7px]"
        >
          {QUADRANT_MATRIX_LABELS.techno_optimist}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 6}
          y={PLOT.padding + 12}
          textAnchor="end"
          className="fill-ffie-muted text-[7px]"
        >
          {QUADRANT_MATRIX_LABELS.feminist_preferred}
        </text>
        <text
          x={PLOT.padding + 6}
          y={PLOT.height - PLOT.padding - 6}
          className="fill-ffie-muted text-[7px]"
        >
          {QUADRANT_MATRIX_LABELS.dominant_dystopian}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 6}
          y={PLOT.height - PLOT.padding - 6}
          textAnchor="end"
          className="fill-ffie-muted text-[7px]"
        >
          {QUADRANT_MATRIX_LABELS.fragmented}
        </text>

        <motion.circle
          r={12}
          fill="#6e52c4"
          stroke="#fff"
          strokeWidth={2}
          initial={
            reduceMotion
              ? { cx, cy, opacity: 1, scale: 1 }
              : { cx: start.cx, cy: start.cy, opacity: 0.4, scale: 0.6 }
          }
          animate={{ cx, cy, opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 16, delay: 0.15 }
          }
        />
      </svg>
      <p className="text-center font-display text-sm font-bold text-ffie-ink">
        {formatQuadrantLabel(quadrant)}
      </p>
      <p className="text-sm leading-relaxed text-ffie-muted">
        {QUADRANT_DESCRIPTIONS[quadrant]}
      </p>
    </div>
  );
}
