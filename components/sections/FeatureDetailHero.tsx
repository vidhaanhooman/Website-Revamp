"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface FeatureDetailHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional inline mock to show on the right side of the hero (desktop only). */
  preview?: React.ReactNode;
}

export function FeatureDetailHero({
  eyebrow,
  title,
  description,
  preview
}: FeatureDetailHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-20 md:pt-40">
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/FeaturePageHeader.png')" }}
      />
      {/* Dark scrim — keeps copy readable on any portion of the image */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.75) 100%)"
        }}
      />
      {/* Bottom fade — eases into the dark page surface below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#000]"
      />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Back link */}
        <Link
          href="/features"
 className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-medium tracking-[0.04em] text-white/65 transition-colors hover:text-white"
        >
          <ArrowLeft size={13} strokeWidth={2.25} />
          All features
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={
            "mt-8 grid items-end gap-10 " +
            (preview ? "md:grid-cols-[1.05fr_0.95fr]" : "md:grid-cols-1")
          }
        >
          {/* LEFT - copy */}
          <div>
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/65">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.25rem,4.8vw,3.75rem)] font-normal leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] font-medium leading-[1.6] text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="/#agent-demo"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-[13.5px] font-medium text-ink transition-colors hover:bg-white/85"
              >
                Try a live demo
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/30 px-5 py-2.5 font-sans text-[13.5px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/50"
              >
                See pricing
              </a>
            </div>
          </div>

          {/* RIGHT - optional preview */}
          {preview ? (
            <div className="relative hidden overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur-md md:block md:p-8">
              {preview}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Placeholder shell - fills the page until real content lands ─── */
interface FeatureContentPlaceholderProps {
  sections: { label: string; description: string }[];
}

export function FeatureContentPlaceholder({
  sections
}: FeatureContentPlaceholderProps) {
  return (
    <section className="relative px-4 pb-24 md:pb-28">
      <div className="mx-auto max-w-[1240px] space-y-4">
        {sections.map((s, i) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
 <p className="font-sans text-[10.5px] font-medium tracking-[0.04em] text-white/45">
                  Section {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 max-w-xl font-sans text-[22px] font-semibold leading-[1.2] tracking-tight text-white md:text-[26px]">
                  {s.label}
                </h2>
                <p className="mt-3 max-w-xl text-[14.5px] leading-[1.6] text-white/55">
                  {s.description}
                </p>
              </div>
 <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-sans text-[10px] font-medium tracking-[0.04em] text-white/55">
                Content pending
              </span>
            </div>

            {/* Empty placeholder strip - visual stand-in for the eventual mock */}
            <div className="relative mt-7 min-h-[220px] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.05) 0.8px, transparent 0.8px)",
                  backgroundSize: "14px 14px"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Consolidated detail section - used on /features/details ─── */
interface FeatureDetailSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  sections: { label: string; description: string }[];
  /** Custom React visual (mock) for the bottom of the section. Takes priority over `image`. */
  visual?: React.ReactNode;
  /** Optional bottom image - used when `visual` isn't provided. */
  image?: string;
  /** Alt text for the image. */
  imageAlt?: string;
  showDivider?: boolean;
}

export function FeatureDetailSection({
  id,
  eyebrow,
  title,
  description,
  sections,
  visual,
  image,
  imageAlt,
  showDivider = false
}: FeatureDetailSectionProps) {
  return (
    <section
      id={id}
      className={
        "relative px-4 py-16 md:py-20 " +
        (showDivider ? "border-t border-white/[0.06]" : "")
      }
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="mx-auto max-w-[1240px]">
        {/* ONE consolidated unit per feature - header + sub-features + visual */}
        <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8 md:p-12">
          {/* Header */}
          <div className="max-w-3xl">
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/55">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-sans text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[15.5px] font-medium leading-[1.6] text-white/70">
              {description}
            </p>
          </div>

          {/* Capability list - numbered, divided by hairlines, no per-row cards */}
          <ul className="mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {sections.map((s, i) => (
              <li
                key={s.label}
                className="grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-[80px_1fr] md:py-7"
              >
 <span className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-sans text-[19px] font-semibold leading-[1.25] tracking-tight text-white md:text-[20px]">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-white/60">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom visual - custom React mock > image > dotted placeholder */}
          {visual ? (
            <div className="relative mt-10">{visual}</div>
          ) : image ? (
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={imageAlt ?? ""}
                className="block h-auto w-full"
              />
            </div>
          ) : (
            <div className="relative mt-10 min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.05) 0.8px, transparent 0.8px)",
                  backgroundSize: "14px 14px"
                }}
              />
 <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-sans text-[10px] font-medium tracking-[0.04em] text-white/55">
                Content pending
              </span>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
