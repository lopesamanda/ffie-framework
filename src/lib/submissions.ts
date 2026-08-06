import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  FutureCountry,
  FutureEntry,
  FutureQuadrant,
  FutureStatus,
  PersonaSector,
  PowerPosition,
} from "@/types/future";

export type SubmissionRow = {
  id: string;
  status: FutureStatus;
  title: string;
  narrative: string;
  reflection_question: string | null;
  location: string;
  year: number;
  character_name: string;
  character_age: number | null;
  character_role: string;
  persona_sector: string | null;
  character_ai_function: string | null;
  character_desire: string;
  character_fear: string;
  character_values: string[];
  artifact_name: string;
  artifact_public_promise: string;
  artifact_hidden_function: string;
  artifact_values: string[];
  tension: string;
  quadrant: FutureQuadrant;
  power_position: PowerPosition;
  position_x: number;
  position_y: number;
  image_url: string | null;
  draw_synthesis: string | null;
  draw_synthesis_tensions: string | null;
  reflection_text: string | null;
  created_at: string;
};

export type AdminSubmissionListItem = {
  id: string;
  status: FutureStatus;
  title: string;
  narrative: string;
  character_name: string;
  artifact_name: string;
  quadrant: FutureQuadrant;
  power_position: PowerPosition;
  location: string;
  created_at: string;
};

const ADMIN_LIST_SELECT =
  "id, status, title, narrative, character_name, artifact_name, quadrant, power_position, location, created_at";

const PUBLIC_SELECT =
  "id, status, title, narrative, reflection_question, reflection_text, location, year, character_name, character_age, character_role, persona_sector, character_ai_function, character_desire, character_fear, character_values, artifact_name, artifact_public_promise, artifact_hidden_function, artifact_values, tension, quadrant, power_position, position_x, position_y, image_url, draw_synthesis, draw_synthesis_tensions, created_at";

function parseGroundedIn(reflectionText: string | null): string | undefined {
  if (!reflectionText) return undefined;
  const match = reflectionText.match(/Situated knowledge:\s*([\s\S]+?)(?:\n\n|$)/i);
  const value = match?.[1]?.trim();
  return value || undefined;
}

/** Infer Brazil/Portugal from free-text location for matrix colouring. */
export function inferCountry(location: string): FutureCountry {
  const lower = location.toLowerCase();
  if (
    /\b(portugal|português|portugues|lisboa|lisbon|porto|cascais|braga)\b/.test(
      lower,
    )
  ) {
    return "Portugal";
  }
  if (
    /\b(brazil|brasil|brasileir|recife|são paulo|sao paulo|rio de janeiro|salvador|belo horizonte)\b/.test(
      lower,
    )
  ) {
    return "Brazil";
  }
  return "Brazil";
}

export function mapSubmissionToFutureEntry(row: SubmissionRow): FutureEntry {
  return {
    id: row.id,
    collection: "future_commons",
    title: row.title,
    narrative: row.narrative,
    reflectionQuestion: row.reflection_question ?? "",
    country: inferCountry(row.location),
    year: row.year,
    character: {
      name: row.character_name,
      age: row.character_age ?? 0,
      role: row.character_role,
      sector: (row.persona_sector as PersonaSector | null) ?? undefined,
      aiFunction: row.character_ai_function ?? "",
      desire: row.character_desire,
      fear: row.character_fear,
      values: row.character_values ?? [],
    },
    artifact: {
      name: row.artifact_name,
      publicPromise: row.artifact_public_promise,
      hiddenFunction: row.artifact_hidden_function,
      values: row.artifact_values ?? [],
    },
    tension: row.tension,
    quadrant: row.quadrant,
    powerPosition: row.power_position,
    position: { x: row.position_x, y: row.position_y },
    status: row.status,
    imageUrl: row.image_url ?? undefined,
    drawSynthesis: row.draw_synthesis ?? undefined,
    drawSynthesisTensions: row.draw_synthesis_tensions ?? undefined,
    publishedAt: row.created_at,
    groundedIn: parseGroundedIn(row.reflection_text),
  };
}

export async function listSubmissionsForAdmin(): Promise<AdminSubmissionListItem[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("submissions")
    .select(ADMIN_LIST_SELECT)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to list submissions for admin:", error?.message);
    return [];
  }

  return data as AdminSubmissionListItem[];
}

export async function getPublishedSubmissions(): Promise<FutureEntry[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("submissions")
    .select(PUBLIC_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to load published submissions:", error?.message);
    return [];
  }

  return (data as SubmissionRow[]).map(mapSubmissionToFutureEntry);
}

export async function getPublishedSubmissionById(
  id: string,
): Promise<FutureEntry | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("submissions")
    .select(PUBLIC_SELECT)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error("Failed to load published submission:", error.message);
    }
    return null;
  }

  return mapSubmissionToFutureEntry(data as SubmissionRow);
}
