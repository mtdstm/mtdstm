"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Fixed scanline / vignette / grain layers that sit above the whole page. */
export default function CrtOverlay() {
  const reduced = useReducedMotion();
  return (
    <>
      <div className="crt-vignette" />
      <div className="crt-scanlines" />
      {!reduced && <div className="crt-grain" />}
    </>
  );
}
