# FFIE Narrative Cards — Full Deck
Source: official FFIE Narrative Cards catalogue (2026). This corrects and completes earlier docs, which only had the 6 AI Risk cards extracted from thesis Chapter 5 prose.

**Structural correction:** the deck is **19 cards in two registers**, not "18 cards in four categories" as earlier docs said. Update that figure everywhere it appears (`ffie_product_ux_foundations.md`, `FFIE_product_brief.md`).

- **Tension Cards** (11) — the problem-facing register: AI Risks (6, including the transversal Environmental Impact card) + Ecosystem Barriers (5)
- **Potential Cards** (8) — the generative counter-register: AI Benefits (4) + Trust in AI (4)

**Product implication — corrected with the actual thesis mechanic.** Chapter 5 (5.2.2.2, Problem-Framing) states the real workshop draw exactly: *"Each of the four working groups received a combination of five cards: one AI Benefit card, one AI Risk card, one Innovation Ecosystem Barrier card, and one AI Trust card"* — assigned randomly by the facilitator — *"every group was additionally asked to consider [the Transversal Environmental Impact card]... applied uniformly across all groups."*

This replaces my earlier guess ("draw one Tension Card + one Potential Card"). The faithful mechanic is: **draw exactly one card from each of the four categories (Risk, Benefit, Trust, Barrier) — four cards total — with the Environmental Impact transversal card always present in every session, not drawn, applied as a fixed lens.** This is more specific and more authentic than a two-register draw, and it's literally what happened in both validated workshops. Update `ffie_mvp_journey.md`'s Reflection stage to this mechanic.

---

## Tension Cards (11)

### AI Risks (6)
| Card | Description | Tension |
|---|---|---|
| Digital Monoculture | The logic of scalability eliminates cultural, social, and biological diversity. | Efficiency vs. plurality |
| Amplification of Historical Biases | Racism, sexism, and transphobia are reproduced by historical data. | Automation of injustice |
| Cognitive Atrophy | Over-reliance leads to the loss of critical thinking and intellectual autonomy. | Convenience vs. education/development |
| Digital Violence and Deepfakes | Women and children as the primary targets of technological abuse. | Innovation without protection |
| Power Concentration in the Global North | Data, narratives, and values concentrated within a few Big Tech corporations. | Digital colonialism |
| Environmental Impact *(transversal — not discussed in isolation; revisits the other five through the lens of material/ecological cost)* | AI infrastructures consume energy, water, and critical minerals, often displacing environmental impacts onto peripheral territories and historically exploited populations. | Innovation vs. extraction |

### Ecosystem Barriers (5)
Chapter 5's Table 31 doesn't include a description column like the other three tables (only data-convergence and derivation-logic columns) — descriptions below are synthesized from the surrounding paragraph text, not verbatim quotes.

| Card | Description | Tension |
|---|---|---|
| The Boys' Club Networking | Access to opportunity and information flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy. | Structural access restriction (apparent meritocracy) |
| The Motherhood Penalty | Caregiving responsibilities are structurally penalized through wage gaps, leadership exclusion, and constrained career mobility. | Care as career cost |
| Symbolic and Real Violence | Domination operates through everyday, often-denied mechanisms embedded in professional environments that present themselves as neutral. | Embodied harm in professional spaces (stay or resist) |
| DEI Backlash | Diversity and inclusion initiatives are rolled back when capitalist logic treats them as a cost rather than a structural commitment. | Capitalism vs. structural equity (diversity as luxury) |
| Exclusion of Trans and Non-Binary People | A material double bind between being recognized and being safe, documented specifically through Brazilian trans and non-binary participants' accounts. | Survival vs. authenticity |

---

## Potential Cards (8)

### AI Benefits (4)
| Card | Description | Tension |
|---|---|---|
| AI as Performance Amplifier | AI increases productivity, accelerates decision-making, and expands the capabilities of those who already possess technical and cognitive capital. | Amplification of existing privileges |
| AI as Cognitive Support Network | AI acts as an organizer, reviewer, and mental load reducer, particularly for women. | Protection vs. expansion of responsibilities |
| AI as Leveling Tool | When used intentionally, it can accelerate the learning curve for underrepresented groups. | Democratization conditioned upon access and literacy |
| AI as Accessibility Infrastructure | Translation, transcription, support for neurodivergence, and linguistic inclusion. | Inclusion is not automatic; it depends on ethical design |

### Trust in AI (4)
| Card | Description | Tension |
|---|---|---|
| Instrumental Trust | Trust based on utility and results. | It works, therefore I trust it |
| Conditional Trust | Trust mediated by control, human oversight, and clear boundaries. | Necessary but uncomfortable use |
| Systemic Mistrust | The issue is not the tool itself, but the creators, the data, and the underlying interests. | Invisible power |
| Neutrality as a Myth | Algorithms reflect human values and social structures. | Mathematics does not equal justice |

---

## Critical Feminist Matrix — final, corrected reference

**Horizontal axis — System Logic: Extractive ↔ Emancipatory**
- Extractive: "It intensifies productivity, displaces costs, and maintains structural inequalities."
- Emancipatory: "Technology reconfigures the rules of the game. It redistributes power, time, care, and opportunities."

**Vertical axis — Power Organization: Hierarchical ↔ Collective Care**
- Hierarchical: "Decision-making is concentrated, success is measured through single metrics, and control is centralized."
- Collective Care: "Interdependence is acknowledged, care is treated as infrastructure, and responsibility is distributed."

**Quadrants** (names confirmed twice now — matrix poster + toolkit document both agree):
- **Q1 — Naïve Techno-Optimist Future** (Extractive × Collective Care): AI for good without redistribution. Diversity as branding.
- **Q2 — Feminist Preferable Future** (Emancipatory × Collective Care): AI as care infrastructure. Power redistributed to historically marginalized subjects.
- **Q3 — Dominant Dystopian Future** (Extractive × Hierarchical): Automation of control. Bias amplified. Data and capital concentrated.
- **Q4 — Fragmented or Precarious Future** (Emancipatory × Hierarchical): Point-of-need innovation without systemic justice. Individual heroism required.

Note: the toolkit document's quadrant descriptions are slightly longer/different in wording than the matrix poster's — both are given here where they diverge; treat as equivalent, not contradictory.

---

## Card visual design for the digital product — recommendation

Agree with not replicating the physical deck's illustrated tarot-style portraits. Three reasons:

1. **Direct conflict with an already-established rule.** `ffie_product_ux_foundations.md` says explicitly: avoid generic AI-generated portraits, use typography and contextual metadata instead. The physical deck's illustrations are lovely as print objects, but reusing them as literal card art in the web product reintroduces exactly the "generic AI aesthetics" the design system brief says to avoid.
2. **Style clash.** The illustrated, ornate, tarot-adjacent artwork is a different visual language than the clean geometric/editorial system being built in Figma Make (poster-derived typography, thin rules, diagonal sequence lines). Sitting the two side by side would read as two different products.
3. **What's actually worth carrying over is the category color-coding — it's already a proven, legible system**, and reusing it keeps the physical toolkit submission and the digital product visually related without requiring the illustration.

**Category colors observed in the physical deck** (Figma Make should sample these precisely from the images, this is an approximate read):
- AI Risks: warm red/rust/terracotta
- Ecosystem Barriers: magenta/deep pink
- AI Benefits: amber/gold/ochre
- Trust in AI: deep indigo/midnight blue
- Environmental Impact (transversal): green — deliberately breaks from the Risk category's red family, signaling its cross-cutting status

**Recommendation for the Figma Make prompt (add to Stage 2 — Components):** design the digital Narrative Card as a flat, typographic card face, not an illustrated one — category color as a top accent bar or subtle background tint (tied to the `color.category.*` tokens), card name in the system's display/heading type, the tension line set in the italic/secondary style the physical deck already uses for tension text (that part of the physical deck is typographic, not illustrated, so it already fits the digital system), and a simple linear/geometric icon per category from the iconography direction (section 7) instead of a portrait. Preserve the transversal card's color break (green vs. the red family) as a deliberate exception, same logic as the monochromatic-plus-semantic-exception rule already defined for the broader color system.
