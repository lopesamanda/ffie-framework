# FFIE — Design System Reference (Figma Make)
Consolidated record of what was specified across the three Figma Make build stages. This is a specification/decisions log, not a substitute for the live Figma file — cross-check details against the actual file before implementing in code, since Figma Make may have made small interpretive choices not captured here. Companion to `ffie_product_ux_foundations.md` (strategy/analysis), `ffie_narrative_cards.md` (19-card deck content), and `ffie_ai_capability_cards.md` (8-card ideation set) — this file covers visual/interaction design only.

---

## Stage 1 — Foundations

Established: base typography, spacing, and color token system, derived from the FFIE poster's visual identity (European graphic design aesthetic, restricted violet palette per the toolkit submission) and the diagonal Phase Timeline device (circle nodes + arrowhead) as the framework's signature visual motif.

Category colors for the 19 Narrative Cards (sampled from the physical deck, approximate — Figma Make should hold the precise values as the source of truth):
- AI Risks: warm red/rust/terracotta
- Ecosystem Barriers: magenta/deep pink
- AI Benefits: amber/gold/ochre
- Trust in AI: deep indigo/midnight blue
- Environmental Impact (transversal): green — deliberate break from the Risk family, signals cross-cutting status

## Stage 2 — Component Library

Narrative Card component: flat, typographic card face (no illustrated portraits — a deliberate departure from the physical deck's tarot-style illustrations, to stay consistent with `ffie_product_ux_foundations.md`'s explicit rule against generic AI-generated portrait aesthetics). Category color as a top accent bar or subtle background tint, card name in the system's display type, tension line in italic/secondary style (matching the physical deck's existing typographic treatment for tension text), simple linear/geometric icon per category instead of a portrait.

FFIE-specific components built at this stage: Narrative Card (flat/typographic), AI Capability Card (neutral slate accent — distinct from narrative category colors; see `ffie_ai_capability_cards.md`), quadrant tag/pill, persona block, artifact block.

## Stage 3 — Five-Phase System, Oracle Draw, Motion, Accessibility, Matrix, Showcase

### Five-Phase Create flow (revised screen counts, 2026)
Entry → Orientation → Reflection (Oracle Draw) → Creation → Future Output → Discovery. Exploration is **optional** — a link at Orientation opens `/explore` (Research Findings) outside the linear flow. Tone: ludic and narrative throughout, never clinical/form-like.

**Reflection — Oracle Draw:** fanned deck, sequential reveal (one card at a time), DRAWN chips accumulating, reflection panel with Next card / Complete draw. Environmental Impact always visible below (no draw). Synthesis sentence after all four cards.

**Creation — Embody (4 screens):** pronoun → name/age/gender/race → role + location → desire + fear → values (3).

**Creation — Artifact (5 steps):** name + type → day to day (merged AI function; capability cards once) → embedded values → hidden function → image (optional).

**Future Output (2 screens):** combined Likert placement (both scales on one screen) → matrix reveal, share, and Future Commons opt-in.

Legacy timeline still maps 7 journey stages internally; Exploration is no longer a mandatory step.
- **Reflection**: sentence-completion / narrative-prompt style questions (see `ffie_narrative_cards.md` for the actual reflection question per card, and the character/artifact question rewrites already implemented in the app).
- **Creation**: live-building canvas, the future card assembles on screen as the user answers.
- **Future Output**: card flip/reveal animation; quadrant marker animates from center to its computed matrix position.
- **Discovery of Other Futures**: scattered/constellation layout of other published futures, not a list or grid.

### Oracle Draw component (tarot-style animated card reveal)
Two states per card:
- **Cover** (face-down): abstract graphic cover per card — category color as dominant field, a simple symbolic/geometric mark echoing the card's specific meaning (not a literal illustration), category name visible, title hidden until reveal.
- **Revealed** (face-up): existing flat typographic card content, plus Examples and Reflection Question (now written for all 19 cards in `ffie_narrative_cards.md`).

Sequence: shuffle beat → four covers presented face-down → sequential flip-to-reveal, one at a time (Risk → Benefit → Trust → Barrier), each pausing on its reflection question → brief category-color screen wash on reveal → Environmental Impact card fades in already face-up, distinct "always applied" treatment, no draw animation.
Reduced-motion variant: instant cross-fade, no shuffle, no color wash.

### Future / Character / Artifact systems
Future card: title → narrative excerpt → reflection question → secondary data block (character, artifact, tension, quadrant, power position, country/year) — story first, data second.
Character block: name, age, role, AI function, desire, fear, values — reused across Future Output, Future Commons, and Research Findings.
Artifact block: day-to-day use (public promise) vs. hidden function duality always visible and visually contrasted. Creation sequence: (1) "How does it work, day to day?" — persona-tied narrative tied to Benefit + Trust card tags; (2) embedded values multi-select (2–4 chips, including uncomfortable values); (3) hidden function reveal scaffolded with day-to-day answer, selected values, and Risk + Barrier card tags.

### Motion principles
Scene-change "portal" transitions between Create stages, tied to the active category/phase color, replacing plain page slides. Timing: fast for micro-interactions, slower/ceremonial for the card reveal and Future Output moments specifically (these carry the most motion budget in the whole flow). Reduced-motion fallback rule applied consistently everywhere motion appears.

### Accessibility specification
WCAG 2.1 AA contrast for every category and quadrant color pairing. Full keyboard operability for the card draw (not tap/click-only). Screen reader announces card category and content on reveal — meaning is never conveyed by motion alone. Reduced-motion variant wired to `prefers-reduced-motion`.

### Critical Feminist Matrix — corrected quadrant colors
Axes labeled at all four ends, not just two axis titles: horizontal "System Logic" (Extractive ↔ Emancipatory), vertical "Power Organization" (Hierarchical ↔ Collective Care). Corner placement matched exactly to the matrix poster reference image.

- Naïve Techno-Optimist Future = blue
- Fragmented or Precarious Future = yellow
- Dominant Dystopian Future = red
- **Feminist Preferable Future** = violet (the same violet used in the FFIE toolkit identity) as the base/background color, plus a small green icon/symbolic mark (abstract — e.g. leaf/sprout shape) inside this quadrant only, as a secondary accent. Green is intentionally not the quadrant's base color, to avoid visual collision with the Environmental Impact narrative card category, which already uses green.

Tag/pill components use the same four-color mapping at full saturation. Interactive marker animates from center (or off-matrix) to a given x/y coordinate — now fed by the app's two-question Likert placement calculation rather than manual drag-to-position.

### Showcase page
Single scrollable reference page connecting Foundations, Component Library, the full 7-screen Create flow, Oracle Draw (both states), Future/Character/Artifact systems, the corrected Matrix, and the motion + accessibility specs — structured so a developer could hand off directly from it.

---

## Figma source links (Dev Mode)

File: FFIE Design System — `https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System`

Direct links to each frame, for Cursor to pull design context from via the Figma MCP connection instead of re-deriving specs from this doc alone (this doc may drift from the live file — the Figma links are the source of truth):

| Frame | Link |
|---|---|
| Foundations (Stage 1) | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=2-3&m=dev |
| FFIE Components (Stage 2) | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=2-4&m=dev |
| Generic Components (Stage 2) | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=2-5&m=dev |
| 1. Create Flow — Entry | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-7&m=dev |
| 2. Create Flow — Orientation | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-101&m=dev |
| 3. Create Flow — Exploration | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-2237&m=dev |
| 4. Create Flow — Reflection | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-493&m=dev |
| 5. Create Flow — Creation | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-685&m=dev |
| 6. Create Flow — Future Output | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-2426&m=dev |
| 7. Create Flow — Discovery of Other Futures | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-1092&m=dev |
| Cards (Oracle Draw component) | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-1242&m=dev |
| Matrix (Critical Feminist Matrix) | https://www.figma.com/design/ZlRS5gn3IONRKahUZCVcOG/FFIE-Design-System?node-id=3-2689&m=dev |

Note: two additional links Amanda shared (`node-id=3-1240`, `node-id=3-1241`) point to a small duplicate text layer reading "2. Create Flow," not a distinct frame — likely an accidental extra selection, already covered by the "2. Create Flow — Orientation" link above. Safe to skip when implementing.

---

## Naming note (cross-reference)

Canonical quadrant name is **"Feminist Preferable Future"** — never "Preferred." See `ffie_narrative_cards.md` for the full note on why "Preferred" appears once in the Chapter 6 thesis draft (a wording slip, not a naming change). The app's internal database enum key `feminist_preferred` was deliberately left unchanged for DB compatibility; only user-facing copy and the Figma file use "Preferable."
