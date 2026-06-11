"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const AVATAR_TONES: Record<Testimonial["tone"], string> = {
  ember: "bg-[linear-gradient(135deg,#F77E5C,#E5413B)] text-white",
  violet: "bg-[linear-gradient(135deg,#9B89D8,#5A3FB0)] text-white",
  mint: "bg-[linear-gradient(135deg,#7AE1A4,#2D8B6A)] text-white",
  rose: "bg-[linear-gradient(135deg,#F08FB1,#D45A82)] text-white"
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-hairline bg-white p-6 transition-colors duration-200 hover:border-ink/20 dark:border-dark-edge dark:bg-dark-soft dark:hover:border-white/25 md:p-7">
      {/* Decorative quote glyph */}
      <Quote
        aria-hidden
        size={28}
        strokeWidth={1.5}
        className="absolute right-5 top-5 text-ink/15 transition-colors duration-200 group-hover:text-ink/30 dark:text-white/20 dark:group-hover:text-white/35"
      />

      <p className="text-balance pr-6 text-[15.5px] leading-[1.55] text-ink dark:text-dark-text">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-7 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-medium",
              AVATAR_TONES[t.tone]
            )}
            aria-hidden
          >
            <span className="text-[13px] tracking-tight">{t.initials}</span>
          </span>
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-medium text-ink dark:text-dark-text">
              {t.author}
            </div>
            <div className="truncate text-[12px] text-muted dark:text-dark-muted">
              {t.role} · {t.company}
            </div>
          </div>
        </div>
      </div>

      {/* Metric chip — sits at the bottom edge of the card */}
      <div className="mt-5 border-t border-hairline pt-4 dark:border-dark-edge">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70 dark:text-dark-text/70">
          <span className="h-1 w-1 rounded-full bg-emerald-500" aria-hidden />
          {t.metric}
        </span>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeading
          caption="Testimonials"
          title="Helping teams pick up every call, every day."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.author} {...fadeUp(i * 0.06)} className="h-full">
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
