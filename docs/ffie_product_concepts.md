# FFIE — Product Concepts & Critical Review
Senior Product Design review, pre-implementation. No code. Supersedes the implicit assumption baked into `FFIE_product_brief.md` v2 that "Create a Future" should be a linear digitization of the workshop's Embody→Materialize→Share sequence — that assumption is examined and challenged below, not simply carried forward.

---

## The assumption I want to name and challenge

Every conversation so far has converged on the same shape for the individual journey: fill in persona fields → fill in artifact fields → position a dot on a matrix. That shape is not neutral — it is a **worksheet**, ported from a facilitated group exercise into a solo web form. A worksheet is not automatically an interactive experience just because it runs in a browser. The real design question isn't "how do we digitize the workshop steps" — it's "what does *this specific method* feel like when there is no facilitator, no group, and no room, and what is the smallest, truest interaction that still carries its critical charge?" Those can produce very different answers, and I don't think we've actually tested the alternatives yet. That's what this document does.

---

## Four layers that are getting collapsed into one

**The academic framework** — the theorized model: five phases, the F-D-P scaffolding, FSSF and CLA as analytical instruments, the empirical validation across two cohorts. Its job is to produce and defend knowledge. It answers to examiners, not users. It does not need a UI.

**The facilitation method** — how the framework runs in a room: a trained human absorbing ambiguity, reading group energy, deciding when a group is stuck versus productively uncomfortable, verbally defending a matrix placement to peers. This layer is inherently social and synchronous. Most of its actual mechanics (a facilitator's live judgment calls) have no direct digital equivalent — they have to be *replaced*, not translated.

**The digital product** — what gets built. This should be authored for its own medium, borrowing *principles* from the framework and *some* mechanics from facilitation, but it is a distinct design object, not a translation exercise.

**The user experience** — the felt, moment-to-moment experience of a visitor: what's fast, what's slow, where the friction sits, what makes someone stay, what makes them return or share.

The brief so far has mostly designed at the "digital product = translated facilitation method" layer. The three concepts below deliberately design at the UX layer first, then check what that implies for the product layer.

---

## 1. What should remain as methodology (never becomes a UI)

- The F-D-P macro-structure (Analysis → Forecasting → Projection) — research architecture, irrelevant to a visitor
- FSSF and CLA — the researcher's own analytical instruments for deriving themes and cards from data; they explain *why* a card says what it says, but no user needs to run CLA to use a card
- The dual-stream empirical triangulation logic (survey × interview convergence) — stays as citable justification, not an interaction
- The **Understand** phase in full — already completed, becomes static background data, never a live step

## 2. What should become a digital interaction

- Engaging with Narrative Cards (mechanic under debate below — not necessarily a checkbox list)
- Producing *something* — text, an image, a placement, a reaction — that becomes visible to others
- Exploring what other people have produced

## 3. What should become content (read, not manipulated)

- The manifesto / "why feminist foresight" — short, plain-language
- A glossary for critical vocabulary (diegetic prototype, extractive, hegemonic, situated)
- Card-category explainers, quadrant explainers
- The About page linking out to the actual research

## 4. What should become a visual artifact

- The Future Output / result card, in whatever form the chosen concept produces one
- The Matrix itself, as a living visualization (Research Findings + Future Commons, kept structurally separate per the last decision)
- The 8 seed prototypes' imagery

## 5. What stays hidden in the background

- Moderation queue and its logic
- The granular empirical counts (89 risk responses, etc.) — citable in About, never surfaced as UI chrome
- Matrix coordinate math
- The full FSSF/CLA machinery

---

## Three product concepts

### Concept A — The Card Oracle
*Cards as the entry point, not a buried form field.*

- **Core user value:** a fast, evocative moment of self-reflection on your own relationship to AI, power, and care — no design skill or spare 15 minutes required.
- **Main user journey:** draw 2–3 cards (weighted randomness, not a checklist) → the system surfaces a generated tension statement from the combination → 2–3 short reflective prompts, answered in a sentence or two → a personal "reading" is produced.
- **Main interaction:** drawing/combining cards (serendipitous, game-adjacent) + short free-text reflection. Optional deeper path: turn the reading into a full persona + artifact for someone who wants to go further.
- **Expected output:** a shareable "Future Reading" card — the drawn cards, the generated tension, the person's own words.
- **How Narrative Cards are used:** literally the entry point and the primary mechanic, closest to the deck's original role as a *provocation device*.
- **How users explore other futures:** a scrollable "field of readings" from other visitors, filterable by which cards or themes they drew.
- **Strengths:** lowest friction, most faithful to what the cards are actually *for* (sustaining discomfort, not resolving it into a form), scales well for casual visitors (recruiters, practitioners skimming a portfolio).
- **Weaknesses:** shallower engagement with the full diegetic-prototype logic — persona/artifact/matrix depth becomes optional, which risks feeling like a personality quiz if the tone isn't held carefully.
- **Complexity to build:** low–medium. No image-generation round-trip required for the core loop, no drag-based matrix interaction needed for MVP.

### Concept B — Build the Artifact
*The full diegetic-prototype builder — the direction already speced in the brief.*

- **Core user value:** deep, effortful creative engagement — you leave having authored something structurally comparable to the thesis's own outputs.
- **Main user journey:** Situate (light) → Embody (persona) → Materialize (artifact + AI-assisted image) → Share (matrix placement + justification), largely as already documented.
- **Main interaction:** structured creative authorship. To avoid the worksheet trap, this needs to be reframed as narrative co-writing (e.g., "a letter from 2036," written in first person) rather than a sequence of labeled form fields.
- **Expected output:** a full Future Output card, submitted to moderation for possible publication in the Future Commons.
- **How Narrative Cards are used:** seed the tension at the Situate stage, same role as the workshop.
- **How users explore other futures:** the Future Commons matrix/grid, as already speced.
- **Strengths:** the most faithful port of the actual methodology; produces content structurally consistent with the seed data; the strongest single showcase of the doctoral method if someone completes it.
- **Weaknesses:** the highest time cost (realistically 10–15 minutes, not 5–8), the highest drop-off risk, the step that requires leaving the platform for image generation is real friction, and without careful art direction it reads as a worksheet regardless of copy.
- **Complexity to build:** medium–high. Most routes, most data fields, a moderation queue, an external upload flow.

### Concept C — Read the Room
*Exploration and reaction as the primary mode; authorship from scratch becomes a secondary, deeper path.*

- **Core user value:** understand feminist foresight by engaging with *existing* real tensions rather than starting from a blank page — low commitment, highly explorative, feels like a living publication with light participation.
- **Main user journey:** land on Explore → engage with existing artifacts by repositioning a copy of them on the matrix ("where would *you* place this, and why") and comparing your placement to the thesis's own → optionally remix an existing artifact (swap one value or one card, see how the tension shifts) → optional deep path to build fully from scratch (Concept B, as an extension).
- **Main interaction:** repositioning-as-response (drag a copy of an existing prototype to where you think it belongs, then reveal and compare to the original placement) and lightweight remix (swap one variable in an existing pairing).
- **Expected output:** either an aggregate reaction data point (e.g., "62% of visitors place OPEN HUMAN even further toward Extractive than the original cohort did") or a remix artifact derived from an existing one.
- **How Narrative Cards are used:** remix material — swap one card in an existing artifact's founding combination and see the tension shift, rather than being the starting point of a build-from-zero flow.
- **How users explore other futures:** this *is* the product, not a side feature — includes seeing aggregate visitor sentiment against the thesis's own placements.
- **Strengths:** lowest barrier to *meaningful* engagement (repositioning is intuitive, no writing-from-scratch required); teaches the matrix's logic experientially through comparison and disagreement rather than through an explainer; generates genuinely interesting aggregate data that could feed back into Amanda's own research or a future publication.
- **Weaknesses:** further from "individual authorship of new futures," which may undersell the participatory/co-design ambition of the thesis; a comparison mechanic needs very careful copy so it never implies there's a "correct" placement, since the method's whole point is that there isn't one; the aggregate/heatmap visualization is more backend work than it first appears.
- **Complexity to build:** medium. Reaction data model is simple; remix logic needs careful content constraints so arbitrary swaps don't produce nonsensical pairings; aggregate visualization adds real, non-trivial work.

---

## My recommendation, stated critically

Concept B, as currently speced, is the most expensive, most drop-off-prone, and least differentiated of the three as an *interaction* — it is the concept that most resembles "a website that explains the academic framework," dressed as a form. That's precisely what you said at the very start you didn't want to build.

I'd recommend **not** treating Concept B as the default v1 flow. Instead:

- Ship **Concept A** (Card Oracle) as the actual `Create a Future` entry point — it's cheap, fast, true to what the cards are for, and gives every visitor a shareable output within a minute or two.
- Fold **Concept C**'s repositioning mechanic into `Explore Futures` as a lightweight secondary layer on top of the matrix already built — visitors can drag a *copy* of an existing prototype and compare their placement to the original. This is cheap to add on top of existing matrix infrastructure and teaches the framework experientially instead of through explainer text.
- Keep **Concept B** alive as an optional "Go deeper" path for the visitor who finishes a Card Oracle reading and wants to build a full persona + artifact — not the mandatory front door, but a real, complete experience for whoever wants it. This also means the moderation/Future Commons pipeline (already speced) still gets built, just fed by a smaller, more motivated set of submissions rather than being the only way to participate at all.

This changes what ships first without discarding any work already done — the matrix visualization already built for `/atlas` is required infrastructure for all three concepts, not sunk cost specific to Concept B.
