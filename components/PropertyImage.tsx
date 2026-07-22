"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface PropertyImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Plain <img> rather than next/image: photos come from an external, arbitrary host
// (picsum.photos in the sample data) so next/image would need a remotePatterns entry
// per host, and next/image throws at render on an empty src — which is exactly the
// "missing photo" case this component needs to survive.

/**
 * Fixed aspect-ratio, object-cover property photo. Falls back to the same tasteful
 * placeholder whether `src` is empty OR a real URL that fails to load (onError) —
 * never lets a broken-image icon or leaked alt text reach the card.
 *
 * TODO(phase-2): the fallback below is a functional placeholder — design a proper
 * branded fallback (e.g. a subtle monogram/pattern) instead of the plain icon tile.
 */
export function PropertyImage({ src, alt, className = "" }: PropertyImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`flex aspect-[16/9] w-full items-center justify-center bg-stone-200 text-stone-400 ${className}`}
      >
        <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        <span className="sr-only">No photo available for {alt}</span>
      </div>
    );
  }

  return (
    <div className={`aspect-[16/9] w-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>
  );
}
