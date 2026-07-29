"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AiPowerSelector } from "@/components/create/AiPowerSelector";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import {
  artifactTypeLabel,
  resolvedArtifactSubformat,
  type ArtifactTypeId,
} from "@/lib/journey/character-options";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40";

const REVEAL_PAUSE_MS = 600;

const sectionReveal = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      };

function useStickyReveal(initial: boolean) {
  const [revealed, setRevealed] = useState(initial);
  const sticky = useRef(initial);

  const reveal = useCallback(() => {
    if (!sticky.current) {
      sticky.current = true;
      setRevealed(true);
    }
  }, []);

  return { revealed, reveal };
}

export function ArtifactProgressiveStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const reduceMotion = useReducedMotion();
  const p = pronounsForSelection(draft.characterPronoun);
  const fearAnswer = draft.fear.trim() || "…";
  const artifactName = draft.artifactName.trim() || "this artifact";
  const typeLabel = artifactTypeLabel(draft.artifactType).toLowerCase();
  const sector =
    resolvedPersonaSector(draft.personaSector, draft.personaSectorCustom) ||
    "their";

  const capabilitySelected = Boolean(draft.selectedAiCapability);
  const nameFilled = draft.artifactName.trim().length > 0;
  const problemFilled = draft.artifactProblemTension.trim().length > 0;

  const nameRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);

  const { revealed: showName, reveal: revealName } = useStickyReveal(
    nameFilled || capabilitySelected,
  );
  const { revealed: showProblem, reveal: revealProblem } = useStickyReveal(
    problemFilled || nameFilled,
  );

  useEffect(() => {
    if (capabilitySelected) {
      const timer = setTimeout(revealName, REVEAL_PAUSE_MS);
      return () => clearTimeout(timer);
    }
  }, [capabilitySelected, revealName]);

  useEffect(() => {
    if (nameFilled) {
      const timer = setTimeout(revealProblem, REVEAL_PAUSE_MS);
      return () => clearTimeout(timer);
    }
  }, [nameFilled, revealProblem]);

  useEffect(() => {
    if (showName) {
      nameRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }, [showName, reduceMotion]);

  useEffect(() => {
    if (showProblem) {
      problemRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }, [showProblem, reduceMotion]);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
          2a — Power + Capability
        </p>
        <AiPowerSelector
          values={draft.values}
          artifactType={draft.artifactType as ArtifactTypeId | ""}
          artifactName={draft.artifactName}
          selectedPower={draft.selectedAiPower}
          selectedCapabilityId={draft.selectedAiCapability}
          dayToDayDescription={draft.publicPromise}
          artifactGoalPitch={draft.artifactGoalPitch}
          onSelectCapability={(selectedAiCapability, powerId) =>
            onChange({
              selectedAiCapability,
              selectedAiPower: powerId,
              publicPromise: "",
              artifactGoalPitch: "",
            })
          }
          onDayToDayChange={(publicPromise) => onChange({ publicPromise })}
          onGoalPitchChange={(artifactGoalPitch) =>
            onChange({ artifactGoalPitch })
          }
        />
      </section>

      {showName && (
        <motion.section
          ref={nameRef}
          {...sectionReveal(reduceMotion)}
          className="space-y-3"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            2b — Name
          </p>
          <p className="text-sm leading-relaxed text-ffie-ink">
            Give it a name. What is this artifact called?
          </p>
          {(draft.artifactType || draft.artifactSubformat) && (
            <div className="flex flex-wrap items-center gap-2">
              {draft.artifactType && (
                <span className="rounded-full border border-ffie-line bg-ffie-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ffie-muted">
                  {artifactTypeLabel(draft.artifactType)}
                </span>
              )}
              {resolvedArtifactSubformat(
                draft.artifactSubformat,
                draft.artifactSubformatOther,
              ) && (
                <span className="rounded-full border border-ffie-accent/25 bg-ffie-accent-soft/40 px-2.5 py-0.5 text-[10px] font-semibold text-ffie-ink">
                  {resolvedArtifactSubformat(
                    draft.artifactSubformat,
                    draft.artifactSubformatOther,
                  )}
                </span>
              )}
            </div>
          )}
          <input
            value={draft.artifactName}
            onChange={(event) => onChange({ artifactName: event.target.value })}
            onBlur={() => {
              if (nameFilled) revealProblem();
            }}
            placeholder="artifact name"
            className={FIELD}
          />
        </motion.section>
      )}

      {showProblem && (
        <motion.section
          ref={problemRef}
          {...sectionReveal(reduceMotion)}
          className="space-y-3"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            2c — Place it in the world
          </p>
          <p className="text-sm leading-relaxed text-ffie-ink">
            You said {p.subject} fears Artificial Intelligence will{" "}
            <strong className="font-medium">{fearAnswer}</strong>. {artifactName},{" "}
            {p.possessive} {typeLabel} in the {sector} sector — what problem or
            tension does it respond to, or make worse?
          </p>
          <textarea
            value={draft.artifactProblemTension}
            onChange={(event) =>
              onChange({ artifactProblemTension: event.target.value })
            }
            rows={4}
            placeholder="problem it solves or worsens"
            className={`${FIELD} resize-y`}
          />
        </motion.section>
      )}
    </div>
  );
}
