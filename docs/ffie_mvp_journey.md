# FFIE — MVP Core Experience: The Individual Journey
Product flow only, no code. Synthesizes `ffie_product_ux_foundations.md`, `ffie_product_concepts.md`, and `ffie_reference_research.md` into one concrete, buildable sequence. Target: 10–20 minutes, feels authored, not filled out.

## Resolves an open question from the concepts doc

`ffie_product_concepts.md` left "Card Oracle" (fast, light) and "Go Deeper" (full diegetic prototype) as two separate branches — a fork the user has to choose. Designing the actual journey step by step made that fork unnecessary: if every step stays lightweight (short lists and system-suggested prompts instead of blank fields, a live preview instead of a form that only resolves at the end), **one continuous flow can reach full diegetic-prototype depth in 15–20 minutes without ever feeling like a form.** There's no "go deeper" button — there's one path, and its own pacing does the work.

This does keep a natural two-tier output as a side effect, not a deliberate choice screen: someone who completes Reflection but abandons before Creation still leaves with something shareable (their drawn cards + their own reflection) — the "Future Reading" content type from the brief still exists, but now as what a partial session naturally produces, not a separate front door.

---

## ENTRY

**User goal:** decide whether to spend the next 15 minutes here, in under 15 seconds.

**UX interaction:** a single screen. One evocative line, a glimpse of the card backs (not yet drawn), one button: *Begin*. No account, no email, nothing to fill in.

**Content:** "What future are you carrying? Draw a hand of cards and find out." (placeholder copy — needs FFIE's actual voice, but the job of this line is invitation, not explanation.)

**Narrative Cards involved:** shown as closed decks (visual teaser only), not drawn.

**Data generated:** none. An anonymous session id is created client-side so the journey can be resumed if abandoned.

**What the user sees:** near-empty screen, the deck, the button.

**What happens next:** → Orientation.

---

## ORIENTATION

**User goal:** understand the shape of what's about to happen and feel safe entering it — this is the digital substitute for a facilitator's opening framing, since there is no human in the room to do this live.

**UX interaction:** 3 short screens/panels, swipeable or auto-advancing, each one sentence plus a visual: (1) *"This isn't a quiz. There are no right answers — feminist foresight means the future looks different depending on where you stand."* (2) *"You'll draw cards, reflect, and build a small future of your own — about 15 minutes."* (3) *"Then you'll see the futures other people, and the original research, have already imagined."*

**Content:** plain-language framing, zero academic vocabulary at this stage (glossary lives in About, not here).

**Narrative Cards involved:** the four-plus-one category icons shown as a preview (Risks / Benefits / Trust / Barriers / the transversal Environmental Impact card), not yet explained in depth.

**Data generated:** none.

**What the user sees:** short, calm, mostly visual framing — sets tone before asking for anything.

**What happens next:** → Exploration.

---

## EXPLORATION

**User goal:** see real examples before being asked to make anything — lowers the fear of "getting it wrong," and independently validated by both IFTF's Foresight Engine and the Oracle's community gallery as the right sequencing.

**UX interaction:** an embedded, condensed preview of Research Findings — 3 curated diegetic prototypes (rotating selection from the 8, not all 8) shown as cards, tappable for the full detail view without leaving the journey (opens as an overlay, not a new page/context switch).

**Content:** e.g. Valentina/INSIDER, Tainá/A-EYE, John Bell/OPEN HUMAN — a deliberately varied trio (one Dominant Dystopian Future, one Feminist Preferable Future, one hegemonic-position entry) so the range of the matrix is visible in three examples, not just its extremes.

**Narrative Cards involved:** none directly, but each example card can show which card-category tension seeded it, quietly reinforcing the card → tension → artifact logic before the user does it themselves.

**Data generated:** none (view-only).

**What the user sees:** 3 real future cards with quadrant tags, a light-touch "these came from the same 19-card deck you're about to use" note, a continue action.

**What happens next:** → Reflection.

---

## REFLECTION

**User goal:** locate themselves personally before creating anything — the individual, asynchronous equivalent of the workshop's Situated Check-in and card-based problem-framing, combined into one step since there's no group to negotiate with.

**UX interaction:** draw exactly one card from each of the four categories (Risk, Benefit, Trust, Barrier) — four cards total — with the Environmental Impact transversal card always present as a fixed lens, not drawn. The system surfaces a combined tension statement from that combination. Then 1–2 short reflective prompts, answered in a sentence or two, e.g. *"Where do you feel this tension yourself — in your work, your community, your own use of AI?"*

**Content:** the drawn cards' actual tension text (real, thesis-derived content — see the pending `docs/ffie_narrative_cards.md` extraction), plus the reflective prompt copy.

**Narrative Cards involved:** the central mechanic of this entire stage — one card from each category plus the fixed Environmental Impact lens (see `docs/ffie_narrative_cards.md`).

**Data generated:** which cards were drawn, the free-text reflection. This pairing (cards + reflection) is what a Future Reading consists of if the session stops here.

**What the user sees:** a card-reveal moment (some sense of ceremony/pause, not instant), the generated tension statement, a simple text field.

**What happens next:** → Creation.

---

## CREATION

**User goal:** turn the reflection into a persona and artifact that hold together — without ever facing a blank multi-field form.

**UX interaction:** a sequence of small, mostly-guided choices rather than one long form, with a live preview panel building the Future card in real time as each choice is made (borrowing the "immediate visible consequence" principle from the 2050 Calculator precedent):
1. Name your character, and where they're speaking from — open text, not a fixed BR/PT dropdown, since Future Commons entries can come from anywhere (unlike the fixed Research Findings dataset)
2. Their role in an innovation ecosystem in 2036 (short examples shown for inspiration, not a rigid dropdown)
3. One desire, one fear — short text, prompted by the tension already surfaced in Reflection
4. Three non-negotiable values, picked from the same fixed list the original workshops used
5. The artifact: the platform generates a starting prompt from everything chosen so far ("an artifact that promises ___ but actually ___") for the user to complete or edit
6. Optional: generate an image via an external AI tool using a ready-made prompt, then upload it — same mechanic already speced in the brief, still no in-platform generation API in v1

**Content:** short example chips/suggestions at every step (never a truly blank field), the live-building card preview.

**Narrative Cards involved:** the tension from the cards drawn in Reflection is the seed the artifact must respond to or exacerbate — carried forward, not re-selected.

**Data generated:** character (name, location, role, desire, fear, values), artifact (name, public promise, hidden function), optional uploaded image.

**What the user sees:** their own Future card assembling itself piece by piece, never a long form seen all at once.

**What happens next:** → Future Output.

---

## FUTURE OUTPUT

**User goal:** the payoff — walk away with something real, regardless of what happens to it afterward.

**UX interaction:** the assembled card is placed on the Critical Feminist 2×2 Matrix — the user drags their own artifact to where they believe it belongs (Extractive↔Emancipatory, Hierarchical↔Collective Care), writes one sentence justifying the placement, then the finished card renders in full.

**Content:** the completed Future card — character, artifact, tension, quadrant, drawn cards shown as provenance. Actions: download, share (pre-formatted for social), and an opt-in toggle — *"Submit this to the Future Commons for others to see?"*

**Narrative Cards involved:** displayed as the card's origin/provenance, not interacted with further.

**Data generated:** matrix position (x, y), placement justification, submission status set to `pending` only if the user opts in — otherwise the card stays personal/local, downloadable but never sent to moderation.

**What the user sees:** their finished, styled Future card — the clearest single "I made something" moment in the whole journey.

**What happens next:** → Discovery of Other Futures.

---

## DISCOVERY OF OTHER FUTURES

**User goal:** realize they're not alone in imagining this — close the loop that started in Exploration, now with their own point in the picture.

**UX interaction:** transitions into the full Future Commons / Research Findings matrix (the actual `/explore` experience already built), with the user's own new card visually highlighted among the others if they opted in, or shown privately to them if they didn't. Filters (Quadrant, Country, Power Position, Themes) are available here, not earlier — this is the moment for open-ended browsing, not guided sequence.

**Content:** the full living matrix and grid view, the user's own placement now visible in context of the 8 seed prototypes and any other published community entries.

**Narrative Cards involved:** optional discovery hook — "others who drew similar cards" as a light connective thread, if feasible for v1; not essential.

**Data generated:** none new — standard view analytics only.

**What the user sees:** the same matrix from Exploration, now populated with real range, their own contribution part of it.

**What happens next:** the loop closes here. The person can leave with their downloaded card, return later to see if their submission was approved, or start again with a fresh card draw — the journey is designed to be repeatable, not a one-time gate.

---

## Timing budget (target 10–20 min)

| Stage | Target time |
|---|---|
| Entry | ~15 sec |
| Orientation | ~1 min |
| Exploration | ~2 min |
| Reflection | ~3–4 min |
| Creation | ~6–8 min |
| Future Output | ~2–3 min |
| Discovery | ~2+ min (open-ended) |

## Ready to build

The full 19-card Narrative Card deck is documented in `docs/ffie_narrative_cards.md`.
