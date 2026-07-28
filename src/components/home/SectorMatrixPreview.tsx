import {
  PERSONA_SECTOR_OPTIONS,
  SAMPLE_SECTOR_MATRIX_DOTS,
  SECTOR_COLORS,
  type PersonaSector,
} from "@/lib/journey/persona-sectors";
import { signedToUnit } from "@/lib/journey/types";
import type { FutureEntry } from "@/types/future";

const MIN_LIVE_ENTRIES = 3;

const PLOT = { padding: 24, width: 220, height: 220 };

function plotToSvg(x: number, y: number) {
  const inner = PLOT.width - PLOT.padding * 2;
  return {
    cx: PLOT.padding + x * inner,
    cy: PLOT.padding + (1 - y) * inner,
  };
}

type MatrixDot = { sector: PersonaSector; cx: number; cy: number };

function buildDots(entries: FutureEntry[]): {
  dots: MatrixDot[];
  isSample: boolean;
} {
  const withSector = entries.filter((entry) => entry.character.sector);
  if (withSector.length >= MIN_LIVE_ENTRIES) {
    return {
      isSample: false,
      dots: withSector.map((entry) => {
        const unit = signedToUnit(entry.position.x, entry.position.y);
        const { cx, cy } = plotToSvg(unit.x, unit.y);
        return {
          sector: entry.character.sector as PersonaSector,
          cx,
          cy,
        };
      }),
    };
  }

  return {
    isSample: true,
    dots: SAMPLE_SECTOR_MATRIX_DOTS.map((dot) => {
      const { cx, cy } = plotToSvg(dot.x, dot.y);
      return { sector: dot.sector, cx, cy };
    }),
  };
}

type SectorMatrixPreviewProps = {
  futureCommons: FutureEntry[];
  className?: string;
};

export function SectorMatrixPreview({
  futureCommons,
  className = "",
}: SectorMatrixPreviewProps) {
  const { dots, isSample } = buildDots(futureCommons);
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;

  return (
    <div
      className={`flex shrink-0 flex-col justify-center ${className}`}
      aria-hidden
    >
      {isSample && (
        <p className="mb-1.5 text-center text-[9px] font-medium uppercase tracking-[0.06em] text-ffie-muted/90">
          Sample data until more futures are published
        </p>
      )}
      <svg
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className="h-auto w-full max-w-[220px] rounded-xl border border-ffie-line/80 bg-ffie-bg/60"
        role="img"
        aria-label="Matrix preview colored by sector"
      >
        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#dbeafe"
          opacity={0.55}
        />
        <rect
          x={midX}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#eee9fd"
          opacity={0.55}
        />
        <rect
          x={PLOT.padding}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#fee2e2"
          opacity={0.55}
        />
        <rect
          x={midX}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#fef9c3"
          opacity={0.55}
        />
        <line
          x1={midX}
          y1={PLOT.padding}
          x2={midX}
          y2={PLOT.height - PLOT.padding}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          opacity={0.25}
        />
        <line
          x1={PLOT.padding}
          y1={midY}
          x2={PLOT.width - PLOT.padding}
          y2={midY}
          stroke="#231352"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          opacity={0.25}
        />
        {dots.map((dot, index) => (
          <circle
            key={`${dot.sector}-${index}`}
            cx={dot.cx}
            cy={dot.cy}
            r={4.5}
            fill={SECTOR_COLORS[dot.sector]}
            stroke="#fff"
            strokeWidth={1.5}
            opacity={isSample ? 0.85 : 1}
          />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
        {PERSONA_SECTOR_OPTIONS.slice(0, 4).map((sector) => (
          <span
            key={sector}
            className="inline-flex items-center gap-1 text-[8px] text-ffie-muted"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: SECTOR_COLORS[sector] }}
            />
            {sector}
          </span>
        ))}
      </div>
    </div>
  );
}
