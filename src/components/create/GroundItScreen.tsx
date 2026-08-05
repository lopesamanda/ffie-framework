"use client";

import { useMemo } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { SegmentedControl } from "@/components/create/design/SegmentedControl";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import { pickReflectivePrompt } from "@/lib/reflective-prompts";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type GroundItScreenProps = {
  draft: JourneyDraft;
  onUpdate: (patch: Partial<JourneyDraft>) => void;
  onContinue: () => void;
};

export function GroundItScreen({
  draft,
  onUpdate,
  onContinue,
}: GroundItScreenProps) {
  const copy = PUBLISH_RITUAL.groundIt;
  const visibility = draft.submitToCommons ? "publish" : "private";
  const reflectivePrompt = useMemo(
    () => pickReflectivePrompt(draft.sessionId),
    [draft.sessionId],
  );

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
            { value: "publish", label: copy.visibilityPublic },
            { value: "private", label: copy.visibilityPrivate },
          ]}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ffie-ink" htmlFor="reflective-prompt">
          Reflective prompt (optional)
        </label>
        <p className="text-xs text-ffie-muted">{reflectivePrompt}</p>
        <textarea
          id="reflective-prompt"
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
            {copy.skip}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ffie-ink" htmlFor="situated-knowledge">
          {copy.attributionLabel}
        </label>
        <p className="text-xs text-ffie-muted">{copy.attributionHint}</p>
        <textarea
          id="situated-knowledge"
          rows={3}
          value={draft.situatedKnowledge}
          onChange={(event) =>
            onUpdate({ situatedKnowledge: event.target.value })
          }
          className={FIELD}
          placeholder={copy.attributionPlaceholder}
        />
        {!draft.situatedKnowledge.trim() && (
          <button
            type="button"
            className="text-xs text-ffie-accent underline-offset-2 hover:underline"
            onClick={() => onUpdate({ situatedKnowledge: "" })}
          >
            {copy.skip}
          </button>
        )}
      </div>

      <div className="space-y-3 border-t border-ffie-line pt-6">
        <p className="text-xs leading-relaxed text-ffie-muted">{copy.consentNote}</p>
        <FfieButton onClick={onContinue}>{copy.continue}</FfieButton>
      </div>
    </div>
  );
}
