"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { FutureQuadrant } from "@/types/future";
import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";
import {
  NAMED_QUADRANT_SPECS,
  PUBLISH_FLOW,
  quadrantDisplayName,
} from "@/lib/publish-flow-copy";
import { clampUnit } from "@/lib/publish-flow/placement";

const PLOT = { padding: 36, size: 480 };

function plotToSvg(unitX: number, unitY: number) {
  const inner = PLOT.size - PLOT.padding * 2;
  return {
    cx: PLOT.padding + unitX * inner,
    cy: PLOT.padding + (1 - unitY) * inner,
  };
}

function unitFromSvgPoint(svgX: number, svgY: number) {
  const inner = PLOT.size - PLOT.padding * 2;
  return {
    x: clampUnit((svgX - PLOT.padding) / inner),
    y: clampUnit(1 - (svgY - PLOT.padding) / inner),
  };
}

type NamedQuadrantMatrixProps = {
  unitX: number;
  unitY: number;
  activeQuadrant: FutureQuadrant;
  hoveredQuadrant: FutureQuadrant | null;
  onHoverQuadrant: (quadrant: FutureQuadrant | null) => void;
  onSelectUnit: (unitX: number, unitY: number) => void;
};

export function NamedQuadrantMatrix({
  unitX,
  unitY,
  activeQuadrant,
  hoveredQuadrant,
  onHoverQuadrant,
  onSelectUnit,
}: NamedQuadrantMatrixProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const copy = PUBLISH_FLOW.matrix;
  const mid = PLOT.size / 2;
  const inner = PLOT.size - PLOT.padding * 2;
  const half = inner / 2;
  const { cx, cy } = plotToSvg(unitX, unitY);

  const clientToUnit = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const local = pt.matrixTransform(ctm.inverse());
    return unitFromSvgPoint(local.x, local.y);
  }, []);

  const handlePlanePointer = (event: React.PointerEvent<SVGRectElement>) => {
    const unit = clientToUnit(event.clientX, event.clientY);
    if (unit) onSelectUnit(unit.x, unit.y);
  };

  const handleLensPointerDown = (event: React.PointerEvent<SVGCircleElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handleLensPointerMove = (event: React.PointerEvent<SVGCircleElement>) => {
    if (!dragging) return;
    const unit = clientToUnit(event.clientX, event.clientY);
    if (unit) onSelectUnit(unit.x, unit.y);
  };

  const handleLensPointerUp = (event: React.PointerEvent<SVGCircleElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${PLOT.size} ${PLOT.size}`}
        className="mx-auto w-full max-w-[520px] rounded-[24px] border border-ffie-line/70 bg-ffie-surface/75 shadow-[0_20px_60px_rgba(35,19,82,0.1),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md"
        role="application"
        aria-label="Critical Feminist Matrix placement canvas"
      >
        {NAMED_QUADRANT_SPECS.map((spec) => {
          const isLeft = spec.corner === "tl" || spec.corner === "bl";
          const isTop = spec.corner === "tl" || spec.corner === "tr";
          const x = PLOT.padding + (isLeft ? 0 : half);
          const y = PLOT.padding + (isTop ? 0 : half);
          const active =
            spec.id === activeQuadrant || spec.id === hoveredQuadrant;

          return (
            <g key={spec.id}>
              <motion.rect
                x={x}
                y={y}
                width={half}
                height={half}
                fill={QUADRANT_COLORS[spec.id]}
                animate={{ opacity: active ? 0.78 : 0.44 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className="cursor-pointer"
                onPointerEnter={() => onHoverQuadrant(spec.id)}
                onPointerLeave={() => onHoverQuadrant(null)}
                onClick={() => onSelectUnit(spec.anchor.x, spec.anchor.y)}
              />
              {active && (
                <rect
                  x={x + 1}
                  y={y + 1}
                  width={half - 2}
                  height={half - 2}
                  fill="none"
                  stroke={QUADRANT_TEXT_COLORS[spec.id]}
                  strokeWidth={1.5}
                  opacity={0.45}
                  pointerEvents="none"
                />
              )}
              <text
                x={x + half / 2}
                y={y + 24}
                textAnchor="middle"
                className="pointer-events-none select-none fill-current text-[10px] font-semibold"
                style={{ color: QUADRANT_TEXT_COLORS[spec.id] }}
              >
                {quadrantDisplayName(spec.id)}
              </text>
              <text
                x={x + half / 2}
                y={y + 40}
                textAnchor="middle"
                className="pointer-events-none select-none fill-current text-[8px] font-medium opacity-85"
                style={{ color: QUADRANT_TEXT_COLORS[spec.id] }}
              >
                {spec.axisDescriptor}
              </text>
            </g>
          );
        })}

        <line
          x1={mid}
          y1={PLOT.padding}
          x2={mid}
          y2={PLOT.size - PLOT.padding}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="4 4"
          opacity={0.28}
        />
        <line
          x1={PLOT.padding}
          y1={mid}
          x2={PLOT.size - PLOT.padding}
          y2={mid}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="4 4"
          opacity={0.28}
        />

        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={inner}
          height={inner}
          fill="transparent"
          className="cursor-crosshair"
          onPointerDown={handlePlanePointer}
        />

        <motion.circle
          cx={cx}
          cy={cy}
          r={dragging ? 14 : 12}
          fill="#6e52c4"
          stroke="#ffffff"
          strokeWidth={3}
          animate={{ cx, cy }}
          transition={
            reduceMotion || dragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 320, damping: 28 }
          }
          style={{
            cursor: dragging ? "grabbing" : "grab",
            filter: "drop-shadow(0 0 8px rgba(110,82,196,0.45))",
          }}
          onPointerDown={handleLensPointerDown}
          onPointerMove={handleLensPointerMove}
          onPointerUp={handleLensPointerUp}
          onPointerCancel={handleLensPointerUp}
        />
      </svg>

      <div className="pointer-events-none absolute inset-x-4 bottom-2 flex justify-between text-[10px] font-medium text-ffie-muted">
        <span>Extractive</span>
        <span>Emancipatory</span>
      </div>
      <div className="pointer-events-none absolute inset-y-6 left-0 flex flex-col justify-between py-2 pl-0.5 text-[10px] font-medium text-ffie-muted">
        <span className="-rotate-90 origin-left translate-x-3 whitespace-nowrap">
          Collective Care
        </span>
        <span className="-rotate-90 origin-left translate-x-3 whitespace-nowrap">
          Hierarchical
        </span>
      </div>
      <p className="mt-3 text-center text-[10px] text-ffie-muted">
        {copy.axisHorizontal} · {copy.axisVertical}
      </p>
      <p className="sr-only">
        Active quadrant: {QUADRANT_MATRIX_LABELS[activeQuadrant]}
      </p>
    </div>
  );
}
