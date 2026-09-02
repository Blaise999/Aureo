"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/images";

/**
 * Replaces the Swiper carousels on the live site. Same behaviour: one
 * slide at a time, arrows, dots, five-second autoplay that pauses on hover
 * and stops for good once the visitor takes control.
 *
 * Written by hand rather than pulling in Swiper — it is one file against
 * ~150KB of dependency, and this is all the site asked of it.
 */
export function Carousel({
  photos,
  aspect = "aspect-[3/2]",
  autoplayMs = 5000,
  priority = false,
}: {
  // Readonly because the image registry is declared `as const`.
  photos: readonly Photo[];
  aspect?: string;
  autoplayMs?: number;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const interacted = useRef(false);

  const count = photos.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused || interacted.current) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), autoplayMs);
    return () => clearInterval(timer);
  }, [count, paused, autoplayMs]);

  function takeControl(next: number) {
    interacted.current = true;
    go(next);
  }

  if (count === 0) return null;

  return (
    <div
      className={`relative overflow-hidden ${aspect}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div
        className="carousel-track h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {photos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={priority && i === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => takeControl(index - 1)}
            className="carousel-arrow left-2"
            aria-label="Previous slide"
          >
            <Chevron className="rotate-90" />
          </button>
          <button
            type="button"
            onClick={() => takeControl(index + 1)}
            className="carousel-arrow right-2"
            aria-label="Next slide"
          >
            <Chevron className="-rotate-90" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={`dot-${photo.src}-${i}`}
                type="button"
                onClick={() => takeControl(i)}
                className="carousel-dot"
                data-active={i === index}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      aria-hidden="true"
      className={`h-3 w-3 fill-current ${className}`}
    >
      <path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}
