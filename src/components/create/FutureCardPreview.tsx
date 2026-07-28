"use client";

import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import { CardReferenceTag } from "@/components/create/CardReferenceTag";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import {
  FFIE_CARD_TEXT,
  ffieCardDivider,
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

export function FutureCardPreview({
  draft,
  id,
  compact = false,
  showDrawSynthesis = true,
  showCardProvenance = true,
  showEcosystemReflection = false,
  onEcosystemReflectionChange,
}: {
  draft: JourneyDraft;
  id?: string;
  compact?: boolean;
  /** Hide synthesis until all four Oracle cards are revealed. */
  showDrawSynthesis?: boolean;
  /** Hide Card Provenance until the full Oracle reveal sequence is complete. */
  showCardProvenance?: boolean;
  /** Optional ecosystem-level reflection on the final output card. */
  showEcosystemReflection?: boolean;
  onEcosystemReflectionChange?: (value: string) => void;
}) {
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

  const personaName = draft.characterName.trim() || "your persona";

  return (
    <div
      id={id}
      className={`${ffieCardShell} bg-ffie-surface ${compact ? "p-5" : "p-6"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <QuadrantPill quadrant={quadrant} />
        {draft.location && (
          <span className="text-xs text-ffie-muted">
            {draft.location} · {FUTURE_HORIZON_LABEL}
          </span>
        )}
      </div>

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

      {synthesisLine && (
        <p
          className={`mt-3 text-sm font-medium italic text-ffie-accent ${FFIE_CARD_TEXT}`}
        >
          {synthesisLine}
        </p>
      )}

      {draft.narrative && (
        <>
          <div className={`my-4 ${ffieCardDivider}`} />
          <p className={`text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
            {draft.narrative}
          </p>
        </>
      )}

      {(draft.publicPromise || draft.artifactGoalPitch || hiddenFunctionDisplay) && (
        <div className={`mt-4 grid gap-3 text-sm ${compact ? "" : "md:grid-cols-2"}`}>
          <div className="rounded-[12px] bg-[#f6f4ff] px-[18px] py-3">
            <p className={ffieCardSectionLabel + " text-ffie-accent"}>
              Goal
            </p>
            <p className={`mt-1 text-ffie-ink ${FFIE_CARD_TEXT}`}>
              {draft.artifactGoalPitch || draft.publicPromise || "—"}
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
      )}

      {showEcosystemReflection && onEcosystemReflectionChange && (
        <label className="mt-4 block space-y-2">
          <span className={`text-sm text-ffie-muted ${FFIE_CARD_TEXT}`}>
            Zoom out: beyond {personaName}, who else does this future touch —
            and are they included, or left out?
            <span className="ml-1 text-xs">(optional)</span>
          </span>
          <textarea
            value={draft.ecosystemImpactReflection}
            onChange={(event) =>
              onEcosystemReflectionChange(event.target.value)
            }
            rows={3}
            placeholder="A sentence or two — only if it feels useful."
            className="w-full resize-none rounded-xl border border-ffie-line bg-ffie-bg/60 px-4 py-3 text-sm outline-none focus:border-ffie-accent/40"
          />
        </label>
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
