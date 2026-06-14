"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─── Shot placeholder ──────────────────────────────────────────
   The intentional dark "screenshot slot" from the HTML reference.
   Each phase card gets one; real product screenshots drop in later
   by passing a `bg` URL. */
function Shot({
  label,
  caption,
  bg
}: {
  label: string;
  caption: string;
  bg?: string;
}) {
  return (
    <div
      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/10 bg-[#0a0a0d]"
      style={
        bg
          ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          : undefined
      }
    >
      {/* macOS traffic-light decoration */}
      <div className="absolute left-3.5 top-3 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C841]/50" />
      </div>
      {bg ? null : (
        <div className="px-4 text-center font-mono text-[10.5px] leading-[1.6] tracking-wide text-white/35">
          <span className="block font-medium text-white/65">{label}</span>
          {caption}
        </div>
      )}
    </div>
  );
}

/* ─── Step card ─────────────────────────────────────────────── */
interface Step {
  n: string;
  label: string;
  beta?: boolean;
  title: string;
  body: string;
  shotLabel: string;
  shotCaption: string;
}

function StepCard({ step }: { step: Step }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
      <Shot label={step.shotLabel} caption={step.shotCaption} />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center gap-2.5">
          <span className="font-serif text-[24px] font-medium leading-none text-[#F77E5C]">
            {step.n}
          </span>
          <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/55">
            {step.label}
            {step.beta ? (
              <span className="rounded-[5px] border border-[#F77E5C]/30 bg-[#F77E5C]/12 px-1.5 py-[1px] font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-[#FFB58F]">
                Beta
              </span>
            ) : null}
          </span>
        </div>
        <h3 className="mt-3 font-sans text-[17px] font-bold leading-[1.25] tracking-tight text-white">
          {step.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.55] text-white/60">
          {step.body}
        </p>
      </div>
    </article>
  );
}

/* ─── Phase header ──────────────────────────────────────────── */
function PhaseHeader({
  index,
  title,
  note
}: {
  index: string;
  title: string;
  titleEm?: string;
  note: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/10 pt-7">
      <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#F77E5C]">
        {index}
      </span>
      <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-medium leading-[1.1] tracking-tight text-white">
        {title}
      </h2>
      <p className="ml-auto max-w-[36ch] text-[15px] leading-[1.5] text-white/55">
        {note}
      </p>
    </div>
  );
}

/* ─── Content ───────────────────────────────────────────────── */

const BUILD_STEPS: Step[] = [
  {
    n: "01",
    label: "Prompt & flow",
    title: "One prompt, or a full flow",
    body: "Start with a single prompt. Branch into structured, node-based flows the moment you need real control.",
    shotLabel: "Prompt → Flow",
    shotCaption: "Builder · Flow canvas"
  },
  {
    n: "02",
    label: "Context & memory",
    title: "It knows who's calling",
    body: "Pull live context before the call - pre-call APIs, CRM, past-conversation history, and knowledge libraries.",
    shotLabel: "Context",
    shotCaption: "Pre-call API · History · Knowledge"
  },
  {
    n: "03",
    label: "Tools",
    title: "It takes action mid-call",
    body: "Connect tools so the agent books, updates, verifies, and calculates in real time - not just talks.",
    shotLabel: "Tools",
    shotCaption: "Tool builder"
  },
  {
    n: "04",
    label: "Analysis & actions",
    title: "It feeds your systems",
    body: "Define objectives, summaries, outcomes, and structured extraction - then fire webhooks straight into your stack.",
    shotLabel: "Analysis + Call Actions",
    shotCaption: "Outcomes · Webhooks"
  }
];

const SHIP_STEPS: Step[] = [
  {
    n: "05",
    label: "Simulate",
    beta: true,
    title: "Hear it before they do",
    body: "Stress-test against real scenarios and personas - code-switching, refusals, edge cases - before anything goes live.",
    shotLabel: "Simulation",
    shotCaption: "Scenario · persona editor"
  },
  {
    n: "06",
    label: "Telephony",
    title: "Your number or ours",
    body: "Provision a number or bring your own carrier over SIP, and map each line to the right agent.",
    shotLabel: "Numbers",
    shotCaption: "Plivo · Twilio · BYOT · SIP"
  },
  {
    n: "07",
    label: "Go live",
    title: "Pick up, or reach out",
    body: "Take inbound in three rings, or launch outbound campaigns to thousands with pacing and retries.",
    shotLabel: "Campaigns",
    shotCaption: "Inbound · Outbound at scale"
  }
];

const IMPROVE_STEPS: Step[] = [
  {
    n: "08",
    label: "Objective metrics",
    title: "Every call, measured",
    body: "Real-time inbound and outbound dashboards down to per-turn latency, talk ratio, and end-of-utterance accuracy.",
    shotLabel: "Insights",
    shotCaption: "Call-quality + dashboards"
  },
  {
    n: "09",
    label: "Subjective metrics",
    beta: true,
    title: "Judged like a human would",
    body: "Run LLM-judge metrics on a schedule, track pass rates over time, and catch a regression the moment it appears.",
    shotLabel: "QA",
    shotCaption: "Quality Analysis · pass rate"
  },
  {
    n: "10",
    label: "Dashboards & alerts",
    beta: true,
    title: "Know the moment it moves",
    body: "Build the dashboards you need and set threshold or ratio alerts on the metrics that matter to your business.",
    shotLabel: "Alerts",
    shotCaption: "Threshold / ratio alerts"
  },
  {
    n: "11",
    label: "Branch · A/B · promote",
    title: "Improve without the risk",
    body: "Change on a new version, A/B test it against the live one, and promote only the winner. Production never breaks.",
    shotLabel: "Versions",
    shotCaption: "main · Live · A/B test"
  }
];

/* ─── Main component ────────────────────────────────────────── */

export function Journey() {
  return (
    <section className="relative px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1240px]">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[44ch]"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F77E5C]/35 px-3.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#F77E5C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F77E5C]" />
            How it works
          </span>
          <h1 className="mt-6 font-serif text-[clamp(38px,4.6vw,62px)] font-medium leading-[1.02] tracking-tight text-white">
            From a single prompt to a million calls - and{" "}
            <em className="not-italic font-medium text-[#F77E5C]">
              better every week.
            </em>
          </h1>
          <p className="mt-6 max-w-[48ch] text-[19px] leading-[1.55] text-white/65">
            Build the agent, ship it on your numbers, then let the data sharpen
            it - on a new version, without ever touching the one that&apos;s
            live.
          </p>
        </motion.div>

        {/* ─── BUILD ────────────────────────────────────────── */}
        <div className="mt-14 md:mt-20">
          <PhaseHeader
            index="01 – 04"
            title="Build"
            note="Start simple, add depth only where the conversation needs it."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUILD_STEPS.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </div>
        </div>

        {/* ─── SHIP ─────────────────────────────────────────── */}
        <div className="mt-16 md:mt-20">
          <PhaseHeader
            index="05 – 07"
            title="Ship"
            note="Prove it works, put it on a line, and go - inbound or outbound."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SHIP_STEPS.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </div>
        </div>

        {/* ─── IMPROVE ──────────────────────────────────────── */}
        <div className="mt-16 md:mt-20">
          <PhaseHeader
            index="08 – 11"
            title="Improve"
            note="Measure what's objective and what's subjective - then close the loop, safely."
          />

          {/* Objective vs Subjective split */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F77E5C]">
                Objective · Insights
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-white/65">
                <span className="font-medium text-white">
                  The hard numbers.
                </span>{" "}
                Latency, pickup, connect rate, talk ratio, pacing, EOU
                accuracy, interruptions - measured on every call.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F77E5C]">
                Subjective · QA
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-white/65">
                <span className="font-medium text-white">
                  The human judgment.
                </span>{" "}
                LLM-as-judge scores empathy, policy adherence, and whether the
                call actually resolved.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPROVE_STEPS.map((s) => (
              <StepCard key={s.n} step={s} />
            ))}
          </div>
        </div>

        {/* ─── THE LOOP ─────────────────────────────────────── */}
        <div className="mt-20 border-t border-white/10 pt-16 text-center md:mt-28 md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F77E5C]/35 px-3.5 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#F77E5C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F77E5C]" />
            The loop
          </span>
          <h2 className="mx-auto mt-5 max-w-[22ch] font-serif text-[clamp(28px,3.4vw,46px)] font-medium leading-[1.06] tracking-tight text-white">
            Ship, measure, and improve -{" "}
            <em className="not-italic font-medium text-[#F77E5C]">
              without breaking what&apos;s live.
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-white/60">
            Every change happens on its own version. The live agent keeps
            answering while you test the next one - so getting better never
            means going down.
          </p>

          <svg
            viewBox="0 0 760 240"
            role="img"
            aria-label="A loop: Build, Ship, Improve, returning to Build."
            className="mx-auto mt-10 block h-auto w-full max-w-[760px]"
          >
            <defs>
              <marker
                id="journey-arrow"
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

            {/* Return arc (Improve → Build) */}
            <path
              d="M620,118 C660,40 100,40 140,116"
              fill="none"
              stroke="#F77E5C"
              strokeWidth="1.6"
              strokeDasharray="3 6"
              markerEnd="url(#journey-arrow)"
            />
            <text
              x="380"
              y="34"
              textAnchor="middle"
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize="12.5"
              letterSpacing="1.5"
              fill="rgba(247,126,92,0.7)"
            >
              branch · simulate · validate · promote
            </text>

            {/* Forward arrows */}
            <line
              x1="232"
              y1="150"
              x2="300"
              y2="150"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.6"
              markerEnd="url(#journey-arrow)"
            />
            <line
              x1="460"
              y1="150"
              x2="528"
              y2="150"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.6"
              markerEnd="url(#journey-arrow)"
            />

            {/* Nodes */}
            <g
              fontFamily="var(--font-serif), Georgia, serif"
              fontWeight="500"
              fontSize="22"
              textAnchor="middle"
            >
              <circle
                cx="140"
                cy="150"
                r="58"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
              />
              <text x="140" y="158" fill="#FFFFFF">
                Build
              </text>

              <circle
                cx="380"
                cy="150"
                r="58"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
              />
              <text x="380" y="158" fill="#FFFFFF">
                Ship
              </text>

              <circle cx="620" cy="150" r="58" fill="#F77E5C" />
              <text x="620" y="158" fill="#0a0a0d">
                Improve
              </text>
            </g>
          </svg>
        </div>

        {/* ─── FOOTER CTAs ─────────────────────────────────── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 pb-4">
          <a
            href="/#agent-demo"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 font-sans text-[14.5px] font-medium text-ink transition-colors hover:bg-white/85"
          >
            Build your agent
            <ArrowUpRight size={15} strokeWidth={2.25} />
          </a>
          <Link
            href="/features/details"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 font-sans text-[14.5px] font-medium text-white transition-colors hover:bg-white/5"
          >
            See the full platform
          </Link>
        </div>
      </div>
    </section>
  );
}
