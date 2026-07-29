"use client";

import { useState } from "react";
import Image from "next/image";
import { SettleButton } from "@/components/motion/SettleButton";
import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  defaultVisualDirectionForType,
  VISUAL_DIRECTION_IMAGES,
} from "@/lib/journey/visual-directions";
import type { JourneyDraft } from "@/lib/journey/types";

export function VisualDirectionStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const defaultPath = defaultVisualDirectionForType(draft.artifactType);
  const selectedPath = draft.visualDirection || defaultPath;
  const [showAll, setShowAll] = useState(
    !VISUAL_DIRECTION_IMAGES.some(
      (entry) =>
        entry.path === selectedPath &&
        entry.artifactType === draft.artifactType,
    ),
  );

  const primary = VISUAL_DIRECTION_IMAGES.find(
    (entry) => entry.artifactType === draft.artifactType,
  );
  const others = VISUAL_DIRECTION_IMAGES.filter(
    (entry) => entry.artifactType !== draft.artifactType,
  );
  const visible = showAll
    ? VISUAL_DIRECTION_IMAGES
    : primary
      ? [primary]
      : VISUAL_DIRECTION_IMAGES.slice(0, 1);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-ffie-ink">
          Choose a visual direction.
        </p>
        <p className="text-sm leading-relaxed text-ffie-muted">
          A curated look for your artifact on the final Future card — pick the
          direction that fits, or browse others.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((entry) => {
          const selected = selectedPath === entry.path;
          return (
            <SettleButton
              key={entry.path}
              onClick={() => onChange({ visualDirection: entry.path })}
              className={`overflow-hidden rounded-xl border-2 text-left transition ${
                selected
                  ? "border-ffie-accent ring-2 ring-ffie-accent/25"
                  : "border-ffie-line hover:border-ffie-accent/40"
              }`}
            >
              <div className="relative aspect-[4/3] w-full bg-ffie-bg">
                <Image
                  src={entry.path}
                  alt={entry.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <p className="px-3 py-2 text-xs font-medium text-ffie-ink">
                {entry.label}
              </p>
            </SettleButton>
          );
        })}
      </div>

      {!showAll && others.length > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="text-xs font-medium text-ffie-accent transition hover:underline"
        >
          See other directions ↓
        </button>
      )}

      {showAll && (
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className="text-xs font-medium text-ffie-muted transition hover:text-ffie-ink"
        >
          Show type default only ↑
        </button>
      )}
    </div>
  );
}

export function ensureVisualDirection(
  draft: Pick<JourneyDraft, "artifactType" | "visualDirection">,
): string {
  return draft.visualDirection || defaultVisualDirectionForType(draft.artifactType);
}

/** Initialize visual direction when entering the step. */
export function visualDirectionPatchForType(
  artifactType: ArtifactTypeId | "",
): Partial<JourneyDraft> {
  return { visualDirection: defaultVisualDirectionForType(artifactType) };
}
