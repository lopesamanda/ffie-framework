"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import {
  gainSectionLabel,
  hopeSectionLabel,
  possessiveStoryHeading,
} from "@/lib/journey/future-card-copy";
import { DrawnCardsCompactReference } from "@/components/create/DrawnCardsCompactReference";
import { verbFor, type CharacterPronouns } from "@/lib/journey/character-pronouns";
import type { CardHand } from "@/lib/journey/types";

const REVEAL_PAUSE_MS = 700;

const PLACEHOLDERS = {
  gain: "ability improved by AI",
  change: "habit that AI changed",
  hope: "desire for the future",
} as const;

const lineDrift = (reduceMotion: boolean | null, delay = 0) =>
  reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1] as const,
          delay,
        },
      };

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

type EmbodyBuildStoryScreenProps = {
  draft: {
    aiFunction: string;
    tradeoffLoss: string;
    desire: string;
  };
  role: string;
  sector: string;
  cardHand: CardHand | null;
  p: CharacterPronouns;
  onChange: (patch: {
    aiFunction?: string;
    tradeoffLoss?: string;
    desire?: string;
  }) => void;
};

export function EmbodyBuildStoryScreen({
  draft,
  role,
  sector,
  cardHand,
  p,
  onChange,
}: EmbodyBuildStoryScreenProps) {
  const reduceMotion = useReducedMotion();
  const changeSectionRef = useRef<HTMLDivElement>(null);
  const hopeSectionRef = useRef<HTMLDivElement>(null);

  const gainFilled = draft.aiFunction.trim().length > 0;
  const changeFilled = draft.tradeoffLoss.trim().length > 0;

  const { revealed: showChange, reveal: revealChange } = useStickyReveal(
    changeFilled || gainFilled,
  );
  const { revealed: showHope, reveal: revealHope } = useStickyReveal(
    draft.desire.trim().length > 0 || changeFilled,
  );

  const gainPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const changePauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return;
    element.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (gainFilled) {
      gainPauseRef.current = setTimeout(revealChange, REVEAL_PAUSE_MS);
    }
    return () => {
      if (gainPauseRef.current) clearTimeout(gainPauseRef.current);
    };
  }, [gainFilled, revealChange]);

  useEffect(() => {
    if (changeFilled) {
      changePauseRef.current = setTimeout(revealHope, REVEAL_PAUSE_MS);
    }
    return () => {
      if (changePauseRef.current) clearTimeout(changePauseRef.current);
    };
  }, [changeFilled, revealHope]);

  useEffect(() => {
    if (showChange) scrollTo(changeSectionRef.current);
  }, [showChange, reduceMotion]);

  useEffect(() => {
    if (showHope) scrollTo(hopeSectionRef.current);
  }, [showHope, reduceMotion]);

  const handleGainBlur = () => {
    if (gainFilled) revealChange();
  };

  const handleChangeBlur = () => {
    if (changeFilled) revealHope();
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ffie-accent">
          {possessiveStoryHeading(p)}
        </p>
        <p className="text-sm leading-relaxed text-ffie-muted">
          A future is not only about what technology makes possible. It is also
          about what changes along the way.
        </p>
      </header>

      {cardHand && (
        <DrawnCardsCompactReference cardHand={cardHand} />
      )}

      <section className="space-y-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
          01 — {gainSectionLabel(p)}
        </p>
        <NarrativeBlock>
          <motion.div {...lineDrift(reduceMotion, 0)}>
            <NarrativeBlank
              before={`Ten years from now, as a ${role} in the ${sector} sector, Artificial Intelligence (AI) changed the way ${p.subject} could `}
              after="."
              value={draft.aiFunction}
              onChange={(aiFunction) => onChange({ aiFunction })}
              onBlur={handleGainBlur}
              placeholder={PLACEHOLDERS.gain}
            />
          </motion.div>
        </NarrativeBlock>
      </section>

      {showChange && (
        <motion.section
          ref={changeSectionRef}
          {...sectionReveal(reduceMotion)}
          className="space-y-3"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            02 — WHAT CHANGES
          </p>
          <NarrativeBlock>
            <motion.div {...lineDrift(reduceMotion, 0.04)}>
              <NarrativeBlank
                before={`But it also changed the way ${p.subject} `}
                after="."
                value={draft.tradeoffLoss}
                onChange={(tradeoffLoss) => onChange({ tradeoffLoss })}
                onBlur={handleChangeBlur}
                placeholder={PLACEHOLDERS.change}
              />
            </motion.div>
          </NarrativeBlock>
        </motion.section>
      )}

      {showHope && (
        <motion.section
          ref={hopeSectionRef}
          {...sectionReveal(reduceMotion)}
          className="space-y-3 rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft/35 px-4 py-4"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            03 — {hopeSectionLabel(p)}
          </p>
          <NarrativeBlock className="border-0 bg-transparent p-0">
            <motion.div {...lineDrift(reduceMotion, 0.04)}>
              <NarrativeBlank
                before={`Yet in ${p.possessive} work as a ${role}, ${p.subject} still ${verbFor(p, "holds", "hold")} on to the hope that `}
                after="."
                value={draft.desire}
                onChange={(desire) => onChange({ desire })}
                placeholder={PLACEHOLDERS.hope}
              />
            </motion.div>
          </NarrativeBlock>
        </motion.section>
      )}
    </div>
  );
}
