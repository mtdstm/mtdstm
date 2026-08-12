"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import VideoBackground from "@/components/molecules/VideoBackground";

// R3F scene is client-only + fairly heavy — load lazily, no SSR.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Initial boot screen — simulates an arcade cabinet loading a ROM.
 * Calls `onDone` once the progress bar completes and the exit
 * animation finishes, revealing the real page underneath.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = reduced ? 400 : 2200;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        const tl = gsap.timeline({
          onComplete: onDone,
        });
        tl.to(rootRef.current, {
          opacity: 0,
          duration: reduced ? 0.1 : 0.6,
          delay: reduced ? 0 : 0.35,
          ease: "power2.inOut",
        });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, reduced]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-bg"
    >
      <VideoBackground src="/videos/hero/hero-loop.mp4" gradientFrom="from-[#0a0a20]" />
      {!reduced && (
        <div className="absolute inset-0 opacity-80">
          <HeroScene />
        </div>
      )}
      <div className="absolute inset-0 bg-bg/70" />
      <div className="relative flex flex-col items-center gap-3">
        <span className="font-display text-2xl font-black tracking-[0.5em] text-fg sm:text-4xl">
          MÉTODO<span className="text-cyan">STM</span>
        </span>
        <span className="font-pixel text-[9px] uppercase tracking-[0.3em] text-muted">
          Loading Level 01
        </span>
      </div>

      <div className="relative w-64 sm:w-80">
        <div className="h-3 w-full border border-line bg-panel">
          <div
            className="h-full bg-gradient-to-r from-cyan via-magenta to-lime transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-pixel text-[9px] text-muted">
          <span>PRESS START</span>
          <span className="text-cyan">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
