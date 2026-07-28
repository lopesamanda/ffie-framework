"use client";

import { useMemo, useState } from "react";
import { PowerGlyph } from "@/components/create/design/PowerGlyph";
import {
  AI_CAPABILITY_CARDS,
  type AiCapabilityCard,
} from "@/data/ai-capability-cards";
import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  groupCardsByPower,
  type AiCapabilityPowerId,
} from "@/lib/journey/ai-capability-clusters";
import {
  getVisibleCardsForArtifact,
  orderCapabilityCardsForArtifact,
} from "@/lib/journey/artifact-capability-priorities";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardShell,
} from "@/lib/card-layout";

export type AiCapabilityContext = "embody" | "artifact";

const INTRO: Record<AiCapabilityContext, string> = {
  embody:
    "Need inspiration? Each power below opens into an example and a few guiding questions — your answer stays yours to write.",
  artifact:
    "Not sure how the AI works in this artifact? Pick a power that fits, expand a card for an example and guiding questions — describe the day-to-day use in your own words.",
};

export function AiCapabilityCardPicker({
  context = "embody",
  artifactType = "",
}: {
  context?: AiCapabilityContext;
  artifactType?: ArtifactTypeId | "";
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const { prioritized } = useMemo(
    () =>
      context === "artifact" && artifactType
        ? orderCapabilityCardsForArtifact(artifactType)
        : { prioritized: [] as AiCapabilityCard[], other: [] as AiCapabilityCard[] },
    [context, artifactType],
  );

  const prioritizedIds = useMemo(
    () => new Set(prioritized.map((card) => card.id)),
    [prioritized],
  );

  const powerGroups = useMemo(() => {
    const cards =
      context === "artifact" && artifactType
        ? getVisibleCardsForArtifact(artifactType)
        : [...AI_CAPABILITY_CARDS];
    return groupCardsByPower(cards);
  }, [context, artifactType]);

  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const renderCard = (card: AiCapabilityCard, highlighted: boolean) => (
    <CapabilityCard
      key={card.id}
      card={card}
      context={context}
      expanded={expandedId === card.id}
      onToggle={() => toggleExpanded(card.id)}
      highlighted={highlighted}
    />
  );

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-ffie-muted">{INTRO[context]}</p>

      {context === "artifact" && artifactType && prioritized.length > 0 ? (
        <div className="space-y-4">
          {!showAll ? (
            <PowerGroup
              label="Suggested for this artifact type"
              cards={prioritized}
              renderCard={(card) => renderCard(card, true)}
            />
          ) : (
            <div className="space-y-6">
              {powerGroups.map((group) => (
                <PowerGroup
                  key={group.id + group.label}
                  powerId={
                    group.label === "Other capabilities" ? undefined : group.id
                  }
                  label={group.label}
                  cards={group.cards}
                  renderCard={(card) =>
                    renderCard(card, prioritizedIds.has(card.id))
                  }
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="text-xs font-medium text-ffie-accent transition hover:underline"
          >
            {showAll ? "Show suggested only ↑" : "Show all powers ↓"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {powerGroups.map((group) => (
            <PowerGroup
              key={group.id}
              powerId={group.id}
              label={group.label}
              cards={group.cards}
              renderCard={(card) => renderCard(card, false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PowerGroup({
  powerId,
  label,
  cards,
  renderCard,
}: {
  powerId?: AiCapabilityPowerId;
  label: string;
  cards: AiCapabilityCard[];
  renderCard: (card: AiCapabilityCard) => React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        {powerId && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-ffie-accent-soft text-ffie-accent">
            <PowerGlyph powerId={powerId} size={20} />
          </span>
        )}
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ffie-ink">
          {label}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => renderCard(card))}
      </div>
    </div>
  );
}

function CapabilityCard({
  card,
  context,
  expanded,
  onToggle,
  highlighted = false,
}: {
  card: AiCapabilityCard;
  context: AiCapabilityContext;
  expanded: boolean;
  onToggle: () => void;
  highlighted?: boolean;
}) {
  const questions =
    context === "artifact"
      ? card.artifactGuidingQuestions
      : card.guidingQuestions;

  return (
    <div
      className={`${ffieCardShell} border-t-[3px] bg-ffie-bg/40 px-[18px] py-4 transition-shadow ${
        highlighted ? "ring-1 ring-ffie-accent/35" : ""
      } ${expanded ? "shadow-[0_4px_16px_rgba(35,19,82,0.08)]" : ""}`}
      style={{ borderTopColor: card.color }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left"
      >
        <p className={`${ffieCardCategory} text-ffie-muted`}>{card.name}</p>
        <h4
          className={`mt-1 font-display text-[15px] font-bold leading-snug text-ffie-ink ${FFIE_CARD_TEXT}`}
        >
          {card.hook}
        </h4>
        {!expanded && (
          <p
            className={`mt-2 line-clamp-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
          >
            {card.description}
          </p>
        )}
        {expanded && (
          <>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ffie-line bg-ffie-accent-soft/60 px-2.5 py-0.5 text-[10px] font-semibold text-ffie-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p
              className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
            >
              {card.description}
            </p>
          </>
        )}
        <span className="mt-2.5 inline-block text-xs font-medium text-ffie-accent">
          {expanded ? "Hide prompts ↑" : "Show example & prompts ↓"}
        </span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          <div className={ffieCardDivider} />
          <div>
            <p className={`${ffieCardCategory} text-ffie-muted`}>
              Example (for inspiration only)
            </p>
            <p
              className={`mt-2 text-sm italic leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
            >
              {card.examples[0]}
            </p>
          </div>
          <div>
            <p className={`${ffieCardCategory} text-ffie-muted`}>
              Guiding questions
            </p>
            <ul className="mt-2 space-y-2">
              {questions.map((question) => (
                <li
                  key={question}
                  className={`text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
                >
                  · {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
