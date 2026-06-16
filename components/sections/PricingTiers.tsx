"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { tiers, type PricingTier } from "@/content/pricing";

/* Pricing in the reference 3-tier SaaS layout, but driven by our real
   per-minute tier data (content/pricing.ts). Highlighted tier sits
   elevated; rates shown as a Standard/Premium per-minute block. */

const FOOTER_NOTE = "No credit card needed";

export function PricingTiers() {
  return (
    <section className="relative px-6 pb-28 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            [01] &nbsp; Pricing
          </p>
          <h1 className="mt-5 font-dmsans text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            Pay only for the minutes you use.
          </h1>
        </motion.div>

        {/* Cards - centered, our two real tiers, equal weight */}
        <div className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {tiers.map((t, i) => (
            <PlanCard key={t.id} tier={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ tier, index }: { tier: PricingTier; index: number }) {
  const hl = tier.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      className={
        "flex flex-col rounded-3xl px-7 py-8 md:px-8 md:py-10 " +
        (hl
          ? "border border-[#F77E5C]/30 bg-white/[0.03]"
          : "border border-white/10 bg-white/[0.015]")
      }
    >
      {/* Name + blurb */}
      <div className="flex items-center gap-2.5">
        <span className="text-[19px] font-semibold tracking-tight text-white">
          {tier.name}
        </span>
        {hl && (
          <span className="rounded-full bg-[#F77E5C]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F77E5C]">
            Best value
          </span>
        )}
      </div>
      <p className="mt-2 min-h-[40px] text-[13.5px] leading-[1.5] text-white/50">
        {tier.blurb}
      </p>

      {/* Rate block - Standard / Premium per minute, or "Custom" when none */}
      {tier.rates.length > 0 ? (
        <div className="mt-6 space-y-3">
          {tier.rates.map((r) => (
            <div
              key={r.label}
              className="flex items-baseline justify-between border-b border-white/[0.06] pb-3 last:border-b-0"
            >
              <span className="text-[13px] text-white/55">{r.label}</span>
              <span className="flex items-baseline gap-0.5">
                <span className="font-sans text-[26px] font-bold tracking-tight text-white">
                  {r.rate}
                </span>
                <span className="text-[13px] text-white/45">/min</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-sans text-[26px] font-bold tracking-tight text-white">
            Custom
          </span>
          <span className="text-[13px] text-white/45">pricing</span>
        </div>
      )}
      {tier.rateNote && (
        <p className="mt-3 text-[12px] leading-[1.5] text-[#F77E5C]/80">
          {tier.rateNote}
        </p>
      )}

      {/* Divider */}
      <div className="my-7 h-px w-full bg-white/10" />

      {/* Features */}
      <ul className="flex-1 space-y-3.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              size={15}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-white/55"
            />
            <span className="text-[13.5px] leading-[1.4] text-white/80">
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={tier.cta.href}
        className={
          "mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-[14px] font-semibold transition-colors " +
          (hl
            ? "bg-white text-ink hover:bg-white/90"
            : "border border-white/15 text-white hover:bg-white/[0.05]")
        }
      >
        {tier.cta.label}
      </Link>
      <p className="mt-3 text-center text-[12px] text-white/40">{FOOTER_NOTE}</p>
    </motion.div>
  );
}
