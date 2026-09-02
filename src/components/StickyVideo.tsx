"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replaces the Essential Addons sticky-video widget on the About page.
 *
 * Behaviour copied from the live widget's own data attributes: it plays
 * inline, and once scrolled past (70px on the original) it shrinks to a
 * 300x169 player pinned bottom-right with a close button.
 *
 * The iframe is only mounted after the visitor clicks play, so YouTube
 * sets no cookies and loads no script on a page nobody watched.
 */
export function StickyVideo({
  embedId,
  poster,
  title,
}: {
  embedId: string;
  poster: string;
  title: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!playing || closed) return;
    const node = holder.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: "-70px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [playing, closed]);

  const floating = stuck && playing && !closed;

  return (
    <>
      {/* Keeps the page from jumping when the player detaches. */}
      <div ref={holder} className="relative aspect-video w-full bg-black">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={poster}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/90 text-white transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        ) : !floating ? (
          <Frame embedId={embedId} title={title} />
        ) : null}
      </div>

      {floating ? (
        <div className="fixed bottom-4 right-4 z-50 w-[300px] shadow-2xl">
          <div className="relative aspect-video w-full bg-black">
            <Frame embedId={embedId} title={title} />
          </div>
          <button
            type="button"
            onClick={() => setClosed(true)}
            className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-body-text text-sm text-white"
            aria-label="Close video"
          >
            &times;
          </button>
        </div>
      ) : null}
    </>
  );
}

function Frame({ embedId, title }: { embedId: string; title: string }) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&loop=1&playlist=${embedId}`}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-0"
    />
  );
}
