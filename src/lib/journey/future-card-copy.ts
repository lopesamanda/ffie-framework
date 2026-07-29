import type { JourneyDraft } from "@/lib/journey/types";
import {
  pronounsForSelection,
  verbFor,
  type CharacterPronouns,
} from "@/lib/journey/character-pronouns";

function stripTrailingPunctuation(text: string): string {
  return text.trim().replace(/[.!?…]+$/, "");
}

/**
 * "Why it exists" line on the final Future card — fear + problem/tension only.
 * @deprecated Use buildFinalCardNarrative for the two-beat final card copy.
 */
export function buildWhyItExistsParagraph(
  draft: Pick<
    JourneyDraft,
    | "characterName"
    | "characterPronoun"
    | "fear"
    | "aiFunction"
    | "tradeoffLoss"
    | "desire"
    | "artifactName"
    | "artifactProblemTension"
  >,
): string {
  const beats = buildFinalCardNarrative(draft);
  return beats.join(" ");
}

/** Two short narrative beats for the final Future card. */
export function buildFinalCardNarrative(
  draft: Pick<
    JourneyDraft,
    | "characterName"
    | "characterPronoun"
    | "fear"
    | "aiFunction"
    | "tradeoffLoss"
    | "desire"
    | "artifactName"
    | "artifactProblemTension"
  >,
): string[] {
  const name = draft.characterName.trim() || "Someone";
  const p = pronounsForSelection(draft.characterPronoun);
  const fearAnswer = stripTrailingPunctuation(draft.fear);
  const abilityImproved = stripTrailingPunctuation(draft.aiFunction);
  const habitChanged = stripTrailingPunctuation(draft.tradeoffLoss);
  const desireForFuture = stripTrailingPunctuation(draft.desire);
  const problemAnswer = stripTrailingPunctuation(draft.artifactProblemTension);
  const artifactName = draft.artifactName.trim() || "This artifact";

  const beats: string[] = [];

  if (fearAnswer || abilityImproved || habitChanged) {
    let first = "";
    if (fearAnswer) {
      first = `${name} feared Artificial Intelligence would ${fearAnswer}.`;
    }
    if (abilityImproved || habitChanged) {
      const changePart = [
        abilityImproved
          ? `it changed the way ${p.subject} could ${abilityImproved}`
          : null,
        habitChanged
          ? `it also changed the way ${p.subject} ${habitChanged}`
          : null,
      ]
        .filter(Boolean)
        .join(" — but ");
      first = first
        ? `${first} Ten years on, ${changePart}.`
        : `Ten years on, ${changePart}.`;
    }
    if (first) beats.push(first);
  }

  if (desireForFuture || problemAnswer) {
    let second = "";
    if (desireForFuture) {
      second = `${p.subjectCap} still ${verbFor(p, "holds", "hold")} on to the hope that ${desireForFuture}.`;
    }
    if (problemAnswer) {
      second = second
        ? `${second} ${artifactName} exists to ${problemAnswer}.`
        : `${artifactName} exists to ${problemAnswer}.`;
    }
    if (second) beats.push(second);
  }

  return beats;
}

export function possessiveStoryHeading(p: CharacterPronouns): string {
  return `BUILD ${p.possessiveCap} STORY`;
}

export function gainSectionLabel(p: CharacterPronouns): string {
  return p.verbForm === "plural" ? "WHAT THEY GAIN" : `WHAT ${p.subjectCap} GAINS`;
}

export function hopeSectionLabel(p: CharacterPronouns): string {
  return p.verbForm === "plural" ? "WHAT THEY HOPE FOR" : `WHAT ${p.subjectCap} HOPES FOR`;
}
