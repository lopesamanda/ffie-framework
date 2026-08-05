# FFIE — Full Product Review
UX heuristics, UX writing, flow and UI, product/MVP scope, and thesis alignment. Written as a UX/product review with a closing foresight-practitioner take. Grounded in a live fetch of https://ffie-framework.vercel.app/ done today, plus the complete specification built across this project's design sessions.

## 0. Production reality check (do this first, before anything else)

A direct fetch of the live site today shows: the Home page still renders the old, pre-revision copy — the em-dash-heavy hero ("Its replicable unit is simple and powerful... not a site that explains a framework from the sidelines") and the old card descriptions ("eight thesis prototypes... two collections, never blended"). This is the exact same text found several rounds of Cursor prompts ago, which strongly suggests the merge-to-`main` problem identified earlier in this project has recurred, or new work is again sitting on unmerged branches. This matters more than any heuristic finding below: if the homepage a real visitor sees is a version behind everything decided in this project, none of the improvements below are reaching anyone yet.

The About page, by contrast, has clearly been updated: it now has the full "Understand → Situate → Embody → Materialize → Share" framing, the Use-Distrust Paradox section, the Four Futures quadrant descriptions, and a "Phase 01 — Understand" paragraph. But phases 2 through 5 (Situate, Embody, Materialize, Share) appear only as bare labels with no accompanying paragraph — Understand is the only phase that got its description written in. That's a real, specific gap: the same treatment given to Understand needs to be written for the other four phases using the descriptions you already have.

Explore appears to be live and functional — the matrix renders with Matrix/Constellation/Grid view toggles, country and scenario filters, and eight named prototypes plotted (Insider, Bobbio, Valdata Trade ID, Media, A-Eye, Wino, Open Human). This is the most production-ready section of the site right now.

Create could not be verified by direct fetch — it's fully client-rendered (the static response is just "Loading…"), which is expected for an interactive flow like this, but it also means everything specced across this project's many rounds of revisions — the progressive-reveal Embody screens, the reordered artifact flow, the capability accordion, the visual-direction images, the final Future card layout — cannot be confirmed live without either a manual click-through or browser automation, neither of which this review had access to. Given how much has changed here, a manual pass through the live `/create` flow should happen before treating any of the Create-specific findings below as "shipped" — treat them as a review of the *intended* design, cross-checked against Cursor's own reconciliation reports where available.

## 1. Heuristic evaluation

Visibility of system status is the strongest heuristic story here once the reordering work lands: each screen now recalls what the user already said (fear, name, sector) instead of presenting blank fields, and the progressive-reveal pattern (Build Story, the merged Name/Problem/Power screen) shows one thing at a time rather than an intimidating form. The one place this breaks is the top progress indicator, which currently shows flat numbered steps with no phase context — a user has no way to know whether they're early or late in the journey, or what phase they're even in. Section 3 below proposes a fix.

Match between system and the real world is unusually good for a research instrument — the language avoids technical AI jargon in favor of concrete, human stakes (fear, hope, habit, power), which is rare for a tool built out of doctoral research. The risk sits in a few leftover academic terms (CLA, "diegetic artifact" used without gloss on Home) that could read as opaque to a first-time visitor who isn't a design researcher.

User control and freedom is handled reasonably (Back buttons, redraw/shuffle, ability to revisit capability choices), but the Oracle Draw's reported bug — always producing the same two combinations — is a direct violation of this heuristic in its current state: a user who redraws expecting variety and gets the same result twice will reasonably assume the tool is broken, not that they got unlucky.

Consistency and standards is the heuristic most improved by this session's work — reusing the eyebrow+title pattern, the violet "reflection panel" treatment, and the tag-then-expand interaction across both the Embody and Materialize phases (once section 6 of the last Cursor prompt lands) gives the product a coherent visual grammar instead of every screen inventing its own layout.

Aesthetic and minimalist design is the central tension of this whole project, documented across dozens of iterations in this conversation — the repeated pattern was "add reference cards/labels for rigor" followed by "too cluttered, simplify," landing consistently on the side of removing rather than adding. That instinct has been correct throughout and should keep being the tiebreaker going forward.

Help users recognize, diagnose, and recover from errors doesn't have much surface area in a content-authoring tool like this, but the placeholder redesign (short type-labels instead of full examples) is exactly this heuristic applied to open text fields — it tells the user what kind of answer is expected without dictating the answer.

## 2. UX writing

The writing voice is the product's strongest asset: it commits to second-person, plain-spoken, slightly literary phrasing ("A future is not only about what technology makes possible. It is also about what changes along the way.") without slipping into either dry academic register or startup-pitch enthusiasm. That's a hard needle to thread and it's threaded well.

The main open risk is register drift between pages: the About page still carries phrases like "the Use-Distrust Paradox" and "situated critique" that are precise and true to the thesis but will land as jargon for the stakeholder audiences this project has been trying to reach (founders, tech managers, non-academic designers). This doesn't need to be simplified away — it needs a short plain-language gloss immediately next to each term, the same treatment already applied successfully to CLA when it was moved out of the Future card and into About prose.

Screen titles are inconsistent in how literally they name the phase they belong to — "Give it a body." doesn't obviously map to Materialize, "The Draw" doesn't obviously map to Situate, on first encounter. Section 3 addresses this directly since you asked for it by name.

## 3. Create journey — reflecting the framework's phases

Right now, the phase names (Understand, Situate, Embody, Materialize, Share) live only on the About page — they don't appear anywhere inside the actual Create journey a user walks through, so the two experiences (reading about the method, doing the method) feel disconnected. The fix doesn't require inventing new UI: the product already uses an eyebrow-label-plus-title pattern ("BUILD THE FUTURE" above "Give it a body.", "YOUR FUTURE" above "It exists now."). Reusing that pattern with the actual phase names as the eyebrow closes the gap with almost no new design work:

| Phase (eyebrow) | Where it lives | Title |
|---|---|---|
| UNDERSTAND | A short, one-time orientation screen before the draw begins (doesn't currently exist — recommend adding it, since it's the only phase with zero presence inside Create right now) | "Before you begin." + the Understand paragraph you already wrote |
| SITUATE | Oracle Draw (the card draw + reveal) | "The Draw." (keep) |
| EMBODY | Dedication/Role/Context, Sector, Build [Possessive] Story, Fear-mapping | "Build [Possessive] Story." for the story screen; keep others as specced |
| MATERIALIZE | Type selector, the merged Name/Problem/Power screen, Values, Weakness | "Give it a body." (Type step) → "Place it in the world." (merged step) |
| SHARE | Matrix position + Future reveal + Publish | "Your Future." / "It exists now." (keep) |

For the progress bar: replace the flat row of numbered dots with a two-level indicator — a slim segment row reading UNDERSTAND · SITUATE · EMBODY · MATERIALIZE · SHARE, with the current phase highlighted, and only that phase's own sub-steps shown as smaller dots beneath or beside it (the other phases stay collapsed, not expanded into dots the user doesn't need yet). This means a user always knows two things at a glance: which of the five real phases they're in, and how far into that phase they are — which the current flat 1-through-5 dot row can't communicate at all.

## 4. Flow and UI

The Create flow's throughline — fear named in Embody, artifact born to answer that exact fear in Materialize, capability chosen with type-aware filtering, visual identity picked, then everything woven into one card in Share — is coherent and mostly non-repetitive by this point, which is a real achievement given how many rounds of "too much/too repetitive" feedback shaped it. The two live risks are the ones already flagged for Cursor: the draw producing only two combinations (breaks trust in the mechanic before the user even reaches Embody), and the capability picker's tab-highlight bug (small, but the kind of glitch that makes a "research instrument" feel unfinished).

The Future card is the product's climax and its layout has been through the most iteration of anything in this project — widening the card, growing the Matrix, moving "How can you work with this future?" back to always-visible rather than gated, and repositioning the artifact image next to its name are all sound calls that make the card read top-to-bottom as one story instead of a stack of boxes.

## 5. Product / MVP scope

Looking at everything decided across this project, the true MVP is smaller than everything that's been speced: a working Draw with real randomness, an Embody flow that produces a coherent character, a Materialize flow that produces a coherent artifact tied to that character's fear, and a Future card that ties it all together with a correct Matrix position. Everything else — the six curated visual-direction images, the accordion capability picker, the sector-benchmarking Home section, PDF export, Future Commons publishing — is real value but is v1.1, not launch-blocking. If time is short before showing this to real stakeholders, the draw-randomness bug and the Home-page merge gap are the only two items on this list that should be treated as blockers; everything else can ship slightly rough and still deliver the core experience honestly.

## 6. Thesis alignment (Chapters 5 & 6)

The product's replicable unit — persona + diegetic artifact positioned on the Critical Feminist Matrix — is intact and correctly represented on both the About page and (by spec) the Future card. The decision to keep the CLA mapping as About-page prose rather than as labels on the individual Future card was the right call: it preserves methodological honesty (the thesis's real claim, that workshop outputs are primary empirical material and not illustrations of a theory, is stated almost verbatim in the About page's "Why it matters" section) without forcing a user to parse four layers of theory before they can feel anything about the future they just built. The Use-Distrust Paradox is stated clearly and is doing real work as the site's framing device — it is arguably the single best piece of writing on the site because it states the thesis's central empirical finding in one plain sentence instead of paraphrasing around it.

## 7. Foresight practitioner's closing take

FFIE succeeds at something most foresight tools don't even attempt: it makes the user *complicit* in a future rather than a spectator of one. The persona doesn't just describe a scenario, it implicates the person building it — they gave someone a gain, then had to admit what it cost, then had to design the artifact's own shadow side. That loop is the method's real innovation, and this session's changes (removing dynamic-text fragility, tightening the Embody sentences, moving the weakness mechanic to a value-anchored menu) made that loop more legible, not less rigorous. The open strategic question isn't about any single screen — it's whether the site can hold two audiences at once: researchers who want the CLA/methodology rigor visible, and ecosystem stakeholders who want a five-minute, low-jargon experience that still leaves a mark. The current split (rigor lives in About, plain experience lives in Create/Share) is the right structural answer to that question; the remaining work is making sure production actually reflects it.
