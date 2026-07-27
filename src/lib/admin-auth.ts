import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ffie_admin";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export function createAdminSessionToken() {
  const password = getAdminPassword();
  if (!password) return null;
  return createHmac("sha256", password)
    .update("ffie-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function verifyAdminSessionToken(token: string | undefined) {
  const expected = createAdminSessionToken();
  if (!expected || !token) return false;
  return safeEqual(token, expected);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
