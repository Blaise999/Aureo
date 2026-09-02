/**
 * Pulls the resort's photography off the old WordPress install and into
 * public/images, then writes a manifest with real dimensions and alt text.
 *
 *   npm run fetch-images
 *   npm run fetch-images -- --dry-run     list what it would download
 *   npm run fetch-images -- --force       re-download files already present
 *   npm run fetch-images -- --limit 20    stop after N (useful for a test run)
 *
 * It reads the WordPress REST API rather than the twenty-odd URLs hardcoded
 * in src/lib/images.ts, so you get the whole library at original resolution
 * instead of the Elementor crops the front end happens to reference.
 *
 * SAFETY: that install is compromised (see README). Its uploads directory
 * has directories in it that are not photography. Every download here is
 * checked against its content-type AND its magic bytes, and anything that
 * is not a real image is refused and reported rather than written to disk.
 */

import { mkdir, writeFile, access, stat } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "images");
const MANIFEST = join(ROOT, "src", "lib", "media-manifest.json");

// Overridable so you can point this at a staging copy, or at a local
// mock while testing. Defaults to the live site.
const ORIGIN = process.env.AUREO_ORIGIN ?? "https://www.aureohotels.com";
const API = `${ORIGIN}/wp-json/wp/v2/media`;

const CONCURRENCY = 5;
const RETRIES = 3;
const TIMEOUT_MS = 30_000;

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const LIMIT = (() => {
  const index = args.indexOf("--limit");
  return index !== -1 && args[index + 1] ? Number(args[index + 1]) : Infinity;
})();

/* ------------------------------------------------------------------------ */
/* Image validation                                                          */
/* ------------------------------------------------------------------------ */

const SIGNATURES = [
  { ext: ".jpg", bytes: [0xff, 0xd8, 0xff] },
  { ext: ".png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { ext: ".gif", bytes: [0x47, 0x49, 0x46, 0x38] },
  { ext: ".webp", bytes: [0x52, 0x49, 0x46, 0x46] }, // RIFF....WEBP
];

/**
 * A file is only written if the bytes on the wire actually begin like an
 * image. Trusting the extension or the content-type header would be fine on
 * a healthy site. This one is not healthy.
 */
function sniff(buffer) {
  for (const signature of SIGNATURES) {
    const matches = signature.bytes.every(
      (byte, index) => buffer[index] === byte,
    );
    if (!matches) continue;
    if (signature.ext === ".webp") {
      if (buffer.subarray(8, 12).toString("ascii") !== "WEBP") continue;
    }
    return signature.ext;
  }
  return null;
}

/** Anything living under these paths is not the client's photography. */
const SUSPECT_PATHS = [/\/slot/i, /\/togel/i, /\/gacor/i, /\.php$/i];

function isSuspect(url) {
  return SUSPECT_PATHS.some((pattern) => pattern.test(url));
}

/* ------------------------------------------------------------------------ */
/* Fetch helpers                                                             */
/* ------------------------------------------------------------------------ */

async function request(url, { asBuffer = false } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": "aureo-site-migration/1.0" },
      });
      clearTimeout(timer);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return asBuffer
        ? {
            buffer: Buffer.from(await response.arrayBuffer()),
            contentType: response.headers.get("content-type") ?? "",
          }
        : await response.json();
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      // A 404 or a 400 will not fix itself on a retry.
      if (/HTTP 40[04]/.test(String(error.message))) break;
      if (attempt < RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
      }
    }
  }

  throw lastError;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------------ */
/* Step 1 — read the media library                                           */
/* ------------------------------------------------------------------------ */

async function listMedia() {
  const items = [];
  let page = 1;

  process.stdout.write("Reading the media library");

  while (page <= 60) {
    const url =
      `${API}?per_page=100&page=${page}&media_type=image` +
      `&_fields=id,slug,alt_text,title,source_url,media_details,date`;

    let batch;
    try {
      batch = await request(url);
    } catch (error) {
      // WordPress returns 400 once you page past the end of the library.
      if (/HTTP 400/.test(String(error.message))) break;
      throw error;
    }

    if (!Array.isArray(batch) || batch.length === 0) break;

    items.push(...batch);
    process.stdout.write(".");
    if (batch.length < 100) break;
    page += 1;
  }

  process.stdout.write("\n");
  return items;
}

/* ------------------------------------------------------------------------ */
/* Step 2 — download                                                         */
/* ------------------------------------------------------------------------ */

/** Runs `worker` over `items` with a fixed number of requests in flight. */
async function pool(items, limit, worker) {
  let cursor = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
    (async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        await worker(items[index]);
      }
    })(),
  );

  await Promise.all(runners);
}

async function download(item) {
  const url = item.source_url;
  const filename = basename(new URL(url).pathname);
  const target = join(OUT_DIR, filename);

  if (isSuspect(url)) {
    return { status: "refused", filename, url, reason: "suspect path" };
  }

  if (!FORCE && (await exists(target))) {
    const info = await stat(target);
    return { status: "skipped", filename, url, bytes: info.size };
  }

  if (DRY_RUN) {
    return { status: "would-download", filename, url };
  }

  const { buffer, contentType } = await request(url, { asBuffer: true });

  if (!contentType.startsWith("image/")) {
    return {
      status: "refused",
      filename,
      url,
      reason: `content-type ${contentType || "missing"}`,
    };
  }

  if (!sniff(buffer)) {
    return { status: "refused", filename, url, reason: "bytes are not an image" };
  }

  await writeFile(target, buffer);
  return { status: "downloaded", filename, url, bytes: buffer.length };
}

/* ------------------------------------------------------------------------ */
/* Main                                                                      */
/* ------------------------------------------------------------------------ */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const media = await listMedia();

  if (media.length === 0) {
    console.error(
      "\nThe media library returned nothing. Either the REST API is " +
        "disabled or the site is down. Ask the client for a zip of " +
        "wp-content/uploads instead.",
    );
    process.exitCode = 1;
    return;
  }

  const queue = media.slice(0, LIMIT);
  console.log(
    `${media.length} images in the library` +
      (queue.length < media.length ? `, taking ${queue.length}` : "") +
      (DRY_RUN ? " (dry run)" : "") +
      "\n",
  );

  const outcomes = [];

  await pool(queue, CONCURRENCY, async (item) => {
    try {
      const result = await download(item);
      outcomes.push({ ...result, item });

      const mark = {
        downloaded: "✓",
        skipped: "·",
        "would-download": "→",
        refused: "✗",
      }[result.status];

      const size = result.bytes ? ` ${Math.round(result.bytes / 1024)} KB` : "";
      console.log(`  ${mark} ${result.filename}${size}`);
    } catch (error) {
      const filename = basename(new URL(item.source_url).pathname);
      outcomes.push({
        status: "failed",
        filename,
        url: item.source_url,
        reason: error.message,
        item,
      });
      console.log(`  ✗ ${filename} — ${error.message}`);
    }
  });

  /* ---- manifest ------------------------------------------------------- */

  const usable = outcomes.filter(
    (outcome) => outcome.status === "downloaded" || outcome.status === "skipped",
  );

  if (!DRY_RUN) {
    const manifest = {
      generated: new Date().toISOString(),
      source: ORIGIN,
      note:
        "Generated by scripts/fetch-images.mjs. Alt text comes from the " +
        "client's media library and is often empty — rewrite it before launch.",
      items: usable
        .map(({ item, filename }) => ({
          file: `/images/${filename}`,
          width: item.media_details?.width ?? null,
          height: item.media_details?.height ?? null,
          alt: (item.alt_text || "").trim(),
          title: (item.title?.rendered || "").trim(),
          uploaded: item.date ?? null,
          originalUrl: item.source_url,
        }))
        .sort((a, b) => a.file.localeCompare(b.file)),
    };

    await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  /* ---- report --------------------------------------------------------- */

  const count = (status) =>
    outcomes.filter((outcome) => outcome.status === status).length;

  console.log("\n" + "─".repeat(52));

  if (DRY_RUN) {
    console.log(`Would download ${count("would-download")}.`);
  } else {
    console.log(
      `Downloaded ${count("downloaded")}, already had ${count("skipped")}.`,
    );
    console.log("Manifest written to src/lib/media-manifest.json");
  }

  const refused = outcomes.filter((outcome) => outcome.status === "refused");
  const failed = outcomes.filter((outcome) => outcome.status === "failed");

  if (refused.length > 0) {
    console.log(`\nRefused ${refused.length} — not images:`);
    refused.forEach((outcome) =>
      console.log(`  ${outcome.filename} — ${outcome.reason}`),
    );
    console.log(
      "\nExpected on this install. Do not chase these; they are part of " +
        "what is wrong with the old site.",
    );
  }

  if (failed.length > 0) {
    console.log(`\nFailed ${failed.length}:`);
    failed.forEach((outcome) =>
      console.log(`  ${outcome.filename} — ${outcome.reason}`),
    );
    console.log("\nRe-run to retry, or ask the client for these directly.");
    process.exitCode = 1;
  }

  const missingAlt = usable.filter(
    ({ item }) => !(item.alt_text || "").trim(),
  ).length;

  if (missingAlt > 0 && !DRY_RUN) {
    console.log(
      `\n${missingAlt} of ${usable.length} have no alt text. Worth writing ` +
        "before launch — it was a gap on the old site too.",
    );
  }
}

main().catch((error) => {
  console.error("\nFetch failed:", error.message);
  process.exitCode = 1;
});
