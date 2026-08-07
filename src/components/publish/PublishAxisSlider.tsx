"use client";

type PublishAxisSliderProps = {
  axis: "X" | "Y";
  eyebrow: string;
  question: string;
  lowLabel: string;
  highLabel: string;
  feedbackHigh: string;
  value: number | null;
  onChange: (value: number) => void;
};

export function PublishAxisSlider({
  axis,
  eyebrow,
  question,
  lowLabel,
  highLabel,
  feedbackHigh,
  value,
  onChange,
}: PublishAxisSliderProps) {
  const current = value ?? 50;
  const towardHigh = Math.round(Math.min(100, Math.max(0, current)));

  return (
    <div className="border-b border-ffie-line/70 pb-8 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-5 items-center justify-center rounded bg-[#eee9fd] font-display text-[10px] font-extrabold text-[#5236a8]">
          {axis}
        </span>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-accent">
          {eyebrow}
        </p>
      </div>

      <p className="mt-5 max-w-prose text-sm leading-relaxed text-ffie-ink/70">
        {question}
      </p>

      <div className="mt-5 flex items-center gap-3.5">
        <span className="min-w-[5.25rem] text-right text-[11px] font-semibold text-ffie-muted">
          {lowLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={current}
          onChange={(event) =>
            onChange(Number.parseFloat(event.target.value))
          }
          aria-label={question}
          className="h-0.5 flex-1 cursor-pointer appearance-none rounded-full bg-ffie-line accent-ffie-accent"
        />
        <span className="min-w-[5.25rem] text-[11px] font-semibold text-ffie-muted">
          {highLabel}
        </span>
      </div>

      <div className="mt-2 flex justify-center">
        <span className="rounded border border-[#dcd7f7] bg-[#f6f4ff] px-2 py-0.5 font-mono text-[10px] text-ffie-accent">
          {towardHigh}% toward {feedbackHigh}
        </span>
      </div>
    </div>
  );
}
