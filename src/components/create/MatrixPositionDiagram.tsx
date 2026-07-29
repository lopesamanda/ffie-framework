import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
} from "@/types/future";
import { signedToUnit } from "@/lib/journey/types";

const PLOT = { padding: 48, width: 320, height: 320 };

function plotToSvg(unitX: number, unitY: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + unitX * inner,
    cy: PLOT.padding + (1 - unitY) * inner,
  };
}

type MatrixPositionDiagramProps = {
  position: { x: number; y: number };
  className?: string;
  dotRadius?: number;
};

/** Static 2×2 matrix with a single position dot — for export and summaries. */
export function MatrixPositionDiagram({
  position,
  className = "",
  dotRadius = 10,
}: MatrixPositionDiagramProps) {
  const unit = signedToUnit(position.x, position.y);
  const { cx, cy } = plotToSvg(unit.x, unit.y);
  const mid = PLOT.width / 2;
  const inner = PLOT.width - PLOT.padding * 2;
  const half = inner / 2;

  return (
    <svg
      viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
      className={className}
      role="img"
      aria-label="Critical Feminist Matrix position"
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
        y={14}
        textAnchor="middle"
        fill="#6b7280"
        fontSize={8}
        fontFamily="var(--font-sans)"
      >
        Power Organization → Collective Care
      </text>
      <text
        x={PLOT.width / 2}
        y={PLOT.height - 6}
        textAnchor="middle"
        fill="#6b7280"
        fontSize={8}
        fontFamily="var(--font-sans)"
      >
        System Logic: Extractive ← → Emancipatory
      </text>
      <text
        x={PLOT.padding + 6}
        y={PLOT.padding + 12}
        fill="#6b7280"
        fontSize={7}
        fontFamily="var(--font-sans)"
      >
        {QUADRANT_MATRIX_LABELS.techno_optimist}
      </text>
      <text
        x={PLOT.width - PLOT.padding - 6}
        y={PLOT.padding + 12}
        textAnchor="end"
        fill="#6b7280"
        fontSize={7}
        fontFamily="var(--font-sans)"
      >
        {QUADRANT_MATRIX_LABELS.feminist_preferred}
      </text>
      <text
        x={PLOT.padding + 6}
        y={PLOT.height - PLOT.padding - 6}
        fill="#6b7280"
        fontSize={7}
        fontFamily="var(--font-sans)"
      >
        {QUADRANT_MATRIX_LABELS.dominant_dystopian}
      </text>
      <text
        x={PLOT.width - PLOT.padding - 6}
        y={PLOT.height - PLOT.padding - 6}
        textAnchor="end"
        fill="#6b7280"
        fontSize={7}
        fontFamily="var(--font-sans)"
      >
        {QUADRANT_MATRIX_LABELS.fragmented}
      </text>
      <circle
        cx={cx}
        cy={cy}
        r={dotRadius}
        fill="#6e52c4"
        stroke="#fff"
        strokeWidth={2}
      />
    </svg>
  );
}
