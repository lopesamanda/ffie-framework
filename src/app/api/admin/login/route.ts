import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  createAdminSessionToken,
  isAdminPasswordConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "ADMIN_PASSWORD is not set. Add it to .env.local — see .env.example.",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const password = body.password?.toString() ?? "";
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Unable to create session" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieOptions(token));
  return response;
}
