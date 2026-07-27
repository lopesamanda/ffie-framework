export const ARTIFACT_VALUE_OPTIONS = [
  "Efficiency",
  "Care",
  "Control",
  "Inclusion",
  "Productivity",
  "Competition",
  "Cooperation",
  "Surveillance",
  "Security",
  "Privacy",
  "Protection",
  "Autonomy",
  "Compliance",
  "Transparency",
] as const;

export const ARTIFACT_VALUE_OTHER = "Other";

export type ArtifactValueOption = (typeof ARTIFACT_VALUE_OPTIONS)[number];

export function resolveArtifactValues(draft: {
  artifactValues: string[];
  artifactValueOther: string;
}): string[] {
  const selected = draft.artifactValues.filter(
    (value) => value !== ARTIFACT_VALUE_OTHER,
  );
  const other = draft.artifactValueOther.trim();
  if (draft.artifactValues.includes(ARTIFACT_VALUE_OTHER) && other) {
    return [...selected, other];
  }
  return selected;
}

export function isArtifactValuesComplete(draft: {
  artifactValues: string[];
  artifactValueOther: string;
}): boolean {
  const resolved = resolveArtifactValues(draft);
  if (resolved.length < 2 || resolved.length > 4) return false;
  if (
    draft.artifactValues.includes(ARTIFACT_VALUE_OTHER) &&
    !draft.artifactValueOther.trim()
  ) {
    return false;
  }
  return true;
}
