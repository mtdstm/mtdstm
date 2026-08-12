"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Geometric mascot — a small floating "game console spirit" built in
 * pure SVG so no external Rive/Lottie asset is required. Its pupils
 * track the pointer and it idles with a gentle float/blink loop.
 *
 * TODO: swap this for a real Rive (.riv) or Lottie (.json) character
 * if the studio produces one — the wrapper div is where it'd mount.
 */
export default function Mascot({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftPupil = useRef<SVGCircleElement>(null);
  const rightPupil = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapRef.current) return;

    const float = gsap.to(wrapRef.current, {
      y: -14,
      rotate: 2,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const onMove = (e: PointerEvent) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 300));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 300));
      gsap.to([leftPupil.current, rightPupil.current], {
        x: dx * 2.2,
        y: dy * 2.2,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      float.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
        <rect x="10" y="10" width="68" height="68" stroke="var(--neon-cyan)" strokeWidth="2" />
        <rect x="10" y="10" width="68" height="68" fill="var(--panel)" fillOpacity="0.9" />
        <circle cx="44" cy="44" r="26" stroke="var(--neon-magenta)" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* eyes */}
        <circle cx="34" cy="42" r="7" fill="#050507" stroke="var(--neon-cyan)" strokeWidth="1" />
        <circle cx="54" cy="42" r="7" fill="#050507" stroke="var(--neon-cyan)" strokeWidth="1" />
        <circle ref={leftPupil} cx="34" cy="42" r="2.6" fill="var(--neon-lime)" />
        <circle ref={rightPupil} cx="54" cy="42" r="2.6" fill="var(--neon-lime)" />
        {/* mouth */}
        <path d="M32 58 H56" stroke="var(--neon-magenta)" strokeWidth="2" strokeLinecap="square" />
        {/* antenna */}
        <line x1="44" y1="10" x2="44" y2="2" stroke="var(--neon-cyan)" strokeWidth="2" />
        <circle cx="44" cy="2" r="2.5" fill="var(--neon-lime)" />
      </svg>
    </div>
  );
}
