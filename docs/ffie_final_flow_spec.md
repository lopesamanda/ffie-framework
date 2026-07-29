# FFIE — Final Flow Spec (all screen copy, post-adjustments)

Reflects: Narrative reinstated as 6th artifact type; subformat filtering kept simple (top-level type only, "Show all" as escape valve); 3-moment progressive Embody reveal; artifact flow reordered (Type+Name → Problem → Power/Capability → Visual → Values → Weakness); final card layout (Matrix left / Card middle / "How can you work with this future?" right / Next Steps below).

---

## EMBODY

### 1. Dedication / Role + Context (unchanged)
Name, age, pronoun, race/ethnicity, ecosystem role — chip-select.

### 2. Sector
"Their sector in this ecosystem is…" — chip-select: Finance, Healthtech, Edtech, Agritech, Climate/Cleantech, Mobility, Media, Retail, Public Sector, Innovation, Deeptech, Other (free text, same behavior as Role's Other).

"They speak from" — placeholder: "city, country, or context"

### 3. BUILD {POSSESSIVE} STORY (progressive reveal — one field at a time, not a form)
Header: **BUILD {POSSESSIVE} STORY** → "BUILD HIS STORY" / "BUILD HER STORY" / "BUILD THEIR STORY"
Subhead: "A future is not only about what technology makes possible. It is also about what changes along the way."

**01 — WHAT {PRONOUN} GAIN(S)**
"Ten years from now, Artificial Intelligence (AI) changed the way {pronoun} could [ability improved by AI]."
placeholder: "ability improved by AI"

**02 — WHAT CHANGES**
"But it also changed the way {pronoun} [habit that AI changed]."
placeholder: "habit that AI changed"

**03 — WHAT {PRONOUN} HOPE(S) FOR**
"Yet in {possessive} work as a {role}, {pronoun} still hold(s) on to the hope that [desire for the future]."
placeholder: "desire for the future"

All three fully pronoun-driven — header, section labels, and every verb form ({pronoun} could / {pronoun} gain vs. gains / {pronoun} hold vs. holds) resolve from the persona's he/she/they, same agreement logic already fixed elsewhere in the flow.

### 4. Fear-mapping
Shows Risk + Barrier + Environmental reference cards (all three).
"You said [pronoun] fears Artificial Intelligence will [___]"
placeholder: "fear related to AI"

---

## ARTIFACT — Give it a body

### Step 1 — Type
"You imagined a future where… [context from previous steps]. Now, give that future something tangible. What kind of artifact exists in this future?"

| Type | Description | Subformats |
|---|---|---|
| **Object** | Something they touch or wear, a physical or everyday thing | Wearable · Hardware |
| **App/Platform** | Something they use online, a way people interact with a system | Platform · Voice interface · App interface · Chatbot |
| **Agent** | Something that acts on their behalf, making decisions or taking actions in the world without them needing to ask each time | Digital assistant · Autonomous agent · Human-in-the-Loop |
| **Service** | Something they experience as a service | Physical space · Community hub · Event |
| **Policy** | A rule, law, or institutional mechanism | Official document · Certification · Public notice · Contract |
| **Narrative** *(reinstated)* | Something that shapes a story, a myth, or a public narrative about the future | Campaign · Social Media · Ads · Audiovisual piece |

Changes from previous version: Chatbot moved from Agent to App/Platform (it's a conversational interface, not an autonomous actor). Agent's "Chatbot" slot is replaced with **Autonomous agent** — maps to the agent-only capability "Autonomous Planning & Execution" (breaks down a goal and acts on it, adapting as it goes, vs. an assistant that responds to requests).

**"Human" renamed to "Human-in-the-Loop"** — "Human" alone was ambiguous (managed by the AI? evaluating it? both?). "Human-in-the-Loop" is the actual established term for exactly this — a person embedded inside an automated process, whether being directed/scored by it (gig dispatch, algorithmic scheduling) or quietly correcting/polishing its output (labeling, moderation, "ghost work"). Both readings you were reaching for with "intermediator," "evaluator," and "polisher" are real, documented versions of this one category, so one term covers it without picking a side.

Narrative overlap resolved: kept only **Audiovisual piece**, dropped "Docuseries or media piece."

*(Subformat choice does not change which capabilities are pre-highlighted in Step 4 — only top-level Type does, per your last decision. "Show all capabilities" always available.)*

**Capability re-mapping given these changes** (top-level Type defaults only):
- **Agent** — add **Real-Time Monitoring** and the new **Algorithmic Management & Human Oversight** (below) to the default set. Both are directly relevant now that Human-in-the-Loop is a named subformat.
- **Service** — add **Real-Time Monitoring** to the default set. "Event" (crowd/safety/engagement tracking) needs it; it wasn't included when the only subformats were Physical space/Human+AI interaction/Community hub.
- **Narrative** — add **Data Classification & Clustering** to the default set. "Ads" and "Social Media" both rely on audience segmentation, which Personalization & Recommendation only partly covers.

### New 16th capability card — Algorithmic Management & Human Oversight

Cluster: **Acting & Automating** (alongside Automation & Task Delegation, Code Generation & Automation, Autonomous Planning & Execution, Negotiation & Transacting). Agent-only, same rule as cards 11–13 (Autonomous Planning & Execution, Negotiation & Transacting, Persistent Memory & Behavioral Modeling) — surfaces only when `artifact_type` is agent.

**Description:** Assigns, directs, scores, or corrects human work in real time — sometimes managing a person's labor, sometimes having a person quietly fix or approve what the AI produced.
**Tags:** Algorithmic Management · Human-in-the-Loop · Labor Oversight
**Examples:**
- A delivery app that routes, times, and rates a courier's every stop, with no manager ever reviewing the score before it affects her pay
- A content platform that pays workers by the post to label or "clean up" what the AI got wrong, without crediting or naming them anywhere in the product

Grounded in two well-documented real phenomena: algorithmic management in gig-economy platforms (courier/driver dispatch and scoring) and "ghost work" — the largely invisible human labeling/moderation labor that keeps AI systems running (Gray & Suri's term for it). This is what Digital assistant/Autonomous agent leave uncovered, and it's the direct reason Human-in-the-Loop needed its own capability rather than folding into Automation & Task Delegation's existing example.

### Steps 2–4 — one combined screen, progressive reveal
Same story-building pattern as Embody's "Build [Possessive] Story": all three questions live on a single screen, but only Name is visible at first. Problem/tension appears once Name is filled; Power + Capability appears once Problem/tension is filled. Nothing is shown as a flat form up front.

**2a — Name**
"Give it a name. What is this artifact called?"
placeholder: "artifact name"

**2b — Place it in the world** *(appears after Name is filled)*
"You said [pronoun] fears Artificial Intelligence will {fearAnswer}. {artifactName}, [pronoun] {artifactType} in the {sector} sector — what problem or tension does it respond to, or make worse?"
placeholder: "problem it solves or worsens"

**2c — Power + Capability** *(appears after Problem/tension is filled)*
"What power does AI hold through this artifact? Consider the values shaping this future."

Four clusters always shown (nothing hidden at this level):
- Power to Know *(Understanding People)*
- Power to Speak & Make *(Communicating & Creating)*
- Power to Act *(Acting & Automating)*
- Power to Watch *(Tracking & Verifying)*

Within each cluster, capabilities pre-highlighted by selected Type (per the existing artifact-type relevance table, now including Narrative). "Show all capabilities" reveals the rest. Selecting a card expands it in place → guiding micro-questions → then inline:

"What does {artifactName} do, day to day?"
placeholder: "what it does day to day"

Optional: "If {artifactName} had a pitch line…"
placeholder: "a one-line pitch (optional)"

### Step 5 — Visual direction
"Choose a visual direction."
6 images (1 per Type + Other/Emergent) — see `ffie_type_visuals_manus_prompt.md`. Defaults to showing the image matching selected Type first; all 6 browsable.

### Step 6 — Embedded values
"Which values shape {artifactName}?"
Chip-select: Efficiency, Care, Control, Inclusion, Productivity, Competition, Cooperation, Other (free text).

### Step 7 — Weakness
"Which of these values, if it went too far, would reveal {artifactName}'s shadow side?"
→ value-anchored select-from-menu (2-3 pre-written outcomes per value + "Other — write your own")
Completion sentence: "Every value has a shadow side. If {value} in {artifactName} went too far, it would {selectedOrWrittenOutcome}."

---

## FUTURE — final reveal

Entry: pulsing dot on Matrix → click → bloom/expand + time-travel transition (year ticking 2026→2036).

**Layout:** Matrix (left) · Future card (middle) · "How can you work with this future?" (right) · Next Steps (smaller, below).

**Card content, top to bottom:**
- Quadrant badge + "View Matrix" link + sector tag
- Persona name (primary heading), age · role · sector/location metadata
- Narrative paragraph (two short beats, no repetition of Goal/Weakness text):
  "{name} feared Artificial Intelligence would {fearAnswer}. Ten years on, it changed the way [pronoun] could {abilityImproved} — but it also changed the way [pronoun] {habitChanged}."
  "[PronounCap] still holds on to the hope that {desireForFuture}. {artifactName} exists to {problemTensionAnswer}."
- Synthesis sentence: "Here, {benefitName} — but underneath, {riskName} meets {barrierName}, and trust in it is {trustName}: {trustTension}." + "Tensions inside this ecosystem: {benefitTension} · {riskTension} · {barrierTension}."
- Card-name tag row (final card only)
- Artifact name (secondary heading)
- **AI FUNCTION** box: capability name + its full description text (pulled directly from the AI Capability Card's Description field, not just the name)
- **ARTIFACT GOAL** box: day-to-day answer + optional Goal Pitch as smaller italic line
- **ARTIFACT WEAKNESS** box: value + outcome sentence
- Embedded values chips (hover/tap highlights connection to Weakness text)

**"How can you work with this future?"** (4 action cards):
- Backcast it — "What decisions made today would lead here? Use it to open a strategy conversation."
- Pre-mortem it — "Treat the Weakness as a risk you're designing against before it happens."
- Bring it to a workshop — "Print or project the card and have your team debate what they'd change in the roadmap to avoid or reach this future."
- Start a conversation — "Share it with a colleague and ask if any part of it feels familiar."

**Next Steps:** Bring it to life (scrolls to "Bring it to life (optional)" section: copy prompt / upload image) · Download this future (PNG one-pager incl. Matrix diagram + link/QR if published) · Publish to Future Commons. All three parallel, none gates the others.
