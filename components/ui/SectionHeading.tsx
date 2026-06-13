"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small label that sits above the H2 (italic mono caption - sparing use). */
  caption?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  /** Render the title slightly smaller for sub-sections. */
  size?: "md" | "lg";
}

export function SectionHeading({
  caption,
  title,
  description,
  align = "center",
  className,
  size = "lg"
}: SectionHeadingProps) {
  const wrap =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mx-auto flex max-w-2xl flex-col gap-4", wrap, className)}
    >
      {caption ? (
        <span className="font-mono text-[12px] italic text-ink/65 dark:text-dark-text/65">
          {caption}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-sans font-medium leading-[1.05] tracking-snug text-ink dark:text-dark-text",
          size === "lg"
            ? "text-[clamp(1.75rem,4vw,2.6rem)]"
            : "text-[clamp(1.5rem,3vw,2rem)]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-[15px] leading-[1.6] text-muted dark:text-dark-muted">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
