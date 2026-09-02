"use client";

import { useRef, useState } from "react";

/**
 * Uploads a file and hands the resulting URL back to the parent.
 *
 * Staff can also paste a URL straight into the textarea — the existing
 * photos still live on the old WordPress media library, and this lets both
 * sources coexist while that is true.
 */
export function ImageUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        setError(result.error ?? "Upload failed.");
        return;
      }

      onUploaded(result.url);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="mt-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm font-bold uppercase tracking-wide text-gold disabled:opacity-50"
        disabled={busy}
      >
        {busy ? "Uploading…" : "Upload a photo"}
      </button>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
