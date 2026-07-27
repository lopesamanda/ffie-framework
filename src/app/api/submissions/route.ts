import { NextResponse } from "next/server";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { FutureQuadrant, PowerPosition } from "@/types/future";

export type SubmissionPayload = {
  sessionId: string;
  title: string;
  narrative: string;
  reflectionQuestion: string;
  location: string;
  year: number;
  characterName: string;
  characterAge?: number | null;
  characterGender?: string;
  characterRaceEthnicity?: string;
  role: string;
  aiFunction: string;
  desire: string;
  fear: string;
  values: string[];
  artifactName: string;
  publicPromise: string;
  hiddenFunction: string;
  artifactValues?: string[];
  tension: string;
  quadrant: FutureQuadrant;
  powerPosition?: PowerPosition;
  position: { x: number; y: number };
  placementJustification: string;
  cardProvenance: string[];
  drawSynthesis?: string;
  reflectionText: string;
  imageDataUrl?: string | null;
  submitToCommons: boolean;
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY — see docs/supabase_setup.md",
      },
      { status: 503 },
    );
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase client unavailable" }, { status: 503 });
  }

  let body: SubmissionPayload;
  try {
    body = (await request.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.submitToCommons) {
    return NextResponse.json(
      { error: "submitToCommons must be true to persist a submission" },
      { status: 400 },
    );
  }

  const required = [
    body.sessionId,
    body.title,
    body.narrative,
    body.location,
    body.year,
    body.characterName,
    body.role,
    body.desire,
    body.fear,
    body.artifactName,
    body.publicPromise,
    body.hiddenFunction,
    body.placementJustification,
  ];

  if (required.some((field) => !field?.toString().trim())) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (body.values.length !== 3) {
    return NextResponse.json(
      { error: "Exactly three non-negotiable values are required" },
      { status: 400 },
    );
  }

  const artifactValues = body.artifactValues ?? [];
  if (artifactValues.length < 2 || artifactValues.length > 4) {
    return NextResponse.json(
      { error: "Select 2–4 embedded artifact values" },
      { status: 400 },
    );
  }

  if (!Number.isFinite(body.year) || body.year < 2000) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  let imageUrl: string | null = null;

  if (body.imageDataUrl?.startsWith("data:")) {
    const match = body.imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image data URL format" },
        { status: 400 },
      );
    }

    const [, mime, base64] = match;
    const ext = mime.includes("png")
      ? "png"
      : mime.includes("webp")
        ? "webp"
        : "jpg";
    const path = `${body.sessionId}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(base64, "base64");

    const { error: uploadError } = await supabase.storage
      .from("submissions")
      .upload(path, buffer, { contentType: mime, upsert: true });

    if (uploadError) {
      console.error(
        "[submissions] Supabase storage upload failed:",
        uploadError.message,
        uploadError,
      );
      return NextResponse.json(
        { error: `Image upload failed: ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: publicUrl } = supabase.storage
      .from("submissions")
      .getPublicUrl(path);
    imageUrl = publicUrl.publicUrl;
  }

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      session_id: body.sessionId,
      status: "pending",
      title: body.title,
      narrative: body.narrative,
      reflection_question: body.reflectionQuestion,
      location: body.location,
      year: body.year,
      character_name: body.characterName,
      character_age: body.characterAge ?? null,
      character_gender: body.characterGender || null,
      character_race_ethnicity: body.characterRaceEthnicity || null,
      character_role: body.role,
      character_ai_function: body.aiFunction || null,
      character_desire: body.desire,
      character_fear: body.fear,
      character_values: body.values,
      artifact_name: body.artifactName,
      artifact_public_promise: body.publicPromise,
      artifact_hidden_function: body.hiddenFunction,
      artifact_values: artifactValues,
      tension: body.tension,
      quadrant: body.quadrant,
      power_position:
        body.powerPosition === "hegemonic" ? "hegemonic" : "marginalized",
      position_x: body.position.x,
      position_y: body.position.y,
      placement_justification: body.placementJustification,
      card_provenance: body.cardProvenance,
      draw_synthesis: body.drawSynthesis?.trim() || null,
      reflection_text: body.reflectionText,
      image_url: imageUrl,
    })
    .select("id, status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, status: data.status });
}
