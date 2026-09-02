"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  adminConfig,
  createSession,
  verifyPassword,
  verifySession,
} from "@/lib/auth";
import {
  readStore,
  writeStore,
  type PaymentKind,
  type PaymentMethod,
} from "@/lib/store";

/**
 * Every mutating action re-checks the session. Middleware already gates
 * /admin, but server actions are reachable by POST regardless of routing,
 * so they must not rely on it.
 */
async function requireSession(): Promise<void> {
  const { sessionSecret } = adminConfig();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySession(token, sessionSecret))) {
    redirect("/admin/login");
  }
}

export type ActionState = { error?: string; ok?: string };

/* -------------------------------------------------------------------------- */
/* Session                                                                     */
/* -------------------------------------------------------------------------- */

export async function login(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  let config;
  try {
    config = adminConfig();
  } catch (error) {
    return { error: (error as Error).message };
  }

  if (!(await verifyPassword(password, config.passwordHash))) {
    // Deliberately vague, and slowed slightly to blunt guessing.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Incorrect password." };
  }

  (await cookies()).set(SESSION_COOKIE, await createSession(config.sessionSecret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* -------------------------------------------------------------------------- */
/* Rooms                                                                       */
/* -------------------------------------------------------------------------- */

/** Accepts "8500", "8,500" or "₱8,500" and stores centavos. */
function parsePeso(input: string): number | null {
  const cleaned = input.replace(/[^\d.]/g, "").trim();
  if (!cleaned) return null;
  const pesos = Number(cleaned);
  if (!Number.isFinite(pesos) || pesos < 0) return null;
  return Math.round(pesos * 100);
}

function parseCount(input: string): number | null {
  const cleaned = input.replace(/[^\d]/g, "").trim();
  if (!cleaned) return null;
  const count = Number(cleaned);
  return Number.isFinite(count) && count >= 0 ? count : null;
}

export async function saveRoom(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const slug = String(formData.get("slug") ?? "");
  if (!slug) return { error: "Missing room." };

  const photos = String(formData.get("photos") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const invalid = photos.find(
    (url) => !/^(https?:\/\/|\/)/.test(url),
  );
  if (invalid) {
    return {
      error: `"${invalid}" is not a valid image URL. Use a full https:// address or a path beginning with /.`,
    };
  }

  const store = await readStore();
  store.rooms[slug] = {
    nightlyRateFrom: parsePeso(String(formData.get("rate") ?? "")),
    roomsAvailable: parseCount(String(formData.get("available") ?? "")),
    photos,
    published: formData.get("published") === "on",
  };

  await writeStore(store);

  revalidatePath("/");
  revalidatePath("/rooms");
  revalidatePath(`/rooms/${slug}`);
  revalidatePath("/admin/rooms");

  return { ok: "Saved." };
}

/* -------------------------------------------------------------------------- */
/* Payment                                                                     */
/* -------------------------------------------------------------------------- */

const KINDS: PaymentKind[] = ["bank", "gcash", "maya", "card", "other"];

export async function savePayment(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const ids = formData.getAll("id").map(String);

  const methods: PaymentMethod[] = ids.flatMap((id) => {
    const label = String(formData.get(`label-${id}`) ?? "").trim();
    // A row with no label is treated as deleted, which is how the
    // "remove" button works without a separate action.
    if (!label) return [];

    const kind = String(formData.get(`kind-${id}`) ?? "other") as PaymentKind;

    return [
      {
        id,
        kind: KINDS.includes(kind) ? kind : "other",
        label,
        accountName: String(formData.get(`accountName-${id}`) ?? "").trim(),
        accountNumber: String(formData.get(`accountNumber-${id}`) ?? "").trim(),
        instructions: String(formData.get(`instructions-${id}`) ?? "").trim(),
        enabled: formData.get(`enabled-${id}`) === "on",
      },
    ];
  });

  const store = await readStore();
  store.payment = {
    methods,
    note: String(formData.get("note") ?? "").trim(),
  };

  await writeStore(store);

  revalidatePath("/cart");
  revalidatePath("/admin/payment");

  return { ok: "Saved." };
}

export async function addPaymentMethod(): Promise<void> {
  await requireSession();

  const store = await readStore();
  store.payment.methods.push({
    id: crypto.randomUUID(),
    kind: "bank",
    label: "",
    accountName: "",
    accountNumber: "",
    instructions: "",
    enabled: false,
  });

  await writeStore(store);
  revalidatePath("/admin/payment");
}
