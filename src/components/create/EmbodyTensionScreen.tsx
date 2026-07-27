"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import { OracleFanRevealedCard } from "@/components/create/design/OracleDeckFan";
import type { CardHand } from "@/lib/journey/types";
import type { CharacterPronouns } from "@/lib/journey/character-pronouns";

const REVEAL_PAUSE_MS = 700;

const revealMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: "easeOut" as const },
};

function RevealedOracleCard({ card }: { card: CardHand["benefit"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : revealMotion.initial}
      animate={revealMotion.animate}
      transition={revealMotion.transition}
      className="w-fit"
    >
      <OracleFanRevealedCard card={card} />
    </motion.div>
  );
}

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

type EmbodyTensionScreenProps = {
  draft: {
    aiFunction: string;
    desire: string;
    fear: string;
  };
  cardHand: CardHand | null;
  p: CharacterPronouns;
  onChange: (patch: {
    aiFunction?: string;
    desire?: string;
    fear?: string;
  }) => void;
};

export function EmbodyTensionScreen({
  draft,
  cardHand,
  p,
  onChange,
}: EmbodyTensionScreenProps) {
  const reduceMotion = useReducedMotion();
  const desireSectionRef = useRef<HTMLDivElement>(null);
  const fearSectionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  const aiFilled = draft.aiFunction.trim().length > 0;
  const desireFilled = draft.desire.trim().length > 0;
  const fearFilled = draft.fear.trim().length > 0;

  const { revealed: showDesire, reveal: revealDesire } = useStickyReveal(
    desireFilled || aiFilled,
  );
  const { revealed: showFear, reveal: revealFear } = useStickyReveal(
    fearFilled || desireFilled,
  );
  const { revealed: showClosing, reveal: revealClosing } = useStickyReveal(
    fearFilled,
  );

  const aiPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desirePauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return;
    element.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (aiFilled) {
      aiPauseRef.current = setTimeout(revealDesire, REVEAL_PAUSE_MS);
    }
    return () => {
      if (aiPauseRef.current) clearTimeout(aiPauseRef.current);
    };
  }, [aiFilled, revealDesire]);

  useEffect(() => {
    if (desireFilled) {
      desirePauseRef.current = setTimeout(revealFear, REVEAL_PAUSE_MS);
    }
    return () => {
      if (desirePauseRef.current) clearTimeout(desirePauseRef.current);
    };
  }, [desireFilled, revealFear]);

  useEffect(() => {
    if (fearFilled) {
      const timer = setTimeout(revealClosing, REVEAL_PAUSE_MS);
      return () => clearTimeout(timer);
    }
  }, [fearFilled, revealClosing]);

  useEffect(() => {
    if (showDesire) scrollTo(desireSectionRef.current);
  }, [showDesire, reduceMotion]);

  useEffect(() => {
    if (showFear) scrollTo(fearSectionRef.current);
  }, [showFear, reduceMotion]);

  useEffect(() => {
    if (showClosing) scrollTo(closingRef.current);
  }, [showClosing, reduceMotion]);

  const handleAiBlur = () => {
    if (aiFilled) revealDesire();
  };

  const handleDesireBlur = () => {
    if (desireFilled) revealFear();
  };

  return (
    <div className="space-y-8">
      {/* AI function + Benefit card */}
      <div className="space-y-4">
        {cardHand && <RevealedOracleCard card={cardHand.benefit} />}
        <NarrativeBlock>
          <NarrativeBlank
            before={`Because of this, ${p.subject} can finally `}
            after={` — but what did ${p.subject} have to give up, or give away, to get it?`}
            value={draft.aiFunction}
            onChange={(aiFunction) => onChange({ aiFunction })}
            onBlur={handleAiBlur}
            placeholder={`what ${p.possessive} gains`}
          />
        </NarrativeBlock>
      </div>

      {/* Desire — personal pause, soft violet tint */}
      {showDesire && (
        <motion.div
          ref={desireSectionRef}
          initial={reduceMotion ? false : revealMotion.initial}
          animate={revealMotion.animate}
          transition={revealMotion.transition}
          className="rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft/35 px-4 py-4"
        >
          <NarrativeBlock className="border-0 bg-transparent p-0">
            <NarrativeBlank
              before={`${p.subjectCap} still holds on to the hope that `}
              after="."
              value={draft.desire}
              onChange={(desire) => onChange({ desire })}
              onBlur={handleDesireBlur}
              placeholder={`${p.possessive} deepest hope`}
            />
          </NarrativeBlock>
        </motion.div>
      )}

      {/* Fear + Risk & Barrier cards */}
      {showFear && (
        <motion.div
          ref={fearSectionRef}
          initial={reduceMotion ? false : revealMotion.initial}
          animate={revealMotion.animate}
          transition={revealMotion.transition}
          className="space-y-4"
        >
          {cardHand && (
            <div className="flex flex-wrap gap-3">
              <OracleFanRevealedCard card={cardHand.risk} />
              <OracleFanRevealedCard card={cardHand.barrier} />
            </div>
          )}
          <NarrativeBlock>
            <NarrativeBlank
              before={`What ${p.subject} fears most — whether from the technology itself, or from the ecosystem around it — is that AI will `}
              after="."
              value={draft.fear}
              onChange={(fear) => onChange({ fear })}
              placeholder={`${p.possessive} greatest fear`}
            />
          </NarrativeBlock>
        </motion.div>
      )}

      {showClosing && (
        <motion.p
          ref={closingRef}
          initial={reduceMotion ? false : revealMotion.initial}
          animate={revealMotion.animate}
          transition={revealMotion.transition}
          className="text-sm italic leading-relaxed text-ffie-muted"
        >
          Hope and fear rarely take turns. Most people carry both at once.
        </motion.p>
      )}
    </div>
  );
}
