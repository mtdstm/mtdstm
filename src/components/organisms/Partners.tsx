"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { partners } from "@/data/misc";

export default function Partners() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(".partner-logo", {
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, rootRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.refresh());
    };
  }, [reduced]);

  return (
    <section id="partners" ref={rootRef} className="relative border-t border-line px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-pixel text-[9px] uppercase tracking-[0.4em] text-lime">
            Co-op Mode
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-wide text-fg sm:text-5xl">
            Studios We Level Up With
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted sm:text-base">
            Proudly building alongside teams shipping the games players
            actually talk about.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((name) => (
            <div
              key={name}
              className="partner-logo group flex h-24 items-center justify-center bg-bg px-4 text-center transition-colors hover:bg-panel"
            >
              <span className="font-display text-xs font-bold tracking-wider text-muted transition-colors duration-300 group-hover:text-cyan sm:text-sm">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
