"use client";

import { motion } from "framer-motion";

export function PricingHero() {
  return (
    <section className="relative pt-32 md:pt-40">
      <div className="container max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[13px] text-muted dark:text-dark-muted">
            Pricing
          </span>
          <h1 className="mt-3 font-dmsans text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink dark:text-dark-text">
            Plans that fit your call volume{" "}
            <br className="hidden md:block" />
            and ops headcount.
          </h1>
          <p className="mt-5 max-w-xl text-[14px] leading-[1.6] text-muted dark:text-dark-muted">
            Get started with 1,000 free credits to experience HoomanLabs for
            your front desk, then upgrade when your call queue grows.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
