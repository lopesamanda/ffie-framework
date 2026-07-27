import type { CharacterPronounId } from "@/lib/journey/embody-flow";

export type CharacterPronouns = {
  subject: "she" | "he" | "they";
  subjectCap: "She" | "He" | "They";
  possessive: "her" | "his" | "their";
  possessiveCap: "Her" | "His" | "Their";
  object: "her" | "him" | "them";
};

/** Explicit pronoun selection drives all narrative copy (not gender). */
export function pronounsForSelection(
  pronoun: CharacterPronounId | "",
): CharacterPronouns {
  if (pronoun === "he_his") {
    return {
      subject: "he",
      subjectCap: "He",
      possessive: "his",
      possessiveCap: "His",
      object: "him",
    };
  }

  if (pronoun === "they_them") {
    return {
      subject: "they",
      subjectCap: "They",
      possessive: "their",
      possessiveCap: "Their",
      object: "them",
    };
  }

  return {
    subject: "she",
    subjectCap: "She",
    possessive: "her",
    possessiveCap: "Her",
    object: "her",
  };
}

/** @deprecated Use pronounsForSelection — gender no longer drives copy. */
export function pronounsForGender(
  gender: string,
): CharacterPronouns {
  void gender;
  return pronounsForSelection("");
}
