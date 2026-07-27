# FFIE — Product & UX Foundations
Grounding analysis before implementation. Source: PhD thesis *Designing Feminist Futures in Brazilian and Portuguese Innovation Ecosystems* (Chapters 2–6), project memory, and the existing repo docs (`FFIE_product_brief.md`, `ffie_atlas_seed.md`). No implementation decisions in this document — analysis only, to ground the brief and every future Cursor prompt.

---

## 1. What is FFIE?

FFIE (Feminist Foresight in Innovation Ecosystems) is a five-phase participatory foresight methodology — **Understand, Situate, Embody, Materialize, Share** — and the original methodological contribution of the thesis. It is built on the F-D-P model (Ollenburg, 2019) as scaffolding, not authored by Amanda, but the FFIE Framework itself is her contribution, developed and validated through two independent workshop cohorts (Recife and Lisbon, 2026). It produces three concrete instruments: the **FFIE Narrative Card Deck** (19 cards in two registers), the **Critical Feminist 2×2 Matrix**, and the **Situated Check-in**. Its output unit is the **diegetic prototype**: a persona situated in 2036, paired with a speculative artifact that both serves and constrains her.

## 2. What problem does it address?

Two interlocking problems. First, an epistemic one: mainstream foresight and innovation methods treat gender as a demographic variable to note, not a structural design issue — FFIE's cross-cutting theme "Gender as a Design Issue" (T4) names this directly. Second, an empirical one, discovered in Amanda's own Phase 1 data: the **Use-Distrust Paradox** — people, women especially, report simultaneously high distrust of AI's societal trajectory and high personal certainty about adopting it. This is not an individual contradiction to resolve; it is a structural bind FFIE is built to render speculatively visible and discussable, without collapsing into either techno-solutionism or techno-pessimism.

## 3. Who is the intended user?

Two distinct layers, and the gap between them is the central product design problem.

**The method's original user:** an innovation-ecosystem professional (designer, PM, founder) attending a facilitated, multi-hour, in-person group workshop with a trained facilitator present at every phase.

**The digital product's user:** a solo, self-directed, asynchronous visitor with no facilitator. This is a real substitution problem, not a cosmetic one — every phase of the original method assumes a human facilitator absorbing ambiguity, managing group dynamics, and validating whether a participant is "doing it right." The digital experience has to design scaffolding that does that job without a person in the room.

## 4. What is the role of feminist foresight?

Feminist foresight does not add "consider gender" to conventional scenario planning — it changes whose perspective counts as data and how power gets encoded into the scenario itself. Three commitments carry directly into FFIE: futures are **situated**, not universal (Haraway's partial perspective — every future is imagined from somewhere, and that somewhere is named, never anonymized away); gender is read **intersectionally** (Collins' matrix of domination — race, class, gender, migration status compound, they don't stack independently); and **care is an infrastructural variable**, not a soft add-on — it is literally one pole of the Matrix's vertical axis. The deliberate inclusion of John Bell/OPEN HUMAN, the only persona built from a hegemonic rather than marginalized position, operationalizes a specific methodological argument: a feminist futures practice that only constructs personas from positions of marginalization risks rendering power invisible exactly where it most needs to be seen.

## 5. What is the role of innovation ecosystems?

Not a backdrop — the site of contestation. Every persona holds a concrete professional role inside an innovation ecosystem (startup engineer, ESG manager, freelance developer, politician, BigTech executive) because the thesis's argument is that gender inequity in AI is produced through the institutional mechanics of innovation ecosystems — funding, hiring, whose labor is visible, whose data gets extracted — not through bias floating abstractly inside an algorithm. Every artifact is correspondingly an institutional or organizational object (an onboarding kit, an HR platform, a political media tool), never a personal gadget disconnected from an employer, an ecosystem, or a market.

## 6. How does the framework currently work?

- **Understand** (pre-workshop, facilitator/researcher-led): bilingual survey (n=134) + interviews (n=23) → thematic analysis → the 19-card Narrative Card Deck (Tension Cards: AI Risks + Ecosystem Barriers; Potential Cards: AI Benefits + Trust in AI). This phase is not participant-facing — it is already "baked" before any workshop begins.
- **Situate**: participants complete an individual check-in ("Where am I speaking from regarding AI?"), then engage the card deck collectively to frame the tension their group will work with.
- **Embody**: the group builds a persona situated in 2036 — role, AI function in daily life, one desire, one fear, three non-negotiable values drawn from a fixed list.
- **Materialize**: the group designs a speculative artifact responding to or exacerbating the persona's central tension, visualized through a structured GenAI prompt.
- **Share**: the group positions the resulting diegetic prototype on the Critical Feminist 2×2 Matrix, defends the placement, and reads the full set of prototypes as a collective speculative landscape.

Output to date: 8 validated diegetic prototypes (4 per cohort) — the current seed dataset.

## 7. What are the Narrative Cards and how are they used?

19 cards in two registers — **Tension Cards** (AI Risks + Ecosystem Barriers) and **Potential Cards** (AI Benefits + Trust in AI) — plus one transversal card, **Environmental Impact**, which sits outside the four draw categories because it names the material infrastructure underwriting all of them (energy, water, mineral extraction, disproportionately outsourced to peripheral geographies). Every card is derived from **triangulated convergence** between the survey's open-response corpus and the interview corpus — never from one data stream alone, and never from the researcher's intuition. Each card names a **tension**, not a fact (e.g., Card A2 — *Amplification of Historical Biases*: "racism, sexism, and transphobia are reproduced by historical data. Tension: the automation of injustice").

The deck functions in three interrelated registers: a **condensation device** (compresses hundreds of coded units of meaning from 140 participants into 18 workshoppable propositions), a **provocation device** (the tension format sustains productive discomfort rather than resolving into consensus), and an **equity device** (it makes structural inequities discussable by participants who have no direct lived experience of them). In the workshop, groups select and combine 2–3 cards during Situate to define the tension their persona and artifact will respond to.

## 8. What is essential to preserve?

- The **tension-based, empirically-triangulated card format**. Strip the empirical grounding and the cards become generic ideation prompts — the "equity device" and "audit trail" functions collapse.
- The **Critical Feminist 2×2 Matrix's** actual axes and quadrant names (Power Organization: Hierarchical↔Collective Care; System Logic: Extractive↔Emancipatory; Dominant Dystopian Future / Naïve Techno-Optimist Future / Fragmented or Precarious Future / Feminist Preferable Future). These are the analytical payload, not decoration.
- The **public-promise-vs-hidden-function duality** every artifact must hold. This is what makes them critical design objects rather than solutionist mockups — an artifact that only does good is not a diegetic prototype in this framework's sense.
- The **deliberate inclusion of hegemonic-position entries**, not only marginalized ones — a direct methodological safeguard, not an optional variety feature.
- **No resolution into comfortable consensus.** No scoring, no ranking of artifacts as good/bad, no declared "winning" future.

## 9. What could be adapted for a digital individual experience?

- **Facilitator role → structured scaffolding.** Guided prompts, examples, and inline explanation substitute for what a human facilitator would normally clarify live.
- **Group Situated Check-in → light personal reflection.** A solo moment of self-location, not a group share-out.
- **Group card negotiation → guided individual selection.** Picking 2–3 cards from a shorter, curated subset rather than open-table group debate.
- **Researcher-run GenAI visualization → user-directed generation.** The platform generates the prompt; the person runs it in their own AI tool and uploads the result — the individual equivalent of what Amanda did with Manus AI for the workshop cohorts.
- **Group-negotiated matrix placement → guided self-assessment.** A structured placement exercise with a required written justification, replacing verbal group defense.
- **Understand phase → not reproducible per session.** Individuals don't run new surveys or generate new cards; they inherit the fixed, already-validated 19-card deck.

## 10. Relationship between the academic framework and the digital product

The digital product is not the framework — it is a public-facing, single-player derivative built on top of one validated cycle of the framework's output. It serves two purposes simultaneously: a portfolio/case-study surface that makes the doctoral contribution legible to non-academic audiences, and a live, deliberately narrow-scope instrument letting individuals produce one new diegetic prototype without a facilitator, a room, or access to the original empirical corpus.

This creates an epistemic responsibility the product must carry structurally, not just note in a footnote: a visitor's five-minute solo submission and the thesis's 8 rigorously triangulated, cohort-validated prototypes are not methodologically equivalent, and the interface must never visually imply that they are (see Risks, below).

---

## Core concepts

Diegetic prototype · situated knowledge (Haraway) · the Use-Distrust Paradox · tension (not solution) · Power Organization vs. System Logic axes · marginalized vs. hegemonic position · condensation / provocation / equity device · F-D-P model as scaffolding (not FFIE itself) · care as infrastructure.

## Core user needs

- A fast, jargon-light way to understand what "feminist foresight" means before committing time (entry accessibility).
- A low-stakes way to try the method without fear of "getting it wrong" — the workshop had a facilitator absorbing that anxiety; the product needs a UX equivalent.
- Proof before commitment: seeing real examples (the 8 seed prototypes) builds enough confidence to attempt one's own.
- An output that feels keepable and meaningful, not a form-submission receipt.
- For academic/practitioner visitors specifically: a visible trail back to the method's rigor — sourcing, references, the actual thesis.

## Key methodological principles

- **Situatedness always disclosed** — never anonymize away whose position a future is imagined from.
- **Tension over resolution** — the interface must never converge toward a "best" future.
- **Power made visible, not just marginalization** — a user-generated hegemonic-position entry should be as legitimate an option as a marginalized one, not an edge case.
- **Empirical traceability** — seed vs. submitted status must stay visibly distinct, always.
- **Consent and dignity in submitted content** — given the intersectional/political subject matter (race, gender identity, migration, disability), moderation needs a feminist/decolonial content standard, not just spam filtering.

## Potential UX principles

- Progressive disclosure: simple visual entry (cards, matrix) with the full academic apparatus available on demand, never forced upfront.
- No gamification signalling anywhere — no points, streaks, badges, leaderboards.
- Deliberate friction where friction protects reflection — this should not be optimized purely for completion rate or speed.
- Visible epistemic status on every entry (seed/validated vs. community/pending vs. published).
- A lightweight glossary or inline explainer for critical vocabulary (diegetic prototype, extractive, hegemonic) so the framework doesn't gatekeep non-academic visitors.

## Potential product risks

- **Rigor dilution** — simplifying the method into a generic "build your future persona" content mill would undercut the academic contribution it's meant to showcase.
- **Moderation burden** — public submissions on gender, race, trans identity, and colonial themes can attract bad-faith or harmful content; Amanda is the sole moderator named in the brief, and a real content policy (not just spam filtering) takes real time to run.
- **Conflating validated and unvalidated data** — if seed and community entries are visually indistinguishable, both the site's credibility and the thesis's academic standing are exposed.
- **Consent/authorship ambiguity** — visitor-submitted personas may raise questions if referenced in future publications; the submission flow should say explicitly what happens to submitted content.
- **Tone risk** — an academic register can alienate the non-expert individual users the tool is meant to reach; a purely playful register can trivialize the subject matter. This needs deliberate calibration, not a default.
- **Drop-off at the "leave the platform" step** — generating the prompt, going to an external AI tool, returning to upload is real friction; if it filters out all but the most motivated users, the Future Commons will skew toward a narrow, unrepresentative sample.

## What should NOT be simplified or gamified

- No scoring, ranking, or "best future" declarations.
- No leaderboards, streaks, or badges.
- No forcing gender or identity into simplified fixed categories — the method's strength includes trans, non-binary, and intersectional identity precisely because the empirical corpus required it methodologically, not decoratively.
- No stripping the artifact's hidden function to make it purely aspirational — that turns critical design into solutionism, which is the opposite of what the method is for.
- No auto-approving submissions without human review, given the sensitivity of the subject matter.
- No collapsing the four quadrants into a simple good/bad binary.
- No treating the hegemonic-position option as a minor variant — it must remain a clearly legitimate, equally weighted choice.
