"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Custom crosshair cursor that follows the pointer and morphs when
 * hovering any element tagged `data-cursor="link"`. Disabled on
 * touch devices and when reduced motion is requested (see globals.css
 * `cursor: auto` fallback at narrow/hover:none breakpoints).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const isCoarse = window.matchMedia("(hover: none)").matches;
    if (isCoarse) return;

    const pos = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('[data-cursor="link"]'));
    };

    let raf: number;
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[70] hidden md:block ${visible ? "" : "opacity-0"}`}>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color] duration-200 ${
          hovering ? "h-12 w-12 border-magenta bg-magenta/10" : "h-7 w-7 border-cyan"
        }`}
      />
    </div>
  );
}
