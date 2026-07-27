import { CATEGORY_STYLES } from "@/lib/category-styles";
import type { CardCategory } from "@/data/narrative-cards";

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
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: style.bg,
              borderColor: style.border,
            }}
          >
            <p
              className="font-display text-sm font-bold"
              style={{ color: style.text }}
            >
              {title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ffie-muted">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function EnvironmentalBanner() {
  const style = CATEGORY_STYLES.transversal;
  return (
    <div
      className="mt-4 flex items-start gap-3 rounded-xl border px-4 py-3"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      <span
        className="mt-0.5 size-2 shrink-0 rounded-full"
        style={{ backgroundColor: style.text }}
      />
      <div>
        <p
          className="font-display text-sm font-bold"
          style={{ color: style.text }}
        >
          Environmental Impact — always applied
        </p>
        <p className="mt-0.5 text-xs text-ffie-muted">
          This lens is never drawn from the deck. It is woven into every future
          you build.
        </p>
      </div>
    </div>
  );
}
