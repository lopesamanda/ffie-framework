"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toPng } from "html-to-image";
import { CreateStageShell } from "@/components/create/design/CreateStageShell";
import { CreateEntryCover } from "@/components/create/design/CreateEntryCover";
import { FfieButton } from "@/components/create/design/FfieButton";
import {
  CategoryRegisterTiles,
  EnvironmentalBanner,
} from "@/components/create/design/CategoryRegisterTiles";
import { DiscoveryConstellation } from "@/components/create/design/DiscoveryConstellation";
import { OracleDeckFan } from "@/components/create/design/OracleDeckFan";
import { TimeTravelTransition } from "@/components/create/design/TimeTravelTransition";
import { FutureRevealStage } from "@/components/create/FutureRevealStage";
import { FutureOutputActionFooter } from "@/components/create/FutureOutputNextSteps";
import {
  FutureSummaryExport,
  FUTURE_SUMMARY_EXPORT_HEIGHT,
  FUTURE_SUMMARY_EXPORT_WIDTH,
} from "@/components/create/FutureSummaryExport";
import { PhaseSweepOverlay } from "@/components/motion/PhaseSweepOverlay";
import { ArtifactMaterializePanel } from "@/components/create/ArtifactMaterializePanel";
import {
  OracleDrawRecap,
  OracleDrawReflectionPrompt,
} from "@/components/create/design/OracleDrawRecap";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { LikertQuestion } from "@/components/create/LikertQuestion";
import {
  CharacterEmbodyStep,
} from "@/components/create/CharacterEmbodyStep";
import { ChipField, ChipSelect } from "@/components/create/ChipSelect";
import {
  buildCombinedTension,
  drawWorkshopHand,
  workshopHandSignature,
} from "@/data/narrative-cards";
import {
  researchFindingsSeed,
} from "@/data/research-findings-seed";
import {
  ARTIFACT_VALUE_OPTIONS,
  ARTIFACT_VALUE_OTHER,
  isArtifactValuesComplete,
  resolveArtifactValues,
} from "@/lib/journey/artifact-options";
import { EMBODY_SCREEN_COUNT } from "@/lib/journey/embody-flow";
import { ArtifactTypeStep } from "@/components/create/ArtifactTypeStep";
import { ArtifactProgressiveStep } from "@/components/create/ArtifactProgressiveStep";
import { visualDirectionPatchForType } from "@/lib/journey/visual-directions";
import { HiddenFunctionStep } from "@/components/create/HiddenFunctionStep";
import {
  composeHiddenFunction,
  isHiddenFunctionComplete,
} from "@/lib/journey/hidden-function";
import { buildOracleSynthesis, buildOracleSynthesisTensions } from "@/lib/journey/oracle-synthesis";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardShell,
} from "@/lib/card-layout";
import {
  buildNarrative,
  buildReflectionQuestion,
  buildTitle,
  clearDraft,
  computePlacementFromLikert,
  createInitialDraft,
  genderLabelForDraft,
  getOrCreateSessionId,
  loadDraft,
  quadrantFromPosition,
  raceEthnicityForDraft,
  saveDraft,
  type CardHand,
  type JourneyDraft,
  type JourneyStage,
  type LikertScore,
} from "@/lib/journey/types";

const CREATION_STEPS = [
  "Embody the future",
  "Artifact type",
  "Name, problem & capability",
  "Embedded values",
  "Hidden function",
];

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

export function CreateJourney() {
  const router = useRouter();
  const [draft, setDraft] = useState<JourneyDraft | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [oracleDrawIndex, setOracleDrawIndex] = useState(0);
  const [oraclePhase, setOraclePhase] = useState<"fan" | "reflection">("fan");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showMaterialize, setShowMaterialize] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [downloadingSummary, setDownloadingSummary] = useState(false);
  const [phaseSweep, setPhaseSweep] = useState<{
    id: string;
    run: () => void;
  } | null>(null);
  const phaseSweepRef = useRef(phaseSweep);
  phaseSweepRef.current = phaseSweep;
  const materializeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

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

  const runPhaseSweep = useCallback(
    (id: string, run: () => void) => {
      if (reduceMotion) {
        run();
        return;
      }
      setPhaseSweep({ id, run });
    },
    [reduceMotion],
  );

  const completePhaseSweep = useCallback(() => {
    phaseSweepRef.current?.run();
    setPhaseSweep(null);
  }, []);

  const resetOracleDraw = useCallback(() => {
    setOracleDrawIndex(0);
    setOraclePhase("fan");
  }, []);

  const handleCreateAnotherFuture = useCallback(() => {
    clearDraft();
    resetOracleDraw();
    setSubmitting(false);
    setSubmitError(null);
    const next = createInitialDraft(crypto.randomUUID());
    saveDraft(next);
    setDraft(next);
  }, [resetOracleDraw]);

  const beginOracleDraw = useCallback(
    (options?: {
      previousHand?: CardHand | null;
      delayMs?: number;
      goToReflection?: boolean;
    }) => {
      setRevealing(true);
      resetOracleDraw();
      const delayMs = options?.delayMs ?? 900;
      window.setTimeout(() => {
        const hand = drawWorkshopHand(options?.previousHand ?? null);
        update({
          ...(options?.goToReflection ? { stage: "reflection" as const } : {}),
          cardHand: hand,
          combinedTension: buildCombinedTension(hand),
          drawSynthesis: buildOracleSynthesis(hand),
          drawSynthesisTensions: buildOracleSynthesisTensions(hand),
          ...(options?.previousHand ? { reflectionText: "" } : {}),
        });
        setRevealing(false);
      }, delayMs);
    },
    [resetOracleDraw, update],
  );

  const handleDrawCards = () => {
    beginOracleDraw();
  };

  const handleShuffleCards = () => {
    setRevealing(true);
    resetOracleDraw();
    window.setTimeout(() => {
      setDraft((current) => {
        if (!current?.cardHand) return current;
        const hand = drawWorkshopHand(current.cardHand);
        const next: JourneyDraft = {
          ...current,
          cardHand: hand,
          combinedTension: buildCombinedTension(hand),
          drawSynthesis: buildOracleSynthesis(hand),
          drawSynthesisTensions: buildOracleSynthesisTensions(hand),
          reflectionText: "",
        };
        saveDraft(next);
        return next;
      });
      setRevealing(false);
    }, 400);
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
          characterAge: Number.parseInt(draft.characterAge, 10) || null,
          characterGender: genderLabelForDraft(draft),
          characterRaceEthnicity: raceEthnicityForDraft(draft),
          role: resolvedCharacterRole(draft.role, draft.roleCustom),
          personaSector:
            resolvedPersonaSector(
              draft.personaSector,
              draft.personaSectorCustom,
            ) || undefined,
          year: draft.futureYear,
          aiFunction: draft.aiFunction,
          desire: draft.desire,
          fear: draft.fear,
          values: draft.values,
          artifactName: draft.artifactName,
          publicPromise: draft.publicPromise,
          hiddenFunction: composeHiddenFunction(draft) || draft.hiddenFunction,
          artifactValues: resolveArtifactValues(draft),
          tension: draft.combinedTension,
          quadrant,
          powerPosition: draft.powerPosition,
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
          drawSynthesis: draft.drawSynthesis,
          drawSynthesisTensions: draft.drawSynthesisTensions,
          reflectionText: draft.reflectionText.trim(),
          imageDataUrl: draft.imageDataUrl,
          submitToCommons: true,
        }),
      });

      const result = (await response.json()) as {
        id?: string;
        error?: string;
      };

      if (!response.ok) {
        console.error("[CreateJourney] Submission failed:", result.error);
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

  const handleDownloadSummary = async () => {
    if (!draft) return;
    const node = document.getElementById("future-summary-export");
    if (!node) return;

    setDownloadingSummary(true);
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
      setDownloadingSummary(false);
    }
  };

  if (!draft) {
    return (
      <div className="py-20 text-center text-sm text-ffie-muted">Loading…</div>
    );
  }

  const showLivePreview =
    draft.stage !== "entry" &&
    draft.stage !== "orientation" &&
    draft.stage !== "output" &&
    draft.stage !== "discovery";

  const oracleDrawComplete =
    draft.stage !== "reflection" || oracleDrawIndex >= 4;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div
        className={`grid gap-10 lg:items-start ${
          showLivePreview
            ? "lg:grid-cols-[minmax(0,1fr)_320px]"
            : "lg:grid-cols-1"
        }`}
      >
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={draft.stage + draft.creationStep}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }
              }
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              {draft.stage === "entry" && (
                <CreateStageShell stage="entry" headerMode="entry" variant="cover">
                  <CreateEntryCover onBegin={() => goTo("orientation")} />
                </CreateStageShell>
              )}

              {draft.stage === "orientation" && (
                <CreateStageShell stage="orientation">
                  <CategoryRegisterTiles />
                  <EnvironmentalBanner />
                  <div className="mt-8 flex flex-col items-start gap-4">
                    <FfieButton
                      disabled={revealing}
                      onClick={() => beginOracleDraw({ goToReflection: true })}
                    >
                      {revealing ? "Drawing…" : "Draw your cards"}
                    </FfieButton>
                    <Link
                      href="/explore"
                      className={`${ffieCardShell} block max-w-md bg-ffie-surface px-[18px] py-4 transition hover:-translate-y-0.5 hover:border-ffie-accent/30`}
                    >
                      <p className={`${ffieCardCategory} text-ffie-accent`}>
                        Need inspiration?
                      </p>
                      <p className={`mt-2 text-sm font-medium text-ffie-ink ${FFIE_CARD_TEXT}`}>
                        Browse real prototypes
                      </p>
                      <p className={`mt-1 text-xs text-ffie-muted ${FFIE_CARD_TEXT}`}>
                        Research Findings from the thesis — outside this linear
                        flow.
                      </p>
                    </Link>
                  </div>
                </CreateStageShell>
              )}

              {draft.stage === "reflection" && (
                <CreateStageShell stage="reflection">
                  {!draft.cardHand ? (
                    <FfieButton disabled={revealing} onClick={handleDrawCards}>
                      {revealing ? "Drawing…" : "Reveal cards"}
                    </FfieButton>
                  ) : oracleDrawIndex >= 4 ? (
                    <div className="space-y-6">
                      <OracleDrawRecap hand={draft.cardHand} />

                      <FfieButton
                        variant="secondary"
                        disabled={revealing}
                        onClick={handleShuffleCards}
                      >
                        {revealing ? "Shuffling…" : "Shuffle & redraw"}
                      </FfieButton>

                      <OracleDrawReflectionPrompt
                        hand={draft.cardHand}
                        reflectionText={draft.reflectionText}
                        onReflectionChange={(reflectionText) =>
                          update({ reflectionText })
                        }
                        fieldClassName={FIELD}
                      />

                      <FfieButton
                        disabled={!draft.reflectionText.trim()}
                        onClick={() =>
                          runPhaseSweep("draw-embody", () =>
                            goTo("creation", { creationStep: 0 }),
                          )
                        }
                      >
                        Build your future
                      </FfieButton>
                    </div>
                  ) : (
                    <OracleDeckFan
                      key={workshopHandSignature(draft.cardHand)}
                      hand={draft.cardHand}
                      drawIndex={oracleDrawIndex}
                      phase={oraclePhase}
                      shuffling={revealing}
                      onDraw={() => setOraclePhase("reflection")}
                      onAdvance={() => {
                        if (oracleDrawIndex >= 3) {
                          setOracleDrawIndex(4);
                          setOraclePhase("fan");
                        } else {
                          setOracleDrawIndex((i) => i + 1);
                          setOraclePhase("fan");
                        }
                      }}
                      onShuffle={handleShuffleCards}
                    />
                  )}
                </CreateStageShell>
              )}

              {draft.stage === "creation" && (
                <CreateStageShell
                  stage="creation"
                  subtitle={`Step ${draft.creationStep + 1} of ${CREATION_STEPS.length} — ${CREATION_STEPS[draft.creationStep]}`}
                >
                  {draft.creationStep === 0 && (
                    <CharacterEmbodyStep
                      draft={draft}
                      cardHand={draft.cardHand}
                      embodySubStep={draft.embodySubStep}
                      onChange={(patch) => update(patch)}
                      onSubStepChange={(embodySubStep) =>
                        update({ embodySubStep })
                      }
                      onComplete={() =>
                        runPhaseSweep("embody-artifact", () =>
                          update({ creationStep: 1, embodySubStep: 0 }),
                        )
                      }
                    />
                  )}

                  {draft.creationStep === 1 && (
                    <ArtifactTypeStep draft={draft} onChange={update} />
                  )}

                  {draft.creationStep === 2 && (
                    <ArtifactProgressiveStep draft={draft} onChange={update} />
                  )}

                  {draft.creationStep === 3 && (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-ffie-ink">
                        What values are embedded in it? Select 2–3 — comforting
                        and controlling values often coexist in the same
                        artifact.
                      </p>
                      <ChipField label="">
                        <ChipSelect
                          label=""
                          options={[...ARTIFACT_VALUE_OPTIONS, ARTIFACT_VALUE_OTHER]}
                          value={draft.artifactValues}
                          onChange={(artifactValues) =>
                            update({
                              artifactValues,
                              artifactValueOther: artifactValues.includes(
                                ARTIFACT_VALUE_OTHER,
                              )
                                ? draft.artifactValueOther
                                : "",
                            })
                          }
                          multi
                          max={3}
                        />
                        {draft.artifactValues.includes(ARTIFACT_VALUE_OTHER) && (
                          <input
                            type="text"
                            value={draft.artifactValueOther}
                            onChange={(event) =>
                              update({ artifactValueOther: event.target.value })
                            }
                            placeholder="type your own"
                            className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
                          />
                        )}
                        <p className="text-xs text-ffie-muted">
                          {resolveArtifactValues(draft).length}/3 selected
                          (minimum 2)
                        </p>
                      </ChipField>
                    </div>
                  )}

                  {draft.creationStep === 4 && (
                    <HiddenFunctionStep
                      draft={draft}
                      onSelectExtremeValue={(hiddenFunctionExtremeValue) =>
                        update({
                          hiddenFunctionExtremeValue,
                          hiddenFunctionCompletion: "",
                          hiddenFunction: "",
                        })
                      }
                      onCompletionChange={(hiddenFunctionCompletion) =>
                        update({
                          hiddenFunctionCompletion,
                          hiddenFunction: composeHiddenFunction({
                            ...draft,
                            hiddenFunctionCompletion,
                          }),
                        })
                      }
                    />
                  )}

                  {draft.creationStep !== 0 && (
                  <div className="mt-8 flex gap-3">
                    {draft.creationStep > 0 && (
                      <FfieButton
                        variant="secondary"
                        onClick={() => {
                          const nextStep = draft.creationStep - 1;
                          update({
                            creationStep: nextStep,
                            ...(nextStep === 0
                              ? { embodySubStep: EMBODY_SCREEN_COUNT - 1 }
                              : {}),
                          });
                        }}
                      >
                        Back
                      </FfieButton>
                    )}
                    <FfieButton
                      disabled={
                        (draft.creationStep === 1 && !draft.artifactType) ||
                        (draft.creationStep === 2 &&
                          (!draft.artifactName.trim() ||
                            !draft.artifactProblemTension.trim() ||
                            !draft.selectedAiPower ||
                            !draft.selectedAiCapability ||
                            !draft.publicPromise.trim())) ||
                        (draft.creationStep === 3 &&
                          !isArtifactValuesComplete(draft)) ||
                        (draft.creationStep === 4 &&
                          !isHiddenFunctionComplete(draft) &&
                          !draft.hiddenFunction.trim())
                      }
                      onClick={() => {
                        if (draft.creationStep < CREATION_STEPS.length - 1) {
                          const nextStep = draft.creationStep + 1;
                          const patch: Partial<JourneyDraft> = {
                            creationStep: nextStep,
                          };
                          if (
                            nextStep === 2 &&
                            !draft.visualDirection &&
                            draft.artifactType
                          ) {
                            Object.assign(
                              patch,
                              visualDirectionPatchForType(draft.artifactType),
                            );
                          }
                          update(patch);
                          return;
                        }

                        runPhaseSweep("artifact-matrix", () =>
                          goTo("output", { outputStep: 0 }),
                        );
                      }}
                    >
                      {draft.creationStep < CREATION_STEPS.length - 1
                        ? "Next"
                        : "Place on the matrix"}
                    </FfieButton>
                  </div>
                  )}
                </CreateStageShell>
              )}

              {draft.stage === "output" && (
                <CreateStageShell stage="output" subtitle="">
                  {draft.outputStep === 0 ? (
                    <div className="w-full min-w-0 space-y-5">
                      <p className="text-sm text-ffie-muted">
                        Two questions place this future on the Critical Feminist
                        Matrix — no dragging, no numbers.
                      </p>
                      <LikertQuestion
                        question="In the world you imagined, does this technology mostly extract something from the people who use it — time, data, autonomy — or give something back?"
                        lowLabel="Extracts"
                        highLabel="Gives back"
                        value={draft.systemLogicScore}
                        onChange={(systemLogicScore: LikertScore) =>
                          update({ systemLogicScore })
                        }
                      />
                      <LikertQuestion
                        question="Who decides how this technology is used in that future — a person or company at the top, or the community that lives with it, together?"
                        lowLabel="Centralized decision"
                        highLabel="Collective decision"
                        value={draft.powerOrgScore}
                        onChange={(powerOrgScore: LikertScore) =>
                          update({ powerOrgScore })
                        }
                      />
                      <FfieButton
                        disabled={
                          draft.systemLogicScore == null ||
                          draft.powerOrgScore == null
                        }
                        onClick={() => {
                          if (
                            draft.systemLogicScore == null ||
                            draft.powerOrgScore == null
                          ) {
                            return;
                          }
                          const placement = computePlacementFromLikert(
                            draft.systemLogicScore,
                            draft.powerOrgScore,
                          );
                          const title = buildTitle(
                            draft.artifactName,
                            draft.characterName,
                          );
                          const nextDraft = {
                            ...draft,
                            ...placement,
                            title,
                          };
                          const narrative = buildNarrative(nextDraft);
                          update({
                            ...placement,
                            title,
                            narrative,
                            outputStep: 1,
                          });
                        }}
                      >
                        See your future
                      </FfieButton>
                    </div>
                  ) : (
                  <TimeTravelTransition
                    startYear={new Date().getFullYear()}
                    endYear={draft.futureYear}
                  >
                  <FutureRevealStage
                    draft={draft}
                    cardId="future-output-card"
                    actionFooter={
                      <FutureOutputActionFooter
                        onBringToLife={() => {
                          setShowMaterialize(true);
                          materializeRef.current?.scrollIntoView({
                            behavior: reduceMotion ? "auto" : "smooth",
                            block: "start",
                          });
                        }}
                        onDownload={handleDownloadSummary}
                        onPublish={() => setShowPublish((open) => !open)}
                        bringToLifeActive={showMaterialize}
                        downloading={downloadingSummary}
                        submitting={submitting}
                        layout="inline"
                      />
                    }
                  >
                    <div ref={materializeRef}>
                      <ArtifactMaterializePanel draft={draft} />
                    </div>
                    {showPublish && (
                      <div className="mx-auto max-w-md space-y-4 rounded-xl border border-ffie-line bg-ffie-surface p-4 lg:mx-0">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={draft.submitToCommons}
                            onChange={(e) =>
                              update({ submitToCommons: e.target.checked })
                            }
                            className="mt-1 accent-ffie-accent"
                          />
                          <span className="text-sm text-ffie-muted">
                            Submit this diegetic prototype to the Future
                            Commons for moderation. If approved, it will
                            appear alongside Research Findings — always
                            labeled as community-created.
                          </span>
                        </label>
                        {submitError && (
                          <p className="text-sm text-red-700">{submitError}</p>
                        )}
                        <FfieButton
                          disabled={
                            submitting ||
                            !draft.placementJustification.trim() ||
                            !draft.submitToCommons
                          }
                          onClick={handleFinishOutput}
                        >
                          {submitting
                            ? "Submitting…"
                            : "Submit for moderation"}
                        </FfieButton>
                      </div>
                    )}
                    <p className="text-center">
                      <button
                        type="button"
                        className="text-sm text-ffie-muted underline-offset-2 hover:text-ffie-ink hover:underline"
                        onClick={() => {
                          update({ submitToCommons: false });
                          void handleFinishOutput();
                        }}
                      >
                        Continue without publishing →
                      </button>
                    </p>
                  </FutureRevealStage>
                  </TimeTravelTransition>
                  )}
                </CreateStageShell>
              )}

              {draft.stage === "discovery" && (
                <CreateStageShell stage="discovery">
                  {draft.submittedId ? (
                    <p className="mb-6 text-sm text-ffie-muted">
                      Your prototype was submitted with status{" "}
                      <strong className="text-ffie-ink">pending</strong>. Amanda
                      will review it before it appears in Future Commons.
                    </p>
                  ) : (
                    <p className="mb-6 text-sm text-ffie-muted">
                      Your future stays personal — downloaded locally, not sent
                      for moderation.
                    </p>
                  )}
                  <DiscoveryConstellation futures={researchFindingsSeed} />
                  <div className="relative z-10 mt-12 flex flex-wrap gap-3 border-t border-ffie-line/60 bg-ffie-bg pt-8">
                    <FfieButton
                      onClick={() =>
                        router.push(
                          draft.submittedId
                            ? `/explore?highlight=${draft.submittedId}`
                            : "/explore",
                        )
                      }
                    >
                      Explore the matrix
                    </FfieButton>
                    <FfieButton
                      variant="secondary"
                      onClick={handleCreateAnotherFuture}
                    >
                      Create another future
                    </FfieButton>
                  </div>
                </CreateStageShell>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {showLivePreview && (
          <aside className="lg:sticky lg:top-6">
            <FutureCardPreview
              draft={draft}
              id="future-output-card"
              showDrawSynthesis={oracleDrawComplete}
              showCardProvenance={oracleDrawComplete}
            />
          </aside>
        )}
      </div>

      {(draft.stage === "output" || draft.stage === "discovery") && (
        <div
          className="pointer-events-none fixed left-[-9999px] top-0 overflow-hidden"
          aria-hidden
        >
          <FutureSummaryExport
            id="future-summary-export"
            draft={draft}
            commonsUrl={
              draft.submittedId && typeof window !== "undefined"
                ? `${window.location.origin}/explore/${draft.submittedId}`
                : null
            }
          />
        </div>
      )}

      <PhaseSweepOverlay
        active={Boolean(phaseSweep)}
        onComplete={completePhaseSweep}
      />

    </div>
  );
}
