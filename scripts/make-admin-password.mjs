/**
 * Generates the two environment variables the admin panel needs.
 *
 *   npm run admin:password -- "your chosen password"
 *
 * Paste the output into .env.local (development) or your host's
 * environment settings (production). The password itself is never stored.
 */

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:password -- "your chosen password"');
  process.exit(1);
}

if (password.length < 12) {
  console.error(
    "Use at least 12 characters. This is the only thing standing between " +
      "the internet and the client's payment details.",
  );
  process.exit(1);
}

const ITERATIONS = 210_000;
const encoder = new TextEncoder();

const toHex = (buffer) =>
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const salt = crypto.getRandomValues(new Uint8Array(16));

const key = await crypto.subtle.importKey(
  "raw",
  encoder.encode(password),
  "PBKDF2",
  false,
  ["deriveBits"],
);

const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
  key,
  256,
);

const sessionSecret = toHex(crypto.getRandomValues(new Uint8Array(32)));

console.log("\nAdd these to .env.local — do not commit them:\n");
console.log(`ADMIN_PASSWORD_HASH="pbkdf2$${ITERATIONS}$${toHex(salt.buffer)}$${toHex(bits)}"`);
console.log(`ADMIN_SESSION_SECRET="${sessionSecret}"`);
console.log("");
