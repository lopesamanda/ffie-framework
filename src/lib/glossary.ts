import type { FutureQuadrant } from "@/types/future";

export type GlossaryTermId =
  | "livingCartography"
  | "anchorAFuture"
  | "diegeticArtifacts"
  | "intersectionalLenses"
  | "weaversAndGuardians"
  | "situatedKnowledge"
  | "tuneFrequencies"
  | "relationalCalibration";

export type GlossaryEntry = {
  id: GlossaryTermId;
  term: string;
  conventionalTerm: string;
  definition: string;
  reference: string;
  registerColor: string;
  /** Matrix quadrant tag for dictionary filter; null = applies everywhere. */
  quadrant: FutureQuadrant | null;
  provocativeQuestion: string;
};

export const GLOSSARY: Record<GlossaryTermId, GlossaryEntry> = {
  livingCartography: {
    id: "livingCartography",
    term: "Living Cartography",
    conventionalTerm: "Dashboard / Matrix",
    definition:
      "A dynamic topology mapping how power, collective care, and extractive logics intersect across territories.",
    reference: "Haraway — situated knowledges",
    registerColor: "border-indigo-400",
    quadrant: null,
    provocativeQuestion:
      "What would change if every map you used showed who benefits from staying lost?",
  },
  anchorAFuture: {
    id: "anchorAFuture",
    term: "Anchor a Future",
    conventionalTerm: "Submit / Publish",
    definition:
      "Depositing a speculative artifact into the Commons — not as data extraction, but as an act of shared memory.",
    reference: "Critical feminist commons",
    registerColor: "border-violet-400",
    quadrant: null,
    provocativeQuestion:
      "What makes a future worth placing on a map others can find?",
  },
  diegeticArtifacts: {
    id: "diegeticArtifacts",
    term: "Diegetic Artifacts",
    conventionalTerm: "Artifacts / Outputs",
    definition:
      "Tangible fragments from hypothetical futures, validated through participatory workshops in Recife and Lisbon.",
    reference: "Speculative design",
    registerColor: "border-amber-400",
    quadrant: "feminist_preferred",
    provocativeQuestion:
      "Which object in your daily life already tells a story about a future someone else wanted?",
  },
  intersectionalLenses: {
    id: "intersectionalLenses",
    term: "Intersectional Lenses",
    conventionalTerm: "Filters / Sorting",
    definition:
      "Adjusting the gaze. Filtering scenarios by system logic (Extractive ↔ Emancipatory) and power distribution.",
    reference: "Crenshaw — intersectionality",
    registerColor: "border-rose-400",
    quadrant: null,
    provocativeQuestion:
      "Whose gaze is the default in most “neutral” filters you've used today?",
  },
  weaversAndGuardians: {
    id: "weaversAndGuardians",
    term: "Weavers & Guardians",
    conventionalTerm: "Users / Authors",
    definition:
      "Practitioners co-shaping the speculative commons rather than passive consumers of technology.",
    reference: "Decolonial futures",
    registerColor: "border-emerald-400",
    quadrant: null,
    provocativeQuestion:
      "When did you last shape a tool instead of adapting to one?",
  },
  situatedKnowledge: {
    id: "situatedKnowledge",
    term: "Situated Knowledge",
    conventionalTerm: "Data Inputs / Form",
    definition:
      "Grounding speculation in specific bodies, geographies, and historical frictions rather than universalized AI prompts.",
    reference: "Haraway, 1988",
    registerColor: "border-indigo-400",
    quadrant: null,
    provocativeQuestion:
      "What place or community would your future be incomplete without naming?",
  },
  tuneFrequencies: {
    id: "tuneFrequencies",
    term: "Tune Frequencies",
    conventionalTerm: "Search / Explore",
    definition:
      "Navigating through weak signals, alternative realities, and feminist technological utopias.",
    reference: "Speculative futures",
    registerColor: "border-amber-400",
    quadrant: "techno_optimist",
    provocativeQuestion:
      "Which futures feel loud in your feed — and which are barely audible?",
  },
  relationalCalibration: {
    id: "relationalCalibration",
    term: "Relational Calibration",
    conventionalTerm: "System Settings",
    definition:
      "Adjusting ethics, friction, and care parameters within the generative ecosystem.",
    reference: "Ethics of care",
    registerColor: "border-violet-400",
    quadrant: "fragmented",
    provocativeQuestion:
      "What would “calibration” mean if care were the default setting?",
  },
};

export const GLOSSARY_TERM_IDS = Object.keys(GLOSSARY) as GlossaryTermId[];
