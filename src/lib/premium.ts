/**
 * The Premium Rooms wing — a newer, separate development from the original
 * resort, published to the live site in May 2026.
 *
 * Each of these has its own page on the live site under /rooms/. Those
 * pages have NOT been rebuilt yet; the links below point at the sections
 * that exist. See README for the outstanding list.
 */

export interface PremiumSection {
  title: string;
  body: string;
  href: string;
  image: string;
  comingSoon?: boolean;
}

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads";

export const premiumIntro =
  "Experience refined comfort with thoughtfully designed accommodations, " +
  "modern amenities, and breathtaking views — crafted for a memorable stay.";

/** Hosted on the client's WordPress. Move it to a CDN before launch. */
export const premiumVideoUrl = `${UPLOADS}/2026/05/FINAL-AUREO-AVP-1-1.mp4`;

export const premiumSections: PremiumSection[] = [
  {
    title: "Room Accommodations",
    body: "A sophisticated escape awaits in our newest hotel destination, offering over 250 beautifully curated accommodations designed with elegance, comfort, and modern luxury in every detail.",
    href: "/rooms/room-accommodations",
    image: `${UPLOADS}/2026/05/WhatsApp-Image-2026-05-14-at-2.07.05-PM-768x432.jpeg`,
  },
  {
    title: "Restaurants",
    body: "Savor the art of fine dining with three exquisite restaurant concepts designed to deliver distinctive flavors, refined settings, and memorable moments for every occasion.",
    href: "/rooms/restaurants",
    image: `${UPLOADS}/2026/05/JFP-75-2-768x512.jpg`,
  },
  {
    title: "Amenities",
    body: "Relax and recharge with exceptional amenities that combine contemporary elegance, comfort, and leisure for a truly refined stay experience.",
    href: "/rooms/amenities",
    image: `${UPLOADS}/2026/05/JFP-6-768x512.jpg`,
  },
  {
    title: "Entertainment Zone",
    body: "Crafted to inspire excitement and connection, our Entertainment Zone offers a dynamic yet refined environment where guests can unwind, socialize, and enjoy elevated recreational experiences.",
    href: "/rooms/entertainment-zone",
    image: `${UPLOADS}/2026/06/COMING-SOON-1-768x512.jpg`,
    comingSoon: true,
  },
  {
    title: "Adventure Zone",
    body: "Step into an exhilarating world of exploration and recreation where every experience is designed to inspire excitement, connection, and unforgettable moments in a refined setting.",
    href: "/rooms/adventure-zone",
    image: `${UPLOADS}/2026/06/COMING-SOON-1-768x512.jpg`,
    comingSoon: true,
  },
  {
    title: "Spa & Wellness",
    body: "Step into an exhilarating world of exploration and recreation where every experience is designed to inspire excitement, connection, and unforgettable moments in a refined setting.",
    // NOTE: the live site repeats the Adventure Zone copy here verbatim.
    // Almost certainly a copy-paste error on their end — flag it to the client.
    href: "/rooms/spawellness",
    image: `${UPLOADS}/2026/05/Phase-1-to-6.jpg`,
  },
];
