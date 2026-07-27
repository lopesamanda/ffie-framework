"use client";

import { useState } from "react";
import {
  AI_CAPABILITY_CARDS,
  type AiCapabilityCard,
} from "@/data/ai-capability-cards";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";

export type AiCapabilityContext = "embody" | "artifact";

const INTRO: Record<AiCapabilityContext, string> = {
  embody:
    "Need inspiration? Expand a capability card to see an example and a few guiding questions — your answer stays yours to write.",
  artifact:
    "Not sure how the AI works in this artifact? Expand a capability card for an example and guiding questions — describe the day-to-day use in your own words.",
};

export function AiCapabilityCardPicker({
  context = "embody",
}: {
  context?: AiCapabilityContext;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-ffie-muted">{INTRO[context]}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {AI_CAPABILITY_CARDS.map((card) => (
          <CapabilityCard
            key={card.id}
            card={card}
            context={context}
            expanded={expandedId === card.id}
            onToggle={() =>
              setExpandedId((current) =>
                current === card.id ? null : card.id,
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({
  card,
  context,
  expanded,
  onToggle,
}: {
  card: AiCapabilityCard;
  context: AiCapabilityContext;
  expanded: boolean;
  onToggle: () => void;
}) {
  const questions =
    context === "artifact"
      ? card.artifactGuidingQuestions
      : card.guidingQuestions;

  return (
    <div
      className={`${ffieCardShell} border-t-[3px] bg-ffie-bg/40 px-[18px] py-4`}
      style={{ borderTopColor: card.color }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left"
      >
        <p className={`${ffieCardCategory} text-ffie-muted`}>AI capability</p>
        <h4 className={`mt-2 ${ffieCardTitle} ${FFIE_CARD_TEXT}`}>
          {card.name}
        </h4>
        <p
          className={`mt-1.5 text-[10px] font-medium leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}
        >
          {card.description}
        </p>
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
        <span className="mt-2 inline-block text-xs font-medium text-ffie-accent">
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
