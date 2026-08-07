"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadDraft,
  saveDraft,
  type JourneyDraft,
} from "@/lib/journey/types";

export function usePublishDraft() {
  const [draft, setDraft] = useState<JourneyDraft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<JourneyDraft>) => {
    setDraft((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      saveDraft(next);
      return next;
    });
  }, []);

  const replace = useCallback((next: JourneyDraft) => {
    saveDraft(next);
    setDraft(next);
  }, []);

  return { draft, ready, update, replace };
}
