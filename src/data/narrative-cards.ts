export type CardCategory = "risk" | "benefit" | "trust" | "barrier" | "transversal";
export type CardRegister = "tension" | "potential";

export type NarrativeCard = {
  id: string;
  name: string;
  description: string;
  tension: string;
  examples: string[];
  reflectionQuestion: string;
  category: CardCategory;
  register: CardRegister;
  drawable: boolean;
  color: string;
};

export const ENVIRONMENTAL_IMPACT_CARD: NarrativeCard = {
  id: "environmental-impact",
  name: "Environmental Impact",
  description:
    "AI infrastructures consume energy, water, and critical minerals, often displacing environmental impacts onto peripheral territories and historically exploited populations.",
  tension: "Innovation vs. extraction",
  examples: [
    "Um data center numa região com seca frequente consumindo milhões de litros de água por ano pra resfriar servidores de IA",
    "Mineração de terras raras para hardware de IA deslocando comunidades em territórios já explorados",
  ],
  reflectionQuestion:
    "Onde fica, fisicamente, o custo ambiental dessa inteligência artificial — e quem paga esse custo de perto?",
  category: "transversal",
  register: "tension",
  drawable: false,
  color: "#2d6a4f",
};

export const NARRATIVE_CARDS: NarrativeCard[] = [
  {
    id: "digital-monoculture",
    name: "Digital Monoculture",
    description:
      "The logic of scalability eliminates cultural, social, and biological diversity.",
    tension: "Efficiency vs. plurality",
    examples: [
      "Um app de tradução que só preserva os cinco idiomas mais falados, deixando centenas de línguas indígenas fora do uso digital",
      "Um algoritmo de recomendação que mostra a mesma tendência pra todo mundo numa cidade, achatando a expressão cultural local",
    ],
    reflectionQuestion:
      "O que se perde quando a mesma solução é aplicada a todo mundo, em todo lugar?",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "amplification-of-historical-biases",
    name: "Amplification of Historical Biases",
    description:
      "Racism, sexism, and transphobia are reproduced by historical data.",
    tension: "Automation of injustice",
    examples: [
      "Um algoritmo de contratação treinado em currículos de uma década que penaliza quem lista \"faculdade só para mulheres\"",
      "Uma ferramenta de policiamento preditivo que sinaliza bairros com base em dados históricos de prisão já enviesados",
    ],
    reflectionQuestion:
      "De onde vieram os dados que ensinaram essa IA — e quem eles deixaram de fora?",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "cognitive-atrophy",
    name: "Cognitive Atrophy",
    description:
      "Over-reliance leads to the loss of critical thinking and intellectual autonomy.",
    tension: "Convenience vs. education/development",
    examples: [
      "Um assistente de escrita tão presente no trabalho diário que a equipe perde o hábito de argumentar sozinha",
      "Um app de navegação usado com tanta frequência que a pessoa perde a capacidade de ler um mapa sem ele",
    ],
    reflectionQuestion:
      "O que essa pessoa deixou de saber fazer sozinha, desde que passou a confiar nessa IA?",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "digital-violence-and-deepfakes",
    name: "Digital Violence and Deepfakes",
    description:
      "Women and children as the primary targets of technological abuse.",
    tension: "Innovation without protection",
    examples: [
      "Um vídeo deepfake usado para assediar uma mulher pública com conteúdo explícito fabricado",
      "Um clone de voz por IA usado para se passar por uma criança numa ligação de golpe aos pais",
    ],
    reflectionQuestion:
      "Quem é mais vulnerável à violência que essa tecnologia pode causar, mesmo sem essa ser a intenção do design?",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "power-concentration-global-north",
    name: "Power Concentration in the Global North",
    description:
      "Data, narratives, and values concentrated within a few Big Tech corporations.",
    tension: "Digital colonialism",
    examples: [
      "Um modelo de IA treinado quase inteiramente com dados em inglês da América do Norte, depois vendido como neutro no mundo todo",
      "Um punhado de empresas donas da infraestrutura de computação da qual toda startup de IA no mundo depende",
    ],
    reflectionQuestion:
      "Quem é dono da infraestrutura por trás dessa IA, e quem só usa o que sobra?",
    category: "risk",
    register: "tension",
    drawable: true,
    color: "#c45c3e",
  },
  {
    id: "boys-club-networking",
    name: "The Boys' Club Networking",
    description:
      "Access to opportunity and information flows through informal, referral-based networks that exclude those outside them, operating behind a claim of meritocracy.",
    tension: "Structural access restriction (apparent meritocracy)",
    examples: [
      "Uma promoção decidida numa happy hour pra qual só alguns colegas foram convidados",
      "Introduções a investidores de uma startup fluindo só por uma rede de ex-alunos de um único gênero",
    ],
    reflectionQuestion:
      "Quem teve acesso a essa oportunidade só porque conhecia a pessoa certa?",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "motherhood-penalty",
    name: "The Motherhood Penalty",
    description:
      "Caregiving responsibilities are structurally penalized through wage gaps, leadership exclusion, and constrained career mobility.",
    tension: "Care as career cost",
    examples: [
      "Uma avaliação de desempenho que pontua uma mãe recém-retornada mais baixo por \"disponibilidade reduzida\"",
      "Um pipeline de promoção que exclui silenciosamente quem tirou licença estendida para cuidar de alguém",
    ],
    reflectionQuestion:
      "O que essa pessoa perdeu profissionalmente por ter cuidado de alguém?",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "symbolic-and-real-violence",
    name: "Symbolic and Real Violence",
    description:
      "Domination operates through everyday, often-denied mechanisms embedded in professional environments that present themselves as neutral.",
    tension: "Embodied harm in professional spaces (stay or resist)",
    examples: [
      "Uma reunião onde a ideia de uma mulher é ignorada até ser repetida minutos depois por um colega homem, e creditada a ele",
      "Um código de vestimenta aplicado com mais rigor a corpos femininos, sob o disfarce de \"profissionalismo\"",
    ],
    reflectionQuestion:
      "Que tipo de dano essa pessoa aprendeu a não nomear, porque virou \"normal\" no ambiente onde trabalha?",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "dei-backlash",
    name: "DEI Backlash",
    description:
      "Diversity and inclusion initiatives are rolled back when capitalist logic treats them as a cost rather than a structural commitment.",
    tension: "Capitalism vs. structural equity (diversity as luxury)",
    examples: [
      "Um programa de diversidade cortado do orçamento no primeiro trimestre de queda de receita, enquanto outros departamentos ficam intocados",
      "Uma empresa removendo silenciosamente metas de gênero dos relatórios públicos após uma troca de liderança",
    ],
    reflectionQuestion:
      "O que aconteceu com o compromisso de equidade dessa empresa quando ele deixou de ser conveniente?",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "exclusion-trans-non-binary",
    name: "Exclusion of Trans and Non-Binary People",
    description:
      "A material double bind between being recognized and being safe, documented specifically through Brazilian trans and non-binary participants' accounts.",
    tension: "Survival vs. authenticity",
    examples: [
      "Um sistema de identificação corporativa sem opção além de gênero binário, forçando uma incompatibilidade com a identidade da pessoa",
      "Uma pessoa trans escolhendo entre revelar sua identidade e continuar segura num ambiente hostil",
    ],
    reflectionQuestion:
      "O que essa pessoa precisa esconder de si mesma pra continuar segura nesse espaço?",
    category: "barrier",
    register: "tension",
    drawable: true,
    color: "#b83280",
  },
  {
    id: "ai-performance-amplifier",
    name: "AI as Performance Amplifier",
    description:
      "AI increases productivity, accelerates decision-making, and expands the capabilities of those who already possess technical and cognitive capital.",
    tension: "Amplification of existing privileges",
    examples: [
      "Um engenheiro sênior usando IA pra entregar numa tarde o que antes levava uma semana, ampliando a distância pra colegas juniores",
      "Uma equipe bem financiada usando ferramentas de IA que uma equipe menor e sem recursos não consegue pagar",
    ],
    reflectionQuestion:
      "Quem já estava na frente, e ficou ainda mais na frente, com essa ferramenta?",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-cognitive-support",
    name: "AI as Cognitive Support Network",
    description:
      "AI acts as an organizer, reviewer, and mental load reducer, particularly for women.",
    tension: "Protection vs. expansion of responsibilities",
    examples: [
      "Uma mãe trabalhadora usando um assistente de IA pra gerenciar agenda, consultas médicas e prazos escolares num só lugar",
      "Uma ferramenta de IA que redige e-mails de rotina, liberando horas antes gastas em trabalho administrativo invisível",
    ],
    reflectionQuestion:
      "Que carga mental essa ferramenta tirou dos ombros de alguém — e isso muda algo estrutural, ou só alivia por fora?",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-leveling-tool",
    name: "AI as Leveling Tool",
    description:
      "When used intentionally, it can accelerate the learning curve for underrepresented groups.",
    tension: "Democratization conditioned upon access and literacy",
    examples: [
      "Um tutor de IA gratuito ajudando um estudante de primeira geração a recuperar uma base que nunca teve acesso antes",
      "Uma ferramenta de tradução por IA permitindo que alguém não-nativo no idioma se candidate a vagas antes fora de alcance",
    ],
    reflectionQuestion:
      "O que essa pessoa consegue fazer agora que não conseguia antes — e o que ainda falta pra esse acesso ser garantido de verdade?",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "ai-accessibility-infrastructure",
    name: "AI as Accessibility Infrastructure",
    description:
      "Translation, transcription, support for neurodivergence, and linguistic inclusion.",
    tension: "Inclusion is not automatic; it depends on ethical design",
    examples: [
      "Uma IA leitora de tela permitindo que uma pessoa cega navegue um site sozinha pela primeira vez",
      "Uma ferramenta de legendagem em tempo real permitindo que uma pessoa surda acompanhe uma reunião sem precisar de intérprete humano toda vez",
    ],
    reflectionQuestion:
      "Que barreira essa tecnologia realmente remove, e que barreira ela só disfarça?",
    category: "benefit",
    register: "potential",
    drawable: true,
    color: "#d4a017",
  },
  {
    id: "instrumental-trust",
    name: "Instrumental Trust",
    description: "Trust based on utility and results.",
    tension: "It works, therefore I trust it",
    examples: [
      "Alguém que não entende bem como uma ferramenta de diagnóstico funciona, mas confia nela porque já acertou antes",
      "Uma equipe adotando uma ferramenta de agendamento por IA só porque economiza tempo, sem auditar como ela decide",
    ],
    reflectionQuestion:
      "Essa pessoa confia na ferramenta, ou só confia no resultado — e isso é a mesma coisa?",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "conditional-trust",
    name: "Conditional Trust",
    description:
      "Trust mediated by control, human oversight, and clear boundaries.",
    tension: "Necessary but uncomfortable use",
    examples: [
      "Um médico usando uma ferramenta de diagnóstico por IA só como segunda opinião, nunca como palavra final",
      "Um gestor revisando cada decisão que uma ferramenta de IA de contratação toma antes de seguir adiante",
    ],
    reflectionQuestion:
      "Que limite essa pessoa colocou pra continuar confiando — e o que aconteceria se esse limite fosse removido?",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "systemic-mistrust",
    name: "Systemic Mistrust",
    description:
      "The issue is not the tool itself, but the creators, the data, and the underlying interests.",
    tension: "Invisible power",
    examples: [
      "Uma comunidade que não confia numa IA de saúde, não pela ferramenta em si, mas por quem a construiu e quem lucra com ela",
      "Um trabalhador que assume que qualquer \"IA de produtividade\" introduzida pela gestão existe pra justificar demissões",
    ],
    reflectionQuestion:
      "Se essa pessoa não confia, é na tecnologia — ou em quem está por trás dela?",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
  {
    id: "neutrality-as-myth",
    name: "Neutrality as a Myth",
    description: "Algorithms reflect human values and social structures.",
    tension: "Mathematics does not equal justice",
    examples: [
      "Uma ferramenta de contratação por IA apresentada como \"objetiva\" que ainda reflete os vieses dos currículos com que foi treinada",
      "Um algoritmo de moderação de conteúdo vendido como neutro que sinaliza sistematicamente certos dialetos como \"tóxicos\"",
    ],
    reflectionQuestion:
      "Que valores essa IA carrega, mesmo sendo apresentada como neutra?",
    category: "trust",
    register: "potential",
    drawable: true,
    color: "#1e3a5f",
  },
];

export const ALL_CARDS: NarrativeCard[] = [
  ...NARRATIVE_CARDS,
  ENVIRONMENTAL_IMPACT_CARD,
];

export type WorkshopHand = {
  risk: NarrativeCard;
  benefit: NarrativeCard;
  trust: NarrativeCard;
  barrier: NarrativeCard;
  transversal: NarrativeCard;
};

/** Ordered reveal sequence during the Oracle Draw */
export const ORACLE_REVEAL_SEQUENCE: (keyof WorkshopHand)[] = [
  "risk",
  "benefit",
  "trust",
  "barrier",
  "transversal",
];

export function drawWorkshopHand(): WorkshopHand {
  const pick = (category: CardCategory) => {
    const pool = NARRATIVE_CARDS.filter(
      (card) => card.category === category && card.drawable,
    );
    return pool[Math.floor(Math.random() * pool.length)];
  };

  return {
    risk: pick("risk"),
    benefit: pick("benefit"),
    trust: pick("trust"),
    barrier: pick("barrier"),
    transversal: ENVIRONMENTAL_IMPACT_CARD,
  };
}

export function buildCombinedTension(hand: WorkshopHand): string {
  return [
    hand.risk.tension,
    hand.benefit.tension,
    hand.trust.tension,
    hand.barrier.tension,
  ].join(" · ");
}

/** Seed text for artifact_public_promise from Potential cards in the hand */
export function buildEcosystemAmbitionSeed(hand: WorkshopHand): string {
  return `O ecossistema promete ${hand.benefit.tension.toLowerCase()} — e espera ${hand.trust.tension.toLowerCase()}.`;
}

/** Starter for hidden_function collision prompt */
export function buildWeaknessCollisionContext(hand: WorkshopHand): string {
  return `${hand.risk.name} (${hand.risk.tension}) encontra ${hand.barrier.name} (${hand.barrier.tension}).`;
}

export const CATEGORY_LABELS: Record<CardCategory, string> = {
  risk: "AI Risk",
  benefit: "AI Benefit",
  trust: "Trust in AI",
  barrier: "Ecosystem Barrier",
  transversal: "Transversal Lens",
};
