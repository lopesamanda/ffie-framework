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
  /** Stacked textarea — wraps long placeholders instead of truncating. */
  layout?: "inline" | "stacked";
};

const INLINE_BLANK =
  "mx-1 inline-block min-w-[10ch] max-w-full border-b-2 border-ffie-ink/25 bg-transparent px-1 py-0.5 font-medium text-ffie-ink outline-none transition placeholder:font-normal placeholder:text-ffie-muted/55 focus:border-ffie-accent";

const STACKED_BLANK =
  "w-full resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm leading-relaxed text-ffie-ink outline-none transition placeholder:text-ffie-muted/70 focus:border-ffie-accent/40";

export function NarrativeBlank({
  before,
  after,
  value,
  onChange,
  onBlur,
  placeholder,
  inputMode = "text",
  className = "",
  layout = "inline",
}: NarrativeBlankProps) {
  if (layout === "stacked") {
    return (
      <div className={`space-y-2 ${className}`}>
        {(before || after) && (
          <p className="text-sm leading-relaxed text-ffie-ink sm:text-base">
            {before}
            {after}
          </p>
        )}
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={2}
          className={STACKED_BLANK}
          aria-label={placeholder ?? "Complete the sentence"}
        />
      </div>
    );
  }

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
        className={INLINE_BLANK}
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
