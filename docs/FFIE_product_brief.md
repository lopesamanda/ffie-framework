# FFIE — Product Brief v3
**Feminist Foresight in Innovation Ecosystems — site + individual tool**
Supersedes v2. Incorporates: Research Findings / Future Commons structural separation, and the Card Oracle as the default `Create a Future` flow (see `docs/ffie_product_concepts.md` for the full critical rationale — Concept A default, Concept C folded into Explore, Concept B kept as an optional deeper path).

---

## 1. Positioning

Two verbs: **Explore** and **Create**. The product is not a website explaining an academic framework — it is an instrument for engaging with feminist foresight directly, at whatever depth a visitor chooses. Language: English, site-wide.

Grounding references for every future decision:
- `docs/ffie_product_ux_foundations.md` — what the method actually is, what must never be simplified or gamified
- `docs/ffie_product_concepts.md` — why the default individual journey is a card-drawing experience, not a form

---

## 2. Information architecture

```
FFIE
├── Explore Futures     (Research Findings ⇄ Future Commons, each with Map/Grid toggle)
├── Create a Future       (Card Oracle by default → optional "Go Deeper" full builder)
└── About FFIE             (manifesto + the 5 phases + the research)
```

Four nav items. No standalone `/framework` route — folded into About FFIE.

---

## 3. Explore Futures

Two structurally separate collections — never merged, never visually ambiguous about which is which.

### Research Findings
The 8 diegetic prototypes from the thesis. Fixed, immutable, always `published`. Matrix view is the default; **Country filter (Brazil/Portugal) reproduces Figures 59 and 64 from the thesis exactly** — no separate component needed, this reuses the filter already planned.

**New: the Reposition mechanic (Concept C, folded in).** On any Research Findings entry, a visitor can drag a *copy* of the artifact to where they think it belongs on the matrix, then reveal and compare their placement against the thesis's original. This is the primary teaching device for how the matrix actually works — experienced through disagreement, not read as an explainer. Aggregate visitor placements are stored per entry (simple average/spread, not a full heatmap in v1) and can quietly become interesting data for Amanda's own future analysis. Copy must make unambiguous that there is no "correct" answer being scored — this is reflection, not a quiz.

### Future Commons
Grows only from completed **Diegetic Prototypes** (the "Go Deeper" output of the Create flow, see §4). Same card/matrix shape as Research Findings, same Map/Grid toggle, but visually and structurally distinct (different section, different framing copy: "created by visitors," never blended into the same view as Research Findings by default).

Moderation: hybrid model, unchanged from earlier decisions — `pending` → manual review → `published`/`rejected`.

---

## 4. Create a Future

### Default flow — Card Oracle
Fast, evocative, true to the Narrative Cards' original role as a provocation device (see foundations doc). No persona form, no artifact form as the entry point.

1. Draw 2–3 cards (weighted randomness from the 18-card deck, not a checklist)
2. The system surfaces a generated tension statement from the specific combination drawn
3. 2–3 short reflective prompts, answered in a sentence or two ("where do you feel this tension in your own work/life?")
4. A **Future Reading** card is generated — the cards drawn, the tension, the person's own words

The Future Reading is downloadable/shareable immediately. The person chooses whether to publish it to a public, lightweight **Readings feed** (opt-in, not the Future Commons matrix — a Reading has no persona/artifact/matrix position, it is a different, lighter content type). Readings use lightweight community moderation (report/flag), not the pre-publish review queue — volume will be higher and individual stakes lower than full submissions.

### Optional deeper path — "Go Deeper" (full builder, Concept B)
Offered as a clear CTA at the end of a Future Reading, for whoever wants to continue past the quick reflection into building a complete diegetic prototype:

1. **Embody:** the cards and reflection already given seed the persona — role, AI function, one desire, one fear, three non-negotiable values. Framed as first-person narrative authorship ("a letter from 2036"), not a labeled form.
2. **Materialize (AI-assisted):** the platform generates a ready-to-use image prompt from the persona; the user runs it in their AI tool of choice and uploads the result. No in-platform generation API in v1.
3. **Share:** the user positions the resulting artifact on the matrix and writes a short justification.

This produces a full **Diegetic Prototype**, submitted to the moderation queue exactly as speced in earlier versions of this brief. If approved, it joins Future Commons.

---

## 5. Content model summary

| Type | Produced by | Has matrix position? | Moderation | Where it lives |
|---|---|---|---|---|
| Diegetic Prototype (seed) | Amanda / thesis | Yes, fixed | N/A — immutable | Research Findings |
| Diegetic Prototype (submitted) | "Go Deeper" flow | Yes, self-placed | Pre-publish review queue | Future Commons |
| Future Reading | Card Oracle flow | No | Report/flag, opt-in publish | Readings feed |

---

## 6. Scope v1 vs v2

**v1:**
- Explore Futures: Research Findings (country filter reproduces Fig. 59/64) + Future Commons, both with Map/Grid toggle
- Reposition/compare mechanic on Research Findings entries (simple aggregate storage, no heatmap)
- Create a Future: Card Oracle as default, shareable Future Reading, opt-in Readings feed
- Go Deeper: full diegetic-prototype builder → moderation queue → Future Commons
- Admin: moderation queue for prototype submissions + lightweight report handling for Readings
- Lean editorial layer (Home manifesto + About FFIE with the 5 phases)

**v2:**
- In-platform AI image generation (removes the "leave the platform" step in Go Deeper)
- Full heatmap/aggregate visualization of Reposition data
- PT/EN language toggle
- Reactions/comments on published Future Commons entries

---

## 7. Suggested stack (unchanged)

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. Supabase for persistence (prototype submissions with `pending/published/rejected`, Readings with a simple `reported` flag, storage for uploaded images, aggregate reposition stats per Research Findings entry). Admin route protected by simple auth.

---

## 8. Visual references (unchanged)

With Company (with-company.com) for the editorial layer's tone. 2×2 scenario matrix tools (Futures Platform, Kinetic Futures Lab, GOV.UK Futures Toolkit) for positioning interaction patterns. IDEO/18F Method Cards for card presentation conventions, now extended into both the Card Oracle draw mechanic and the Future Commons grid.

---

## 9. Content source

Seed data: `docs/ffie_atlas_seed.md` (unchanged — the 8 prototypes and their shape remain accurate; only the surrounding product structure changed in this revision). Narrative Card content (all 18 cards, categories, and the tension each names) needs to be extracted from thesis section 5.1.3 into its own structured doc before the Card Oracle can be built — **not yet created**, needed before the next Cursor increment that builds Create a Future.
