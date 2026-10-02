import type { FutureCountry } from "@/types/future";

export type CharacterGenderId =
  | "cisgender_woman"
  | "transgender_woman"
  | "cisgender_man"
  | "transgender_man"
  | "non_binary";

export const GENDER_OPTIONS: { id: CharacterGenderId; label: string }[] = [
  { id: "cisgender_woman", label: "Cisgender woman" },
  { id: "transgender_woman", label: "Transgender woman" },
  { id: "cisgender_man", label: "Cisgender man" },
  { id: "transgender_man", label: "Transgender man" },
  { id: "non_binary", label: "Non-binary" },
];

export const RACE_ETHNICITY_OPTIONS = [
  "White",
  "Black",
  "Mixed-race",
  "Indigenous",
  "East Asian-descent",
  "Roma",
  "African descent",
] as const;

export const RACE_SELF_DESCRIBE = "Self-describe";

export const ROLE_OPTIONS = [
  "Startup founder",
  "VC/investor",
  "Hub coordinator",
  "Freelancer",
  "Peripheral/grassroots worker",
  "Researcher",
  "Public sector manager",
] as const;

export const CHARACTER_VALUES = [
  "Cooperation",
  "Horizontality",
  "Diversity",
  "Autonomy",
  "Intersectionality",
  "Consent",
  "Socio-environmental Justice",
  "Decentralization",
  "Resilience",
  "Empathy",
  "Interoperability",
  "Open Source",
] as const;

export type CharacterValue = (typeof CHARACTER_VALUES)[number];

export const COUNTRY_OPTIONS: FutureCountry[] = ["Brazil", "Portugal"];

export type ArtifactTypeId =
  | "object"
  | "app"
  | "service"
  | "policy"
  | "narrative"
  | "agent"
  | "other";

type ArtifactTypeOption = {
  id: ArtifactTypeId;
  label: string;
  description: string;
};

/** Artifact types offered in Create (Choose and Make share this list). */
export const ARTIFACT_TYPE_OPTIONS: ArtifactTypeOption[] = [
  {
    id: "object",
    label: "Object",
    description:
      "Something they touch or wear, a physical or everyday thing",
  },
  {
    id: "service",
    label: "Service",
    description: "Something they experience as a service",
  },
  {
    id: "app",
    label: "Platform",
    description:
      "Something they use online, a way people interact with a system",
  },
  {
    id: "agent",
    label: "AI Agent",
    description:
      "Something that acts on their behalf, making decisions or taking actions in the world without them needing to ask each time",
  },
  {
    id: "policy",
    label: "Policy",
    description: "A rule, law, or institutional mechanism",
  },
  {
    id: "other",
    label: "Other",
    description: "Something else — you name what it is",
  },
];

/** No longer offered, but still resolvable for drafts saved before Choose existed. */
const LEGACY_ARTIFACT_TYPE_OPTIONS: ArtifactTypeOption[] = [
  {
    id: "narrative",
    label: "Narrative",
    description:
      "Something that shapes a story, a myth, or a public narrative about the future",
  },
];

function findArtifactTypeOption(
  type: ArtifactTypeId | "",
): ArtifactTypeOption | undefined {
  return [...ARTIFACT_TYPE_OPTIONS, ...LEGACY_ARTIFACT_TYPE_OPTIONS].find(
    (option) => option.id === type,
  );
}

export const ARTIFACT_SUBFORMAT_OTHER = "Other";

/** Cosmetic subformats per artifact type — do not affect capability defaults. */
export const ARTIFACT_SUBFORMATS: Record<ArtifactTypeId, string[]> = {
  object: ["Wearable", "Hardware"],
  app: ["Platform", "Voice interface", "App interface", "Chatbot"],
  agent: ["Digital assistant", "Autonomous agent", "Human-in-the-Loop"],
  service: ["Physical space", "Community hub", "Event"],
  policy: ["Official document", "Certification", "Public notice", "Contract"],
  narrative: ["Campaign", "Social Media", "Ads", "Audiovisual piece"],
  other: [],
};

export function resolvedArtifactSubformat(
  subformat: string,
  subformatOther: string,
): string {
  if (subformat === ARTIFACT_SUBFORMAT_OTHER) {
    return subformatOther.trim();
  }
  return subformat.trim();
}

export function artifactTypeLabel(
  type: ArtifactTypeId | "",
  typeOther = "",
): string {
  if (type === "other" && typeOther.trim()) return typeOther.trim();
  return findArtifactTypeOption(type)?.label ?? "artifact";
}

export function artifactTypePhrase(
  type: ArtifactTypeId | "",
  typeOther = "",
): string {
  if (type === "other") {
    return typeOther.trim()
      ? `a kind of ${typeOther.trim().toLowerCase()}`
      : "an artifact";
  }
  const match = findArtifactTypeOption(type);
  if (!match) return "an artifact";
  return match.description.replace(/^Something /i, "something ").toLowerCase();
}

export function composeLocation(city: string, country: FutureCountry | ""): string {
  const trimmedCity = city.trim();
  if (trimmedCity && country) return `${trimmedCity}, ${country}`;
  if (trimmedCity) return trimmedCity;
  if (country) return country;
  return "";
}
