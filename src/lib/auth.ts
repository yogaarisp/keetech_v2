import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "keetech_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function isUsingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getAdminPassword()).update(payload).digest("hex");
}

function createToken(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  return `${expires}.${sign(String(expires))}`;
}

function verifyToken(token: string): boolean {
  const [expiresStr, signature] = token.split(".");
  const expires = Number(expiresStr);
  if (!expiresStr || !signature || !Number.isFinite(expires) || expires < Date.now()) {
    return false;
  }
  const expected = sign(expiresStr);
  const a = Buffer.from(signature, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function verifyPassword(input: string): boolean {
  // Jangan pernah menerima password default di mode produksi.
  if (process.env.NODE_ENV === "production" && isUsingDefaultPassword()) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(getAdminPassword()).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token ? verifyToken(token) : false;
}

export async function signIn(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
