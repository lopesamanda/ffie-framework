"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HiddenFunctionReveal } from "@/components/create/HiddenFunctionReveal";
import {
  PublishAnchoredMatrixPanel,
  PublishLiveMatrix,
} from "@/components/publish/PublishLiveMatrix";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import { buildFinalCardNarrative } from "@/lib/journey/future-card-copy";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { FUTURE_HORIZON_LABEL } from "@/lib/journey/future-horizon";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { raceEthnicityForDraft, type JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import { ensureVisualDirection } from "@/lib/journey/visual-directions";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import type { CardHand } from "@/lib/journey/types";
import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";

const FAN_TRANSFORMS = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[2deg]"];

function formatValueLabel(value: string): string {
  if (value === value.toLowerCase() && value.includes(" ")) return value;
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function DrawnCardTags({ hand }: { hand: CardHand }) {
  const cards: NarrativeCard[] = [
    hand.risk,
    hand.benefit,
    hand.trust,
    hand.barrier,
  ];

  return (
    <div className="relative mt-3 flex items-end pl-1">
      {cards.map((card, index) => {
        const style = CATEGORY_STYLES[card.category];
        return (
          <span
            key={card.id}
            className={`relative rounded-full border px-3 py-1 text-[10px] font-semibold shadow-[0_2px_3px_rgba(35,19,82,0.1)] ${FAN_TRANSFORMS[index] ?? ""}`}
            style={{
              borderColor: style.border,
              backgroundColor: style.bg,
              color: style.text,
              zIndex: index + 1,
              marginLeft: index === 0 ? 0 : -10,
            }}
          >
            {card.name}
          </span>
        );
      })}
    </div>
  );
}

/** Full-width published future card — Figma node 61-2670. */
export function PublishedFutureCard({
  draft,
  id,
}: {
  draft: JourneyDraft;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const copy = PUBLISH_FLOW.published;
  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);
  const quadrantAccent = QUADRANT_TEXT_COLORS[quadrant];
  const visualDirectionSrc = ensureVisualDirection(draft);
  const artifactName =
    draft.artifactName.trim() || draft.title.trim() || "Untitled artifact";
  const description = draft.publicPromise.trim();
  const narrativeBeats = buildFinalCardNarrative(draft);
  const personaNarrative =
    draft.narrative.trim() || narrativeBeats.join(" ");
  const artifactValues = resolveArtifactValues(draft).map(formatValueLabel);
  const roleLine = resolvedCharacterRole(draft.role, draft.roleCustom);
  const p = pronounsForSelection(draft.characterPronoun);
  const race = raceEthnicityForDraft(draft);
  const pronounLabel = draft.characterPronoun
    ? `${p.subject}/${p.object}`
    : null;
  const quote =
    draft.drawSynthesis.trim() ||
    draft.combinedTension.trim() ||
    draft.reflectionText.trim();

  const systemScore =
    draft.systemLogicScore ??
    Math.round(((draft.position.x + 1) / 2) * 100);
  const powerScore =
    draft.powerOrgScore ??
    Math.round(((draft.position.y + 1) / 2) * 100);

  const goal = draft.desire.trim() || "—";
  const weakness = draft.fear.trim() || "—";
  const makesPossible = draft.publicPromise.trim() || "—";
  const refuse =
    draft.hiddenFunctionExtremeValue.trim() ||
    artifactValues[0] ||
    "—";

  const personaMeta = [
    draft.characterName.trim() || "Someone",
    pronounLabel,
    draft.characterAge ? `${draft.characterAge} years old` : null,
    race || null,
  ]
    .filter(Boolean)
    .join(" · ");

  const roleMeta = [
    roleLine,
    draft.futureYear ? String(draft.futureYear) : FUTURE_HORIZON_LABEL,
  ]
    .filter(Boolean)
    .join(", ");

  const locationLine =
    draft.characterCity.trim() && draft.location.trim()
      ? `${draft.characterCity.trim()} → ${draft.location.trim()}`
      : draft.location.trim() || draft.characterCity.trim() || null;

  return (
    <motion.article
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-ffie-line/70 bg-white shadow-[0_6px_32px_rgba(35,19,82,0.08)]"
    >
      <div className="flex flex-col border-b border-ffie-line/70 sm:flex-row">
        {visualDirectionSrc && (
          <div className="relative h-44 w-full shrink-0 bg-[#eee9fd] sm:h-auto sm:w-[172px]">
            <Image
              src={visualDirectionSrc}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-6 py-5 sm:px-7">
          <h3 className="font-display text-2xl font-bold leading-tight text-ffie-ink">
            {artifactName}
          </h3>
          {description && (
            <p className="mt-2 text-sm italic leading-relaxed text-ffie-muted">
              {description}
            </p>
          )}
          <span
            className="mt-3 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{ color: quadrantAccent, backgroundColor: `${quadrantAccent}18` }}
          >
            {QUADRANT_MATRIX_LABELS[quadrant]}
          </span>
        </div>
      </div>

      <div className="grid border-b border-ffie-line/70 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="border-b border-ffie-line/70 p-5 lg:border-b-0 lg:border-r">
          <PublishLiveMatrix
            systemLogicScore={systemScore}
            powerOrgScore={powerScore}
            showSummary={false}
          />
        </div>
        <PublishAnchoredMatrixPanel
          systemLogicScore={systemScore}
          powerOrgScore={powerScore}
        />
      </div>

      <div className="border-b border-ffie-line/70 px-7 pb-6 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
          {copy.personEyebrow}
        </p>
        <div className="mt-3.5 flex gap-3.5">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-ffie-accent font-display text-base font-extrabold text-white">
            {(draft.characterName.trim()[0] || "?").toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ffie-ink">{personaMeta}</p>
            <p className="mt-1 text-[11px] text-ffie-muted/80">
              {roleMeta}
              {locationLine ? (
                <>
                  {" "}
                  · <span className="text-ffie-muted">{locationLine}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
        {personaNarrative && (
          <p className="mt-4 text-[13px] leading-relaxed text-ffie-ink/70">
            {personaNarrative}
          </p>
        )}
      </div>

      <div className="grid border-b border-ffie-line/70 sm:grid-cols-2">
        <div className="space-y-4 border-b border-ffie-line/70 px-6 py-5 sm:border-b-0 sm:border-r">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              {copy.goalLabel}
            </p>
            <p className="mt-1.5 text-[13px] text-ffie-ink/70">{goal}</p>
          </div>
          <div className="h-px bg-ffie-line/70" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              {copy.makesPossibleLabel}
            </p>
            <p className="mt-1.5 text-[13px] text-ffie-ink/70">
              {makesPossible}
            </p>
          </div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              {copy.weaknessLabel}
            </p>
            <p className="mt-1.5 text-[13px] text-ffie-ink/70">{weakness}</p>
          </div>
          <div className="h-px bg-ffie-line/70" />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              {copy.refuseLabel}
            </p>
            <p className="mt-1.5 text-[13px] text-ffie-ink/70">{refuse}</p>
          </div>
        </div>
      </div>

      {quote && (
        <div className="border-b border-ffie-line/70 bg-[#eee9fd]/40 px-7 py-7">
          <div className="mb-4 h-0.5 w-7 rounded-full bg-ffie-accent/55" />
          <p className="max-w-2xl font-display text-lg font-bold leading-snug text-ffie-ink">
            “{quote.replace(/^["“]|["”]$/g, "")}”
          </p>
          {draft.cardHand && (
            <>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
                {copy.cardsDrawnLabel}
              </p>
              <DrawnCardTags hand={draft.cardHand} />
            </>
          )}
        </div>
      )}

      {artifactValues.length > 0 && (
        <div className="border-b border-ffie-line/70 px-7 py-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
            {copy.valuesLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {artifactValues.map((value) => (
              <li
                key={value}
                className="rounded-full border border-[#dcd7f7] bg-[#f6f4ff] px-3 py-1 text-[11px] font-medium text-[#3a2278]"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <HiddenFunctionReveal draft={draft} />
    </motion.article>
  );
}
