"use client";

import type { MatrixScaleScore } from "@/lib/journey/types";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";
import { SettleButton } from "@/components/motion/SettleButton";

const SCORES: MatrixScaleScore[] = [1, 2, 3, 4, 5, 6];

type MatrixScaleQuestionProps = {
  question: string;
  lowLabel: string;
  highLabel: string;
  value: MatrixScaleScore | null;
  onChange: (value: MatrixScaleScore) => void;
};

export function MatrixScaleQuestion({
  question,
  lowLabel,
  highLabel,
  value,
  onChange,
}: MatrixScaleQuestionProps) {
  const questionId = `matrix-scale-${question.slice(0, 24).replace(/\W+/g, "-")}`;

  return (
    <fieldset className="w-full min-w-0 space-y-4 rounded-[12px] border border-ffie-line bg-ffie-surface p-5 shadow-[0_2px_8px_rgba(35,19,82,0.04)]">
      <legend className="sr-only">{question}</legend>
      <p
        id={questionId}
        className={`text-sm font-medium leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
      >
        {question}
      </p>

      <div
        className="flex w-full min-w-0 flex-wrap justify-center gap-2 sm:justify-between sm:gap-1"
        role="radiogroup"
        aria-labelledby={questionId}
      >
        {SCORES.map((score) => {
          const selected = value === score;
          return (
            <SettleButton
              key={score}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(score)}
              className={`flex h-11 min-w-[2.75rem] flex-1 items-center justify-center rounded-full border text-sm font-semibold transition sm:flex-none sm:basis-11 ${
                selected
                  ? "border-ffie-ink bg-ffie-ink text-ffie-bg shadow-[0_2px_6px_rgba(35,19,82,0.2)]"
                  : "border-ffie-line bg-ffie-bg text-ffie-muted hover:border-ffie-accent/40 hover:text-ffie-ink"
              }`}
            >
              {score}
            </SettleButton>
          );
        })}
      </div>

      <div className="grid w-full min-w-0 grid-cols-2 gap-3 text-xs leading-snug text-ffie-muted">
        <span className={`text-left ${FFIE_CARD_TEXT}`}>1 — {lowLabel}</span>
        <span className={`text-right ${FFIE_CARD_TEXT}`}>6 — {highLabel}</span>
      </div>
    </fieldset>
  );
}
