"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 2) * 0.08,
          ease: "power3.out",
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" ref={rootRef} className="relative border-t border-line px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-pixel text-[9px] uppercase tracking-[0.4em] text-magenta">
              Mission Log
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-wide text-fg sm:text-5xl">
              Tutorial
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted">
            Aprenda a usar o método STM, como funciona, e como ele pode te ajudar a ter acesso a uma biblioteca de jogos completa e atualizada.
          </p>
        </div>

        <div className="project-card relative mx-auto flex aspect-video w-full max-w-4xl flex-col items-center justify-center overflow-hidden border border-line bg-panel bg-noise-panel">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/teste.mp4"
            controls
            playsInline
            preload="none"
          />
        </div>
      </div>
    </section>
  );
}
