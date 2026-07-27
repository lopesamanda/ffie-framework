# FFIE Narrative Cards — Full Deck
Source: official FFIE Narrative Cards catalogue (2026). This corrects and completes earlier docs, which only had the 6 AI Risk cards extracted from thesis Chapter 5 prose.

**Structural correction:** the deck is **19 cards in two registers**, not "18 cards in four categories" as earlier docs said. Update that figure everywhere it appears (`ffie_product_ux_foundations.md`, `FFIE_product_brief.md`).

- **Tension Cards** (11) — the problem-facing register: AI Risks (6, including the transversal Environmental Impact card) + Ecosystem Barriers (5)
- **Potential Cards** (8) — the generative counter-register: AI Benefits (4) + Trust in AI (4)

**Product implication — corrected with the actual thesis mechanic.** Chapter 5 (5.2.2.2, Problem-Framing) states the real workshop draw exactly: *"Each of the four working groups received a combination of five cards: one AI Benefit card, one AI Risk card, one Innovation Ecosystem Barrier card, and one AI Trust card"* — assigned randomly by the facilitator — *"every group was additionally asked to consider [the Transversal Environmental Impact card]... applied uniformly across all groups."*

This replaces my earlier guess ("draw one Tension Card + one Potential Card"). The faithful mechanic is: **draw exactly one card from each of the four categories (Risk, Benefit, Trust, Barrier) — four cards total — with the Environmental Impact transversal card always present in every session, not drawn, applied as a fixed lens.** This is more specific and more authentic than a two-register draw, and it's literally what happened in both validated workshops. Update `ffie_mvp_journey.md`'s Reflection stage to this mechanic.

**Revision note:** Examples and Reflection Question content is now in **English** (corrected from an earlier Portuguese draft — the site has no bilingual toggle yet, everything must ship in English). Both fields remain original UX-layer writing, not thesis quotes — flag any wording you want revised.

---

## Tension Cards (11)

### AI Risks (6)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| Digital Monoculture | The logic of scalability eliminates cultural, social, and biological diversity. | Efficiency vs. plurality | A translation app that only preserves the five most spoken languages, leaving hundreds of indigenous languages out of digital use · A recommendation algorithm that shows the same trend to everyone in a city, flattening local cultural expression | What gets lost when the same solution is applied to everyone, everywhere? |
| Amplification of Historical Biases | Racism, sexism, and transphobia are reproduced by historical data. | Automation of injustice | A hiring algorithm trained on a decade of resumes that penalizes candidates who list a "women's college" · A predictive policing tool that flags neighborhoods based on already-biased historical arrest data | Where did the data that trained this AI come from — and who did it leave out? |
| Cognitive Atrophy | Over-reliance leads to the loss of critical thinking and intellectual autonomy. | Convenience vs. education/development | A writing assistant so present in daily work that a team loses the habit of arguing on their own · A navigation app used so constantly that a person loses the ability to read a map without it | What did this person stop knowing how to do alone, since they started trusting this AI? |
| Digital Violence and Deepfakes | Women and children as the primary targets of technological abuse. | Innovation without protection | A deepfake video used to harass a public-facing woman with fabricated explicit content · An AI voice clone used to impersonate a child in a scam call to their parent | Who is most vulnerable to the violence this technology can cause, even if that isn't the intention behind its design? |
| Power Concentration in the Global North | Data, narratives, and values concentrated within a few Big Tech corporations. | Digital colonialism | An AI model trained almost entirely on English-language, North American data, then sold as neutral worldwide · A handful of companies owning the computing infrastructure every AI startup in the world depends on | Who owns the infrastructure behind this AI, and who only gets to use what's left over? |
| Environmental Impact *(transversal — not discussed in isolation; revisits the other five through the lens of material/ecological cost)* | AI infrastructures consume energy, water, and critical minerals, often displacing environmental impacts onto peripheral territories and historically exploited populations. | Innovation vs. extraction | A data center in a drought-prone region consuming millions of liters of water a year to cool AI servers · Rare earth mineral mining for AI hardware displacing communities in already-exploited territories | Where, physically, does the environmental cost of this artificial intelligence sit — and who pays that cost up close? |

### Ecosystem Barriers (5)
Chapter 5's Table 31 doesn't include a description column like the other three tables (only data-convergence and derivation-logic columns) — descriptions below are synthesized from the surrounding paragraph text, not verbatim quotes.

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| The Boys' Club Networking | Access to opportunity and information flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy. | Structural access restriction (apparent meritocracy) | A promotion decided over after-work drinks that only certain colleagues were invited to · A startup's investor introductions flowing only through an alumni network of a single gender | Who got this opportunity just because they knew the right person? |
| The Motherhood Penalty | Caregiving responsibilities are structurally penalized through wage gaps, leadership exclusion, and constrained career mobility. | Care as career cost | A performance review that scores a returning mother lower for "reduced availability" · A promotion pipeline that quietly excludes anyone who took extended caregiving leave | What did this person lose professionally because they cared for someone? |
| Symbolic and Real Violence | Domination operates through everyday, often-denied mechanisms embedded in professional environments that present themselves as neutral. | Embodied harm in professional spaces (stay or resist) | A meeting where a woman's idea is ignored until repeated minutes later by a male colleague, and credited to him · A dress code enforced more strictly on women's bodies, disguised as "professionalism" | What kind of harm has this person learned not to name, because it became "normal" in the environment where they work? |
| DEI Backlash | Diversity and inclusion initiatives are rolled back when capitalist logic treats them as a cost rather than a structural commitment. | Capitalism vs. structural equity (diversity as luxury) | A diversity program cut from the budget the first quarter revenue dips, while other departments stay untouched · A company quietly removing gender targets from its public reports after a change in leadership | What happened to this company's equity commitment once it stopped being convenient? |
| Exclusion of Trans and Non-Binary People | A material double bind between being recognized and being safe, documented specifically through Brazilian trans and non-binary participants' accounts. | Survival vs. authenticity | A workplace ID system with no option beyond binary gender markers, forcing a mismatch with a person's identity · A trans employee choosing between disclosing their identity and staying safe in a hostile environment | What does this person have to hide about themselves just to stay safe in this space? |

---

## Potential Cards (8)

### AI Benefits (4)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| AI as Performance Amplifier | AI increases productivity, accelerates decision-making, and expands the capabilities of those who already possess technical and cognitive capital. | Amplification of existing privileges | A senior engineer using AI to ship in one afternoon what used to take a week, widening the gap with junior peers · A well-resourced team using AI tools a smaller, underfunded team can't afford | Who was already ahead, and got even further ahead, with this tool? |
| AI as Cognitive Support Network | AI acts as an organizer, reviewer, and mental load reducer, particularly for women. | Protection vs. expansion of responsibilities | A working mother using an AI assistant to manage her household's schedule, medical appointments, and school deadlines in one place · An AI tool that drafts routine emails, freeing up hours previously spent on invisible administrative labor | What mental load did this tool lift off someone's shoulders — and does that change something structural, or just relieve it on the surface? |
| AI as Leveling Tool | When used intentionally, it can accelerate the learning curve for underrepresented groups. | Democratization conditioned upon access and literacy | A free AI tutor helping a first-generation university student catch up on a foundation they never had access to before · An AI translation tool letting a non-native speaker apply for jobs previously out of reach because of language | What can this person do now that they couldn't before — and what's still missing for that access to be truly guaranteed? |
| AI as Accessibility Infrastructure | Translation, transcription, support for neurodivergence, and linguistic inclusion. | Inclusion is not automatic; it depends on ethical design | A screen-reading AI letting a blind user navigate a website independently for the first time · A real-time captioning tool letting a deaf employee follow a meeting without needing a human interpreter every time | What barrier does this technology actually remove, and what barrier does it just disguise? |

### Trust in AI (4)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| Instrumental Trust | Trust based on utility and results. | It works, therefore I trust it | Someone who doesn't fully understand how a diagnostic tool works, but trusts it because it's been right before · A team adopting an AI scheduling tool just because it saves time, without auditing how it decides | Does this person trust the tool, or just trust the result — and is that the same thing? |
| Conditional Trust | Trust mediated by control, human oversight, and clear boundaries. | Necessary but uncomfortable use | A doctor using an AI diagnostic tool only as a second opinion, never as the final word · A manager reviewing every decision an AI hiring tool makes before it goes any further | What limit did this person set to keep trusting it — and what would happen if that limit were removed? |
| Systemic Mistrust | The issue is not the tool itself, but the creators, the data, and the underlying interests. | Invisible power | A community that doesn't trust a health AI, not because of the tool itself, but because of who built it and who profits from it · A worker who assumes any "productivity AI" introduced by management exists to justify layoffs | If this person doesn't trust it, is it the technology — or whoever is behind it? |
| Neutrality as a Myth | Algorithms reflect human values and social structures. | Mathematics does not equal justice | A hiring AI tool presented as "objective" that still reflects the biases of the resumes it was trained on · A content moderation algorithm marketed as neutral that systematically flags certain dialects as "toxic" | What values does this AI carry, even while being presented as neutral? |

---

## Critical Feminist Matrix — final, corrected reference

**Horizontal axis — System Logic: Extractive ↔ Emancipatory**
- Extractive: "It intensifies productivity, displaces costs, and maintains structural inequalities."
- Emancipatory: "Technology reconfigures the rules of the game. It redistributes power, time, care, and opportunities."

**Vertical axis — Power Organization: Hierarchical ↔ Collective Care**
- Hierarchical: "Decision-making is concentrated, success is measured through single metrics, and control is centralized."
- Collective Care: "Interdependence is acknowledged, care is treated as infrastructure, and responsibility is distributed."

**Quadrants** (names confirmed — matrix poster + toolkit document + Amanda's direct confirmation, 2026):
- **Q1 — Naïve Techno-Optimist Future** (Extractive × Collective Care): AI for good without redistribution. Diversity as branding.
- **Q2 — Feminist Preferable Future** (Emancipatory × Collective Care): AI as care infrastructure. Power redistributed to historically marginalized subjects.
- **Q3 — Dominant Dystopian Future** (Extractive × Hierarchical): Automation of control. Bias amplified. Data and capital concentrated.
- **Q4 — Fragmented or Precarious Future** (Emancipatory × Hierarchical): Point-of-need innovation without systemic justice. Individual heroism required.

Note: Chapter 6's synthesis prose refers to Q2 once as "Feminist Preferred Future" — this is a wording slip in that chapter draft, not a naming change. The confirmed canonical term across the poster, toolkit document, and Amanda's direct confirmation is **"Feminist Preferable Future."** Any product copy, code, or seed data should use "Preferable," never "Preferred."

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

**Cover state (for the Oracle Draw tarot-style motion component, added in Stage 3):** not an illustrated portrait either — an abstract graphic cover per card, built from the category color as the dominant field plus a simple geometric mark that echoes the card's specific meaning (not literal illustration). Card title stays hidden until reveal; category is visible on the cover.
