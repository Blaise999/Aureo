/**
 * Admin authentication.
 *
 * Uses Web Crypto only — no Node built-ins — so the same code runs in
 * middleware (edge runtime) and in server actions (node runtime).
 *
 * Password hashing is PBKDF2-SHA256. Sessions are a signed cookie: the
 * payload is not secret, but it cannot be forged without ADMIN_SESSION_SECRET.
 *
 * There is one admin account, configured by environment variable. That is
 * deliberate — a handful of staff sharing one login is the actual situation,
 * and a user table is not worth building until someone asks for per-person
 * accounts and an audit trail.
 */

const PBKDF2_ITERATIONS = 210_000;
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

export const SESSION_COOKIE = "aureo_admin";

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/** Constant-time comparison, so a wrong password cannot be timed. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/* -------------------------------------------------------------------------- */
/* Passwords                                                                   */
/* -------------------------------------------------------------------------- */

export async function hashPassword(
  password: string,
  saltHex?: string,
): Promise<string> {
  const salt = saltHex
    ? fromHex(saltHex)
    : crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt.buffer as ArrayBuffer)}$${toHex(bits)}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [scheme, , saltHex] = stored.split("$");
  if (scheme !== "pbkdf2" || !saltHex) return false;
  const candidate = await hashPassword(password, saltHex);
  return safeEqual(candidate, stored);
}

/* -------------------------------------------------------------------------- */
/* Sessions                                                                    */
/* -------------------------------------------------------------------------- */

async function signingKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/** Returns a cookie value of the form `<expiry>.<hmac>`. */
export async function createSession(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  const key = await signingKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return `${payload}.${toHex(signature)}`;
}

export async function verifySession(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token || !secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const key = await signingKey(secret);
  const expected = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  return safeEqual(toHex(expected), signature);
}

/* -------------------------------------------------------------------------- */
/* Config                                                                      */
/* -------------------------------------------------------------------------- */

export interface AdminConfig {
  passwordHash: string;
  sessionSecret: string;
}

/**
 * Throws rather than falling back to a default. A site that silently runs
 * with a known password is worse than one that refuses to start.
 */
export function adminConfig(): AdminConfig {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!passwordHash || !sessionSecret) {
    throw new Error(
      "ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET must be set. " +
        "Run `npm run admin:password` to generate them.",
    );
  }

  return { passwordHash, sessionSecret };
}
