"use client";

import { motion, useReducedMotion } from "framer-motion";
import { QUADRANT_DESCRIPTIONS } from "@/lib/journey/matrix-copy";
import {
  formatQuadrantLabel,
  quadrantFromPosition,
  signedToUnit,
} from "@/lib/journey/types";
import { QUADRANT_COLORS, QUADRANT_MATRIX_LABELS } from "@/types/future";

const PLOT = { padding: 56, width: 520, height: 520 };

function plotToSvg(unitX: number, unitY: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + unitX * inner,
    cy: PLOT.padding + (1 - unitY) * inner,
  };
}

function FeministCareMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 8}, ${y - 10})`} aria-hidden>
      <path
        d="M8 16 C8 10 4 6 4 4 C4 2 6 0 8 0 C10 0 12 2 12 4 C12 6 8 10 8 16 Z"
        fill="#2c8a52"
        opacity={0.85}
      />
      <path
        d="M8 8 L8 14 M5 11 L11 11"
        stroke="#2c8a52"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </g>
  );
}

export function InteractiveMatrixReveal({
  position,
  interactive = false,
  onDotClick,
  prominent = false,
  stageRef,
}: {
  position: { x: number; y: number };
  interactive?: boolean;
  onDotClick?: (anchor: { x: number; y: number }) => void;
  prominent?: boolean;
  stageRef?: React.RefObject<HTMLElement | null>;
}) {
  const unit = signedToUnit(position.x, position.y);
  const { cx, cy } = plotToSvg(unit.x, unit.y);
  const mid = PLOT.width / 2;
  const start = plotToSvg(0.5, 0.5);
  const quadrant = quadrantFromPosition(position.x, position.y);
  const reduceMotion = useReducedMotion();
  const inner = PLOT.width - PLOT.padding * 2;
  const half = inner / 2;

  const handleDotActivate = (
    event: React.MouseEvent<SVGCircleElement>,
  ) => {
    if (!interactive || !onDotClick) return;
    const dotRect = event.currentTarget.getBoundingClientRect();
    const stageRect =
      stageRef?.current?.getBoundingClientRect() ??
      event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!stageRect) return;

    onDotClick({
      x: dotRect.left + dotRect.width / 2 - stageRect.left,
      y: dotRect.top + dotRect.height / 2 - stageRect.top,
    });
  };

  return (
    <div
      className={`mx-auto space-y-4 ${prominent ? "max-w-2xl" : "max-w-md"}`}
    >
      <p className="text-center text-sm text-ffie-muted">
        Your answers placed this future here — on the Critical Feminist Matrix.
      </p>
      <svg
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className={`mx-auto w-full rounded-2xl border border-ffie-line bg-ffie-surface ${
          interactive && prominent
            ? "shadow-[0_8px_40px_rgba(110,82,196,0.28)]"
            : "shadow-[0_8px_32px_rgba(35,19,82,0.08)]"
        }`}
        role="img"
        aria-label={`Placed in ${formatQuadrantLabel(quadrant)}`}
      >
        <defs>
          <filter id="matrix-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
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

        <FeministCareMark x={mid + half * 0.75} y={PLOT.padding + half * 0.35} />

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
          y={PLOT.padding - 10}
          textAnchor="middle"
          className="fill-ffie-muted text-[8px] font-medium"
        >
          Power Organization → Collective Care
        </text>
        <text
          x={PLOT.width / 2}
          y={PLOT.height - PLOT.padding + 22}
          textAnchor="middle"
          className="fill-ffie-muted text-[8px] font-medium"
        >
          ← Hierarchical
        </text>
        <text
          x={PLOT.padding - 8}
          y={PLOT.height / 2}
          textAnchor="end"
          className="fill-ffie-muted text-[8px] font-medium"
          transform={`rotate(-90 ${PLOT.padding - 8} ${PLOT.height / 2})`}
        >
          Extractive
        </text>
        <text
          x={PLOT.width - PLOT.padding + 8}
          y={PLOT.height / 2}
          textAnchor="start"
          className="fill-ffie-muted text-[8px] font-medium"
          transform={`rotate(90 ${PLOT.width - PLOT.padding + 8} ${PLOT.height / 2})`}
        >
          Emancipatory
        </text>

        <text
          x={PLOT.padding + 8}
          y={PLOT.padding + 14}
          className="fill-ffie-muted text-[8px]"
        >
          {QUADRANT_MATRIX_LABELS.techno_optimist}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.padding + 14}
          textAnchor="end"
          className="fill-ffie-muted text-[8px]"
        >
          {QUADRANT_MATRIX_LABELS.feminist_preferred}
        </text>
        <text
          x={PLOT.padding + 8}
          y={PLOT.height - PLOT.padding - 8}
          className="fill-ffie-muted text-[8px]"
        >
          {QUADRANT_MATRIX_LABELS.dominant_dystopian}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.height - PLOT.padding - 8}
          textAnchor="end"
          className="fill-ffie-muted text-[8px]"
        >
          {QUADRANT_MATRIX_LABELS.fragmented}
        </text>

        {!interactive && (
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
        )}

        {interactive && (
          <>
            {!reduceMotion && (
              <>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={32}
                  fill="#6e52c4"
                  opacity={0.12}
                  animate={{ r: [24, 38, 24], opacity: [0.2, 0.06, 0.2] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={22}
                  fill="none"
                  stroke="#6e52c4"
                  strokeWidth={2.5}
                  opacity={0.5}
                  animate={{ r: [18, 30, 18], opacity: [0.55, 0.1, 0.55] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
            <motion.circle
              r={prominent ? 16 : 14}
              fill="#6e52c4"
              stroke="#fff"
              strokeWidth={2.5}
              filter={prominent ? "url(#matrix-dot-glow)" : undefined}
              style={{ cursor: "pointer" }}
              initial={
                reduceMotion
                  ? { cx, cy, opacity: 1, scale: 1 }
                  : { cx: start.cx, cy: start.cy, opacity: 0.5, scale: 0.65 }
              }
              animate={{ cx, cy, opacity: 1, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 120,
                      damping: 16,
                      delay: 0.15,
                    }
              }
              onClick={handleDotActivate}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleDotActivate(
                    event as unknown as React.MouseEvent<SVGCircleElement>,
                  );
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Reveal your future card"
            />
          </>
        )}
      </svg>
      <p className="text-center font-display text-base font-bold text-ffie-ink">
        {formatQuadrantLabel(quadrant)}
      </p>
      <p className="mx-auto max-w-prose text-center text-sm leading-relaxed text-ffie-muted">
        {QUADRANT_DESCRIPTIONS[quadrant]}
      </p>
    </div>
  );
}
