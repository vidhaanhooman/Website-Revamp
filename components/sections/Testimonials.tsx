"use client";

import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const AVATAR_TONES: Record<Testimonial["tone"], string> = {
  ember: "bg-[#E5572E] text-white",
  violet: "bg-[#7257C7] text-white",
  mint: "bg-[#3E9E72] text-white",
  rose: "bg-[#D45A82] text-white",
  sky: "bg-[#4877D8] text-white",
  amber: "bg-[#B88A4A] text-white"
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
});

function TestimonialCard({ t }: { t: Testimonial }) {
  const isLarge = t.size === "large";
  const accent = t.accent;

  // Surface treatments - light theme. Large "white" accent inverts to ink.
  const surface =
    accent === "white"
      ? "bg-ink text-white border-transparent shadow-[0_20px_60px_-20px_rgba(20,15,10,0.35)]"
      : accent === "coral"
        ? "bg-[#ef5b1f] text-white border-transparent shadow-[0_20px_60px_-20px_rgba(239,91,31,0.35)]"
        : "bg-white text-ink border-hairline hover:border-hairline-strong shadow-[0_10px_30px_-18px_rgba(20,15,10,0.18)]";

  const muted =
    accent === "white"
      ? "text-white/55"
      : accent === "coral"
        ? "text-white/75"
        : "text-ink/55";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col justify-between rounded-2xl border p-6 transition-colors duration-200 md:p-7",
        surface
      )}
    >
      {isLarge && t.brand ? (
        <div className="mb-5 flex items-center gap-2">
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold",
              accent === "white"
                ? "bg-white text-ink"
                : accent === "coral"
                  ? "bg-white text-[#ef5b1f]"
                  : "bg-ink text-white"
            )}
            aria-hidden
          >
            {t.brand[0]}
          </span>
          <span className="text-[13px] font-medium tracking-tight">
            {t.brand}
          </span>
        </div>
      ) : null}

      <p
        className={cn(
          "text-balance leading-[1.45]",
          isLarge ? "text-[20px] md:text-[22px]" : "text-[14.5px]"
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold tracking-tight">
            {t.author}
          </div>
          <div className={cn("truncate text-[12px]", muted)}>
            {t.role}, {t.company}
          </div>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-medium",
            AVATAR_TONES[t.tone]
          )}
          aria-hidden
        >
          <span className="text-[12px] tracking-tight">{t.initials}</span>
        </span>
      </div>
    </article>
  );
}

export function Testimonials() {
  // Indices in `testimonials` content array:
  // 0  large white   (col 1, row 1-2)
  // 1  small         (col 2, row 1)
  // 2  small         (col 2, row 2)
  // 3  small         (col 2, row 3)
  // 4  small         (col 3, row 1)
  // 5  small         (col 1, row 3)
  // 6  large coral   (col 3, row 2-3)
  const [largeWhite, m1, m2, m3, tr, bl, largeCoral] = testimonials;

  return (
    <section className="relative px-4 py-24 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        {/* Eyebrow row */}
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-hairline pb-6">
          <div>
 <p className="font-sans text-[11px] tracking-[0.04em] text-black/55">
              [02] &nbsp; Testimonials
            </p>
            <h2 className="mt-3 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-tight !text-black">
              Teams shipping voice agents that actually pick up.
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-[13px] leading-[1.55] text-black/65 md:block">
            Real ops leads, real call volumes, real money saved.
          </p>
        </div>

        {/* Asymmetric grid - desktop only; stacks on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
          {/* Col 1 row 1-2 - large white */}
          <motion.div
            {...fadeUp(0)}
            className="md:col-start-1 md:row-span-2 md:row-start-1"
          >
            <TestimonialCard t={largeWhite} />
          </motion.div>

          {/* Col 2 row 1 - small */}
          <motion.div
            {...fadeUp(0.04)}
            className="md:col-start-2 md:row-start-1"
          >
            <TestimonialCard t={m1} />
          </motion.div>

          {/* Col 3 row 1 - small */}
          <motion.div
            {...fadeUp(0.08)}
            className="md:col-start-3 md:row-start-1"
          >
            <TestimonialCard t={tr} />
          </motion.div>

          {/* Col 2 row 2 - small */}
          <motion.div
            {...fadeUp(0.12)}
            className="md:col-start-2 md:row-start-2"
          >
            <TestimonialCard t={m2} />
          </motion.div>

          {/* Col 3 row 2-3 - large coral */}
          <motion.div
            {...fadeUp(0.16)}
            className="md:col-start-3 md:row-span-2 md:row-start-2"
          >
            <TestimonialCard t={largeCoral} />
          </motion.div>

          {/* Col 1 row 3 - small */}
          <motion.div
            {...fadeUp(0.2)}
            className="md:col-start-1 md:row-start-3"
          >
            <TestimonialCard t={bl} />
          </motion.div>

          {/* Col 2 row 3 - small */}
          <motion.div
            {...fadeUp(0.24)}
            className="md:col-start-2 md:row-start-3"
          >
            <TestimonialCard t={m3} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
