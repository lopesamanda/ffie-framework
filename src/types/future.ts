export type FutureQuadrant =
  | "dominant_dystopian"
  | "techno_optimist"
  | "fragmented"
  | "feminist_preferred";

export type FutureStatus = "pending" | "published" | "rejected";

export type PowerPosition = "marginalized" | "hegemonic";

export type FutureCountry = "Brazil" | "Portugal";

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
    aiFunction: string;
    desire: string;
    fear: string;
    values: string[];
  };
  artifact: {
    name: string;
    publicPromise: string;
    hiddenFunction: string;
  };
  tension: string;
  quadrant: FutureQuadrant;
  powerPosition: PowerPosition;
  position: { x: number; y: number };
  status: FutureStatus;
  imageUrl?: string;
};

export const QUADRANT_LABELS: Record<FutureQuadrant, string> = {
  dominant_dystopian: "Dominant Dystopian Future",
  techno_optimist: "Naïve Techno-Optimist Future",
  fragmented: "Fragmented / Precarious Future",
  feminist_preferred: "Feminist Preferable Future",
};

export const COUNTRY_COLORS: Record<FutureCountry, string> = {
  Brazil: "#2d6a4f",
  Portugal: "#1d3557",
};
