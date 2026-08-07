"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GreenCareSymbol } from "@/components/create/design/GreenCareSymbol";
import {
  calibrationToSigned,
  formatQuadrantLabel,
  quadrantFromPosition,
  signedToUnit,
} from "@/lib/journey/types";
import { PUBLISH_FLOW, quadrantDisplayName, QUADRANT_ANCHORED_SUMMARIES } from "@/lib/publish-flow-copy";
import {
  QUADRANT_COLORS,
  QUADRANT_TEXT_COLORS,
  type FutureQuadrant,
} from "@/types/future";

const PLOT = { size: 260 };

function plotToSvg(unitX: number, unitY: number) {
  return {
    cx: unitX * PLOT.size,
    cy: (1 - unitY) * PLOT.size,
  };
}
  id: FutureQuadrant;
  corner: "tl" | "tr" | "bl" | "br";
  label: string;
}[] = [
  { id: "techno_optimist", corner: "tl", label: "Naïve Techno-Optimist" },
  { id: "feminist_preferred", corner: "tr", label: "Feminist Preferable" },
  { id: "dominant_dystopian", corner: "bl", label: "Dominant Dystopian" },
  {
    id: "fragmented",
    corner: "br",
    label: "Fragmented / Precarious",
  },
];

const QUADRANT_LAYOUT: {
  systemLogicScore: number | null;
  powerOrgScore: number | null;
  showSummary?: boolean;
  className?: string;
  sticky?: boolean;
};

/** Read-only live matrix — Figma node 28-517 / 61-2670. Sliders drive the dot. */
export function PublishLiveMatrix({
  systemLogicScore,
  powerOrgScore,
  showSummary = true,
  className = "",
  sticky = false,
}: PublishLiveMatrixProps) {
  const reduceMotion = useReducedMotion();
  const copy = PUBLISH_FLOW.matrix;
  const x =
    systemLogicScore != null ? calibrationToSigned(systemLogicScore) : 0;
  const y = powerOrgScore != null ? calibrationToSigned(powerOrgScore) : 0;
  const unit = signedToUnit(x, y);
  const { cx, cy } = plotToSvg(unit.x, 1 - unit.y);
  const quadrant = quadrantFromPosition(x, y);
  const systemPct =
    systemLogicScore != null ? Math.round(systemLogicScore) : 50;
  const powerPct = powerOrgScore != null ? Math.round(powerOrgScore) : 50;
  const half = PLOT.size / 2;

  return (
    <div
      className={`${sticky ? "lg:sticky lg:top-6" : ""} ${className}`}
    >
      <p className="mb-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
        {copy.livePositionLabel}
      </p>

      <div className="relative mx-auto w-full max-w-[360px]">
        <div className="mb-1.5 flex items-center justify-center gap-1.5 pl-12 text-[9px] font-medium text-ffie-muted">
          <span className="text-ffie-muted/70">↑</span>
          <span>Collective Care</span>
        </div>

        <div className="flex items-center">
          <div className="flex w-12 shrink-0 items-center justify-end pr-2">
            <span className="-rotate-90 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-ffie-muted/70">
              Power Organization
            </span>
          </div>

          <div className="relative flex-1">
            <div className="absolute -left-14 top-1/2 -translate-y-1/2 text-[9px] font-medium text-ffie-muted">
              Extractive ←
            </div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[9px] font-medium text-ffie-muted">
              → Emancipatory
            </div>

            <svg
              viewBox={`0 0 ${PLOT.size} ${PLOT.size}`}
              className="w-full rounded-lg border border-ffie-line bg-white"
              role="img"
              aria-label="Live matrix position"
            >
              {QUADRANT_LAYOUT.map((spec) => {
                const isLeft = spec.corner === "tl" || spec.corner === "bl";
                const isTop = spec.corner === "tl" || spec.corner === "tr";
                const qx = isLeft ? 0 : half;
                const qy = isTop ? 0 : half;
                const active = spec.id === quadrant;

                return (
                  <g key={spec.id}>
                    <rect
                      x={qx}
                      y={qy}
                      width={half}
                      height={half}
                      fill={QUADRANT_COLORS[spec.id]}
                      opacity={active ? 1 : 0.55}
                    />
                    {active && (
                      <rect
                        x={qx + 1}
                        y={qy + 1}
                        width={half - 2}
                        height={half - 2}
                        fill="none"
                        stroke={QUADRANT_TEXT_COLORS[spec.id]}
                        strokeWidth={1}
                        opacity={0.5}
                      />
                    )}
                    <text
                      x={qx + (isLeft ? 10 : half - 10)}
                      y={qy + (isTop ? 18 : half - 8)}
                      textAnchor={isLeft ? "start" : "end"}
                      className="select-none fill-current text-[7.5px] font-bold uppercase tracking-[0.06em]"
                      style={{ color: QUADRANT_TEXT_COLORS[spec.id] }}
                    >
                      {spec.label}
                    </text>
                    {spec.id === "feminist_preferred" && (
                      <foreignObject
                        x={qx + half - 26}
                        y={qy + 8}
                        width={16}
                        height={16}
                      >
                        <GreenCareSymbol className="size-4 text-[#2c8a52]" />
                      </foreignObject>
                    )}
                  </g>
                );
              })}

              <line
                x1={half}
                y1={0}
                x2={half}
                y2={PLOT.size}
                stroke="#231352"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.25}
              />
              <line
                x1={0}
                y1={half}
                x2={PLOT.size}
                y2={half}
                stroke="#231352"
                strokeWidth={0.5}
                strokeDasharray="3 3"
                opacity={0.25}
              />

              <motion.circle
                cx={cx}
                cy={cy}
                r={5.5}
                fill="#6e52c4"
                stroke="#ffffff"
                strokeWidth={2}
                animate={{ cx, cy }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 28 }
                }
              />
            </svg>
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-1.5 pl-12 text-[9px] font-medium text-ffie-muted">
          <span>Hierarchical</span>
          <span className="text-ffie-muted/70">↓</span>
        </div>
        <p className="mt-0.5 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-ffie-muted/70">
          System Logic
        </p>
      </div>

      {showSummary && (
        <div className="mt-3 rounded-[10px] border border-ffie-line/70 bg-white px-4 py-3">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            <span>{copy.systemLogicSummary}</span>
            <span className="font-mono text-ffie-accent">{systemPct}%</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            <span>{copy.powerOrgSummary}</span>
            <span className="font-mono text-ffie-accent">{powerPct}%</span>
          </div>
          <div className="mt-2.5 border-t border-ffie-line/70 pt-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
              {copy.currentQuadrant}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-ffie-ink">
              {quadrantDisplayName(quadrant)}
            </p>
            <p className="sr-only">{formatQuadrantLabel(quadrant)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/** Anchored panel beside the published card matrix. */
export function PublishAnchoredMatrixPanel({
  systemLogicScore,
  powerOrgScore,
}: {
  systemLogicScore: number | null;
  powerOrgScore: number | null;
}) {
  const copy = PUBLISH_FLOW.published;
  const x =
    systemLogicScore != null ? calibrationToSigned(systemLogicScore) : 0;
  const y = powerOrgScore != null ? calibrationToSigned(powerOrgScore) : 0;
  const quadrant = quadrantFromPosition(x, y);
  const systemPct =
    systemLogicScore != null ? Math.round(systemLogicScore) : 50;
  const powerPct = powerOrgScore != null ? Math.round(powerOrgScore) : 50;
  const summary = QUADRANT_ANCHORED_SUMMARIES[quadrant];

  return (
    <div className="flex flex-col justify-center gap-4 py-6 pl-6 pr-5 sm:pl-8">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
          {copy.anchoredEyebrow}
        </p>
        <p className="mt-2 font-display text-[19px] font-extrabold tracking-tight text-[#3a2278]">
          {quadrantDisplayName(quadrant)}
        </p>
        <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-ffie-muted">
          {summary}
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-medium uppercase tracking-[0.12em] text-ffie-muted">
              System Logic
            </span>
            <span className="font-mono text-[#3a2278]">
              Emancipatory · {systemPct}%
            </span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-ffie-line/70">
            <div
              className="h-1 rounded-full bg-ffie-accent"
              style={{ width: `${systemPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-medium uppercase tracking-[0.12em] text-ffie-muted">
              Power Org.
            </span>
            <span className="font-mono text-[#3a2278]">
              Collective · {powerPct}%
            </span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-ffie-line/70">
            <div
              className="h-1 rounded-full bg-ffie-accent"
              style={{ width: `${powerPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
