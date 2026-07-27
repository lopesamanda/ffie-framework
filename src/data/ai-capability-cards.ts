export type AiCapabilityCard = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  examples: string[];
  /** Short prompts to help the user write their own answer — never autofilled. */
  guidingQuestions: [string, string];
  /** Neutral slate — distinct from narrative category colors */
  color: string;
};

export const AI_CAPABILITY_CARDS: AiCapabilityCard[] = [
  {
    id: "personalization-recommendation",
    name: "Personalization & Recommendation",
    description:
      "Learns patterns in what someone does, buys, or needs, and adapts what it shows next.",
    tags: [
      "Content recommendation",
      "Behavioral profile",
      "Predictive suggestion",
    ],
    examples: [
      "A wellness app that recommends different treatments based on inferred user income",
      "A jobs platform that surfaces different opportunities to men and women based on past clicks",
    ],
    guidingQuestions: [
      "Who would use this capability in your character's day?",
      "What would they notice about it first — convenience, or something unsettling?",
    ],
    color: "#64748b",
  },
  {
    id: "language-conversation",
    name: "Language & Conversation",
    description:
      "Understands and generates human language well enough to hold a conversation or write on someone's behalf.",
    tags: ["Chatbot", "Text generation", "Sentiment analysis"],
    examples: [
      "A companionship app that talks with an older person about loneliness",
      "An automated HR assistant that scans resignation letters for 'tone risk'",
    ],
    guidingQuestions: [
      "Who is the AI speaking to — or speaking for?",
      "What feeling does the conversation leave behind?",
    ],
    color: "#64748b",
  },
  {
    id: "image-video-generation",
    name: "Image & Video Generation",
    description:
      "Creates or modifies visual content from a prompt or existing material.",
    tags: ["Synthetic media", "Face generation", "Style transfer"],
    examples: [
      "A dating safety app that generates a synthetic preview of who you are about to meet",
      "A media platform that auto-generates engagement-optimized covers without checking accuracy",
    ],
    guidingQuestions: [
      "What image or scene would your character encounter because of this?",
      "Who controls what gets shown — and who cannot opt out?",
    ],
    color: "#64748b",
  },
  {
    id: "biometric-body-data",
    name: "Biometric & Body Data",
    description:
      "Reads physical signals from a body: face, voice, movement, vital signs.",
    tags: ["Facial recognition", "Voice analysis", "Health monitoring"],
    examples: [
      "A corporate wellness wearable that reports stress levels to a manager",
      "A dermatology app trained mostly on light skin tones that analyzes conditions from photos",
    ],
    guidingQuestions: [
      "Whose body is being read — and who sees the results?",
      "What happens when the reading is wrong or incomplete?",
    ],
    color: "#64748b",
  },
  {
    id: "predictive-scoring",
    name: "Predictive Scoring & Risk Analysis",
    description:
      "Estimates the probability of a future outcome based on past data.",
    tags: ["Credit score", "Risk prediction", "Eligibility screening"],
    examples: [
      "An insurance app that prices policies from inferred lifestyle risk",
      "A lending platform that scores 'trustworthiness' using zip code and browsing history",
    ],
    guidingQuestions: [
      "What decision gets made automatically because of the score?",
      "Who is most likely to be misread by the model?",
    ],
    color: "#64748b",
  },
  {
    id: "realtime-monitoring",
    name: "Real-Time Monitoring",
    description:
      "Continuously observes behavior, location, or activity as it happens.",
    tags: ["Activity tracking", "Location data", "Productivity monitoring"],
    examples: [
      "A corporate integration kit that tracks keystrokes and badge swipes to measure 'engagement'",
      "An elder-care app that also reports daily movement to family members",
    ],
    guidingQuestions: [
      "What is being watched, moment by moment?",
      "Who receives the alert — and who never knows they were monitored?",
    ],
    color: "#64748b",
  },
  {
    id: "task-automation",
    name: "Task Automation & Delegation",
    description:
      "Executes a repetitive task on someone's behalf without constant supervision.",
    tags: ["Workflow automation", "Scheduling", "Auto-reply"],
    examples: [
      "A freelance platform that negotiates rates automatically on the worker's behalf — always downward",
      "A care bot that schedules therapeutic check-ins on its own",
    ],
    guidingQuestions: [
      "What task does your character stop doing themselves?",
      "What do they lose control of when the task runs in the background?",
    ],
    color: "#64748b",
  },
  {
    id: "identity-data-fusion",
    name: "Data Aggregation & Identity Verification",
    description:
      "Combines small pieces of personal data into a single verified profile.",
    tags: [
      "Identity verification",
      "Data fusion",
      "Cross-platform tracking",
    ],
    examples: [
      "A 'universal ID' that merges medical, financial, and social data into one score used everywhere",
      "A gig-work reputation system that follows a worker across every platform they have used",
    ],
    guidingQuestions: [
      "What gets linked together that used to stay separate?",
      "Who benefits from the single profile — the person, or someone else?",
    ],
    color: "#64748b",
  },
];
