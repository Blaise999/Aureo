import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, adminConfig, verifySession } from "@/lib/auth";

/**
 * Admin image upload.
 *
 * Files land in public/uploads and are served straight from there. Like the
 * JSON store, this needs a persistent filesystem — on Vercel, swap the
 * write for an S3/R2 put and return the object URL instead.
 */

const MAX_BYTES = 8 * 1024 * 1024;

/** content-type is client-supplied, so the bytes are checked as well. */
const TYPES: Record<string, { ext: string; magic: number[] }> = {
  "image/jpeg": { ext: ".jpg", magic: [0xff, 0xd8, 0xff] },
  "image/png": { ext: ".png", magic: [0x89, 0x50, 0x4e, 0x47] },
  "image/webp": { ext: ".webp", magic: [0x52, 0x49, 0x46, 0x46] },
};

export async function POST(request: Request) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  let secret: string;
  try {
    secret = adminConfig().sessionSecret;
  } catch {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 500 });
  }

  if (!(await verifySession(token, secret))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "That file is larger than 8 MB. Resize it and try again." },
      { status: 400 },
    );
  }

  const expected = TYPES[file.type];
  if (!expected) {
    return NextResponse.json(
      { error: "Only JPEG, PNG and WebP images can be uploaded." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const magicMatches = expected.magic.every(
    (byte, index) => buffer[index] === byte,
  );
  if (!magicMatches) {
    return NextResponse.json(
      { error: "That file is not the image type it claims to be." },
      { status: 400 },
    );
  }

  // Name is generated, never taken from the upload — a client-supplied
  // filename is a path traversal waiting to happen.
  const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${expected.ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/${name}` });
}
