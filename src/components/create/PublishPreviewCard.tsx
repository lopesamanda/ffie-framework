"use client";

import Image from "next/image";
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
import {
  buildOracleSynthesis,
  buildOracleSynthesisTensions,
} from "@/lib/journey/oracle-synthesis";
import { buildFinalCardNarrative } from "@/lib/journey/future-card-copy";
import { ensureVisualDirection } from "@/lib/journey/visual-directions";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import { FUTURE_HORIZON_LABEL } from "@/lib/journey/future-horizon";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
import type { JourneyDraft } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";
import type { NarrativeCard } from "@/data/narrative-cards";

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

function PersonaAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      aria-hidden
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ffie-line bg-ffie-accent-soft font-display text-sm font-bold text-ffie-accent"
    >
      {initials || "?"}
    </span>
  );
}

function PersonaStoryCard({ draft }: { draft: JourneyDraft }) {
  const personaName = draft.characterName.trim() || "Someone";
  const p = pronounsForSelection(draft.characterPronoun);
  const roleLine = resolvedCharacterRole(draft.role, draft.roleCustom);
  const sectorLabel = resolvedPersonaSector(
    draft.personaSector,
    draft.personaSectorCustom,
  );
  const backgroundLine = [
    draft.characterAge ? `${draft.characterAge}` : null,
    p.subjectCap,
    sectorLabel || null,
  ]
    .filter(Boolean)
    .join(" · ");
  const metaLine = [roleLine, FUTURE_HORIZON_LABEL].filter(Boolean).join(" · ");
  const originLine = draft.location.trim()
    ? `${draft.characterCity?.trim() || "Origin"} → ${draft.location.trim()}`
    : draft.characterCity?.trim() || "";
  const narrativeBeats = buildFinalCardNarrative(draft);

  return (
    <div className="mt-4 rounded-xl border border-ffie-line/70 bg-ffie-surface/90 p-4">
      <div className="flex gap-3">
        <PersonaAvatar name={personaName} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-ffie-ink">
            {personaName}
          </p>
          {backgroundLine && (
            <p className="mt-0.5 text-xs text-ffie-muted">{backgroundLine}</p>
          )}
          {metaLine && (
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.06em] text-ffie-muted">
              {metaLine}
            </p>
          )}
          {originLine && (
            <p className="mt-1 text-xs text-ffie-muted">{originLine}</p>
          )}
        </div>
      </div>
      {narrativeBeats.length > 0 && (
        <div className="mt-4 border-t border-ffie-line/50 pt-3">
          <p className={`${ffieCardSectionLabel} text-ffie-muted`}>
            Storytelling built in Embody
          </p>
          <div className="mt-2 space-y-2">
            {narrativeBeats.map((beat) => (
              <p
                key={beat}
                className={`text-sm leading-relaxed text-ffie-ink/90 ${FFIE_CARD_TEXT}`}
              >
                {beat}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Screen 1 — full-width Preview card (Figma node 57-1566). */
export function PublishPreviewCard({
  draft,
  id,
}: {
  draft: JourneyDraft;
  id?: string;
}) {
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

  return (
    <article
      id={id}
      className="w-full overflow-hidden rounded-[20px] border border-ffie-line bg-ffie-surface/95 p-6 shadow-[0_16px_48px_rgba(35,19,82,0.12)] md:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {visualDirectionSrc && (
          <div className="mx-auto w-full max-w-[180px] shrink-0 overflow-hidden rounded-xl border border-ffie-line/80 bg-ffie-bg/30 lg:mx-0 lg:max-w-[200px]">
            <Image
              src={visualDirectionSrc}
              alt=""
              width={400}
              height={300}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3
            className={`font-display text-2xl font-bold leading-tight text-ffie-ink md:text-[1.75rem] ${FFIE_CARD_TEXT}`}
          >
            {artifactName || "Untitled artifact"}
          </h3>
          {(capabilityName || capabilityDescription) && (
            <p className={`mt-3 text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {capabilityName && (
                <span className="font-semibold text-ffie-ink">{capabilityName}</span>
              )}
              {capabilityDescription && (
                <span className="mt-1.5 block">{capabilityDescription}</span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-ffie-line/70 bg-[#f6f4ff]/70 px-4 py-3.5">
          <p className={`${ffieCardSectionLabel} text-ffie-accent`}>Goal</p>
          <p className={`mt-2 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {draft.publicPromise || "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[#f0d4cc] bg-[#fdf1ee]/90 px-4 py-3.5">
          <p className={`${ffieCardSectionLabel} text-[#c8472a]`}>Weakness</p>
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
        <blockquote className="mt-8 rounded-2xl border border-ffie-line/70 bg-ffie-bg/50 px-5 py-5 md:px-6">
          <p
            className={`text-base font-medium italic leading-relaxed text-ffie-accent ${FFIE_CARD_TEXT}`}
          >
            {synthesisLine}
          </p>
          {synthesisTensionsLine && (
            <p className={`mt-2 text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {synthesisTensionsLine}
            </p>
          )}
          <PersonaStoryCard draft={draft} />
          {draft.cardHand && <DrawnCardTags hand={draft.cardHand} />}
        </blockquote>
      )}

      {!synthesisLine && <PersonaStoryCard draft={draft} />}

      {artifactValues.length > 0 && (
        <div className="mt-8 rounded-2xl border border-ffie-line/60 bg-ffie-surface/80 px-4 py-4">
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
