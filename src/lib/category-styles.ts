import type { CardCategory } from "@/data/narrative-cards";

/** Figma register tile + card accent colors (Foundations / Orientation frame). */
export const CATEGORY_STYLES: Record<
  CardCategory,
  { bg: string; border: string; text: string; iconBg: string }
> = {
  risk: {
    bg: "#fdf1ee",
    border: "#c8472a",
    text: "#c8472a",
    iconBg: "rgba(200,71,42,0.13)",
  },
  benefit: {
    bg: "#fdf8ec",
    border: "#c48a1a",
    text: "#c48a1a",
    iconBg: "rgba(196,138,26,0.13)",
  },
  trust: {
    bg: "#eef0f9",
    border: "#1a2870",
    text: "#1a2870",
    iconBg: "rgba(26,40,112,0.13)",
  },
  barrier: {
    bg: "#fdedf7",
    border: "#c22b7a",
    text: "#c22b7a",
    iconBg: "rgba(194,43,122,0.13)",
  },
  transversal: {
    bg: "#edf7f1",
    border: "rgba(44,138,82,0.19)",
    text: "#2c8a52",
    iconBg: "rgba(44,138,82,0.13)",
  },
};
