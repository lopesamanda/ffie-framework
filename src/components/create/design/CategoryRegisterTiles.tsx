import { ENVIRONMENTAL_IMPACT_CARD } from "@/data/narrative-cards";
import type { CardCategory } from "@/data/narrative-cards";
import { TransversalBadge } from "@/components/create/design/TransversalBadge";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardTintedShell,
} from "@/lib/card-layout";

const REGISTER: {
  category: CardCategory;
  title: string;
  description: string;
}[] = [
  {
    category: "risk",
    title: "AI Risks",
    description: "What could go wrong — structurally, not hypothetically.",
  },
  {
    category: "benefit",
    title: "AI Benefits",
    description: "What AI promises to deliver, and at what cost.",
  },
  {
    category: "trust",
    title: "Trust",
    description: "Who is believed, and who is excluded from belief.",
  },
  {
    category: "barrier",
    title: "Barriers",
    description: "What prevents access, agency, or exit.",
  },
];

export function CategoryRegisterTiles() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {REGISTER.map(({ category, title, description }) => {
        const style = CATEGORY_STYLES[category];

        return (
          <div
            key={category}
            className="px-[18px] py-4"
            style={ffieCardTintedShell(style.border, style.bg)}
          >
            <p
              className={`${ffieCardCategory} font-display font-bold`}
              style={{ color: style.text }}
            >
              {title}
            </p>
            <p className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}>
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function EnvironmentalBanner() {
  const card = ENVIRONMENTAL_IMPACT_CARD;
  const style = CATEGORY_STYLES.transversal;

  return (
    <div
      className="mt-4 px-[18px] py-4"
      style={ffieCardTintedShell(style.border, style.bg)}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <p
          className={`${ffieCardCategory} font-display font-bold`}
          style={{ color: style.text }}
        >
          Environmental Impact
        </p>
        <TransversalBadge />
      </div>
      <p className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}>
        {card.description}
      </p>
    </div>
  );
}
