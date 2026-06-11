"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { plans, type Plan } from "@/content/pricing";
import { cn } from "@/lib/cn";
import {
  ShaderBg,
  PEACH_PRESET,
  BLUE_PRESET,
  type ShaderBgPreset
} from "@/components/ui/ShaderBg";

const SHADER: Record<Plan["tint"], ShaderBgPreset> = {
  neutral: PEACH_PRESET,
  violet: BLUE_PRESET
};

/* Four-dot diamond marker at the top of each card */
function PlanMark({ tone }: { tone: Plan["tint"] }) {
  const fill = tone === "violet" ? "#7B5AE0" : "#F77E5C";
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <circle cx="14" cy="5" r="2.8" fill={fill} />
      <circle cx="5" cy="14" r="2.8" fill={fill} />
      <circle cx="23" cy="14" r="2.8" fill={fill} />
      <circle cx="14" cy="23" r="2.8" fill={fill} />
    </svg>
  );
}

/** Image-backed gradients — saved in /public/ at full bleed. */
const tintImage: Record<Plan["tint"], string> = {
  neutral: "/Pricing-peach.png",
  violet: "/Pricing-blue.png"
};

const priceColor: Record<Plan["tint"], string> = {
  neutral: "text-ink dark:text-dark-text",
  violet: "text-ink dark:text-dark-text"
};

const checkClasses: Record<Plan["tint"], string> = {
  neutral:
    "bg-white/70 text-ink ring-1 ring-ink/10 dark:bg-white/15 dark:text-white dark:ring-white/15",
  violet:
    "bg-white/70 text-ink ring-1 ring-ink/10 dark:bg-white/15 dark:text-white dark:ring-white/15"
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] pb-7 pt-6 ring-1 ring-black/5 dark:ring-white/10 md:pb-9 md:pt-7">
      {/* Live shader gradient surface */}
      <ShaderBg preset={SHADER[plan.tint]} />

      {/* Dark-mode tint over the shader so it reads as a dark surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden bg-dark/60 dark:block"
      />

      <div className="relative z-10 px-6 md:px-7">
        {/* Marker */}
        <PlanMark tone={plan.tint} />

        {/* Title + description */}
        <h3 className="mt-5 font-serif text-[clamp(2rem,3vw,2.5rem)] font-normal leading-[1.02] tracking-tight text-ink dark:text-dark-text">
          {plan.name}
        </h3>
        <p className="mt-2 max-w-xs text-[13px] leading-[1.45] text-ink/70 dark:text-dark-text/70">
          {plan.description}
        </p>

        {/* Pricing rows */}
        <div className="mt-5 space-y-0.5">
          {plan.pricing.map((row) => (
            <div key={row.label} className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-sans text-[24px] font-semibold tracking-tight",
                  priceColor[plan.tint]
                )}
              >
                {row.value}
              </span>
              <span className="text-[12.5px] text-ink/65 dark:text-dark-text/65">
                · {row.label}
              </span>
            </div>
          ))}
          {plan.pricingNote ? (
            <p className="pt-1.5 text-[11.5px] italic text-ink/65 dark:text-dark-text/65">
              *{plan.pricingNote}
            </p>
          ) : null}
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-2.5 pb-7">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink dark:text-dark-text"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md",
                  checkClasses[plan.tint]
                )}
                aria-hidden
              >
                <Check size={10} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA — pill button */}
      <div className="relative z-10 mt-auto px-6 md:px-7">
        <a
          href={plan.cta.href}
          className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-white shadow-[0_8px_18px_-8px_rgba(15,17,21,0.4)] transition-all duration-200 hover:bg-ink-soft hover:shadow-[0_10px_22px_-8px_rgba(15,17,21,0.55)] dark:bg-white dark:text-ink dark:hover:bg-dark-text"
        >
          {plan.cta.label}
          <ArrowRight
            size={13}
            strokeWidth={2.25}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}

export function PricingPlans() {
  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="container max-w-[1180px]">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} {...fadeUp(i * 0.08)} className="h-full">
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
