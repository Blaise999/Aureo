/**
 * Every photo on the site, in one place.
 *
 * Right now these point at the client's WordPress media library, which is
 * public. That is fine for development but you do not want production
 * depending on a WordPress install that is due to be retired (and is
 * currently compromised — see README).
 *
 * To cut the dependency:
 *   1. npm run fetch-images     — downloads everything into /public/images
 *   2. set USE_LOCAL_IMAGES = true below
 *   3. delete the remotePatterns block in next.config.ts
 *
 * Ask the client for the original full-resolution files before launch.
 * Several of these are Elementor-generated crops and are softer than they
 * should be at hero size.
 */

const USE_LOCAL_IMAGES = false;

const REMOTE_BASE = "https://www.aureohotels.com/wp-content/uploads";
const LOCAL_BASE = "/images";

function src(path: string): string {
  return USE_LOCAL_IMAGES
    ? `${LOCAL_BASE}/${path.split("/").pop()}`
    : `${REMOTE_BASE}/${path}`;
}

export interface Photo {
  src: string;
  alt: string;
}

function photo(path: string, alt: string): Photo {
  return { src: src(path), alt };
}

export const images = {
  logo: photo(
    "2019/12/cropped-Aureo_Landscape_Gold-3.png",
    "Aureo La Union",
  ),

  hero: photo(
    "2020/03/Header-March-1.jpg",
    "The shoreline at Aureo La Union in the late afternoon",
  ),

  rooms: {
    superior: [
      photo("2021/02/Superior-Room-Aureo.jpg", "A Superior Room"),
      photo("2021/02/Superior-Service.jpg", "Superior Room interior"),
    ],
    deluxe: [
      photo("2021/03/deluxe3.jpg", "A Deluxe Room"),
      photo("2021/03/deluxe2.jpg", "Deluxe Room interior"),
      photo("2021/03/deluxe1.jpg", "Deluxe Room bed and window"),
    ],
    villas: [
      photo(
        "elementor/thumbs/DSC_1057e-scaled-qketht9e6t3dhsnwncbrd9ab2ra4b24r9kjnp0hccq.jpg",
        "A Luxury Pool Villa and its private pool",
      ),
      photo(
        "elementor/thumbs/DSC_1048e-scaled-qketht9e6t3dhsnwncbrd9ab2ra4b24r9kjnp0hccq.jpg",
        "Villa interior",
      ),
      photo(
        "elementor/thumbs/DSC_0781e-1-scaled-qketht9e6t3dhsnwncbrd9ab2ra4b24r9kjnp0hccq.jpg",
        "Villa terrace",
      ),
    ],
    villaBanner: photo(
      "2023/01/AnyConv.com__for-pop-up-banner-1024x319.jpeg",
      "Luxury Pool Villas at Aureo La Union",
    ),
  },

  facilities: {
    lazyRiver: photo("2021/03/Lazt-River.jpg", "The Loop, the resort's lazy river"),
    lapPool: photo(
      "2019/08/aureo_lap_pool_2-min-scaled.jpg",
      "The lap pool at dusk",
    ),
    lobby: photo("2023/02/lobby_1.jpg", "The resort lobby"),
    lobbyPhaseFour: photo("2021/02/phase-4-lobby.jpeg", "Lobby, phase four"),
    grounds: photo(
      "2020/06/AUREO_PG_JPG-1034-min-scaled.jpg",
      "The resort grounds",
    ),
    exterior: photo("2020/02/AUREO_PG_JPG-20.jpg", "The resort from the water"),
    features: photo("2024/05/FEATURES-WEBSITES.jpg", "Resort features"),
  },

  events: {
    wedding: photo("2021/06/Wedding_Edit2.jpg", "A wedding at the resort"),
    corporate: photo("2021/06/corporate-scaled.jpg", "A corporate event setup"),
  },

  shop: {
    bottle: photo(
      "2021/02/kleen_kanteen_X_aureo_tumbler_1-600x400.jpg",
      "Aureo insulated water bottle",
    ),
    voucher: photo("2020/10/Mockup-600x400.jpeg", "Aureo gift voucher"),
    faceMask: photo("2020/09/face-mask_2-600x400.jpg", "Aureo face mask"),
    shirt: photo("2020/09/11-dagatfather-600x400.jpg", "Dagat Father shirt"),
  },
} as const;

/** Flat list used by the image-download script and the gallery page. */
export const allPhotos: Photo[] = [
  images.hero,
  ...images.rooms.superior,
  ...images.rooms.deluxe,
  ...images.rooms.villas,
  images.rooms.villaBanner,
  ...Object.values(images.facilities),
  ...Object.values(images.events),
];
