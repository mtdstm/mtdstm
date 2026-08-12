export default function AwardBadge({ label }: { label: string }) {
  return (
    <div className="absolute -right-2 -top-2 z-20 flex h-16 w-16 rotate-6 items-center justify-center rounded-full border border-lime bg-bg/90 text-center shadow-[0_0_18px_rgba(198,255,43,0.35)]">
      <span className="font-pixel text-[6.5px] uppercase leading-tight text-lime">
        {label}
      </span>
    </div>
  );
}
