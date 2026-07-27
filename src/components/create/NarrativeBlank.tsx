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

type NarrativeTextareaProps = {
  before?: string;
  after?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
};

const TEXTAREA =
  "mt-3 w-full resize-y rounded-lg border border-ffie-line bg-ffie-surface px-3 py-3 text-sm leading-relaxed text-ffie-ink outline-none transition placeholder:text-ffie-muted/70 focus:border-ffie-accent/40";

/** Multi-line narrative prompt with optional framing sentence. */
export function NarrativeTextarea({
  before,
  after,
  value,
  onChange,
  placeholder,
  rows = 5,
  className = "",
}: NarrativeTextareaProps) {
  return (
    <div className={className}>
      {before && (
        <p className="text-sm leading-relaxed text-ffie-ink sm:text-base">
          {before}
        </p>
      )}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={TEXTAREA}
        aria-label={placeholder ?? "Complete the response"}
      />
      {after && (
        <p className="mt-2 text-sm leading-relaxed text-ffie-ink sm:text-base">
          {after}
        </p>
      )}
    </div>
  );
}
