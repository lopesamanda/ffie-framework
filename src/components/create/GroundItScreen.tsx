"use client";

import { useMemo } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import { pickReflectivePrompt } from "@/lib/reflective-prompts";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type GroundItScreenProps = {
  draft: JourneyDraft;
  onUpdate: (patch: Partial<JourneyDraft>) => void;
  onPublish: () => void;
  onBack: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

export function GroundItScreen({
  draft,
  onUpdate,
  onPublish,
  onBack,
  submitting = false,
  submitError = null,
}: GroundItScreenProps) {
  const copy = PUBLISH_RITUAL.reflect;
  const visibility = draft.submitToCommons ? "publish" : "private";
  const reflectivePrompt = useMemo(
    () => pickReflectivePrompt(draft.sessionId),
    [draft.sessionId],
  );

  return (
    <div className="w-full space-y-8">
      <PublishRitualStepper activeStep={2} />

      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            {
              value: "publish" as const,
              label: copy.visibilityPublic,
              hint: copy.visibilityPublicHint,
            },
            {
              value: "private" as const,
              label: copy.visibilityPrivate,
              hint: copy.visibilityPrivateHint,
            },
          ] as const
        ).map((option) => {
          const selected = visibility === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onUpdate({ submitToCommons: option.value === "publish" })
              }
              className={`rounded-xl border px-4 py-4 text-left transition ${
                selected
                  ? "border-ffie-accent bg-ffie-accent-soft shadow-[0_0_0_1px_var(--color-ffie-accent)]"
                  : "border-ffie-line bg-ffie-surface hover:border-ffie-ink/20"
              }`}
            >
              <p className="text-sm font-semibold text-ffie-ink">{option.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ffie-muted">
                {option.hint}
              </p>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ffie-ink" htmlFor="reflective-prompt">
          {copy.reflectionLabel}
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
          placeholder={copy.reflectionPlaceholder}
        />
        <button
          type="button"
          className="text-xs text-ffie-accent underline-offset-2 hover:underline"
          onClick={() => onUpdate({ closingReflection: "" })}
        >
          {copy.skip}
        </button>
      </div>

      {submitError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {submitError}
        </p>
      )}

      <PublishRitualFooter activeStep={2} onBack={onBack}>
        <div className="space-y-3">
          <p className="text-xs leading-relaxed text-ffie-muted">{copy.consentNote}</p>
          <FfieButton
            onClick={onPublish}
            disabled={submitting}
            iconPosition="trailing"
            className="w-full sm:w-auto"
          >
            {submitting ? copy.publishing : copy.publish}
          </FfieButton>
        </div>
      </PublishRitualFooter>
    </div>
  );
}
