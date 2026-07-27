import { NextResponse } from "next/server";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { FutureQuadrant, PowerPosition } from "@/types/future";

export type SubmissionPayload = {
  sessionId: string;
  title: string;
  narrative: string;
  reflectionQuestion: string;
  location: string;
  characterName: string;
  role: string;
  aiFunction: string;
  desire: string;
  fear: string;
  values: string[];
  artifactName: string;
  publicPromise: string;
  hiddenFunction: string;
  tension: string;
  quadrant: FutureQuadrant;
  powerPosition?: PowerPosition;
  position: { x: number; y: number };
  placementJustification: string;
  cardProvenance: string[];
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

  let imageUrl: string | null = null;

  if (body.imageDataUrl?.startsWith("data:")) {
    const match = body.imageDataUrl.match(/^data:(.+);base64,(.+)$/);
    if (match) {
      const [, mime, base64] = match;
      const ext = mime.includes("png") ? "png" : "jpg";
      const path = `${body.sessionId}/${Date.now()}.${ext}`;
      const buffer = Buffer.from(base64, "base64");

      const { error: uploadError } = await supabase.storage
        .from("submissions")
        .upload(path, buffer, { contentType: mime, upsert: true });

      if (!uploadError) {
        const { data: publicUrl } = supabase.storage
          .from("submissions")
          .getPublicUrl(path);
        imageUrl = publicUrl.publicUrl;
      }
    }
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
      character_name: body.characterName,
      character_role: body.role,
      character_ai_function: body.aiFunction || null,
      character_desire: body.desire,
      character_fear: body.fear,
      character_values: body.values,
      artifact_name: body.artifactName,
      artifact_public_promise: body.publicPromise,
      artifact_hidden_function: body.hiddenFunction,
      tension: body.tension,
      quadrant: body.quadrant,
      power_position:
        body.powerPosition === "hegemonic" ? "hegemonic" : "marginalized",
      position_x: body.position.x,
      position_y: body.position.y,
      placement_justification: body.placementJustification,
      card_provenance: body.cardProvenance,
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
