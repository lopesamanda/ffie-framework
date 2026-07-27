"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SegmentedControl,
  SegmentedControlAccent,
} from "@/components/create/design/SegmentedControl";
import { FuturePreviewPanel } from "@/components/FuturePreviewPanel";
import { FutureGrid, FutureMatrix } from "@/components/FutureMatrix";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import {
  QUADRANT_LABELS,
  type FutureCollection,
  type FutureCountry,
  type FutureEntry,
  type FutureQuadrant,
} from "@/types/future";

type ViewMode = "map" | "grid";

type ExploreViewProps = {
  futureCommons?: FutureEntry[];
};

export function ExploreView({ futureCommons = [] }: ExploreViewProps) {
  const [collection, setCollection] =
    useState<FutureCollection>("research_findings");
  const [view, setView] = useState<ViewMode>("map");
  const [country, setCountry] = useState<FutureCountry | "all">("all");
  const [quadrant, setQuadrant] = useState<FutureQuadrant | "all">("all");
  const [selected, setSelected] = useState<FutureEntry | null>(null);

  const baseEntries =
    collection === "research_findings"
      ? researchFindingsSeed
      : futureCommons;

  const filteredEntries = useMemo(() => {
    return baseEntries.filter((entry) => {
      if (country !== "all" && entry.country !== country) return false;
      if (quadrant !== "all" && entry.quadrant !== quadrant) return false;
      return true;
    });
  }, [baseEntries, country, quadrant]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SegmentedControl
          ariaLabel="Collection"
          value={collection}
          onChange={setCollection}
          options={[
            { value: "research_findings", label: "Research Findings" },
            { value: "future_commons", label: "Future Commons" },
          ]}
        />

        <SegmentedControlAccent
          ariaLabel="View mode"
          value={view}
          onChange={setView}
          options={[
            { value: "map", label: "Map" },
            { value: "grid", label: "Grid" },
          ]}
        />
      </div>

      <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
        {collection === "research_findings" ? (
          <>
            The eight diegetic prototypes from the thesis — fixed, validated,
            immutable. Filter by country to reproduce Figures 59 (Brazil) and 64
            (Portugal).
          </>
        ) : (
          <>
            Futures created by visitors through the Create journey, published
            after moderation. Structurally separate from Research Findings.
          </>
        )}
      </p>

      <div className="flex flex-wrap gap-3">
        <select
          value={country}
          onChange={(event) =>
            setCountry(event.target.value as FutureCountry | "all")
          }
          className="rounded-full border border-ffie-line bg-ffie-surface px-4 py-2 text-sm text-ffie-ink outline-none focus:border-ffie-accent/40"
        >
          <option value="all">All countries</option>
          <option value="Brazil">Brazil</option>
          <option value="Portugal">Portugal</option>
        </select>

        <select
          value={quadrant}
          onChange={(event) =>
            setQuadrant(event.target.value as FutureQuadrant | "all")
          }
          className="rounded-full border border-ffie-line bg-ffie-surface px-4 py-2 text-sm text-ffie-ink outline-none focus:border-ffie-accent/40"
        >
          <option value="all">All quadrants</option>
          {Object.entries(QUADRANT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {view === "map" ? (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <FutureMatrix
            entries={filteredEntries}
            selectedId={selected?.id}
            onSelect={setSelected}
            linkToDetail={false}
            highlightCountry={country}
          />

          <aside className="rounded-[12px] border border-ffie-line bg-ffie-surface p-6 shadow-[0_2px_8px_rgba(35,19,82,0.04)] lg:sticky lg:top-6">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <FuturePreviewPanel entry={selected} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-prose space-y-3 text-sm text-ffie-muted"
                >
                  <p className="font-medium text-ffie-ink">Select a future</p>
                  <p>
                    Click a point on the matrix to read an excerpt and
                    reflection question. Open any future for the complete
                    narrative and data block — or browse the grid view.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>
      ) : (
        <FutureGrid entries={filteredEntries} />
      )}
    </div>
  );
}
