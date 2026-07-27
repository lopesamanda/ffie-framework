# FFIE Narrative Cards — Full Deck
Source: official FFIE Narrative Cards catalogue (2026). This corrects and completes earlier docs, which only had the 6 AI Risk cards extracted from thesis Chapter 5 prose.

**Structural correction:** the deck is **19 cards in two registers**, not "18 cards in four categories" as earlier docs said. Update that figure everywhere it appears (`ffie_product_ux_foundations.md`, `FFIE_product_brief.md`).

- **Tension Cards** (11) — the problem-facing register: AI Risks (6, including the transversal Environmental Impact card) + Ecosystem Barriers (5)
- **Potential Cards** (8) — the generative counter-register: AI Benefits (4) + Trust in AI (4)

**Product implication — corrected with the actual thesis mechanic.** Chapter 5 (5.2.2.2, Problem-Framing) states the real workshop draw exactly: *"Each of the four working groups received a combination of five cards: one AI Benefit card, one AI Risk card, one Innovation Ecosystem Barrier card, and one AI Trust card"* — assigned randomly by the facilitator — *"every group was additionally asked to consider [the Transversal Environmental Impact card]... applied uniformly across all groups."*

This replaces my earlier guess ("draw one Tension Card + one Potential Card"). The faithful mechanic is: **draw exactly one card from each of the four categories (Risk, Benefit, Trust, Barrier) — four cards total — with the Environmental Impact transversal card always present in every session, not drawn, applied as a fixed lens.** This is more specific and more authentic than a two-register draw, and it's literally what happened in both validated workshops. Update `ffie_mvp_journey.md`'s Reflection stage to this mechanic.

**Addition (this revision):** each card now includes **Examples** (2 concrete, illustrative real-world manifestations of the card's tension — original writing, not thesis quotes, meant to make an abstract concept tangible for a first-time user) and a **Reflection Question** (a single short question shown at the moment the card is revealed during the Oracle Draw, distinct from the two Likert questions used later to place the final artifact on the Critical Feminist Matrix). Both are new UX-layer content, not extracted from the thesis — flag any wording you want revised.

---

## Tension Cards (11)

### AI Risks (6)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| Digital Monoculture | The logic of scalability eliminates cultural, social, and biological diversity. | Efficiency vs. plurality | Um app de tradução que só preserva os cinco idiomas mais falados, deixando centenas de línguas indígenas fora do uso digital · Um algoritmo de recomendação que mostra a mesma tendência pra todo mundo numa cidade, achatando a expressão cultural local | O que se perde quando a mesma solução é aplicada a todo mundo, em todo lugar? |
| Amplification of Historical Biases | Racism, sexism, and transphobia are reproduced by historical data. | Automation of injustice | Um algoritmo de contratação treinado em currículos de uma década que penaliza quem lista "faculdade só para mulheres" · Uma ferramenta de policiamento preditivo que sinaliza bairros com base em dados históricos de prisão já enviesados | De onde vieram os dados que ensinaram essa IA — e quem eles deixaram de fora? |
| Cognitive Atrophy | Over-reliance leads to the loss of critical thinking and intellectual autonomy. | Convenience vs. education/development | Um assistente de escrita tão presente no trabalho diário que a equipe perde o hábito de argumentar sozinha · Um app de navegação usado com tanta frequência que a pessoa perde a capacidade de ler um mapa sem ele | O que essa pessoa deixou de saber fazer sozinha, desde que passou a confiar nessa IA? |
| Digital Violence and Deepfakes | Women and children as the primary targets of technological abuse. | Innovation without protection | Um vídeo deepfake usado para assediar uma mulher pública com conteúdo explícito fabricado · Um clone de voz por IA usado para se passar por uma criança numa ligação de golpe aos pais | Quem é mais vulnerável à violência que essa tecnologia pode causar, mesmo sem essa ser a intenção do design? |
| Power Concentration in the Global North | Data, narratives, and values concentrated within a few Big Tech corporations. | Digital colonialism | Um modelo de IA treinado quase inteiramente com dados em inglês da América do Norte, depois vendido como neutro no mundo todo · Um punhado de empresas donas da infraestrutura de computação da qual toda startup de IA no mundo depende | Quem é dono da infraestrutura por trás dessa IA, e quem só usa o que sobra? |
| Environmental Impact *(transversal — not discussed in isolation; revisits the other five through the lens of material/ecological cost)* | AI infrastructures consume energy, water, and critical minerals, often displacing environmental impacts onto peripheral territories and historically exploited populations. | Innovation vs. extraction | Um data center numa região com seca frequente consumindo milhões de litros de água por ano pra resfriar servidores de IA · Mineração de terras raras para hardware de IA deslocando comunidades em territórios já explorados | Onde fica, fisicamente, o custo ambiental dessa inteligência artificial — e quem paga esse custo de perto? |

### Ecosystem Barriers (5)
Chapter 5's Table 31 doesn't include a description column like the other three tables (only data-convergence and derivation-logic columns) — descriptions below are synthesized from the surrounding paragraph text, not verbatim quotes.

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| The Boys' Club Networking | Access to opportunity and information flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy. | Structural access restriction (apparent meritocracy) | Uma promoção decidida numa happy hour pra qual só alguns colegas foram convidados · Introduções a investidores de uma startup fluindo só por uma rede de ex-alunos de um único gênero | Quem teve acesso a essa oportunidade só porque conhecia a pessoa certa? |
| The Motherhood Penalty | Caregiving responsibilities are structurally penalized through wage gaps, leadership exclusion, and constrained career mobility. | Care as career cost | Uma avaliação de desempenho que pontua uma mãe recém-retornada mais baixo por "disponibilidade reduzida" · Um pipeline de promoção que exclui silenciosamente quem tirou licença estendida para cuidar de alguém | O que essa pessoa perdeu profissionalmente por ter cuidado de alguém? |
| Symbolic and Real Violence | Domination operates through everyday, often-denied mechanisms embedded in professional environments that present themselves as neutral. | Embodied harm in professional spaces (stay or resist) | Uma reunião onde a ideia de uma mulher é ignorada até ser repetida minutos depois por um colega homem, e creditada a ele · Um código de vestimenta aplicado com mais rigor a corpos femininos, sob o disfarce de "profissionalismo" | Que tipo de dano essa pessoa aprendeu a não nomear, porque virou "normal" no ambiente onde trabalha? |
| DEI Backlash | Diversity and inclusion initiatives are rolled back when capitalist logic treats them as a cost rather than a structural commitment. | Capitalism vs. structural equity (diversity as luxury) | Um programa de diversidade cortado do orçamento no primeiro trimestre de queda de receita, enquanto outros departamentos ficam intocados · Uma empresa removendo silenciosamente metas de gênero dos relatórios públicos após uma troca de liderança | O que aconteceu com o compromisso de equidade dessa empresa quando ele deixou de ser conveniente? |
| Exclusion of Trans and Non-Binary People | A material double bind between being recognized and being safe, documented specifically through Brazilian trans and non-binary participants' accounts. | Survival vs. authenticity | Um sistema de identificação corporativa sem opção além de gênero binário, forçando uma incompatibilidade com a identidade da pessoa · Uma pessoa trans escolhendo entre revelar sua identidade e continuar segura num ambiente hostil | O que essa pessoa precisa esconder de si mesma pra continuar segura nesse espaço? |

---

## Potential Cards (8)

### AI Benefits (4)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| AI as Performance Amplifier | AI increases productivity, accelerates decision-making, and expands the capabilities of those who already possess technical and cognitive capital. | Amplification of existing privileges | Um engenheiro sênior usando IA pra entregar numa tarde o que antes levava uma semana, ampliando a distância pra colegas juniores · Uma equipe bem financiada usando ferramentas de IA que uma equipe menor e sem recursos não consegue pagar | Quem já estava na frente, e ficou ainda mais na frente, com essa ferramenta? |
| AI as Cognitive Support Network | AI acts as an organizer, reviewer, and mental load reducer, particularly for women. | Protection vs. expansion of responsibilities | Uma mãe trabalhadora usando um assistente de IA pra gerenciar agenda, consultas médicas e prazos escolares num só lugar · Uma ferramenta de IA que redige e-mails de rotina, liberando horas antes gastas em trabalho administrativo invisível | Que carga mental essa ferramenta tirou dos ombros de alguém — e isso muda algo estrutural, ou só alivia por fora? |
| AI as Leveling Tool | When used intentionally, it can accelerate the learning curve for underrepresented groups. | Democratization conditioned upon access and literacy | Um tutor de IA gratuito ajudando um estudante de primeira geração a recuperar uma base que nunca teve acesso antes · Uma ferramenta de tradução por IA permitindo que alguém não-nativo no idioma se candidate a vagas antes fora de alcance | O que essa pessoa consegue fazer agora que não conseguia antes — e o que ainda falta pra esse acesso ser garantido de verdade? |
| AI as Accessibility Infrastructure | Translation, transcription, support for neurodivergence, and linguistic inclusion. | Inclusion is not automatic; it depends on ethical design | Uma IA leitora de tela permitindo que uma pessoa cega navegue um site sozinha pela primeira vez · Uma ferramenta de legendagem em tempo real permitindo que uma pessoa surda acompanhe uma reunião sem precisar de intérprete humano toda vez | Que barreira essa tecnologia realmente remove, e que barreira ela só disfarça? |

### Trust in AI (4)

| Card | Description | Tension | Examples | Reflection Question |
|---|---|---|---|---|
| Instrumental Trust | Trust based on utility and results. | It works, therefore I trust it | Alguém que não entende bem como uma ferramenta de diagnóstico funciona, mas confia nela porque já acertou antes · Uma equipe adotando uma ferramenta de agendamento por IA só porque economiza tempo, sem auditar como ela decide | Essa pessoa confia na ferramenta, ou só confia no resultado — e isso é a mesma coisa? |
| Conditional Trust | Trust mediated by control, human oversight, and clear boundaries. | Necessary but uncomfortable use | Um médico usando uma ferramenta de diagnóstico por IA só como segunda opinião, nunca como palavra final · Um gestor revisando cada decisão que uma ferramenta de IA de contratação toma antes de seguir adiante | Que limite essa pessoa colocou pra continuar confiando — e o que aconteceria se esse limite fosse removido? |
| Systemic Mistrust | The issue is not the tool itself, but the creators, the data, and the underlying interests. | Invisible power | Uma comunidade que não confia numa IA de saúde, não pela ferramenta em si, mas por quem a construiu e quem lucra com ela · Um trabalhador que assume que qualquer "IA de produtividade" introduzida pela gestão existe pra justificar demissões | Se essa pessoa não confia, é na tecnologia — ou em quem está por trás dela? |
| Neutrality as a Myth | Algorithms reflect human values and social structures. | Mathematics does not equal justice | Uma ferramenta de contratação por IA apresentada como "objetiva" que ainda reflete os vieses dos currículos com que foi treinada · Um algoritmo de moderação de conteúdo vendido como neutro que sinaliza sistematicamente certos dialetos como "tóxicos" | Que valores essa IA carrega, mesmo sendo apresentada como neutra? |

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
