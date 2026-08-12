export default function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
      <span className="font-pixel text-[8px] uppercase tracking-[0.3em] text-muted">Scroll</span>
      <div className="flex flex-col gap-0.5">
        <svg width="14" height="8" viewBox="0 0 14 8" className="animate-bounce text-cyan" style={{ animationDelay: "0ms" }}>
          <path d="M1 1 L7 7 L13 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg width="14" height="8" viewBox="0 0 14 8" className="animate-bounce text-cyan/50" style={{ animationDelay: "150ms" }}>
          <path d="M1 1 L7 7 L13 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
}
