"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  formatQuadrantLabel,
  matrixScaleToSigned,
  quadrantFromPosition,
  signedToUnit,
  type MatrixScaleScore,
} from "@/lib/journey/types";
import { QUADRANT_COLORS, QUADRANT_MATRIX_LABELS } from "@/types/future";

const PLOT = { padding: 28, width: 220, height: 220 };

function plotToSvg(unitX: number, unitY: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + unitX * inner,
    cy: PLOT.padding + (1 - unitY) * inner,
  };
}

type LivePositionMiniMatrixProps = {
  systemLogicScore: MatrixScaleScore | null;
  powerOrgScore: MatrixScaleScore | null;
  className?: string;
  /** When true, dot uses a spring settle (anchor ritual). */
  settling?: boolean;
};

function ambientTone(
  systemLogicScore: MatrixScaleScore | null,
  powerOrgScore: MatrixScaleScore | null,
): string {
  const x = systemLogicScore ? matrixScaleToSigned(systemLogicScore) : 0;
  const y = powerOrgScore ? matrixScaleToSigned(powerOrgScore) : 0;
  const warm = (x + y) / 2;
  if (warm > 0.35) return "rgba(110, 82, 196, 0.14)";
  if (warm < -0.35) return "rgba(200, 71, 42, 0.1)";
  return "rgba(26, 40, 112, 0.1)";
}

/** Compact live-position map for Matrix Calibration — no decorative quadrant marks. */
export function LivePositionMiniMatrix({
  systemLogicScore,
  powerOrgScore,
  className = "",
  settling = false,
}: LivePositionMiniMatrixProps) {
  const reduceMotion = useReducedMotion();
  const x =
    systemLogicScore != null ? matrixScaleToSigned(systemLogicScore) : 0;
  const y = powerOrgScore != null ? matrixScaleToSigned(powerOrgScore) : 0;
  const unit = signedToUnit(x, y);
  const { cx, cy } = plotToSvg(unit.x, unit.y);
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;
  const quadrant = quadrantFromPosition(x, y);
  const blobColor = ambientTone(systemLogicScore, powerOrgScore);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl blur-2xl"
        animate={{ backgroundColor: blobColor }}
        transition={{ duration: settling ? 0.9 : 0.8, ease: "easeOut" }}
      />
      <svg
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className="relative mx-auto w-full max-w-[220px] rounded-2xl border border-ffie-line bg-ffie-surface/90 shadow-sm"
        role="img"
        aria-label="Live matrix position preview"
      >
        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.techno_optimist}
          opacity={0.45}
        />
        <rect
          x={midX}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.feminist_preferred}
          opacity={0.45}
        />
        <rect
          x={PLOT.padding}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.dominant_dystopian}
          opacity={0.45}
        />
        <rect
          x={midX}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.fragmented}
          opacity={0.45}
        />
        <line
          x1={midX}
          y1={PLOT.padding}
          x2={midX}
          y2={PLOT.height - PLOT.padding}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          opacity={0.3}
        />
        <line
          x1={PLOT.padding}
          y1={midY}
          x2={PLOT.width - PLOT.padding}
          y2={midY}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          opacity={0.3}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={9}
          fill="#6e52c4"
          stroke="#fff"
          strokeWidth={2}
          animate={{ cx, cy, scale: settling && !reduceMotion ? [1, 1.15, 1] : 1 }}
          transition={
            settling
              ? { type: "spring", stiffness: 180, damping: 22, mass: 1.2 }
              : { type: "spring", stiffness: 320, damping: 28 }
          }
        />
      </svg>
      <p className="mt-2 text-center text-[10px] text-ffie-muted">
        {QUADRANT_MATRIX_LABELS[quadrant]}
      </p>
      <p className="sr-only">Current quadrant: {formatQuadrantLabel(quadrant)}</p>
    </div>
  );
}
