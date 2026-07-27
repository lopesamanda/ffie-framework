"use client";

import type { LikertScore } from "@/lib/journey/types";

const SCORES: LikertScore[] = [1, 2, 3, 4, 5];

type LikertQuestionProps = {
  question: string;
  lowLabel: string;
  highLabel: string;
  value: LikertScore | null;
  onChange: (value: LikertScore) => void;
};

export function LikertQuestion({
  question,
  lowLabel,
  highLabel,
  value,
  onChange,
}: LikertQuestionProps) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-ffie-line bg-ffie-surface p-5 shadow-[0_2px_8px_rgba(35,19,82,0.04)]">
      <legend className="px-1 text-sm font-medium leading-relaxed text-ffie-ink">
        {question}
      </legend>

      <div
        className="flex justify-between gap-2"
        role="radiogroup"
        aria-label={question}
      >
        {SCORES.map((score) => {
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(score)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition ${
                selected
                  ? "border-ffie-ink bg-ffie-ink text-ffie-bg shadow-[0_2px_6px_rgba(35,19,82,0.2)]"
                  : "border-ffie-line bg-ffie-bg text-ffie-muted hover:border-ffie-accent/40 hover:text-ffie-ink"
              }`}
            >
              {score}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between gap-4 text-xs text-ffie-muted">
        <span className="max-w-[45%]">1 — {lowLabel}</span>
        <span className="max-w-[45%] text-right">5 — {highLabel}</span>
      </div>
    </fieldset>
  );
}
