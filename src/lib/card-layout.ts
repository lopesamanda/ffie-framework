/** Shared FFIE card layout — Oracle Draw reveal is the reference. */
export const FFIE_CARD = {
  radius: 12,
  paddingX: 18,
  paddingTop: 12,
  paddingBottom: 16,
  accentBar: 3,
  minHeight: 280,
  gap: 20,
} as const;

/** Prevents text from breaking out of card bounds at narrow widths. */
export const FFIE_CARD_TEXT =
  "min-w-0 break-words [overflow-wrap:anywhere]";

export const ffieCardShell =
  "rounded-[12px] border-2 border-[rgba(35,19,82,0.07)] bg-white shadow-[0_2px_8px_rgba(35,19,82,0.06)]";

export const ffieCardBody = "px-[18px] pb-4 pt-3";

export const ffieCardCategory =
  "text-[10px] font-medium uppercase tracking-[0.15em]";

export const ffieCardTitle =
  "font-display text-[15px] font-bold leading-[1.25] text-[#231352]";

export const ffieCardDescription =
  "text-[12px] italic leading-[1.6] text-[rgba(35,19,82,0.55)]";

export const ffieCardDivider = "h-px w-full bg-[rgba(35,19,82,0.08)]";

export const ffieCardSectionLabel =
  "text-[10px] font-medium uppercase tracking-[0.15em] text-[#231352]";

export const ffieCardTension = "text-[11px] font-bold leading-snug";

/** Tinted card shell (category-colored background). */
export function ffieCardTintedShell(borderColor: string, bgColor: string) {
  return {
    borderRadius: FFIE_CARD.radius,
    borderWidth: 2,
    borderColor,
    backgroundColor: bgColor,
    boxShadow: "0 2px 8px rgba(35, 19, 82, 0.06)",
  } as const;
}
