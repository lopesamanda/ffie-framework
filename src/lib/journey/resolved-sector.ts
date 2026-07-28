import type { PersonaSector } from "@/lib/journey/persona-sectors";

/** Display sector from chip selection or custom text when Other is chosen. */
export function resolvedPersonaSector(
  sector: PersonaSector | "",
  sectorCustom?: string,
): string {
  if (sector === "Other") {
    return sectorCustom?.trim() ?? "";
  }
  return sector.trim();
}
