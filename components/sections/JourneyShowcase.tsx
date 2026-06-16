"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ToolsVisual } from "@/components/sections/visuals/ToolsVisual";
import { WebhooksVisual } from "@/components/sections/visuals/WebhooksVisual";
import { AnalysisVisual } from "@/components/sections/visuals/AnalysisVisual";
import { MemoryRecallVisual } from "@/components/sections/visuals/MemoryRecallVisual";
import { SimulationVisual } from "@/components/sections/visuals/SimulationVisual";
import { BatchCallsVisual } from "@/components/sections/visuals/BatchCallsVisual";
import { SubjectiveMetricsVisual } from "@/components/sections/visuals/SubjectiveMetricsVisual";
import { ObjectiveMetricsVisual } from "@/components/sections/visuals/ObjectiveMetricsVisual";
import { DashboardsAlertsVisual } from "@/components/sections/visuals/DashboardsAlertsVisual";
import { TelephonyVisual } from "@/components/sections/visuals/TelephonyVisual";
import { BranchPromoteVisual } from "@/components/sections/visuals/BranchPromoteVisual";

/* Build / Ship / Improve as large alternating feature rows.
   The visual panel cycles through every card in the phase, synced with
   a stepped capability list. Auto-advances; click a step to jump. */

type Step = {
  title: string;
  sub: string;
  /** Static image visual. */
  visual?: string;
  /** Animated React visual, receives `active`. Takes priority over `visual`. */
  node?: (active: boolean) => React.ReactNode;
};

type Phase = {
  id: string;
  range: string;
  label: string;
  heading: string;
  blurb: string;
  steps: Step[];
};

const PHASES: Phase[] = [
  {
    id: "build",
    range: "01 – 04",
    label: "Build",
    heading: "An agent that sounds like you, configured in an afternoon.",
    blurb:
      "Start with a single prompt or a full node-based flow. Pull live context before every call, connect tools that take real action, then feed structured outcomes straight into your stack.",
    steps: [
      { title: "Prompt & flow", sub: "Start with a single prompt, then branch into structured, node-based flows the moment a conversation needs real control, no rebuild required.", visual: "/journey/Agent%20Flow.png" },
      { title: "Context & memory", sub: "Pull live context before the call connects: pre-call APIs, your CRM, past-conversation history, and indexed knowledge libraries the agent can cite.", node: (active) => <MemoryRecallVisual active={active} /> },
      { title: "Tools", sub: "Wire any REST or GraphQL endpoint as a tool so the agent books, updates, verifies, and calculates in real time, not just talks.", node: (active) => <ToolsVisual active={active} /> },
      { title: "Analysis", sub: "Define objectives, summaries, outcomes, and structured extraction the moment a call ends, the analysis your team actually reads.", node: (active) => <AnalysisVisual active={active} /> }
    ]
  },
  {
    id: "ship",
    range: "05 – 08",
    label: "Ship",
    heading: "Prove it works, put it on a line, and go, inbound or outbound.",
    blurb:
      "Stress-test against real scenarios and personas before anything goes live. Provision a number or connect your own carrier with SIP trunking, then take inbound or launch outbound campaigns at scale.",
    steps: [
      { title: "Simulate", sub: "Stress-test against real scenarios and personas, code-switching, refusals, edge cases, and hear the difference between versions before anything reaches a customer. (Beta)", node: (active) => <SimulationVisual active={active} /> },
      { title: "Telephony", sub: "Provision a number in a click, or connect your own carrier over a SIP trunk, Plivo, Twilio, Exotel, Tata. Bring-your-own SIP trunking with full inbound and outbound, and map each trunk to the right agent.", node: (active) => <TelephonyVisual active={active} /> },
      { title: "Webhooks", sub: "The moment a call ends, fire the structured outcome straight into your stack, CRM, Slack, Sheets, anything with a URL, with retries until it lands.", node: (active) => <WebhooksVisual active={active} /> },
      { title: "Go live", sub: "Take inbound calls in three rings, or launch outbound campaigns to thousands with pacing, retries, and live monitoring.", node: (active) => <BatchCallsVisual active={active} /> }
    ]
  },
  {
    id: "improve",
    range: "09 – 12",
    label: "Improve",
    heading: "Measure everything objective and subjective, break nothing.",
    blurb:
      "Track hard numbers and human judgment on every call. Build dashboards, set alerts, and improve on a new version, A/B tested against the live one, promoting only the winner.",
    steps: [
      { title: "Objective metrics", sub: "Real-time inbound and outbound dashboards down to per-turn latency, talk ratio, pacing, and end-of-utterance accuracy on every call.", node: (active) => <ObjectiveMetricsVisual active={active} /> },
      { title: "Subjective metrics", sub: "Run LLM-as-judge metrics on a schedule to score empathy, policy adherence, and whether the call actually resolved, and catch a regression the moment it appears. (Beta)", node: (active) => <SubjectiveMetricsVisual active={active} /> },
      { title: "Dashboards & alerts", sub: "Build the dashboards you need and set threshold or ratio alerts on the metrics that matter, routed to Slack or on-call. (Beta)", node: (active) => <DashboardsAlertsVisual active={active} /> },
      { title: "Branch · A/B · promote", sub: "Change on a new version, A/B test it against the live one, and promote only the winner, production never breaks while you improve.", node: (active) => <BranchPromoteVisual active={active} /> }
    ]
  }
];

const CYCLE_MS = 5500;

export function JourneyShowcase() {
  return (
    <section className="relative px-6 pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1240px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Core capabilities
          </p>
          <h2 className="mt-4 font-dmsans text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            Everything you need, from{" "}
            <em className="font-display font-normal italic text-white/50">prompt to production.</em>
          </h2>
        </motion.div>

        {/* Phase rows */}
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {PHASES.map((p) => (
            <PhaseRow key={p.id} phase={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseRow({ phase }: { phase: Phase }) {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const count = phase.steps.length;

  // Auto-advance through the phase's cards until the user clicks a step,
  // which stops the cycle and holds on the chosen one.
  useEffect(() => {
    if (stopped) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % count),
      CYCLE_MS
    );
    return () => clearTimeout(id);
  }, [active, count, stopped]);

  const selectStep = (idx: number) => {
    setStopped(true);
    setActive(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id={phase.id}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.25fr] lg:gap-14"
    >
      {/* Visual, always on the right */}
      <div className="lg:order-2">
        <VisualPanel
          steps={phase.steps}
          active={active}
          label={phase.label}
        />
      </div>

      {/* Text, always on the left */}
      <div className="lg:order-1">
        <div className="flex items-center gap-2.5 text-white">
          <MapPin size={18} strokeWidth={1.75} className="text-white/80" />
          <span className="font-sans text-[20px] font-medium tracking-tight md:text-[22px]">
            {phase.label}
          </span>
          <span className="font-sans text-[12px] text-white/30">
            / {phase.range}
          </span>
        </div>

        <h3 className="mt-4 max-w-md font-dmsans text-[clamp(1.2rem,1.7vw,1.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
          {phase.heading}
        </h3>

        <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-white/60">
          {phase.blurb}
        </p>

        {/* Stepped capability list, clean titles, top progress bar on active */}
        <ul className="mt-8">
          {phase.steps.map((s, idx) => {
            const isActive = idx === active;
            return (
              <li
                key={s.title}
                className="relative border-t border-white/10 last:border-b"
              >
                {/* Base track + animated fill, only on the active item */}
                {isActive && (
                  <>
                    <span className="absolute left-0 top-0 h-px w-full bg-white/15" />
                    <motion.span
                      key={`${phase.id}-${active}-${stopped}`}
                      className="absolute left-0 top-0 h-px bg-white"
                      initial={{ width: stopped ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: stopped ? 0 : CYCLE_MS / 1000,
                        ease: "linear"
                      }}
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => selectStep(idx)}
                  className="w-full py-5 text-left"
                >
                  <span
                    className={
                      "font-sans text-[18px] font-medium tracking-tight transition-colors duration-300 " +
                      (isActive ? "text-white" : "text-white/40 hover:text-white/70")
                    }
                  >
                    {s.title}
                  </span>
                  {/* Detail, expands only when this step is active */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-md pt-2 text-[14px] leading-[1.6] text-white/55">
                      {s.sub}
                    </p>
                  </motion.div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

function VisualPanel({
  steps,
  active,
  label
}: {
  steps: Step[];
  active: number;
  label: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d] select-none">
      <div className="relative aspect-[4/3] w-full">
        {steps.map((s, idx) =>
          s.node ? (
            <div
              key={s.title}
              className={
                "absolute inset-0 transition-opacity duration-700 ease-out " +
                (idx === active ? "opacity-100" : "pointer-events-none opacity-0")
              }
            >
              {s.node(idx === active)}
            </div>
          ) : (
            <Image
              key={s.visual}
              src={s.visual as string}
              alt={`${label}, ${s.title}`}
              fill
              unoptimized
              draggable={false}
              sizes="(max-width: 1024px) 92vw, 640px"
              className={
                "object-cover transition-opacity duration-700 ease-out " +
                (idx === active ? "opacity-100" : "pointer-events-none opacity-0")
              }
              priority={idx === 0}
            />
          )
        )}
      </div>
    </div>
  );
}
