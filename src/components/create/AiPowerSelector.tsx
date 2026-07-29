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
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardSectionLabel,
} from "@/lib/card-layout";

const FIELD =
  "w-full min-w-0 resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

const REFLECTION_PANEL =
  "rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft/35 px-4 py-4";

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

function findPowerForCard(cardId: string): AiCapabilityPowerId {
  const match = AI_CAPABILITY_POWERS.find((power) =>
    power.cardIds.includes(cardId),
  );
  return match?.id ?? "power-to-know";
}

function findCardById(
  cardId: string,
  groups: ReturnType<typeof groupCardsByPower>,
): AiCapabilityCard | null {
  for (const group of groups) {
    const match = group.cards.find((card) => card.id === cardId);
    if (match) return match;
  }
  return null;
}

function CapabilityClusterCard({
  card,
  highlighted,
  pinned,
  expanded,
  onToggleExpand,
  onSelect,
}: {
  card: AiCapabilityCard;
  highlighted: boolean;
  pinned: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
}) {
  return (
    <div
      className={`rounded-xl border-2 bg-ffie-bg/40 transition ${
        pinned
          ? "border-ffie-accent/50 opacity-60"
          : expanded
            ? "border-ffie-accent bg-[#f6f4ff] shadow-[0_0_0_3px_rgba(110,82,196,0.12)]"
            : highlighted
              ? "border-ffie-accent/35 ring-1 ring-ffie-accent/20 hover:border-ffie-accent/50"
              : "border-ffie-line/80 hover:border-ffie-accent/35"
      }`}
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <button
        type="button"
        onClick={onToggleExpand}
        aria-expanded={expanded}
        className="w-full px-4 py-3 text-left"
      >
        <p className={`${ffieCardCategory} text-ffie-muted`}>Capability</p>
        <h4
          className={`mt-1 font-display text-sm font-bold leading-snug text-ffie-ink ${FFIE_CARD_TEXT}`}
        >
          {card.hook}
        </h4>
        <p className={`mt-0.5 text-xs text-ffie-muted ${FFIE_CARD_TEXT}`}>
          {card.name}
        </p>
        {!expanded && card.tags[0] && (
          <span className="mt-2 inline-block rounded-full border border-ffie-line bg-ffie-accent-soft/60 px-2 py-0.5 text-[10px] font-semibold text-ffie-ink">
            {card.tags[0]}
          </span>
        )}
      </button>

      {expanded && (
        <div className="border-t border-ffie-accent/25 px-4 pb-4 pt-3">
          <p
            className={`${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
          >
            {card.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
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

          <button
            type="button"
            onClick={onSelect}
            className="mt-4 w-full rounded-lg bg-ffie-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {pinned ? "Selected" : "Select this capability"}
          </button>
        </div>
      )}
    </div>
  );
}

export function AiPowerSelector({
  artifactType,
  artifactName,
  selectedCapabilityId,
  dayToDayDescription,
  onSelectCapability,
  onDayToDayChange,
}: AiPowerSelectorProps) {
  const [openPower, setOpenPower] = useState<AiCapabilityPowerId | null>(() =>
    selectedCapabilityId ? findPowerForCard(selectedCapabilityId) : null,
  );
  const [expandedCardId, setExpandedCardId] = useState<string | null>(
    selectedCapabilityId || null,
  );
  const [showAll, setShowAll] = useState(false);
  const displayName = artifactName.trim() || "this artifact";

  const prioritizedIds = useMemo(() => {
    if (!artifactType) return new Set<string>();
    const { prioritized } = orderCapabilityCardsForArtifact(artifactType);
    return new Set(prioritized.map((card) => card.id));
  }, [artifactType]);

  const powerGroups = useMemo(() => {
    const cards = artifactType ? getVisibleCardsForArtifact(artifactType) : [];
    return groupCardsByPower(cards);
  }, [artifactType]);

  const visibleCardIds = useMemo(() => {
    if (showAll || !artifactType) return null;
    return prioritizedIds;
  }, [showAll, artifactType, prioritizedIds]);

  const selectedCard = selectedCapabilityId
    ? findCardById(selectedCapabilityId, powerGroups)
    : null;

  const handlePowerTagClick = (powerId: AiCapabilityPowerId) => {
    setOpenPower((current) => (current === powerId ? null : powerId));
  };

  const handleSelectCapability = (card: AiCapabilityCard) => {
    const powerId = findPowerForCard(card.id);
    setOpenPower(powerId);
    setExpandedCardId(card.id);
    onSelectCapability(card.id, powerId);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-ffie-ink">
        What power does AI hold through this artifact? Consider the values
        shaping this future.
      </p>

      <div className="flex flex-wrap gap-2">
        {powerGroups.map((group) => {
          const visibleCount = group.cards.filter(
            (card) => !visibleCardIds || visibleCardIds.has(card.id),
          ).length;
          if (visibleCount === 0) return null;

          const isOpen = openPower === group.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => handlePowerTagClick(group.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isOpen
                  ? "border-ffie-accent bg-ffie-accent text-white"
                  : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/40"
              }`}
            >
              <PowerGlyph powerId={group.id} size={14} />
              {group.label}
            </button>
          );
        })}
      </div>

      {openPower && (
        <div className="space-y-4">
          {powerGroups.map((group) => {
            if (openPower !== group.id) return null;

            const cards = group.cards.filter(
              (card) => !visibleCardIds || visibleCardIds.has(card.id),
            );
            if (cards.length === 0) return null;

            return (
              <div key={group.id} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  {cards.map((card) => (
                    <CapabilityClusterCard
                      key={card.id}
                      card={card}
                      highlighted={prioritizedIds.has(card.id)}
                      pinned={selectedCapabilityId === card.id}
                      expanded={expandedCardId === card.id}
                      onToggleExpand={() =>
                        setExpandedCardId((current) =>
                          current === card.id ? null : card.id,
                        )
                      }
                      onSelect={() => handleSelectCapability(card)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

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
      )}

      {selectedCard && (
        <div className="grid gap-6 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-xl border border-ffie-line bg-white px-4 py-3 shadow-[0_2px_8px_rgba(35,19,82,0.06)]">
            <p className={`${ffieCardCategory} text-ffie-muted`}>
              Selected capability
            </p>
            <h4
              className={`mt-1 font-display text-sm font-bold leading-snug text-ffie-ink ${FFIE_CARD_TEXT}`}
            >
              {selectedCard.hook}
            </h4>
            <p
              className={`mt-2 text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}
            >
              {selectedCard.description}
            </p>
          </div>

          <div className={`w-full min-w-0 ${REFLECTION_PANEL}`}>
            <label className="block space-y-2">
              <span className="text-sm leading-relaxed text-ffie-ink">
                What does {displayName} do, day to day?
              </span>
              <textarea
                value={dayToDayDescription}
                onChange={(event) => onDayToDayChange(event.target.value)}
                rows={5}
                className={FIELD}
                placeholder="what it does day to day"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
