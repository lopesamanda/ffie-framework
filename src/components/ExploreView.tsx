"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SegmentedControl } from "@/components/create/design/SegmentedControl";
import { FutureConstellation } from "@/components/explore/FutureConstellation";
import { FuturePreviewPanel } from "@/components/FuturePreviewPanel";
import { FutureGrid, FutureMatrix } from "@/components/FutureMatrix";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import { ROLE_OPTIONS } from "@/lib/journey/character-options";
import { PERSONA_SECTOR_OPTIONS } from "@/lib/journey/persona-sectors";
import {
  QUADRANT_LABELS,
  type FutureCollection,
  type FutureCountry,
  type FutureEntry,
  type FutureQuadrant,
  type PersonaSector,
} from "@/types/future";

type BrowseLens = "matrix" | "constellation" | "grid";

type ExploreViewProps = {
  futureCommons?: FutureEntry[];
};

const EPISTEMIC_ENTRY =
  "These aren't hypotheticals — they're speculative artifacts validated through real workshops in Recife and Lisbon.";

const COLLECTION_COPY: Record<FutureCollection, string> = {
  research_findings:
    "Eight diegetic prototypes from the thesis — fixed, validated, immutable. Use country and scenario filters atop the matrix.",
  future_commons:
    "A living, growing collection — moderated, but not the validated thesis data above.",
};

const LENS_OPTIONS: { value: BrowseLens; label: string }[] = [
  { value: "matrix", label: "Matrix" },
  { value: "constellation", label: "Constellation" },
  { value: "grid", label: "Grid" },
];

const fadeTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1] as const,
};

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
          : "border-ffie-line bg-ffie-surface text-ffie-muted hover:border-ffie-accent/30 hover:text-ffie-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function ExploreView({ futureCommons = [] }: ExploreViewProps) {
  const reduceMotion = useReducedMotion();
  const [collection, setCollection] =
    useState<FutureCollection>("research_findings");
  const [lens, setLens] = useState<BrowseLens>("matrix");
  const [country, setCountry] = useState<FutureCountry | "all">("all");
  const [scenario, setScenario] = useState<FutureQuadrant | "all">("all");
  const [sector, setSector] = useState<PersonaSector | "all">("all");
  const [role, setRole] = useState<string | "all">("all");
  const [selected, setSelected] = useState<FutureEntry | null>(null);

  const baseEntries =
    collection === "research_findings"
      ? researchFindingsSeed
      : futureCommons;

  const filteredEntries = useMemo(() => {
    return baseEntries.filter((entry) => {
      if (country !== "all" && entry.country !== country) return false;
      if (scenario !== "all" && entry.quadrant !== scenario) return false;
      if (sector !== "all" && entry.character.sector !== sector) return false;
      if (role !== "all") {
        const entryRole = entry.character.role.toLowerCase();
        const filterRole = role.toLowerCase();
        if (entryRole !== filterRole && !entryRole.includes(filterRole)) {
          return false;
        }
      }
      return true;
    });
  }, [baseEntries, country, scenario, sector, role]);

  const contentKey = `${collection}-${lens}-${country}-${scenario}-${sector}-${role}`;

  const handleCollectionChange = (next: FutureCollection) => {
    setCollection(next);
    setSelected(null);
    if (next === "research_findings") {
      setSector("all");
      setRole("all");
    }
  };

  return (
    <div className="space-y-8">
      <p className="max-w-prose text-base leading-relaxed text-ffie-ink">
        {EPISTEMIC_ENTRY}
      </p>

      <div className="space-y-4 border-b border-ffie-line pb-6">
        <SegmentedControl
          ariaLabel="Collection"
          value={collection}
          onChange={handleCollectionChange}
          options={[
            { value: "research_findings", label: "Research Findings" },
            { value: "future_commons", label: "Future Commons" },
          ]}
        />

        <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
          {COLLECTION_COPY[collection]}
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            Primary lens
          </p>
          <SegmentedControl
            ariaLabel="Browse lens"
            value={lens}
            onChange={(value) => {
              setLens(value);
              setSelected(null);
            }}
            options={LENS_OPTIONS}
          />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            Filters
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All countries"
              active={country === "all"}
              onClick={() => setCountry("all")}
            />
            <FilterChip
              label="Brazil"
              active={country === "Brazil"}
              onClick={() =>
                setCountry((c) => (c === "Brazil" ? "all" : "Brazil"))
              }
            />
            <FilterChip
              label="Portugal"
              active={country === "Portugal"}
              onClick={() =>
                setCountry((c) => (c === "Portugal" ? "all" : "Portugal"))
              }
            />
            <span className="mx-1 hidden h-6 w-px self-center bg-ffie-line sm:inline" />
            <FilterChip
              label="All scenarios"
              active={scenario === "all"}
              onClick={() => setScenario("all")}
            />
            {(Object.entries(QUADRANT_LABELS) as [FutureQuadrant, string][]).map(
              ([key, label]) => (
                <FilterChip
                  key={key}
                  label={label.replace(" Future", "")}
                  active={scenario === key}
                  onClick={() =>
                    setScenario((current) => (current === key ? "all" : key))
                  }
                />
              ),
            )}
          </div>
          {collection === "future_commons" && (
            <div className="flex flex-wrap gap-2 pt-2">
              <FilterChip
                label="All sectors"
                active={sector === "all"}
                onClick={() => setSector("all")}
              />
              {PERSONA_SECTOR_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={sector === option}
                  onClick={() =>
                    setSector((current) => (current === option ? "all" : option))
                  }
                />
              ))}
              <span className="mx-1 hidden h-6 w-px self-center bg-ffie-line sm:inline" />
              <FilterChip
                label="All roles"
                active={role === "all"}
                onClick={() => setRole("all")}
              />
              {ROLE_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  active={role === option}
                  onClick={() =>
                    setRole((current) => (current === option ? "all" : option))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentKey}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={fadeTransition}
          layout={!reduceMotion}
        >
          {lens === "matrix" ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <FutureMatrix
                entries={filteredEntries}
                selectedId={selected?.id}
                onSelect={setSelected}
                linkToDetail={false}
                highlightCountry={country}
                highlightSector={sector}
                colorBy={collection === "future_commons" ? "sector" : "country"}
              />

              <aside className="rounded-[12px] border border-ffie-line bg-ffie-surface p-6 shadow-[0_2px_8px_rgba(35,19,82,0.04)] lg:sticky lg:top-6">
                <AnimatePresence mode="wait">
                  {selected ? (
                    <motion.div
                      key={selected.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={fadeTransition}
                    >
                      <FuturePreviewPanel entry={selected} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      className="max-w-prose space-y-3 text-sm text-ffie-muted"
                    >
                      <p className="font-medium text-ffie-ink">Select a future</p>
                      <p>
                        Click a point on the matrix to read an excerpt and
                        reflection question — or switch to Constellation for an
                        atlas-style wander.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </aside>
            </div>
          ) : lens === "constellation" ? (
            <FutureConstellation
              entries={filteredEntries}
              emptyMessage={
                collection === "future_commons"
                  ? "No published futures yet. Complete the Create journey to submit one for moderation."
                  : "No research findings match these filters."
              }
            />
          ) : (
            <FutureGrid entries={filteredEntries} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
