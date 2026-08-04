/** Peer-reviewed publications supporting FFIE — verify DOIs against final thesis bibliography. */
export type AboutPublication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi: string;
};

export const FFIE_PEER_REVIEWED_PUBLICATIONS: AboutPublication[] = [
  {
    title:
      "Why Feminist Design Matters for GenAI: Perspectives from Lusophone Innovation Ecosystems",
    authors: "Amanda Oliveira, Rodrigo Hernández-Ramírez, Hande Ayanoğlu",
    venue: "Proc. ICGR",
    year: 2026,
    doi: "10.34190/icgr.9.1.4615",
  },
  {
    title:
      "AI and Gender Perspectives in Startup Environments: Mitigating Bias, Challenging Stereotypes, and Design Implications",
    authors: "Amanda Lopes Oliveira, Rodrigo Hernández-Ramírez, Hande Ayanoğlu",
    venue: "Proc. HCII (LNCS)",
    year: 2025,
    doi: "10.1007/978-3-031-93982-2_26",
  },
  {
    title:
      "Integrating AI into Co-Design Processes to Achieve Gender Equality in the Innovation Ecosystems of Brazil and Portugal: A Literature Review",
    authors: "Amanda Oliveira, Hande Ayanoğlu, Rodrigo Hernández-Ramírez",
    venue: "Springer (Business Sustainability)",
    year: 2026,
    doi: "10.1007/978-3-031-99147-9_23",
  },
  {
    title:
      'Plataforma "Se Toca, Mana!": o processo de Design na investigação das barreiras no exercício do direito à saúde de mulheres LBT',
    authors: "Amanda Lopes Oliveira, JM de Araújo, HO Barros",
    venue: "Estudos em Design",
    year: 2023,
    doi: "10.17765/2318-6968.2023v31n3a836",
  },
];

export const FFIE_VALIDATION_ORIGIN = {
  preStudy:
    "Pre-workshop study: bilingual survey (n=134) and semi-structured interviews (n=23), Recife and Lisbon, 2024–2025.",
  cohorts: [
    {
      label: "Cohort 1 — Recife, Brazil",
      detail:
        "Feminist Futures for the Innovation Ecosystem workshop; four diegetic prototypes validated in situ (2026).",
    },
    {
      label: "Cohort 2 — Lisbon, Portugal",
      detail:
        "Same instrument, independent cohort; four additional diegetic prototypes validated (2026).",
    },
  ],
} as const;

export const FFIE_OPEN_ACCESS_STATEMENT =
  "No account required. Downloads and exports are always free — no email gate, no paywall.";

export const FFIE_INSTITUTIONAL_AFFILIATION = {
  name: "IADE — Universidade Europeia",
  program: "PhD in Design",
  researcher: "Amanda Lopes Oliveira",
  lab: "UNIDCOM / IADE Research Unit in Design and Communication",
  url: "https://www.iade.europeia.pt/",
} as const;
