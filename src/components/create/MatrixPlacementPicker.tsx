"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { QUADRANT_MATRIX_LABELS } from "@/types/future";

const PLOT = { padding: 48, width: 400, height: 400 };

function plotToSvg(x: number, y: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + x * inner,
    cy: PLOT.padding + (1 - y) * inner,
  };
}

export function MatrixPlacementPicker({
  position,
  onChange,
}: {
  position: { x: number; y: number };
  onChange: (position: { x: number; y: number }) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const mid = PLOT.width / 2;

  const setFromEvent = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const inner = PLOT.width - PLOT.padding * 2;
    const relX = ((clientX - rect.left) / rect.width) * PLOT.width - PLOT.padding;
    const relY = ((clientY - rect.top) / rect.height) * PLOT.height - PLOT.padding;
    const x = Math.min(1, Math.max(0, relX / inner));
    const y = Math.min(1, Math.max(0, 1 - relY / inner));
    onChange({ x, y });
  };

  const { cx, cy } = plotToSvg(position.x, position.y);

  return (
    <div className="space-y-3">
      <p className="text-sm text-ffie-muted">
        Drag your artifact to where you believe it belongs on the Critical
        Feminist Matrix.
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className="mx-auto w-full max-w-md cursor-crosshair touch-none rounded-xl border border-ffie-line bg-ffie-surface"
        onPointerDown={(event) => {
          setDragging(true);
          svgRef.current?.setPointerCapture(event.pointerId);
          setFromEvent(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => {
          if (!dragging) return;
          setFromEvent(event.clientX, event.clientY);
        }}
        onPointerUp={() => setDragging(false)}
      >
        <rect x={PLOT.padding} y={PLOT.padding} width={(PLOT.width - PLOT.padding * 2) / 2} height={(PLOT.height - PLOT.padding * 2) / 2} fill="#dbeafe" />
        <rect x={mid} y={PLOT.padding} width={(PLOT.width - PLOT.padding * 2) / 2} height={(PLOT.height - PLOT.padding * 2) / 2} fill="#dcfce7" />
        <rect x={PLOT.padding} y={mid} width={(PLOT.width - PLOT.padding * 2) / 2} height={(PLOT.height - PLOT.padding * 2) / 2} fill="#fecdd3" />
        <rect x={mid} y={mid} width={(PLOT.width - PLOT.padding * 2) / 2} height={(PLOT.height - PLOT.padding * 2) / 2} fill="#fef08a" />
        <line x1={mid} y1={PLOT.padding} x2={mid} y2={PLOT.height - PLOT.padding} stroke="#1a1a1a" strokeDasharray="4 4" opacity={0.3} />
        <line x1={PLOT.padding} y1={mid} x2={PLOT.width - PLOT.padding} y2={mid} stroke="#1a1a1a" strokeDasharray="4 4" opacity={0.3} />
        <text x={PLOT.padding + 6} y={PLOT.padding + 12} className="fill-ffie-muted text-[7px]">{QUADRANT_MATRIX_LABELS.techno_optimist}</text>
        <text x={PLOT.width - PLOT.padding - 6} y={PLOT.padding + 12} textAnchor="end" className="fill-ffie-muted text-[7px]">{QUADRANT_MATRIX_LABELS.feminist_preferred}</text>
        <motion.circle
          cx={cx}
          cy={cy}
          r={12}
          fill="#5b3a7a"
          stroke="#fff"
          strokeWidth={2}
          animate={{ scale: dragging ? 1.1 : 1 }}
        />
      </svg>
      <p className="text-center text-xs text-ffie-muted">
        Position: Extractive {Math.round((1 - position.x) * 100)}% ↔ Emancipatory{" "}
        {Math.round(position.x * 100)}% · Hierarchical{" "}
        {Math.round((1 - position.y) * 100)}% ↔ Collective Care{" "}
        {Math.round(position.y * 100)}%
      </p>
    </div>
  );
}
