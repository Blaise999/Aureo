import type { Photo } from "./images";

/**
 * Room pages, generated from the client's saved HTML so the structure
 * matches the live site exactly rather than being re-interpreted.
 *
 * The live layout for every one of these is identical:
 *
 *   page-header (header-small, room-specific background)
 *   -> BOOK NOW button, centred
 *   -> image carousel (1 slide, arrows, 5s autoplay, infinite)
 *   -> description paragraph, then "In-Room Amenities Include:"
 *   -> amenities in TWO columns
 *   -> "Have Questions?" heading + INQUIRE button
 *
 * `amenityColumns` is therefore a tuple of exactly two columns, in the
 * client's own order. That order is not the same on every page — the
 * Executive Suite puts BREAKFAST at the foot of the left column while
 * every other room puts it at the foot of the right — so the split is
 * stored per room rather than derived.
 */

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads/";

function photo(path: string, alt: string): Photo {
  return { src: `${UPLOADS}${path}`, alt };
}

export interface AmenityGroup {
  heading: string;
  items: string[];
}

export interface RoomPage {
  slug: string;
  name: string;
  /** Background for the page-header band. */
  headerImage: string;
  description: string;
  photos: Photo[];
  /** Left column, right column — exactly as the live page splits them. */
  amenityColumns: [AmenityGroup[], AmenityGroup[]];
}

export const roomPages: RoomPage[] = [
  {
    slug: "superior-room",
    name: "Superior Room",
    headerImage: "2020/11/Superior_1-1.png",
    description: "Experience comfort in our Superior Rooms, each offering 40 square meters of space and a private veranda that allows you to unwind and recharge. Perfect for up to 4 guests, these rooms are just a 3 to 5-minute stroll from the beach and pool.",
    photos: [
      photo("2021/02/Superior-Room-Aureo.jpg", "Superior Room"),
      photo("2021/02/Superior-Service.jpg", "Superior Room"),
      photo("2020/11/Superior_3-1.png", "Superior Room"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 2 pax",
      ],
    },
  ],
    ],
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    headerImage: "2020/11/Resized_Deluxe_1-1.jpg",
    description: "Discover our 40-square meter Deluxe Rooms, located in our hotel building. Each room features a private veranda with a panoramic view of the resort. Choose between two double beds, ideal for up to 4 guests, or a king-sized bed with the option for an additional bed, accommodating up to 3 guests. The rooms are a 2-minute walk away from the beach and pool.",
    photos: [
      photo("2021/03/deluxe1.jpg", "Deluxe Room"),
      photo("2021/03/deluxe2.jpg", "Deluxe Room"),
      photo("2021/03/deluxe3.jpg", "Deluxe Room"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 2 pax",
      ],
    },
  ],
    ],
  },
  {
    slug: "deluxe-room-swim-up",
    name: "Deluxe Room Swim Up",
    headerImage: "2020/11/Resized_Deluxe_1-1.jpg",
    description: "Indulge in relaxation with our Deluxe Swim-Up Rooms. Each 40-square meter room offers direct access to the pool from your private veranda. Located 2 minutes from the beach, these rooms are designed to accommodate up to 4 guests.",
    photos: [
      photo("2021/02/deluxe_swim_up_room_1.jpg", "Deluxe Room Swim Up"),
      photo("2021/02/swim-up-2-e1624612909595.jpg", "Deluxe Room Swim Up"),
      photo("2021/02/swim-up-edit.jpg", "Deluxe Room Swim Up"),
      photo("2021/06/Swim-Up.jpeg", "Deluxe Room Swim Up"),
      photo("2021/01/aureo_swim_up.jpg", "Deluxe Room Swim Up"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 2 pax",
      ],
    },
  ],
    ],
  },
  {
    slug: "family-room",
    name: "Family Room",
    headerImage: "2020/11/Family_1.png",
    description: "Our spacious Family Rooms, spanning 70 square meters in size, are designed with families in mind, comfortably accommodating up to 6 guests. Each room features two separate bedrooms, two bathrooms, and a private veranda, providing ample space for everyone to bond, relax, and unwind. Conveniently located just 2 minutes from the beach and pool, the Family Room offers a perfect blend of comfort and accessibility.",
    photos: [
      photo("2021/03/Family-1.jpg", "Family Room"),
      photo("2021/03/Family-2.jpg", "Family Room"),
      photo("2021/03/Family-3.jpg", "Family Room"),
      photo("2021/03/Family-4.jpg", "Family Room"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 4 pax",
      ],
    },
  ],
    ],
  },
  {
    slug: "family-room-swim-up",
    name: "Family Room Swim Up",
    headerImage: "2020/11/Family_1.png",
    description: "Enjoy the luxury of direct pool access right from your private veranda in our Family Swim-Up Room. The 70-square meter space is perfect for a family of up to 6 guests, featuring two bedrooms and two bathrooms. Plus, with the beach and pool just 2 minutes away, you\u2019ll have the ideal setting for a memorable family getaway.",
    photos: [
      photo("2021/03/Family-1.jpg", "Family Room Swim Up"),
      photo("2021/03/Family-2.jpg", "Family Room Swim Up"),
      photo("2021/03/Family-3.jpg", "Family Room Swim Up"),
      photo("2021/03/Family-4.jpg", "Family Room Swim Up"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 4 pax",
      ],
    },
  ],
    ],
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    headerImage: "2020/11/Executive_1.png",
    description: "The Executive Suite offers 70 square meters of refined comfort, perfectly suited for up to 4 guests. Enjoy private time in your own dining and living room, relax in your private veranda with direct pool access, take a 2-minute walk to the beach for a change in scenery.",
    photos: [
      photo("2021/03/Exec-2.jpg", "Executive Suite"),
      photo("2021/03/Exec-1.jpg", "Executive Suite"),
      photo("2021/03/Exec-3.jpg", "Executive Suite"),
      photo("2021/03/Exec-4.jpg", "Executive Suite"),
      photo("2021/03/Exec-5.jpg", "Executive Suite"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
      ],
    },
    {
      heading: "Breakfast",
      items: [
        "Breakfast for 2 pax",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "Complimentary Whole Body Massage for 2 pax",
        "In-room dining services",
      ],
    },
  ],
    ],
  },
  {
    slug: "villa",
    name: "Villa Rooms",
    headerImage: "2018/08/page_banner_18-min-1200x328.jpg",
    description: "Our villa rooms range from 37 to 42 square meters, each offering a private veranda and stunning seascape views. Perfect for up to 4 guests, these rooms provide a choice of Pool, Garden, Beach, or Lagoon views to suit your preference. Located just a few steps from the beach, the Villa Rooms offer a serene retreat for your stay.",
    photos: [
      photo("2024/11/15f2263c-4047-4386-bb48-c3158cdc59d2.jpg", "Villa Rooms"),
      photo("2024/11/5e10c51e-a9be-4652-9963-6c5b9e4edefa.jpg", "Villa Rooms"),
      photo("2024/11/ee7d3f7e-f06a-4d71-b39f-186606b32c00.jpg", "Villa Rooms"),
      photo("2024/11/c9b8b178-be5b-42cd-957c-9996cd57c389.jpg", "Villa Rooms"),
    ],
    amenityColumns: [
  [
    {
      heading: "Entertainment",
      items: [
        "43 inch LED TV",
        "Satellite channels",
      ],
    },
    {
      heading: "Room Features",
      items: [
        "Pool / garden view",
        "Air conditioned room",
        "Coffee and tea- making facilities",
        "Work desk",
        "In-room safe",
        "220V electrical sockets",
        "Mini-refrigerator",
        "Emergency lights",
        "Spacious wardrobe",
        "Ceiling fan",
      ],
    },
  ],
  [
    {
      heading: "Bathroom Facilities",
      items: [
        "Bathrobe and slippers",
        "Marble bathroom",
        "Hot and Cold Shower",
        "Complimentary shampoo, conditioner, soap, and health kit",
      ],
    },
    {
      heading: "Communication and Technology",
      items: [
        "Unlimited in-room wireless internet access",
        "NDD/IDD calls",
      ],
    },
    {
      heading: "In-Room Services",
      items: [
        "In-room dining services",
        "Care kit",
      ],
    },
  ],
    ],
  },
];

export function roomPageBySlug(slug: string): RoomPage | undefined {
  return roomPages.find((room) => room.slug === slug);
}

export function headerImageUrl(path: string): string {
  return `${UPLOADS}${path}`;
}
