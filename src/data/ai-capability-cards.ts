/** Card copy: docs/ffie_ai_capability_cards.md. Guiding questions are app-layer UX (embody vs artifact context). */
export type AiCapabilityCard = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  examples: string[];
  /** Embody step — character AI function */
  guidingQuestions: [string, string];
  /** Artifact day-to-day step */
  artifactGuidingQuestions: [string, string];
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
      "Content Recommendation",
      "Behavioral Profiling",
      "Predictive Suggestion",
    ],
    examples: [
      "A wellness app that recommends different treatments based on a user's inferred income bracket",
      "A job platform that shows different opportunities to men and women based on past clicks",
    ],
    guidingQuestions: [
      "Who would use this capability in your character's day?",
      "What would they notice about it first — convenience, or something unsettling?",
    ],
    artifactGuidingQuestions: [
      "What does this artifact recommend or adapt in your character's daily routine?",
      "Who might receive a different version than someone else?",
    ],
    color: "#64748b",
  },
  {
    id: "language-conversation",
    name: "Language & Conversation",
    description:
      "Understands and generates human language well enough to hold a conversation or write on someone's behalf.",
    tags: ["Chatbot", "Text Generation", "Sentiment Analysis"],
    examples: [
      "A companion app that talks through loneliness with an elderly user",
      "An automated HR assistant that scans resignation letters for 'tone risk'",
    ],
    guidingQuestions: [
      "Who is the AI speaking to — or speaking for?",
      "What feeling does the conversation leave behind?",
    ],
    artifactGuidingQuestions: [
      "What does the artifact say, translate, or respond to in a typical day?",
      "Who reads or hears its output — and who never sees the original?",
    ],
    color: "#64748b",
  },
  {
    id: "image-video-generation",
    name: "Image & Video Generation",
    description:
      "Creates or modifies visual content from a prompt or existing material.",
    tags: ["Synthetic Media", "Face Generation", "Style Transfer"],
    examples: [
      "A dating safety app that generates a synthetic preview of who you're about to meet",
      "A media platform that auto-generates thumbnails optimized for engagement, without checking accuracy",
    ],
    guidingQuestions: [
      "What image or scene would your character encounter because of this?",
      "Who controls what gets shown — and who cannot opt out?",
    ],
    artifactGuidingQuestions: [
      "What image or video does the artifact produce or alter in daily use?",
      "What would your character mistake for real because of it?",
    ],
    color: "#64748b",
  },
  {
    id: "biometric-body-data",
    name: "Biometric & Body Data",
    description:
      "Reads physical signals from a body: face, voice, movement, vital signs.",
    tags: ["Facial Recognition", "Voice Analysis", "Health Monitoring"],
    examples: [
      "A corporate wellness wearable that reports stress levels to a manager",
      "A dermatology app that screens skin conditions from a photo, trained mostly on lighter skin tones",
    ],
    guidingQuestions: [
      "Whose body is being read — and who sees the results?",
      "What happens when the reading is wrong or incomplete?",
    ],
    artifactGuidingQuestions: [
      "What signal from the body does the artifact read each day?",
      "Who else receives that reading besides your character?",
    ],
    color: "#64748b",
  },
  {
    id: "predictive-scoring",
    name: "Predictive Scoring & Risk Analysis",
    description:
      "Estimates the likelihood of a future outcome based on past data.",
    tags: ["Credit Scoring", "Risk Prediction", "Eligibility Screening"],
    examples: [
      "An insurance app that prices premiums based on inferred lifestyle risk",
      "A loan platform that scores 'reliability' using zip code and browsing history",
    ],
    guidingQuestions: [
      "What decision gets made automatically because of the score?",
      "Who is most likely to be misread by the model?",
    ],
    artifactGuidingQuestions: [
      "What score or prediction does the artifact produce in daily use?",
      "What door opens or closes because of that number?",
    ],
    color: "#64748b",
  },
  {
    id: "realtime-monitoring",
    name: "Real-Time Monitoring",
    description:
      "Continuously observes behavior, location, or activity as it happens.",
    tags: ["Activity Tracking", "Location Data", "Productivity Monitoring"],
    examples: [
      "An onboarding kit that tracks keystrokes and badge swipes to measure 'engagement'",
      "An elder-care app that also reports daily movement to family members",
    ],
    guidingQuestions: [
      "What is being watched, moment by moment?",
      "Who receives the alert — and who never knows they were monitored?",
    ],
    artifactGuidingQuestions: [
      "What does the artifact watch continuously while your character works or lives?",
      "At what moment does an alert leave the artifact and reach someone else?",
    ],
    color: "#64748b",
  },
  {
    id: "task-automation",
    name: "Automation & Task Delegation",
    description:
      "Performs a repetitive task on someone's behalf without needing supervision each time.",
    tags: ["Workflow Automation", "Scheduling", "Auto-Response"],
    examples: [
      "A freelance platform that auto-negotiates rates on a worker's behalf, always toward the lower end",
      "A caregiving bot that auto-schedules therapy check-ins",
    ],
    guidingQuestions: [
      "What task does your character stop doing themselves?",
      "What do they lose control of when the task runs in the background?",
    ],
    artifactGuidingQuestions: [
      "What task does the artifact handle automatically each day?",
      "What would your character have to do manually if the artifact stopped?",
    ],
    color: "#64748b",
  },
  {
    id: "identity-data-fusion",
    name: "Data Aggregation & Identity Verification",
    description:
      "Combines many small pieces of personal data into a single verified profile.",
    tags: [
      "Identity Verification",
      "Data Merging",
      "Cross-Platform Tracking",
    ],
    examples: [
      "A 'universal ID' app that merges medical, financial, and social data into one score used everywhere",
      "A gig-work reputation system that follows a worker across every platform they've used",
    ],
    guidingQuestions: [
      "What gets linked together that used to stay separate?",
      "Who benefits from the single profile — the person, or someone else?",
    ],
    artifactGuidingQuestions: [
      "What pieces of your character's life does the artifact combine into one profile?",
      "Where does that unified identity get checked or gate access?",
    ],
    color: "#64748b",
  },
];
