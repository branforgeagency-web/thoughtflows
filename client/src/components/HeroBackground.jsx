import { useState } from "react";

/**
 * Hero backdrop — video only, no text overlay. If /hero-video.webm (or
 * /hero-video.mp4) exists in client/public/, it plays full-bleed. If
 * neither is present yet (or loading fails), a plain gradient wash shows
 * instead so the section never breaks waiting on the file.
 *
 * To add/replace the video:
 *   1. Drop the file at client/public/hero-video.webm (and, optionally, a
 *      still frame at client/public/hero-poster.jpg to show while it loads).
 *   2. That's it — this component picks it up automatically, no code
 *      changes needed.
 */
export default function HeroBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fallback color, visible until the video can play (or if it fails) */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {!videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="https://res.cloudinary.com/c2wyo4vs/video/upload/v1786695815/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim: keeps the fixed navbar's light text legible no matter how
          bright or busy the current video frame is. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/55 via-navy-950/15 to-transparent pointer-events-none" />
    </div>
  );
}
