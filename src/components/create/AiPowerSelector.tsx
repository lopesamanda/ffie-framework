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
import { FFIE_CARD_TEXT, ffieCardCategory } from "@/lib/card-layout";

const FIELD =
  "w-full resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

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
  const [openPower, setOpenPower] = useState<AiCapabilityPowerId | null>(() =>
    selectedCapabilityId ? findPowerForCard(selectedCapabilityId) : null,
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
          const isSelectedPower =
            selectedCard && findPowerForCard(selectedCard.id) === group.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => handlePowerTagClick(group.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isOpen || isSelectedPower
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
        <div className="space-y-4">
          {powerGroups.map((group) => {
            if (openPower !== group.id) return null;

            const cards = group.cards.filter(
              (card) => !visibleCardIds || visibleCardIds.has(card.id),
            );
            if (cards.length === 0) return null;

            return (
              <div key={group.id} className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ffie-muted">
                  {group.label}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {cards.map((card) => {
                    const selected = selectedCapabilityId === card.id;
                    return (
                      <SettleButton
                        key={card.id}
                        onClick={() => handleSelectCapability(card)}
                        aria-pressed={selected}
                        className={`rounded-xl border-2 px-4 py-3 text-left transition ${
                          selected
                            ? "border-ffie-accent bg-[#f6f4ff] shadow-[0_0_0_3px_rgba(110,82,196,0.18)]"
                            : prioritizedIds.has(card.id)
                              ? "border-ffie-accent/35 ring-1 ring-ffie-accent/20 hover:border-ffie-accent/50"
                              : "border-ffie-line/80 hover:border-ffie-accent/35"
                        }`}
                        style={{ borderTopWidth: 3, borderTopColor: card.color }}
                      >
                        <p className={`${ffieCardCategory} text-ffie-muted`}>
                          Capability
                        </p>
                        <h4
                          className={`mt-1 font-display text-sm font-bold leading-snug text-ffie-ink ${FFIE_CARD_TEXT}`}
                        >
                          {card.hook}
                        </h4>
                        <p
                          className={`mt-0.5 line-clamp-2 text-xs text-ffie-muted ${FFIE_CARD_TEXT}`}
                        >
                          {card.description}
                        </p>
                      </SettleButton>
                    );
                  })}
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

        {selectedCard && (
          <div className="space-y-4 lg:sticky lg:top-4">
            <div className="flex flex-col gap-4 lg:flex-row-reverse">
              <div className="shrink-0 rounded-xl border border-ffie-line/80 bg-ffie-surface px-4 py-3 lg:w-[220px]">
                <p className={`${ffieCardCategory} text-ffie-muted`}>
                  Pinned capability
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

              <div className={`min-w-0 flex-1 space-y-4 ${REFLECTION_PANEL}`}>
                <label className="block space-y-2">
                  <span className="text-sm leading-relaxed text-ffie-ink">
                    What does {displayName} do, day to day?
                  </span>
                  <textarea
                    value={dayToDayDescription}
                    onChange={(event) => onDayToDayChange(event.target.value)}
                    rows={4}
                    className={FIELD}
                    placeholder="what it does day to day"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm leading-relaxed text-ffie-muted">
                    Optional: If {displayName} had a pitch line…
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
