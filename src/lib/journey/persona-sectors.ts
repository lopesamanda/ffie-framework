export const PERSONA_SECTOR_OPTIONS = [
  "Finance",
  "Health",
  "Education",
  "ESG",
  "Mobility",
  "Media",
  "Retail/Commerce",
  "Public Sector",
  "Innovation",
  "Deeptech",
  "Other",
] as const;

export type PersonaSector = (typeof PERSONA_SECTOR_OPTIONS)[number];

export const SECTOR_COLORS: Record<PersonaSector, string> = {
  Finance: "#1d4ed8",
  Health: "#dc2626",
  Education: "#7c3aed",
  ESG: "#059669",
  Mobility: "#0891b2",
  Media: "#db2777",
  "Retail/Commerce": "#ea580c",
  "Public Sector": "#475569",
  Innovation: "#6e52c4",
  Deeptech: "#0f766e",
  Other: "#78716c",
};

/** Sample matrix positions for the home teaser when live data is sparse. */
export const SAMPLE_SECTOR_MATRIX_DOTS: {
  sector: PersonaSector;
  x: number;
  y: number;
}[] = [
  { sector: "Finance", x: 0.72, y: 0.38 },
  { sector: "Finance", x: 0.65, y: 0.52 },
  { sector: "Health", x: 0.28, y: 0.68 },
  { sector: "Health", x: 0.35, y: 0.55 },
  { sector: "Education", x: 0.58, y: 0.72 },
  { sector: "ESG", x: 0.48, y: 0.82 },
  { sector: "Mobility", x: 0.42, y: 0.35 },
  { sector: "Media", x: 0.22, y: 0.42 },
  { sector: "Retail/Commerce", x: 0.55, y: 0.28 },
  { sector: "Public Sector", x: 0.38, y: 0.48 },
  { sector: "Innovation", x: 0.68, y: 0.44 },
  { sector: "Deeptech", x: 0.52, y: 0.58 },
  { sector: "Other", x: 0.62, y: 0.62 },
];
