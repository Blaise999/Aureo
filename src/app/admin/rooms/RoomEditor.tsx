"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { saveRoom, type ActionState } from "../actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

/**
 * One collapsible panel per room type. Collapsed by default so the page is
 * scannable — staff usually come here to change one rate, not nine.
 */
export function RoomEditor({
  slug,
  name,
  rate,
  available,
  photos,
  published,
}: {
  slug: string;
  name: string;
  rate: number | null;
  available: number | null;
  photos: string[];
  published: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [photoList, setPhotoList] = useState(photos.join("\n"));
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveRoom,
    {},
  );

  const urls = photoList.split("\n").map((line) => line.trim()).filter(Boolean);

  return (
    <div className="rounded border border-hairline">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="info-title">{name}</span>
        <span className="flex items-center gap-4 text-sm text-muted">
          {rate !== null ? <span>₱{(rate / 100).toLocaleString()}</span> : null}
          {!published ? (
            <span className="rounded bg-hairline px-2 py-1 text-xs">
              Hidden
            </span>
          ) : null}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </span>
      </button>

      {open ? (
        <form action={formAction} className="border-t border-hairline px-5 py-6">
          <input type="hidden" name="slug" value={slug} />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor={`rate-${slug}`}>
                Rate from (₱ per night)
              </label>
              <input
                id={`rate-${slug}`}
                name="rate"
                className="field"
                defaultValue={rate !== null ? String(rate / 100) : ""}
                placeholder="Leave blank to hide the price"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="field-label" htmlFor={`available-${slug}`}>
                Rooms of this type
              </label>
              <input
                id={`available-${slug}`}
                name="available"
                className="field"
                defaultValue={available !== null ? String(available) : ""}
                placeholder="Leave blank to hide"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="field-label" htmlFor={`photos-${slug}`}>
              Photos — one URL per line, first is the main image
            </label>
            <textarea
              id={`photos-${slug}`}
              name="photos"
              rows={4}
              className="field font-mono text-xs"
              value={photoList}
              onChange={(event) => setPhotoList(event.target.value)}
            />

            <ImageUploader
              onUploaded={(url) =>
                setPhotoList((current) =>
                  current.trim() ? `${current.trim()}\n${url}` : url,
                )
              }
            />

            {urls.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {urls.map((url) => (
                  <div
                    key={url}
                    className="relative h-16 w-24 overflow-hidden rounded bg-section-gray"
                  >
                    {/* Unoptimised: these URLs are arbitrary and may point at
                        hosts not listed in next.config remotePatterns. */}
                    <Image
                      src={url}
                      alt=""
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <label className="mt-6 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={published}
              className="accent-gold"
            />
            Show this room on the website
          </label>

          <div className="mt-6 flex items-center gap-4">
            <button type="submit" className="btn btn-primary" disabled={pending}>
              {pending ? "Saving" : "Save"}
            </button>
            {state.ok ? (
              <span className="text-sm text-green-700">{state.ok}</span>
            ) : null}
            {state.error ? (
              <span className="text-sm text-red-600">{state.error}</span>
            ) : null}
          </div>
        </form>
      ) : null}
    </div>
  );
}
