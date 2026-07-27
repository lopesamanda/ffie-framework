import type { CardCategory } from "@/data/narrative-cards";

/** Figma register tile + card accent colors (Foundations / Orientation frame). */
export const CATEGORY_STYLES: Record<
  CardCategory,
  {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    /** Solid fill for Oracle Draw face-down cover (Figma Cards frame). */
    coverFill: string;
    coverText: string;
  }
> = {
  risk: {
    bg: "#fdf1ee",
    border: "#c8472a",
    text: "#c8472a",
    iconBg: "rgba(200,71,42,0.13)",
    coverFill: "#c8472a",
    coverText: "rgba(255,255,255,0.92)",
  },
  benefit: {
    bg: "#fdf8ec",
    border: "#c48a1a",
    text: "#c48a1a",
    iconBg: "rgba(196,138,26,0.13)",
    coverFill: "#c48a1a",
    coverText: "rgba(255,255,255,0.92)",
  },
  trust: {
    bg: "#eef0f9",
    border: "#1a2870",
    text: "#1a2870",
    iconBg: "rgba(26,40,112,0.13)",
    coverFill: "#1a2870",
    coverText: "rgba(255,255,255,0.92)",
  },
  barrier: {
    bg: "#fdedf7",
    border: "#c22b7a",
    text: "#c22b7a",
    iconBg: "rgba(194,43,122,0.13)",
    coverFill: "#c22b7a",
    coverText: "rgba(255,255,255,0.92)",
  },
  transversal: {
    bg: "#edf7f1",
    border: "rgba(44,138,82,0.19)",
    text: "#2c8a52",
    iconBg: "rgba(44,138,82,0.13)",
    coverFill: "#2c8a52",
    coverText: "rgba(255,255,255,0.92)",
  },
};

/** Uppercase Oracle Draw category labels (Figma Cards frame). */
export const ORACLE_CATEGORY_LABELS: Record<CardCategory, string> = {
  risk: "AI Risks",
  benefit: "AI Benefits",
  trust: "Trust in AI",
  barrier: "Ecosystem Barriers",
  transversal: "Environmental Impact",
};

/** Small category mark beside the label on revealed cards. */
export const ORACLE_CATEGORY_ICONS: Record<CardCategory, string> = {
  risk: "⚠",
  benefit: "✦",
  trust: "◆",
  barrier: "⊘",
  transversal: "❧",
};

/** Figma Cards frame measurements */
export const ORACLE_CARD = {
  height: 280,
  radius: 12,
  gap: 20,
  accentBar: 3,
} as const;
