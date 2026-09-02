import Link from "next/link";
import { getAllRooms } from "@/lib/content";
import { readStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const rooms = await getAllRooms();
  const store = await readStore();

  const priced = rooms.filter((room) => room.nightlyRateFrom !== null).length;
  const enabledMethods = store.payment.methods.filter(
    (method) => method.enabled,
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-body-text">Overview</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/rooms"
          className="block rounded border border-hairline p-6 hover:border-gold"
        >
          <h2 className="info-title">Rooms</h2>
          <p className="description mt-2 text-sm">
            {priced} of {rooms.length} room types have a rate set.
          </p>
        </Link>

        <Link
          href="/admin/payment"
          className="block rounded border border-hairline p-6 hover:border-gold"
        >
          <h2 className="info-title">Payment options</h2>
          <p className="description mt-2 text-sm">
            {enabledMethods}{" "}
            {enabledMethods === 1 ? "method is" : "methods are"} visible to
            customers.
          </p>
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted">
        {store.updatedAt
          ? `Last edited ${new Date(store.updatedAt).toLocaleString("en-PH")}`
          : "Nothing has been edited yet."}
      </p>
    </div>
  );
}
