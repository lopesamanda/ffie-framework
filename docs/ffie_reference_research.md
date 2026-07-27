# FFIE — Reference Research & Design Principles
Product/UX analysis of comparable digital products, not a visual moodboard. No implementation decisions — grounding for the Cursor build.

---

## Card-based methodologies

### The Oracle for Transfeminist Technologies — Coding Rights & Design Justice Network
[transfeministech.codingrights.org](https://transfeministech.codingrights.org/) · [about](https://transfeministech.codingrights.org/about)

**This is the single closest existing precedent to FFIE's Card Oracle concept, and it is directly in FFIE's academic lineage** — Joana Varon (Coding Rights) is cited extensively in the thesis (the transfeminist AI framework in Chapter 3, Varon & Peña 2021/2022). This isn't incidental proximity, it's the same intellectual tradition.

- **What the user is trying to do:** collectively imagine a transfeminist technology using a tarot-like card deck as a generative constraint.
- **Navigation:** a thin, single-page site — "the oracle / from the future / from the past / donate / resources / about the project." No app-like structure at all.
- **Methodology → digital interaction:** four card types (Values, Object, Bodies & Territories, Situations) shown as decks on the homepage; the instructions ("I remind you of who you are. I offer you an object... embedded with the two values I grant you... addressing the given situation") are voiced as if the Oracle itself is speaking — a strong tone device.
- **How users create/explore:** creation happens almost entirely off-platform — the site instructs people to email their idea or bring the deck to a workshop. "Images from the Future" is a curated gallery, but it is populated manually by the Coding Rights team from submissions and past workshops, not an automatic live feed.
- **How outputs are represented:** static images from prior workshops, presented as a finished gallery, not as an evolving, timestamped collection.
- **What FFIE could learn:** the four-part combinatorial card structure (a role-card, a value-card, an object-card, a situation-card) is a genuinely elegant, low-friction generative mechanic — it produces a specific creative prompt from very few inputs, which is exactly the shape the Card Oracle concept needs. The oracle's own voice as narrator (speaking in first person, "I offer you...") is a strong, replicable tone device for FFIE's card-drawing moment.
- **What FFIE should avoid copying:** the manual, email-based submission-and-curation pipeline. It works for a small activist org running occasional workshops, but it is the opposite of what FFIE needs — a live, always-current Future Commons. Also avoid the site's very thin information architecture (effectively one page); it works because the project is narrow in scope, but FFIE needs to hold a research case study, a matrix, and two distinct content types, which requires real navigation.
- **Direct recommendation:** cite this project explicitly on FFIE's About/methodology page as a kindred project in the same tradition, not as a coincidence to obscure. Given Varon is already cited in the dissertation, this strengthens academic credibility rather than exposing FFIE to a "this looks copied" risk.

### The Thing From The Future — Situation Lab (Stuart Candy & Jeff Watson)
[situationlab.org](https://situationlab.org/futurething-print-and-play-edition/)

- **What the user is trying to do:** collaboratively describe an object from an alternative future, for fun and for futures-literacy training.
- **Navigation:** primarily a physical card game (108 cards); the digital presence is a downloadable print-and-play PDF, not an interactive web product.
- **Methodology → interaction:** four card types — **Arc** (a macro-trajectory: Grow, Collapse, Discipline, Transform), **Terrain** (a context/topic), **Object** (a basic form), **Mood** (an emotional register). Drawing one of each generates a prompt like "Describe an object of Transform, in the Terrain of Work, that takes the form of a Ritual, evoking Wonder."
- **How outputs are represented:** verbal/written descriptions read aloud in a group; no persistent digital artifact by default.
- **What FFIE could learn:** the four-axis combinatorial structure (trajectory × context × form × tone) is one of the cleanest "constraint generates creativity" patterns in the whole futures field — worth studying as an alternative or complementary structure to Coding Rights' four-deck model for how the Card Oracle's own draw mechanic could be organized.
- **What FFIE should avoid copying:** it's built for synchronous group play with a facilitator prompting discussion; a literal digital port for a solo visitor would lose most of its energy, since the "coming up with the description" step depends on social performance and laughter, not solitary reflection.

---

## Interactive frameworks & foresight tools

### The Circular Design Guide — Ellen MacArthur Foundation × IDEO
[circulardesignguide.com](https://www.circulardesignguide.com/)

- **What the user is trying to do:** apply a design methodology (circular economy principles) to their own project.
- **Navigation:** organized by process stage (Understand, Define, Make, Release) — each stage links to concrete methods, each method is a standalone downloadable worksheet/PDF.
- **Methodology → interaction:** the framework itself stays exactly as documented; the "interaction" is browsing and selecting which method to apply, then doing the actual work offline.
- **What FFIE could learn:** organizing content by the actual phase names of the method (rather than generic "resources") makes the methodology itself the navigation structure — worth considering for how About FFIE presents the 5 phases.
- **What FFIE should avoid copying:** this is fundamentally a **document library**, not an experience — nothing is produced or shared inside the tool itself, no sense of a living community. If FFIE's About page structure borrows this pattern, it must not let it bleed into Explore/Create, which need to feel like a product, not a PDF repository.

### 2050 Pathways Calculator — UK Department of Energy and Climate Change
- **What the user is trying to do:** build a plausible national emissions scenario by adjusting real levers (transport, heating, industry) and see the consequence.
- **Navigation:** a single interactive dashboard — sliders/levers on one side, a resulting chart on the other, updating live.
- **Methodology → interaction:** a genuinely rare example of a complex expert model (energy systems modeling) made directly manipulable by a lay user, with real scientific data underneath, at national government scale (used with 10,000+ members of the public).
- **What FFIE could learn:** immediate visual feedback tied to a small number of concrete choices is extremely effective at making an abstract systemic model feel tangible. This validates the "Go Deeper" builder's instinct to let a visitor's choices (values selected, tensions drawn) visibly shape a rendered result, rather than collecting inputs into a form that only resolves at the very end.
- **What FFIE should avoid copying:** it's a quantitative, deterministic simulation — sliders producing a "correct" projected outcome. FFIE's matrix explicitly rejects that framing (there is no correct future, no optimized outcome), so the lever-and-instant-graph pattern must be adapted, not copied outright — placement should feel like interpretation, not calculation.

### IFTF Foresight Engine
[iftf.org/foresightengine](https://www.iftf.org/foresightengine/)

- **What the user is trying to do:** contribute short forecasts/ideas into a shared, time-boxed collective forecasting game, seeded by short immersive videos.
- **Navigation:** a live dashboard showing cards already played by the community, so new participants see the field before contributing.
- **What FFIE could learn:** "see what the community has already played before you play" is exactly the Explore-before-Create sequencing already planned — this is a second independent confirmation of that ordering, from a very different kind of organization (institutional foresight practice vs. activist card oracle).
- **What FFIE should avoid copying:** it's built for short, time-boxed campaigns around a single prompt (days, not an ongoing open platform) — FFIE's Future Commons is meant to be persistent and slow-growing, not campaign-shaped.

---

## Narrative-based / research-to-interactive-website experiences

### Dr. Cecilia Baldoni's academic website — "Shrews" research page
[cecibaldoni.github.io](https://cecibaldoni.github.io/) — 2025 Best Interactive Academic Website award

- **What the user is trying to do:** understand a specific research finding (about shrews) without reading the paper.
- **Navigation:** a "city-like" illustrated navigation on the homepage (noted specifically by contest judges) rather than a conventional menu; the Shrews page uses scroll to progressively reveal the research narrative.
- **Methodology → interaction:** the scroll reveals actual findings step by step — this is the difference between scrollytelling as decoration and scrollytelling as the actual explanatory mechanism.
- **What FFIE could learn:** this is direct proof that a doctoral researcher's specific empirical finding can be made genuinely engaging through scroll-based interaction without trivializing the content — relevant to how About FFIE (or a "the research" deep-dive) presents the Use-Distrust Paradox or the FSSF/CLA apparatus.
- **What FFIE should avoid copying:** a personal academic website's playful, illustrated tone (a "city" metaphor for navigation) may undersell the critical, sometimes uncomfortable register FFIE needs to hold — cute wayfinding metaphors can flatten content about surveillance, extraction, and structural power.

---

## Digital archives of speculative artifacts

### TBD Catalog — Near Future Laboratory
[tbdcatalog.com](https://tbdcatalog.com/) / [nearfuturelaboratory.com/projects/en/tbd-catalog](https://nearfuturelaboratory.com/projects/en/tbd-catalog/)

- **What the user is trying to do:** browse a fictional product catalog (styled after SkyMall) populated with critical-design objects from a near future shaped by Silicon Valley excess.
- **What FFIE could learn:** the catalog/product format itself is a strong, legible container for critical design objects — closer to how FFIE's Future Commons "grid view" should probably feel (a catalog of artifacts with their own name, function, and price-of-use) than a plain data table.
- **What FFIE should avoid copying:** TBD Catalog's satire is broad and comedic; FFIE's artifacts (INSIDER, OPEN HUMAN) need to hold discomfort without collapsing into satire, since they're grounded in real interview testimony about gendered and racialized harm — the tone has to stay closer to critical design than to parody.

---

## Collaborative future libraries & participatory design tools

### Futurescaper — structured crowdsourcing platform
[futurescaper.com/crowd](https://www.futurescaper.com/crowd)

- **What the user is trying to do:** as an organization, gather open-ended views from many stakeholders on a shared question and turn them into a navigable map of issues, causes, and disagreement — used by bodies like the UK Government's Horizons foresight team.
- **Navigation:** a three-step pipeline (create a survey → engage respondents → interpret responses as visual maps), not a browsable public product — it's B2B software for running a structured-crowdsourcing project, not a destination site.
- **Methodology → interaction:** the key move is starting from respondents' own open-ended language rather than a fixed multiple-choice instrument, then algorithmically clustering that language into a map — "the questions that drive understanding" emerge from the crowd, not from the researcher upfront.
- **What FFIE could learn:** this is a useful contrast case for the Reposition mechanic in Research Findings — Futurescaper shows that aggregate visitor input can be turned into genuinely analytical visualizations (areas of agreement/disagreement), not just decorative dots. If FFIE ever builds the v2 heatmap for Reposition data, this is the right category of precedent to study, not a generic analytics dashboard.
- **What FFIE should avoid copying:** it's explicitly a tool *for organizations running a project*, not a public-facing experience — there's no equivalent of "explore what's already there" for a casual visitor. Adopting its backend logic (clustering open text) without its closed, client-driven framing is the right takeaway, not the product shape itself.

### Extrapolation Factory — Operator's Manual
[extrapolationfactory.com](https://extrapolationfactory.com/about)

- **What the user is trying to do (in the original method):** in a workshop, browse a database of real forecasts, categorize them by impact lens (social, technological, economic, political, ecological), extrapolate one into a "day-in-the-life" story, then imagine a physical artifact from that story — a close structural cousin of FFIE's own Embody→Materialize sequence.
- **Navigation:** the website itself is a project portfolio and a published methods manual (available as a physical/PDF "Operator's Manual"), not an interactive tool — the methodology lives in a book, not in software.
- **What FFIE could learn:** the five impact-lens categorization (social/technological/economic/political/ecological) is a clean, reusable way to let someone tag *why* a given tension matters before building a persona around it — worth considering as lightweight metadata on Narrative Cards, distinct from and complementary to the existing Themes filter.
- **What FFIE should avoid copying:** publishing the method as a static manual is the one thing FFIE should explicitly not do — it is precisely the "explain the framework" trap named at the start of this project. Extrapolation Factory is a legitimate and respected practice, but its own web presence is not evidence that a manual-style site is the right shape for FFIE.

## Narrative-based data storytelling

### The Pudding — climate/data narrative essays
[pudding.cool](https://pudding.cool/)

- **What the user is trying to do:** understand a complex, often abstract data-driven question (e.g., "what does climate change feel like," "how will your city's climate shift in 50 years") through a scroll-paced visual essay.
- **Methodology → interaction:** real datasets drive every visual change; the scroll position is tied directly to a specific data transformation, not to arbitrary motion design.
- **What FFIE could learn:** this is the sharpest available model for how the About FFIE page should present the actual empirical backbone (the Use-Distrust Paradox, the 89/73/81/132 coded response counts, the FSSF/CLA apparatus) as something scroll-navigable and legible to a lay reader, instead of a static academic summary.
- **What FFIE should avoid copying:** The Pudding's pieces are single-sitting, one-off essays with no return mechanic — useful for About FFIE's one-time explanatory content, but not a model for Explore Futures or Future Commons, which need to support repeat visits and an evolving dataset, not a fixed, finished narrative.

---

## What this research confirms about decisions already made

- **Explore-before-Create, with a visible existing field before any prompt to contribute** — independently confirmed by IFTF's Foresight Engine and the Oracle's "Images from the Future" gallery.
- **Structural separation between validated/official data and crowd contributions** — no reviewed tool blends institutional forecasts and public submissions in one undifferentiated view (Futurescaper and IFTF both keep facilitator-curated content visually distinct from raw public input).
- **A small number of concrete, combinable inputs beats an open blank page** — validated independently by both card-based precedents (Coding Rights' 4 decks, Situation Lab's 4 card types) and the 2050 Calculator's lever model. Strong validation for the Card Oracle direction over a blank-page "describe your future" field.

---

## Five design principles for FFIE

1. **Show the material before asking for commitment.** Both the Oracle and IFTF's Foresight Engine put the actual cards, or the actual community field, in front of a visitor before any "start" action — curiosity and trust come from seeing the real thing, not from a marketing explainer about it.

2. **A live, always-current collection is the actual product — don't quietly settle for a manually curated one.** The Oracle's biggest practical weakness is that its "Images from the Future" gallery depends on someone at Coding Rights emailing submissions in by hand. FFIE's entire premise ("see other futures being created") only holds if the Future Commons updates automatically as moderation approves entries.

3. **Constrain to a small number of combinable levers, not a blank page.** Every strong precedent here (Oracle's four decks, Thing From The Future's four card types, the 2050 Calculator's lever set) produces better output from a handful of concrete, combinable inputs than from open-ended prompts — the strongest available evidence for the Card Oracle's draw-and-combine mechanic over a free-text "describe your future" field.

4. **Never blend validated and crowd-sourced content in the same undifferentiated view.** No credible foresight tool reviewed here does this — confirms the Research Findings / Future Commons split as directionally correct, not over-engineering.

5. **Interactivity has to carry the actual content, not decorate it.** Cecilia Baldoni's Shrews page and With Company's case studies both use scroll/motion to reveal real findings progressively; TBD Catalog's format works because the catalog structure *is* the critical device, not garnish on top of it. Any animation or transition in the FFIE build should be justified by what it reveals, not by how it looks.

6. **Hold discomfort; resist the pull toward either whimsy or satire.** TBD Catalog's comedic tone and the "city" navigation metaphor on an otherwise excellent academic site are both examples of register choices that would flatten FFIE's actual content — real interview testimony about gendered, racialized, and colonial harm. The tone has to stay closer to critical design than to either parody or cuteness.

7. **Name your lineage.** The Oracle for Transfeminist Technologies is close enough to FFIE's Card Oracle concept, and close enough in intellectual lineage (Varon is already cited in the dissertation), that About FFIE should cite it explicitly as a kindred project. This is both the academically honest move and the one that most strengthens FFIE's credibility — it places FFIE inside a real tradition of feminist speculative tools rather than appearing to have invented the format in isolation.
