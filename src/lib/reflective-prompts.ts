export const REFLECTIVE_FEMINIST_PROMPTS = [
  "Whose bodies are sustained by this technology?",
  "Where does care reside in this artifact?",
  "What friction does this resolve — and for whom?",
] as const;

/** Stable pick for a session — same prompt if called again with the same seed. */
export function pickReflectivePrompt(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return REFLECTIVE_FEMINIST_PROMPTS[hash % REFLECTIVE_FEMINIST_PROMPTS.length];
}
