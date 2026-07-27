"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { OracleCard, OracleRevealedContent } from "@/components/create/design/OracleCard";
import { OracleDeckFan, OracleFanRevealedCard } from "@/components/create/design/OracleDeckFan";
import {
  MATRIX_EXPLANATION,
  MatrixArrivalScene,
} from "@/components/create/design/MatrixArrivalScene";
import {
  OracleDrawRecap,
  OracleDrawReflectionPrompt,
} from "@/components/create/design/OracleDrawRecap";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { MatrixReveal } from "@/components/create/MatrixReveal";
import { LikertQuestion } from "@/components/create/LikertQuestion";
import {
  CharacterEmbodyStep,
} from "@/components/create/CharacterEmbodyStep";
import { CreateNarrativeScene } from "@/components/create/design/CreateNarrativeScene";
import { NarrativeBlock, NarrativeBlank } from "@/components/create/NarrativeBlank";
import { ChipField, ChipSelect } from "@/components/create/ChipSelect";
import { AiCapabilityCardPicker } from "@/components/create/AiCapabilityCardPicker";
import { ArtifactImageUpload } from "@/components/create/ArtifactImageUpload";
import {
  ShareableFutureCard,
  SHAREABLE_CARD_HEIGHT,
  SHAREABLE_CARD_WIDTH,
} from "@/components/create/ShareableFutureCard";
import {
  buildCombinedTension,
  drawWorkshopHand,
} from "@/data/narrative-cards";
import {
  researchFindingsSeed,
} from "@/data/research-findings-seed";
import {
  ARTIFACT_TYPE_OPTIONS,
} from "@/lib/journey/character-options";
import { EMBODY_SCREEN_COUNT } from "@/lib/journey/embody-flow";
import {
  ARTIFACT_VALUE_OPTIONS,
  ARTIFACT_VALUE_OTHER,
  isArtifactValuesComplete,
  resolveArtifactValues,
} from "@/lib/journey/artifact-options";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import { buildOracleSynthesis } from "@/lib/journey/oracle-synthesis";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDivider,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";
import {
  buildAiImagePrompt,
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
  type JourneyDraft,
  type JourneyStage,
  type LikertScore,
} from "@/lib/journey/types";

const CREATION_STEPS = [
  "Embody the future",
  "Name the artifact",
  "Day to day",
  "Embedded values",
  "Hidden function",
  "Image (optional)",
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
  const [copyPromptStatus, setCopyPromptStatus] = useState<
    "idle" | "copied" | "error"
  >("idle");
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

  const aiPrompt = useMemo(
    () => (draft ? buildAiImagePrompt(draft) : ""),
    [draft],
  );

  const handleDrawCards = () => {
    setRevealing(true);
    resetOracleDraw();
    setTimeout(() => {
      const hand = drawWorkshopHand();
      update({
        cardHand: hand,
        combinedTension: buildCombinedTension(hand),
        drawSynthesis: buildOracleSynthesis(hand),
      });
      setRevealing(false);
    }, 900);
  };

  const handleShuffleCards = () => {
    setRevealing(true);
    resetOracleDraw();
    setTimeout(() => {
      const hand = drawWorkshopHand();
      update({
        cardHand: hand,
        combinedTension: buildCombinedTension(hand),
        drawSynthesis: buildOracleSynthesis(hand),
        reflectionText: "",
      });
      setRevealing(false);
    }, 400);
  };

  const captureShareImage = async () => {
    const node = document.getElementById("shareable-future-card");
    if (!node) return null;
    return toPng(node, {
      pixelRatio: 1,
      width: SHAREABLE_CARD_WIDTH,
      height: SHAREABLE_CARD_HEIGHT,
    });
  };

  const handleDownloadShareImage = async () => {
    if (!draft) return;
    const dataUrl = await captureShareImage();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `${draft.title || "ffie-future"}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareImage = async () => {
    if (!draft) return;
    const dataUrl = await captureShareImage();
    if (!dataUrl) return;

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `${draft.title || "ffie-future"}.png`, {
      type: "image/png",
    });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: draft.title,
          text: "A future imagined with FFIE",
        });
        return;
      } catch {
        /* fall through to download */
      }
    }

    handleDownloadShareImage();
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
          year: draft.futureYear,
          aiFunction: draft.aiFunction,
          desire: draft.desire,
          fear: draft.fear,
          values: draft.values,
          artifactName: draft.artifactName,
          publicPromise: draft.publicPromise,
          hiddenFunction: draft.hiddenFunction,
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
                    <FfieButton onClick={() => goTo("reflection")}>
                      Draw your cards
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
                        onClick={() => goTo("creation", { creationStep: 0 })}
                      >
                        Build your future
                      </FfieButton>
                    </div>
                  ) : (
                    <OracleDeckFan
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
                      environmentalCard={
                        <div className="max-w-[560px] space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#2c8a52]">
                              Environmental Impact
                            </span>
                            <span className="rounded-[3px] border border-[#2c8a52] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2c8a52]">
                              Always applied
                            </span>
                          </div>
                          <OracleCard
                            card={draft.cardHand.transversal}
                            revealed
                            className="!min-w-0 !flex-none !basis-full"
                          >
                            <OracleRevealedContent
                              card={draft.cardHand.transversal}
                            />
                          </OracleCard>
                        </div>
                      }
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
                        update({ creationStep: 1, embodySubStep: 0 })
                      }
                    />
                  )}

                  {draft.creationStep === 1 && (
                    <div className="space-y-6">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium leading-relaxed text-ffie-ink">
                          This object or system has a name. What is it?
                        </span>
                        <input
                          value={draft.artifactName}
                          onChange={(e) =>
                            update({ artifactName: e.target.value })
                          }
                          className={FIELD}
                        />
                      </label>
                      <div className="space-y-3 rounded-xl border border-dashed border-ffie-accent/25 bg-ffie-accent-soft/20 px-4 py-4">
                        <p className="text-sm font-medium text-ffie-ink">
                          What kind of artifact is it?
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {ARTIFACT_TYPE_OPTIONS.map((option) => {
                            const selected = draft.artifactType === option.id;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() =>
                                  update({ artifactType: option.id })
                                }
                                className={`rounded-xl border px-4 py-3 text-left transition ${
                                  selected
                                    ? "border-ffie-ink bg-ffie-ink text-ffie-bg"
                                    : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/40"
                                }`}
                              >
                                <span className="block text-sm font-semibold">
                                  {option.label}
                                </span>
                                <span
                                  className={`mt-1 block text-xs ${
                                    selected
                                      ? "text-ffie-bg/80"
                                      : "text-ffie-muted"
                                  }`}
                                >
                                  {option.description}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {draft.creationStep === 2 && draft.cardHand && (
                    <CreateNarrativeScene className="space-y-4">
                      {(() => {
                        const p = pronounsForSelection(draft.characterPronoun);
                        const who =
                          draft.characterName.trim() || p.subjectCap;
                        const artifact =
                          draft.artifactName.trim() || "this artifact";
                        const role = resolvedCharacterRole(
                          draft.role,
                          draft.roleCustom,
                        );
                        return (
                          <>
                            <div className="flex flex-wrap gap-3">
                              <OracleFanRevealedCard card={draft.cardHand.benefit} />
                              <OracleFanRevealedCard card={draft.cardHand.trust} />
                            </div>
                            <NarrativeBlock className="border-0 bg-transparent p-0">
                              <NarrativeBlank
                                before={`Every day, in ${p.possessive} role as ${role}, ${who} lets ${artifact} do this: `}
                                after="."
                                value={draft.publicPromise}
                                onChange={(publicPromise) =>
                                  update({ publicPromise })
                                }
                                placeholder="complete the sentence"
                              />
                            </NarrativeBlock>
                            <AiCapabilityCardPicker context="artifact" />
                          </>
                        );
                      })()}
                    </CreateNarrativeScene>
                  )}

                  {draft.creationStep === 3 && (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-ffie-ink">
                        What values are embedded in it? Select 2–4 — comforting
                        and controlling values often coexist in the same
                        artifact.
                      </p>
                      <ChipField label="">
                        <ChipSelect
                          label=""
                          options={[...ARTIFACT_VALUE_OPTIONS, ARTIFACT_VALUE_OTHER]}
                          value={draft.artifactValues}
                          onChange={(artifactValues) =>
                            update({ artifactValues })
                          }
                          multi
                          max={4}
                        />
                        {draft.artifactValues.includes(ARTIFACT_VALUE_OTHER) && (
                          <input
                            type="text"
                            value={draft.artifactValueOther}
                            onChange={(e) =>
                              update({ artifactValueOther: e.target.value })
                            }
                            placeholder="Describe another value"
                            className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none focus:border-ffie-accent/40"
                          />
                        )}
                        <p className="text-xs text-ffie-muted">
                          {resolveArtifactValues(draft).length}/4 selected
                          (minimum 2)
                        </p>
                      </ChipField>
                    </div>
                  )}

                  {draft.creationStep === 4 && draft.cardHand && (
                    <div className="space-y-4">
                      <div className="space-y-3 rounded-xl border border-ffie-line bg-ffie-bg/60 p-4 text-sm">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
                            Day to day
                          </p>
                          <p className="mt-1 text-ffie-ink">
                            {draft.publicPromise || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
                            Embedded values
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {resolveArtifactValues(draft).map((value) => (
                              <span
                                key={value}
                                className="rounded-full border border-ffie-line bg-ffie-surface px-2.5 py-0.5 text-xs text-ffie-ink"
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <OracleFanRevealedCard card={draft.cardHand.risk} />
                        <OracleFanRevealedCard card={draft.cardHand.barrier} />
                      </div>
                      <NarrativeBlock>
                        <p className="mb-3 text-sm leading-relaxed text-ffie-ink">
                          Looking at the values you just named, and the risk of{" "}
                          <strong>{draft.cardHand.risk.name}</strong> and the
                          barrier of{" "}
                          <strong>{draft.cardHand.barrier.name}</strong> —
                          which of these values, pushed to its logical extreme,
                          reveals what{" "}
                          {draft.artifactName.trim() || "this artifact"}{" "}
                          actually does, quietly, that it doesn&apos;t
                          advertise?
                        </p>
                        <textarea
                          value={draft.hiddenFunction}
                          onChange={(e) =>
                            update({ hiddenFunction: e.target.value })
                          }
                          rows={4}
                          placeholder="Complete the sentence…"
                          className={`${FIELD} resize-none`}
                        />
                      </NarrativeBlock>
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
                          onClick={async () => {
                            try {
                              await copyToClipboard(aiPrompt);
                              setCopyPromptStatus("copied");
                              window.setTimeout(
                                () => setCopyPromptStatus("idle"),
                                2000,
                              );
                            } catch (error) {
                              console.error("Copy prompt failed:", error);
                              setCopyPromptStatus("error");
                            }
                          }}
                          className="mt-2 text-xs font-medium text-ffie-accent hover:underline"
                        >
                          {copyPromptStatus === "copied"
                            ? "Copied!"
                            : copyPromptStatus === "error"
                              ? "Copy failed — select text manually"
                              : "Copy prompt"}
                        </button>
                      </div>
                      <ArtifactImageUpload
                        value={draft.imageDataUrl}
                        onChange={(imageDataUrl) => update({ imageDataUrl })}
                      />
                    </div>
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
                        (draft.creationStep === 1 &&
                          (!draft.artifactName.trim() ||
                            !draft.artifactType)) ||
                        (draft.creationStep === 2 &&
                          !draft.publicPromise.trim()) ||
                        (draft.creationStep === 3 &&
                          !isArtifactValuesComplete(draft)) ||
                        (draft.creationStep === 4 &&
                          !draft.hiddenFunction.trim())
                      }
                      onClick={() => {
                        if (draft.creationStep < CREATION_STEPS.length - 1) {
                          update({ creationStep: draft.creationStep + 1 });
                          return;
                        }

                        goTo("output", { outputStep: 0 });
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
                  <MatrixArrivalScene>
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <FutureCardPreview
                      draft={draft}
                      id="future-output-card"
                      compact
                    />
                    <div>
                      <MatrixReveal position={draft.position} />
                      <p className="mt-4 text-sm leading-relaxed text-ffie-muted">
                        {MATRIX_EXPLANATION}
                      </p>
                    </div>
                  </div>
                  <label className="mt-8 flex items-start gap-3 rounded-xl border border-ffie-line bg-ffie-surface p-4">
                    <input
                      type="checkbox"
                      checked={draft.submitToCommons}
                      onChange={(e) =>
                        update({ submitToCommons: e.target.checked })
                      }
                      className="mt-1 accent-ffie-accent"
                    />
                    <span className="text-sm text-ffie-muted">
                      Submit this diegetic prototype to the Future Commons for
                      moderation. If approved, it will appear alongside Research
                      Findings — always labeled as community-created.
                    </span>
                  </label>
                  {submitError && (
                    <p className="mt-4 text-sm text-red-700">{submitError}</p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <FfieButton onClick={handleShareImage}>Share image</FfieButton>
                    <FfieButton variant="secondary" onClick={handleDownloadShareImage}>
                      Download image
                    </FfieButton>
                    <FfieButton variant="secondary" onClick={handleDownload}>
                      Download card
                    </FfieButton>
                    <FfieButton
                      disabled={submitting || !draft.placementJustification.trim()}
                      onClick={handleFinishOutput}
                    >
                      {submitting
                        ? "Submitting…"
                        : draft.submitToCommons
                          ? "Submit & continue"
                          : "Continue to Discovery"}
                    </FfieButton>
                  </div>
                  </MatrixArrivalScene>
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
                  <div className="mt-10 flex flex-wrap gap-3">
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
            />
          </aside>
        )}
      </div>

      {(draft.stage === "output" || draft.stage === "discovery") && (
        <div
          className="pointer-events-none fixed left-[-9999px] top-0 overflow-hidden"
          aria-hidden
        >
          <ShareableFutureCard
            id="shareable-future-card"
            title={draft.title}
            characterName={draft.characterName}
            artifactName={draft.artifactName}
            position={draft.position}
            cardHand={draft.cardHand}
          />
        </div>
      )}

    </div>
  );
}
