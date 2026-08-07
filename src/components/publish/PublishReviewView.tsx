"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PublishFlowChrome } from "@/components/publish/PublishFlowChrome";
import { PublishFlowFooter } from "@/components/publish/PublishFlowFooter";
import { PublishReflectScreen } from "@/components/publish/PublishReflectScreen";
import { usePublishDraft } from "@/hooks/usePublishDraft";
import { buildNarrative, buildTitle } from "@/lib/journey/types";
import {
  hasMatrixPlacement,
  hasPublishableDraft,
} from "@/lib/publish-flow/guards";
import { submitJourneyDraft } from "@/lib/publish-flow/submit-draft";

export function PublishReviewView() {
  const router = useRouter();
  const { draft, ready, update } = usePublishDraft();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!hasPublishableDraft(draft)) {
      router.replace("/create");
      return;
    }
    if (!hasMatrixPlacement(draft)) {
      router.replace("/matrix");
    }
  }, [draft, ready, router]);

  const handlePublish = async () => {
    if (!draft) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const title = buildTitle(draft.artifactName, draft.characterName);
      const narrative = buildNarrative({ ...draft, title });
      const prepared = {
        ...draft,
        title,
        narrative,
        outputStep: 3 as const,
        stage: "output" as const,
      };
      update(prepared);

      const result = await submitJourneyDraft(prepared);
      const submittedId = result.id ?? null;

      update({
        title: result.title,
        narrative: result.narrative,
        submittedId,
        outputStep: 3,
      });

      router.push(`/published/${submittedId ?? "local"}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Submission failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready || !draft) {
    return (
      <div className="py-20 text-center text-sm text-ffie-muted">Loading…</div>
    );
  }

  return (
    <PublishFlowChrome
      activeStep={2}
      footer={
        <PublishFlowFooter
          activeStep={2}
          onBack={() => router.push("/matrix")}
        />
      }
    >
      <PublishReflectScreen
        draft={draft}
        onUpdate={update}
        onPublish={handlePublish}
        submitting={submitting}
        submitError={submitError}
      />
    </PublishFlowChrome>
  );
}
