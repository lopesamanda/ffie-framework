"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toPng } from "html-to-image";
import { CreateStageShell } from "@/components/create/design/CreateStageShell";
import { FfieButton } from "@/components/create/design/FfieButton";
import {
  CategoryRegisterTiles,
  EnvironmentalBanner,
} from "@/components/create/design/CategoryRegisterTiles";
import { DiscoveryConstellation } from "@/components/create/design/DiscoveryConstellation";
import { OracleCard } from "@/components/create/design/OracleCard";
import { NarrativeCardFace } from "@/components/create/NarrativeCardFace";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { MatrixReveal } from "@/components/create/MatrixReveal";
import { LikertQuestion } from "@/components/create/LikertQuestion";
import { AiCapabilityCardPicker } from "@/components/create/AiCapabilityCardPicker";
import { CATEGORY_LABELS } from "@/data/narrative-cards";
import {
  ShareableFutureCard,
  SHAREABLE_CARD_HEIGHT,
  SHAREABLE_CARD_WIDTH,
} from "@/components/create/ShareableFutureCard";
import { FuturePreviewPanel } from "@/components/FuturePreviewPanel";
import {
  buildCombinedTension,
  buildEcosystemAmbitionSeed,
  buildWeaknessCollisionContext,
  drawWorkshopHand,
  ENVIRONMENTAL_IMPACT_CARD,
  ORACLE_REVEAL_SEQUENCE,
} from "@/data/narrative-cards";
import {
  researchFindingsSeed,
} from "@/data/research-findings-seed";
import {
  buildAiImagePrompt,
  buildNarrative,
  buildReflectionQuestion,
  buildTitle,
  clearDraft,
  computePlacementFromLikert,
  createInitialDraft,
  getOrCreateSessionId,
  loadDraft,
  quadrantFromPosition,
  ROLE_SUGGESTIONS,
  saveDraft,
  WORKSHOP_VALUES,
  type JourneyDraft,
  type JourneyStage,
  type LikertScore,
} from "@/lib/journey/types";

const EXPLORATION_IDS = [
  "br-valentina-insider",
  "pt-taina-a-eye",
  "pt-john-bell-open-human",
];

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

const CREATION_STEPS = [
  "Who carries it",
  "The machine",
  "Hope & fear",
  "What guides her",
  "Artifact name",
  "Ecosystem ambition",
  "Goal × weakness",
  "Image (optional)",
  "Where it lands",
];

export function CreateJourney() {
  const router = useRouter();
  const [draft, setDraft] = useState<JourneyDraft | null>(null);
  const [exploreEntryId, setExploreEntryId] = useState<string | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [oracleRevealIndex, setOracleRevealIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setCardFlipped(false);
  }, [oracleRevealIndex]);

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
    setOracleRevealIndex(0);
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

  const showLivePreview =
    draft.stage !== "entry" &&
    draft.stage !== "orientation" &&
    draft.stage !== "output" &&
    draft.stage !== "discovery";

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
              key={draft.stage + draft.creationStep + oracleRevealIndex}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {draft.stage === "entry" && (
                <CreateStageShell stage="entry">
                  <div className="relative mx-auto max-w-lg text-center">
                    <p
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-display text-[120px] font-bold leading-none tracking-tighter text-ffie-ink/[0.04] sm:text-[160px]"
                    >
                      2036
                    </p>
                    <div className="relative space-y-8 py-6">
                      <div className="flex justify-center gap-2">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="h-24 w-16 rounded-lg border-2 border-ffie-line bg-ffie-accent-soft/60 shadow-sm"
                          />
                        ))}
                      </div>
                      <FfieButton onClick={() => goTo("orientation")}>
                        Begin
                      </FfieButton>
                    </div>
                  </div>
                </CreateStageShell>
              )}

              {draft.stage === "orientation" && (
                <CreateStageShell stage="orientation">
                  <CategoryRegisterTiles />
                  <EnvironmentalBanner />
                  <div className="mt-8">
                    <FfieButton onClick={() => goTo("exploration")}>
                      See examples
                    </FfieButton>
                  </div>
                </CreateStageShell>
              )}

              {draft.stage === "exploration" && (
                <CreateStageShell stage="exploration">
                  <div className="grid gap-4 md:grid-cols-3">
                    {explorationEntries.map((entry, index) =>
                      entry ? (
                        <motion.button
                          key={entry.id}
                          type="button"
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{
                            opacity: 1,
                            y: reduceMotion ? 0 : [0, -4, 0],
                          }}
                          transition={{
                            opacity: { delay: index * 0.08 },
                            y: reduceMotion
                              ? { duration: 0 }
                              : {
                                  delay: index * 0.08,
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                          }}
                          onClick={() => setExploreEntryId(entry.id)}
                          className="rounded-xl border border-ffie-line bg-ffie-surface p-4 text-left shadow-[0_4px_16px_rgba(35,19,82,0.06)] transition hover:-translate-y-0.5 hover:border-ffie-accent/30"
                        >
                          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-accent">
                            Research Finding
                          </p>
                          <h3 className="mt-2 font-display text-base font-bold text-ffie-ink">
                            {entry.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-sm text-ffie-muted">
                            {entry.tension}
                          </p>
                        </motion.button>
                      ) : null,
                    )}
                  </div>
                  <div className="mt-8">
                    <FfieButton onClick={() => goTo("reflection")}>
                      Draw your cards
                    </FfieButton>
                  </div>
                </CreateStageShell>
              )}

              {draft.stage === "reflection" && (
                <CreateStageShell stage="reflection">
                  {!draft.cardHand ? (
                    <FfieButton disabled={revealing} onClick={handleDrawCards}>
                      {revealing ? "Drawing…" : "Reveal cards"}
                    </FfieButton>
                  ) : (
                    <>
                      {(() => {
                        const hand = draft.cardHand!;
                        const revealKey = ORACLE_REVEAL_SEQUENCE[oracleRevealIndex];
                        const currentCard = hand[revealKey];
                        const isLastCard =
                          oracleRevealIndex >= ORACLE_REVEAL_SEQUENCE.length - 1;

                        if (oracleRevealIndex < ORACLE_REVEAL_SEQUENCE.length) {
                          return (
                            <div className="mx-auto max-w-md space-y-4">
                              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
                                Card {oracleRevealIndex + 1} of{" "}
                                {ORACLE_REVEAL_SEQUENCE.length} —{" "}
                                {CATEGORY_LABELS[currentCard.category]}
                              </p>
                              {!cardFlipped ? (
                                <OracleCard
                                  category={currentCard.category}
                                  revealed={false}
                                  coverLabel={CATEGORY_LABELS[currentCard.category]}
                                  onReveal={() => setCardFlipped(true)}
                                  className="mx-auto"
                                />
                              ) : (
                                <OracleCard
                                  category={currentCard.category}
                                  revealed
                                  className="mx-auto"
                                >
                                  <NarrativeCardFace
                                    card={currentCard}
                                    showReflection
                                    embedded
                                  />
                                </OracleCard>
                              )}
                              <div className="flex gap-3">
                                {oracleRevealIndex > 0 && (
                                  <FfieButton
                                    variant="secondary"
                                    onClick={() =>
                                      setOracleRevealIndex((i) => i - 1)
                                    }
                                  >
                                    Back
                                  </FfieButton>
                                )}
                                {cardFlipped && (
                                  <FfieButton
                                    onClick={() => {
                                      if (isLastCard) {
                                        setOracleRevealIndex(
                                          ORACLE_REVEAL_SEQUENCE.length,
                                        );
                                      } else {
                                        setOracleRevealIndex((i) => i + 1);
                                      }
                                    }}
                                  >
                                    {isLastCard ? "Continue" : "Next card"}
                                  </FfieButton>
                                )}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              <NarrativeCardFace card={hand.risk} />
                              <NarrativeCardFace card={hand.benefit} />
                              <NarrativeCardFace card={hand.trust} />
                              <NarrativeCardFace card={hand.barrier} />
                              <motion.div
                                initial={reduceMotion ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="sm:col-span-2 lg:col-span-1"
                              >
                                <NarrativeCardFace
                                  card={hand.transversal}
                                  fixedLens
                                />
                              </motion.div>
                            </div>
                            <div className="mt-6 rounded-xl border border-ffie-accent/20 bg-ffie-accent-soft p-4">
                              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-accent">
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
                            <label className="mt-6 block space-y-2">
                              <span className="text-sm font-medium text-ffie-ink">
                                Where do you feel this tension yourself — in your
                                work, your community, your own use of AI?
                              </span>
                              <textarea
                                value={draft.reflectionText}
                                onChange={(event) =>
                                  update({ reflectionText: event.target.value })
                                }
                                rows={3}
                                className={FIELD}
                                placeholder="A sentence or two is enough."
                              />
                            </label>
                            <div className="mt-6">
                              <FfieButton
                                disabled={!draft.reflectionText.trim()}
                                onClick={() => goTo("creation", { creationStep: 0 })}
                              >
                                Build your future
                              </FfieButton>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </CreateStageShell>
              )}

              {draft.stage === "creation" && (
                <CreateStageShell
                  stage="creation"
                  subtitle={`Step ${draft.creationStep + 1} of ${CREATION_STEPS.length} — ${CREATION_STEPS[draft.creationStep]}`}
                >
                  {draft.creationStep === 0 && (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-ffie-ink">
                        Quem carrega essa tensão todos os dias? Dá um nome a
                        ela, e diz o que ela faz.
                      </p>
                      <label className="block space-y-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-ffie-muted">
                          Nome
                        </span>
                        <input
                          value={draft.characterName}
                          onChange={(e) =>
                            update({ characterName: e.target.value })
                          }
                          placeholder="ex. Marina"
                          className={FIELD}
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-ffie-muted">
                          O que ela faz
                        </span>
                        <input
                          value={draft.role}
                          onChange={(e) => update({ role: e.target.value })}
                          placeholder="Papel no ecossistema de inovação, 2036"
                          className={FIELD}
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
                        <span className="text-xs font-medium uppercase tracking-wide text-ffie-muted">
                          De onde ela fala
                        </span>
                        <input
                          value={draft.location}
                          onChange={(e) => update({ location: e.target.value })}
                          placeholder="Cidade, país, ou contexto"
                          className={FIELD}
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 1 && (
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium leading-relaxed text-ffie-ink">
                          Existe uma máquina na vida dela que ela não escolheu.
                          O que essa máquina faz, exatamente?
                        </span>
                        <textarea
                          value={draft.aiFunction}
                          onChange={(e) =>
                            update({ aiFunction: e.target.value })
                          }
                          rows={3}
                          className={FIELD}
                        />
                      </label>
                      <AiCapabilityCardPicker
                        value={draft.aiFunction}
                        onSelect={(text) => update({ aiFunction: text })}
                      />
                    </div>
                  )}

                  {draft.creationStep === 2 && (
                    <div className="space-y-6">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-ffie-ink">
                          Ela ainda tem esperança de que
                        </span>
                        <div className="flex items-stretch overflow-hidden rounded-xl border border-ffie-line">
                          <span className="hidden shrink-0 bg-ffie-bg px-3 py-3 text-sm text-ffie-muted sm:inline">
                            …
                          </span>
                          <input
                            value={draft.desire}
                            onChange={(e) => update({ desire: e.target.value })}
                            placeholder="complete a frase"
                            className={`min-w-0 flex-1 px-4 py-3 text-sm outline-none`}
                          />
                        </div>
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-ffie-ink">
                          O que ela mais teme é
                        </span>
                        <div className="flex items-stretch overflow-hidden rounded-xl border border-ffie-line">
                          <span className="hidden shrink-0 bg-ffie-bg px-3 py-3 text-sm text-ffie-muted sm:inline">
                            …
                          </span>
                          <input
                            value={draft.fear}
                            onChange={(e) => update({ fear: e.target.value })}
                            placeholder="complete a frase"
                            className={`min-w-0 flex-1 px-4 py-3 text-sm outline-none`}
                          />
                        </div>
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 3 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-ffie-ink">
                        O que guia as escolhas dela?
                      </p>
                      <p className="text-sm text-ffie-muted">
                        Escolha três valores inegociáveis ({draft.values.length}
                        /3)
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
                                    values: draft.values.filter(
                                      (v) => v !== value,
                                    ),
                                  });
                                } else if (draft.values.length < 3) {
                                  update({
                                    values: [...draft.values, value],
                                  });
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
                        <span className="text-sm font-medium leading-relaxed text-ffie-ink">
                          Esse objeto/sistema tem um nome. Qual é?
                        </span>
                        <input
                          value={draft.artifactName}
                          onChange={(e) =>
                            update({ artifactName: e.target.value })
                          }
                          className={FIELD}
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 5 && draft.cardHand && (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-ffie-ink">
                        O ecossistema de inovação publicamente diz que quer
                        tecnologia que entregue isto — com base nas cartas de
                        Benefício e Confiança que você tirou:
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <NarrativeCardFace card={draft.cardHand.benefit} />
                        <NarrativeCardFace card={draft.cardHand.trust} />
                      </div>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-ffie-ink">
                          Venderam esse objeto pra ela dizendo que ele
                        </span>
                        <textarea
                          value={draft.publicPromise}
                          onChange={(e) =>
                            update({ publicPromise: e.target.value })
                          }
                          placeholder={buildEcosystemAmbitionSeed(draft.cardHand)}
                          rows={3}
                          className={FIELD}
                        />
                      </label>
                      {!draft.publicPromise.trim() && (
                        <button
                          type="button"
                          onClick={() =>
                            update({
                              publicPromise: buildEcosystemAmbitionSeed(
                                draft.cardHand!,
                              ),
                            })
                          }
                          className="text-xs font-medium text-ffie-accent hover:underline"
                        >
                          Usar sugestão do ecossistema
                        </button>
                      )}
                    </div>
                  )}

                  {draft.creationStep === 6 && draft.cardHand && (
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-ffie-ink">
                        Essa ambição encontra o risco e a barreira que você
                        também tirou. Dado isso junto — o que o artefato
                        realmente faz, escondido, que não anuncia?
                      </p>
                      <div className="rounded-xl border border-ffie-line bg-ffie-bg/60 p-4 text-sm">
                        <p className="text-xs uppercase tracking-wide text-ffie-muted">
                          Ambição pública
                        </p>
                        <p className="mt-1 text-ffie-ink">
                          {draft.publicPromise || "—"}
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <NarrativeCardFace card={draft.cardHand.risk} />
                        <NarrativeCardFace card={draft.cardHand.barrier} />
                      </div>
                      <p className="text-xs text-ffie-muted">
                        {buildWeaknessCollisionContext(draft.cardHand)}
                      </p>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-ffie-ink">
                          Mas o que ele realmente faz, escondido, é
                        </span>
                        <textarea
                          value={draft.hiddenFunction}
                          onChange={(e) =>
                            update({ hiddenFunction: e.target.value })
                          }
                          placeholder="complete a frase"
                          rows={4}
                          className={FIELD}
                        />
                      </label>
                    </div>
                  )}

                  {draft.creationStep === 7 && (
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

                  {draft.creationStep === 8 && (
                    <div className="space-y-5">
                      <p className="text-sm text-ffie-muted">
                        Duas perguntas colocam esse futuro na Critical Feminist
                        Matrix — sem arrastar, sem números.
                      </p>
                      <LikertQuestion
                        question="No mundo que você imaginou, essa tecnologia principalmente extrai algo de quem a usa — tempo, dados, autonomia — ou devolve algo a essa pessoa?"
                        lowLabel="Extrai"
                        highLabel="Devolve"
                        value={draft.systemLogicScore}
                        onChange={(systemLogicScore: LikertScore) =>
                          update({ systemLogicScore })
                        }
                      />
                      <LikertQuestion
                        question="Quem decide como essa tecnologia é usada nesse futuro — uma pessoa ou empresa no topo, ou a comunidade que convive com ela, junto?"
                        lowLabel="Decisão centralizada"
                        highLabel="Decisão coletiva"
                        value={draft.powerOrgScore}
                        onChange={(powerOrgScore: LikertScore) =>
                          update({ powerOrgScore })
                        }
                      />
                    </div>
                  )}

                  <div className="mt-8 flex gap-3">
                    {draft.creationStep > 0 && (
                      <FfieButton
                        variant="secondary"
                        onClick={() =>
                          update({ creationStep: draft.creationStep - 1 })
                        }
                      >
                        Back
                      </FfieButton>
                    )}
                    <FfieButton
                      disabled={
                        (draft.creationStep === 0 &&
                          (!draft.characterName.trim() ||
                            !draft.role.trim() ||
                            !draft.location.trim())) ||
                        (draft.creationStep === 1 &&
                          !draft.aiFunction.trim()) ||
                        (draft.creationStep === 2 &&
                          (!draft.desire.trim() || !draft.fear.trim())) ||
                        (draft.creationStep === 3 &&
                          draft.values.length !== 3) ||
                        (draft.creationStep === 4 &&
                          !draft.artifactName.trim()) ||
                        (draft.creationStep === 5 &&
                          !draft.publicPromise.trim()) ||
                        (draft.creationStep === 6 &&
                          !draft.hiddenFunction.trim()) ||
                        (draft.creationStep === 8 &&
                          (draft.systemLogicScore == null ||
                            draft.powerOrgScore == null))
                      }
                      onClick={() => {
                        if (draft.creationStep < CREATION_STEPS.length - 1) {
                          update({ creationStep: draft.creationStep + 1 });
                          return;
                        }

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
                        goTo("output", {
                          ...placement,
                          title,
                          narrative,
                          creationStep: 0,
                        });
                      }}
                    >
                      {draft.creationStep < CREATION_STEPS.length - 1
                        ? "Next"
                        : "See your future"}
                    </FfieButton>
                  </div>
                </CreateStageShell>
              )}

              {draft.stage === "output" && (
                <CreateStageShell stage="output" subtitle="">
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                    <FutureCardPreview
                      draft={draft}
                      id="future-output-card"
                      compact
                    />
                    <MatrixReveal position={draft.position} />
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
                      onClick={() => {
                        clearDraft();
                        const sessionId = crypto.randomUUID();
                        setDraft(createInitialDraft(sessionId));
                      }}
                    >
                      Start again
                    </FfieButton>
                  </div>
                </CreateStageShell>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {showLivePreview && (
          <aside className="lg:sticky lg:top-6">
            <FutureCardPreview draft={draft} id="future-output-card" />
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
