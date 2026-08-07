"use client";

import { motion, useReducedMotion } from "framer-motion";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { QUADRANT_DESCRIPTIONS } from "@/lib/journey/matrix-copy";
import {
  formatQuadrantLabel,
  percentTowardHighFromCalibration,
  type JourneyDraft,
} from "@/lib/journey/types";
import {
  PUBLISH_FLOW,
  quadrantDisplayName,
} from "@/lib/publish-flow-copy";
import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_TEXT_COLORS } from "@/types/future";

function formatTag(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type ArtifactSummaryPanelProps = {
  draft: JourneyDraft;
  activeQuadrant: FutureQuadrant;
  highlightedQuadrant: FutureQuadrant | null;
};

export function ArtifactSummaryPanel({
  draft,
  activeQuadrant,
  highlightedQuadrant,
}: ArtifactSummaryPanelProps) {
  const reduceMotion = useReducedMotion();
  const copy = PUBLISH_FLOW.matrix;
  const focusQuadrant = highlightedQuadrant ?? activeQuadrant;
  const accent = QUADRANT_TEXT_COLORS[focusQuadrant];

  const artifactTitle =
    draft.artifactName.trim() || draft.title.trim() || "Untitled artifact";
  const teaser =
    draft.publicPromise.trim() ||
    draft.artifactGoalPitch.trim() ||
    draft.drawSynthesis.trim() ||
    "A speculative artifact waiting to be placed on the Living Cartography.";

  const valueTags = resolveArtifactValues(draft);
  const axisTags: string[] = [];
  if (draft.systemLogicScore != null) {
    const pct = percentTowardHighFromCalibration(draft.systemLogicScore);
    axisTags.push(pct >= 50 ? "Emancipatory" : "Extractive");
  }
  if (draft.powerOrgScore != null) {
    const pct = percentTowardHighFromCalibration(draft.powerOrgScore);
    axisTags.push(pct >= 50 ? "Collective Care" : "Hierarchical");
  }

  const allTags = [...new Set([...valueTags.map(formatTag), ...axisTags])];
  const territory = draft.location.trim() || "Territory not set";
  const guidance =
    QUADRANT_DESCRIPTIONS[focusQuadrant].slice(0, 220) +
    (QUADRANT_DESCRIPTIONS[focusQuadrant].length > 220 ? "…" : "");

  return (
    <motion.aside
      layout={!reduceMotion}
      className="rounded-2xl border border-ffie-line/80 bg-ffie-surface/85 p-5 shadow-[0_12px_40px_rgba(35,19,82,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ffie-muted">
        {copy.summaryHeading}
      </p>

      <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ffie-ink">
        {artifactTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ffie-muted">{teaser}</p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ffie-muted">
            {copy.territoryLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-ffie-ink">{territory}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ffie-muted">
            {copy.tagsLabel}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const quadrantAligned =
                tag === quadrantDisplayName(focusQuadrant) ||
                tag === formatQuadrantLabel(focusQuadrant).replace(" Future", "");
              const emphasized =
                highlightedQuadrant != null &&
                (quadrantAligned ||
                  tag === "Emancipatory" ||
                  tag === "Extractive" ||
                  tag === "Collective Care" ||
                  tag === "Hierarchical");

              return (
                <motion.li
                  key={tag}
                  layout={!reduceMotion}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                    emphasized
                      ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent shadow-[0_0_12px_rgba(110,82,196,0.25)]"
                      : "border-ffie-line bg-white/60 text-ffie-ink"
                  }`}
                >
                  {tag}
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ffie-muted">
            {copy.guidanceLabel}
          </p>
          <motion.p
            key={focusQuadrant}
            initial={reduceMotion ? false : { opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs leading-relaxed text-ffie-muted"
            style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 12 }}
          >
            {copy.guidanceTemplate(formatQuadrantLabel(focusQuadrant))}{" "}
            {guidance}
          </motion.p>
        </div>

        {draft.systemLogicScore != null && draft.powerOrgScore != null && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ffie-muted">
              {copy.coordinatesLabel}
            </p>
            <p className="mt-1 font-mono text-xs text-ffie-ink">
              x {draft.position.x.toFixed(2)} · y {draft.position.y.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
