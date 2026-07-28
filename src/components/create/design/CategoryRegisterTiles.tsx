import { ENVIRONMENTAL_IMPACT_CARD, registerExamplePreviews } from "@/data/narrative-cards";
import type { CardCategory } from "@/data/narrative-cards";
import { NarrativeCardFace } from "@/components/create/NarrativeCardFace";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardSectionLabel,
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

function RegisterExamplesPreview({ examples }: { examples: string[] }) {
  if (examples.length === 0) return null;

  return (
    <>
      <p className={`mt-3 ${ffieCardSectionLabel}`}>Examples</p>
      <ul className="mt-2 space-y-1.5">
        {examples.map((example) => (
          <li
            key={example}
            className={`text-[12px] leading-relaxed text-[rgba(35,19,82,0.55)] before:mr-1.5 before:content-['·'] ${FFIE_CARD_TEXT}`}
          >
            {example}
          </li>
        ))}
      </ul>
    </>
  );
}

export function CategoryRegisterTiles() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {REGISTER.map(({ category, title, description }) => {
        const style = CATEGORY_STYLES[category];
        const examples = registerExamplePreviews(category);

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
            <RegisterExamplesPreview examples={examples} />
          </div>
        );
      })}
    </div>
  );
}

export function EnvironmentalBanner() {
  return (
    <div className="mt-4">
      <NarrativeCardFace card={ENVIRONMENTAL_IMPACT_CARD} />
    </div>
  );
}
