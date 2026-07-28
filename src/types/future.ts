export type FutureQuadrant =
  | "dominant_dystopian"
  | "techno_optimist"
  | "fragmented"
  | "feminist_preferred";

export type FutureStatus = "pending" | "published" | "rejected";

export type PowerPosition = "marginalized" | "hegemonic";

export type FutureCountry = "Brazil" | "Portugal";

export type PersonaSector =
  | "Finance"
  | "Health"
  | "Education"
  | "ESG"
  | "Mobility"
  | "Media"
  | "Retail/Commerce"
  | "Public Sector"
  | "Innovation"
  | "Deeptech"
  | "Other";

export type FutureCollection = "research_findings" | "future_commons";

export type FutureEntry = {
  id: string;
  collection: FutureCollection;
  title: string;
  narrative: string;
  reflectionQuestion: string;
  country: FutureCountry;
  year: number;
  character: {
    name: string;
    age: number;
    role: string;
    sector?: PersonaSector;
    aiFunction: string;
    desire: string;
    fear: string;
    values: string[];
  };
  artifact: {
    name: string;
    publicPromise: string;
    hiddenFunction: string;
    values?: string[];
  };
  tension: string;
  quadrant: FutureQuadrant;
  powerPosition: PowerPosition;
  position: { x: number; y: number };
  status: FutureStatus;
  imageUrl?: string;
  /** Oracle Draw synthesis — main sentence (card names). */
  drawSynthesis?: string;
  /** Secondary line listing card tensions. */
  drawSynthesisTensions?: string;
  /** ISO timestamp when published (Future Commons). */
  publishedAt?: string;
};

export const QUADRANT_LABELS: Record<FutureQuadrant, string> = {
  dominant_dystopian: "Dominant Dystopian Future",
  techno_optimist: "Naïve Techno-Optimist Future",
  fragmented: "Fragmented or Precarious Future",
  feminist_preferred: "Feminist Preferable Future",
};

/** Short labels for matrix corners where space is limited */
export const QUADRANT_MATRIX_LABELS: Record<FutureQuadrant, string> = {
  dominant_dystopian: "Dominant Dystopian",
  techno_optimist: "Naïve Techno-Optimist",
  fragmented: "Fragmented or Precarious",
  feminist_preferred: "Feminist Preferable",
};

/** Matrix quadrant fill colors (Critical Feminist Matrix) */
export const QUADRANT_COLORS: Record<FutureQuadrant, string> = {
  techno_optimist: "#dbeafe",
  feminist_preferred: "#eee9fd",
  dominant_dystopian: "#fee2e2",
  fragmented: "#fef9c3",
};

/** Accent text on quadrant backgrounds */
export const QUADRANT_TEXT_COLORS: Record<FutureQuadrant, string> = {
  techno_optimist: "#1e40af",
  feminist_preferred: "#6e52c4",
  dominant_dystopian: "#991b1b",
  fragmented: "#92400e",
};

/** Secondary ambient blob accent per quadrant (Future card background). */
export const QUADRANT_AMBIENT_ACCENTS: Record<FutureQuadrant, string> = {
  techno_optimist: "#93c5fd",
  feminist_preferred: "#a7f3d0",
  dominant_dystopian: "#fecaca",
  fragmented: "#fde68a",
};

export const COUNTRY_COLORS: Record<FutureCountry, string> = {
  Brazil: "#2d6a4f",
  Portugal: "#1d3557",
};
