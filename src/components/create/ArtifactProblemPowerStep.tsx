"use client";

import { AiPowerSelector } from "@/components/create/AiPowerSelector";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

function SubStepProgress({ completed }: { completed: boolean[] }) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Section progress: ${completed.filter(Boolean).length} of ${completed.length}`}
    >
      {completed.map((done, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full transition-colors ${
            done ? "bg-ffie-accent" : "bg-ffie-line"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ArtifactProblemPowerStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const p = pronounsForSelection(draft.characterPronoun);
  const fearAnswer = draft.fear.trim() || "…";

  const subSteps = [
    draft.artifactProblemTension.trim().length > 0,
    Boolean(draft.selectedAiPower),
    Boolean(draft.selectedAiCapability),
    draft.publicPromise.trim().length > 0,
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
          Within this step
        </p>
        <SubStepProgress completed={subSteps} />
      </div>

      <section className="space-y-3">
        <p className="text-sm leading-relaxed text-ffie-ink">
          You said {p.subject} fears Artificial Intelligence will{" "}
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
          artifactName={draft.artifactName}
          selectedPower={draft.selectedAiPower}
          selectedCapabilityId={draft.selectedAiCapability}
          dayToDayDescription={draft.publicPromise}
          artifactGoalPitch={draft.artifactGoalPitch}
          onSelectPower={(selectedAiPower) =>
            onChange({
              selectedAiPower,
              selectedAiCapability: "",
              publicPromise: "",
              artifactGoalPitch: "",
            })
          }
          onSelectCapability={(selectedAiCapability) =>
            onChange({
              selectedAiCapability,
              publicPromise: "",
              artifactGoalPitch: "",
            })
          }
          onDayToDayChange={(publicPromise) => onChange({ publicPromise })}
          onGoalPitchChange={(artifactGoalPitch) =>
            onChange({ artifactGoalPitch })
          }
        />
      </section>
    </div>
  );
}
