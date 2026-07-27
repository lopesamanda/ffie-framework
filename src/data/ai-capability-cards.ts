export type AiCapabilityCard = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  examples: string[];
  /** Neutral slate — distinct from narrative category colors */
  color: string;
};

export const AI_CAPABILITY_CARDS: AiCapabilityCard[] = [
  {
    id: "personalization-recommendation",
    name: "Personalização e Recomendação",
    description:
      "Aprende padrões do que alguém faz, compra ou precisa, e adapta o que mostra a seguir.",
    tags: [
      "Recomendação de conteúdo",
      "Perfil comportamental",
      "Sugestão preditiva",
    ],
    examples: [
      "Um app de bem-estar que recomenda tratamentos diferentes com base na renda inferida do usuário",
      "Uma plataforma de vagas que mostra oportunidades diferentes pra homens e mulheres com base em cliques anteriores",
    ],
    color: "#64748b",
  },
  {
    id: "language-conversation",
    name: "Linguagem e Conversa",
    description:
      "Entende e gera linguagem humana o suficiente pra manter uma conversa ou escrever em nome de alguém.",
    tags: ["Chatbot", "Geração de texto", "Análise de sentimento"],
    examples: [
      "Um app de companhia que conversa sobre solidão com uma pessoa idosa",
      "Um assistente de RH automatizado que analisa cartas de demissão em busca de 'risco de tom'",
    ],
    color: "#64748b",
  },
  {
    id: "image-video-generation",
    name: "Geração de Imagem e Vídeo",
    description:
      "Cria ou modifica conteúdo visual a partir de um comando ou material existente.",
    tags: ["Mídia sintética", "Geração de rosto", "Transferência de estilo"],
    examples: [
      "Um app de segurança em encontros que gera uma prévia sintética de quem você vai conhecer",
      "Uma plataforma de mídia que gera capas automaticamente otimizadas pra engajamento, sem checar precisão",
    ],
    color: "#64748b",
  },
  {
    id: "biometric-body-data",
    name: "Dados Biométricos e Corporais",
    description:
      "Lê sinais físicos de um corpo: rosto, voz, movimento, sinais vitais.",
    tags: [
      "Reconhecimento facial",
      "Análise de voz",
      "Monitoramento de saúde",
    ],
    examples: [
      "Um wearable de bem-estar corporativo que reporta níveis de estresse pro gestor",
      "Um app de dermatologia que analisa condições de pele por foto, treinado majoritariamente em peles claras",
    ],
    color: "#64748b",
  },
  {
    id: "predictive-scoring",
    name: "Pontuação Preditiva e Análise de Risco",
    description:
      "Estima a probabilidade de um resultado futuro com base em dados passados.",
    tags: [
      "Score de crédito",
      "Predição de risco",
      "Triagem de elegibilidade",
    ],
    examples: [
      "Um app de seguro que precifica com base em risco de estilo de vida inferido",
      "Uma plataforma de empréstimo que pontua 'confiabilidade' usando CEP e histórico de navegação",
    ],
    color: "#64748b",
  },
  {
    id: "realtime-monitoring",
    name: "Monitoramento em Tempo Real",
    description:
      "Observa continuamente comportamento, localização ou atividade enquanto acontece.",
    tags: [
      "Rastreamento de atividade",
      "Dados de localização",
      "Monitoramento de produtividade",
    ],
    examples: [
      "Um kit de integração corporativa que rastreia digitação e crachá pra medir 'engajamento'",
      "Um app de cuidado com idosos que também reporta a movimentação diária deles pra família",
    ],
    color: "#64748b",
  },
  {
    id: "task-automation",
    name: "Automação e Delegação de Tarefas",
    description:
      "Executa uma tarefa repetitiva em nome de alguém sem supervisão constante.",
    tags: ["Automação de fluxo", "Agendamento", "Resposta automática"],
    examples: [
      "Uma plataforma freelancer que negocia tarifas automaticamente em nome do trabalhador, sempre pra baixo",
      "Um bot de cuidado que agenda check-ins terapêuticos sozinho",
    ],
    color: "#64748b",
  },
  {
    id: "identity-data-fusion",
    name: "Agregação de Dados e Verificação de Identidade",
    description:
      "Combina pequenos pedaços de dados pessoais num único perfil verificado.",
    tags: [
      "Verificação de identidade",
      "Fusão de dados",
      "Rastreamento entre plataformas",
    ],
    examples: [
      "Um 'ID universal' que funde dados médicos, financeiros e sociais num único score usado em todo lugar",
      "Um sistema de reputação de trabalho por app que segue o trabalhador por toda plataforma que ele já usou",
    ],
    color: "#64748b",
  },
];
