"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/* shadcn-style Progress. Determinate via `value`, or `indeterminate` for an
   in-progress sweep. `indicatorClassName` colours the fill. */

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indeterminate?: boolean;
  /** Drives the entrance/animation; set false to hold at empty. */
  active?: boolean;
  indicatorClassName?: string;
}

export function Progress({
  value = 0,
  indeterminate = false,
  active = true,
  indicatorClassName,
  className,
  ...props
}: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      className={cn(
        "relative h-[4px] w-full overflow-hidden rounded-full bg-white/[0.07]",
        className
      )}
      {...props}
    >
      {indeterminate ? (
        <motion.span
          className={cn(
            "absolute inset-y-0 w-1/3 rounded-full bg-amber-400",
            indicatorClassName
          )}
          initial={{ left: "-35%" }}
          animate={active ? { left: ["-35%", "100%"] } : { left: "-35%" }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
        />
      ) : (
        <motion.span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-white",
            indicatorClassName
          )}
          initial={{ width: 0 }}
          animate={active ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
