"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { SegmentedControl } from "@/components/create/design/SegmentedControl";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type GroundItScreenProps = {
  draft: JourneyDraft;
  submitting: boolean;
  submitError: string | null;
  onUpdate: (patch: Partial<JourneyDraft>) => void;
  onPublish: () => void;
  onContinuePrivate: () => void;
};

export function GroundItScreen({
  draft,
  submitting,
  submitError,
  onUpdate,
  onPublish,
  onContinuePrivate,
}: GroundItScreenProps) {
  const visibility = draft.submitToCommons ? "publish" : "private";

  return (
    <div className="w-full max-w-xl space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium text-ffie-ink">Who can see this future?</p>
        <SegmentedControl
          ariaLabel="Visibility"
          value={visibility}
          onChange={(value) =>
            onUpdate({ submitToCommons: value === "publish" })
          }
          options={[
            { value: "publish", label: "Publish to Future Commons" },
            { value: "private", label: "Keep private" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ffie-ink" htmlFor="closing-reflection">
          Reflection (optional)
        </label>
        <p className="text-xs text-ffie-muted">
          What does placing this future here make you think or feel?
        </p>
        <textarea
          id="closing-reflection"
          rows={4}
          value={draft.closingReflection}
          onChange={(event) =>
            onUpdate({ closingReflection: event.target.value })
          }
          className={FIELD}
          placeholder="A sentence or two is enough."
        />
        {!draft.closingReflection.trim() && (
          <button
            type="button"
            className="text-xs text-ffie-accent underline-offset-2 hover:underline"
            onClick={() => onUpdate({ closingReflection: "" })}
          >
            Skip this
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ffie-ink" htmlFor="situated-knowledge">
          Situated Knowledge (optional)
        </label>
        <p className="text-xs text-ffie-muted">
          Is this future grounded in a specific place, community, or lineage of
          knowledge? Name it here, if you&apos;d like.
        </p>
        <textarea
          id="situated-knowledge"
          rows={3}
          value={draft.situatedKnowledge}
          onChange={(event) =>
            onUpdate({ situatedKnowledge: event.target.value })
          }
          className={FIELD}
          placeholder="e.g., a workshop in Recife, a conversation with…"
        />
        {!draft.situatedKnowledge.trim() && (
          <button
            type="button"
            className="text-xs text-ffie-accent underline-offset-2 hover:underline"
            onClick={() => onUpdate({ situatedKnowledge: "" })}
          >
            Skip this
          </button>
        )}
      </div>

      <div className="space-y-3 border-t border-ffie-line pt-6">
        <p className="text-xs leading-relaxed text-ffie-muted">
          This artifact is speculative fiction, not personal data. Nothing about
          you is published — only what you chose to imagine.
        </p>
        {submitError && <p className="text-sm text-red-700">{submitError}</p>}
        {draft.submitToCommons ? (
          <FfieButton disabled={submitting} onClick={onPublish}>
            {submitting ? "Publishing…" : "Publish"}
          </FfieButton>
        ) : (
          <FfieButton onClick={onContinuePrivate}>Continue</FfieButton>
        )}
      </div>
    </div>
  );
}
