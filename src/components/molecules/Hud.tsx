"use client";

/** "Online" status pill (top-right, next to nav). Purely game-UI flavour, doesn't gate any real functionality. */
export function OnlineBadge() {
  return (
    <div className="flex items-center gap-1.5 border border-line px-2.5 py-1 font-pixel text-[9px] text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
      </span>
      ONLINE
    </div>
  );
}
