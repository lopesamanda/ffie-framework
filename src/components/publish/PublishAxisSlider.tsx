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
    <div>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-5 items-center justify-center rounded bg-[#eee9fd] font-display text-[10px] font-extrabold text-[#5236a8]">
          {axis}
        </span>
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
          {eyebrow}
        </p>
      </div>

      <p className="pt-5 text-sm leading-[22.4px] text-[rgba(35,19,82,0.7)]">
        {question}
      </p>

      <div className="flex items-center gap-[14px] pt-[22px]">
        <span className="min-w-[5.25rem] text-right text-[11px] font-semibold text-[rgba(35,19,82,0.55)]">
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
          className="h-0.5 flex-1 cursor-pointer appearance-none rounded-full bg-[rgba(35,19,82,0.12)] accent-[#6e52c4]"
        />
        <span className="min-w-[5.25rem] text-[11px] font-semibold text-[rgba(35,19,82,0.55)]">
          {highLabel}
        </span>
      </div>

      <div className="flex justify-center pt-2">
        <span className="rounded border border-[#dcd7f7] bg-[#f6f4ff] px-2 py-1 font-mono text-[10px] leading-[14px] text-[#6e52c4]">
          {towardHigh}% toward {feedbackHigh}
        </span>
      </div>
    </div>
  );
}
