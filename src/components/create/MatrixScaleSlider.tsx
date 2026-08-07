"use client";

import { FFIE_CARD_TEXT } from "@/lib/card-layout";

type MatrixScaleSliderProps = {
  question: string;
  lowLabel: string;
  highLabel: string;
  value: number | null;
  onChange: (value: number) => void;
};

/** Percent toward the high pole (0 = fully low, 100 = fully high). */
export function percentTowardHigh(percent: number): number {
  return Math.round(Math.min(100, Math.max(0, percent)));
}

export function MatrixScaleSlider({
  question,
  lowLabel,
  highLabel,
  value,
  onChange,
}: MatrixScaleSliderProps) {
  const questionId = `matrix-slider-${question.slice(0, 24).replace(/\W+/g, "-")}`;
  const current = value ?? 50;
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
          min={0}
          max={100}
          step={1}
          value={current}
          onChange={(event) =>
            onChange(Number.parseFloat(event.target.value))
          }
          aria-labelledby={questionId}
          aria-valuemin={0}
          aria-valuemax={100}
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
