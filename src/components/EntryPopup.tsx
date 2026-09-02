"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The on-load Luxury Villas promo, replacing the Popup Builder plugin.
 *
 * Dismissal is remembered for the session so it does not reappear on every
 * page — the live site shows it on each load, which is the single most
 * irritating thing about it. Kept to sessionStorage rather than a cookie so
 * nothing needs a consent banner.
 */
const DISMISS_KEY = "aureo-villas-popup-dismissed";

export function EntryPopup({
  href,
  image,
  delayMs = 1200,
}: {
  href: string;
  image: string;
  delayMs?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // Private browsing can throw on sessionStorage. Show the popup rather
      // than crashing; worst case the visitor closes it again.
    }
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Luxury Villas by Aureo"
      onClick={close}
    >
      <div
        className="relative w-full max-w-[1080px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute -top-9 right-0 text-2xl leading-none text-body-text hover:text-gold"
          aria-label="Close"
        >
          &times;
        </button>

        <a href={href} onClick={close}>
          <Image
            src={image}
            alt="Luxury Villas by Aureo — book now"
            width={1024}
            height={319}
            className="h-auto w-full"
            priority
          />
        </a>
      </div>
    </div>
  );
}
