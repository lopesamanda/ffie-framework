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
  /** Shown only when artifact_type is agent (Create day-to-day). */
  agentOnly?: boolean;
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
  {
    id: "code-generation-automation",
    name: "Code Generation & Automation",
    description:
      "Turns descriptions of what's needed into functional code, scripts, or automated tests.",
    tags: ["Code Generation", "Script Automation", "Automated Testing"],
    examples: [
      "A no-code founder shipping a full product without ever hiring the engineers her competitors need",
      "An AI pair-programmer that quietly rewrites junior developers' code without explaining why, so they never learn the reasoning behind the fix",
    ],
    guidingQuestions: [
      "What gets built or tested without a human writing every line?",
      "Who loses visibility into how the system actually works?",
    ],
    artifactGuidingQuestions: [
      "What code, script, or test does the artifact generate in a typical day?",
      "Who trusts the output without understanding how it was produced?",
    ],
    color: "#64748b",
  },
  {
    id: "data-classification-clustering",
    name: "Data Classification & Clustering",
    description:
      "Identifies patterns in information and sorts it into categories or groups.",
    tags: [
      "Pattern Detection",
      "Content Categorization",
      "Anomaly Detection",
    ],
    examples: [
      "A hiring platform that clusters candidates into 'culture fit' types that quietly correlate with race and gender",
      "A fraud-detection system that flags transactions from certain neighborhoods as higher-risk by default",
    ],
    guidingQuestions: [
      "What gets sorted into a category your character didn't choose?",
      "Who designed the groups — and who gets misfiled?",
    ],
    artifactGuidingQuestions: [
      "What does the artifact classify or cluster each day?",
      "Which group label sticks to your character whether it fits or not?",
    ],
    color: "#64748b",
  },
  {
    id: "autonomous-planning-execution",
    name: "Autonomous Planning & Execution",
    description:
      "Breaks a goal into steps and carries them out on its own, without asking for approval at each stage.",
    tags: [
      "Multi-Step Planning",
      "Goal Decomposition",
      "Unsupervised Execution",
    ],
    examples: [
      "A travel agent that books flights, hotels, and cancels conflicting meetings, only notifying her after it's done",
      "A financial agent that moves money between accounts to 'optimize' savings, based on goals she set once, months ago",
    ],
    guidingQuestions: [
      "What multi-step plan runs without stopping for consent?",
      "When does your character learn what already happened?",
    ],
    artifactGuidingQuestions: [
      "What goal does the agent decompose and execute before anyone reviews the steps?",
      "What would your character undo if they saw the plan in advance?",
    ],
    color: "#64748b",
    agentOnly: true,
  },
  {
    id: "negotiation-transacting",
    name: "Negotiation & Transacting on Someone's Behalf",
    description:
      "Makes deals, agrees to terms, or exchanges money and data with other systems, without her present at the moment of decision.",
    tags: [
      "Automated Negotiation",
      "Agent-to-Agent Transactions",
      "Delegated Consent",
    ],
    examples: [
      "A rent-negotiation agent that accepts a lease renewal she would have pushed back on, because it optimized for speed over her actual preferences",
      "A shopping agent that trades her purchase history to a retailer's agent in exchange for a better price, without asking first",
    ],
    guidingQuestions: [
      "What deal gets made while your character is elsewhere?",
      "What did they trade away to win the negotiation?",
    ],
    artifactGuidingQuestions: [
      "What terms does the agent accept or exchange in daily use?",
      "Who else was at the table — and who never knew a deal happened?",
    ],
    color: "#64748b",
    agentOnly: true,
  },
  {
    id: "persistent-memory-modeling",
    name: "Persistent Memory & Behavioral Modeling",
    description:
      "Builds and keeps a long-term model of who someone is and what they want, refining it every time it acts for them.",
    tags: [
      "Long-Term Memory",
      "Preference Modeling",
      "Cross-Session Learning",
    ],
    examples: [
      "A personal agent that knows her sleep schedule, spending habits, and relationship patterns better than her closest friend, because it never stops watching",
      "An agent that quietly changes its recommendations after 'learning' she's pregnant, before she's told anyone",
    ],
    guidingQuestions: [
      "What does the system remember that your character forgot they shared?",
      "Who learns something about them before they meant to reveal it?",
    ],
    artifactGuidingQuestions: [
      "What long-term model does the agent refine each time it acts?",
      "What inference does it make that your character never explicitly confirmed?",
    ],
    color: "#64748b",
    agentOnly: true,
  },
];
