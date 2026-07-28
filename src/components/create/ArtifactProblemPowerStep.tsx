"use client";

import { AiPowerSelector } from "@/components/create/AiPowerSelector";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

export function ArtifactProblemPowerStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const p = pronounsForSelection(draft.characterPronoun);
  const fearAnswer = draft.fear.trim() || "…";

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-sm leading-relaxed text-ffie-ink">
          You said {p.subject} fears AI will{" "}
          <strong className="font-medium text-ffie-ink">{fearAnswer}</strong>.
          What problem or tension does this artifact respond to — or make worse?
        </p>
        <textarea
          value={draft.artifactProblemTension}
          onChange={(event) =>
            onChange({ artifactProblemTension: event.target.value })
          }
          rows={4}
          className={`${FIELD} resize-y`}
        />
      </section>

      <section>
        <AiPowerSelector
          values={draft.values}
          artifactType={draft.artifactType}
          selectedPower={draft.selectedAiPower}
          selectedCapabilityId={draft.selectedAiCapability}
          dayToDayDescription={draft.publicPromise}
          onSelectPower={(selectedAiPower) =>
            onChange({
              selectedAiPower,
              selectedAiCapability: "",
              publicPromise: "",
            })
          }
          onSelectCapability={(selectedAiCapability) =>
            onChange({ selectedAiCapability, publicPromise: "" })
          }
          onDayToDayChange={(publicPromise) => onChange({ publicPromise })}
        />
      </section>
    </div>
  );
}
