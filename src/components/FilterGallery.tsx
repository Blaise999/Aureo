"use client";

import Image from "next/image";
import { useState } from "react";
import {
  galleryEntries,
  galleryFilters,
  type GalleryCategory,
} from "@/lib/gallery";

const UPLOADS = "https://www.aureohotels.com/wp-content/uploads/";

/**
 * Replaces the Essential Addons filterable gallery on the live site.
 *
 * Behaviour matches: filter tabs across the top, captions revealed on
 * hover, clicking opens the full-size image. Unlike the original, the
 * filter buttons are real buttons and the grid is announced to screen
 * readers when it changes.
 */
export function FilterGallery() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");

  const shown =
    active === "all"
      ? galleryEntries
      : galleryEntries.filter((entry) => entry.category === active);

  return (
    <div>
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {galleryFilters.map((filter) => (
          <li key={filter.value}>
            <button
              type="button"
              onClick={() => setActive(filter.value)}
              className={`pb-1 text-sm uppercase tracking-wide transition-colors ${
                active === filter.value
                  ? "border-b-2 border-gold text-gold"
                  : "border-b-2 border-transparent text-body-text hover:text-gold"
              }`}
              aria-pressed={active === filter.value}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} photographs.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((entry) => (
          <a
            key={entry.path}
            href={`${UPLOADS}${entry.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden rounded"
          >
            <Image
              src={`${UPLOADS}${entry.path}`}
              alt={entry.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-bold text-white">
                {entry.title}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
