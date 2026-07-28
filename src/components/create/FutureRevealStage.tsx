"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import { MATRIX_FRAMEWORK_INTRO } from "@/lib/journey/matrix-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type Anchor = { x: number; y: number };

export function FutureRevealStage({
  draft,
  cardId = "future-output-card",
  children,
}: {
  draft: JourneyDraft;
  cardId?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [transformOrigin, setTransformOrigin] = useState<string>("center center");

  const handleDotClick = (dotCenter: Anchor) => {
    setAnchor(dotCenter);
    setCardRevealed(true);
  };

  useLayoutEffect(() => {
    if (!cardRevealed || !anchor || !stageRef.current || !cardRef.current) {
      return;
    }

    const stageRect = stageRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    const originX = anchor.x - (cardRect.left - stageRect.left);
    const originY = anchor.y - (cardRect.top - stageRect.top);
    setTransformOrigin(`${originX}px ${originY}px`);
  }, [anchor, cardRevealed]);

  return (
    <div ref={stageRef} className="space-y-6">
      <p className="max-w-3xl text-sm leading-relaxed text-ffie-muted">
        {MATRIX_FRAMEWORK_INTRO}
      </p>

      <InteractiveMatrixReveal
        position={draft.position}
        interactive={!cardRevealed}
        onDotClick={handleDotClick}
        prominent
        stageRef={stageRef}
      />

      {!cardRevealed && (
        <motion.p
          className="text-center text-base font-semibold text-ffie-accent md:text-lg"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.65, 1, 0.65], scale: [0.98, 1, 0.98] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Click the dot on the matrix to reveal your future.
        </motion.p>
      )}

      {cardRevealed && (
        <motion.div
          ref={cardRef}
          className="mx-auto w-full max-w-xl"
          style={{ transformOrigin }}
          initial={
            reduceMotion ? false : { scale: 0.06, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.52, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <FutureCardPreview
            draft={draft}
            id={cardId}
            compact
            revealAnimated={!reduceMotion}
            showCommonsNarrative
          />
        </motion.div>
      )}

      {cardRevealed && children}
    </div>
  );
}
