"use client";

import type { MatrixScaleScore } from "@/lib/journey/types";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";

type MatrixScaleSliderProps = {
  question: string;
  lowLabel: string;
  highLabel: string;
  value: MatrixScaleScore | null;
  onChange: (value: MatrixScaleScore) => void;
};

/** Percent toward the high pole (6 = 100%, 1 = 0%). */
export function percentTowardHigh(score: MatrixScaleScore): number {
  return Math.round(((score - 1) / 5) * 100);
}

export function MatrixScaleSlider({
  question,
  lowLabel,
  highLabel,
  value,
  onChange,
}: MatrixScaleSliderProps) {
  const questionId = `matrix-slider-${question.slice(0, 24).replace(/\W+/g, "-")}`;
  const current = value ?? 4;
  const towardHigh = percentTowardHigh(current);
  const towardLow = 100 - towardHigh;

  return (
    <fieldset className="w-full min-w-0 space-y-4 rounded-[12px] border border-ffie-line bg-ffie-surface p-5 shadow-[0_2px_8px_rgba(35,19,82,0.04)]">
      <legend className="sr-only">{question}</legend>
      <p
        id={questionId}
        className={`text-sm font-medium leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
      >
        {question}
      </p>

      <div className="space-y-3">
        <input
          type="range"
          min={1}
          max={6}
          step={1}
          value={current}
          onChange={(event) =>
            onChange(Number.parseInt(event.target.value, 10) as MatrixScaleScore)
          }
          aria-labelledby={questionId}
          aria-valuemin={1}
          aria-valuemax={6}
          aria-valuenow={current}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ffie-line accent-ffie-accent"
        />
        <div className="flex justify-between text-xs font-medium text-ffie-muted">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>

      <p className="text-center text-xs text-ffie-muted">
        {towardHigh}% toward {highLabel.toLowerCase()} · {towardLow}% toward{" "}
        {lowLabel.toLowerCase()}
      </p>
    </fieldset>
  );
}
