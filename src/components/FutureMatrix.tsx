"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  COUNTRY_COLORS,
  QUADRANT_LABELS,
  QUADRANT_MATRIX_LABELS,
  type FutureCountry,
  type FutureEntry,
} from "@/types/future";

const PLOT = {
  padding: 72,
  width: 640,
  height: 640,
};

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
  onSelect?: (entry: FutureEntry | null) => void;
  linkToDetail?: boolean;
  highlightCountry?: FutureCountry | "all";
};

export function FutureMatrix({
  entries,
  selectedId,
  onSelect,
  linkToDetail = true,
  highlightCountry = "all",
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
          fill="#dbeafe"
        />
        <rect
          x={midX}
          y={PLOT.padding}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#dcfce7"
        />
        <rect
          x={PLOT.padding}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#fecdd3"
        />
        <rect
          x={midX}
          y={midY}
          width={(PLOT.width - PLOT.padding * 2) / 2}
          height={(PLOT.height - PLOT.padding * 2) / 2}
          fill="#fef08a"
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
          stroke="#1a1a1a"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.35}
        />
        <line
          x1={PLOT.padding}
          y1={midY}
          x2={PLOT.width - PLOT.padding}
          y2={midY}
          stroke="#1a1a1a"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.35}
        />

        <text
          x={PLOT.padding + 8}
          y={PLOT.padding + 14}
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {QUADRANT_MATRIX_LABELS.techno_optimist}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.padding + 14}
          textAnchor="end"
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {QUADRANT_MATRIX_LABELS.feminist_preferred}
        </text>
        <text
          x={PLOT.padding + 8}
          y={PLOT.height - PLOT.padding - 6}
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {QUADRANT_MATRIX_LABELS.dominant_dystopian}
        </text>
        <text
          x={PLOT.width - PLOT.padding - 8}
          y={PLOT.height - PLOT.padding - 6}
          textAnchor="end"
          className="fill-ffie-muted text-[8px] uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {QUADRANT_MATRIX_LABELS.fragmented}
        </text>

        <text
          x={PLOT.padding}
          y={PLOT.height - 20}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Extractive
        </text>
        <text
          x={PLOT.width - PLOT.padding}
          y={PLOT.height - 20}
          textAnchor="end"
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Emancipatory
        </text>
        <text
          x={24}
          y={PLOT.height - PLOT.padding}
          textAnchor="middle"
          transform={`rotate(-90 24 ${PLOT.height - PLOT.padding})`}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Hierarchical
        </text>
        <text
          x={24}
          y={PLOT.padding}
          textAnchor="middle"
          transform={`rotate(-90 24 ${PLOT.padding})`}
          className="fill-ffie-ink text-[11px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Collective Care
        </text>

        {entries.map((entry) => {
          const { cx, cy } = plotToSvg(entry.position.x, entry.position.y);
          const isSelected = selectedId === entry.id;
          const isDimmed =
            highlightCountry !== "all" && entry.country !== highlightCountry;
          const color = COUNTRY_COLORS[entry.country];

          const point = (
            <>
              <motion.circle
                cx={cx}
                cy={cy}
                r={isSelected ? 14 : 10}
                fill={color}
                stroke={isSelected ? "#5b3a7a" : "#ffffff"}
                strokeWidth={isSelected ? 3 : 2}
                className={onSelect || linkToDetail ? "cursor-pointer" : ""}
                initial={false}
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  opacity: isDimmed ? 0.25 : 1,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                onClick={() => {
                  if (onSelect) {
                    onSelect(isSelected ? null : entry);
                  } else if (linkToDetail) {
                    router.push(`/explore/${entry.id}`);
                  }
                }}
              />
              <text
                x={cx}
                y={cy - 16}
                textAnchor="middle"
                className="pointer-events-none fill-ffie-ink text-[10px] font-medium"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  opacity: isDimmed ? 0.35 : 1,
                }}
              >
                {entry.artifact.name}
              </text>
            </>
          );

          return <g key={entry.id}>{point}</g>;
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-ffie-muted">
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
      </div>
    </div>
  );
}

export function FutureGrid({ entries }: { entries: FutureEntry[] }) {
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
        <Link
          key={entry.id}
          href={`/explore/${entry.id}`}
          className="rounded-2xl border border-ffie-line bg-ffie-surface p-5 transition hover:border-ffie-accent/30 hover:shadow-sm"
        >
          <span className="rounded-full bg-ffie-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ffie-accent">
            {QUADRANT_LABELS[entry.quadrant]}
          </span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm text-ffie-muted">
            {entry.character.name} · {entry.artifact.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted line-clamp-3">
            {entry.tension}
          </p>
        </Link>
      ))}
    </div>
  );
}
