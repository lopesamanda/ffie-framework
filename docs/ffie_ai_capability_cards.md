# FFIE — AI Capability Cards
FFIE-original reference set, not part of the Narrative Card Deck (see `ffie_narrative_cards.md` for that). These 13 cards exist purely as an ideation aid, shown during the Embody step (character_ai_function) and the artifact "Day to day" step (artifact_public_promise), to help non-technical users brainstorm what an AI-driven artifact could plausibly do. No external brand names or references appear anywhere in the product — content is original writing, inspired only by the general structural idea of pairing a capability with tags and concrete examples.

Interaction: selecting a card expands it in place to show its example plus 1-2 short guiding micro-questions that help the user articulate their own answer (e.g., "Who would use this?", "What would they notice about it first?") — it does not autofill the answer for them. The text input stays empty until the user writes their own response.

On the Day to day step, cards are reordered and grouped by `artifact_type`: suggested capabilities appear first with a subtle highlight; remaining cards stay visible under "Other capabilities." Cards 11–13 (Autonomous Planning & Execution, Negotiation & Transacting, Persistent Memory & Behavioral Modeling) surface only when `artifact_type` is **agent**.

Language: English only (no bilingual toggle yet).

---

## 1. Personalization & Recommendation
**Description:** Learns patterns in what someone does, buys, or needs, and adapts what it shows next.
**Tags:** Content Recommendation · Behavioral Profiling · Predictive Suggestion
**Examples:**
- A wellness app that recommends different treatments based on a user's inferred income bracket
- A job platform that shows different opportunities to men and women based on past clicks

## 2. Language & Conversation
**Description:** Understands and generates human language well enough to hold a conversation or write on someone's behalf.
**Tags:** Chatbot · Text Generation · Sentiment Analysis
**Examples:**
- A companion app that talks through loneliness with an elderly user
- An automated HR assistant that scans resignation letters for "tone risk"

## 3. Image & Video Generation
**Description:** Creates or modifies visual content from a prompt or existing material.
**Tags:** Synthetic Media · Face Generation · Style Transfer
**Examples:**
- A dating safety app that generates a synthetic preview of who you're about to meet
- A media platform that auto-generates thumbnails optimized for engagement, without checking accuracy

## 4. Biometric & Body Data
**Description:** Reads physical signals from a body: face, voice, movement, vital signs.
**Tags:** Facial Recognition · Voice Analysis · Health Monitoring
**Examples:**
- A corporate wellness wearable that reports stress levels to a manager
- A dermatology app that screens skin conditions from a photo, trained mostly on lighter skin tones

## 5. Predictive Scoring & Risk Analysis
**Description:** Estimates the likelihood of a future outcome based on past data.
**Tags:** Credit Scoring · Risk Prediction · Eligibility Screening
**Examples:**
- An insurance app that prices premiums based on inferred lifestyle risk
- A loan platform that scores "reliability" using zip code and browsing history

## 6. Real-Time Monitoring
**Description:** Continuously observes behavior, location, or activity as it happens.
**Tags:** Activity Tracking · Location Data · Productivity Monitoring
**Examples:**
- An onboarding kit that tracks keystrokes and badge swipes to measure "engagement"
- An elder-care app that also reports daily movement to family members

## 7. Automation & Task Delegation
**Description:** Performs a repetitive task on someone's behalf without needing supervision each time.
**Tags:** Workflow Automation · Scheduling · Auto-Response
**Examples:**
- A freelance platform that auto-negotiates rates on a worker's behalf, always toward the lower end
- A caregiving bot that auto-schedules therapy check-ins

## 8. Data Aggregation & Identity Verification
**Description:** Combines many small pieces of personal data into a single verified profile.
**Tags:** Identity Verification · Data Merging · Cross-Platform Tracking
**Examples:**
- A "universal ID" app that merges medical, financial, and social data into one score used everywhere
- A gig-work reputation system that follows a worker across every platform they've used

## 9. Code Generation & Automation
**Description:** Turns descriptions of what's needed into functional code, scripts, or automated tests.
**Tags:** Code Generation · Script Automation · Automated Testing
**Examples:**
- A no-code founder shipping a full product without ever hiring the engineers her competitors need
- An AI pair-programmer that quietly rewrites junior developers' code without explaining why, so they never learn the reasoning behind the fix

## 10. Data Classification & Clustering
**Description:** Identifies patterns in information and sorts it into categories or groups.
**Tags:** Pattern Detection · Content Categorization · Anomaly Detection
**Examples:**
- A hiring platform that clusters candidates into "culture fit" types that quietly correlate with race and gender
- A fraud-detection system that flags transactions from certain neighborhoods as higher-risk by default

## 11. Autonomous Planning & Execution *(agent artifact type only)*
**Description:** Breaks a goal into steps and carries them out on its own, without asking for approval at each stage.
**Tags:** Multi-Step Planning · Goal Decomposition · Unsupervised Execution
**Examples:**
- A travel agent that books flights, hotels, and cancels conflicting meetings, only notifying her after it's done
- A financial agent that moves money between accounts to "optimize" savings, based on goals she set once, months ago

## 12. Negotiation & Transacting on Someone's Behalf *(agent artifact type only)*
**Description:** Makes deals, agrees to terms, or exchanges money and data with other systems, without her present at the moment of decision.
**Tags:** Automated Negotiation · Agent-to-Agent Transactions · Delegated Consent
**Examples:**
- A rent-negotiation agent that accepts a lease renewal she would have pushed back on, because it optimized for speed over her actual preferences
- A shopping agent that trades her purchase history to a retailer's agent in exchange for a better price, without asking first

## 13. Persistent Memory & Behavioral Modeling *(agent artifact type only)*
**Description:** Builds and keeps a long-term model of who someone is and what they want, refining it every time it acts for them.
**Tags:** Long-Term Memory · Preference Modeling · Cross-Session Learning
**Examples:**
- A personal agent that knows her sleep schedule, spending habits, and relationship patterns better than her closest friend, because it never stops watching
- An agent that quietly changes its recommendations after "learning" she's pregnant, before she's told anyone

---

## Artifact-type relevance (Day to day step)

| artifact_type | Suggested capabilities (shown first) |
|---------------|--------------------------------------|
| object | Biometric & Body Data, Real-Time Monitoring, Automation & Task Delegation |
| app | Personalization & Recommendation, Language & Conversation, Image & Video Generation, Data Aggregation & Identity Verification, Code Generation & Automation, Data Classification & Clustering |
| service | Language & Conversation, Predictive Scoring & Risk Analysis, Automation & Task Delegation, Code Generation & Automation |
| policy | Predictive Scoring & Risk Analysis, Data Aggregation & Identity Verification, Real-Time Monitoring, Data Classification & Clustering |
| narrative | Image & Video Generation, Language & Conversation, Personalization & Recommendation |
| agent | Automation & Task Delegation, Language & Conversation, Predictive Scoring & Risk Analysis, Data Aggregation & Identity Verification, Code Generation & Automation, Autonomous Planning & Execution, Negotiation & Transacting, Persistent Memory & Behavioral Modeling |

---

## Visual treatment
Neutral color styling, distinct from the category colors used by the 19 Narrative Cards, so users don't confuse the two systems (per `ffie_design_system.md`'s Stage 2 component guidance).
