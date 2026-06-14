"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code,
  Database,
  Circle as CircleIcon,
  PhoneIncoming,
  Phone
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { JOURNEY_VISUALS } from "@/components/sections/visuals/JourneyVisuals";

/* Build -> Ship -> Improve journey, rendered in the existing dark
   FeatureBento style: white/10 hairlines, white/[0.025] card surfaces,
 mono eyebrows, serif phase titles, dark shot slot on top
   of every card. Swap card.bg for a screenshot when ready. */

type Card = {
  n: string;
  label: string;
  tag: string; // small right-side category chip (Plivo-style)
  beta?: boolean;
  title: string;
  body: string;
  shotTop: string;
  shotSub: string;
  bg?: string;
};

const BUILD: Card[] = [
  {
    n: "01",
    label: "Prompt & flow",
    tag: "builder",
    title: "One prompt, or a full flow",
    body: "Start with a single prompt. Branch into structured, node-based flows the moment you need real control.",
    shotTop: "Prompt -> Flow",
    shotSub: "Builder · Flow canvas",
    bg: "/journey/01-flow.png"
  },
  {
    n: "02",
    label: "Context & memory",
    tag: "context",
    title: "It knows who's calling",
    body: "Pull live context before the call - pre-call APIs, CRM, past-conversation history, and knowledge libraries.",
    shotTop: "Context",
    shotSub: "Pre-call API · History · Knowledge",
    bg: "/journey/02-context.png"
  },
  {
    n: "03",
    label: "Tools",
    tag: "actions",
    title: "It takes action mid-call",
    body: "Connect tools so the agent books, updates, verifies, and calculates in real time - not just talks.",
    shotTop: "Tools",
    shotSub: "Tool builder",
    bg: "/journey/03-tools.png"
  },
  {
    n: "04",
    label: "Analysis & actions",
    tag: "outcomes",
    title: "It feeds your systems",
    body: "Define objectives, summaries, outcomes, and structured extraction - then fire webhooks straight into your stack.",
    shotTop: "Analysis + Call Actions",
    shotSub: "Outcomes · Webhooks",
    bg: "/journey/04-outcomes.png"
  }
];

const SHIP: Card[] = [
  {
    n: "05",
    label: "Simulate",
    tag: "preview",
    beta: true,
    title: "Hear it before they do",
    body: "Stress-test against real scenarios and personas - code-switching, refusals, edge cases - before anything goes live.",
    shotTop: "Simulation",
    shotSub: "Scenario · persona editor",
    bg: "/journey/05-simulate.png"
  },
  {
    n: "06",
    label: "Telephony",
    tag: "numbers",
    title: "Your number or ours",
    body: "Provision a number or bring your own carrier over SIP, and map each line to the right agent.",
    shotTop: "Numbers",
    shotSub: "Plivo · Twilio · BYOT · SIP",
    bg: "/journey/06-telephony.png"
  },
  {
    n: "07",
    label: "Go live",
    tag: "campaigns",
    title: "Pick up, or reach out",
    body: "Take inbound in three rings, or launch outbound campaigns to thousands with pacing and retries.",
    shotTop: "Campaigns",
    shotSub: "Inbound · Outbound at scale",
    bg: "/journey/07-golive.png"
  }
];

const IMPROVE: Card[] = [
  {
    n: "08",
    label: "Objective metrics",
    tag: "insights",
    title: "Every call, measured",
    body: "Real-time inbound and outbound dashboards down to per-turn latency, talk ratio, and end-of-utterance accuracy.",
    shotTop: "Insights",
    shotSub: "Call-quality + dashboards",
    bg: "/journey/08-metrics.png"
  },
  {
    n: "09",
    label: "Subjective metrics",
    tag: "quality",
    beta: true,
    title: "Judged like a human would",
    body: "Run LLM-judge metrics on a schedule, track pass rates over time, and catch a regression the moment it appears.",
    shotTop: "QA",
    shotSub: "Quality Analysis · pass rate",
    bg: "/journey/09-quality.png"
  },
  {
    n: "10",
    label: "Dashboards & alerts",
    tag: "alerts",
    beta: true,
    title: "Know the moment it moves",
    body: "Build the dashboards you need and set threshold or ratio alerts on the metrics that matter to your business.",
    shotTop: "Alerts",
    shotSub: "Threshold / ratio alerts",
    bg: "/journey/10-alerts.png"
  },
  {
    n: "11",
    label: "Branch · A/B · promote",
    tag: "versions",
    title: "Improve without the risk",
    body: "Change on a new version, A/B test it against the live one, and promote only the winner. Production never breaks.",
    shotTop: "Versions",
    shotSub: "main · Live · A/B test",
    bg: "/journey/11-branch.png"
  }
];

function StripeMargin({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute top-0 hidden h-full w-24 md:block " +
        (side === "left" ? "left-0" : "right-0")
      }
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 12px)",
        WebkitMaskImage:
          side === "left"
            ? "linear-gradient(to right, black, transparent)"
            : "linear-gradient(to left, black, transparent)",
        maskImage:
          side === "left"
            ? "linear-gradient(to right, black, transparent)"
            : "linear-gradient(to left, black, transparent)"
      }}
    />
  );
}

/* ─── Vertical phase rail - sticky, click-driven active state ──── */
const RAIL_PHASES = [
  { id: "lp-build", label: "Build", range: "01 – 04" },
  { id: "lp-ship", label: "Ship", range: "05 – 07" },
  { id: "lp-improve", label: "Improve", range: "08 – 11" }
] as const;

function PhaseRail() {
  const [active, setActive] = useState<string>("lp-build");
  return (
    <nav
      aria-label="Journey phases"
      className="sticky top-[76px] z-30 -mx-1 mb-2 flex w-fit items-center gap-1 self-start rounded-full border border-white/10 bg-[#0a0a0d]/85 p-1 backdrop-blur-xl"
    >
      {RAIL_PHASES.map((p) => {
        const isActive = active === p.id;
        return (
          <a
            key={p.id}
            href={`#${p.id}`}
            onClick={() => setActive(p.id)}
            className={
              "group/rail flex items-center gap-2 rounded-full px-4 py-2 transition-colors duration-300 " +
              (isActive
                ? "bg-white/[0.08]"
                : "hover:bg-white/[0.04]")
            }
          >
            <span
              className={
                "font-sans text-[14px] font-medium tracking-tight transition-colors duration-300 " +
                (isActive
                  ? "text-white"
                  : "text-white/50 group-hover/rail:text-white/80")
              }
            >
              {p.label}
            </span>
            <span
              className={
 "font-sans text-[10px] tracking-[0.04em] transition-colors duration-300 " +
                (isActive ? "text-[#F77E5C]/80" : "text-white/25")
              }
            >
              {p.range}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export function JourneyBento() {
  return (
    <section className="relative px-6 pb-24 pt-12 md:pt-16">
      <StripeMargin side="left" />
      <StripeMargin side="right" />

      <div className="mx-auto max-w-[1240px]">
        {/* Section header - minimal: eyebrow + concise headline. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            [01] &nbsp; How it works
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-normal leading-[1.1] tracking-tight text-white">
            From a single prompt to a million calls,{" "}
            <em className="not-italic italic text-white/50">
              better every week.
            </em>
          </h2>
        </motion.div>

        {/* Spacer so the cards below don't crowd the header */}
        <div className="h-10 md:h-14" />

        {/* Phases - horizontal rail above, content full-width below */}
        <PhaseRail />
        <Phase
          id="lp-build"
          idx="01 - 04"
          title="Build"
          note="Start simple, add depth only where the conversation needs it."
          cards={BUILD}
          cols={2}
        />
        <Phase
          id="lp-ship"
          idx="05 - 07"
          title="Ship"
          note="Prove it works, put it on a line, and go - inbound or outbound."
          cards={SHIP}
          cols={3}
        />
        <Phase
          id="lp-improve"
          idx="08 - 11"
          title="Improve"
          note="Measure what's objective and what's subjective - then close the loop, safely."
          cards={IMPROVE}
          cols={2}
          beforeGrid={<SplitCallout />}
        />

        {/* The loop - cinematic BSI landscape backdrop */}
        <div className="relative isolate mt-16 pb-12 pt-24 text-center">
          {/* Full-bleed BSI landscape, fades into dark at top & bottom */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 overflow-hidden"
          >
            <Image
              src="/BSI.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top opacity-40 blur-[1px]"
              priority={false}
            />
            {/* Heavier darkening - image reads as ambient atmosphere */}
            <div className="absolute inset-0 bg-[#0a0a0d]/65" />
            {/* Short top fade - blends from the dark phase cards above */}
            <div
              className="absolute inset-x-0 top-0 h-[18%]"
              style={{
                background:
                  "linear-gradient(to bottom, #0a0a0d 0%, transparent 100%)"
              }}
            />
            {/* Short bottom fade - blends into the CTAs below */}
            <div
              className="absolute inset-x-0 bottom-0 h-[22%]"
              style={{
                background:
                  "linear-gradient(to top, #0a0a0d 0%, transparent 100%)"
              }}
            />
          </div>

 <span className="inline-flex items-center gap-2.5 rounded-full border border-[#F77E5C]/35 bg-[#0a0a0d]/55 px-3.5 py-[7px] font-sans text-[11px] tracking-[0.04em] text-[#F77E5C] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F77E5C]" />
            The loop
          </span>
          <h2 className="mx-auto mt-5 max-w-[22ch] font-sans text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            Ship, measure, and improve -{" "}
            <em className="not-italic italic text-[#F77E5C]">
              without breaking what&apos;s live.
            </em>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[52ch] text-[15px] leading-[1.55] text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            Every change happens on its own version. The live agent keeps
            answering while you test the next one - so getting better never
            means going down.
          </p>
          <LoopSVG />

          <div className="mt-10 inline-flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-gilroy text-[13.5px] font-medium text-ink hover:bg-white/85"
            >
              Build your agent
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center rounded-full border border-white/30 bg-[#0a0a0d]/40 px-5 py-2.5 font-gilroy text-[13.5px] font-medium text-white backdrop-blur-sm hover:bg-[#0a0a0d]/70"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- internals ---------- */

function Phase({
  id,
  idx,
  title,
  note,
  cards,
  cols,
  beforeGrid
}: {
  id?: string;
  idx: string;
  title: string;
  note: string;
  cards: Card[];
  cols: 2 | 3;
  beforeGrid?: React.ReactNode;
}) {
  const gridCls =
    cols === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div id={id} className="mt-16 scroll-mt-28">
      <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/10 pt-8">
 <span className="font-sans text-[11.5px] tracking-[0.04em] text-[#F77E5C]">
          {idx}
        </span>
        <h3 className="font-sans text-[clamp(26px,3vw,38px)] font-semibold leading-[1.05] tracking-tight text-white">
          {title}
        </h3>
        <p className="ml-auto max-w-[36ch] text-[13.5px] leading-[1.5] text-white/55 md:text-right">
          {note}
        </p>
      </div>

      {beforeGrid}

      <div className={`grid gap-4 ${gridCls} ${beforeGrid ? "mt-4" : ""}`}>
        {cards.map((c) => (
          <JourneyCard key={c.n} card={c} />
        ))}
      </div>
    </div>
  );
}

function CardVisual({ n }: { n: string }) {
  const V = (JOURNEY_VISUALS as Record<string, React.FC>)[n];
  return V ? <V /> : null;
}

function JourneyCard({ card }: { card: Card }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-[#F77E5C]/35 hover:bg-white/[0.04] hover:shadow-[0_30px_60px_-25px_rgba(247,126,92,0.35),0_0_0_1px_rgba(247,126,92,0.15)]"
    >
      {/* Ambient coral wash on hover - very subtle */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(247,126,92,0.08), transparent 70%)"
        }}
      />

      {/* Top chip row */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-2.5 transition-colors duration-300 group-hover:border-[#F77E5C]/15 md:px-6">
 <span className="font-sans text-[11px] tracking-[0.04em] text-white/45 transition-colors duration-300 group-hover:text-white/65">
          step / {card.n}
        </span>
 <span className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.04em] text-[#F77E5C] transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_18px_rgba(247,126,92,0.55)]">
          {card.tag}
          {card.beta && (
            <span className="rounded-[4px] bg-[#F77E5C]/15 px-1.5 py-0.5 text-[9px] font-medium tracking-normal text-[#F77E5C] transition-colors duration-300 group-hover:bg-[#F77E5C]/25">
              Beta
            </span>
          )}
        </span>
      </div>

      {/* Shot slot - inline visual (or bg image if provided).
          Image scales subtly and brightens on hover. */}
      <div className="relative aspect-[2/1] overflow-hidden border-b border-white/10 bg-[#0a0a0d] transition-colors duration-300 group-hover:border-[#F77E5C]/15">
        {card.bg ? (
          <div
            className="absolute inset-0 transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
            style={{
              backgroundImage: `url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <CardVisual n={card.n} />
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4 md:p-5">
        <h4 className="font-sans text-[16px] font-semibold leading-[1.2] tracking-tight text-white md:text-[17px]">
          {card.title}
        </h4>
        <p className="mt-2 text-[12.5px] leading-[1.5] text-white/65">
          {card.body}
        </p>
      </div>
    </article>
  );
}

function SplitCallout() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
 <div className="mb-2 font-sans text-[10.5px] tracking-[0.04em] text-[#F77E5C]">
          Objective · Insights
        </div>
        <p className="text-[13.5px] leading-[1.55] text-white/65">
          <b className="font-medium text-white">The hard numbers.</b> Latency,
          pickup, connect rate, talk ratio, pacing, EOU accuracy, interruptions
          - measured on every call.
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
 <div className="mb-2 font-sans text-[10.5px] tracking-[0.04em] text-[#F77E5C]">
          Subjective · QA
        </div>
        <p className="text-[13.5px] leading-[1.55] text-white/65">
          <b className="font-medium text-white">The human judgment.</b>{" "}
          LLM-as-judge scores empathy, policy adherence, and whether the call
          actually resolved.
        </p>
      </div>
    </div>
  );
}

function LoopSVG() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1100px]">
      {/* Mono caption above the arc */}
 <div className="text-center font-sans text-[10.5px] tracking-[0.04em] text-[#F77E5C]/90">
        BRANCH · SIMULATE · VALIDATE · PROMOTE
      </div>

      {/* Return arc + start/end node dots */}
      <div className="relative mt-3 h-[72px]">
        <svg
          viewBox="0 0 1000 72"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <marker
              id="loop-arc"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#F77E5C" />
            </marker>
            <linearGradient id="loop-arc-grad" x1="1" x2="0" y1="0" y2="0">
              <stop offset="0%" stopColor="#F77E5C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F77E5C" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M 866 68 C 866 -16, 134 -16, 134 68"
            fill="none"
            stroke="url(#loop-arc-grad)"
            strokeWidth="1.6"
            strokeDasharray="3 5"
            markerEnd="url(#loop-arc)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Anchor pin at the arc start */}
          <circle cx="866" cy="68" r="2.5" fill="#F77E5C" />
        </svg>
      </div>

      {/* Cards row with mini arrows between */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-x-4">
        <LoopCard title="BUILD" caption="Compose the agent">
          <LoopBuild />
        </LoopCard>
        <LoopArrow />
        <LoopCard title="SHIP" caption="Inbound goes live">
          <LoopShip />
        </LoopCard>
        <LoopArrow />
        <LoopCard title="IMPROVE" caption="Measure & promote">
          <LoopImprove />
        </LoopCard>
      </div>
    </div>
  );
}

function LoopCard({
  title,
  caption,
  children
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#F77E5C]/25 bg-[#0a0a0d] p-5 md:p-6">
      {/* Subtle coral top-edge wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(247,126,92,0.08), transparent 70%)"
        }}
      />

      <div className="relative flex items-baseline justify-between gap-2">
 <span className="font-sans text-[12px] font-semibold tracking-[0.04em] text-white">
          {title}
        </span>
 <span className="font-sans text-[9.5px] tracking-[0.04em] text-white/35">
          {caption}
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

function LoopArrow() {
  return (
    <div className="flex items-center justify-center px-1 md:px-2">
      <svg viewBox="0 0 40 10" className="h-3 w-12 overflow-visible">
        <defs>
          <marker
            id="loop-mini-arr"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#F77E5C" />
          </marker>
        </defs>
        <line
          x1="0"
          y1="5"
          x2="34"
          y2="5"
          stroke="#F77E5C"
          strokeOpacity="0.9"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          markerEnd="url(#loop-mini-arr)"
        />
      </svg>
    </div>
  );
}

function LoopNodeTile({
  Icon,
  label,
  active = false
}: {
  Icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={
          "flex h-11 w-11 items-center justify-center rounded-lg border " +
          (active
            ? "border-[#F77E5C] bg-[#F77E5C]/[0.10] text-[#F77E5C] shadow-[0_0_22px_-6px_rgba(247,126,92,0.6)]"
            : "border-white/12 bg-[#15151A] text-white/80")
        }
      >
        <Icon size={15} strokeWidth={1.6} />
      </div>
      <span
        className={
 "font-sans text-[9px] tracking-[0.04em] " +
          (active ? "text-[#F77E5C]" : "text-white/40")
        }
      >
        {label}
      </span>
    </div>
  );
}

function LoopBuild() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-center">
        <LoopNodeTile Icon={Code} label="Prompt" />
        <span className="mt-5 h-px w-4 bg-[#F77E5C]/55" />
        <LoopNodeTile Icon={Database} label="Tools" active />
        <span className="mt-5 h-px w-4 bg-[#F77E5C]/55" />
        <LoopNodeTile Icon={CircleIcon} label="Logic" />
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px] text-white/45">
        <span>v1.3.1 · candidate</span>
        <span className="flex items-center gap-1.5 text-[#F77E5C]/85">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F77E5C]" />
          editing
        </span>
      </div>
    </div>
  );
}

function LoopShip() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#15151A] p-3.5">
      <div className="flex items-center justify-between">
 <span className="flex items-center gap-1.5 font-sans text-[9.5px] tracking-[0.04em] text-[#F77E5C]">
          <PhoneIncoming size={11} strokeWidth={2} />
          INCOMING
        </span>
 <span className="font-sans text-[9px] tracking-[0.04em] text-white/35">
          हिंदी
        </span>
      </div>
      <div className="mt-2.5 font-sans text-[16px] font-semibold tracking-tight text-white">
        +91 98xxx xxxxx
      </div>
      <div className="font-sans text-[10.5px] text-white/40">
        Brightside Dental
      </div>
      <div className="mt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#F77E5C] text-[#0a0a0d] shadow-[0_0_22px_-3px_rgba(247,126,92,0.7)]">
            <Phone size={14} strokeWidth={2} />
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-lg bg-[#F77E5C]/40" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F77E5C]/45 text-[#F77E5C]/85">
            <Phone size={14} strokeWidth={2} className="rotate-[135deg]" />
          </span>
        </div>
 <span className="font-sans text-[9.5px] tracking-[0.04em] text-white/35">
          3 rings
        </span>
      </div>
    </div>
  );
}

function LoopImprove() {
  return (
    <div className="flex flex-col gap-4">
      <div>
 <div className="flex items-center justify-between font-sans text-[9.5px] tracking-[0.04em]">
          <span className="text-white/50">PASS RATE · 30D</span>
          <span className="text-[#F77E5C]">+8%</span>
        </div>
        <svg
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          className="mt-2 h-16 w-full overflow-visible"
          aria-hidden
        >
          <line
            x1="0"
            x2="100"
            y1="24"
            y2="24"
            stroke="rgba(247,126,92,0.35)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1.5"
          />
          <defs>
            <linearGradient id="loop-chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F77E5C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F77E5C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points="0,20 12,15 24,12 36,16 48,24 60,20 72,12 84,7 100,4 100,36 0,36"
            fill="url(#loop-chart-fill)"
          />
          <polyline
            points="0,20 12,15 24,12 36,16 48,24 60,20 72,12 84,7 100,4"
            fill="none"
            stroke="#F77E5C"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="100" cy="4" r="1.6" fill="#F77E5C" />
        </svg>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <div className="flex items-center gap-1.5">
          <Metric label="empathy" value="0.92" />
          <Metric label="contain" value="78%" />
        </div>
 <span className="font-sans text-[9.5px] tracking-[0.04em] text-[#F77E5C]/85">
          promote →
        </span>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-md border border-[#F77E5C]/35 bg-[#F77E5C]/[0.06] px-2 py-1 font-mono text-[10px] text-[#F77E5C]">
      <span className="text-white/45">{label}&nbsp;</span>
      {value}
    </span>
  );
}
