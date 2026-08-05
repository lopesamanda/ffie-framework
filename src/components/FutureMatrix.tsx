"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FutureCommonsCard } from "@/components/FutureCommonsCard";
import {
  COUNTRY_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_COLORS,
  type FutureCountry,
  type FutureEntry,
  type PersonaSector,
} from "@/types/future";
import { SECTOR_COLORS } from "@/lib/journey/persona-sectors";
import {
  matrixAnchorFromCircleClick,
  type MatrixAnchor,
} from "@/components/matrix/MatrixPointInteraction";
import { signedToUnit } from "@/lib/journey/types";

const PLOT = {
  padding: 72,
  width: 640,
  height: 640,
};

/** Commons Likert coords are signed [−1,1]; research findings seed uses unit [0,1]. */
function toUnitPlotPosition(entry: FutureEntry) {
  if (entry.collection === "future_commons") {
    return signedToUnit(entry.position.x, entry.position.y);
  }
  return entry.position;
}

function plotToSvg(x: number, y: number) {
  const innerWidth = PLOT.width - PLOT.padding * 2;
  const innerHeight = PLOT.height - PLOT.padding * 2;

  return {
    cx: PLOT.padding + x * innerWidth,
    cy: PLOT.padding + (1 - y) * innerHeight,
  };
}

type FutureMatrixProps = {
  entries: FutureEntry[];
  selectedId?: string | null;
  onSelect?: (entry: FutureEntry | null, anchor?: MatrixAnchor) => void;
  linkToDetail?: boolean;
  highlightCountry?: FutureCountry | "all";
  highlightSector?: PersonaSector | "all";
  /** Dot colour: country (research) or sector (Future Commons). */
  colorBy?: "country" | "sector";
  /** Shared layout ids for cross-view transitions on Explore. */
  sharedLayout?: boolean;
  /** Gentle idle float on matrix dots. */
  idleFloat?: boolean;
};

function dotColor(entry: FutureEntry, colorBy: "country" | "sector"): string {
  if (colorBy === "sector" && entry.character.sector) {
    return SECTOR_COLORS[entry.character.sector];
  }
  return COUNTRY_COLORS[entry.country];
}

export function FutureMatrix({
  entries,
  selectedId,
  onSelect,
  linkToDetail = true,
  highlightCountry = "all",
  highlightSector = "all",
  colorBy = "country",
  sharedLayout = false,
  idleFloat = false,
}: FutureMatrixProps) {
  const router = useRouter();
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;

  return (
    <div className="overflow-x-auto rounded-2xl border border-ffie-line bg-ffie-surface p-4 shadow-sm">
      <svg
        viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
        className="mx-auto h-auto w-full max-w-[640px]"
        role="img"
        aria-label="Critical Feminist 2x2 matrix"
      >
        <title>Critical Feminist Matrix</title>

        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.techno_optimist}
        />
        <rect
          x={midX}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.feminist_preferred}
        />
        <rect
          x={PLOT.padding}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.dominant_dystopian}
        />
        <rect
          x={midX}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill={QUADRANT_COLORS.fragmented}
        />

        <rect
          x={PLOT.padding}
          y={PLOT.padding}
          width={PLOT.width - PLOT.padding * 2}
          height={PLOT.height - PLOT.padding * 2}
          fill="none"
          stroke="#d8d4cc"
          strokeWidth={1.5}
        />

        <line
          x1={midX}
          y1={PLOT.padding}
          x2={midX}
          y2={PLOT.height - PLOT.padding}
          stroke="#231352"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.35}
        />
        <line
          x1={PLOT.padding}
          y1={midY}
          x2={PLOT.width - PLOT.padding}
          y2={midY}
          stroke="#231352"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.35}
        />

        <text
          x={PLOT.padding + 8}
          y={PLOT.padding + 14}
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {QUADRANT_MATRIX_LABELS.techno_optimist}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.padding + 14}
          textAnchor="end"
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {QUADRANT_MATRIX_LABELS.feminist_preferred}
        </text>
        <text
          x={PLOT.padding + 8}
          y={PLOT.height - PLOT.padding - 6}
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {QUADRANT_MATRIX_LABELS.dominant_dystopian}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.height - PLOT.padding - 6}
          textAnchor="end"
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {QUADRANT_MATRIX_LABELS.fragmented}
        </text>

        <text
          x={PLOT.padding}
          y={PLOT.height - 20}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Extractive
        </text>
        <text
          x={PLOT.width - PLOT.padding}
          y={PLOT.height - 20}
          textAnchor="end"
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Emancipatory
        </text>
        <text
          x={24}
          y={PLOT.height - PLOT.padding}
          textAnchor="middle"
          transform={`rotate(-90 24 ${PLOT.height - PLOT.padding})`}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Hierarchical
        </text>
        <text
          x={24}
          y={PLOT.padding}
          textAnchor="middle"
          transform={`rotate(-90 24 ${PLOT.padding})`}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Collective Care
        </text>

        {entries.map((entry, index) => {
          const unit = toUnitPlotPosition(entry);
          const { cx, cy } = plotToSvg(unit.x, unit.y);
          const isSelected = selectedId === entry.id;
          const isDimmed =
            (highlightCountry !== "all" && entry.country !== highlightCountry) ||
            (highlightSector !== "all" &&
              entry.character.sector !== highlightSector);
          const color = dotColor(entry, colorBy);
          const floatDuration = 3.2 + (index % 5) * 0.35;

          const point = (
            <>
              <motion.circle
                layoutId={
                  sharedLayout ? `explore-artifact-${entry.id}` : undefined
                }
                cx={cx}
                cy={cy}
                r={isSelected ? 14 : 10}
                fill={color}
                stroke={isSelected ? "#6e52c4" : "#ffffff"}
                strokeWidth={isSelected ? 3 : 2}
                className={onSelect || linkToDetail ? "cursor-pointer" : ""}
                data-cursor-lens={onSelect || linkToDetail ? true : undefined}
                initial={false}
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  opacity: isDimmed ? 0.25 : 1,
                  cy: idleFloat ? [cy, cy - 2.5, cy] : cy,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 420, damping: 28 },
                  opacity: { duration: 0.2 },
                  cy: idleFloat
                    ? {
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0 },
                }}
                onClick={(event) => {
                  if (onSelect) {
                    const container = event.currentTarget.closest(
                      "[data-matrix-point-root]",
                    ) as HTMLElement | null;
                    const anchor = matrixAnchorFromCircleClick(
                      event,
                      container,
                    );
                    onSelect(isSelected ? null : entry, anchor ?? undefined);
                  } else if (linkToDetail) {
                    router.push(`/explore/${entry.id}`);
                  }
                }}
              />
              <text
                x={cx}
                y={cy - (entry.previewSubtitle ? 28 : 16)}
                textAnchor="middle"
                className="pointer-events-none fill-ffie-ink text-[10px] font-medium"
                style={{
                  fontFamily: "var(--font-sans)",
                  opacity: isDimmed ? 0.35 : 1,
                }}
              >
                {entry.artifact.name}
              </text>
              {entry.previewSubtitle && (
                <text
                  x={cx}
                  y={cy - 14}
                  textAnchor="middle"
                  className="pointer-events-none fill-ffie-muted text-[8px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    opacity: isDimmed ? 0.3 : 0.85,
                  }}
                >
                  {entry.previewSubtitle.length > 42
                    ? `${entry.previewSubtitle.slice(0, 40)}…`
                    : entry.previewSubtitle}
                </text>
              )}
            </>
          );

          return <g key={entry.id}>{point}</g>;
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-ffie-muted">
        {colorBy === "sector" ? (
          (Object.entries(SECTOR_COLORS) as [PersonaSector, string][]).map(
            ([sector, sectorColor]) => (
              <span key={sector} className="inline-flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: sectorColor }}
                />
                {sector}
              </span>
            ),
          )
        ) : (
          <>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COUNTRY_COLORS.Brazil }}
              />
              Brazil (Recife)
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COUNTRY_COLORS.Portugal }}
              />
              Portugal (Lisbon)
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function FutureGrid({
  entries,
  sharedLayout = false,
}: {
  entries: FutureEntry[];
  sharedLayout?: boolean;
}) {
  if (entries.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
        No published futures yet. Complete the Create journey to submit one for
        moderation.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <motion.div
          key={entry.id}
          layout={sharedLayout}
          layoutId={sharedLayout ? `explore-artifact-${entry.id}` : undefined}
        >
          <FutureCommonsCard
            entry={entry}
            className="transition hover:border-ffie-accent/30 hover:shadow-[0_4px_16px_rgba(35,19,82,0.08)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
