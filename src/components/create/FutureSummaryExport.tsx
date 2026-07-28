import { MatrixPositionDiagram } from "@/components/create/MatrixPositionDiagram";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { buildWhyItExistsParagraph } from "@/lib/journey/future-card-copy";
import { resolveCapabilityName } from "@/lib/journey/future-commons-narrative";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import {
  QUADRANT_COLORS,
  QUADRANT_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";

export const FUTURE_SUMMARY_EXPORT_WIDTH = 1080;
export const FUTURE_SUMMARY_EXPORT_HEIGHT = 1520;

type FutureSummaryExportProps = {
  draft: JourneyDraft;
  id?: string;
  /** Published Future Commons URL — shown when the future has been submitted. */
  commonsUrl?: string | null;
};

export function FutureSummaryExport({
  draft,
  id = "future-summary-export",
  commonsUrl,
}: FutureSummaryExportProps) {
  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);
  const personaName = draft.characterName.trim() || "Your future";
  const role = resolvedCharacterRole(draft.role, draft.roleCustom);
  const metaLine = [draft.characterAge, role].filter(Boolean).join(" · ");
  const capabilityName = resolveCapabilityName(draft.selectedAiCapability);
  const hiddenFunction =
    composeHiddenFunction(draft) || draft.hiddenFunction.trim();
  const values = resolveArtifactValues(draft);
  const whyItExistsText = buildWhyItExistsParagraph(draft);

  return (
    <div
      id={id}
      className="bg-ffie-bg text-ffie-ink"
      style={{
        width: FUTURE_SUMMARY_EXPORT_WIDTH,
        height: FUTURE_SUMMARY_EXPORT_HEIGHT,
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="flex h-full flex-col p-14">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ffie-accent">
              FFIE · Future Summary
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
              {personaName}
            </h1>
            {metaLine && (
              <p className="mt-2 text-xl text-ffie-muted">{metaLine}</p>
            )}
          </div>
          <span
            className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: QUADRANT_COLORS[quadrant],
              color: QUADRANT_TEXT_COLORS[quadrant],
            }}
          >
            {QUADRANT_LABELS[quadrant]}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-[1fr_280px] gap-10">
          <div className="space-y-6">
            {whyItExistsText && (
              <p className="text-lg leading-relaxed text-ffie-ink">
                {whyItExistsText}
              </p>
            )}

            {draft.artifactName.trim() && (
              <h2 className="text-2xl font-semibold text-ffie-ink">
                {draft.artifactName.trim()}
              </h2>
            )}

            <div className="space-y-4 text-base">
              {capabilityName && (
                <div className="rounded-xl border border-ffie-line bg-ffie-surface p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-ffie-muted">
                    AI function
                  </p>
                  <p className="mt-2">{capabilityName}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#f6f4ff] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-ffie-accent">
                    Artifact goal
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {draft.publicPromise || "—"}
                  </p>
                  {draft.artifactGoalPitch.trim() && (
                    <p className="mt-2 text-sm italic leading-relaxed text-ffie-muted">
                      {draft.artifactGoalPitch.trim()}
                    </p>
                  )}
                </div>
                <div className="rounded-xl bg-[#fdf1ee] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#c8472a]">
                    Artifact weakness
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {hiddenFunction || "—"}
                  </p>
                </div>
              </div>
            </div>

            {values.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-ffie-line bg-ffie-surface px-3 py-1 text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3">
            <MatrixPositionDiagram
              position={draft.position}
              className="w-full rounded-xl border border-ffie-line bg-ffie-surface"
            />
            <p className="text-center text-xs text-ffie-muted">
              Critical Feminist Matrix · your position
            </p>
          </div>
        </div>

        {commonsUrl && (
          <div className="mt-auto flex items-end justify-between gap-6 border-t border-ffie-line pt-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ffie-muted">
                Future Commons
              </p>
              <p className="mt-2 text-sm text-ffie-accent">{commonsUrl}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(commonsUrl)}`}
              alt=""
              width={100}
              height={100}
              className="rounded-lg border border-ffie-line bg-white p-1"
            />
          </div>
        )}

        <p className="mt-6 text-right text-xs text-ffie-muted">
          Feminist Foresight in Innovation Ecosystems
        </p>
      </div>
    </div>
  );
}
