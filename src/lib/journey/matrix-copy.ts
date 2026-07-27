import type { FutureQuadrant } from "@/types/future";

export const MATRIX_FRAMEWORK_INTRO =
  "This matrix is the organizing framework behind every future in FFIE. The horizontal axis maps System Logic — from Extractive to Emancipatory. The vertical axis maps Power Organization — from Hierarchical to Collective Care. Where a future lands here isn't a verdict — it's a position it can still move from.";

export const QUADRANT_DESCRIPTIONS: Record<FutureQuadrant, string> = {
  dominant_dystopian:
    "This is where power concentrates and value is extracted without consent. Technology here amplifies existing hierarchies instead of questioning them: efficiency and control are optimized for those who already hold power, while everyone else absorbs the cost. It's the most familiar future, because it's the one already being built by default.",
  techno_optimist:
    "This is where good intentions meet extractive foundations. Technology here is framed as care, inclusion, or empowerment — but it still runs on the same extractive logic: data taken without reciprocity, visibility without protection, participation without power. It's the future that feels progressive on the surface while the underlying system stays untouched.",
  fragmented:
    "This is where resistance exists but stays isolated. Technology here can genuinely challenge extractive logic — but without collective infrastructure to sustain it, emancipation becomes an individual burden instead of a shared practice. Small wins, no safety net.",
  feminist_preferred:
    "This is the quadrant where technology redistributes power, time, and care instead of concentrating them — the direction this framework points toward, not a place any of us have fully arrived.",
};
