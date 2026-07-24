"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  atlasSeed,
  QUADRANT_LABELS,
  type AtlasEntry,
} from "@/data/atlas-seed";

const PLOT = {
  padding: 72,
  width: 640,
  height: 640,
};

const COUNTRY_COLORS = {
  BR: "#2d6a4f",
  PT: "#1d3557",
} as const;

function plotToSvg(x: number, y: number) {
  const innerWidth = PLOT.width - PLOT.padding * 2;
  const innerHeight = PLOT.height - PLOT.padding * 2;

  return {
    cx: PLOT.padding + x * innerWidth,
    cy: PLOT.padding + (1 - y) * innerHeight,
  };
}

function EntryCard({ entry }: { entry: AtlasEntry }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white"
          style={{ backgroundColor: COUNTRY_COLORS[entry.country] }}
        >
          {entry.country}
        </span>
        <span className="rounded-full bg-ffie-accent-soft px-2.5 py-1 text-xs font-medium text-ffie-accent">
          {QUADRANT_LABELS[entry.quadrant]}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {entry.personaName}
          <span className="text-ffie-muted"> · </span>
          {entry.artifactName}
        </h3>
        <p className="mt-1 text-sm text-ffie-muted">
          {entry.age} anos · {entry.role} (2036)
        </p>
      </div>

      <dl className="grid gap-3 text-sm">
        <div>
          <dt className="font-medium text-ffie-ink">Função da IA</dt>
          <dd className="text-ffie-muted">{entry.aiFunction}</dd>
        </div>
        <div>
          <dt className="font-medium text-ffie-ink">Desejo</dt>
          <dd className="text-ffie-muted">{entry.desire}</dd>
        </div>
        <div>
          <dt className="font-medium text-ffie-ink">Medo</dt>
          <dd className="text-ffie-muted">{entry.fear}</dd>
        </div>
        <div>
          <dt className="font-medium text-ffie-ink">Valores não-negociáveis</dt>
          <dd className="text-ffie-muted">{entry.values.join(" · ")}</dd>
        </div>
        <div>
          <dt className="font-medium text-ffie-ink">Promessa pública</dt>
          <dd className="text-ffie-muted">{entry.artifactPromise}</dd>
        </div>
        <div>
          <dt className="font-medium text-ffie-ink">Função oculta / tensão</dt>
          <dd className="text-ffie-muted">{entry.artifactHiddenFunction}</dd>
        </div>
      </dl>
    </div>
  );
}

export function AtlasMatrix() {
  const [selected, setSelected] = useState<AtlasEntry | null>(null);
  const midX = PLOT.width / 2;
  const midY = PLOT.height / 2;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div className="overflow-x-auto rounded-2xl border border-ffie-line bg-ffie-surface p-4 shadow-sm">
        <svg
          viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
          className="mx-auto h-auto w-full max-w-[640px]"
          role="img"
          aria-label="Matriz Feminista Crítica 2x2 com 8 protótipos diegéticos da tese"
        >
          <title>Atlas de Futuros — Matriz 2×2</title>

          {/* Quadrant backgrounds */}
          <rect
            x={PLOT.padding}
            y={PLOT.padding}
            width={(PLOT.width - PLOT.padding * 2) / 2}
            height={(PLOT.height - PLOT.padding * 2) / 2}
            fill="#f3efea"
          />
          <rect
            x={midX}
            y={PLOT.padding}
            width={(PLOT.width - PLOT.padding * 2) / 2}
            height={(PLOT.height - PLOT.padding * 2) / 2}
            fill="#eef3ef"
          />
          <rect
            x={PLOT.padding}
            y={midY}
            width={(PLOT.width - PLOT.padding * 2) / 2}
            height={(PLOT.height - PLOT.padding * 2) / 2}
            fill="#eef0f4"
          />
          <rect
            x={midX}
            y={midY}
            width={(PLOT.width - PLOT.padding * 2) / 2}
            height={(PLOT.height - PLOT.padding * 2) / 2}
            fill="#f0edf3"
          />

          {/* Plot area border */}
          <rect
            x={PLOT.padding}
            y={PLOT.padding}
            width={PLOT.width - PLOT.padding * 2}
            height={PLOT.height - PLOT.padding * 2}
            fill="none"
            stroke="#d8d4cc"
            strokeWidth={1.5}
          />

          {/* Axes */}
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

          {/* Axis labels */}
          <text
            x={PLOT.padding}
            y={PLOT.height - 20}
            textAnchor="start"
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

          {/* Axis titles */}
          <text
            x={PLOT.width / 2}
            y={PLOT.height - 4}
            textAnchor="middle"
            className="fill-ffie-muted text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            System Logic
          </text>
          <text
            x={8}
            y={PLOT.height / 2}
            textAnchor="middle"
            transform={`rotate(-90 8 ${PLOT.height / 2})`}
            className="fill-ffie-muted text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Power Organization
          </text>

          {/* Data points */}
          {atlasSeed.map((entry) => {
            const { cx, cy } = plotToSvg(entry.position.x, entry.position.y);
            const isSelected = selected?.id === entry.id;
            const color = COUNTRY_COLORS[entry.country];

            return (
              <g key={entry.id}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 14 : 10}
                  fill={color}
                  stroke={isSelected ? "#5b3a7a" : "#ffffff"}
                  strokeWidth={isSelected ? 3 : 2}
                  className="cursor-pointer"
                  initial={false}
                  animate={{ scale: isSelected ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  onClick={() =>
                    setSelected((current) =>
                      current?.id === entry.id ? null : entry,
                    )
                  }
                  role="button"
                  tabIndex={0}
                  aria-label={`${entry.personaName}, ${entry.artifactName}`}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected((current) =>
                        current?.id === entry.id ? null : entry,
                      );
                    }
                  }}
                />
                <text
                  x={cx}
                  y={cy - 16}
                  textAnchor="middle"
                  className="pointer-events-none fill-ffie-ink text-[10px] font-medium"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {entry.artifactName}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-ffie-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-ffie-br" />
            Brasil (Recife)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-ffie-pt" />
            Portugal (Lisboa)
          </span>
        </div>
      </div>

      <aside className="rounded-2xl border border-ffie-line bg-ffie-surface p-6 shadow-sm lg:sticky lg:top-6">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <EntryCard entry={selected} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 text-sm text-ffie-muted"
            >
              <p className="font-medium text-ffie-ink">Selecione um ponto</p>
              <p>
                Clique em um dos 8 protótipos diegéticos para ver persona,
                artefato e tensões analíticas do Capítulo 5 da tese.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
