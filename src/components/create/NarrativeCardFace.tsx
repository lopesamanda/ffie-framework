import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_LABELS } from "@/data/narrative-cards";

export function NarrativeCardFace({
  card,
  revealed = true,
  fixedLens = false,
}: {
  card: NarrativeCard;
  revealed?: boolean;
  fixedLens?: boolean;
}) {
  return (
    <div
      className="flex min-h-[140px] flex-col rounded-xl border border-ffie-line bg-ffie-surface shadow-sm"
      style={{ borderTopWidth: 4, borderTopColor: card.color }}
    >
      <div className="flex items-center justify-between gap-2 px-4 pt-3">
        <span className="text-[10px] font-medium uppercase tracking-wide text-ffie-muted">
          {CATEGORY_LABELS[card.category]}
        </span>
        {fixedLens && (
          <span className="text-[10px] uppercase tracking-wide text-ffie-accent">
            Fixed lens
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        {revealed ? (
          <>
            <h3 className="text-base font-semibold tracking-tight">{card.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ffie-muted">
              {card.description}
            </p>
            <p className="mt-auto pt-3 text-sm italic text-ffie-ink">
              {card.tension}
            </p>
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
