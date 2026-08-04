"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SegmentedControl } from "@/components/create/design/SegmentedControl";
import { ArtifactMarquee } from "@/components/home/ArtifactMarquee";
import { FutureConstellation } from "@/components/explore/FutureConstellation";
import { FuturePreviewDetailContent } from "@/components/FuturePreviewPanel";
import { FutureGrid, FutureMatrix } from "@/components/FutureMatrix";
import {
  MatrixPointInteraction,
  type MatrixAnchor,
} from "@/components/matrix/MatrixPointInteraction";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import { buildArtifactMarqueeItems } from "@/lib/artifact-marquee-items";
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
    "Eight diegetic prototypes from the thesis — fixed, validated, immutable. Filter by country, scenario, or sector atop the matrix.",
  future_commons:
    "A living, growing collection — moderated, but not the validated thesis data above.",
};

const FUTURE_COMMONS_EMPTY =
  "The first futures from visitors like you will appear here. Be among the first to publish one.";

const NO_FILTER_MATCH =
  "No futures match these filters. Try widening country, scenario, or sector.";

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
  const [detailAnchor, setDetailAnchor] = useState<MatrixAnchor | null>(null);

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

  const marqueeItems = useMemo(
    () => buildArtifactMarqueeItems(futureCommons),
    [futureCommons],
  );

  const handleCollectionChange = (next: FutureCollection) => {
    setCollection(next);
    setSelected(null);
    setDetailAnchor(null);
    if (next === "research_findings") {
      setRole("all");
    } else {
      setSector("all");
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
              setDetailAnchor(null);
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
            <span className="mx-1 hidden h-6 w-px self-center bg-ffie-line sm:inline" />
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
          </div>
          {collection === "future_commons" && (
            <div className="flex flex-wrap gap-2 pt-2">
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

      <div className="-mx-2 overflow-hidden rounded-xl border border-ffie-line/50 bg-ffie-bg/40 px-2 py-4">
        <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
          Artifacts in the commons
        </p>
        <ArtifactMarquee items={marqueeItems} variant="dual" />
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
            filteredEntries.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
                {collection === "future_commons" && baseEntries.length === 0
                  ? FUTURE_COMMONS_EMPTY
                  : NO_FILTER_MATCH}
              </p>
            ) : (
            <div className="space-y-4">
              <MatrixPointInteraction
                open={Boolean(selected)}
                anchor={detailAnchor}
                previewLabel={selected?.artifact.name}
                title={selected?.title ?? ""}
                onClose={() => {
                  setSelected(null);
                  setDetailAnchor(null);
                }}
                childrenContent={
                  selected ? (
                    <FuturePreviewDetailContent entry={selected} />
                  ) : null
                }
                footerLink={
                  selected
                    ? {
                        href: `/explore/${selected.id}`,
                        label: "Read the full future →",
                      }
                    : undefined
                }
              >
                <FutureMatrix
                  entries={filteredEntries}
                  selectedId={selected?.id}
                  onSelect={(entry, anchor) => {
                    setSelected(entry);
                    setDetailAnchor(entry ? (anchor ?? null) : null);
                  }}
                  linkToDetail={false}
                  highlightCountry={country}
                  highlightSector={sector}
                  colorBy={
                    collection === "future_commons" ? "sector" : "country"
                  }
                />
              </MatrixPointInteraction>

              {!selected && (
                <p className="max-w-prose text-sm text-ffie-muted">
                  Click a point on the matrix to read an excerpt and reflection
                  question — or switch to Constellation for an atlas-style
                  wander.
                </p>
              )}

              <div className="flex flex-col gap-3 border-t border-ffie-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ffie-muted">
                  Seen a future that feels close to home?
                </p>
                <Link
                  href="/create"
                  className="inline-flex w-fit rounded-full bg-ffie-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Build your own →
                </Link>
              </div>
            </div>
            )
          ) : lens === "constellation" ? (
            <FutureConstellation
              entries={filteredEntries}
              emptyMessage={
                collection === "future_commons" && baseEntries.length === 0
                  ? FUTURE_COMMONS_EMPTY
                  : NO_FILTER_MATCH
              }
            />
          ) : filteredEntries.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
              {collection === "future_commons" && baseEntries.length === 0
                ? FUTURE_COMMONS_EMPTY
                : NO_FILTER_MATCH}
            </p>
          ) : (
            <FutureGrid entries={filteredEntries} />
          )}

          {lens !== "matrix" && filteredEntries.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-ffie-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ffie-muted">
                Seen a future that feels close to home?
              </p>
              <Link
                href="/create"
                className="inline-flex w-fit rounded-full bg-ffie-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Build your own →
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
