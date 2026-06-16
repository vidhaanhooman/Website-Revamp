import * as React from "react";
import { cn } from "@/lib/cn";

/* shadcn-style Badge with semantic variants for run/pass/fail states. */

type BadgeVariant = "default" | "pass" | "fail" | "running" | "outline";

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white/80",
  pass: "bg-emerald-500/10 text-emerald-300",
  fail: "bg-[#E5413B]/12 text-[#FF8A7A]",
  running: "bg-amber-400/12 text-amber-300",
  outline: "border border-white/15 text-white/70"
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-[2px] font-sans text-[9px] font-medium tracking-[0.14em]",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
