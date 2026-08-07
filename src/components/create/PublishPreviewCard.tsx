"use client";

import Image from "next/image";
import { CardReferenceTag } from "@/components/create/CardReferenceTag";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
import { MiniQuadrantIcon } from "@/components/create/design/MiniQuadrantIcon";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardSectionLabel,
} from "@/lib/card-layout";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import {
  resolveCapabilityDescription,
  resolveCapabilityName,
} from "@/lib/journey/future-commons-narrative";
import { buildOracleSynthesis, buildOracleSynthesisTensions } from "@/lib/journey/oracle-synthesis";
import { ARTIFACT_TYPE_OPTIONS } from "@/lib/journey/character-options";
import { ensureVisualDirection } from "@/lib/journey/visual-directions";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";
import type { CardHand } from "@/lib/journey/types";

const FAN_TRANSFORMS = [
  "rotate(-6deg) translateY(4px)",
  "rotate(-2deg) translateY(0px)",
  "rotate(2deg) translateY(2px)",
  "rotate(5deg) translateY(5px)",
  "rotate(8deg) translateY(3px)",
] as const;

function formatValueLabel(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function EditPencilIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="size-4 text-ffie-muted/60"
    >
      <path
        d="M12.3 3.7l4 4L7.5 16.5H3.5v-4L12.3 3.7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10.8 5.2l4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className={`${ffieCardSectionLabel} text-ffie-muted`}>{label}</p>
      <EditPencilIcon />
    </div>
  );
}

function DrawnCardTags({ hand }: { hand: CardHand }) {
  const cards: NarrativeCard[] = [
    hand.benefit,
    hand.risk,
    hand.trust,
    hand.barrier,
  ];

  return (
    <div className="relative mt-4 flex items-end pl-1">
      {cards.map((card, index) => {
        const style = CATEGORY_STYLES[card.category];
        return (
          <span
            key={card.id}
            className="relative rounded-lg border px-2.5 py-1.5 text-[11px] font-medium shadow-[0_2px_6px_rgba(35,19,82,0.08)]"
            style={{
              borderColor: style.border,
              backgroundColor: style.bg,
              color: style.text,
              zIndex: index + 1,
              marginLeft: index === 0 ? 0 : -10,
              transform:
                FAN_TRANSFORMS[index] ?? FAN_TRANSFORMS[FAN_TRANSFORMS.length - 1],
            }}
          >
            {card.name}
          </span>
        );
      })}
    </div>
  );
}

/** Screen 1 — full-fidelity publish preview card (Figma Preview frame). */
export function PublishPreviewCard({
  draft,
  id,
  personaLine,
}: {
  draft: JourneyDraft;
  id?: string;
  personaLine?: string;
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
  const synthesisTensionsLine =
    draft.drawSynthesisTensions ||
    (draft.cardHand ? buildOracleSynthesisTensions(draft.cardHand) : "");
  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction;
  const artifactValues = resolveArtifactValues(draft).map(formatValueLabel);
  const artifactTypeLabel =
    ARTIFACT_TYPE_OPTIONS.find((option) => option.id === draft.artifactType)
      ?.label ?? "Artifact";

  return (
    <article
      id={id}
      className="overflow-hidden rounded-[20px] border-2 bg-ffie-surface/95 p-6 shadow-[0_16px_48px_rgba(35,19,82,0.14)] md:p-7"
      style={{
        borderColor: `color-mix(in srgb, ${quadrantAccent} 35%, #e8e4f0)`,
      }}
    >
      {personaLine && (
        <p className="mb-4 text-xs leading-relaxed text-ffie-muted">
          {personaLine}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
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
        <span className="rounded-md border border-ffie-line bg-ffie-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ffie-ink/70">
          {artifactTypeLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        {visualDirectionSrc && (
          <figure className="mx-auto w-full max-w-[148px] shrink-0 sm:mx-0">
            <div
              className="overflow-hidden rounded-xl border bg-ffie-bg/30"
              style={{
                borderColor: `color-mix(in srgb, ${quadrantAccent} 20%, transparent)`,
              }}
            >
              <Image
                src={visualDirectionSrc}
                alt=""
                width={320}
                height={240}
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-ffie-muted/35">
              Visual direction
            </figcaption>
          </figure>
        )}

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className={`font-display text-xl font-bold leading-tight text-ffie-ink md:text-2xl ${FFIE_CARD_TEXT}`}
              >
                {artifactName || "Untitled artifact"}
              </h3>
              {(capabilityName || capabilityDescription) && (
                <p className={`mt-2 text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
                  {capabilityName && (
                    <span className="font-semibold text-ffie-ink">
                      {capabilityName}
                    </span>
                  )}
                  {capabilityDescription && (
                    <span className="mt-1 block">{capabilityDescription}</span>
                  )}
                </p>
              )}
            </div>
            <EditPencilIcon />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-2xl border px-4 py-3.5"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 22%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 45%, white)`,
          }}
        >
          <SectionHeader label="Goal" />
          <p className={`mt-2 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {draft.publicPromise || "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[#f0d4cc] bg-[#fdf1ee]/90 px-4 py-3.5">
          <SectionHeader label="Weakness" />
          <p className={`mt-2 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            <HighlightedWeaknessText
              text={hiddenFunctionDisplay || "—"}
              extremeValue={draft.hiddenFunctionExtremeValue}
              highlightedValue={null}
            />
          </p>
        </div>
      </div>

      {synthesisLine && (
        <blockquote
          className="mt-6 rounded-2xl border px-5 py-5 md:px-6"
          style={{
            borderColor: `color-mix(in srgb, ${quadrantAccent} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${quadrantWash} 55%, white)`,
          }}
        >
          <SectionHeader label="Synthesis" />
          <p
            className={`mt-3 text-base font-medium italic leading-relaxed ${FFIE_CARD_TEXT}`}
            style={{ color: quadrantAccent }}
          >
            {synthesisLine}
          </p>
          {synthesisTensionsLine && (
            <p className={`mt-2 text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {synthesisTensionsLine}
            </p>
          )}
          {draft.cardHand && <DrawnCardTags hand={draft.cardHand} />}
        </blockquote>
      )}

      {artifactValues.length > 0 && (
        <div className="mt-6 rounded-2xl border border-ffie-line/60 bg-ffie-surface/80 px-4 py-4">
          <SectionHeader label="Values shaping this artifact" />
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

      {draft.cardHand && (
        <div className="sr-only">
          <CardReferenceTag card={draft.cardHand.benefit} compact />
        </div>
      )}
    </article>
  );
}
