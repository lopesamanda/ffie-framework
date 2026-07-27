"use client";

import { useRef, useState } from "react";

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

  const handleFile = (file: File | undefined) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
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
          or drop an image here · optional — you can skip this step
        </span>
      </button>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Uploaded artifact preview"
          className="max-h-56 w-full rounded-xl border border-ffie-line object-cover"
        />
      )}
    </div>
  );
}
