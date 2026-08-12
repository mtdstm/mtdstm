"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight rAF-based FPS meter for the HUD corner widget.
 * Purely cosmetic/arcade flavour — not a real perf profiler.
 */
export function useFPS(): number {
  const [fps, setFps] = useState(60);
  const frames = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    let raf: number;
    lastTime.current = performance.now();

    const loop = (t: number) => {
      frames.current += 1;
      const delta = t - lastTime.current;
      if (delta >= 500) {
        setFps(Math.round((frames.current * 1000) / delta));
        frames.current = 0;
        lastTime.current = t;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return fps;
}
