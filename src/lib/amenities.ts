/**
 * In-room amenities, transcribed from the live room pages.
 *
 * The hotel-building rooms (Superior, Deluxe, Family and their swim-up
 * variants, Executive Suite) all publish the identical amenity block, so it
 * lives here once. Only the breakfast allowance differs, which is why that
 * is a per-room field rather than part of this list.
 *
 * The Luxury Pool Villas publish a completely different, much longer list —
 * see `villaAmenities` below.
 */

export interface AmenityGroup {
  heading: string;
  items: string[];
}

export const hotelRoomAmenities: AmenityGroup[] = [
  {
    heading: "Entertainment",
    items: ["43 inch LED TV", "Satellite channels"],
  },
  {
    heading: "Room features",
    items: [
      "Air conditioned room",
      "Coffee and tea-making facilities",
      "Work desk",
      "In-room safe",
      "220V electrical sockets",
      "Mini-refrigerator",
      "Emergency lights",
      "Spacious wardrobe",
    ],
  },
  {
    heading: "Bathroom facilities",
    items: [
      "Bathrobe and slippers",
      "Hot and cold shower",
      "Complimentary shampoo, conditioner, soap and health kit",
    ],
  },
  {
    heading: "Communication and technology",
    items: ["Unlimited in-room wireless internet access", "NDD/IDD calls"],
  },
  {
    heading: "In-room services",
    items: ["In-room dining services"],
  },
];

/**
 * Some rooms add to the in-room services list — the Executive Suite, for
 * instance, includes a complimentary massage. This returns the standard
 * hotel block with those extras appended rather than duplicating the whole
 * list per room.
 */
export function hotelAmenitiesWithExtras(
  extraInRoomServices: string[],
): AmenityGroup[] {
  return hotelRoomAmenities.map((group) =>
    group.heading === "In-room services"
      ? { ...group, items: [...extraInRoomServices, ...group.items] }
      : group,
  );
}

/**
 * The Villa Rooms publish their own variant of the standard block — a
 * pool/garden view line and a ceiling fan under room features, a marble
 * bathroom, and a care kit under in-room services.
 */
export const villaRoomAmenities: AmenityGroup[] = [
  { heading: "Entertainment", items: ["43 inch LED TV", "Satellite channels"] },
  {
    heading: "Room features",
    items: [
      "Pool / garden view",
      "Air conditioned room",
      "Coffee and tea-making facilities",
      "Work desk",
      "In-room safe",
      "220V electrical sockets",
      "Mini-refrigerator",
      "Emergency lights",
      "Spacious wardrobe",
      "Ceiling fan",
    ],
  },
  {
    heading: "Bathroom facilities",
    items: [
      "Bathrobe and slippers",
      "Marble bathroom",
      "Hot and cold shower",
      "Complimentary shampoo, conditioner, soap and health kit",
    ],
  },
  {
    heading: "Communication and technology",
    items: ["Unlimited in-room wireless internet access", "NDD/IDD calls"],
  },
  {
    heading: "In-room services",
    items: ["In-room dining services", "Care kit"],
  },
];

/** Shared by every villa configuration. */
const villaCommon = [
  "Welcome care kit",
  "Private pool (4ft) with pool deck, pocket garden and outdoor shower",
  "Nespresso machine",
  "Mini-bar counter",
  "Mini refrigerator",
  "Electric kettle",
  "Work desk",
  "220V universal outlet and USB port",
  "Room Wi-Fi access",
  "Smart TV with cable",
  "Safety vault",
  "Telephone",
  "Living and dining room",
  "Sala set",
  "Dining set",
  "Ceiling fans",
  "Private bathroom with hot and cold shower",
  "Bath tub",
  "Bath robe and slippers",
  "Complimentary shampoo, conditioner and lotion",
  "Walk-in closet",
  "Laundry bag",
  "Hair dryer",
  "Butler service",
];

export interface VillaConfiguration {
  units: number;
  /** The client's own all-caps banner line, used verbatim as the heading. */
  banner: string;
  name: string;
  bedding: string[];
  amenities: string[];
  /** Each configuration has its own carousel above its text on the live page. */
  photos: string[];
}

/** Ten villas in three configurations, per the live page. */
export const villaConfigurations: VillaConfiguration[] = [
  {
    units: 6,
    banner: "6 Units – 1BEDROOM LUXURY POOL VILLA WITH EXCLUSIVE POOL",
    name: "1 Bedroom",
    bedding: ["1 King Bed with 1 Day Bed Air-Conditioned Room"],
    amenities: villaCommon,
    photos: [
      "2023/02/1-BEDROOM-1.png",
      "2023/02/1-BEDROOM-5-1-scaled.jpeg",
      "2023/02/1-BEDROOM-4-1.png",
      "2023/02/1-BEDROOM-3-2.png",
      "2023/02/1-BEDROOM-2-1.png",
    ],
  },
  {
    units: 2,
    banner:
      "2 Units – 2BEDROOM LUXURY POOL VILLA WITH EXCLUSIVE POOL (NON-BEACH VIEW)",
    name: "2 Bedroom",
    bedding: [
      "1st Bedroom, 1 King bed Air-conditioned Room",
      "2nd Bedroom, 2 Double beds Air-conditioned Room",
    ],
    amenities: [...villaCommon, "2nd Level Balcony (for non-beach front villas)"],
    photos: [
      "2025/08/WhatsApp-Image-2025-08-30-at-10.32.06-AM-1.jpeg",
      "2025/08/WhatsApp-Image-2025-08-30-at-10.32.08-AM.jpeg",
      "2025/08/WhatsApp-Image-2025-08-30-at-10.32.06-AM-4.jpeg",
      "2025/08/WhatsApp-Image-2025-08-30-at-10.32.06-AM-3.jpeg",
      "2025/08/WhatsApp-Image-2025-08-30-at-10.32.06-AM-2.jpeg",
    ],
  },
  {
    units: 2,
    banner:
      "2 Units – 2BEDROOM LUXURY POOL VILLA WITH EXCLUSIVE POOL (BEACH VIEW)",
    name: "2 Bedroom",
    bedding: [
      "1st Bedroom, 1 King bed Air-conditioned Room",
      "2nd Bedroom, 2 Double beds Air-conditioned Room",
    ],
    amenities: villaCommon,
    photos: [
      "2023/02/2-BEDROOM-5.png",
      "2023/02/2-BEDROOM-4.png",
      "2023/02/2-BEDROOM-1.png",
      "2023/02/2-BEDROOM-2.png",
      "2023/02/2-BEDROOM-3.png",
    ],
  },
];

export const villaSharedFacilities = [
  "Beach lounge",
  "Private reception",
  "Private courtyard",
  "3 pavilions at the garden",
];

/** Stated on the villas page. Applies to the villas; confirm for other rooms. */
export const villaPetsPolicy = "Pets are not allowed.";

/** Closing carousel on the live villas page. */
export const villaClosingPhotos = [
  "2024/08/lv4.jpg",
  "2024/08/lv3.jpg",
  "2024/08/lv2.jpg",
  "2024/08/lv1.jpg",
];
