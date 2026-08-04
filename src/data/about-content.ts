import {
  QUADRANT_MATRIX_LABELS,
  type FutureQuadrant,
} from "@/types/future";

export const FFIE_PHASES = [
  {
    phase: 1,
    name: "Understand",
    description:
      "Name the structural tensions in an innovation ecosystem — who gains, who bears cost, and what AI promises versus what it extracts.",
  },
  {
    phase: 2,
    name: "Situate",
    description:
      "Place knowledge where it lives: Recife, Lisbon, a specific role, a named body. Futures are partial, never universal.",
  },
  {
    phase: 3,
    name: "Embody",
    description:
      "Build a character with hope, fear, and non-negotiable values — then let Narrative Cards surface the tensions they carry.",
  },
  {
    phase: 4,
    name: "Materialize",
    description:
      "Give the future a diegetic artifact: something touchable, usable, or rule-making — with a public promise and a hidden function.",
  },
  {
    phase: 5,
    name: "Share",
    description:
      "Position the prototype on the Critical Feminist Matrix and release it into the commons — for debate, not approval.",
  },
] as const;

export const FOUR_FUTURES: {
  quadrant: FutureQuadrant;
  title: string;
  summary: string;
}[] = [
  {
    quadrant: "dominant_dystopian",
    title: QUADRANT_MATRIX_LABELS.dominant_dystopian,
    summary:
      "Power concentrates at the top; technology extracts time, data, and autonomy from those who cannot refuse it. Care is outsourced, surveillance wears a friendly face.",
  },
  {
    quadrant: "techno_optimist",
    title: QUADRANT_MATRIX_LABELS.techno_optimist,
    summary:
      "Innovation promises liberation while leaving hierarchy intact — benefits flow upward, and “progress” is measured without asking who pays.",
  },
  {
    quadrant: "fragmented",
    title: QUADRANT_MATRIX_LABELS.fragmented,
    summary:
      "Collective life fragments under precarity: tools multiply, coordination fails, and care work falls unevenly on those already stretched thin.",
  },
  {
    quadrant: "feminist_preferred",
    title: QUADRANT_MATRIX_LABELS.feminist_preferred,
    summary:
      "Not a utopia already arrived — a direction: technology that redistributes power, time, and care instead of concentrating them.",
  },
];

export const ABOUT_SECTIONS = {
  problem: {
    id: "problem",
    eyebrow: "The bind",
    title: "The Use-Distrust Paradox",
    body: [
      "People — women especially — report high distrust of AI's societal trajectory and high personal certainty about adopting it anyway. That is not hypocrisy to fix; it is a structural condition FFIE renders visible.",
      "Mainstream foresight treats gender as a variable to note. Feminist foresight treats it as a design issue: whose perspective counts as data, and how power gets encoded into the scenario itself.",
    ],
  },
  method: {
    id: "method",
    eyebrow: "The method",
    title: "Five phases, one replicable unit",
    body: [
      "Understand → Situate → Embody → Materialize → Share. Validated across workshop cohorts in Recife and Lisbon.",
      "The replicable output is always the same: persona + diegetic artifact, positioned on the Critical Feminist Matrix — System Logic (Extractive ↔ Emancipatory) × Power Organization (Hierarchical ↔ Collective Care).",
      "Narrative Cards supply structural tensions drawn from real workshop data — Risk, Benefit, Trust, Barrier — plus Environmental Impact as a transversal lens always applied.",
    ],
    createBridge:
      "Walk the method yourself — start in Create when you are ready to draw cards and build a future.",
  },
  origin: {
    id: "origin",
    eyebrow: "Origin",
    title: "Where FFIE was validated",
    body: [
      "FFIE is not a thought experiment ported to the web. It is doctoral research in Design, tested twice in the field before this instrument existed.",
    ],
  },
  fourFutures: {
    id: "four-futures",
    eyebrow: "The matrix",
    title: "The Four Futures",
    body: [
      "Every prototype lands in one of four scenario quadrants. They are not rankings — they are distinct logics of power and care.",
    ],
  },
  why: {
    id: "why-it-matters",
    eyebrow: "Why it matters",
    title: "Research implications, in plain language",
    body: [
      "Innovation ecosystems need futures that hold tension open long enough to debate — not slide decks that collapse complexity into a single “preferred” outcome.",
      "FFIE gives teams, classrooms, and communities a shared instrument: draw cards, embody a life, materialize an artifact, and argue about where it belongs on the matrix.",
      "The goal is not prediction. It is situated critique — making extraction, care, and power visible before they harden into product requirements.",
    ],
  },
  credibility: {
    id: "credibility",
    eyebrow: "Credibility",
    title: "Methodology & lineage",
    body: [
      "Doctoral research in Design by Amanda Lopes Oliveira at IADE — Universidade Europeia (UNIDCOM). Two independent workshop cohorts, 134 survey responses, 23 interviews, eight diegetic prototypes validated in Recife and Lisbon.",
      "FFIE sits in a lineage of feminist speculative tools — including kindred work on transfeminist technology oracles — named openly rather than reinvented in isolation.",
      "Publications and thesis documentation anchor the empirical claims; this site is the instrument built from that research, not a substitute for it.",
    ],
  },
  access: {
    id: "access",
    eyebrow: "Access",
    title: "Open by design",
    body: [
      "Everything you create here can be exported without an account. No email gate, no paywall — the instrument stays as frictionless as the research allows.",
    ],
  },
} as const;
