"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
  accent?: "cyan" | "magenta" | "lime";
  icon?: ReactNode;
  children: ReactNode;
}

const accentMap = {
  cyan: {
    border: "border-cyan",
    text: "text-cyan",
    shadow: "hover:shadow-[0_0_24px_rgba(0,246,255,0.45)]",
    solid: "bg-cyan text-black",
  },
  magenta: {
    border: "border-magenta",
    text: "text-magenta",
    shadow: "hover:shadow-[0_0_24px_rgba(255,46,230,0.45)]",
    solid: "bg-magenta text-black",
  },
  lime: {
    border: "border-lime",
    text: "text-lime",
    shadow: "hover:shadow-[0_0_24px_rgba(198,255,43,0.45)]",
    solid: "bg-lime text-black",
  },
};

/**
 * Arcade-style CTA button. `data-cursor="link"` lets CustomCursor
 * detect hover targets and morph accordingly.
 */
export default function Button({
  variant = "ghost",
  accent = "cyan",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const a = accentMap[accent];
  return (
    <button
      data-cursor="link"
      className={clsx(
        "group relative inline-flex items-center gap-3 px-7 py-3.5 font-display text-xs font-bold uppercase tracking-[0.2em]",
        "transition-all duration-300 ease-out active:scale-95",
        variant === "solid"
          ? clsx(a.solid, "hover:brightness-110", a.shadow)
          : clsx("border bg-transparent", a.border, a.text, "hover:bg-white/5", a.shadow),
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10">{icon}</span>}
      {/* corner ticks — arcade cabinet button framing */}
      <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border-t border-l border-current opacity-60" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-current opacity-60" />
    </button>
  );
}
