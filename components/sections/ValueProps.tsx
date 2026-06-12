"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------- Cursor-following soft glow per card ------------------- */
function useCardPointer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return { ref, hover, setHover };
}

/* ---------- Numbered badge --------------------------------------- */
interface BadgeStyle {
  bg: string;
  text: string;
  border: string;
  glow: string;
}

const BADGE_STYLES: BadgeStyle[] = [
  // 01 — deep violet
  {
    bg: "#5A3FB0",
    text: "#FFFFFF",
    border: "rgba(90,63,176,0.25)",
    glow: "rgba(123,90,224,0.35)"
  },
  // 02 — coral / ember
  {
    bg: "#F77E5C",
    text: "#FFFFFF",
    border: "rgba(247,126,92,0.25)",
    glow: "rgba(247,126,92,0.35)"
  },
  // 03 — soft cream
  {
    bg: "#FAE9D6",
    text: "#5A3FB0",
    border: "rgba(228,200,170,0.5)",
    glow: "rgba(250,233,214,0.5)"
  }
];

function NumberBadge({ index }: { index: number }) {
  const s = BADGE_STYLES[index];
  return (
    <div
      className="relative flex h-12 w-12 items-center justify-center rounded-full font-mono text-[10.5px] font-semibold tracking-[0.18em] transition-transform duration-300 ease-out group-hover:scale-105"
      style={{
        background: s.bg,
        color: s.text,
        boxShadow: `0 0 0 4px rgba(255,255,255,0.6), 0 12px 28px -10px ${s.glow}`
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </div>
  );
}

/* ---------- Stat row ---------------------------------------------- */
interface StatRow {
  value: string;
  description: string;
}

const STATS: StatRow[] = [
  {
    value: "3.2× pickup",
    description:
      "Brightside Dental — after-hours coverage, no missed calls between 9 PM and 8 AM."
  },
  {
    value: "6 days",
    description:
      "Apex Home Services — kickoff to first live caller, ops team of three."
  },
  {
    value: "+38% bookings",
    description:
      "Brookside Care — multi-clinic group, measured against the prior 30 days."
  }
];

function StatColumn({ stat, index }: { stat: StatRow; index: number }) {
  const { ref, setHover } = useCardPointer();
  return (
    <div
      ref={ref}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group relative flex flex-col items-center px-6 py-12 text-center md:px-8 md:py-14"
    >
      {/* Cursor-following soft glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px 220px at var(--x, 50%) var(--y, 50%), rgba(123,90,224,0.08), transparent 70%)"
        }}
      />

      {/* Numbered badge */}
      <NumberBadge index={index} />

      {/* Vertical line drawing down from the badge */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.15 + index * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-3 h-[120px] w-px origin-top bg-gradient-to-b from-ink/25 via-ink/15 to-transparent dark:from-dark-text/30 dark:via-dark-text/15 dark:to-transparent md:h-[140px]"
      />

      {/* Big stat */}
      <div className="mt-7 max-w-[260px]">
        <div className="font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-ink transition-colors duration-300 group-hover:text-[#5A3FB0] dark:text-dark-text dark:group-hover:text-[#C2A8FF]">
          {stat.value}
        </div>
        <p className="mt-4 text-[13.5px] leading-[1.55] text-muted dark:text-dark-muted">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

export function ValueProps() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container max-w-[1180px]">
        {/* Pill chip */}
        <motion.div {...fadeUp(0)} className="flex justify-center">
          <span className="inline-flex items-center rounded-md border border-[#7B5AE0]/30 bg-[#7B5AE0]/8 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#5A3FB0] dark:border-[#7B5AE0]/40 dark:bg-[#7B5AE0]/15 dark:text-[#C2A8FF]">
            Built for India-first care &amp; service teams
          </span>
        </motion.div>

        {/* Headline — Instrument Serif */}
        <motion.h2
          {...fadeUp(0.08)}
          className="mx-auto mt-6 max-w-3xl text-balance text-center font-serif text-[clamp(2.25rem,4.2vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-ink dark:text-dark-text"
        >
          HoomanLabs picks up every call, in every language, before your team
          picks up the next one.
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.14)}
          className="mx-auto mt-4 max-w-xl text-center text-[14.5px] leading-[1.55] text-muted dark:text-dark-muted"
        >
          Sub-300ms latency, eleven Indian languages, drops into your stack —
          and tracks every call so you can prove the lift.
        </motion.p>

        {/* Outer container — rounded card with hairline border holds the
            three columns, mirroring the reference's framed layout */}
        <motion.div
          {...fadeUp(0.22)}
          className="mx-auto mt-14 overflow-hidden rounded-3xl border border-hairline bg-bg-warm/40 dark:border-dark-edge dark:bg-dark-soft/40 md:mt-16"
        >
          <div className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-dark-edge">
            {STATS.map((s, i) => (
              <StatColumn key={s.value} stat={s} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
