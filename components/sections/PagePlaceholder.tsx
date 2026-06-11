"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

interface PagePlaceholderProps {
  chipIcon?: ReactNode;
  chipLabel: string;
  title: ReactNode;
  description: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}

export function PagePlaceholder({
  chipIcon,
  chipLabel,
  title,
  description,
  ctaLabel = "Back to home",
  ctaHref = "/"
}: PagePlaceholderProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center pt-36 md:pt-44">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <Chip icon={chipIcon}>{chipLabel}</Chip>
          <h1 className="mt-6 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-snug text-ink">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-[15.5px] leading-[1.6] text-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <a href={ctaHref}>
              <Button variant="primary" size="md">
                {ctaLabel}
              </Button>
            </a>
            <a href="#demo">
              <Button variant="outline" size="md">
                Book a Demo
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
