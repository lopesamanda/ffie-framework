"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import { MatrixPositionModal } from "@/components/create/MatrixPositionModal";
import { CardReferenceTag } from "@/components/create/CardReferenceTag";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
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
import {
  resolveCapabilityDescription,
  resolveCapabilityName,
} from "@/lib/journey/future-commons-narrative";
import { buildOracleSynthesis, buildOracleSynthesisTensions } from "@/lib/journey/oracle-synthesis";
import Image from "next/image";
import { buildFinalCardNarrative } from "@/lib/journey/future-card-copy";
import { ensureVisualDirection } from "@/components/create/VisualDirectionStep";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";
import type { FutureQuadrant } from "@/types/future";
import {
  QUADRANT_AMBIENT_ACCENTS,
  QUADRANT_COLORS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";

const REVEAL_STAGGER = 0.08;

/** Shared inner panel for artifact detail boxes on the final Future card. */
const ARTIFACT_PANEL =
  "rounded-2xl border border-ffie-line/60 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]";

function ArtifactDetailPanel({
  label,
  labelTone = "text-ffie-muted",
  panelClassName,
  children,
}: {
  label: string;
  labelTone?: string;
  panelClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${ARTIFACT_PANEL} ${panelClassName ?? "bg-ffie-surface/80"}`}>
      <p className={`${ffieCardSectionLabel} ${labelTone}`}>{label}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function FinalCardQuadrantFrame({
  quadrant,
  reduceMotion,
}: {
  quadrant: FutureQuadrant;
  reduceMotion: boolean | null;
}) {
  const wash = QUADRANT_COLORS[quadrant];
  const accent = QUADRANT_TEXT_COLORS[quadrant];

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 rounded-t-[inherit]"
        style={{ backgroundColor: accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[inherit]"
        style={{ backgroundColor: accent, opacity: 0.85 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 rounded-t-[inherit]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${wash} 72%, transparent) 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-[inherit]"
        style={{
          background: `linear-gradient(0deg, color-mix(in srgb, ${wash} 28%, transparent) 0%, transparent 100%)`,
        }}
      />
      <QuadrantAmbientField quadrant={quadrant} reduceMotion={reduceMotion} />
    </>
  );
}

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

function DrawnCardTags({
  hand,
  finalOnly = false,
}: {
  hand: CardHand;
  finalOnly?: boolean;
}) {
  const cards: NarrativeCard[] = finalOnly
    ? [hand.benefit, hand.risk, hand.trust, hand.barrier]
    : [hand.risk, hand.benefit, hand.trust, hand.barrier, hand.transversal];

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
  /** Final revealed Future card — persona-first layout with problem/tension copy. */
  showCommonsNarrative?: boolean;
  /** Staggered reveal on the final Future output card. */
  revealAnimated?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const [matrixOpen, setMatrixOpen] = useState(false);
  const isFinalCard = showCommonsNarrative;
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

  const personaName = draft.characterName.trim() || "Your future";
  const sectorLabel = resolvedPersonaSector(
    draft.personaSector,
    draft.personaSectorCustom,
  );
  const roleLine = [
    draft.characterAge ? `${draft.characterAge}` : null,
    resolvedCharacterRole(draft.role, draft.roleCustom),
    sectorLabel || null,
  ]
    .filter(Boolean)
    .join(" · ");
  const narrativeBeats = buildFinalCardNarrative(draft);
  const visualDirectionSrc = ensureVisualDirection(draft);
  const artifactHeading = draft.artifactName.trim();

  const showSynthesis = Boolean(
    draft.cardHand && (isFinalCard || (showDrawSynthesis && !showCommonsNarrative)),
  );

  const synthesisLine = showSynthesis
    ? draft.drawSynthesis ||
      (draft.cardHand ? buildOracleSynthesis(draft.cardHand) : "")
    : "";

  const synthesisTensionsLine = showSynthesis
    ? draft.drawSynthesisTensions ||
      (draft.cardHand ? buildOracleSynthesisTensions(draft.cardHand) : "")
    : "";

  const commonsNarrative = "";

  const artifactValues = resolveArtifactValues(draft);

  const capabilityName = resolveCapabilityName(draft.selectedAiCapability);
  const capabilityDescription = resolveCapabilityDescription(
    draft.selectedAiCapability,
  );

  const sectionGap = isFinalCard ? "mt-8" : "mt-3";
  const finalCardShell = isFinalCard
    ? "overflow-hidden rounded-[20px] border-2 border-ffie-line/80 bg-ffie-surface/95 p-7 shadow-[0_16px_48px_rgba(35,19,82,0.14),0_0_0_1px_rgba(255,255,255,0.5)_inset] ring-1 ring-ffie-accent/10 backdrop-blur-sm md:p-8"
    : `${ffieCardShell} bg-ffie-surface/95 backdrop-blur-[1px] ${compact ? "p-5" : "p-6"}`;

  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction;

  const revealSectionCount =
    1 +
    1 +
    (isFinalCard
      ? (visualDirectionSrc ? 1 : 0) +
        (narrativeBeats.length > 0 ? 1 : 0) +
        (synthesisLine ? 1 : 0) +
        (showCardTags && draft.cardHand ? 1 : 0) +
        (artifactHeading ||
        draft.publicPromise ||
        draft.artifactGoalPitch ||
        hiddenFunctionDisplay ||
        capabilityName
          ? 1
          : 0) +
        (artifactValues.length > 0 ? 1 : 0)
      : (commonsNarrative || synthesisLine ? 1 : 0) +
        (synthesisTensionsLine ? 1 : 0) +
        (showCardTags && draft.cardHand ? 1 : 0) +
        (draft.publicPromise || hiddenFunctionDisplay || capabilityName ? 1 : 0));

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
    <div className={`relative ${isFinalCard ? "mx-auto w-full max-w-[420px]" : ""}`}>
      {isFinalCard && (
        <MatrixPositionModal
          open={matrixOpen}
          onClose={() => setMatrixOpen(false)}
          position={draft.position}
        />
      )}
      {revealAnimated && !isFinalCard && (
        <QuadrantAmbientField quadrant={quadrant} reduceMotion={reduceMotion} />
      )}

      <div id={id} className={`relative ${finalCardShell}`}>
        {isFinalCard && (
          <FinalCardQuadrantFrame
            quadrant={quadrant}
            reduceMotion={reduceMotion}
          />
        )}

        <div className="relative z-[1] flex flex-col">
        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <QuadrantPill
              quadrant={quadrant}
              seal={revealAnimated}
              sealDelay={sealDelay}
            />
            {isFinalCard && (
              <>
                <span className="text-xs text-ffie-muted" aria-hidden>
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => setMatrixOpen(true)}
                  className="text-xs font-medium text-ffie-accent underline-offset-2 transition hover:text-ffie-ink hover:underline"
                >
                  View Matrix
                </button>
              </>
            )}
            {sectorLabel && (
              <span className="rounded-full border border-ffie-line bg-ffie-bg px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-ffie-muted">
                {sectorLabel}
              </span>
            )}
            {draft.location && (
              <span className="text-xs text-ffie-muted">
                {draft.location} · {FUTURE_HORIZON_LABEL}
              </span>
            )}
          </div>
        </Wrap>

        {isFinalCard && visualDirectionSrc && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <div className="mt-4 overflow-hidden rounded-2xl border border-ffie-line/60">
              <Image
                src={visualDirectionSrc}
                alt="Visual direction for artifact"
                width={840}
                height={420}
                className="h-40 w-full object-cover md:h-44"
              />
            </div>
          </Wrap>
        )}

        <Wrap {...(revealAnimated ? nextReveal() : {})}>
          {isFinalCard ? (
            <header className="mt-4 md:mt-5">
              <h3
                className={`font-display font-bold tracking-tight text-ffie-ink ${FFIE_CARD_TEXT} ${
                  isFinalCard
                    ? "text-[1.75rem] leading-[1.12] md:text-[2rem]"
                    : `${ffieCardTitle} text-xl`
                }`}
              >
                {personaName}
              </h3>
              {roleLine && (
                <p
                  className={`mt-2 text-xs font-medium uppercase tracking-[0.08em] text-ffie-muted ${FFIE_CARD_TEXT}`}
                >
                  {roleLine}
                </p>
              )}
            </header>
          ) : (
            <>
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
            </>
          )}
        </Wrap>

        {isFinalCard && narrativeBeats.length > 0 && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <div className={`${sectionGap} space-y-3`}>
              {narrativeBeats.map((beat) => (
                <p
                  key={beat}
                  className={`text-sm leading-relaxed text-ffie-ink/90 ${FFIE_CARD_TEXT}`}
                >
                  {beat}
                </p>
              ))}
            </div>
          </Wrap>
        )}

        {isFinalCard && synthesisLine && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <div
              className={`${sectionGap} rounded-2xl border border-ffie-accent/20 bg-ffie-accent-soft/35 px-5 py-4`}
            >
              <p
                className={`text-sm font-medium italic leading-relaxed text-ffie-accent ${FFIE_CARD_TEXT}`}
              >
                {synthesisLine}
              </p>
              {synthesisTensionsLine && (
                <p className={`mt-2.5 text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
                  {synthesisTensionsLine}
                </p>
              )}
            </div>
          </Wrap>
        )}

        {!isFinalCard && (commonsNarrative || synthesisLine) && (
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

        {showCardTags && draft.cardHand && isFinalCard && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <DrawnCardTags hand={draft.cardHand} finalOnly />
          </Wrap>
        )}

        {(isFinalCard
          ? artifactHeading ||
            draft.publicPromise ||
            draft.artifactGoalPitch ||
            hiddenFunctionDisplay ||
            capabilityName
          : draft.publicPromise || hiddenFunctionDisplay || capabilityName) && (
          <Wrap {...(revealAnimated ? nextReveal() : {})}>
            <div className={`${isFinalCard ? sectionGap : "mt-4"} space-y-4 text-sm`}>
              {isFinalCard && artifactHeading && (
                <h4
                  className={`font-display text-lg font-semibold leading-snug text-ffie-ink/90 ${FFIE_CARD_TEXT}`}
                >
                  {artifactHeading}
                </h4>
              )}
              {capabilityName && (
                <ArtifactDetailPanel label="AI FUNCTION" panelClassName="bg-ffie-bg/70">
                  <p className={`text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    <span className="font-semibold">{capabilityName}</span>
                    {capabilityDescription && (
                      <span className="mt-2 block font-normal text-ffie-muted">
                        {capabilityDescription}
                      </span>
                    )}
                  </p>
                </ArtifactDetailPanel>
              )}
              <div
                className={`grid gap-4 ${
                  isFinalCard ? "grid-cols-1" : compact ? "" : "md:grid-cols-2"
                }`}
              >
                <ArtifactDetailPanel
                  label="ARTIFACT GOAL"
                  labelTone="text-ffie-accent"
                  panelClassName="bg-[#f6f4ff]/90"
                >
                  <p className={`text-sm text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    {draft.publicPromise || "—"}
                  </p>
                  {draft.artifactGoalPitch.trim() && (
                    <p className={`mt-2 text-xs italic leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
                      {draft.artifactGoalPitch.trim()}
                    </p>
                  )}
                </ArtifactDetailPanel>
                <ArtifactDetailPanel
                  label="ARTIFACT WEAKNESS"
                  labelTone="text-[#c8472a]"
                  panelClassName="bg-[#fdf1ee]/90"
                >
                  <p className={`text-sm text-ffie-ink ${FFIE_CARD_TEXT}`}>
                    <HighlightedWeaknessText
                      text={hiddenFunctionDisplay || "—"}
                      extremeValue={draft.hiddenFunctionExtremeValue}
                      highlightedValue={highlightedValue}
                    />
                  </p>
                </ArtifactDetailPanel>
              </div>
            </div>
          </Wrap>
        )}

        {artifactValues.length > 0 && (
          <div className={`${isFinalCard ? "mt-8" : "mt-3"} flex flex-wrap gap-2 pb-1`}>
            {artifactValues.map((value) => {
              const isLinked =
                value.toLowerCase() ===
                draft.hiddenFunctionExtremeValue.trim().toLowerCase();
              return (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => isLinked && setHighlightedValue(value)}
                  onMouseLeave={() => setHighlightedValue(null)}
                  onClick={() =>
                    isLinked &&
                    setHighlightedValue((current) =>
                      current === value ? null : value,
                    )
                  }
                  onFocus={() => isLinked && setHighlightedValue(value)}
                  onBlur={() => setHighlightedValue(null)}
                  className={`rounded-full border px-2.5 py-0.5 text-xs transition ${
                    highlightedValue === value
                      ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
                      : "border-ffie-line bg-ffie-bg text-ffie-ink"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        )}

        {draft.cardHand && !compact && showCardProvenance && (
          <CardProvenance hand={draft.cardHand} />
        )}
        </div>
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
