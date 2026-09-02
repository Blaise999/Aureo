/**
 * The gallery, transcribed from the live /facilities/ page.
 *
 * The original runs on the Essential Addons filterable-gallery widget with
 * six filters. Only four categories actually have images on the live site —
 * "Weddings" is an empty filter, so it is omitted here rather than rendering
 * a tab that shows nothing.
 *
 * Paths are relative to the WordPress uploads directory; `galleryPhotos()`
 * resolves them the same way src/lib/images.ts does, so switching to local
 * files later is a single change.
 */

export type GalleryCategory = "rooms" | "pool" | "amenities" | "beach";

export const galleryFilters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Rooms", value: "rooms" },
  { label: "Pool", value: "pool" },
  { label: "Amenities", value: "amenities" },
  { label: "Beach", value: "beach" },
];

export interface GalleryEntry {
  path: string;
  title: string;
  category: GalleryCategory;
}

export const galleryEntries: GalleryEntry[] = [
  { path: "2021/02/Superior-Room-Aureo.jpg", title: "Superior Room", category: "rooms" },
  { path: "2021/03/deluxe3.jpg", title: "Deluxe Room", category: "rooms" },
  { path: "2021/07/family_room.jpg", title: "Family Room", category: "rooms" },
  { path: "2021/07/executive_suite.jpg", title: "Executive Suite", category: "rooms" },
  { path: "2025/11/lv1.jpg", title: "Luxury Pool Villa", category: "rooms" },
  { path: "2025/11/lv2.jpg", title: "Luxury Pool Villa", category: "rooms" },
  { path: "2025/11/lv3.jpg", title: "Luxury Pool Villa", category: "rooms" },
  { path: "2025/11/lv4.jpg", title: "Luxury Pool Villa", category: "rooms" },
  { path: "2025/11/c9b8b178-be5b-42cd-957c-9996cd57c389.jpg", title: "Garden View", category: "rooms" },
  { path: "2025/11/ee7d3f7e-f06a-4d71-b39f-186606b32c00.jpg", title: "Pool View", category: "rooms" },
  { path: "2025/11/15f2263c-4047-4386-bb48-c3158cdc59d2-1.jpg", title: "Lagoon View", category: "rooms" },
  { path: "2025/11/5e10c51e-a9be-4652-9963-6c5b9e4edefa.jpg", title: "Beach Front", category: "rooms" },
  { path: "2021/03/Pool-Night-2.jpg", title: "Lazy River", category: "pool" },
  { path: "2021/04/edited-loop-pool_5.jpg", title: "The Loop", category: "pool" },
  { path: "2019/08/aureo_lagoon_pool_view-min.jpg", title: "Pool", category: "pool" },
  { path: "2018/08/home_slideshow_10.jpg", title: "Pool", category: "pool" },
  { path: "2021/01/aureo_swim_up.jpg", title: "Pool", category: "pool" },
  { path: "2021/03/Salt-Sea-1.jpg", title: "Salt + Sea", category: "amenities" },
  { path: "2021/03/Salt-Sea.jpg", title: "Salt + Sea", category: "amenities" },
  { path: "2025/11/WhatsApp-Image-2025-11-04-at-1.42.09-PM.jpeg", title: "Coast Cafe", category: "amenities" },
  { path: "2025/11/WhatsApp-Image-2025-11-04-at-1.42.08-PM.jpeg", title: "Coast Cafe", category: "amenities" },
  { path: "2020/03/Garden-Resized-2-2.jpg", title: "Amenities", category: "amenities" },
  { path: "2018/08/AUREO_PG_JPG-251-min-scaled.jpg", title: "Amenities", category: "amenities" },
  { path: "2018/08/AUREO_PG_JPG-158-min-scaled.jpg", title: "Amenities", category: "amenities" },
  { path: "2025/11/429553599_18421738864060438_7685001522006465109_n-copy.jpg", title: "Beach", category: "beach" },
];
