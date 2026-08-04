"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const quadrantDescRef = useRef<HTMLDivElement>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [transformOrigin, setTransformOrigin] = useState<string>("center center");
  const [quadrantHighlighted, setQuadrantHighlighted] = useState(false);

  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);

  const handleDotClick = (dotCenter: Anchor) => {
    setAnchor(dotCenter);
    setCardRevealed(true);
  };

  const handlePositionDotClick = useCallback(() => {
    quadrantDescRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
    setQuadrantHighlighted(true);
    window.setTimeout(() => setQuadrantHighlighted(false), 2200);
  }, [reduceMotion]);

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
        <div className="space-y-8">
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)] lg:items-start lg:gap-10 xl:gap-12">
              <div className="mx-auto w-full max-w-[320px] lg:sticky lg:top-6 lg:mx-0 lg:max-w-none lg:self-start">
                <InteractiveMatrixReveal
                  position={draft.position}
                  hidePlacementCaption
                  hideQuadrantCopy
                  prominent
                  onPositionDotClick={handlePositionDotClick}
                  className="w-full origin-top lg:scale-[1.08]"
                />
                <div
                  ref={quadrantDescRef}
                  className={`mt-4 space-y-2 rounded-xl border px-4 py-3 transition-[background-color,border-color,box-shadow] duration-500 ${
                    quadrantHighlighted
                      ? "border-ffie-accent bg-ffie-accent-soft/45 shadow-[0_0_0_3px_rgba(110,82,196,0.18)]"
                      : "border-ffie-line/70 bg-ffie-surface/60"
                  }`}
                >
                  <p className="font-display text-base font-bold text-ffie-ink">
                    {formatQuadrantLabel(quadrant)}
                  </p>
                  <p className="text-sm leading-relaxed text-ffie-muted">
                    {QUADRANT_DESCRIPTIONS[quadrant]}
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-xl shrink-0 lg:mx-0 lg:max-w-none">
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
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl space-y-8">
            <div
              className="flex items-center justify-center gap-1.5 py-1"
              aria-hidden
            >
              {[
                "#1e40af",
                "#6e52c4",
                "#991b1b",
                "#92400e",
              ].flatMap((color) =>
                Array.from({ length: 4 }, (_, i) => (
                  <span
                    key={`${color}-${i}`}
                    className="size-[3px] rounded-full opacity-45"
                    style={{ backgroundColor: color }}
                  />
                )),
              )}
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-ffie-ink">
                How can you work with this future?
              </h3>
              <div className="mt-5">
                <FutureWorkActionsGrid reduceMotion={reduceMotion} />
              </div>
            </div>

            {actionFooter && (
              <div className="w-full max-w-md lg:ml-auto">{actionFooter}</div>
            )}
          </div>

          {children}
        </div>
      )}
    </div>
  );
}
