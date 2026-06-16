"use client";

import { motion } from "framer-motion";
import { stats } from "@/content/pricing";
import { testimonials } from "@/content/testimonials";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

/* A stat tile - short metric + label, neutral surface */
function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-hairline bg-white p-5 dark:border-dark-edge dark:bg-dark-soft md:p-6">
      <div className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal leading-none tracking-tight text-ink dark:text-dark-text">
        {value}
      </div>
      <div className="mt-7 text-[12.5px] leading-snug text-muted dark:text-dark-muted">
        {label}
      </div>
    </div>
  );
}

/* A wider testimonial tile - quote + author + company on a soft tint */
function TestimonialTile({
  index
}: {
  index: number;
}) {
  const t = testimonials[index];
  const tints = [
    "bg-[radial-gradient(70%_60%_at_100%_100%,#FCD1D8_0%,transparent_70%),linear-gradient(180deg,#FFFFFF_0%,#FBE3E8_100%)] dark:bg-[radial-gradient(70%_60%_at_100%_100%,rgba(231,55,121,0.25)_0%,transparent_70%),linear-gradient(180deg,#1A1720_0%,#2A1422_100%)]",
    "bg-[radial-gradient(70%_60%_at_100%_100%,#E1D5FB_0%,transparent_70%),linear-gradient(180deg,#FFFFFF_0%,#F1E8FF_100%)] dark:bg-[radial-gradient(70%_60%_at_100%_100%,rgba(123,90,224,0.25)_0%,transparent_70%),linear-gradient(180deg,#1A1720_0%,#221638_100%)]",
    "bg-[radial-gradient(70%_60%_at_100%_100%,#D5DFFB_0%,transparent_70%),linear-gradient(180deg,#FFFFFF_0%,#E5EDFB_100%)] dark:bg-[radial-gradient(70%_60%_at_100%_100%,rgba(59,107,216,0.25)_0%,transparent_70%),linear-gradient(180deg,#1A1720_0%,#152038_100%)]"
  ];

  return (
    <div
      className={
        "flex h-full flex-col justify-between rounded-3xl border border-hairline p-5 dark:border-dark-edge md:p-6 " +
        tints[index % tints.length]
      }
    >
      <div className="font-sans text-[15.5px] font-medium leading-snug tracking-snug text-ink dark:text-dark-text">
        {t.company}
      </div>
      <p className="mt-3 max-w-md text-[13.5px] leading-[1.55] text-ink/80 dark:text-dark-text/80">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-5 text-[12.5px] text-muted dark:text-dark-muted">
        <span className="font-medium text-ink dark:text-dark-text">
          {t.author}
        </span>
        <span className="mx-1.5">·</span>
        {t.role}
      </div>
    </div>
  );
}

export function PricingSocial() {
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container max-w-[1180px]">
        <motion.h2
          {...fadeUp(0)}
          className="mb-10 text-center font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-tight text-ink dark:text-dark-text md:mb-14"
        >
          What care &amp; service teams <br className="hidden md:block" />
          say about HoomanLabs
        </motion.h2>

        {/* Mosaic: row 1 - two stat tiles + wide testimonial */}
        <div className="grid gap-4 md:gap-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
            <motion.div {...fadeUp(0.02)} className="md:col-span-3">
              <StatTile {...stats[0]} />
            </motion.div>
            <motion.div {...fadeUp(0.04)} className="md:col-span-3">
              <StatTile {...stats[1]} />
            </motion.div>
            <motion.div {...fadeUp(0.06)} className="col-span-2 md:col-span-6">
              <TestimonialTile index={0} />
            </motion.div>
          </div>

          {/* Row 2 - wide testimonial + two stat tiles */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
            <motion.div {...fadeUp(0.02)} className="col-span-2 md:col-span-6">
              <TestimonialTile index={1} />
            </motion.div>
            <motion.div {...fadeUp(0.04)} className="md:col-span-3">
              <StatTile {...stats[2]} />
            </motion.div>
            <motion.div {...fadeUp(0.06)} className="md:col-span-3">
              <StatTile {...stats[3]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
