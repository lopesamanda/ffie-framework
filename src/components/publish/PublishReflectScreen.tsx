"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type PublishReflectScreenProps = {
  draft: JourneyDraft;
  onUpdate: (patch: Partial<JourneyDraft>) => void;
  onPublish: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

/** Figma node 28-623 — visibility + reflection before publish. */
export function PublishReflectScreen({
  draft,
  onUpdate,
  onPublish,
  submitting = false,
  submitError = null,
}: PublishReflectScreenProps) {
  const copy = PUBLISH_FLOW.review;
  const visibility = draft.submitToCommons ? "publish" : "private";

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <div>
        <h1 className="font-display text-[26px] font-bold leading-[33.8px] tracking-[-0.52px] text-ffie-ink">
          {copy.heading}
        </h1>
        <p className="pt-3 max-w-prose text-sm leading-[22.4px] text-[rgba(35,19,82,0.55)]">
          {copy.subtitle}
        </p>
      </div>

      <div className="pt-9">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(35,19,82,0.4)]">
          {copy.visibilityEyebrow}
        </p>
        <div className="grid gap-3 pt-[14px] sm:grid-cols-2">
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
                className={`rounded-[10px] px-[22px] py-5 text-left transition ${
                  selected
                    ? "border-2 border-ffie-ink bg-[rgba(35,19,82,0.07)]"
                    : "border border-[rgba(35,19,82,0.12)] bg-white hover:border-[rgba(35,19,82,0.2)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex size-3.5 shrink-0 items-center justify-center rounded-[7px] border-2 ${
                      selected
                        ? "border-ffie-ink"
                        : "border-[rgba(35,19,82,0.25)]"
                    }`}
                  >
                    {selected && (
                      <span className="size-1.5 rounded-[3px] bg-ffie-ink" />
                    )}
                  </span>
                  <span
                    className={`font-display text-sm font-bold ${
                      selected ? "text-ffie-ink" : "text-[rgba(35,19,82,0.55)]"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
                <p className="mt-2 pl-6 text-xs leading-[19.2px] text-[rgba(35,19,82,0.55)]">
                  {option.hint}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(35,19,82,0.4)]">
            {copy.reflectionEyebrow}{" "}
            <span className="opacity-60">{copy.reflectionOptional}</span>
          </p>
          <button
            type="button"
            className="text-[11px] font-medium text-[rgba(35,19,82,0.4)] underline underline-offset-2 hover:text-[rgba(35,19,82,0.65)]"
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
          className="mt-2.5 w-full rounded-[10px] border border-[rgba(35,19,82,0.12)] bg-white px-[17px] py-[13px] text-sm leading-[22.4px] text-ffie-ink outline-none focus:border-[rgba(35,19,82,0.3)]"
          placeholder="..."
        />
      </div>

      {submitError && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {submitError}
        </p>
      )}

      <div className="pt-9">
        <p className="text-xs leading-[19.2px] text-[rgba(35,19,82,0.55)]">
          {copy.consentNote}
        </p>
        <div className="flex justify-end pt-3">
          <FfieButton
            onClick={onPublish}
            disabled={submitting}
            iconPosition="trailing"
            className="!px-7 !py-3"
          >
            {submitting ? "Publishing…" : copy.publish}
          </FfieButton>
        </div>
      </div>
    </div>
  );
}
