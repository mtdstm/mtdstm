"use client";

import { useState } from "react";
import clsx from "clsx";

/**
 * Autoplay/mute/loop video background with a graceful gradient
 * fallback for when the placeholder .mp4 hasn't been dropped in yet
 * (see /public/videos — README explains the expected filenames).
 */
export default function VideoBackground({
  src,
  className,
  gradientFrom = "from-panel",
}: {
  src: string;
  className?: string;
  gradientFrom?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={clsx("absolute inset-0 overflow-hidden", className)}>
      <div className={clsx("absolute inset-0 bg-gradient-to-br to-bg", gradientFrom)} />
      {!errored && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
