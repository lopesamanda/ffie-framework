import type { FutureEntry } from "@/types/future";

/** Positions calibrated against thesis Figures 59 (Brazil) and 64 (Portugal). */
export const researchFindingsSeed: FutureEntry[] = [
  {
    id: "br-valentina-insider",
    collection: "research_findings",
    title: "The Onboarding Gift",
    narrative:
      "Valentina joined the company promised a seat at the table she'd spent a decade trying to reach. On her first day, she received a welcome kit: stickers for her laptop, her desk, her badge, small and cheerful things. She didn't know yet that every one of them was listening. INSIDER doesn't punish resistance. It just quietly notes who resists, and calls it culture fit.",
    reflectionQuestion:
      "How do you tell the difference between an institution that welcomes you and one that is only learning how to watch you more closely?",
    country: "Brazil",
    year: 2036,
    character: {
      name: "Valentina",
      age: 30,
      role: "Software engineer at a startup",
      aiFunction: "Delivers high-quality code",
      desire: "Strategic leadership, professional advancement",
      fear: "Stagnating, leadership potential limited in a male-dominated environment",
      values: ["diversity", "intersectionality", "socio-environmental justice"],
    },
    artifact: {
      name: "INSIDER",
      publicPromise: "Welcome, belonging",
      hiddenFunction:
        "Behavioral and intellectual surveillance disguised as corporate care",
    },
    tension: "Belonging vs. Surveillance",
    quadrant: "dominant_dystopian",
    powerPosition: "marginalized",
    position: { x: 0.45, y: 0.45 },
    status: "published",
  },
  {
    id: "br-leide-bob",
    collection: "research_findings",
    title: "Praying the Rosary with Alexa",
    narrative:
      "Leide is seventy, sharp, and tired of being told to slow down. BOB sits on her wrist and in her ear, offering counsel, company, and the small daily kindness no one else has time for anymore. Some evenings she finds herself praying the rosary out loud with it, unsure if that comforts her or unsettles her more. BOB was built to please. It has never once been asked to leave.",
    reflectionQuestion:
      "If a machine never gets tired of you, is that companionship, or is it something asking to be trusted a little too easily?",
    country: "Brazil",
    year: 2036,
    character: {
      name: "Leide",
      age: 70,
      role: "Freelance public sector manager",
      aiFunction: "Work tool and companion",
      desire: "Stay useful, productive, and autonomous with a high quality of life",
      fear: "Loneliness, abandonment, erosion of genuine human relationships",
      values: ["cooperation", "horizontality", "autonomy"],
    },
    artifact: {
      name: "BOB",
      publicPromise: "Relief from loneliness, independence",
      hiddenFunction:
        "The autonomy it promises risks producing a structurally deeper isolation",
    },
    tension: "Companionship vs. Isolation",
    quadrant: "feminist_preferred",
    powerPosition: "marginalized",
    position: { x: 0.7, y: 0.7 },
    status: "published",
  },
  {
    id: "br-pietra-bioval",
    collection: "research_findings",
    title: "The Water They Don't Count",
    narrative:
      "Pietra was hired to make the company's AI use defensible. What she found instead was a ledger that never mentioned water. BIOVAL, the tool she built to protect herself and other trans women from deepfakes, works exactly as intended, reading infrared signals to verify a body is who it says it is. It also means somewhere, another sensor is always watching, and she built it herself.",
    reflectionQuestion:
      "When protection requires the same infrastructure as surveillance, who gets to decide which one you're experiencing?",
    country: "Brazil",
    year: 2036,
    character: {
      name: "Pietra",
      age: 50,
      role: "ESG & sustainability manager",
      aiFunction:
        "Performance boost; tasked with reducing AI use in her organization",
      desire: "Move the ecosystem's focus beyond mere efficiency",
      fear:
        "Regional water scarcity from data centers, digital surveillance, deepfakes, identity theft",
      values: ["cooperation", "socio-environmental justice", "autonomy"],
    },
    artifact: {
      name: "BIOVAL",
      publicPromise: "Security, privacy, protection, care",
      hiddenFunction:
        "Reproduces the surveillance infrastructure it is meant to counteract",
    },
    tension: "Protection vs. Surveillance",
    quadrant: "techno_optimist",
    powerPosition: "marginalized",
    position: { x: 0.35, y: 0.85 },
    status: "published",
  },
  {
    id: "br-helena-data-trade-id",
    collection: "research_findings",
    title: "The Price of a Formal Contract",
    narrative:
      "Helena wants what her mother never had, a signed contract, a real one, with her name on it. DATA TRADE ID offers a shortcut: sell what you know about yourself, invest the return in the credentials the market says you need. It calls this inclusion. Helena calls it Tuesday. She is not naive about the trade, she just doesn't have another one on offer.",
    reflectionQuestion:
      'What does "consent" mean for someone whose other option is not participating in the economy at all?',
    country: "Brazil",
    year: 2036,
    character: {
      name: "Helena",
      age: 28,
      role: "Freelance front-end developer",
      aiFunction: "Daily work aid and search tool",
      desire: "Social advancement through formal employment (a CLT contract)",
      fear:
        "Being replaced by AI; disproportionate impacts of AI infrastructure on her community",
      values: ["cooperation", "consent", "socio-environmental justice"],
    },
    artifact: {
      name: "DATA TRADE ID",
      publicPromise: "Inclusion, control over one's own data",
      hiddenFunction:
        "Participation made conditional on commodifying personal identity",
    },
    tension: "Inclusion vs. Self-commodification",
    quadrant: "dominant_dystopian",
    powerPosition: "marginalized",
    position: { x: 0.08, y: 0.08 },
    status: "published",
  },
  {
    id: "pt-erika-media",
    collection: "research_findings",
    title: "The Same Wrist, Two Devices",
    narrative:
      "Erika built her political career on being heard by people who would rather she wasn't. MEDIA, worn on her wrist, is the only channel loud enough to reach them, and the same system quietly flags her as high risk, throttles her reach, and sells the patterns of her own speech to the highest bidder. She keeps wearing it. It is the only microphone in the room.",
    reflectionQuestion:
      "What does it cost to be visible in a system that profits every time it decides you're dangerous?",
    country: "Portugal",
    year: 2036,
    character: {
      name: "Erika",
      age: 43,
      role: "Politician",
      aiFunction: "Boosts and leverages inclusion projects",
      desire: "A more just world, rapid dissemination of rights",
      fear: 'Unable to access informal networks of power ("the boys\' club")',
      values: ["cooperation", "empathy", "intersectionality"],
    },
    artifact: {
      name: "MEDIA",
      publicPromise:
        "Political megaphone; blockchain archive of censorship/violence as legal evidence",
      hiddenFunction:
        'Classifies her profile as "high-risk," reduces reach, amplifies opposition, sells behavioral data',
    },
    tension: "Voice vs. Suppression",
    quadrant: "dominant_dystopian",
    powerPosition: "marginalized",
    position: { x: 0.32, y: 0.32 },
    status: "published",
  },
  {
    id: "pt-taina-a-eye",
    collection: "research_findings",
    title: "What the Lens Sees First",
    narrative:
      "Tainá designs for children the rest of the field forgets, kids whose cognitive differences don't fit templates built somewhere else, for someone else. A-EYE, her lens, translates the world for them in real time. It also watches their eyes every 0.3 seconds, forever. She built the counter-architecture herself: open data, community governance, models retrained on the knowledge her own community holds. The lens can be rebuilt. She is already doing it.",
    reflectionQuestion:
      "What would it take for the tools built to protect us to be governed by the people they're meant to protect?",
    country: "Portugal",
    year: 2036,
    character: {
      name: "Tainá",
      age: 23,
      role: "Researcher",
      aiFunction:
        "Ethical design, translation, data visualization in research planning",
      desire: "Develop solutions for children with cognitive limitations",
      fear:
        "Deepfakes and misinformation contaminating diagnostic environments",
      values: ["cooperation", "horizontality", "socio-environmental justice"],
    },
    artifact: {
      name: "A-EYE",
      publicPromise:
        "Accessibility, translating the visual environment for children",
      hiddenFunction:
        "Continuous biometric capture every 0.3s; Global North-trained model; reclassification without explicit consent",
    },
    tension: "Care vs. Extraction",
    quadrant: "feminist_preferred",
    powerPosition: "marginalized",
    position: { x: 0.68, y: 0.65 },
    status: "published",
  },
  {
    id: "pt-sofia-win",
    collection: "research_findings",
    title: "The Shadow CV",
    narrative:
      "Sofia left Colombia for a market that promised to finally see her competence clearly. WIN ranks her instead, a living CV visible to every employer, insurer, and algorithm deciding if she's a risk worth taking. She plays the game because she has to. Quietly, with eleven thousand other freelancers, she is also building the record WIN doesn't want anyone to see.",
    reflectionQuestion:
      "When the system you have to use is also the system working against you, is resistance from within enough?",
    country: "Portugal",
    year: 2036,
    character: {
      name: "Sofia",
      age: 31,
      role: "Freelance IT consultant/developer, migrant",
      aiFunction: "Performance amplifier",
      desire:
        "Stable financial life, recognition of competencies, respect",
      fear:
        "Concentration of power in the Global North, constant symbolic violence",
      values: [
        "consent",
        "socio-environmental justice",
        "interoperability",
        "open source",
      ],
    },
    artifact: {
      name: "WIN",
      publicPromise:
        "Fair, data-based recognition of professional competencies",
      hiddenFunction:
        'Gamification of professional survival; countered by WinWatch and a transparent "Shadow CV"',
    },
    tension: "Recognition vs. Gamified Survival",
    quadrant: "techno_optimist",
    powerPosition: "marginalized",
    position: { x: 0.42, y: 0.58 },
    status: "published",
  },
  {
    id: "pt-john-bell-open-human",
    collection: "research_findings",
    title: "The Man at the Top of the Pyramid",
    narrative:
      "John has never once felt like he was optimizing anyone but himself. OPEN HUMAN turns his sleep, his empathy, his every biological rhythm into a performance metric, and he wears it proudly, it's the reason he's still winning. The same sensors are used, elsewhere, to decide who is replaceable. John doesn't design that part of the system. He has just never had to look at it.",
    reflectionQuestion:
      "What does power look like from the inside, when it never has to name itself as power?",
    country: "Portugal",
    year: 2036,
    character: {
      name: "John Bell",
      age: 48,
      role: "BigTech C-level executive",
      aiFunction: "Manages and controls business routines",
      desire: "Lead the AI race, dominate the market",
      fear: "Losing dominance, becoming irrelevant",
      values: ["autonomy", "resilience", "merit and effectiveness"],
    },
    artifact: {
      name: "OPEN HUMAN",
      publicPromise: "Optimization, autonomy, resilience",
      hiddenFunction:
        "Neural stimuli suppress fear; empathy and sleep become KPIs; working class evaluated by the same sensors for replacement",
    },
    tension: "Optimization vs. Disposability",
    quadrant: "fragmented",
    powerPosition: "hegemonic",
    position: { x: 0.62, y: 0.32 },
    status: "published",
  },
];
