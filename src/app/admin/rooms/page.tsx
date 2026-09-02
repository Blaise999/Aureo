import { getAllRooms } from "@/lib/content";
import { RoomEditor } from "./RoomEditor";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div>
      <h1 className="text-2xl font-bold text-body-text">Rooms</h1>
      <p className="description mt-2 max-w-[60ch] text-sm">
        Rates shown here are the &ldquo;from&rdquo; price displayed on the
        website. They do not change what guests are charged — bookings and
        payment run through the booking engine, so update both.
      </p>

      <div className="mt-8 space-y-4">
        {rooms.map((room) => (
          <RoomEditor
            key={room.slug}
            slug={room.slug}
            name={room.name}
            rate={room.nightlyRateFrom}
            available={room.roomsAvailable}
            photos={room.photos.map((photo) => photo.src)}
            published={room.published}
          />
        ))}
      </div>
    </div>
  );
}
