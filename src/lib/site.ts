/**
 * Site-wide constants, carried over from the existing site verbatim.
 * Re-confirm the phone numbers and the copyright year with the client —
 * some of this has not been touched since 2021.
 */

export const site = {
  name: "Aureo La Union",
  legalName: "Aureo Hotel & Resort | San Fernando La Union",
  url: "https://www.aureohotels.com",
  description:
    "A secluded resort that exudes luxury and embraces nature, set against a backdrop of golden sunsets and pristine waters.",

  /** Reservations run on STAAH. We link out; we do not rebuild it. */
  bookingUrl: "https://aureo.hotelreservations.ph/",

  topBarPhone: "TEL: (072) 888 0833 or (02) 8893 1111",
  topBarMobile: "MOBILE: (63) 917 822 5799",

  offices: {
    resort: {
      label: "La Union Office:",
      address: "Barangay San Francisco, San Fernando City, La Union",
      reservations: [
        "(63) 917 620 7944",
        "(63) 917 630 6633",
        "(63) 917 822 5799",
      ],
      reservationsNote: "Viber / WhatsApp",
      telephone: ["(63) 072 888 0836", "(63) 072 888 0837", "(63) 072 888 0833"],
    },
    head: {
      label: "Head Office:",
      address: "17/F Lepanto Bldg., Paseo de Roxas, Makati City",
      telephone: ["(63) 02 8893 1111"],
    },
  },

  email: "reservations@aureohotels.com",

  social: [
    { name: "Facebook", href: "https://www.facebook.com/AureoLaUnion" },
    { name: "Instagram", href: "https://www.instagram.com/AureoLaUnion" },
    { name: "TikTok", href: "https://www.tiktok.com/@aureolaunion" },
  ],

  tripAdvisorUrl:
    "https://www.tripadvisor.com/Hotel_Review-g298454-d10815993-Reviews-Aureo_La_Union-San_Fernando_La_Union_La_Union_Province_Ilocos_Region_Luzon.html",

  copyright: "Copyright © 2021 Aureo La Union",

  /** Dining outlets, named on the About page. */
  restaurants: [
    "A Bistro",
    "Salt + Sea",
    "The Coast Bar and Restaurant",
    "Coast Restaurant",
  ],

  /** From the client's own About page. */
  facts: {
    villaRooms: 58,
    hotelRooms: 116,
    beachMetres: 400,
    openedYear: 2016,
  },
} as const;

export interface NavNode {
  label: string;
  href: string;
  external?: boolean;
  children?: NavNode[];
}

/** Mirrors the live menu exactly, including the nested Rooms submenus. */
export const nav: NavNode[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-the-resort" },
  { label: "Gallery", href: "/facilities" },
  {
    label: "Rooms",
    href: "/rooms",
    children: [
      { label: "Superior Room", href: "/rooms/superior-room" },
      {
        label: "Deluxe",
        href: "/rooms/deluxe-room",
        children: [
          { label: "Deluxe Room", href: "/rooms/deluxe-room" },
          { label: "Deluxe Room Swim Up", href: "/rooms/deluxe-room-swim-up" },
        ],
      },
      {
        label: "Family Room",
        href: "/rooms/family-room",
        children: [
          { label: "Family Room", href: "/rooms/family-room" },
          { label: "Family Room Swim Up", href: "/rooms/family-room-swim-up" },
        ],
      },
      { label: "Executive Suite", href: "/rooms/executive-suite" },
      { label: "Villa Rooms", href: "/rooms/villa" },
      { label: "Luxury Pool Villas", href: "/rooms/luxury-villas" },
    ],
  },
  { label: "Premium Rooms", href: "/premium-rooms" },
  {
    label: "Sea Park",
    href: "/sea-park-condo",
    children: [{ label: "Condo", href: "/rooms/condo" }],
  },
  { label: "Luxury Pool Villas", href: "/rooms/luxury-villas" },
  { label: "Events", href: "/events" },
  { label: "Wellness", href: "/wellness/spa" },
  { label: "Contact", href: "/contact-us" },
  { label: "Shop", href: "/shop" },
  { label: "Book", href: site.bookingUrl, external: true },
];

/** Footer "More information" column. */
export const footerLinks: NavNode[] = [
  { label: "Contact Us", href: "/contact-us" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];
