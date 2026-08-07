"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-[10px] border border-ffie-line bg-white px-4 py-3 text-sm text-ffie-ink outline-none focus:border-ffie-ink/30";

type PublishReflectScreenProps = {
  draft: JourneyDraft;
  onUpdate: (patch: Partial<JourneyDraft>) => void;
  onPublish: () => void;
  onBack: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

/** Figma node 28-623 — visibility + reflection before publish. */
export function PublishReflectScreen({
  draft,
  onUpdate,
  onPublish,
  onBack,
  submitting = false,
  submitError = null,
}: PublishReflectScreenProps) {
  const copy = PUBLISH_FLOW.review;
  const visibility = draft.submitToCommons ? "publish" : "private";

  return (
    <div className="mx-auto w-full max-w-[640px] space-y-9">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-tight text-ffie-ink">
          {copy.heading}
        </h1>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ffie-muted">
          {copy.subtitle}
        </p>
      </div>

      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
          {copy.visibilityEyebrow}
        </p>
        <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
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
                className={`rounded-xl px-5 py-5 text-left transition ${
                  selected
                    ? "border-2 border-ffie-ink bg-ffie-ink/[0.07]"
                    : "border border-ffie-line bg-white hover:border-ffie-ink/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex size-3.5 shrink-0 items-center justify-center rounded-[7px] border-2 ${
                      selected
                        ? "border-ffie-ink"
                        : "border-ffie-ink/25"
                    }`}
                  >
                    {selected && (
                      <span className="size-1.5 rounded-[3px] bg-ffie-ink" />
                    )}
                  </span>
                  <span
                    className={`font-display text-sm font-bold ${
                      selected ? "text-ffie-ink" : "text-ffie-muted"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
                <p className="mt-2 pl-6 text-xs leading-relaxed text-ffie-muted">
                  {option.hint}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ffie-muted">
            {copy.reflectionEyebrow}{" "}
            <span className="opacity-60">{copy.reflectionOptional}</span>
          </p>
          <button
            type="button"
            className="text-[11px] font-medium text-ffie-muted/70 underline underline-offset-2 hover:text-ffie-muted"
            onClick={() => onUpdate({ closingReflection: "" })}
          >
            {copy.skip}
          </button>
        </div>
        <textarea
          rows={4}
          value={draft.closingReflection}
          onChange={(event) =>
            onUpdate({ closingReflection: event.target.value })
          }
          className={`mt-2.5 ${FIELD}`}
          placeholder="..."
        />
      </div>

      {submitError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {submitError}
        </p>
      )}

      <div className="space-y-3 border-t border-ffie-line/70 pt-6">
        <p className="text-xs leading-relaxed text-ffie-muted">
          {copy.consentNote}
        </p>
        <div className="flex justify-end">
          <FfieButton
            onClick={onPublish}
            disabled={submitting}
            iconPosition="trailing"
          >
            {submitting ? "Publishing…" : copy.publish}
          </FfieButton>
        </div>
      </div>

      <PublishRitualFooter activeStep={2} onBack={onBack}>
        <span aria-hidden />
      </PublishRitualFooter>
    </div>
  );
}
