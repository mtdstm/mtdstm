"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/molecules/ProjectCard";

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
              Catalogo de Jogos
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted">
            Eight builds, zero filler. Each one shipped with the same
            obsession over motion, performance, and feel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
