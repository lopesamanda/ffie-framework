"use client";

import { motion, useReducedMotion } from "framer-motion";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import { CardReferenceTag } from "@/components/create/CardReferenceTag";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardSectionLabel,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { FUTURE_HORIZON_LABEL } from "@/lib/journey/future-horizon";
import { buildOracleSynthesis } from "@/lib/journey/oracle-synthesis";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";
import type { FutureQuadrant } from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";

const REVEAL_STAGGER = 0.08;

function revealItem(index: number, reduceMotion: boolean | null) {
  if (reduceMotion) {
    return { initial: false as const, animate: { opacity: 1, y: 0 } };
  }
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const, delay: index * REVEAL_STAGGER },
  };
}

function DrawnCardTags({ hand }: { hand: CardHand }) {
  const cards: NarrativeCard[] = [
    hand.risk,
    hand.benefit,
    hand.trust,
    hand.barrier,
    hand.transversal,
  ];

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {cards.map((card) => {
        const style = CATEGORY_STYLES[card.category];
        return (
          <span
            key={card.id}
            className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
            style={{
              borderColor: style.border,
              backgroundColor: style.bg,
              color: style.text,
            }}
          >
            {card.name}
          </span>
        );
      })}
    </div>
  );
}

export function FutureCardPreview({
  draft,
  id,
  compact = false,
  showDrawSynthesis = true,
  showCardProvenance = true,
  revealAnimated = false,
}: {
  draft: JourneyDraft;
  id?: string;
  compact?: boolean;
  /** Hide synthesis until all four Oracle cards are revealed. */
  showDrawSynthesis?: boolean;
  /** Hide Card Provenance until the full Oracle reveal sequence is complete. */
  showCardProvenance?: boolean;
  /** Staggered reveal on the final Future output card. */
  revealAnimated?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const quadrant: FutureQuadrant = quadrantFromPosition(
    draft.position.x,
    draft.position.y,
  );
  const title =
    draft.title ||
    (draft.artifactName
      ? draft.artifactName
      : draft.characterName
        ? `A future for ${draft.characterName}`
        : "Your future");

  const synthesisLine = showDrawSynthesis
    ? draft.drawSynthesis ||
      (draft.cardHand ? buildOracleSynthesis(draft.cardHand) : "")
    : "";

  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction;

  const Wrap = revealAnimated ? motion.div : "div";
  let revealIndex = 0;
  const nextReveal = () => {
    const current = revealIndex;
    revealIndex += 1;
    return revealItem(current, reduceMotion);
  };

  return (
    <div
      id={id}
      className={`${ffieCardShell} bg-ffie-surface ${compact ? "p-5" : "p-6"}`}
    >
      <Wrap {...(revealAnimated ? nextReveal() : {})}>
        <div className="flex flex-wrap items-center gap-2">
          <QuadrantPill quadrant={quadrant} />
          {draft.location && (
            <span className="text-xs text-ffie-muted">
              {draft.location} · {FUTURE_HORIZON_LABEL}
            </span>
          )}
        </div>
      </Wrap>

      <Wrap {...(revealAnimated ? nextReveal() : {})}>
        <h3 className={`mt-4 ${ffieCardTitle} text-xl ${FFIE_CARD_TEXT}`}>
          {title}
        </h3>

        {(draft.characterName || draft.role) && (
          <p className={`mt-1 text-sm text-ffie-muted ${FFIE_CARD_TEXT}`}>
            {[
              draft.characterName,
              draft.characterAge ? `${draft.characterAge}` : null,
              draft.role,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </Wrap>

      {synthesisLine && (
        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          <p
            className={`mt-3 text-sm font-medium italic text-ffie-accent ${FFIE_CARD_TEXT}`}
          >
            {synthesisLine}
          </p>
        </Wrap>
      )}

      {draft.cardHand && (
        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          <DrawnCardTags hand={draft.cardHand} />
        </Wrap>
      )}

      {(draft.publicPromise || hiddenFunctionDisplay) && (
        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          <div className={`mt-4 grid gap-3 text-sm ${compact ? "" : "md:grid-cols-2"}`}>
            <div className="rounded-[12px] bg-[#f6f4ff] px-[18px] py-3">
              <p className={ffieCardSectionLabel + " text-ffie-accent"}>
                Goal
              </p>
              <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
                {draft.publicPromise || "—"}
              </p>
            </div>
            <div className="rounded-[12px] bg-[#fdf1ee] px-[18px] py-3">
              <p className={`${ffieCardSectionLabel} text-[#c8472a]`}>
                Weakness
              </p>
              <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
                {hiddenFunctionDisplay || "—"}
              </p>
            </div>
          </div>
        </Wrap>
      )}

      {resolveArtifactValues(draft).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {resolveArtifactValues(draft).map((value) => (
            <span
              key={value}
              className="rounded-full border border-ffie-line bg-ffie-bg px-2.5 py-0.5 text-xs text-ffie-ink"
            >
              {value}
            </span>
          ))}
        </div>
      )}

      {draft.imageDataUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={draft.imageDataUrl}
          alt="Uploaded artifact"
          className="mt-4 max-h-48 w-full rounded-[12px] object-cover"
        />
      )}

      {draft.cardHand && !compact && showCardProvenance && (
        <CardProvenance hand={draft.cardHand} />
      )}
    </div>
  );
}

function CardProvenance({ hand }: { hand: CardHand }) {
  const drawn = [hand.risk, hand.benefit, hand.trust, hand.barrier, hand.transversal];
  return (
    <div className="mt-4 border-t border-ffie-line pt-4">
      <p className={ffieCardSectionLabel + " text-ffie-muted"}>
        Card provenance
      </p>
      <div className="mt-2 flex flex-wrap items-start gap-2">
        {drawn.map((card) => (
          <CardReferenceTag
            key={card.id}
            card={card}
            compact
            showReflectionQuestion
          />
        ))}
      </div>
    </div>
  );
}
