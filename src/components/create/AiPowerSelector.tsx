"use client";

import { useMemo, useState } from "react";
import type { AiCapabilityCard } from "@/data/ai-capability-cards";
import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  AI_CAPABILITY_POWERS,
  groupCardsByPower,
  type AiCapabilityPowerId,
} from "@/lib/journey/ai-capability-clusters";
import {
  getVisibleCardsForArtifact,
  orderCapabilityCardsForArtifact,
} from "@/lib/journey/artifact-capability-priorities";
import { PowerGlyph } from "@/components/create/design/PowerGlyph";
import { SettleButton } from "@/components/motion/SettleButton";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardSectionLabel,
} from "@/lib/card-layout";

const FIELD =
  "w-full resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type AiPowerSelectorProps = {
  values: string[];
  artifactType: ArtifactTypeId | "";
  artifactName: string;
  selectedPower: AiCapabilityPowerId | "";
  selectedCapabilityId: string;
  dayToDayDescription: string;
  artifactGoalPitch: string;
  onSelectPower?: (powerId: AiCapabilityPowerId) => void;
  onSelectCapability: (capabilityId: string, powerId: AiCapabilityPowerId) => void;
  onDayToDayChange: (value: string) => void;
  onGoalPitchChange: (value: string) => void;
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function findPowerForCard(cardId: string): AiCapabilityPowerId {
  const match = AI_CAPABILITY_POWERS.find((power) =>
    power.cardIds.includes(cardId),
  );
  return match?.id ?? "power-to-know";
}

export function AiPowerSelector({
  artifactType,
  artifactName,
  selectedCapabilityId,
  dayToDayDescription,
  artifactGoalPitch,
  onSelectCapability,
  onDayToDayChange,
  onGoalPitchChange,
}: AiPowerSelectorProps) {
  const [showAll, setShowAll] = useState(false);
  const displayName = artifactName.trim() || "this artifact";

  const prioritizedIds = useMemo(() => {
    if (!artifactType) return new Set<string>();
    const { prioritized } = orderCapabilityCardsForArtifact(artifactType);
    return new Set(prioritized.map((card) => card.id));
  }, [artifactType]);

  const powerGroups = useMemo(() => {
    const cards = artifactType
      ? getVisibleCardsForArtifact(artifactType)
      : [];
    return groupCardsByPower(cards);
  }, [artifactType]);

  const visibleCardIds = useMemo(() => {
    if (showAll || !artifactType) return null;
    return prioritizedIds;
  }, [showAll, artifactType, prioritizedIds]);

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-ffie-ink">
        What power does AI hold through this artifact? Consider the values
        shaping this future.
      </p>

      <div className="space-y-6">
        {powerGroups.map((group) => {
          const cards = group.cards.filter(
            (card) => !visibleCardIds || visibleCardIds.has(card.id),
          );
          if (cards.length === 0) return null;

          return (
            <div key={group.id + group.label} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-ffie-accent-soft text-ffie-accent">
                  <PowerGlyph powerId={group.id} size={20} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ffie-ink">
                  {group.label}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((card) => (
                  <SelectableCapabilityCard
                    key={card.id}
                    card={card}
                    highlighted={prioritizedIds.has(card.id)}
                    selected={selectedCapabilityId === card.id}
                    dayToDayDescription={
                      selectedCapabilityId === card.id ? dayToDayDescription : ""
                    }
                    artifactGoalPitch={
                      selectedCapabilityId === card.id ? artifactGoalPitch : ""
                    }
                    artifactName={displayName}
                    onSelect={() =>
                      onSelectCapability(card.id, findPowerForCard(card.id))
                    }
                    onDayToDayChange={onDayToDayChange}
                    onGoalPitchChange={onGoalPitchChange}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {artifactType && prioritizedIds.size > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="text-xs font-medium text-ffie-accent transition hover:underline"
        >
          {showAll ? "Show suggested only ↑" : "Show all capabilities ↓"}
        </button>
      )}
    </div>
  );
}

function SelectableCapabilityCard({
  card,
  highlighted,
  selected,
  dayToDayDescription,
  artifactGoalPitch,
  artifactName,
  onSelect,
  onDayToDayChange,
  onGoalPitchChange,
}: {
  card: AiCapabilityCard;
  highlighted: boolean;
  selected: boolean;
  dayToDayDescription: string;
  artifactGoalPitch: string;
  artifactName: string;
  onSelect: () => void;
  onDayToDayChange: (value: string) => void;
  onGoalPitchChange: (value: string) => void;
}) {
  return (
    <div
      className={`rounded-xl border-2 bg-ffie-bg/40 transition ${
        selected
          ? "border-ffie-accent bg-[#f6f4ff] shadow-[0_0_0_3px_rgba(110,82,196,0.18)]"
          : highlighted
            ? "border-ffie-accent/35 ring-1 ring-ffie-accent/20"
            : "border-ffie-line/80 hover:border-ffie-accent/35"
      }`}
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <SettleButton
        onClick={onSelect}
        aria-pressed={selected}
        className="w-full px-4 py-3 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={`${ffieCardCategory} text-ffie-muted`}>Capability</p>
            <h4 className={`mt-1 font-display text-sm font-bold leading-snug text-ffie-ink ${FFIE_CARD_TEXT}`}>
              {card.hook}
            </h4>
            <p className={`mt-0.5 text-xs text-ffie-muted ${FFIE_CARD_TEXT}`}>
              {card.name}
            </p>
          </div>
          {selected && (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ffie-accent text-white">
              <CheckIcon />
            </span>
          )}
        </div>

        {selected && (
          <p
            className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
          >
            {card.description}
          </p>
        )}

        {!selected && (
          <p
            className={`mt-2 line-clamp-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
          >
            {card.description}
          </p>
        )}
      </SettleButton>

      {selected && (
        <div className="border-t border-ffie-accent/25 px-4 pb-4 pt-3">
          <div className="mt-1 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ffie-line bg-ffie-accent-soft/60 px-2.5 py-0.5 text-[10px] font-semibold text-ffie-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <p className={`${ffieCardCategory} text-ffie-muted`}>
              Use these to shape your answer
            </p>
            <ul className="space-y-1.5">
              {card.artifactGuidingQuestions.map((question) => (
                <li
                  key={question}
                  className={`text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
                >
                  · {question}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 rounded-lg border border-ffie-line/70 bg-white/70 px-3 py-3">
            <p className={ffieCardSectionLabel}>Example</p>
            <p
              className={`mt-1.5 text-sm italic leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
            >
              {card.examples[0]}
            </p>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm leading-relaxed text-ffie-ink">
              What does {artifactName} do, day to day?
            </span>
            <textarea
              value={dayToDayDescription}
              onChange={(event) => onDayToDayChange(event.target.value)}
              rows={4}
              className={FIELD}
              placeholder="what it does day to day"
            />
          </label>

          <label className="mt-4 block space-y-2">
            <span className="text-sm leading-relaxed text-ffie-muted">
              Optional: If {artifactName} had a pitch line…
            </span>
            <textarea
              value={artifactGoalPitch}
              onChange={(event) => onGoalPitchChange(event.target.value)}
              rows={2}
              className={FIELD}
              placeholder="a one-line pitch (optional)"
            />
          </label>
        </div>
      )}
    </div>
  );
}
