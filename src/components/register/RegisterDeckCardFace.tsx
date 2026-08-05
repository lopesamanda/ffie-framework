import { TransversalBadge } from "@/components/create/design/TransversalBadge";
import {
  CATEGORY_STYLES,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";
import type { RegisterDeckEntry } from "@/lib/register-deck-data";
import { RegisterCategoryMark } from "@/components/register/RegisterCategoryMark";

type RegisterDeckCardFaceProps = {
  entry: RegisterDeckEntry;
  variant: "cover" | "back" | "expanded";
  className?: string;
};

/** Shared register card faces — cover (deck front), back (flip), or expanded (Create intro). */
export function RegisterDeckCardFace({
  entry,
  variant,
  className = "",
}: RegisterDeckCardFaceProps) {
  const style = CATEGORY_STYLES[entry.category];
  const label = ORACLE_CATEGORY_LABELS[entry.category];
  const isTransversal = entry.category === "transversal";

  if (variant === "back") {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-xl px-4 py-5 text-center shadow-[0_8px_24px_rgba(35,19,82,0.2)] ${className}`}
        style={{ backgroundColor: style.coverFill, color: style.coverText }}
      >
        <p className="text-sm leading-snug font-medium">{entry.description}</p>
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div
        className={`flex h-full min-h-[200px] w-[148px] shrink-0 flex-col justify-between rounded-xl border border-white/20 px-3 py-4 shadow-[0_4px_16px_rgba(35,19,82,0.12)] sm:w-[168px] ${className}`}
        style={{ backgroundColor: style.bg }}
      >
        <div className="space-y-2">
          {isTransversal && <TransversalBadge className="max-w-full text-[8px]" />}
          <p
            className="font-display text-[11px] font-bold leading-tight sm:text-xs"
            style={{ color: style.text }}
          >
            {label}
          </p>
        </div>
        <RegisterCategoryMark category={entry.category} color={style.text} size={24} />
        <p className="text-[11px] leading-snug text-ffie-ink/85 sm:text-xs">
          {entry.description}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-between rounded-xl border border-white/20 px-3 py-4 shadow-[0_8px_24px_rgba(35,19,82,0.2)] ${className}`}
      style={{ backgroundColor: style.bg }}
    >
      <div className="flex w-full flex-col items-center gap-1.5">
        {isTransversal && <TransversalBadge className="text-[8px]" />}
        <span
          className="text-center text-[9px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: style.text }}
        >
          {label}
        </span>
      </div>
      <RegisterCategoryMark category={entry.category} color={style.text} />
      <span className="h-2" aria-hidden />
    </div>
  );
}
