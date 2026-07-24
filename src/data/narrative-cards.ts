export type CardCategory = "risk" | "benefit" | "trust" | "barrier" | "transversal";
export type CardRegister = "tension" | "potential";

export type NarrativeCard = {
  id: string;
  name: string;
  description: string;
  tension: string;
  category: CardCategory;
  register: CardRegister;
  drawable: boolean;
  color: string;
};

export const ENVIRONMENTAL_IMPACT_CARD: NarrativeCard = {
  id: "environmental-impact",
  name: "Environmental Impact",
  description:
    "AI infrastructures consume energy, water, and critical minerals, often displacing environmental impacts onto peripheral territories and historically exploited populations.",
  tension: "Innovation vs. extraction",
  category: "transversal",
  register: "tension",
  drawable: false,
  color: "#2d6a4f",
};

export const NARRATIVE_CARDS: NarrativeCard[] = [
  {
    id: "digital-monoculture",
    name: "Digital Monoculture",
    description:
      "The logic of scalability eliminates cultural, social, and biological diversity.",
    tension: "Efficiency vs. plurality",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "amplification-of-historical-biases",
    name: "Amplification of Historical Biases",
    description:
      "Racism, sexism, and transphobia are reproduced by historical data.",
    tension: "Automation of injustice",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "cognitive-atrophy",
    name: "Cognitive Atrophy",
    description:
      "Over-reliance leads to the loss of critical thinking and intellectual autonomy.",
    tension: "Convenience vs. education/development",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "digital-violence-and-deepfakes",
    name: "Digital Violence and Deepfakes",
    description:
      "Women and children as the primary targets of technological abuse.",
    tension: "Innovation without protection",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "power-concentration-global-north",
    name: "Power Concentration in the Global North",
    description:
      "Data, narratives, and values concentrated within a few Big Tech corporations.",
    tension: "Digital colonialism",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "boys-club-networking",
    name: "The Boys' Club Networking",
    description:
      "Access to opportunity flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy.",
    tension: "Structural access restriction (apparent meritocracy)",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "motherhood-penalty",
    name: "The Motherhood Penalty",
    description:
      "Caregiving responsibilities are structurally penalized through wage gaps, leadership exclusion, and constrained career mobility.",
    tension: "Care as career cost",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "symbolic-and-real-violence",
    name: "Symbolic and Real Violence",
    description:
      "Domination operates through everyday, often-denied mechanisms embedded in professional environments that present themselves as neutral.",
    tension: "Embodied harm in professional spaces (stay or resist)",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "dei-backlash",
    name: "DEI Backlash",
    description:
      "Diversity and inclusion initiatives are rolled back when capitalist logic treats them as a cost rather than a structural commitment.",
    tension: "Capitalism vs. structural equity (diversity as luxury)",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "exclusion-trans-non-binary",
    name: "Exclusion of Trans and Non-Binary People",
    description:
      "A material double bind between being recognized and being safe, documented through Brazilian trans and non-binary participants' accounts.",
    tension: "Survival vs. authenticity",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "ai-performance-amplifier",
    name: "AI as Performance Amplifier",
    description:
      "AI increases productivity, accelerates decision-making, and expands the capabilities of those who already possess technical and cognitive capital.",
    tension: "Amplification of existing privileges",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-cognitive-support",
    name: "AI as Cognitive Support Network",
    description:
      "AI acts as an organizer, reviewer, and mental load reducer, particularly for women.",
    tension: "Protection vs. expansion of responsibilities",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-leveling-tool",
    name: "AI as Leveling Tool",
    description:
      "When used intentionally, it can accelerate the learning curve for underrepresented groups.",
    tension: "Democratization conditioned upon access and literacy",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-accessibility-infrastructure",
    name: "AI as Accessibility Infrastructure",
    description:
      "Translation, transcription, support for neurodivergence, and linguistic inclusion.",
    tension: "Inclusion is not automatic; it depends on ethical design",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "instrumental-trust",
    name: "Instrumental Trust",
    description: "Trust based on utility and results.",
    tension: "It works, therefore I trust it",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "conditional-trust",
    name: "Conditional Trust",
    description:
      "Trust mediated by control, human oversight, and clear boundaries.",
    tension: "Necessary but uncomfortable use",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "systemic-mistrust",
    name: "Systemic Mistrust",
    description:
      "The issue is not the tool itself, but the creators, the data, and the underlying interests.",
    tension: "Invisible power",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "neutrality-as-myth",
    name: "Neutrality as a Myth",
    description: "Algorithms reflect human values and social structures.",
    tension: "Mathematics does not equal justice",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
];

export const ALL_CARDS: NarrativeCard[] = [
  ...NARRATIVE_CARDS,
  ENVIRONMENTAL_IMPACT_CARD,
];

export function drawWorkshopHand(): {
  risk: NarrativeCard;
  benefit: NarrativeCard;
  trust: NarrativeCard;
  barrier: NarrativeCard;
  transversal: NarrativeCard;
} {
  const pick = (category: CardCategory) => {
    const pool = NARRATIVE_CARDS.filter(
      (card) => card.category === category && card.drawable,
    );
    return pool[Math.floor(Math.random() * pool.length)];
  };

  return {
    risk: pick("risk"),
    benefit: pick("benefit"),
    trust: pick("trust"),
    barrier: pick("barrier"),
    transversal: ENVIRONMENTAL_IMPACT_CARD,
  };
}

export function buildCombinedTension(
  hand: ReturnType<typeof drawWorkshopHand>,
): string {
  return [
    hand.risk.tension,
    hand.benefit.tension,
    hand.trust.tension,
    hand.barrier.tension,
  ].join(" · ");
}

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  risk: "AI Risk",
  benefit: "AI Benefit",
  trust: "Trust in AI",
  barrier: "Ecosystem Barrier",
  transversal: "Transversal Lens",
};
