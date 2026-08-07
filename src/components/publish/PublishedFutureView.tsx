"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { AnchoredConfirmationScreen } from "@/components/create/AnchoredConfirmationScreen";
import {
  FUTURE_SUMMARY_EXPORT_HEIGHT,
  FUTURE_SUMMARY_EXPORT_WIDTH,
} from "@/components/create/FutureSummaryExport";
import { usePublishDraft } from "@/hooks/usePublishDraft";
import { clearDraft } from "@/lib/journey/types";
import { hasPublishableDraft } from "@/lib/publish-flow/guards";

type PublishedFutureViewProps = {
  id: string;
};

export function PublishedFutureView({ id }: PublishedFutureViewProps) {
  const router = useRouter();
  const { draft, ready } = usePublishDraft();
  const [downloading, setDownloading] = useState(false);

  const isLocal = id === "local";
  const sessionMatch =
    draft &&
    (isLocal
      ? draft.outputStep === 3 && !draft.submittedId
      : draft.submittedId === id);

  useEffect(() => {
    if (!ready) return;
    if (!hasPublishableDraft(draft)) {
      router.replace("/create");
      return;
    }
    if (!sessionMatch) {
      if (draft.outputStep < 3) {
        router.replace("/matrix");
      } else if (draft.submittedId) {
        router.replace(`/published/${draft.submittedId}`);
      } else {
        router.replace("/published/local");
      }
    }
  }, [draft, ready, router, sessionMatch]);

  const handleDownload = async () => {
    if (!draft) return;
    const node = document.getElementById("future-summary-export");
    if (!node) return;

    setDownloading(true);
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        width: FUTURE_SUMMARY_EXPORT_WIDTH,
        height: FUTURE_SUMMARY_EXPORT_HEIGHT,
      });
      const link = document.createElement("a");
      link.download = `${draft.characterName.trim() || draft.artifactName.trim() || "ffie-future"}-summary.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleCreateAnother = () => {
    clearDraft();
    router.push("/create");
  };

  if (!ready || !draft || !sessionMatch) {
    return (
      <div className="py-20 text-center text-sm text-ffie-muted">Loading…</div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <AnchoredConfirmationScreen
        draft={draft}
        onDownload={handleDownload}
        downloading={downloading}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
}
