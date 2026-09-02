import { images, type Photo } from "./images";
import {
  hotelAmenitiesWithExtras,
  hotelRoomAmenities,
  villaRoomAmenities,
  villaConfigurations,
  type AmenityGroup,
  type VillaConfiguration,
} from "./amenities";

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads";

function photo(path: string, alt: string): Photo {
  return { src: `${UPLOADS}/${path}`, alt };
}

/**
 * Room types, using the slugs the live menu uses so existing links survive.
 *
 * Descriptions, floor areas, occupancy and walking distances are transcribed
 * from the live room pages. `source: "live"` means the copy came off the
 * client's own page; `source: "pending"` means that page has not been read
 * yet and the text here is a placeholder — do not launch those.
 */

export interface Room {
  slug: string;
  name: string;
  /** One line for the rooms grid. */
  summary: string;
  /** Full description from the live page. */
  body: string[];
  photos: Photo[];
  sizeSqm: number | null;
  /** Range, for the villas. */
  sizeSqmMax?: number | null;
  sleeps: number | null;
  /** e.g. "Breakfast for 2 pax". */
  breakfast: string | null;
  /** Walk to the beach and pool, as the client states it. */
  distance: string | null;
  amenityGroups: AmenityGroup[];
  /** Only the villas have these. */
  configurations?: VillaConfiguration[];
  source: "live" | "pending";
}

export const rooms: Room[] = [
  {
    slug: "superior-room",
    name: "Superior Room",
    summary:
      "40 square meters with a private veranda, for up to 4 guests, a 3 to 5-minute stroll from the beach and pool.",
    body: [
      "Experience comfort in our Superior Rooms, each offering 40 square meters of space and a private veranda that allows you to unwind and recharge. Perfect for up to 4 guests, these rooms are just a 3 to 5-minute stroll from the beach and pool.",
    ],
    photos: [
      ...images.rooms.superior,
      photo("2020/11/Superior_3-1.png", "Superior Room"),
    ],
    sizeSqm: 40,
    sleeps: 4,
    breakfast: "Breakfast for 2 pax",
    distance: "3 to 5-minute walk to the beach and pool",
    amenityGroups: hotelRoomAmenities,
    source: "live",
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    summary:
      "40 square meters in the hotel building, with a private veranda overlooking the resort.",
    body: [
      "Discover our 40-square meter Deluxe Rooms, located in our hotel building. Each room features a private veranda with a panoramic view of the resort. Choose between two double beds, ideal for up to 4 guests, or a king-sized bed with the option for an additional bed, accommodating up to 3 guests. The rooms are a 2-minute walk away from the beach and pool.",
    ],
    photos: [...images.rooms.deluxe],
    sizeSqm: 40,
    sleeps: 4,
    breakfast: "Breakfast for 2 pax",
    distance: "2-minute walk to the beach and pool",
    amenityGroups: hotelRoomAmenities,
    source: "live",
  },
  {
    slug: "deluxe-room-swim-up",
    name: "Deluxe Room Swim Up",
    summary:
      "40 square meters with direct access to the pool from your private veranda.",
    body: [
      "Indulge in relaxation with our Deluxe Swim-Up Rooms. Each 40-square meter room offers direct access to the pool from your private veranda. Located 2 minutes from the beach, these rooms are designed to accommodate up to 4 guests.",
    ],
    photos: [
      photo("2021/02/deluxe_swim_up_room_1.jpg", "Deluxe Swim-Up Room"),
      photo("2021/02/swim-up-2-e1624612909595.jpg", "Deluxe Swim-Up Room"),
      photo("2021/02/swim-up-edit.jpg", "Deluxe Swim-Up Room"),
      photo("2021/06/Swim-Up.jpeg", "Deluxe Swim-Up Room"),
      photo("2021/01/aureo_swim_up.jpg", "Swim-up pool access"),
    ],
    sizeSqm: 40,
    sleeps: 4,
    breakfast: "Breakfast for 2 pax",
    distance: "2 minutes from the beach, direct pool access from the veranda",
    amenityGroups: hotelRoomAmenities,
    source: "live",
  },
  {
    slug: "family-room",
    name: "Family Room",
    summary:
      "70 square meters with two bedrooms and two bathrooms, for up to 6 guests.",
    body: [
      "Our spacious Family Rooms, spanning 70 square meters in size, are designed with families in mind, comfortably accommodating up to 6 guests. Each room features two separate bedrooms, two bathrooms, and a private veranda, providing ample space for everyone to bond, relax, and unwind. Conveniently located just 2 minutes from the beach and pool, the Family Room offers a perfect blend of comfort and accessibility.",
    ],
    photos: [
      photo("2021/03/Family-1.jpg", "Family Room"),
      photo("2021/03/Family-2.jpg", "Family Room"),
      photo("2021/03/Family-3.jpg", "Family Room"),
      photo("2021/03/Family-4.jpg", "Family Room"),
    ],
    sizeSqm: 70,
    sleeps: 6,
    breakfast: "Breakfast for 4 pax",
    distance: "2-minute walk to the beach and pool",
    amenityGroups: hotelRoomAmenities,
    source: "live",
  },
  {
    slug: "family-room-swim-up",
    name: "Family Room Swim Up",
    summary:
      "70 square meters with two bedrooms, two bathrooms and direct pool access for up to 6 guests.",
    body: [
      "Enjoy the luxury of direct pool access right from your private veranda in our Family Swim-Up Room. The 70-square meter space is perfect for a family of up to 6 guests, featuring two bedrooms and two bathrooms. Plus, with the beach and pool just 2 minutes away, you'll have the ideal setting for a memorable family getaway.",
    ],
    photos: [
      photo("2021/03/Family-1.jpg", "Family Swim-Up Room"),
      photo("2021/03/Family-2.jpg", "Family Swim-Up Room"),
      photo("2021/03/Family-3.jpg", "Family Swim-Up Room"),
      photo("2021/03/Family-4.jpg", "Family Swim-Up Room"),
    ],
    sizeSqm: 70,
    sleeps: 6,
    breakfast: "Breakfast for 4 pax",
    distance: "2 minutes from the beach, direct pool access from the veranda",
    amenityGroups: hotelRoomAmenities,
    source: "live",
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    summary:
      "70 square meters with its own dining and living room, and a private veranda with direct pool access.",
    body: [
      "The Executive Suite offers 70 square meters of refined comfort, perfectly suited for up to 4 guests. Enjoy private time in your own dining and living room, relax in your private veranda with direct pool access, take a 2-minute walk to the beach for a change in scenery.",
    ],
    photos: [
      photo("2021/03/Exec-1.jpg", "Executive Suite"),
      photo("2021/03/Exec-2.jpg", "Executive Suite"),
      photo("2021/03/Exec-3.jpg", "Executive Suite"),
      photo("2021/03/Exec-4.jpg", "Executive Suite"),
      photo("2021/03/Exec-5.jpg", "Executive Suite"),
    ],
    sizeSqm: 70,
    sleeps: 4,
    breakfast: "Breakfast for 2 pax",
    distance: "2-minute walk to the beach, direct pool access from the veranda",
    // The only room that publishes the complimentary massage.
    amenityGroups: hotelAmenitiesWithExtras([
      "Complimentary whole body massage for 2 pax",
    ]),
    source: "live",
  },
  {
    slug: "villa",
    name: "Villa Rooms",
    summary:
      "37 to 42 square meters with a private veranda and a choice of pool, garden, beach or lagoon view.",
    body: [
      "Our villa rooms range from 37 to 42 square meters, each offering a private veranda and stunning seascape views. Perfect for up to 4 guests, these rooms provide a choice of Pool, Garden, Beach, or Lagoon views to suit your preference. Located just a few steps from the beach, the Villa Rooms offer a serene retreat for your stay.",
    ],
    photos: [
      photo("2024/11/15f2263c-4047-4386-bb48-c3158cdc59d2.jpg", "Villa Room, lagoon view"),
      photo("2024/11/5e10c51e-a9be-4652-9963-6c5b9e4edefa.jpg", "Villa Room, beach front"),
      photo("2024/11/ee7d3f7e-f06a-4d71-b39f-186606b32c00.jpg", "Villa Room, pool view"),
      photo("2024/11/c9b8b178-be5b-42cd-957c-9996cd57c389.jpg", "Villa Room, garden view"),
    ],
    sizeSqm: 37,
    sizeSqmMax: 42,
    sleeps: 4,
    // The live page states no breakfast allowance for this room type.
    breakfast: null,
    distance: "A few steps from the beach",
    amenityGroups: villaRoomAmenities,
    source: "live",
  },
  {
    slug: "luxury-villas",
    name: "Luxury Pool Villas",
    summary:
      "Ten villas from 177 to 230 square meters, each with its own private pool, a few steps from the beach.",
    body: [
      "Escape to our exclusive and luxurious The Luxury Villas by Aureo. Each villa offers its own private pool and is located just a few steps from the beach with sizes ranging from 177sqm to 230sqm.",
    ],
    photos: [
      photo("2023/02/1-BEDROOM-1.png", "One-bedroom Luxury Pool Villa"),
      photo("2023/02/1-BEDROOM-5-1-scaled.jpeg", "Villa pool view"),
      photo("2023/02/1-BEDROOM-4-1.png", "Villa living room"),
      photo("2023/02/1-BEDROOM-3-2.png", "Villa living room"),
      photo("2023/02/1-BEDROOM-2-1.png", "Villa bathtub"),
      photo("2023/02/2-BEDROOM-5.png", "Two-bedroom villa, first bedroom"),
      photo("2023/02/2-BEDROOM-1.png", "Two-bedroom villa, second bedroom"),
      photo("2023/02/2-BEDROOM-2.png", "Two-bedroom villa living room"),
      photo("2023/02/2-BEDROOM-3.png", "Two-bedroom villa pool"),
      photo("2024/08/lv1.jpg", "The Luxury Villas by Aureo"),
      photo("2024/08/lv2.jpg", "The Luxury Villas by Aureo"),
      photo("2024/08/lv3.jpg", "The Luxury Villas by Aureo"),
      photo("2024/08/lv4.jpg", "The Luxury Villas by Aureo"),
    ],
    sizeSqm: 177,
    sizeSqmMax: 230,
    sleeps: null,
    breakfast: null,
    distance: "A few steps from the beach",
    amenityGroups: [],
    configurations: villaConfigurations,
    source: "live",
  },
  {
    slug: "condo",
    name: "Condo",
    summary: "Sea Park condominium units on the resort shoreline.",
    // TODO: read https://www.aureohotels.com/rooms/condo/
    body: ["Sea Park condominium units, on the same shoreline as the resort."],
    photos: [images.facilities.exterior, images.facilities.grounds],
    sizeSqm: null,
    sleeps: null,
    breakfast: null,
    distance: null,
    amenityGroups: [],
    source: "pending",
  },
];

export function roomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export const bookableRooms = rooms.filter((room) => room.slug !== "condo");

/** The villa reservations line, which differs from the main resort number. */
export const villaReservations = {
  telephone: ["(072) 888 0836", "(072) 888 0837"],
  mobile: [
    "+63 917 822 5799",
    "+63 917 620 7944",
    "+63 917 630 6633",
    "+63 939 562 3693",
  ],
  video: "https://youtu.be/Z6fPry3DK78",
};
