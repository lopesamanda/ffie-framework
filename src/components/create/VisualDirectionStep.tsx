"use client";

import type { JourneyDraft } from "@/lib/journey/types";

/** @deprecated Visual direction is now chosen with artifact type at step 1. */
export function VisualDirectionStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  void draft;
  void onChange;
  return null;
}

export {
  ensureVisualDirection,
  visualDirectionPatchForType,
} from "@/lib/journey/visual-directions";
