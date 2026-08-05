import { researchFindingsSeed } from "@/data/research-findings-seed";
import { signedToUnit } from "@/lib/journey/types";

const PLOT = { padding: 18, width: 120, height: 120 };

function plotToSvg(x: number, y: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + x * inner,
    cy: PLOT.padding + (1 - y) * inner,
  };
}

/** Decorative matrix thumbnail — quadrant grid with a few dots, no labels. */
export function MatrixThumbnailPreview({ className = "" }: { className?: string }) {
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;
  const dots = researchFindingsSeed.slice(0, 6).map((entry) => {
    const unit = signedToUnit(entry.position.x, entry.position.y);
    return plotToSvg(unit.x, unit.y);
  });

  return (
    <svg
      viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
      className={`shrink-0 rounded-lg border border-ffie-line/80 bg-ffie-bg/60 ${className}`}
      aria-hidden
    >
      <rect
        x={PLOT.padding}
        y={PLOT.padding}
        width={(PLOT.width - PLOT.padding * 2) / 2}
        height={(PLOT.height - PLOT.padding * 2) / 2}
        fill="#dbeafe"
        opacity={0.5}
      />
      <rect
        x={midX}
        y={PLOT.padding}
        width={(PLOT.width - PLOT.padding * 2) / 2}
        height={(PLOT.height - PLOT.padding * 2) / 2}
        fill="#eee9fd"
        opacity={0.5}
      />
      <rect
        x={PLOT.padding}
        y={midY}
        width={(PLOT.width - PLOT.padding * 2) / 2}
        height={(PLOT.height - PLOT.padding * 2) / 2}
        fill="#fee2e2"
        opacity={0.5}
      />
      <rect
        x={midX}
        y={midY}
        width={(PLOT.width - PLOT.padding * 2) / 2}
        height={(PLOT.height - PLOT.padding * 2) / 2}
        fill="#fef9c3"
        opacity={0.5}
      />
      <line
        x1={midX}
        y1={PLOT.padding}
        x2={midX}
        y2={PLOT.height - PLOT.padding}
        stroke="#231352"
        strokeWidth={0.6}
        strokeDasharray="2 2"
        opacity={0.22}
      />
      <line
        x1={PLOT.padding}
        y1={midY}
        x2={PLOT.width - PLOT.padding}
        y2={midY}
        stroke="#231352"
        strokeWidth={0.6}
        strokeDasharray="2 2"
        opacity={0.22}
      />
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={3.5}
          fill="#6e52c4"
          stroke="#fff"
          strokeWidth={1}
          opacity={0.9}
        />
      ))}
    </svg>
  );
}
