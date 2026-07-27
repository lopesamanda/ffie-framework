import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_LABELS } from "@/data/narrative-cards";
import { CATEGORY_STYLES } from "@/lib/category-styles";

export function NarrativeCardFace({
  card,
  revealed = true,
  fixedLens = false,
  showReflection = false,
  embedded = false,
}: {
  card: NarrativeCard;
  revealed?: boolean;
  fixedLens?: boolean;
  /** Show per-card reflection question (Oracle Draw reveal moment) */
  showReflection?: boolean;
  /** Strip outer chrome when nested inside OracleCard */
  embedded?: boolean;
}) {
  const style = CATEGORY_STYLES[card.category];

  const shellClass = embedded
    ? "flex h-full flex-col"
    : "flex min-h-[140px] flex-col rounded-xl border-2 shadow-[0_4px_16px_rgba(35,19,82,0.08)]";

  return (
    <div
      className={shellClass}
      style={
        embedded
          ? undefined
          : {
              backgroundColor: style.bg,
              borderColor: style.border,
            }
      }
    >
      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <span
          className="text-[9px] font-medium uppercase tracking-[0.12em]"
          style={{ color: style.text }}
        >
          {CATEGORY_LABELS[card.category]}
        </span>
        {fixedLens && (
          <span
            className="text-[9px] font-medium uppercase tracking-[0.12em]"
            style={{ color: style.text }}
          >
            Always applied
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-2">
        {revealed ? (
          <>
            <h3
              className="font-display text-base font-bold leading-snug"
              style={{ color: style.text }}
            >
              {card.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ffie-muted">
              {card.description}
            </p>
            {card.examples.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-ffie-line/60 pt-3">
                {card.examples.map((example) => (
                  <li
                    key={example}
                    className="text-xs leading-relaxed text-ffie-muted before:mr-1.5 before:content-['·']"
                    style={{ color: style.text }}
                  >
                    {example}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-auto pt-3 text-sm italic text-ffie-ink/80">
              {card.tension}
            </p>
            {showReflection && card.reflectionQuestion && (
              <blockquote className="mt-4 border-l-2 pl-3 text-sm leading-relaxed text-ffie-ink" style={{ borderColor: style.border }}>
                {card.reflectionQuestion}
              </blockquote>
            )}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-ffie-muted">
            · · ·
          </div>
        )}
      </div>
    </div>
  );
}
