"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HiddenFunctionReveal } from "@/components/create/HiddenFunctionReveal";
import { LivePositionMiniMatrix } from "@/components/create/LivePositionMiniMatrix";
import { MiniQuadrantIcon } from "@/components/create/design/MiniQuadrantIcon";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import {
  FFIE_CARD_TEXT,
  ffieCardSectionLabel,
} from "@/lib/card-layout";
import { buildFinalCardNarrative } from "@/lib/journey/future-card-copy";
import {
  resolveCapabilityDescription,
  resolveCapabilityName,
} from "@/lib/journey/future-commons-narrative";
import { FUTURE_HORIZON_LABEL } from "@/lib/journey/future-horizon";
import { buildOracleSynthesis } from "@/lib/journey/oracle-synthesis";
import { ensureVisualDirection } from "@/lib/journey/visual-directions";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import type { JourneyDraft } from "@/lib/journey/types";
import {
  formatQuadrantLabel,
  quadrantFromPosition,
} from "@/lib/journey/types";
import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";

function formatValueLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function InfoField({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-ffie-line/60 bg-white/50 px-3 py-2.5 backdrop-blur-sm">
      <dt className={`${ffieCardSectionLabel} text-ffie-muted`}>{label}</dt>
      <dd
        className="mt-1 text-sm font-medium leading-snug text-ffie-ink"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}

/** Full-width published future card — Figma node 61-2345. */
export function PublishedFutureCard({
  draft,
  id,
}: {
  draft: JourneyDraft;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);
  const quadrantWash = QUADRANT_COLORS[quadrant];
  const quadrantAccent = QUADRANT_TEXT_COLORS[quadrant];
  const visualDirectionSrc = ensureVisualDirection(draft);
  const artifactName = draft.artifactName.trim() || draft.title.trim() || "Untitled artifact";
  const capabilityName = resolveCapabilityName(draft.selectedAiCapability);
  const capabilityDescription = resolveCapabilityDescription(
    draft.selectedAiCapability,
  );
  const synthesisLine =
    draft.drawSynthesis ||
    (draft.cardHand ? buildOracleSynthesis(draft.cardHand) : "");
  const narrativeBeats = buildFinalCardNarrative(draft);
  const speculativeNarrative =
    draft.narrative.trim() ||
    [...narrativeBeats, synthesisLine].filter(Boolean).join(" ");
  const artifactValues = resolveArtifactValues(draft).map(formatValueLabel);
  const roleLine = resolvedCharacterRole(draft.role, draft.roleCustom);
  const sectorLabel = resolvedPersonaSector(
    draft.personaSector,
    draft.personaSectorCustom,
  );
  const territoryLine = [
    draft.location.trim(),
    sectorLabel || null,
    draft.characterName.trim() || null,
    roleLine || null,
  ]
    .filter(Boolean)
    .join(" · ");

  const systemPct =
    draft.systemLogicScore != null
      ? Math.round(draft.systemLogicScore)
      : Math.round(((draft.position.x + 1) / 2) * 100);
  const powerPct =
    draft.powerOrgScore != null
      ? Math.round(draft.powerOrgScore)
      : Math.round(((draft.position.y + 1) / 2) * 100);

  return (
    <motion.article
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full overflow-hidden rounded-[24px] border border-ffie-line/70 bg-ffie-surface/75 p-6 shadow-[0_20px_60px_rgba(35,19,82,0.12),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md md:p-8"
      style={{
        borderColor: `color-mix(in srgb, ${quadrantAccent} 28%, #e8e4f0)`,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ffie-line/50 pb-5">
        <div className="min-w-0 flex-1">
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>Title</p>
          <h3
            className={`mt-1 font-display text-2xl font-bold leading-tight text-ffie-ink md:text-[1.85rem] ${FFIE_CARD_TEXT}`}
          >
            {artifactName}
          </h3>
          {(capabilityName || capabilityDescription) && (
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {capabilityName && (
                <span className="font-semibold text-ffie-ink">{capabilityName}</span>
              )}
              {capabilityDescription && (
                <span className="mt-1 block">{capabilityDescription}</span>
              )}
            </p>
          )}
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
          style={{
            backgroundColor: quadrantWash,
            color: quadrantAccent,
          }}
        >
          <MiniQuadrantIcon quadrant={quadrant} className="size-3.5" />
          {QUADRANT_MATRIX_LABELS[quadrant]}
        </span>
      </div>

      {territoryLine && (
        <div className="mt-5">
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>
            Territory / context
          </p>
          <p className={`mt-1.5 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {territoryLine}
            {draft.futureYear ? ` · ${FUTURE_HORIZON_LABEL}` : ""}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
        <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <InfoField
            label="Matrix coordinates"
            value={`x ${draft.position.x.toFixed(2)} · y ${draft.position.y.toFixed(2)}`}
            accent={quadrantAccent}
          />
          <InfoField
            label="Quadrant"
            value={formatQuadrantLabel(quadrant)}
            accent={quadrantAccent}
          />
          <InfoField
            label="System logic"
            value={`${systemPct}% emancipatory`}
          />
          <InfoField
            label="Power organization"
            value={`${powerPct}% collective`}
          />
        </dl>
        <LivePositionMiniMatrix
          systemLogicScore={
            draft.systemLogicScore ??
            ((draft.position.x + 1) / 2) * 100
          }
          powerOrgScore={
            draft.powerOrgScore ??
            ((draft.position.y + 1) / 2) * 100
          }
          className="mx-auto lg:mx-0"
        />
      </div>

      {speculativeNarrative && (
        <div
          className="mt-6 rounded-2xl border px-5 py-5 md:px-6"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 24%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 42%, white)`,
          }}
        >
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>
            Speculative narrative
          </p>
          <p className={`mt-3 text-sm leading-relaxed text-ffie-ink md:text-[0.95rem] md:leading-7 ${FFIE_CARD_TEXT}`}>
            {speculativeNarrative}
          </p>
          {synthesisLine && synthesisLine !== speculativeNarrative && (
            <p
              className={`mt-4 border-t border-ffie-line/40 pt-4 text-sm font-medium italic leading-relaxed ${FFIE_CARD_TEXT}`}
              style={{ color: quadrantAccent }}
            >
              {synthesisLine}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {visualDirectionSrc && (
          <div className="overflow-hidden rounded-2xl border border-ffie-line/70 bg-ffie-bg/40">
            <Image
              src={visualDirectionSrc}
              alt=""
              width={640}
              height={360}
              className="h-44 w-full object-cover md:h-52"
            />
          </div>
        )}
        <div
          className="rounded-2xl border px-4 py-4"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 22%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 38%, white)`,
          }}
        >
          <p className={`${ffieCardSectionLabel} text-ffie-accent`}>Goal</p>
          <p className={`mt-2 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {draft.publicPromise || "—"}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <HiddenFunctionReveal draft={draft} />
      </div>

      {artifactValues.length > 0 && (
        <div className="mt-6 rounded-2xl border border-ffie-line/60 bg-ffie-surface/80 px-4 py-4">
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>
            Values shaping this artifact
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {artifactValues.map((value) => (
              <span
                key={value}
                className="rounded-full border border-ffie-line bg-ffie-bg px-2.5 py-0.5 text-xs text-ffie-ink"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
