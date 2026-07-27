import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES, ORACLE_CATEGORY_LABELS } from "@/lib/category-styles";
import {
  FFIE_CARD,
  FFIE_CARD_TEXT,
  ffieCardBody,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardTension,
  ffieCardTitle,
  ffieCardTintedShell,
} from "@/lib/card-layout";

export function NarrativeCardFace({
  card,
  revealed = true,
  showReflection = false,
  embedded = false,
}: {
  card: NarrativeCard;
  revealed?: boolean;
  showReflection?: boolean;
  /** Strip outer chrome when nested inside OracleCard */
  embedded?: boolean;
}) {
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();

  if (embedded) {
    return (
      <div className="flex flex-col">
        {revealed ? (
          <NarrativeCardContent
            card={card}
            label={label}
            style={style}
            showReflection={showReflection}
          />
        ) : (
          <div className="flex items-center justify-center py-8 text-sm text-ffie-muted">
            · · ·
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-visible shadow-[0_2px_8px_rgba(35,19,82,0.06)]"
      style={{
        ...ffieCardTintedShell(style.border, style.bg),
        minHeight: FFIE_CARD.minHeight,
      }}
    >
      <div
        className="shrink-0"
        style={{ height: FFIE_CARD.accentBar, backgroundColor: style.text }}
      />
      <div className={`flex flex-col ${ffieCardBody}`}>
        {revealed ? (
          <NarrativeCardContent
            card={card}
            label={label}
            style={style}
            showReflection={showReflection}
          />
        ) : (
          <div className="flex items-center justify-center py-8 text-sm text-ffie-muted">
            · · ·
          </div>
        )}
      </div>
    </div>
  );
}

function NarrativeCardContent({
  card,
  label,
  style,
  showReflection,
}: {
  card: NarrativeCard;
  label: string;
  style: (typeof CATEGORY_STYLES)[keyof typeof CATEGORY_STYLES];
  showReflection: boolean;
}) {
  return (
    <>
      <span className={ffieCardCategory} style={{ color: style.text }}>
        {label}
      </span>

      <h3
        className={`mt-2 ${ffieCardTitle} ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.name}
      </h3>

      <div className={`my-3 ${ffieCardDivider}`} />

      <p className={`${ffieCardDescription} ${FFIE_CARD_TEXT}`}>
        {card.description}
      </p>

      {card.examples.length > 0 && (
        <>
          <div className={`my-3 ${ffieCardDivider}`} />
          <p className={ffieCardSectionLabel}>Examples</p>
          <ul className="mt-2 space-y-1.5">
            {card.examples.map((example) => (
              <li
                key={example}
                className={`text-[12px] leading-relaxed text-[rgba(35,19,82,0.55)] before:mr-1.5 before:content-['·'] ${FFIE_CARD_TEXT}`}
              >
                {example}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={`my-3 ${ffieCardDivider}`} />

      <p className={ffieCardSectionLabel}>Tension</p>
      <p
        className={`mt-1 ${ffieCardTension} ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.tension}
      </p>

      {showReflection && card.reflectionQuestion && (
        <>
          <div className={`my-3 ${ffieCardDivider}`} />
          <p className={ffieCardSectionLabel}>Reflection</p>
          <blockquote
            className={`mt-2 text-[12px] leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
          >
            {card.reflectionQuestion}
          </blockquote>
        </>
      )}
    </>
  );
}
