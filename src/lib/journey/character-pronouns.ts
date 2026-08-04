import type { CharacterPronounId } from "@/lib/journey/embody-flow";

export type CharacterPronouns = {
  subject: "she" | "he" | "they";
  subjectCap: "She" | "He" | "They";
  possessive: "her" | "his" | "their";
  possessiveCap: "Her" | "His" | "Their";
  object: "her" | "him" | "them";
  verbForm: "singular" | "plural";
};

/** Conjugate the leading verb when a draft phrase follows he/she (base form in embody blanks). */
export function phraseAfterSubject(
  p: CharacterPronouns,
  phrase: string,
): string {
  const trimmed = phrase.trim();
  if (!trimmed || p.verbForm === "plural") return trimmed;

  const tokens = trimmed.split(/\s+/);
  const first = tokens[0];
  const rest = tokens.slice(1);
  const lower = first.toLowerCase();

  const irregular: Record<string, string> = {
    analyze: "analyzes",
    have: "has",
    do: "does",
    go: "goes",
    carry: "carries",
    rely: "relies",
    try: "tries",
    study: "studies",
    use: "uses",
    lose: "loses",
    watch: "watches",
    teach: "teaches",
    reach: "reaches",
  };

  let conjugated = first;
  if (irregular[lower]) {
    conjugated = preserveTokenCase(first, irregular[lower]);
  } else if (/[^aeiou]y$/i.test(lower)) {
    conjugated = `${first.slice(0, -1)}ies`;
  } else if (/(?:s|x|z|ch|sh)$/i.test(lower)) {
    conjugated = `${first}es`;
  } else if (!/s$/i.test(lower)) {
    conjugated = `${first}s`;
  }

  return [conjugated, ...rest].join(" ");
}

function preserveTokenCase(original: string, conjugated: string): string {
  if (original[0] === original[0].toUpperCase()) {
    return conjugated.charAt(0).toUpperCase() + conjugated.slice(1);
  }
  return conjugated;
}

/** Pick plural or singular verb form (they → plural: "carry", "refuse"). */
export function verbFor(
  p: CharacterPronouns,
  singular: string,
  plural: string,
): string {
  return p.verbForm === "plural" ? plural : singular;
}

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
      verbForm: "singular",
    };
  }

  if (pronoun === "they_them") {
    return {
      subject: "they",
      subjectCap: "They",
      possessive: "their",
      possessiveCap: "Their",
      object: "them",
      verbForm: "plural",
    };
  }

  return {
    subject: "she",
    subjectCap: "She",
    possessive: "her",
    possessiveCap: "Her",
    object: "her",
    verbForm: "singular",
  };
}

/** @deprecated Use pronounsForSelection — gender no longer drives copy. */
export function pronounsForGender(gender: string): CharacterPronouns {
  void gender;
  return pronounsForSelection("");
}
