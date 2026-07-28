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
import { buildFutureCommonsNarrative, resolveCapabilityName } from "@/lib/journey/future-commons-narrative";
import { buildOracleSynthesis, buildOracleSynthesisTensions } from "@/lib/journey/oracle-synthesis";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";
import type { FutureQuadrant } from "@/types/future";
import {
  QUADRANT_AMBIENT_ACCENTS,
  QUADRANT_COLORS,
} from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";

const REVEAL_STAGGER = 0.08;

function revealItem(index: number, reduceMotion: boolean | null) {
  if (reduceMotion) {
    return { initial: false as const, animate: { opacity: 1, y: 0 } };
  }
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: index * REVEAL_STAGGER,
    },
  };
}

function QuadrantAmbientField({
  quadrant,
  reduceMotion,
}: {
  quadrant: FutureQuadrant;
  reduceMotion: boolean | null;
}) {
  const primary = QUADRANT_COLORS[quadrant];
  const accent = QUADRANT_AMBIENT_ACCENTS[quadrant];

  const blobs = [
    { color: primary, top: "8%", left: "-6%", size: "min(52vw, 240px)" },
    { color: accent, bottom: "4%", right: "-8%", size: "min(48vw, 220px)" },
  ] as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: blob.color,
            opacity: 0.22,
            width: blob.size,
            height: blob.size,
            top: "top" in blob ? blob.top : undefined,
            left: "left" in blob ? blob.left : undefined,
            right: "right" in blob ? blob.right : undefined,
            bottom: "bottom" in blob ? blob.bottom : undefined,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: index === 0 ? [0, 12, -8, 0] : [0, -10, 14, 0],
                  y: index === 0 ? [0, -10, 6, 0] : [0, 8, -12, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 28 + index * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
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
  showCardTags = false,
  showCommonsNarrative = false,
  revealAnimated = false,
}: {
  draft: JourneyDraft;
  id?: string;
  compact?: boolean;
  /** Hide synthesis until all four Oracle cards are revealed. */
  showDrawSynthesis?: boolean;
  /** Hide Card Provenance until the full Oracle reveal sequence is complete. */
  showCardProvenance?: boolean;
  /** Colored card-name tags below synthesis — final output only, not side preview. */
  showCardTags?: boolean;
  /** Future Commons–style narrative paragraph instead of draw synthesis. */
  showCommonsNarrative?: boolean;
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

  const synthesisLine = showDrawSynthesis && !showCommonsNarrative
    ? draft.drawSynthesis ||
      (draft.cardHand ? buildOracleSynthesis(draft.cardHand) : "")
    : "";

  const synthesisTensionsLine =
    showDrawSynthesis && !showCommonsNarrative
      ? draft.drawSynthesisTensions ||
        (draft.cardHand ? buildOracleSynthesisTensions(draft.cardHand) : "")
      : "";

  const commonsNarrative = showCommonsNarrative
    ? draft.narrative.trim() || buildFutureCommonsNarrative(draft)
    : "";

  const capabilityName = resolveCapabilityName(draft.selectedAiCapability);

  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction;

  const revealSectionCount =
    1 +
    1 +
    (commonsNarrative || synthesisLine ? 1 : 0) +
    (synthesisTensionsLine ? 1 : 0) +
    (showCardTags && draft.cardHand ? 1 : 0) +
    (draft.publicPromise || hiddenFunctionDisplay || capabilityName ? 1 : 0) +
    (draft.imageDataUrl ? 1 : 0);

  const sealDelay = revealAnimated
    ? (revealSectionCount - 1) * REVEAL_STAGGER + 0.35
    : 0;

  const Wrap = revealAnimated ? motion.div : "div";
  let revealIndex = 0;
  const nextReveal = () => {
    const current = revealIndex;
    revealIndex += 1;
    return revealItem(current, reduceMotion);
  };

  return (
    <div className="relative">
      {revealAnimated && (
        <QuadrantAmbientField quadrant={quadrant} reduceMotion={reduceMotion} />
      )}

      <div
        id={id}
        className={`relative ${ffieCardShell} bg-ffie-surface/95 backdrop-blur-[1px] ${compact ? "p-5" : "p-6"}`}
      >
        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          <div className="flex flex-wrap items-center gap-2">
            <QuadrantPill
              quadrant={quadrant}
              seal={revealAnimated}
              sealDelay={sealDelay}
            />
            {draft.personaSector && (
              <span className="rounded-full border border-ffie-line bg-ffie-bg px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-ffie-muted">
                {draft.personaSector}
              </span>
            )}
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

        {(commonsNarrative || synthesisLine) && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <p
              className={`mt-3 text-sm leading-relaxed ${
                showCommonsNarrative
                  ? "text-ffie-ink"
                  : "font-medium italic text-ffie-accent"
              } ${FFIE_CARD_TEXT}`}
            >
              {commonsNarrative || synthesisLine}
            </p>
            {synthesisTensionsLine && !showCommonsNarrative && (
              <p className={`mt-2 text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
                {synthesisTensionsLine}
              </p>
            )}
          </Wrap>
        )}

        {showCardTags && draft.cardHand && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <DrawnCardTags hand={draft.cardHand} />
          </Wrap>
        )}

        {(draft.publicPromise || hiddenFunctionDisplay || capabilityName) && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <div className="mt-4 space-y-3 text-sm">
              {capabilityName && (
                <div className="rounded-[12px] border border-ffie-line/80 bg-ffie-bg px-[18px] py-3">
                  <p className={ffieCardSectionLabel + " text-ffie-muted"}>
                    AI function
                  </p>
                  <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    {capabilityName}
                  </p>
                </div>
              )}
              <div
                className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}
              >
                <div className="rounded-[12px] bg-[#f6f4ff] px-[18px] py-3">
                  <p className={ffieCardSectionLabel + " text-ffie-accent"}>
                    Artifact goal
                  </p>
                  <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    {draft.publicPromise || "—"}
                  </p>
                </div>
                <div className="rounded-[12px] bg-[#fdf1ee] px-[18px] py-3">
                  <p className={`${ffieCardSectionLabel} text-[#c8472a]`}>
                    Artifact weakness
                  </p>
                  <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    {hiddenFunctionDisplay || "—"}
                  </p>
                </div>
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
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={draft.imageDataUrl}
              alt="Uploaded artifact"
              className="mt-4 max-h-48 w-full rounded-[12px] object-cover"
            />
          </Wrap>
        )}

        {draft.cardHand && !compact && showCardProvenance && (
          <CardProvenance hand={draft.cardHand} />
        )}
      </div>
    </div>
  );
}

function CardProvenance({ hand }: { hand: CardHand }) {
  const drawn = [
    hand.risk,
    hand.benefit,
    hand.trust,
    hand.barrier,
    hand.transversal,
  ];
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
