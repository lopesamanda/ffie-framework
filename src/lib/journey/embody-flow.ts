export type CharacterPronounId = "she_her" | "he_his" | "they_them";

export const PRONOUN_OPTIONS: { id: CharacterPronounId; label: string }[] = [
  { id: "she_her", label: "She/Her" },
  { id: "he_his", label: "He/His" },
  { id: "they_them", label: "They/Them" },
];

export const EMBODY_SCREEN_COUNT = 4;
