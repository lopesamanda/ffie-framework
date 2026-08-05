# FFIE — Refinamento de Conteúdo: About, Create, Explore
Junta de 4 especialistas (UX/UI, Product Manager, Acadêmico/PhD, Foresight Strategist). Baseado no conteúdo real já publicado (fetch direto de About e Explore) e na especificação completa do Create construída ao longo deste projeto.

---

## 1. Diagnóstico Geral

**About.** O ponto mais forte da página inteira é a frase "The Use-Distrust Paradox" com sua explicação — é a melhor peça de escrita do site porque afirma o achado empírico central da tese numa frase só, sem parafrasear em volta dele. A estrutura de 5 fases (Understand→Situate→Embody→Materialize→Share) já está presente, e as descrições da Matrix (Four Futures) são claras e bem escritas. As oportunidades imediatas: termos como CLA, "diegetic artifact" e "situated critique" aparecem sem glossário — um visitante fora da academia trava ali; não há link direto pros 5 papers peer-reviewed nem DOIs (nosso benchmarking com o UEQ mostrou que isso é o que dá autoridade instantânea); não existe FAQ; a seção "Credibility" cita a pesquisa mas não expõe a afiliação institucional (IADE) com o mesmo peso visual que o resto do conteúdo.

**Create.** A conquista real dessa jornada, depois de tantas rodadas de revisão, é que cada tela agora recorda o que a pessoa já disse (medo, nome, setor) em vez de apresentar campos em branco — isso já é storytelling aplicado a UX writing. O padrão eyebrow+título por fase dá identidade sem precisar de mais UI. As oportunidades: falta uma auditoria de consistência dos CTAs (Continue vs Next vs Begin aparecem sem regra clara); os estados vazios/feedback (o que acontece visualmente depois de confirmar um shuffle, ou depois de submeter a etapa final) não têm copy própria definida ainda; e o esforço total esperado ("isso leva quantos minutos?") nunca é comunicado antecipadamente ao usuário antes de começar.

**Explore.** O modelo de duas coleções ("Research Findings" vs. "Future Commons," explicitamente "never blended") é uma decisão de arquitetura de informação rara e correta — a maioria dos sites confundiria dado validado com dado gerado por visitante. Múltiplos modos de visualização (Matrix/Constellation/Grid) dão flexibilidade real. As oportunidades: os filtros hoje só cobrem país e cenário — sem tema, setor ou tipo de artefato, o que limita descoberta; os nomes dos protótipos (INSIDER, BOBBIO, VALDATA TRADE ID...) não têm nenhuma frase de preview que convide a explorar mais fundo; e não existe nenhuma ponte explícita de Explore para Create — alguém que acabou de se emocionar com um futuro não é convidado a construir o próprio.

---

## 2. Tabela de Refatoração de Textos e Micro-copy

| Seção / Tela | Elemento | Conteúdo Atual | Sugestão Reescrita | Racional |
|---|---|---|---|---|
| About — topo | H1 | "An instrument, not an explainer" | Manter — já é forte e diferenciador | **Foresight**: posiciona a FFIE contra a categoria inteira de sites explicativos, numa frase |
| About — "The bind" | Corpo | "The Use-Distrust Paradox... not hypocrisy to fix; it is a structural condition FFIE renders visible" | Manter — melhor texto do site | **PhD**: afirma o achado empírico sem hedge nem jargão |
| About — "The method" | Corpo | "Understand → Situate → Embody → Materialize → Share" (só rótulos, sem link pro fluxo real) | Adicionar 1 frase de ponte: "Walk the method yourself in [Create](/create)." | **PM**: converte leitura passiva em intenção de ação, sem precisar de nova seção |
| About — "Credibility" | Corpo | "Doctoral research in Design by Amanda Lopes — two cohorts, 134 survey responses, 23 interviews, eight diegetic prototypes" | Adicionar logo abaixo: "Read the published research →" com links diretos aos 5 papers (DOI visível) | **PhD**: replica o padrão de citação verificável do UEQ, eleva autoridade instantaneamente |
| About — nova seção | FAQ | Inexistente | Adicionar bloco curto: "What is a diegetic artifact?", "Why feminist?", "Is this validated research or a game?", "Can I use this with my team?" | **PM + UX**: reduz carga cognitiva de termos técnicos sem diluir o texto principal |
| Create — Tipo (Step 1) | Subtítulo | "Which subformat fits best?" | Manter, mas adicionar 1 linha de apoio: "This shapes how the artifact is described later — not a hard rule." | **UX**: reduz ansiedade de "estou escolhendo errado" |
| Create — todas as telas | CTA principal | Mistura de "Next" / "Continue" / "Begin" sem regra clara | Padronizar: "Continue" em todo o fluxo, "Begin the Draw" só na entrada da Situate, "See your future" só na transição final pro Share | **UX**: consistência de rótulo reduz carga cognitiva, um dos heurísticas mais violadas hoje |
| Create — Oracle Draw | Feedback pós-shuffle | Inexistente/implícito | Adicionar microcopy temporária: "New combination drawn." (some após 2s) | **UX + PM**: confirma que a ação teve efeito, crítico depois do bug de sorteio repetido |
| Create — Weakness | Texto de transição | Inexistente entre Values e Weakness | Adicionar 1 frase de ponte: "You just named what this artifact stands for. Now, what happens if that goes too far?" | **Foresight**: mantém o arco narrativo explícito entre duas telas que hoje parecem desconectadas |
| Create — antes do início | Estimativa de esforço | Inexistente | Adicionar na tela de abertura da Situate: "About 10 minutes, five short moments." | **PM**: reduz abandono ao definir expectativa antes do compromisso |
| Explore — filtros | Rótulo | "All countries" / "All scenarios" | Adicionar um terceiro filtro: "All sectors" (usando a mesma lista de setor já usada no Create) | **PM + UX**: aumenta chance de descoberta relevante, replica taxonomia rica de referências como Futures in Draft |
| Explore — cards de protótipo | Preview | Só o nome (ex: "INSIDER") sem contexto | Adicionar subtítulo de 1 linha por card: "INSIDER — a hiring algorithm that never explains itself" | **Foresight + UX**: dá gancho emocional/curioso antes do clique, hoje é nome opaco |
| Explore — rodapé da seção Matrix | CTA de ponte pro Create | Inexistente | Adicionar: "Seen a future that feels close to home? Build your own." → botão pro Create | **PM**: converte exploração em intenção de criação, fecha o loop do funil |
| Explore — Future Commons (quando vazio/pouco povoado) | Empty state | Não verificado/provavelmente ausente | "The first futures from visitors like you will appear here. Be among the first to publish one." | **PM + Foresight**: transforma estado vazio em convite, não em vácuo |

---

## 3. Mapeamento de Melhoria de Fluxo

**Create** — sequência final já decidida ao longo deste projeto, com os ajustes de copy acima aplicados:
Understand (dobrado na abertura do Draw) → Situate (The Draw, com estimativa de esforço na entrada e feedback de shuffle) → Embody (Give them a life → Build [Possessive] Story com revelação progressiva → Name the fear, com tag recolhível lembrando as cartas sorteadas) → Materialize (Give it a body → Place it in the world com Power/Capability/Nome reordenados → What it stands for → Its shadow side, com frase de ponte entre as duas) → Share (Where does it belong?, autoavaliação em 2 escalas de 1–6 → It exists now., card final).

**Explore** — sequência recomendada, incorporando a ponte pro Create:
Chegada (Matrix como lente primária, dois toggles Research Findings/Future Commons sempre visíveis e nunca misturados) → Filtros (país, cenário, e o novo filtro de setor sugerido acima) → Seleção de um ponto (preview de 1 linha por protótipo, não só nome) → Leitura do excerto + pergunta de reflexão → CTA de ponte: "Build your own" levando direto pro Create, já carregando o contexto de setor/cenário que a pessoa estava explorando, se possível.

---

## 4. Recomendações de Copy Strategy

**Tom de voz:** direto, em segunda pessoa, levemente literário — frases curtas que fecham com uma virada emocional ("A future is not only about what technology makes possible. It is also about what changes along the way."). Nunca tom de pitch de startup, nunca tom de manual acadêmico.

**Glossário recomendado** (termos que precisam de explicação de 1 linha na primeira aparição, ou de uma entrada de FAQ/glossário dedicado): CLA (Causal Layered Analysis), diegetic artifact, Critical Feminist Matrix, Use-Distrust Paradox, Human-in-the-Loop, situated critique.

**O que evitar:**
- Travessão em excesso (já uma diretriz sua desde o início do projeto) — preferir ponto final ou vírgula.
- Jargão acadêmico sem gloss na primeira menção — nunca assumir que o visitante sabe o que é "diegetic."
- Linguagem de produto genérica ("empower," "seamless," "unlock") — quebra o tom crítico que a FFIE cultivou.
- CTAs inconsistentes entre telas — todo botão de avanço no Create deveria seguir a mesma convenção de rótulo definida na tabela acima.
- Estados vazios sem copy — qualquer lugar onde não há dado ainda (Future Commons novo, resultado de filtro sem match) precisa de uma frase, nunca silêncio.
