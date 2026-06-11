import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChipProps {
  icon?: ReactNode;
  children: ReactNode;
  tone?: "default" | "dark" | "inverse";
  className?: string;
}

const tones = {
  default:
    "bg-white text-ink border border-hairline shadow-soft",
  dark: "bg-mock-elevated text-mock-text border border-mock-border",
  inverse: "bg-ink text-white border border-ink"
};

export function Chip({ icon, children, tone = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium",
        tones[tone],
        className
      )}
    >
      {icon ? <span className="flex text-ink/70">{icon}</span> : null}
      {children}
    </span>
  );
}
