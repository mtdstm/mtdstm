"use client";

import { OnlineBadge } from "@/components/molecules/Hud";

/** Top nav: Player 1 tag + online status. */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <OnlineBadge />
          </div>
          <div className="flex items-center gap-2 border border-line px-2.5 py-1.5 font-pixel text-[9px] text-muted">
            <span className="h-1.5 w-1.5 bg-magenta" />
            PLAYER 1
          </div>
        </div>
      </div>
    </header>
  );
}
