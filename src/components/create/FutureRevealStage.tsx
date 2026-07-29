"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { FutureWorkWithPanel } from "@/components/create/FutureWorkWithPanel";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import {
  MATRIX_FRAMEWORK_INTRO,
  QUADRANT_DESCRIPTIONS,
} from "@/lib/journey/matrix-copy";
import {
  formatQuadrantLabel,
  quadrantFromPosition,
} from "@/lib/journey/types";
import type { JourneyDraft } from "@/lib/journey/types";

type Anchor = { x: number; y: number };

export function FutureRevealStage({
  draft,
  cardId = "future-output-card",
  actionFooter,
  children,
}: {
  draft: JourneyDraft;
  cardId?: string;
  actionFooter?: ReactNode;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const outputLayoutRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [transformOrigin, setTransformOrigin] = useState<string>("center center");

  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);

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
    <div ref={stageRef} className="space-y-8">
      {!cardRevealed && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10 xl:gap-12">
          <InteractiveMatrixReveal
            position={draft.position}
            interactive
            onDotClick={handleDotClick}
            prominent
            hidePlacementCaption
            hideQuadrantCopy
            stageRef={stageRef}
            className="w-full"
          />

          <div className="flex flex-col justify-center space-y-6 lg:py-4">
            <p className="text-sm leading-relaxed text-ffie-muted">
              {MATRIX_FRAMEWORK_INTRO}
            </p>

            <div className="space-y-2 rounded-xl border border-ffie-line/70 bg-ffie-surface/60 px-5 py-4">
              <p className="font-display text-lg font-bold text-ffie-ink">
                {formatQuadrantLabel(quadrant)}
              </p>
              <p className="text-sm leading-relaxed text-ffie-muted">
                {QUADRANT_DESCRIPTIONS[quadrant]}
              </p>
            </div>

            <motion.p
              className="text-base font-semibold text-ffie-accent md:text-lg"
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
          </div>
        </div>
      )}

      {cardRevealed && (
        <div className="space-y-6">
          <div
            ref={outputLayoutRef}
            className="relative mx-auto w-full max-w-6xl"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-5 xl:gap-8">
              <div className="mx-auto w-full max-w-[240px] lg:mx-0 lg:max-w-none lg:pt-2">
                <InteractiveMatrixReveal
                  position={draft.position}
                  hidePlacementCaption
                  hideQuadrantCopy
                  className="w-full scale-[0.92] origin-top lg:scale-100"
                />
              </div>

              <div className="mx-auto w-full max-w-md shrink-0 lg:mx-0">
                <motion.div
                  ref={cardRef}
                  className="px-1 sm:px-0"
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
                    showCardTags
                  />
                </motion.div>
              </div>

              <FutureWorkWithPanel
                layoutRef={outputLayoutRef}
                sourceRef={cardRef}
              />
            </div>
          </div>

          {actionFooter && (
            <div className="mx-auto w-full max-w-6xl">{actionFooter}</div>
          )}

          {children}
        </div>
      )}
    </div>
  );
}
