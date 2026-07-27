import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES } from "@/lib/category-styles";

/** Minimal card glance tag for Embody reference prompts (Figma spec). */
export function CardReferenceTag({ card }: { card: NarrativeCard }) {
  const style = CATEGORY_STYLES[card.category];

  return (
    <span
      className="inline-flex max-w-[220px] flex-col rounded-lg border px-3 py-2 text-left"
      style={{
        borderColor: style.border,
        backgroundColor: style.bg,
      }}
    >
      <span
        className="text-xs font-bold leading-snug"
        style={{ color: style.text }}
      >
        {card.name}
      </span>
      <span className="mt-0.5 text-[10px] italic leading-snug text-[rgba(35,19,82,0.55)]">
        {card.tension}
      </span>
    </span>
  );
}
