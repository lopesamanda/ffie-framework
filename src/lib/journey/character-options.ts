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
  "Branca/White",
  "Preta/Black",
  "Parda/Mixed-race",
  "Indígena/Indigenous",
  "Amarela/East Asian-descent",
  "Cigana/Roma",
  "Africana (Portuguese context)/African descent",
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
  | "narrative";

export const ARTIFACT_TYPE_OPTIONS: {
  id: ArtifactTypeId;
  label: string;
  description: string;
}[] = [
  {
    id: "object",
    label: "Object",
    description: "Something she touches or wears",
  },
  {
    id: "app",
    label: "App",
    description: "Something she uses online, an interface she accesses",
  },
  {
    id: "service",
    label: "Service",
    description: "Something she experiences as a service",
  },
  {
    id: "policy",
    label: "Policy",
    description: "Something that defines the rules affecting her life",
  },
  {
    id: "narrative",
    label: "Narrative",
    description:
      "Something that shapes the narrative about the ecosystem she's in",
  },
];

export function artifactTypePhrase(type: ArtifactTypeId | ""): string {
  const match = ARTIFACT_TYPE_OPTIONS.find((option) => option.id === type);
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
