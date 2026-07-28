import type { NarrativeCard } from "@/data/narrative-cards";

/** Short grey placeholder phrase derived from a card's first Example (not pre-filled text). */
export function exampleGhostPhrase(card: NarrativeCard, index = 0): string {
  const raw = card.examples[index] ?? card.examples[0] ?? "";
  const stripped = raw
    .replace(/^A |^An |^The |^Someone |^A worker /i, "")
    .replace(/^who /i, "")
    .trim();

  const commaSplit = stripped.split(/[,;—]/)[0]?.trim() ?? stripped;
  const words = commaSplit.split(/\s+/).slice(0, 6);
  let phrase = words.join(" ").replace(/[."]+$/, "").toLowerCase();

  if (phrase.length > 48) {
    phrase = words.slice(0, 4).join(" ");
  }

  return phrase || "…";
}
