import clsx from "clsx";

export default function Tag({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-1 font-pixel text-[9px] uppercase tracking-wider text-muted",
        "transition-colors duration-300 hover:text-cyan",
        className
      )}
    >
      {children}
    </span>
  );
}
