import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES, ORACLE_CATEGORY_LABELS } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDivider,
  ffieCardTension,
  ffieCardTitle,
} from "@/lib/card-layout";

/** Minimal card glance tag for Embody / artifact reference prompts. */
export function CardReferenceTag({
  card,
  compact = false,
}: {
  card: NarrativeCard;
  compact?: boolean;
}) {
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();

  if (compact) {
    return (
      <span
        className="inline-flex min-w-0 max-w-full flex-col rounded-lg border-2 px-3 py-2 text-left shadow-[0_2px_8px_rgba(35,19,82,0.06)]"
        style={{
          borderColor: style.border,
          backgroundColor: style.bg,
        }}
      >
        <span className={ffieCardCategory} style={{ color: style.text }}>
          {label}
        </span>
        <span
          className={`mt-1 text-xs font-semibold leading-snug ${FFIE_CARD_TEXT}`}
          style={{ color: style.text }}
        >
          {card.name}
        </span>
      </span>
    );
  }

  return (
    <span
      className="inline-flex min-w-0 max-w-full flex-col rounded-[12px] border-2 px-[18px] py-3 text-left shadow-[0_2px_8px_rgba(35,19,82,0.06)]"
      style={{
        borderColor: style.border,
        backgroundColor: style.bg,
      }}
    >
      <span className={ffieCardCategory} style={{ color: style.text }}>
        {label}
      </span>
      <span
        className={`mt-2 ${ffieCardTitle} ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.name}
      </span>
      <span className={`my-2 ${ffieCardDivider}`} />
      <span
        className={`${ffieCardTension} ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.tension}
      </span>
    </span>
  );
}
