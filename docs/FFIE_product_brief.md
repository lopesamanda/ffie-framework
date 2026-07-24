# FFIE — Product Brief v1
**Feminist Foresight in Innovation Ecosystems — site + ferramenta individual**
Definido em sessão de ideação PM/Design · para levar ao Cursor

---

## 1. Posicionamento

O site não tenta operacionalizar o protocolo de workshop completo do FFIE (facilitação em grupo, Situated Check-in coletivo, timers, etc.) — isso permanece narrado editorialmente. O que é replicável e vale virar produto é a unidade atômica do framework, já validada nos dois cohorts da tese: **persona + artefato diegético, posicionado na Matriz Feminista Crítica 2×2**.

Prioridade definida: **ferramenta primeiro**. A camada editorial (case study da tese) existe, mas enxuta — o peso do v1 vai para o Atlas de Futuros e a jornada individual.

---

## 2. Arquitetura de informação

- **Home** — manifesto curto + entrada direta para "Crie o seu Futuro" e "Atlas de Futuros"
- **Atlas de Futuros** — a matriz 2×2 viva, feature central
- **Crie o seu Futuro** — jornada individual (persona → artefato → posicionamento)
- **O Framework** — as 5 fases explicadas editorialmente (Understand, Situate, Embody, Materialize, Share), enxuto
- **Sobre a pesquisa** — tese, autora, deck de cartas como referência

---

## 3. Atlas de Futuros — a feature central

Mapa 2×2 clicável, eixos herdados diretamente da tese:
- **Horizontal:** System Logic — Extractive ↔ Emancipatory
- **Vertical:** Power Organization — Hierarchical ↔ Collective Care

**Seed inicial (8 pontos fixos, direto do Cap. 5):**
Brasil — Valentina/INSIDER, Leide/BOB, Pietra/BIOVAL, Helena/DATA TRADE ID
Portugal — Erika/MEDIA, Tainá/A-EYE, Sofia/WIN, John Bell/OPEN HUMAN

Cada ponto abre um card: persona (idade, papel, desejo, medo, valores não-negociáveis) + artefato (nome, o que promete vs. o que esconde) + posição justificada no quadrante.

**Modelo híbrido de curadoria (decisão confirmada):**
1. Visitante completa a jornada individual e submete seu par persona+artefato
2. Entra em fila de moderação (status `pending`)
3. Amanda aprova manualmente → status `published` → ponto aparece no Atlas público, ao lado dos 8 originais

Estados necessários no data model: `pending`, `published`, `rejected`. Painel de moderação simples (lista + aprovar/rejeitar) — não precisa ser sofisticado no v1, pode ser uma view admin protegida por senha.

---

## 4. Jornada individual — "Crie o seu Futuro"

Versão solo e assíncrona das fases Embody → Materialize → Share (Situate reduzido a uma micro-reflexão inicial). ~5-8 min.

1. **Situate (leve):** 2-3 cartas do deck apresentadas, escolha guiada — substitui o check-in em grupo por reflexão pessoal ("de onde eu folo sobre IA")
2. **Embody:** monta a persona 2036 — papel no ecossistema, função da IA no dia a dia, 1 desejo, 1 medo, 3 valores não-negociáveis (lista pré-definida, mesma lógica do workshop)
3. **Materialize (assistido por IA — decisão confirmada):**
   - A plataforma **gera um prompt pronto** a partir das respostas do usuário (persona + tensão + valores), para ele copiar
   - O usuário cola esse prompt na ferramenta de IA de sua escolha (GPT, Gemini, Claude, etc.) — fora da plataforma
   - Ele volta e **faz upload da imagem gerada**
   - Não há integração de API de geração de imagem no v1 — reduz custo e complexidade técnica
4. **Share:** posiciona o artefato na matriz (drag ou clique nos dois eixos), justifica a posição em texto curto, revisa e submete para moderação

---

## 5. Escopo v1 vs v2

**v1 (MVP):**
- Atlas com 8 pontos seed + pontos publicados por moderação manual
- Jornada individual completa (texto + upload de imagem, sem geração via API)
- Fila de moderação simples (admin view)
- Camada editorial enxuta (Home + O Framework + Sobre)

**v2 (depois):**
- Geração de imagem via API integrada (remove a etapa de "sair da plataforma")
- Filtros no Atlas (por quadrante, por país, por data)
- Reações/comentários nos pontos publicados
- Exportação do resultado pessoal (imagem/PDF para compartilhar em redes)

---

## 6. Stack sugerida (leve, compatível com Cursor)

- Frontend: Next.js/React + Tailwind (scrollytelling na camada editorial, Framer Motion se quiser transições na matriz)
- Persistência: Supabase (Postgres + auth simples + storage para upload de imagem) — cobre banco de dados, fila de moderação e storage num único serviço, baixo esforço de setup
- Admin/moderação: rota protegida (`/admin`) com autenticação simples, lista de submissões `pending` com aprovar/rejeitar

---

## 7. Referências visuais/UX levantadas

- **With Company** (with-company.com) — tom editorial "Systems x Time", vídeo de abertura, cases como unidades narrativas curtas antes de aprofundar. Referência principal para a camada editorial.
- **Ferramentas de 2×2 scenario matrix** (Futures Platform, Kinetic Futures Lab, GOV.UK Futures Toolkit) — padrões de interação para posicionar um item num quadrante; usar como base em vez de reinventar.
- **Card-based method tools** (IDEO/18F Method Cards) — convenções de UI para apresentação e seleção de cartas.

---

## 8. Conteúdo seed — fonte

Os 8 pares persona+artefato, suas posições exatas na matriz e as justificativas analíticas estão detalhados no Capítulo 5 da tese (seções 5.2.2.3–5.2.2.4 para Brasil; 5.2.3.3–5.2.3.4 para Portugal). Usar como copy-source direto para popular o Atlas seed.
