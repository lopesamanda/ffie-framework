"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import { OracleFanRevealedCard } from "@/components/create/design/OracleDeckFan";
import { exampleGhostPhrase } from "@/lib/journey/example-ghost";
import type { CardHand } from "@/lib/journey/types";
import type { CharacterPronouns } from "@/lib/journey/character-pronouns";

const REVEAL_PAUSE_MS = 700;

const revealMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: "easeOut" as const },
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

type EmbodyTensionScreenProps = {
  draft: {
    aiFunction: string;
    tradeoffLoss: string;
    desire: string;
    fear: string;
  };
  role: string;
  cardHand: CardHand | null;
  p: CharacterPronouns;
  onChange: (patch: {
    aiFunction?: string;
    tradeoffLoss?: string;
    desire?: string;
    fear?: string;
  }) => void;
};

export function EmbodyTensionScreen({
  draft,
  role,
  cardHand,
  p,
  onChange,
}: EmbodyTensionScreenProps) {
  const reduceMotion = useReducedMotion();
  const desireSectionRef = useRef<HTMLDivElement>(null);
  const fearSectionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  const benefitFilled =
    draft.aiFunction.trim().length > 0 && draft.tradeoffLoss.trim().length > 0;
  const desireFilled = draft.desire.trim().length > 0;
  const fearFilled = draft.fear.trim().length > 0;

  const { revealed: showDesire, reveal: revealDesire } = useStickyReveal(
    desireFilled || benefitFilled,
  );
  const { revealed: showFear, reveal: revealFear } = useStickyReveal(
    fearFilled || desireFilled,
  );
  const { revealed: showClosing, reveal: revealClosing } = useStickyReveal(
    fearFilled,
  );

  const benefitPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desirePauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return;
    element.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    if (benefitFilled) {
      benefitPauseRef.current = setTimeout(revealDesire, REVEAL_PAUSE_MS);
    }
    return () => {
      if (benefitPauseRef.current) clearTimeout(benefitPauseRef.current);
    };
  }, [benefitFilled, revealDesire]);

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

  const handleBenefitBlur = () => {
    if (benefitFilled) revealDesire();
  };

  const handleDesireBlur = () => {
    if (desireFilled) revealFear();
  };

  const benefitGhost = cardHand
    ? exampleGhostPhrase(cardHand.benefit)
    : undefined;
  const tradeoffGhost = cardHand
    ? exampleGhostPhrase(cardHand.benefit, 1)
    : undefined;
  const desireGhost = cardHand ? exampleGhostPhrase(cardHand.trust) : undefined;
  const fearGhost = cardHand ? exampleGhostPhrase(cardHand.risk) : undefined;

  return (
    <div className="space-y-8">
      {cardHand && (
        <>
          <p className="text-sm leading-relaxed text-ffie-muted">
            You drew <strong className="text-ffie-ink">{cardHand.benefit.name}</strong>{" "}
            and <strong className="text-ffie-ink">{cardHand.trust.name}</strong>.
            Let them shape what {p.subject} gains, and what {p.subject} still hopes
            for:
          </p>
          <div className="flex flex-wrap gap-3">
            <OracleFanRevealedCard card={cardHand.benefit} />
            <OracleFanRevealedCard card={cardHand.trust} />
          </div>
        </>
      )}

      <NarrativeBlock>
        <NarrativeBlank
          before={`As a ${role}, and because of this, ${p.subject} can finally `}
          after={` — but somewhere in that trade, ${p.subject} stopped `}
          value={draft.aiFunction}
          onChange={(aiFunction) => onChange({ aiFunction })}
          onBlur={handleBenefitBlur}
          placeholder={benefitGhost}
        />
        <NarrativeBlank
          before=""
          after="."
          value={draft.tradeoffLoss}
          onChange={(tradeoffLoss) => onChange({ tradeoffLoss })}
          onBlur={handleBenefitBlur}
          placeholder={tradeoffGhost}
          className="mt-2"
        />
      </NarrativeBlock>

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
              before={`In ${p.possessive} work as ${role}, ${p.subject} still holds on to the hope that `}
              after="."
              value={draft.desire}
              onChange={(desire) => onChange({ desire })}
              onBlur={handleDesireBlur}
              placeholder={desireGhost}
            />
          </NarrativeBlock>
        </motion.div>
      )}

      {showFear && (
        <motion.div
          ref={fearSectionRef}
          initial={reduceMotion ? false : revealMotion.initial}
          animate={revealMotion.animate}
          transition={revealMotion.transition}
          className="space-y-4"
        >
          <p className="text-sm leading-relaxed text-ffie-muted">
            You drew these two tensions. Let them shape what {p.subject}&apos;s
            afraid of:
          </p>
          {cardHand && (
            <div className="flex flex-wrap gap-3">
              <OracleFanRevealedCard card={cardHand.risk} />
              <OracleFanRevealedCard card={cardHand.barrier} />
            </div>
          )}
          <NarrativeBlock>
            <NarrativeBlank
              before={`As a ${role}, what ${p.subject} fears most — whether from the technology itself, or from the ecosystem around it — is that AI will `}
              after="."
              value={draft.fear}
              onChange={(fear) => onChange({ fear })}
              placeholder={fearGhost}
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
