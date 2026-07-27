"use client";

type NarrativeBlankProps = {
  before?: string;
  after?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  inputMode?: "text" | "numeric";
  className?: string;
};

const BLANK =
  "mx-1 inline-block min-w-[10ch] max-w-full border-b-2 border-ffie-ink/25 bg-transparent px-1 py-0.5 font-medium text-ffie-ink outline-none transition focus:border-ffie-accent";

export function NarrativeBlank({
  before,
  after,
  value,
  onChange,
  onBlur,
  placeholder,
  inputMode = "text",
  className = "",
}: NarrativeBlankProps) {
  return (
    <p
      className={`text-sm leading-relaxed text-ffie-ink sm:text-base ${className}`}
    >
      {before}
      <input
        type={inputMode === "numeric" ? "number" : "text"}
        inputMode={inputMode === "numeric" ? "numeric" : "text"}
        min={inputMode === "numeric" ? 1 : undefined}
        max={inputMode === "numeric" ? 120 : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={BLANK}
        aria-label={placeholder ?? "Complete the sentence"}
      />
      {after}
    </p>
  );
}

export function NarrativeBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-ffie-line/80 bg-ffie-surface/60 px-4 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
