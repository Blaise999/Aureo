import manifest from "./media-manifest.json";

/**
 * Typed access to whatever `npm run fetch-images` pulled down.
 *
 * The manifest is committed empty and filled in by the script, so this
 * always imports cleanly — pages that use it just render nothing until the
 * images have been fetched. That keeps the build green on a fresh clone.
 */

export interface MediaItem {
  /** Public path, e.g. /images/hero.jpg */
  file: string;
  width: number | null;
  height: number | null;
  /** Straight from the WordPress media library. Frequently empty. */
  alt: string;
  title: string;
  uploaded: string | null;
  originalUrl: string;
}

interface Manifest {
  generated: string | null;
  source: string;
  note: string;
  items: MediaItem[];
}

const media = manifest as Manifest;

export const hasLocalMedia = media.items.length > 0;

export const mediaItems: MediaItem[] = media.items;

/** Looks an item up by filename, with or without the /images/ prefix. */
export function findMedia(name: string): MediaItem | undefined {
  const file = name.startsWith("/images/") ? name : `/images/${name}`;
  return media.items.find((item) => item.file === file);
}

/**
 * Only items with usable dimensions, sorted newest first. Used by the
 * gallery, which needs width and height to lay out without shifting.
 */
export function galleryMedia(): MediaItem[] {
  return media.items
    .filter((item) => item.width && item.height)
    .sort((a, b) => (b.uploaded ?? "").localeCompare(a.uploaded ?? ""));
}

/**
 * Alt text is a legal and accessibility requirement, and the old library is
 * missing it on a lot of files. Falls back to the title, then to a generic
 * description — but the real fix is writing it properly.
 */
export function altFor(item: MediaItem): string {
  if (item.alt) return item.alt;
  if (item.title) return item.title;
  return "Aureo La Union";
}
