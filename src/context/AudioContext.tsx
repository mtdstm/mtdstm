"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface AudioContextValue {
  muted: boolean;
  toggle: () => void;
}

const Ctx = createContext<AudioContextValue | null>(null);

/**
 * Global mute toggle for the HUD audio button. Wires up an ambient
 * loop if present — see public/audio/ambient.mp3 (TODO: replace with
 * real studio reel audio / SFX). Missing file fails silently.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    setMuted((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        if (!audioRef.current) {
          audioRef.current = new Audio("/audio/ambient.mp3");
          audioRef.current.loop = true;
          audioRef.current.volume = 0.35;
        }
        if (next) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {
            /* file missing or autoplay blocked — fail silently */
          });
        }
      }
      return next;
    });
  };

  const value = useMemo(() => ({ muted, toggle }), [muted]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
