import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ImageCardProps {
  children: ReactNode;
  className?: string;
  radius?: "lg" | "xl" | "2xl";
  /** Render a soft dark gradient at the bottom for overlay text legibility. */
  overlay?: boolean;
}

const radii = {
  lg: "rounded-3xl",
  xl: "rounded-4xl",
  "2xl": "rounded-5xl"
};

export function ImageCard({
  children,
  className,
  radius = "xl",
  overlay = false
}: ImageCardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        radii[radius],
        className
      )}
    >
      {children}
      {overlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/65 via-black/30 to-transparent"
        />
      ) : null}
    </div>
  );
}
