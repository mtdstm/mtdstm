import clsx from "clsx";

/** Small geometric triangle icon — expands/rotates on hover via parent group. */
export function IconTriangle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={clsx("h-3 w-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-90", className)}
      fill="currentColor"
    >
      <path d="M8 2 L14 14 L2 14 Z" />
    </svg>
  );
}

/** Small plus icon — rotates into an X on hover via parent group. */
export function IconPlus({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={clsx("h-3 w-3 transition-transform duration-300 group-hover:rotate-45", className)}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M8 2 V14 M2 8 H14" />
    </svg>
  );
}
