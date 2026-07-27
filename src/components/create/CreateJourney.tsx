"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { PhaseTimeline } from "@/components/create/PhaseTimeline";
import { NarrativeCardFace } from "@/components/create/NarrativeCardFace";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { MatrixPlacementPicker } from "@/components/create/MatrixPlacementPicker";
import { FuturePreviewPanel } from "@/components/FuturePreviewPanel";
import {
  buildCombinedTension,
  drawWorkshopHand,
  ENVIRONMENTAL_IMPACT_CARD,
} from "@/data/narrative-cards";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import {
  buildAiImagePrompt,
  buildNarrative,
  buildReflectionQuestion,
  buildTitle,
  clearDraft,
  createInitialDraft,
  formatQuadrantLabel,
  getOrCreateSessionId,
  loadDraft,
  quadrantFromPosition,
  ROLE_SUGGESTIONS,
  saveDraft,
  WORKSHOP_VALUES,
  type JourneyDraft,
  type JourneyStage,
} from "@/lib/journey/types";

const EXPLORATION_IDS = [
  "br-valentina-insider",
  "pt-taina-a-eye",
  "pt-john-bell-open-human",
];

const ORIENTATION_COPY = [
  "This isn't a quiz. There are no right answers — feminist foresight means the future looks different depending on where you stand.",
  "You'll draw cards, reflect, and build a small future of your own — about 15 minutes.",
  "Then you'll see the futures other people, and the original research, have already imagined.",
];

const CREATION_STEPS = [
  "Character & location",
  "Role in 2036",
  "Desire & fear",
  "Three values",
  "Artifact",
  "Image (optional)",
];

export function CreateJourney() {
  const [draft, setDraft] = useState<JourneyDraft | null>(null);
  const [exploreEntryId, setExploreEntryId] = useState<string | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const saved = loadDraft();
    setDraft(saved ?? createInitialDraft(sessionId));
  }, []);

  const update = useCallback((patch: Partial<JourneyDraft>) => {
    setDraft((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      saveDraft(next);
      return next;
    });
  }, []);

  const goTo = useCallback(
    (stage: JourneyStage, patch: Partial<JourneyDraft> = {}) => {
      update({ stage, ...patch });
    },
    [update],
  );

  const explorationEntries = useMemo(
    () =>
      EXPLORATION_IDS.map((id) =>
        researchFindingsSeed.find((entry) => entry.id === id),
      ).filter(Boolean),
    [],
  );

  const aiPrompt = useMemo(
    () => (draft ? buildAiImagePrompt(draft) : ""),
    [draft],
  );

  const handleDrawCards = () => {
    setRevealing(true);
    setTimeout(() => {
      const hand = drawWorkshopHand();
      const combinedTension = buildCombinedTension(hand);
      update({
        cardHand: hand,
        combinedTension,
      });
      setRevealing(false);
    }, 900);
  };

  const handleFinishOutput = async () => {
    if (!draft) return;

    const title = buildTitle(draft.artifactName, draft.characterName);
    const narrative = buildNarrative({ ...draft, title });
    const reflectionQuestion = buildReflectionQuestion(draft);
    const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);

    update({ title, narrative });

    if (!draft.submitToCommons) {
      goTo("discovery", { title, narrative });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: draft.sessionId,
          title,
          narrative,
          reflectionQuestion,
          location: draft.location,
          characterName: draft.characterName,
          role: draft.role,
          aiFunction: draft.aiFunction,
          desire: draft.desire,
          fear: draft.fear,
          values: draft.values,
          artifactName: draft.artifactName,
          publicPromise: draft.publicPromise,
          hiddenFunction: draft.hiddenFunction,
          tension: draft.combinedTension,
          quadrant,
          position: draft.position,
          placementJustification: draft.placementJustification,
          cardProvenance: draft.cardHand
            ? [
                draft.cardHand.risk.id,
                draft.cardHand.benefit.id,
                draft.cardHand.trust.id,
                draft.cardHand.barrier.id,
                draft.cardHand.transversal.id,
              ]
            : [],
          reflectionText: draft.reflectionText,
          imageDataUrl: draft.imageDataUrl,
          submitToCommons: true,
        }),
      });

      const result = (await response.json()) as {
        id?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Submission failed");
      }

      goTo("discovery", {
        title,
        narrative,
        submittedId: result.id ?? null,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Submission failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = async () => {
    const node = document.getElementById("future-output-card");
    if (!node) return;
    const dataUrl = await toPng(node, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `${draft?.title || "ffie-future"}.png`;
    link.href = dataUrl;
    link.click();
  };

  if (!draft) {
    return (
      <div className="py-20 text-center text-sm text-ffie-muted">Loading…</div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <PhaseTimeline current={draft.stage} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={draft.stage + draft.orientationStep + draft.creationStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {draft.stage === "entry" && (
                <section className="mx-auto max-w-xl space-y-8 text-center">
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    What future are you carrying?
                  </h1>
                  <p className="text-lg text-ffie-muted">
                    Draw a hand of cards and find out.
                  </p>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 w-16 rounded-lg border border-ffie-line bg-ffie-accent-soft/40"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => goTo("orientation")}
                    className="rounded-full bg-ffie-accent px-8 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Begin
                  </button>
                </section>
              )}

              {draft.stage === "orientation" && (
                <section className="mx-auto max-w-xl space-y-8 text-center">
                  <p className="text-lg leading-relaxed text-ffie-ink">
                    {ORIENTATION_COPY[draft.orientationStep]}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs uppercase tracking-wide text-ffie-muted">
                    <span>Risks</span>
                    <span>·</span>
                    <span>Benefits</span>
                    <span>·</span>
                    <span>Trust</span>
                    <span>·</span>
                    <span>Barriers</span>
                    <span>·</span>
                    <span className="text-ffie-accent">Environmental lens</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (draft.orientationStep < ORIENTATION_COPY.length - 1) {
                        update({ orientationStep: draft.orientationStep + 1 });
                      } else {
                        goTo("exploration", { orientationStep: 0 });
                      }
                    }}
                    className="rounded-full bg-ffie-accent px-8 py-3 text-sm font-medium text-white"
                  >
                    {draft.orientationStep < ORIENTATION_COPY.length - 1
                      ? "Continue"
                      : "See examples"}
                  </button>
                </section>
              )}

              {draft.stage === "exploration" && (
                <section className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Futures already imagined
                    </h2>
                    <p className="mt-2 text-sm text-ffie-muted">
                      Three diegetic prototypes from the thesis — from the same
                      19-card deck you are about to use.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {explorationEntries.map((entry) =>
                      entry ? (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => setExploreEntryId(entry.id)}
                          className="rounded-xl border border-ffie-line bg-ffie-surface p-4 text-left transition hover:border-ffie-accent/40"
                        >
                          <p className="text-xs uppercase tracking-wide text-ffie-accent">
                            Research Finding
                          </p>
                          <h3 className="mt-2 font-semibold">{entry.title}</h3>
                          <p className="mt-1 text-sm text-ffie-muted line-clamp-2">
                            {entry.tension}
                          </p>
                        </button>
                      ) : null,
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => goTo("reflection")}
                    className="rounded-full bg-ffie-accent px-6 py-2.5 text-sm font-medium text-white"
                  >
                    Draw your cards
                  </button>
                </section>
              )}

              {draft.stage === "reflection" && (
                <section className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Your hand
                    </h2>
                    <p className="mt-2 text-sm text-ffie-muted">
                      One card from each category, plus the Environmental Impact
                      lens applied to every session — as in the thesis workshops.
                    </p>
                  </div>

                  {!draft.cardHand ? (
                    <button
                      type="button"
                      disabled={revealing}
                      onClick={handleDrawCards}
                      className="rounded-full bg-ffie-accent px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                    >
                      {revealing ? "Drawing…" : "Reveal cards"}
                    </button>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <NarrativeCardFace card={draft.cardHand.risk} />
                        <NarrativeCardFace card={draft.cardHand.benefit} />
                        <NarrativeCardFace card={draft.cardHand.trust} />
                        <NarrativeCardFace card={draft.cardHand.barrier} />
                        <NarrativeCardFace
                          card={draft.cardHand.transversal}
                          fixedLens
                        />
                      </div>
                      <div className="rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft p-4">
                        <p className="text-xs uppercase tracking-wide text-ffie-accent">
                          Combined tension
                        </p>
                        <p className="mt-2 text-sm font-medium text-ffie-ink">
                          {draft.combinedTension}
                        </p>
                        <p className="mt-2 text-xs text-ffie-muted">
                          Lens: {ENVIRONMENTAL_IMPACT_CARD.tension} —{" "}
                          {ENVIRONMENTAL_IMPACT_CARD.description.slice(0, 120)}…
                        </p>
                      </div>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-ffie-ink">
                          Where do you feel this tension yourself — in your work,
                          your community, your own use of AI?
                        </span>
                        <textarea
                          value={draft.reflectionText}
                          onChange={(event) =>
                            update({ reflectionText: event.target.value })
                          }
                          rows={3}
                          className="w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm"
                          placeholder="A sentence or two is enough."
                        />
                      </label>
                      <button
                        type="button"
                        disabled={!draft.reflectionText.trim()}
                        onClick={() => goTo("creation", { creationStep: 0 })}
                        className="rounded-full bg-ffie-accent px-6 py-2.5 text-sm font-medium text-white disabled:opacity-40"
                      >
                        Build your future
                      </button>
                    </>
                  )}
                </section>
              )}

              {draft.stage === "creation" && (
                <section className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Creation
                    </h2>
                    <span className="text-xs uppercase tracking-wide text-ffie-muted">
                      Step {draft.creationStep + 1} of {CREATION_STEPS.length} —{" "}
                      {CREATION_STEPS[draft.creationStep]}
                    </span>
                  </div>

                  {draft.creationStep === 0 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">Character name</span>
                        <input
                          value={draft.characterName}
                          onChange={(e) => update({ characterName: e.target.value })}
                          placeholder="e.g. Marina"
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">
                          Where are they speaking from?
                        </span>
                        <input
                          value={draft.location}
                          onChange={(e) => update({ location: e.target.value })}
                          placeholder="City, country, or context — open text"
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 1 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">
                          Role in an innovation ecosystem (2036)
                        </span>
                        <input
                          value={draft.role}
                          onChange={(e) => update({ role: e.target.value })}
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ROLE_SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => update({ role: suggestion })}
                            className="rounded-full border border-ffie-line px-3 py-1 text-xs text-ffie-muted hover:border-ffie-accent/40"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">
                          AI function in daily life
                        </span>
                        <input
                          value={draft.aiFunction}
                          onChange={(e) => update({ aiFunction: e.target.value })}
                          placeholder="Optional"
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 2 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">One desire</span>
                        <input
                          value={draft.desire}
                          onChange={(e) => update({ desire: e.target.value })}
                          placeholder={`Prompted by: ${draft.combinedTension}`}
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">One fear</span>
                        <input
                          value={draft.fear}
                          onChange={(e) => update({ fear: e.target.value })}
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 3 && (
                    <div className="space-y-3">
                      <p className="text-sm text-ffie-muted">
                        Choose three non-negotiable values ({draft.values.length}/3)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {WORKSHOP_VALUES.map((value) => {
                          const selected = draft.values.includes(value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => {
                                if (selected) {
                                  update({
                                    values: draft.values.filter((v) => v !== value),
                                  });
                                } else if (draft.values.length < 3) {
                                  update({ values: [...draft.values, value] });
                                }
                              }}
                              className={`rounded-full border px-3 py-1.5 text-xs capitalize ${
                                selected
                                  ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
                                  : "border-ffie-line text-ffie-muted"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {draft.creationStep === 4 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">Artifact name</span>
                        <input
                          value={draft.artifactName}
                          onChange={(e) => update({ artifactName: e.target.value })}
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">Public promise</span>
                        <input
                          value={draft.publicPromise}
                          onChange={(e) => update({ publicPromise: e.target.value })}
                          placeholder="What it claims to offer"
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">Hidden function / tension</span>
                        <textarea
                          value={draft.hiddenFunction}
                          onChange={(e) => update({ hiddenFunction: e.target.value })}
                          placeholder="An artifact that promises ___ but actually ___"
                          rows={3}
                          className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 5 && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-ffie-line bg-ffie-bg/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-ffie-muted">
                          AI image prompt — copy and run externally
                        </p>
                        <textarea
                          readOnly
                          value={aiPrompt}
                          rows={8}
                          className="mt-2 w-full bg-transparent text-xs leading-relaxed text-ffie-ink"
                        />
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(aiPrompt)}
                          className="mt-2 text-xs font-medium text-ffie-accent hover:underline"
                        >
                          Copy prompt
                        </button>
                      </div>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium">
                          Upload generated image (optional)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () =>
                              update({ imageDataUrl: reader.result as string });
                            reader.readAsDataURL(file);
                          }}
                          className="text-sm"
                        />
                      </label>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {draft.creationStep > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          update({ creationStep: draft.creationStep - 1 })
                        }
                        className="rounded-full border border-ffie-line px-5 py-2 text-sm"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={
                        (draft.creationStep === 0 &&
                          (!draft.characterName.trim() ||
                            !draft.location.trim())) ||
                        (draft.creationStep === 1 && !draft.role.trim()) ||
                        (draft.creationStep === 2 &&
                          (!draft.desire.trim() || !draft.fear.trim())) ||
                        (draft.creationStep === 3 && draft.values.length !== 3) ||
                        (draft.creationStep === 4 &&
                          (!draft.artifactName.trim() ||
                            !draft.publicPromise.trim() ||
                            !draft.hiddenFunction.trim()))
                      }
                      onClick={() => {
                        if (draft.creationStep < CREATION_STEPS.length - 1) {
                          update({ creationStep: draft.creationStep + 1 });
                        } else {
                          const title = buildTitle(
                            draft.artifactName,
                            draft.characterName,
                          );
                          const narrative = buildNarrative({
                            ...draft,
                            title,
                          });
                          goTo("output", { title, narrative, creationStep: 0 });
                        }
                      }}
                      className="rounded-full bg-ffie-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                      {draft.creationStep < CREATION_STEPS.length - 1
                        ? "Next"
                        : "Place on matrix"}
                    </button>
                  </div>
                </section>
              )}

              {draft.stage === "output" && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Future Output
                  </h2>
                  <MatrixPlacementPicker
                    position={draft.position}
                    onChange={(position) => update({ position })}
                  />
                  <label className="block space-y-2">
                    <span className="text-sm font-medium">
                      Why does your artifact belong here?
                    </span>
                    <textarea
                      value={draft.placementJustification}
                      onChange={(e) =>
                        update({ placementJustification: e.target.value })
                      }
                      rows={2}
                      className="w-full rounded-xl border border-ffie-line px-4 py-3 text-sm"
                    />
                  </label>
                  <p className="text-sm text-ffie-muted">
                    Quadrant:{" "}
                    <strong className="text-ffie-ink">
                      {formatQuadrantLabel(
                        quadrantFromPosition(
                          draft.position.x,
                          draft.position.y,
                        ),
                      )}
                    </strong>
                  </p>
                  <label className="flex items-start gap-3 rounded-xl border border-ffie-line p-4">
                    <input
                      type="checkbox"
                      checked={draft.submitToCommons}
                      onChange={(e) =>
                        update({ submitToCommons: e.target.checked })
                      }
                      className="mt-1"
                    />
                    <span className="text-sm text-ffie-muted">
                      Submit this diegetic prototype to the Future Commons for
                      moderation. If approved, it will appear alongside Research
                      Findings — always labeled as community-created.
                    </span>
                  </label>
                  {submitError && (
                    <p className="text-sm text-red-700">{submitError}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="rounded-full border border-ffie-line px-5 py-2 text-sm"
                    >
                      Download card
                    </button>
                    <button
                      type="button"
                      disabled={
                        submitting || !draft.placementJustification.trim()
                      }
                      onClick={handleFinishOutput}
                      className="rounded-full bg-ffie-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                      {submitting
                        ? "Submitting…"
                        : draft.submitToCommons
                          ? "Submit & continue"
                          : "Continue to Discovery"}
                    </button>
                  </div>
                </section>
              )}

              {draft.stage === "discovery" && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Discovery of Other Futures
                  </h2>
                  {draft.submittedId ? (
                    <p className="text-sm text-ffie-muted">
                      Your prototype was submitted with status{" "}
                      <strong className="text-ffie-ink">pending</strong>. Amanda
                      will review it before it appears in Future Commons.
                    </p>
                  ) : (
                    <p className="text-sm text-ffie-muted">
                      Your future stays personal — downloaded locally, not sent
                      for moderation.
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={
                        draft.submittedId
                          ? `/explore?highlight=${draft.submittedId}`
                          : "/explore"
                      }
                      className="rounded-full bg-ffie-accent px-5 py-2 text-sm font-medium text-white"
                    >
                      Explore the matrix
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        clearDraft();
                        const sessionId = crypto.randomUUID();
                        setDraft(createInitialDraft(sessionId));
                      }}
                      className="rounded-full border border-ffie-line px-5 py-2 text-sm"
                    >
                      Start again
                    </button>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-6">
          {draft.stage !== "entry" && draft.stage !== "orientation" && (
            <FutureCardPreview draft={draft} id="future-output-card" />
          )}
        </aside>
      </div>

      {exploreEntryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-ffie-surface p-6 shadow-xl">
            {(() => {
              const entry = researchFindingsSeed.find(
                (e) => e.id === exploreEntryId,
              );
              return entry ? (
                <>
                  <FuturePreviewPanel entry={entry} />
                  <button
                    type="button"
                    onClick={() => setExploreEntryId(null)}
                    className="mt-6 rounded-full border border-ffie-line px-4 py-2 text-sm"
                  >
                    Close
                  </button>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
