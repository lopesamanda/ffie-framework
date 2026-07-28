import Link from "next/link";
import {
  PERSONA_SECTOR_OPTIONS,
  SAMPLE_SECTOR_MATRIX_DOTS,
  SECTOR_COLORS,
  type PersonaSector,
} from "@/lib/journey/persona-sectors";
import { signedToUnit } from "@/lib/journey/types";
import type { FutureEntry } from "@/types/future";
import { ffieCardShell } from "@/lib/card-layout";

const MIN_LIVE_ENTRIES = 3;

const PLOT = { padding: 28, width: 280, height: 280 };

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

type SectorMatrixTeaserProps = {
  futureCommons: FutureEntry[];
};

export function SectorMatrixTeaser({ futureCommons }: SectorMatrixTeaserProps) {
  const { dots, isSample } = buildDots(futureCommons);
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;

  return (
    <section
      className={`mt-14 overflow-hidden px-[18px] py-8 md:py-10 ${ffieCardShell} border-ffie-line bg-ffie-surface`}
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-lg">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
            Future Commons preview
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ffie-ink">
            Where do AI futures in different sectors land?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            Each dot is a community-created future, coloured by sector on the
            Critical Feminist Matrix. Start the journey to see where yours would
            sit — and how it compares.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex items-center rounded-full bg-ffie-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ffie-accent/90"
          >
            See where yours would land
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[280px]">
          {isSample && (
            <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.08em] text-ffie-muted">
              Sample distribution — live data fills in as futures are published
            </p>
          )}
          <svg
            viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
            className="h-auto w-full rounded-xl border border-ffie-line bg-ffie-bg/50"
            role="img"
            aria-label="Matrix preview coloured by sector"
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
                r={5}
                fill={SECTOR_COLORS[dot.sector]}
                stroke="#fff"
                strokeWidth={1.5}
                opacity={isSample ? 0.85 : 1}
              />
            ))}
          </svg>
          <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {PERSONA_SECTOR_OPTIONS.slice(0, 5).map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center gap-1 text-[9px] text-ffie-muted"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: SECTOR_COLORS[sector] }}
                />
                {sector}
              </span>
            ))}
            <span className="text-[9px] text-ffie-muted">+ more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
