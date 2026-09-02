import { readStore, type PaymentMethod, type RoomSettings } from "./store";
import { rooms as seedRooms, type Room } from "./rooms";

/**
 * The public site reads through here, never from the seed data directly.
 *
 * Seed values in src/lib/rooms.ts are the starting point; anything staff
 * have edited in the admin overrides them. A room the admin has never
 * touched still renders, using its seed values.
 */

export interface LiveRoom extends Room {
  /** True when the copy is still a placeholder — see rooms.ts `source`. */
  nightlyRateFrom: number | null;
  roomsAvailable: number | null;
  published: boolean;
}

function applySettings(room: Room, settings?: RoomSettings): LiveRoom {
  return {
    ...room,
    // Admin photos replace the seed set entirely when present, so staff can
    // remove a photo rather than only ever adding to it.
    photos: settings?.photos?.length
      ? settings.photos.map((src) => ({ src, alt: room.name }))
      : room.photos,
    nightlyRateFrom: settings?.nightlyRateFrom ?? null,
    roomsAvailable: settings?.roomsAvailable ?? null,
    published: settings?.published ?? true,
  };
}

/** Every room, including unpublished ones. For the admin. */
export async function getAllRooms(): Promise<LiveRoom[]> {
  const store = await readStore();
  return seedRooms.map((room) => applySettings(room, store.rooms[room.slug]));
}

/** Published rooms only. For the public site. */
export async function getPublishedRooms(): Promise<LiveRoom[]> {
  return (await getAllRooms()).filter((room) => room.published);
}

export async function getRoom(slug: string): Promise<LiveRoom | undefined> {
  return (await getAllRooms()).find((room) => room.slug === slug);
}

export async function getPaymentMethods(): Promise<{
  methods: PaymentMethod[];
  note: string;
}> {
  const store = await readStore();
  return {
    methods: store.payment.methods.filter((method) => method.enabled),
    note: store.payment.note,
  };
}

const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});

/** "₱8,500" — rates are quoted in whole pesos. */
export function formatRate(centavos: number): string {
  return peso.format(centavos / 100);
}
