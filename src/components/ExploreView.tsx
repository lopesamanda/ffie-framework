"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { SegmentedControl } from "@/components/create/design/SegmentedControl";
import { ExploreFilterConsole } from "@/components/explore/ExploreFilterConsole";
import { FutureConstellation } from "@/components/explore/FutureConstellation";
import { MatrixAxisBackdrop } from "@/components/explore/MatrixAxisBackdrop";
import { ArtifactMarquee } from "@/components/home/ArtifactMarquee";
import { CursorLens } from "@/components/home/CursorLens";
import { FuturePreviewDetailContent } from "@/components/FuturePreviewPanel";
import { FutureGrid, FutureMatrix } from "@/components/FutureMatrix";
import {
  MatrixPointInteraction,
  type MatrixAnchor,
} from "@/components/matrix/MatrixPointInteraction";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import { buildArtifactMarqueeItems } from "@/lib/artifact-marquee-items";
import {
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
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1] as const,
};

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

  const lensKey = `${collection}-${lens}`;

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
    <>
      <CursorLens />
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

        <div className="space-y-4">
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

          <ExploreFilterConsole
            country={country}
            scenario={scenario}
            sector={sector}
            role={role}
            showRole={collection === "future_commons"}
            onCountryChange={setCountry}
            onScenarioChange={setScenario}
            onSectorChange={setSector}
            onRoleChange={setRole}
          />
        </div>

        <div className="-mx-2 overflow-hidden rounded-xl border border-ffie-line/50 bg-ffie-bg/40 px-2 py-4">
          <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            Artifacts in the commons
          </p>
          <ArtifactMarquee items={marqueeItems} variant="dual" />
        </div>

        <LayoutGroup id="explore-browse">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={lensKey}
              layout
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={fadeTransition}
              className="space-y-4"
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
                    <div className="relative overflow-hidden rounded-2xl border border-ffie-line bg-ffie-surface p-4 shadow-sm">
                      <MatrixAxisBackdrop />
                      <div className="relative z-10">
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
                            sharedLayout
                            idleFloat
                          />
                        </MatrixPointInteraction>
                      </div>
                    </div>

                    {!selected && (
                      <p className="max-w-prose text-sm text-ffie-muted">
                        Click a point on the matrix to read an excerpt — or switch
                        to Constellation for an atlas-style wander.
                      </p>
                    )}

                    <BuildYourOwnCta />
                  </div>
                )
              ) : lens === "constellation" ? (
                <>
                  <FutureConstellation
                    entries={filteredEntries}
                    emptyMessage={
                      collection === "future_commons" && baseEntries.length === 0
                        ? FUTURE_COMMONS_EMPTY
                        : NO_FILTER_MATCH
                    }
                    sharedLayout
                  />
                  {filteredEntries.length > 0 && <BuildYourOwnCta />}
                </>
              ) : filteredEntries.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
                  {collection === "future_commons" && baseEntries.length === 0
                    ? FUTURE_COMMONS_EMPTY
                    : NO_FILTER_MATCH}
                </p>
              ) : (
                <>
                  <FutureGrid entries={filteredEntries} sharedLayout />
                  <BuildYourOwnCta />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </>
  );
}

function BuildYourOwnCta() {
  return (
    <div className="flex flex-col gap-3 border-t border-ffie-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ffie-muted">Seen a future that feels close to home?</p>
      <Link
        href="/create"
        data-cursor-lens
        className="inline-flex w-fit rounded-full bg-ffie-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        Build your own →
      </Link>
    </div>
  );
}
