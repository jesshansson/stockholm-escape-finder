import { useEffect, useRef, useState } from "react";

/**
 * Short, on-brand label used by the non-image fallback.
 * Pure so it can be unit tested without the DOM.
 */
export function destinationInitials(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  const letters = words.slice(0, 2).map((w) => w[0]!.toLocaleUpperCase("sv-SE"));
  return letters.join("");
}

type Props = {
  src: string;
  name: string;
  /** Layout classes (aspect ratio, sizing) applied identically to image and fallback. */
  className?: string;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  /** Falls back to the destination name when omitted. */
  alt?: string;
};

/**
 * Single place where destination photos are rendered. A failing local or
 * Wikimedia URL swaps to a non-image fallback that keeps the exact same box,
 * so there is no layout shift and never a broken-image icon. The error handler
 * fires once per src (state resets when src changes) — no retry loop.
 */
export function DestinationImage({
  src,
  name,
  className = "",
  width,
  height,
  loading,
  decoding = "async",
  alt,
}: Props) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Reset for a new src, and catch loads that already failed before hydration
  // attached the onError handler (SSR markup). Runs once per src — no retries.
  useEffect(() => {
    setFailed(false);
    const el = imgRef.current;
    if (!el) return;
    // A server-rendered image can fail before React hydrates, so React's
    // onError may never fire. Listen natively and re-check the loaded state.
    const onError = () => setFailed(true);
    el.addEventListener("error", onError);
    if (el.complete && el.naturalWidth === 0) setFailed(true);
    return () => el.removeEventListener("error", onError);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt ?? name}
        className={`flex flex-col items-center justify-center gap-2 bg-ink-soft text-ink px-4 text-center ${className}`}
      >
        <span
          aria-hidden
          className="size-10 rounded-full bg-moss/15 text-moss text-sm font-semibold flex items-center justify-center"
        >
          {destinationInitials(name)}
        </span>
        <span className="text-xs font-medium leading-snug line-clamp-2 text-ink-muted">
          {name}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt ?? name}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
