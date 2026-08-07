"use client";

import Image from "next/image";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import {
  FFIE_CARD_TEXT,
  ffieCardSectionLabel,
} from "@/lib/card-layout";
import {
  resolveCapabilityDescription,
  resolveCapabilityName,
} from "@/lib/journey/future-commons-narrative";
import { buildOracleSynthesis } from "@/lib/journey/oracle-synthesis";
import { ensureVisualDirection } from "@/lib/journey/visual-directions";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { HiddenFunctionReveal } from "@/components/create/HiddenFunctionReveal";
import type { JourneyDraft } from "@/lib/journey/types";
import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";
import { quadrantFromPosition } from "@/lib/journey/types";
import { MiniQuadrantIcon } from "@/components/create/design/MiniQuadrantIcon";

function formatValueLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Compact artifact summary on the Published screen — includes hidden-function reveal. */
export function PublishedFutureCard({
  draft,
  id,
}: {
  draft: JourneyDraft;
  id?: string;
}) {
  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);
  const quadrantWash = QUADRANT_COLORS[quadrant];
  const quadrantAccent = QUADRANT_TEXT_COLORS[quadrant];
  const visualDirectionSrc = ensureVisualDirection(draft);
  const artifactName = draft.artifactName.trim();
  const capabilityName = resolveCapabilityName(draft.selectedAiCapability);
  const capabilityDescription = resolveCapabilityDescription(
    draft.selectedAiCapability,
  );
  const synthesisLine =
    draft.drawSynthesis ||
    (draft.cardHand ? buildOracleSynthesis(draft.cardHand) : "");
  const artifactValues = resolveArtifactValues(draft).map(formatValueLabel);
  const roleLine = resolvedCharacterRole(draft.role, draft.roleCustom);

  return (
    <article
      id={id}
      className="overflow-hidden rounded-[20px] border-2 bg-ffie-surface/95 p-6 shadow-[0_16px_48px_rgba(35,19,82,0.14)] md:p-7"
      style={{
        borderColor: `color-mix(in srgb, ${quadrantAccent} 35%, #e8e4f0)`,
      }}
    >
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

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        {visualDirectionSrc && (
          <div className="mx-auto w-full max-w-[148px] shrink-0 overflow-hidden rounded-xl border border-ffie-line/80 bg-ffie-bg/30 sm:mx-0">
            <Image
              src={visualDirectionSrc}
              alt=""
              width={320}
              height={240}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3
            className={`font-display text-xl font-bold leading-tight text-ffie-ink md:text-2xl ${FFIE_CARD_TEXT}`}
          >
            {artifactName || "Untitled artifact"}
          </h3>
          {(capabilityName || capabilityDescription) && (
            <p className={`mt-2 text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {capabilityName && (
                <span className="font-semibold text-ffie-ink">{capabilityName}</span>
              )}
              {capabilityDescription && (
                <span className="mt-1 block">{capabilityDescription}</span>
              )}
            </p>
          )}
          {roleLine && (
            <p className="mt-2 text-xs text-ffie-muted">
              Imagined for {draft.characterName.trim() || "someone"} · {roleLine}
            </p>
          )}
        </div>
      </div>

      {synthesisLine && (
        <blockquote
          className="mt-6 rounded-2xl border px-5 py-4 text-base font-medium italic leading-relaxed"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 55%, white)`,
            color: quadrantAccent,
          }}
        >
          {synthesisLine}
        </blockquote>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-2xl border px-4 py-3.5"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 22%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 45%, white)`,
          }}
        >
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>Goal</p>
          <p className={`mt-2 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {draft.publicPromise || "—"}
          </p>
        </div>
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
    </article>
  );
}
