"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { plans, type Plan } from "@/content/pricing";
import { biggerGroup } from "@/content/pricing-teams";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

function PlanCard({ plan, badge }: { plan: Plan; badge?: string }) {
  return (
    <article className="relative flex h-full flex-col rounded-[28px] bg-[#FAF1EC] p-8 dark:bg-dark-soft md:p-10">
      {/* Header: name + optional badge */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.02] tracking-tight text-ink dark:text-dark-text">
          {plan.name}
        </h2>
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-ink px-3.5 py-1 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white dark:bg-white dark:text-ink">
            {badge}
          </span>
        ) : null}
      </div>

      {/* Description */}
      <p className="mt-4 max-w-md text-[14.5px] leading-[1.5] text-ink/70 dark:text-dark-text/70">
        {plan.description}
      </p>

      {/* Pricing block: each row is a big serif price + tiny role label */}
      <div className="mt-8 space-y-4">
        {plan.pricing.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <span className="font-serif text-[clamp(2.25rem,3.6vw,3rem)] font-normal leading-none tracking-tight text-ink dark:text-dark-text">
              {row.value}
            </span>
            <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink/55 dark:text-dark-text/55">
              · {row.label}
            </span>
          </div>
        ))}
        {plan.pricingNote ? (
          <p className="pt-1 text-[12px] italic text-ink/55 dark:text-dark-text/55">
            *{plan.pricingNote}
          </p>
        ) : null}
      </div>

      {/* Features */}
      <ul className="mt-7 space-y-2.5">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink/80 dark:text-dark-text/80"
          >
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/55 dark:bg-dark-text/55"
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA pinned to the bottom */}
      <div className="mt-auto pt-9">
        <a
          href={plan.cta.href}
          className={cn(
            "group inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-200",
            badge
              ? "bg-white text-ink shadow-[0_2px_8px_rgba(15,17,21,0.08)] ring-1 ring-ink/8 hover:shadow-[0_4px_14px_rgba(15,17,21,0.14)] dark:bg-dark-edge dark:text-dark-text dark:ring-white/10"
              : "bg-ink text-white shadow-[0_8px_18px_-8px_rgba(15,17,21,0.4)] hover:bg-ink-soft hover:shadow-[0_10px_22px_-8px_rgba(15,17,21,0.55)] dark:bg-white dark:text-ink dark:hover:bg-dark-text"
          )}
        >
          {plan.cta.label}
          <ArrowRight
            size={13}
            strokeWidth={2.25}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export function PricingTeams() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
      <div className="container max-w-[1180px]">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <motion.div {...fadeUp(0)} className="h-full">
            <PlanCard plan={plans[0]} />
          </motion.div>
          <motion.div {...fadeUp(0.08)} className="h-full">
            <PlanCard plan={plans[1]} badge="PRO" />
          </motion.div>
        </div>

        {/* Bigger group banner */}
        <motion.div
          {...fadeUp(0.16)}
          className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[28px] bg-[#FAF1EC] p-7 dark:bg-dark-soft sm:flex-row sm:items-center md:p-9"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-ink/8 dark:bg-dark-edge dark:ring-white/10">
              <Users
                size={18}
                strokeWidth={1.6}
                className="text-ink dark:text-dark-text"
              />
            </span>
            <span className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-tight tracking-tight text-ink dark:text-dark-text">
              {biggerGroup.label}
            </span>
          </div>

          <a
            href={biggerGroup.cta.href}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[14px] font-medium text-ink shadow-[0_2px_8px_rgba(15,17,21,0.08)] ring-1 ring-ink/8 transition-all hover:shadow-[0_4px_14px_rgba(15,17,21,0.14)] dark:bg-dark-edge dark:text-dark-text dark:ring-white/10"
          >
            {biggerGroup.cta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
