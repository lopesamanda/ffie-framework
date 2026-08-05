import type { CardCategory } from "@/data/narrative-cards";

export type RegisterDeckEntry = {
  category: CardCategory;
  description: string;
};

/** Shared copy for all five narrative registers — Home deck + Create intro. */
export const REGISTER_DECK: RegisterDeckEntry[] = [
  {
    category: "risk",
    description: "What could go wrong — structurally, not hypothetically.",
  },
  {
    category: "benefit",
    description: "What AI promises to deliver, and at what cost.",
  },
  {
    category: "trust",
    description: "Who is believed, and who is excluded from belief.",
  },
  {
    category: "barrier",
    description: "What prevents access, agency, or exit.",
  },
  {
    category: "transversal",
    description:
      "What AI consumes — energy, water, minerals — and who bears that cost.",
  },
];

/** Fan/spread geometry for five cards in the Home hero deck. */
export const REGISTER_DECK_FAN = {
  rotations: [-18, -9, 0, 9, 18] as const,
  spreadX: [-320, -160, 0, 160, 320] as const,
  stackedOffset: (index: number) => index * 12 - 24,
} as const;
