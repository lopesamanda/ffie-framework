import {
  ARTIFACT_VALUE_OPTIONS,
  type ArtifactValueOption,
} from "@/lib/journey/artifact-options";

export const ARTIFACT_WEAKNESS_OTHER_LABEL = "Other — write your own";

/** Pre-written shadow-side outcomes per embedded artifact value (Hidden function step). */
export const ARTIFACT_WEAKNESS_OPTIONS: Record<
  ArtifactValueOption,
  readonly string[]
> = {
  Efficiency: [
    "cut corners that protect the most vulnerable users",
    "reduce people to data points that process faster",
  ],
  Care: [
    "become surveillance disguised as concern",
    "decide what's best for someone without asking them",
  ],
  Control: [
    "quietly filter out people it decided were too much risk",
    "make decisions no one can question or appeal",
  ],
  Inclusion: [
    "count as inclusion without redistributing any real power",
    "become a checkbox instead of a structural change",
  ],
  Productivity: [
    "measure people only by output",
    "treat rest as a system failure",
  ],
  Competition: [
    "reward whoever can game it best, not whoever needs it most",
    "leave slower or under-resourced players behind",
  ],
  Cooperation: [
    "become mandatory, not chosen",
    "flatten real disagreement into forced consensus",
  ],
};

function canonicalArtifactValue(value: string): ArtifactValueOption | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return (
    ARTIFACT_VALUE_OPTIONS.find(
      (option) => option.toLowerCase() === trimmed.toLowerCase(),
    ) ?? null
  );
}

export function weaknessOptionsForValue(value: string): string[] {
  const canonical = canonicalArtifactValue(value);
  if (!canonical) return [];
  return [...ARTIFACT_WEAKNESS_OPTIONS[canonical]];
}

export function isPresetWeaknessOutcome(
  value: string,
  completion: string,
): boolean {
  const trimmed = completion.trim();
  if (!trimmed) return false;
  return weaknessOptionsForValue(value).includes(trimmed);
}
