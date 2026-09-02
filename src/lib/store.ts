import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Editable content store.
 *
 * A JSON file on disk, written atomically. This is deliberately the
 * simplest thing that works for a handful of rooms and payment methods
 * edited a few times a month — swapping it for Postgres later means
 * reimplementing `readStore` and `writeStore` and nothing else.
 *
 * HOSTING: this needs a persistent filesystem. It works on a VPS, Fly.io,
 * Render, or Railway. It does NOT work on Vercel or Netlify serverless,
 * where the filesystem is read-only and resets between invocations. If the
 * client wants Vercel, move this to Postgres (Neon/Supabase) first.
 */

export interface RoomSettings {
  /** Nightly rate in centavos. Null hides the price on the public site. */
  nightlyRateFrom: number | null;
  /** How many of this room type exist. Null hides it. */
  roomsAvailable: number | null;
  /** Image URLs. May point at the old WordPress library or at /uploads. */
  photos: string[];
  /** Unpublished rooms disappear from the public site but are kept here. */
  published: boolean;
}

export type PaymentKind = "bank" | "gcash" | "maya" | "card" | "other";

export interface PaymentMethod {
  id: string;
  kind: PaymentKind;
  /** Shown to the customer, e.g. "BPI" or "GCash". */
  label: string;
  accountName: string;
  /**
   * Account or mobile number shown to the customer so they can pay.
   * This is published on the site by design — do not put anything here
   * that is not meant to be public, and never an API secret key.
   */
  accountNumber: string;
  instructions: string;
  enabled: boolean;
}

export interface StoreData {
  rooms: Record<string, RoomSettings>;
  payment: {
    methods: PaymentMethod[];
    /** Free text shown above the payment methods. */
    note: string;
  };
  updatedAt: string | null;
}

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

export const emptyStore: StoreData = {
  rooms: {},
  payment: {
    methods: [],
    note:
      "Payment is by bank transfer or e-wallet. Send your proof of payment " +
      "to reservations@aureohotels.com and we will confirm your order.",
  },
  updatedAt: null,
};

export async function readStore(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoreData>;

    // Merged against the empty store so a file written by an older version
    // of the app does not produce undefined property access at runtime.
    return {
      rooms: parsed.rooms ?? {},
      payment: {
        methods: parsed.payment?.methods ?? [],
        note: parsed.payment?.note ?? emptyStore.payment.note,
      },
      updatedAt: parsed.updatedAt ?? null,
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return emptyStore;

    // A corrupt file should be loud, not silently replaced with defaults —
    // silently reverting would look to staff like their edits vanished.
    throw new Error(
      `Could not read ${DATA_FILE}: ${(error as Error).message}`,
    );
  }
}

/** Writes to a temp file and renames, so a crash cannot truncate the store. */
export async function writeStore(data: StoreData): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const temp = `${DATA_FILE}.${process.pid}.tmp`;
  const payload = JSON.stringify(
    { ...data, updatedAt: new Date().toISOString() },
    null,
    2,
  );
  await fs.writeFile(temp, payload, "utf8");
  await fs.rename(temp, DATA_FILE);
}
