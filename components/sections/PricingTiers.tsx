"use client";

import { motion } from "framer-motion";
import {
  Check,
  Calendar,
  CreditCard,
  Headphones,
  Sparkles
} from "lucide-react";
import { tiers } from "@/content/pricing";

const TRUSTED_BY = [
  "Brightside Dental",
  "Apex Home Services",
  "RyderHealth",
  "PharmEasy",
  "Groww",
  "Meridian Insurance"
] as const;

const FOOTER_NOTES = [
  { Icon: Calendar, label: "Free 14-day pilot" },
  { Icon: CreditCard, label: "No credit card required" },
  { Icon: Headphones, label: "Stellar India-based support" }
];

/* Coral accent (matches the Hero sun and AI Agent highlight elsewhere) */
const CORAL = "#F77E5C";
const CORAL_BG = "rgba(247,126,92,0.15)";
const CORAL_SHADOW = "rgba(247,126,92,0.35)";

function TierBurst({ highlight = false }: { highlight?: boolean }) {
  const color = highlight ? CORAL : "rgba(255,255,255,0.55)";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x2 = 10 + Math.cos(a) * 9;
        const y2 = 10 + Math.sin(a) * 9;
        return (
          <circle
            key={i}
            cx={x2}
            cy={y2}
            r={i % 2 === 0 ? 1.1 : 0.7}
            fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.5}
          />
        );
      })}
      <circle cx="10" cy="10" r="1.4" fill={color} />
    </svg>
  );
}

export function PricingTiers() {
  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0d]">
          {/* Dotted grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 0.8px, transparent 0.8px)",
              backgroundSize: "14px 14px"
            }}
          />

          <div className="relative px-6 py-16 md:px-12 md:py-20">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-3xl text-center font-serif text-[clamp(2.25rem,4.6vw,3.4rem)] font-normal leading-[1.05] tracking-tight text-white"
            >
              Pick up every call. In every language.
            </motion.h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-[1.55] text-white/60">
              Simple, transparent pricing that scales with you. Start with
              1,000 free credits - no card required.
            </p>

            {/* Trusted by */}
            <div className="mx-auto mt-12 max-w-2xl text-center">
 <p className="font-sans text-[10.5px] font-medium tracking-[0.04em] text-white/45">
                Trusted by India&apos;s best care &amp; service teams
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4 md:grid-cols-3">
                {TRUSTED_BY.map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-center gap-2 font-sans text-[14px] font-semibold tracking-tight text-white/70"
                  >
                    <span className="h-2 w-2 rounded-sm bg-white/35" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier grid - 2 columns, centered */}
            <div className="mx-auto mt-14 grid max-w-[920px] gap-5 md:grid-cols-2">
              {tiers.map((t) => {
                const isHighlight = !!t.highlight;
                return (
                  <motion.article
                    key={t.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className={
                      "relative flex flex-col rounded-2xl border bg-[#0d0d12] p-7 transition-colors md:p-8 " +
                      (isHighlight
                        ? "border-transparent"
                        : "border-white/10 hover:border-white/20")
                    }
                    style={
                      isHighlight
                        ? {
                            boxShadow: `0 0 0 1px ${CORAL}, 0 30px 60px -30px ${CORAL_SHADOW}`
                          }
                        : undefined
                    }
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <TierBurst highlight={isHighlight} />
                        <span className="font-sans text-[15px] font-semibold tracking-tight text-white">
                          {t.name}
                        </span>
                      </div>
                      {isHighlight ? (
                        <span
 className="rounded-md px-2 py-[3px] font-sans text-[10px] font-semibold tracking-[0.04em]"
                          style={{ backgroundColor: CORAL_BG, color: CORAL }}
                        >
                          Most popular
                        </span>
                      ) : null}
                    </div>

                    {/* Blurb */}
                    <p className="mt-3 max-w-sm text-[13.5px] leading-[1.55] text-white/60">
                      {t.blurb}
                    </p>

                    {/* Dual rate display */}
                    <div className="mt-7 space-y-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      {t.rates.map((r, i) => (
                        <div
                          key={r.label}
                          className={
                            "flex items-baseline justify-between gap-3 " +
                            (i > 0 ? "border-t border-white/[0.05] pt-2.5" : "")
                          }
                        >
                          <span className="font-sans text-[13px] font-medium text-white/70">
                            {r.label}
                          </span>
                          <span className="flex items-baseline gap-1">
                            <span className="font-sans text-[28px] font-semibold leading-none tracking-tight text-white">
                              {r.rate}
                            </span>
 <span className="font-sans text-[10.5px] font-medium tracking-[0.04em] text-white/45">
                              /min
                            </span>
                          </span>
                        </div>
                      ))}
                      {t.rateNote ? (
                        <p
                          className="border-t border-white/[0.05] pt-2.5 font-sans text-[11.5px] italic"
                          style={{ color: isHighlight ? CORAL : "rgba(255,255,255,0.45)" }}
                        >
                          {t.rateNote}
                        </p>
                      ) : null}
                    </div>

                    {/* Features */}
                    <ul className="mt-6 flex-1 space-y-2">
                      {t.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-white/75"
                        >
                          <Check
                            size={13}
                            strokeWidth={3}
                            className="mt-[3px] shrink-0"
                            style={{
                              color: isHighlight ? CORAL : "rgba(255,255,255,0.45)"
                            }}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={t.cta.href}
                      className={
                        "mt-7 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 font-sans text-[13.5px] font-semibold transition-colors " +
                        (isHighlight
                          ? "text-white hover:opacity-90"
                          : "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]")
                      }
                      style={
                        isHighlight
                          ? { backgroundColor: CORAL }
                          : undefined
                      }
                    >
                      {t.cta.label}
                    </a>
                  </motion.article>
                );
              })}
            </div>

            {/* Startup callout */}
            <p className="mt-10 text-center font-sans text-[13.5px] text-white/60">
              <Sparkles
                size={13}
                strokeWidth={2}
                className="mr-1.5 inline align-[-2px]"
                style={{ color: CORAL }}
              />
              Early-stage startup?{" "}
              <a
                href="/#agent-demo"
                className="font-medium text-white underline decoration-white/30 underline-offset-2 hover:decoration-white/70"
              >
                Apply to our founder program
              </a>{" "}
              for 50% off your first six months.
            </p>

            {/* Footer strip */}
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-white/10 pt-8">
              {FOOTER_NOTES.map(({ Icon, label }) => (
                <span
                  key={label}
 className="flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.04em] text-white/55"
                >
                  <Icon
                    size={13}
                    strokeWidth={1.75}
                    className="text-white/45"
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
