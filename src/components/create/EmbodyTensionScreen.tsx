"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import { OracleFanRevealedCard } from "@/components/create/design/OracleDeckFan";
import type { CardHand } from "@/lib/journey/types";
import { verbFor, type CharacterPronouns } from "@/lib/journey/character-pronouns";

const REVEAL_PAUSE_MS = 700;

const EMBODY_PLACEHOLDERS = {
  benefit:
    "e.g., see more clients than he could manage alone",
  tradeoff: "e.g., double-checking his own numbers",
  hope: "e.g., this becomes something everyone can access, not just him",
  fear: "e.g., quietly replace his judgment with its own",
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
        <motion.div {...lineDrift(reduceMotion, 0)}>
          <NarrativeBlank
            before={`As a ${role}, Artificial Intelligence (AI) finally lets ${p.object} `}
            after={` — but somewhere in that trade, ${p.subject} stopped `}
            value={draft.aiFunction}
            onChange={(aiFunction) => onChange({ aiFunction })}
            onBlur={handleBenefitBlur}
            placeholder={EMBODY_PLACEHOLDERS.benefit}
          />
        </motion.div>
        <motion.div {...lineDrift(reduceMotion, 0.06)} className="mt-2">
          <NarrativeBlank
            before=""
            after="."
            value={draft.tradeoffLoss}
            onChange={(tradeoffLoss) => onChange({ tradeoffLoss })}
            onBlur={handleBenefitBlur}
            placeholder={EMBODY_PLACEHOLDERS.tradeoff}
          />
        </motion.div>
      </NarrativeBlock>

      {showDesire && (
        <motion.div
          ref={desireSectionRef}
          {...sectionReveal(reduceMotion)}
          className="rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft/35 px-4 py-4"
        >
          <NarrativeBlock className="border-0 bg-transparent p-0">
            <motion.div {...lineDrift(reduceMotion, 0.04)}>
              <NarrativeBlank
                before={`In ${p.possessive} work as ${role}, ${p.subject} still ${verbFor(p, "holds", "hold")} on to the hope that `}
                after="."
                value={draft.desire}
                onChange={(desire) => onChange({ desire })}
                onBlur={handleDesireBlur}
                placeholder={EMBODY_PLACEHOLDERS.hope}
              />
            </motion.div>
          </NarrativeBlock>
        </motion.div>
      )}

      {showFear && (
        <motion.div
          ref={fearSectionRef}
          {...sectionReveal(reduceMotion)}
          className="space-y-4"
        >
          <motion.p
            {...lineDrift(reduceMotion, 0)}
            className="text-sm leading-relaxed text-ffie-muted"
          >
            You drew these two tensions. Let them shape what {p.subject}{" "}
            {verbFor(p, "is", "are")} afraid of:
          </motion.p>
          {cardHand && (
            <motion.div
              {...lineDrift(reduceMotion, 0.05)}
              className="flex flex-wrap gap-3"
            >
              <OracleFanRevealedCard card={cardHand.risk} />
              <OracleFanRevealedCard card={cardHand.barrier} />
            </motion.div>
          )}
          <NarrativeBlock>
            <motion.div {...lineDrift(reduceMotion, 0.1)}>
              <NarrativeBlank
                before={`As a ${role}, what ${p.subject} ${verbFor(p, "fears", "fear")} most — whether from the technology itself, or from the ecosystem around it — is that Artificial Intelligence will `}
                after="."
                value={draft.fear}
                onChange={(fear) => onChange({ fear })}
                placeholder={EMBODY_PLACEHOLDERS.fear}
              />
            </motion.div>
          </NarrativeBlock>
        </motion.div>
      )}

      {showClosing && (
        <motion.p
          ref={closingRef}
          {...lineDrift(reduceMotion, 0.04)}
          className="text-sm italic leading-relaxed text-ffie-muted"
        >
          Hope and fear rarely take turns. Most people carry both at once.
        </motion.p>
      )}
    </div>
  );
}
