import type { CharacterGenderId } from "@/lib/journey/character-options";

export type CharacterPronouns = {
  subject: "she" | "he" | "they";
  subjectCap: "She" | "He" | "They";
  possessive: "her" | "his" | "their";
  possessiveCap: "Her" | "His" | "Their";
  object: "her" | "him" | "them";
};

export function pronounsForGender(
  gender: CharacterGenderId | "",
): CharacterPronouns {
  if (gender === "cisgender_man" || gender === "transgender_man") {
    return {
      subject: "he",
      subjectCap: "He",
      possessive: "his",
      possessiveCap: "His",
      object: "him",
    };
  }

  if (gender === "non_binary") {
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
