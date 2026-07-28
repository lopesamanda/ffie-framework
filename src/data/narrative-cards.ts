export type CardCategory = "risk" | "benefit" | "trust" | "barrier" | "transversal";
export type CardRegister = "tension" | "potential";

export type NarrativeCard = {
  id: string;
  name: string;
  description: string;
  tension: string;
  examples: string[];
  reflectionQuestion: string;
  /** Clause used in the Oracle Draw synthesis sentence (see oracle-synthesis.ts). */
  synthesisPhrase: string;
  /** 5–8 word plain-language clause from this card's Example field (Oracle synthesis). */
  synthesisClause: string;
  /** Opener C (transition) form — used on benefit cards when grammar needs a gerund phrase. */
  synthesisPhraseTransition?: string;
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
  examples: [
    "A data center in a drought-prone region consuming millions of liters of water per year to cool AI servers",
    "Rare-earth mining for AI hardware displacing communities in already exploited territories",
  ],
  reflectionQuestion:
    "Where does the environmental cost of this artificial intelligence physically land — and who pays that cost up close?",
  synthesisPhrase:
    "extracting water, energy, and minerals at an unsustainable cost",
  synthesisClause: "millions of liters cooling AI servers",
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
    examples: [
      "A translation app that only preserves the five most spoken languages, leaving hundreds of indigenous languages out of digital use",
      "A recommendation algorithm that shows the same trend to everyone in a city, flattening local cultural expression",
    ],
    reflectionQuestion:
      "What is lost when the same solution is applied to everyone, everywhere?",
    synthesisPhrase:
      "erasing cultural and biological diversity in the name of scale",
    synthesisClause: "the same trend shown to everyone",
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
    examples: [
      "A hiring algorithm trained on a decade of résumés that penalizes anyone who lists a women's college",
      "A predictive policing tool that flags neighborhoods based on historically biased arrest data",
    ],
    reflectionQuestion:
      "Where did the data that taught this AI come from — and who did it leave out?",
    synthesisPhrase:
      "amplifying the racism, sexism, and transphobia embedded in historical data",
    synthesisClause: "résumés penalizing anyone from women's colleges",
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
    examples: [
      "A writing assistant so present in daily work that the team loses the habit of arguing on its own",
      "A navigation app used so often that a person loses the ability to read a map without it",
    ],
    reflectionQuestion:
      "What has this person stopped knowing how to do alone, since they started trusting this AI?",
    synthesisPhrase:
      "losing the critical thinking this convenience quietly replaces",
    synthesisClause: "losing the habit of arguing alone",
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
    examples: [
      "A deepfake video used to harass a public woman with fabricated explicit content",
      "An AI voice clone used to impersonate a child in a scam call to parents",
    ],
    reflectionQuestion:
      "Who is most vulnerable to the violence this technology can cause, even when that is not the design intent?",
    synthesisPhrase:
      "exposing women and children to deepfake-driven violence",
    synthesisClause: "deepfake harassment of public women",
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
    examples: [
      "An AI model trained almost entirely on North American English data, then sold as neutral worldwide",
      "A handful of companies owning the computing infrastructure every AI startup in the world depends on",
    ],
    reflectionQuestion:
      "Who owns the infrastructure behind this AI, and who only gets to use what's left over?",
    synthesisPhrase:
      "concentrating data and power in a handful of Global North corporations",
    synthesisClause: "North American English sold as neutral worldwide",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "boys-club-networking",
    name: "The Boys' Club Networking",
    description:
      "Access to opportunity and information flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy.",
    tension: "Structural access restriction (apparent meritocracy)",
    examples: [
      "A promotion decided at a happy hour only some colleagues were invited to",
      "Introductions to investors flowing only through an alumni network of a single gender",
    ],
    reflectionQuestion:
      "Who had access to this opportunity only because they knew the right person?",
    synthesisPhrase:
      "informal networks that quietly gatekeep opportunity",
    synthesisClause: "promotions decided at invite-only happy hours",
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
    examples: [
      "A performance review scoring a newly returned mother lower for \"reduced availability\"",
      "A promotion pipeline silently excluding anyone who took extended leave to care for someone",
    ],
    reflectionQuestion:
      "What did this person lose professionally for having cared for someone?",
    synthesisPhrase: "a career cost still charged for caregiving",
    synthesisClause: "lower scores for reduced availability after leave",
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
    examples: [
      "A meeting where a woman's idea is ignored until repeated minutes later by a male colleague and credited to him",
      "A dress code applied more strictly to feminine bodies under the guise of \"professionalism\"",
    ],
    reflectionQuestion:
      "What kind of harm has this person learned not to name, because it became \"normal\" in the environment where they work?",
    synthesisPhrase:
      "everyday violence workplaces have learned not to name",
    synthesisClause: "ideas ignored until a man repeats them",
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
    examples: [
      "A diversity program cut from the budget in the first quarter of declining revenue while other departments remain untouched",
      "A company quietly removing gender targets from public reports after a leadership change",
    ],
    reflectionQuestion:
      "What happened to this company's equity commitment when it stopped being convenient?",
    synthesisPhrase:
      "an equity commitment dropped the moment it's inconvenient",
    synthesisClause: "diversity cut when revenue declines",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "exclusion-trans-non-binary",
    name: "Exclusion of Trans and Non-Binary People",
    description:
      "A material double bind between being recognized and being safe, documented specifically through Brazilian trans and non-binary participants' accounts.",
    tension: "Survival vs. authenticity",
    examples: [
      "A corporate ID system with no option beyond binary gender, forcing a mismatch with a person's identity",
      "A trans person choosing between revealing their identity and staying safe in a hostile environment",
    ],
    reflectionQuestion:
      "What does this person need to hide about themselves to stay safe in this space?",
    synthesisPhrase:
      "an impossible choice between being recognized and being safe",
    synthesisClause: "no gender option beyond binary on ID",
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
    examples: [
      "A senior engineer using AI to deliver in an afternoon what used to take a week, widening the gap with junior colleagues",
      "A well-funded team using AI tools a smaller, under-resourced team cannot afford",
    ],
    reflectionQuestion:
      "Who was already ahead, and got even further ahead, with this tool?",
    synthesisPhrase: "boost performance and output",
    synthesisPhraseTransition: "boosting performance and output",
    synthesisClause: "delivering in an afternoon what took a week",
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
    examples: [
      "A working mother using an AI assistant to manage schedule, medical appointments, and school deadlines in one place",
      "An AI tool that drafts routine emails, freeing hours previously spent on invisible administrative work",
    ],
    reflectionQuestion:
      "What mental load did this tool take off someone's shoulders — and does that change anything structural, or only relieve it on the surface?",
    synthesisPhrase: "lighten the invisible mental load teams carry",
    synthesisPhraseTransition:
      "lightening the invisible mental load teams carry",
    synthesisClause: "managing appointments and deadlines in one place",
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
    examples: [
      "A free AI tutor helping a first-generation student recover a foundation they never had access to before",
      "An AI translation tool allowing a non-native speaker to apply for jobs previously out of reach",
    ],
    reflectionQuestion:
      "What can this person do now that they couldn't before — and what is still missing for that access to be truly guaranteed?",
    synthesisPhrase:
      "close the access gap for those historically left out",
    synthesisPhraseTransition:
      "closing the access gap for those historically left out",
    synthesisClause: "recovering a foundation never accessed before",
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
    examples: [
      "A screen-reading AI allowing a blind person to navigate a site alone for the first time",
      "A real-time captioning tool allowing a deaf person to follow a meeting without a human interpreter every time",
    ],
    reflectionQuestion:
      "Which barrier does this technology actually remove, and which does it only disguise?",
    synthesisPhrase: "finally access spaces that once excluded them",
    synthesisPhraseTransition:
      "finally accessing spaces that once excluded people",
    synthesisClause: "navigating a site alone for the first time",
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
    examples: [
      "Someone who doesn't fully understand how a diagnostic tool works but trusts it because it has been right before",
      "A team adopting an AI scheduling tool only because it saves time, without auditing how it decides",
    ],
    reflectionQuestion:
      "Does this person trust the tool, or only the outcome — and is that the same thing?",
    synthesisPhrase:
      "trust in results that have consistently proven reliable, even when the mechanism isn't fully understood",
    synthesisClause: "trusting it because it has been right before",
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
    examples: [
      "A doctor using an AI diagnostic tool only as a second opinion, never as the final word",
      "A manager reviewing every decision an AI hiring tool makes before moving forward",
    ],
    reflectionQuestion:
      "What limit did this person set to keep trusting — and what would happen if that limit were removed?",
    synthesisPhrase: "human oversight kept firmly in the loop",
    synthesisClause: "using AI only as a second opinion",
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
    examples: [
      "A community that doesn't trust a health AI, not because of the tool itself, but because of who built it and who profits from it",
      "A worker assuming any \"productivity AI\" introduced by management exists to justify layoffs",
    ],
    reflectionQuestion:
      "If this person doesn't trust, is it the technology — or whoever is behind it?",
    synthesisPhrase:
      "a deep mistrust of who built this and who profits from it",
    synthesisClause: "distrusting who built it and who profits",
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
    examples: [
      "An AI hiring tool presented as \"objective\" that still reflects the biases of the résumés it was trained on",
      "A content moderation algorithm sold as neutral that systematically flags certain dialects as \"toxic\"",
    ],
    reflectionQuestion:
      "What values does this AI carry, even when it is presented as neutral?",
    synthesisPhrase: "the reminder that no algorithm is truly neutral",
    synthesisClause: "objective tools still reflecting training biases",
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

export type WorkshopHand = {
  risk: NarrativeCard;
  benefit: NarrativeCard;
  trust: NarrativeCard;
  barrier: NarrativeCard;
  transversal: NarrativeCard;
};

/** Ordered reveal sequence during the Oracle Draw */
export const ORACLE_REVEAL_SEQUENCE: (keyof WorkshopHand)[] = [
  "risk",
  "benefit",
  "trust",
  "barrier",
  "transversal",
];

export function drawWorkshopHand(): WorkshopHand {
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

export function buildCombinedTension(hand: WorkshopHand): string {
  return [
    hand.risk.tension,
    hand.benefit.tension,
    hand.trust.tension,
    hand.barrier.tension,
  ].join(" · ");
}

/** Seed text for artifact_public_promise from Potential cards in the hand */
export function buildEcosystemAmbitionSeed(hand: WorkshopHand): string {
  return `The ecosystem promises ${hand.benefit.tension.toLowerCase()} — and expects ${hand.trust.tension.toLowerCase()}.`;
}

/** Starter for hidden_function collision prompt */
export function buildWeaknessCollisionContext(hand: WorkshopHand): string {
  return `${hand.risk.name} (${hand.risk.tension}) meets ${hand.barrier.name} (${hand.barrier.tension}).`;
}

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  risk: "AI Risk",
  benefit: "AI Benefit",
  trust: "Trust in AI",
  barrier: "Ecosystem Barrier",
  transversal: "Transversal Lens",
};

/** 1–2 example lines per register for The Draw orientation preview (not tied to a specific drawable card). */
export function registerExamplePreviews(
  category: CardCategory,
  limit = 2,
): string[] {
  const previews: string[] = [];
  for (const card of NARRATIVE_CARDS) {
    if (card.category !== category || !card.drawable) continue;
    const example = card.examples[0];
    if (example) previews.push(example);
    if (previews.length >= limit) break;
  }
  return previews;
}
