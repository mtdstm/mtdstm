"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Project } from "@/data/projects";
import Tag from "@/components/atoms/Tag";
import AwardBadge from "@/components/molecules/AwardBadge";
import { IconPlus } from "@/components/atoms/IconGeo";

const accentText: Record<Project["accent"], string> = {
  cyan: "group-hover:text-cyan group-hover:border-cyan",
  magenta: "group-hover:text-magenta group-hover:border-magenta",
  lime: "group-hover:text-lime group-hover:border-lime",
};

const accentGlow: Record<Project["accent"], string> = {
  cyan: "group-hover:shadow-[0_0_40px_rgba(0,246,255,0.25)]",
  magenta: "group-hover:shadow-[0_0_40px_rgba(255,46,230,0.25)]",
  lime: "group-hover:shadow-[0_0_40px_rgba(198,255,43,0.25)]",
};

export default function ProjectCard({ project }: { project: Project }) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <a
      data-cursor="link"
      href={project.cta.href}
      className={clsx(
        "project-card group relative flex flex-col overflow-hidden border border-line bg-panel transition-all duration-500",
        "hover:-translate-y-1.5",
        accentGlow[project.accent]
      )}
    >
      {project.award && <AwardBadge label={project.award} />}

      {/* reel background — plays on hover, static gradient otherwise */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-noise-panel">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
        {videoOk && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-90"
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onError={() => setVideoOk(false)}
          />
        )}
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center border border-line bg-bg/80 font-display text-[11px] font-bold text-fg">
          {project.logo}
        </div>
        <div
          className={clsx(
            "absolute right-3 top-3 border px-2 py-0.5 font-pixel text-[8px] uppercase tracking-widest text-muted transition-colors",
            accentText[project.accent]
          )}
        >
          {project.status === "live" ? "Live" : "Coming Soon"}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold uppercase tracking-wide text-fg">
            {project.title}
          </h3>
          <span className="group flex h-6 w-6 shrink-0 items-center justify-center border border-line text-muted transition-colors group-hover:border-cyan group-hover:text-cyan">
            <IconPlus />
          </span>
        </div>
        <p className="font-body text-sm text-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span
          className={clsx(
            "mt-2 inline-flex items-center gap-2 font-pixel text-[9px] uppercase tracking-widest text-fg transition-colors",
            accentText[project.accent]
          )}
        >
          {project.cta.label} →
        </span>
      </div>
    </a>
  );
}
