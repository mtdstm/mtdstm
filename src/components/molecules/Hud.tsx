"use client";

import { useFPS } from "@/hooks/useFPS";
import { useAudio } from "@/context/AudioContext";

/**
 * Floating HUD widgets: FPS counter + audio toggle (bottom-right),
 * "online" status pill (top-right, next to nav). Purely game-UI
 * flavour, doesn't gate any real functionality.
 */
export function FpsAudioWidget() {
  const fps = useFPS();
  const { muted, toggle } = useAudio();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 font-pixel text-[9px]">
      <div className="border border-line bg-bg/70 px-2.5 py-1.5 backdrop-blur-sm">
        <span className="text-lime">{fps.toString().padStart(2, "0")}</span>
        <span className="text-muted"> FPS</span>
      </div>
      <button
        data-cursor="link"
        onClick={toggle}
        className="flex items-center gap-1.5 border border-line bg-bg/70 px-2.5 py-1.5 text-muted backdrop-blur-sm transition-colors hover:border-cyan hover:text-cyan"
        aria-pressed={!muted}
      >
        <span>{muted ? "SFX OFF" : "SFX ON"}</span>
        <span className={muted ? "opacity-30" : "text-cyan"}>{muted ? "♪̶" : "♪"}</span>
      </button>
    </div>
  );
}

export function OnlineBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-line px-2.5 py-1 font-pixel text-[9px] text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
      </span>
      ONLINE
    </div>
  );
}
