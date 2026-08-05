"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import {
  MatrixPointInteraction,
  type MatrixAnchor,
} from "@/components/matrix/MatrixPointInteraction";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [transformOrigin, setTransformOrigin] = useState<string>("center center");
  const [quadrantDetailOpen, setQuadrantDetailOpen] = useState(false);
  const [quadrantAnchor, setQuadrantAnchor] = useState<MatrixAnchor | null>(
    null,
  );

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
        <div className="mx-auto max-w-xl space-y-6">
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

          <p className="text-sm leading-relaxed text-ffie-muted">
            {MATRIX_FRAMEWORK_INTRO}
          </p>

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
      )}

      {cardRevealed && (
        <div className="space-y-8">
          <div className="mx-auto w-full max-w-2xl">
            <MatrixPointInteraction
              open={quadrantDetailOpen}
              anchor={quadrantAnchor}
              previewLabel={formatQuadrantLabel(quadrant)}
              title={formatQuadrantLabel(quadrant)}
              onClose={() => {
                setQuadrantDetailOpen(false);
                setQuadrantAnchor(null);
              }}
              childrenContent={
                <p className="leading-relaxed text-ffie-muted">
                  {QUADRANT_DESCRIPTIONS[quadrant]}
                </p>
              }
            >
              <InteractiveMatrixReveal
                position={draft.position}
                hidePlacementCaption
                hideQuadrantCopy
                prominent
                onPositionDotClick={(nextAnchor) => {
                  setQuadrantAnchor(nextAnchor);
                  setQuadrantDetailOpen(true);
                }}
                className="w-full"
              />
            </MatrixPointInteraction>

            <p className="mt-3 text-center text-xs text-ffie-muted">
              Tap the dot to read your scenario placement on the matrix.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <motion.div
              ref={cardRef}
              className="px-1 sm:px-0"
              style={{ transformOrigin }}
              initial={reduceMotion ? false : { scale: 0.06, opacity: 0 }}
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

          <div className="w-full space-y-8 pt-2">
            <div
              className="flex items-center justify-center gap-1.5 py-1"
              aria-hidden
            >
              {["#1e40af", "#6e52c4", "#991b1b", "#92400e"].flatMap((color) =>
                Array.from({ length: 4 }, (_, i) => (
                  <span
                    key={`${color}-${i}`}
                    className="size-[3px] rounded-full opacity-45"
                    style={{ backgroundColor: color }}
                  />
                )),
              )}
            </div>

            <div className="w-full">
              <h3 className="font-display text-base font-semibold text-ffie-ink">
                How can you work with this future?
              </h3>
              <div className="mt-5">
                <FutureWorkActionsGrid reduceMotion={reduceMotion} />
              </div>
            </div>

            {actionFooter && <div className="w-full">{actionFooter}</div>}
          </div>

          {children}
        </div>
      )}
    </div>
  );
}
