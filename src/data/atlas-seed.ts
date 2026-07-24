export type AtlasQuadrant =
  | "dominant_dystopian"
  | "techno_optimist"
  | "fragmented"
  | "feminist_preferred";

export type AtlasStatus = "pending" | "published" | "rejected";

export type AtlasEntry = {
  id: string;
  country: "BR" | "PT";
  personaName: string;
  artifactName: string;
  age: number;
  role: string;
  aiFunction: string;
  desire: string;
  fear: string;
  values: string[];
  artifactPromise: string;
  artifactHiddenFunction: string;
  quadrant: AtlasQuadrant;
  position: { x: number; y: number };
  status: AtlasStatus;
};

export const QUADRANT_LABELS: Record<AtlasQuadrant, string> = {
  dominant_dystopian: "Dominant Dystopian",
  techno_optimist: "Techno-Optimist",
  fragmented: "Fragmented",
  feminist_preferred: "Feminist Preferred Future",
};

export const atlasSeed: AtlasEntry[] = [
  {
    id: "br-valentina-insider",
    country: "BR",
    personaName: "Valentina",
    artifactName: "INSIDER",
    age: 30,
    role: "Engenheira de software em startup",
    aiFunction: "Entrega de código de alta qualidade",
    desire: "Liderança estratégica, avanço profissional",
    fear: "Estagnar, ter potencial de liderança limitado em ambiente masculino-dominante",
    values: ["diversidade", "interseccionalidade", "justiça socioambiental"],
    artifactPromise: "Boas-vindas, pertencimento",
    artifactHiddenFunction:
      "Vigilância comportamental e intelectual disfarçada de cuidado corporativo",
    quadrant: "dominant_dystopian",
    // Fig. 59 — perto da origem, quadrante inferior-esquerdo
    position: { x: 0.45, y: 0.45 },
    status: "published",
  },
  {
    id: "br-leide-bob",
    country: "BR",
    personaName: "Leide",
    artifactName: "BOB",
    age: 70,
    role: "Gestora pública freelancer",
    aiFunction: "Ferramenta de trabalho e companhia",
    desire: "Permanecer útil, produtiva e autônoma",
    fear: "Solidão, abandono, erosão de relações humanas genuínas",
    values: ["cooperação", "horizontalidade", "autonomia"],
    artifactPromise: "Alívio da solidão, independência",
    artifactHiddenFunction:
      "Autonomia prometida pode produzir isolamento estruturalmente mais profundo",
    quadrant: "feminist_preferred",
    // Fig. 59 — quadrante superior-direito, área superior-esquerda do quadrante
    position: { x: 0.7, y: 0.7 },
    status: "published",
  },
  {
    id: "br-pietra-bioval",
    country: "BR",
    personaName: "Pietra",
    artifactName: "BIOVAL",
    age: 50,
    role: "Gestora de ESG/sustentabilidade",
    aiFunction:
      "Performance boost; busca reduzir uso da IA na organização",
    desire: "Mover o ecossistema para além da eficiência pura",
    fear:
      "Escassez hídrica regional por data centers, vigilância digital, deepfakes, roubo de identidade",
    values: ["cooperação", "justiça socioambiental", "autonomia"],
    artifactPromise: "Segurança, privacidade, proteção, cuidado",
    artifactHiddenFunction:
      "Reproduz a própria infraestrutura de vigilância que busca combater",
    quadrant: "techno_optimist",
    // Fig. 59 — quadrante superior-esquerdo, alto e levemente à esquerda
    position: { x: 0.35, y: 0.85 },
    status: "published",
  },
  {
    id: "br-helena-data-trade-id",
    country: "BR",
    personaName: "Helena",
    artifactName: "DATA TRADE ID",
    age: 28,
    role: "Desenvolvedora front-end freelancer",
    aiFunction: "Ferramenta de trabalho diário e busca",
    desire: "Ascensão social via contrato CLT formal",
    fear:
      "Ser substituída pela IA; impactos ambientais/sociais desproporcionais em sua comunidade",
    values: ["cooperação", "consentimento", "justiça socioambiental"],
    artifactPromise: "Inclusão, controle sobre os próprios dados",
    artifactHiddenFunction:
      "Participação na economia condicionada à mercantilização da identidade pessoal",
    quadrant: "dominant_dystopian",
    // Fig. 59 — canto inferior-esquerdo extremo
    position: { x: 0.08, y: 0.08 },
    status: "published",
  },
  {
    id: "pt-erika-media",
    country: "PT",
    personaName: "Erika",
    artifactName: "MEDIA",
    age: 43,
    role: "Política",
    aiFunction: "Impulsionar projetos de inclusão",
    desire: "Mundo mais justo, disseminação rápida de direitos",
    fear: 'Não conseguir acesso às redes informais de poder ("boys\' club")',
    values: ["cooperação", "empatia", "interseccionalidade"],
    artifactPromise:
      "Megafone político, arquivo blockchain de violência/censura como evidência legal",
    artifactHiddenFunction:
      'Classifica seu perfil como "alto risco", reduz alcance, amplifica oposição, vende dados comportamentais',
    quadrant: "dominant_dystopian",
    // Fig. 64 — centro do quadrante inferior-esquerdo
    position: { x: 0.32, y: 0.32 },
    status: "published",
  },
  {
    id: "pt-taina-a-eye",
    country: "PT",
    personaName: "Tainá",
    artifactName: "A-EYE",
    age: 23,
    role: "Pesquisadora",
    aiFunction:
      "Design ético, tradução, visualização de dados em pesquisa",
    desire: "Soluções para crianças com limitações cognitivas",
    fear:
      "Deepfakes e desinformação contaminando ambientes diagnósticos",
    values: ["cooperação", "horizontalidade", "justiça socioambiental"],
    artifactPromise:
      "Acessibilidade, tradução do ambiente visual para crianças",
    artifactHiddenFunction:
      "Captura biométrica contínua (batimento, dilatação pupilar, eye-tracking) a cada 0.3s; modelo treinado majoritariamente com dados do Norte Global; reclassificação sem consentimento explícito",
    quadrant: "feminist_preferred",
    // Fig. 64 — centro do quadrante superior-direito
    position: { x: 0.68, y: 0.65 },
    status: "published",
  },
  {
    id: "pt-sofia-win",
    country: "PT",
    personaName: "Sofia",
    artifactName: "WIN",
    age: 31,
    role: "Consultora/desenvolvedora IT freelancer, migrante",
    aiFunction: "Amplificador de performance",
    desire:
      "Vida financeira estável, reconhecimento de competências, respeito",
    fear:
      "Concentração de poder no Norte Global, violência simbólica constante",
    values: [
      "consentimento",
      "justiça socioambiental",
      "interoperabilidade",
      "open source",
    ],
    artifactPromise:
      "Plataforma de currículo vivo e ranqueável, visível a empregadores/seguradoras/screening algorítmico",
    artifactHiddenFunction:
      'Rede WinWatch (12.000 freelancers mapeando padrões de discriminação), "Shadow CV" transparente como contra-movimento',
    quadrant: "techno_optimist",
    // Fig. 64 — perto do centro, levemente no quadrante superior-esquerdo
    position: { x: 0.42, y: 0.58 },
    status: "published",
  },
  {
    id: "pt-john-bell-open-human",
    country: "PT",
    personaName: "John Bell",
    artifactName: "OPEN HUMAN",
    age: 48,
    role: "C-level em BigTech",
    aiFunction: "Gerenciar e controlar rotinas de negócio",
    desire: "Liderar a corrida da IA, dominar o mercado",
    fear: "Perder dominância, tornar-se irrelevante",
    values: ["autonomia", "resiliência", "mérito e eficácia"],
    artifactPromise:
      "Avalia métricas de performance em todas as dimensões da vida (saúde, trabalho, exercício)",
    artifactHiddenFunction:
      "Estímulos neurais suprimem medo; empatia e sono viram KPI; classe trabalhadora avaliada pelos mesmos sensores para fins de substituição/descarte",
    quadrant: "fragmented",
    // Fig. 64 — quadrante inferior-direito (Emancipatory/Hierarchical), não inferior-esquerdo
    position: { x: 0.62, y: 0.32 },
    status: "published",
  },
];
