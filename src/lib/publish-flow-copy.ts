import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_MATRIX_LABELS } from "@/types/future";

/** Microcopy for standalone publish-flow routes (/matrix, /publish/review, /published). */
export const PUBLISH_FLOW = {
  matrix: {
    eyebrow: "SHARE · PLACE",
    heading: "Place it on the map.",
    subtitle:
      "Drag the lens or tap a quadrant on the Living Cartography. Your artifact lands where its system logic and power organization intersect.",
    axisHorizontal: "Extractive ↔ Emancipatory",
    axisVertical: "Hierarchical ↔ Collective Care",
    continue: "See your future →",
    summaryHeading: "Artifact summary",
    territoryLabel: "Territory / context",
    tagsLabel: "Value & parameter tags",
    guidanceLabel: "Positioning guidance",
    guidanceTemplate: (quadrant: string) =>
      `Placing this future in ${quadrant} suggests how its public promise and hidden trade-offs align with extraction, care, hierarchy, or collective decision-making.`,
    coordinatesLabel: "Matrix coordinates",
  },
  review: {
    eyebrow: "SHARE · REFLECT",
  },
  published: {
    eyebrow: "YOUR FUTURE",
  },
} as const;

export type NamedQuadrantSpec = {
  id: FutureQuadrant;
  corner: "tl" | "tr" | "bl" | "br";
  axisDescriptor: string;
  alias: string;
  /** Unit-space anchor when quadrant is clicked. */
  anchor: { x: number; y: number };
};

export const NAMED_QUADRANT_SPECS: NamedQuadrantSpec[] = [
  {
    id: "techno_optimist",
    corner: "tl",
    axisDescriptor: "Extractive · Collective Care",
    alias: "Naïve Techno-Optimist",
    anchor: { x: 0.28, y: 0.72 },
  },
  {
    id: "feminist_preferred",
    corner: "tr",
    axisDescriptor: "Emancipatory · Collective Care",
    alias: "Feminist Preferable",
    anchor: { x: 0.72, y: 0.72 },
  },
  {
    id: "dominant_dystopian",
    corner: "bl",
    axisDescriptor: "Extractive · Hierarchical",
    alias: "Dominant Dystopian",
    anchor: { x: 0.28, y: 0.28 },
  },
  {
    id: "fragmented",
    corner: "br",
    axisDescriptor: "Emancipatory · Hierarchical",
    alias: "Fragmented or Precarious",
    anchor: { x: 0.72, y: 0.28 },
  },
];

export function quadrantDisplayName(id: FutureQuadrant): string {
  return QUADRANT_MATRIX_LABELS[id];
}
