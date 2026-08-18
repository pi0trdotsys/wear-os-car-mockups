import type { ReactNode } from "react";

/** Rounded device bezel used by both previews. */
export function WatchShell({
  children,
  size = 420,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <div
      className="relative rounded-full p-[10px]"
      style={{
        width: size + 20,
        height: size + 20,
        background:
          "linear-gradient(160deg, oklch(0.42 0.008 264), oklch(0.16 0.006 264) 55%, oklch(0.3 0.008 264))",
        boxShadow:
          "0 40px 80px -30px oklch(0 0 0 / 70%), inset 0 1px 0 oklch(1 0 0 / 14%)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}
