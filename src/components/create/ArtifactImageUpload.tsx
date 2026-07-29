"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/png", "image/jpeg"]);

function UploadIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mx-auto text-ffie-accent"
    >
      <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

type ArtifactImageUploadProps = {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
};

/** Dashed dropzone for optional artifact image upload. */
export function ArtifactImageUpload({
  value,
  onChange,
}: ArtifactImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (!ACCEPTED_TYPES.has(file.type)) {
      setError("Please upload a PNG or JPG image.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("Image must be 10 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.onerror = () => setError("Could not read that file. Try again.");
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          handleFile(event.dataTransfer.files[0]);
        }}
        className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent ${
          dragOver
            ? "border-ffie-accent bg-ffie-accent-soft/50"
            : "border-ffie-ink/25 bg-ffie-surface/40 hover:border-ffie-accent/50 hover:bg-ffie-accent-soft/25"
        }`}
      >
        <UploadIcon />
        <span className="mt-3 text-sm font-medium text-ffie-ink">
          Click to upload an image
        </span>
        <span className="mt-1 text-xs text-ffie-muted">
          PNG or JPG · max 10 MB · optional — you can skip this
        </span>
      </button>

      {error && <p className="text-xs text-red-700">{error}</p>}

      {value && (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded artifact preview"
            className="max-h-56 w-full rounded-xl border border-ffie-line object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setError(null);
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-xs font-medium text-ffie-muted underline-offset-2 hover:text-ffie-ink hover:underline"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}
