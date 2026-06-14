"use client";

import Link from "next/link";

/* Build -> Ship -> Improve journey. Ported from the warm-paper HTML
   reference. Each card has a DARK shot slot; drop a screenshot into
   the `bg` prop and it fills the macOS-chrome frame. */

type Card = {
  n: string;
  label: string;
  beta?: boolean;
  title: string;
  body: string;
  shotTop: string;
  shotSub: string;
  bg?: string; // optional screenshot path
};

const BUILD: Card[] = [
  {
    n: "01",
    label: "Prompt & flow",
    title: "One prompt, or a full flow",
    body: "Start with a single prompt. Branch into structured, node-based flows the moment you need real control.",
    shotTop: "Prompt -> Flow",
    shotSub: "Builder · Flow canvas"
  },
  {
    n: "02",
    label: "Context & memory",
    title: "It knows who's calling",
    body: "Pull live context before the call - pre-call APIs, CRM, past-conversation history, and knowledge libraries.",
    shotTop: "Context",
    shotSub: "Pre-call API · History · Knowledge"
  },
  {
    n: "03",
    label: "Tools",
    title: "It takes action mid-call",
    body: "Connect tools so the agent books, updates, verifies, and calculates in real time - not just talks.",
    shotTop: "Tools",
    shotSub: "Tool builder"
  },
  {
    n: "04",
    label: "Analysis & actions",
    title: "It feeds your systems",
    body: "Define objectives, summaries, outcomes, and structured extraction - then fire webhooks straight into your stack.",
    shotTop: "Analysis + Call Actions",
    shotSub: "Outcomes · Webhooks"
  }
];

const SHIP: Card[] = [
  {
    n: "05",
    label: "Simulate",
    beta: true,
    title: "Hear it before they do",
    body: "Stress-test against real scenarios and personas - code-switching, refusals, edge cases - before anything goes live.",
    shotTop: "Simulation",
    shotSub: "Scenario · persona editor"
  },
  {
    n: "06",
    label: "Telephony",
    title: "Your number or ours",
    body: "Provision a number or bring your own carrier over SIP, and map each line to the right agent.",
    shotTop: "Numbers",
    shotSub: "Plivo · Twilio · BYOT · SIP"
  },
  {
    n: "07",
    label: "Go live",
    title: "Pick up, or reach out",
    body: "Take inbound in three rings, or launch outbound campaigns to thousands with pacing and retries.",
    shotTop: "Campaigns",
    shotSub: "Inbound · Outbound at scale"
  }
];

const IMPROVE: Card[] = [
  {
    n: "08",
    label: "Objective metrics",
    title: "Every call, measured",
    body: "Real-time inbound and outbound dashboards down to per-turn latency, talk ratio, and end-of-utterance accuracy.",
    shotTop: "Insights",
    shotSub: "Call-quality + dashboards"
  },
  {
    n: "09",
    label: "Subjective metrics",
    beta: true,
    title: "Judged like a human would",
    body: "Run LLM-judge metrics on a schedule, track pass rates over time, and catch a regression the moment it appears.",
    shotTop: "QA",
    shotSub: "Quality Analysis · pass rate"
  },
  {
    n: "10",
    label: "Dashboards & alerts",
    beta: true,
    title: "Know the moment it moves",
    body: "Build the dashboards you need and set threshold or ratio alerts on the metrics that matter to your business.",
    shotTop: "Alerts",
    shotSub: "Threshold / ratio alerts"
  },
  {
    n: "11",
    label: "Branch · A/B · promote",
    title: "Improve without the risk",
    body: "Change on a new version, A/B test it against the live one, and promote only the winner. Production never breaks.",
    shotTop: "Versions",
    shotSub: "main · Live · A/B test"
  }
];

export function L2Journey() {
  return (
    <section className="relative bg-[#F4EDDF]">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {/* Intro */}
        <div className="max-w-[32ch] pb-4 pt-24 lg:pt-28">
          <Pill>How it works</Pill>
          <h2 className="mt-6 font-serif text-[clamp(38px,4.6vw,62px)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1B1209]">
            From a single prompt to a million calls - and{" "}
            <em className="font-medium not-italic italic text-[#E25B12]">
              better every week.
            </em>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[19px] leading-[1.55] text-[#6B6052]">
            Build the agent, ship it on your numbers, then let the data sharpen
            it - on a new version, without ever touching the one that&apos;s live.
          </p>
        </div>

        <Phase
          idx="01 - 04"
          title="Build"
          note="Start simple, add depth only where the conversation needs it."
          cards={BUILD}
        />

        <Phase
          idx="05 - 07"
          title="Ship"
          note="Prove it works, put it on a line, and go - inbound or outbound."
          cards={SHIP}
        />

        <Phase
          idx="08 - 11"
          title="Improve"
          note="Measure what's objective and what's subjective - then close the loop, safely."
          cards={IMPROVE}
          beforeGrid={
            <div className="my-1.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SplitCard
                k="Objective · Insights"
                bold="The hard numbers."
                rest=" Latency, pickup, connect rate, talk ratio, pacing, EOU accuracy, interruptions - measured on every call."
              />
              <SplitCard
                k="Subjective · QA"
                bold="The human judgment."
                rest=" LLM-as-judge scores empathy, policy adherence, and whether the call actually resolved."
              />
            </div>
          }
        />

        {/* The loop */}
        <div className="mt-16 border-t border-[rgba(27,18,9,0.12)] pb-2.5 pt-14 text-center">
          <Pill center>The loop</Pill>
          <h2 className="mx-auto mt-5 max-w-[22ch] font-serif text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#1B1209]">
            Ship, measure, and improve -{" "}
            <em className="font-medium not-italic italic text-[#E25B12]">
              without breaking what&apos;s live.
            </em>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[52ch] text-[16px] leading-[1.55] text-[#6B6052]">
            Every change happens on its own version. The live agent keeps
            answering while you test the next one - so getting better never
            means going down.
          </p>

          <LoopSVG />
        </div>

        {/* Footer CTAs */}
        <div className="px-0 pb-24 pt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3.5">
            <Link
              href="/signup"
              className="rounded-full bg-[#1B1209] px-6 py-3.5 text-[15px] font-medium text-[#F4EDDF] hover:bg-black"
            >
              Build your agent →
            </Link>
            <Link
              href="/book-demo"
              className="rounded-full border border-[rgba(27,18,9,0.15)] px-6 py-3.5 text-[15px] font-medium text-[#1B1209] hover:bg-[rgba(27,18,9,0.04)]"
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

function Pill({
  children,
  center = false
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-[rgba(226,91,18,0.34)] px-3.5 py-[7px] font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#E25B12] ${
        center ? "" : ""
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#E25B12]" />
      {children}
    </span>
  );
}

function Phase({
  idx,
  title,
  note,
  cards,
  beforeGrid
}: {
  idx: string;
  title: string;
  note: string;
  cards: Card[];
  beforeGrid?: React.ReactNode;
}) {
  return (
    <div className="pb-2 pt-14">
      <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-[rgba(27,18,9,0.12)] pt-7">
        <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-[#E25B12]">
          {idx}
        </span>
        <h3 className="font-serif text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.018em] text-[#1B1209]">
          {title}
        </h3>
        <p className="ml-auto max-w-[36ch] text-[15px] leading-[1.5] text-[#6B6052] md:text-right">
          {note}
        </p>
      </div>

      {beforeGrid}

      <div
        className={`grid gap-5 ${beforeGrid ? "mt-5" : ""}`}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(258px, 1fr))"
        }}
      >
        {cards.map((c) => (
          <JourneyCard key={c.n} card={c} />
        ))}
      </div>
    </div>
  );
}

function JourneyCard({ card }: { card: Card }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[18px] border border-[rgba(27,18,9,0.12)] bg-[#FBF6EC]">
      {/* DARK SHOT — drop screenshot via inline style background or swap for <Image fill /> */}
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-[rgba(27,18,9,0.12)] bg-[#100C07]"
        style={
          card.bg
            ? {
                backgroundImage: `url(${card.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
            : undefined
        }
      >
        {/* macOS chrome dots */}
        <div className="absolute left-[15px] top-[13px] flex gap-[5px] opacity-50">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        </div>
        {!card.bg && (
          <div className="px-4 text-center font-mono text-[11px] leading-[1.6] tracking-[0.04em] text-[rgba(247,241,230,0.4)]">
            <b className="mb-[3px] block font-medium text-[rgba(247,241,230,0.7)]">
              {card.shotTop}
            </b>
            {card.shotSub}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pb-6 pt-5">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="font-serif text-[26px] font-semibold leading-none text-[#E25B12]">
            {card.n}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#6B6052]">
            {card.label}
            {card.beta && (
              <span className="rounded-[5px] bg-[rgba(226,91,18,0.16)] px-1.5 py-0.5 text-[9px] tracking-normal text-[#1B1209]">
                Beta
              </span>
            )}
          </span>
        </div>
        <h4 className="mb-2 text-[17px] font-bold leading-tight tracking-[-0.01em] text-[#1B1209]">
          {card.title}
        </h4>
        <p className="text-[14px] leading-[1.55] text-[#6B6052]">{card.body}</p>
      </div>
    </article>
  );
}

function SplitCard({
  k,
  bold,
  rest
}: {
  k: string;
  bold: string;
  rest: string;
}) {
  return (
    <div className="rounded-[13px] border border-[rgba(27,18,9,0.12)] bg-[rgba(251,246,236,0.5)] px-[18px] py-4">
      <div className="mb-[7px] font-mono text-[11px] uppercase tracking-[0.1em] text-[#E25B12]">
        {k}
      </div>
      <p className="text-[13.5px] leading-[1.5] text-[#6B6052]">
        <b className="font-medium text-[#1B1209]">{bold}</b>
        {rest}
      </p>
    </div>
  );
}

function LoopSVG() {
  return (
    <svg
      viewBox="0 0 760 240"
      className="mx-auto mt-9 block h-auto w-full max-w-[760px]"
      role="img"
      aria-label="A loop: Build, Ship, Improve, returning to Build."
    >
      <defs>
        <marker
          id="l2arr"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#E25B12" />
        </marker>
      </defs>
      {/* return arc */}
      <path
        d="M620,118 C660,40 100,40 140,116"
        fill="none"
        stroke="#E25B12"
        strokeWidth={1.6}
        strokeDasharray="3 6"
        markerEnd="url(#l2arr)"
      />
      <text
        x={380}
        y={34}
        textAnchor="middle"
        fontFamily="JetBrains Mono, DM Mono, monospace"
        fontSize={12.5}
        letterSpacing={1.5}
        fill="#92765f"
      >
        branch · simulate · validate · promote
      </text>
      {/* forward arrows */}
      <line
        x1={232}
        y1={150}
        x2={300}
        y2={150}
        stroke="#1B1209"
        strokeOpacity={0.35}
        strokeWidth={1.6}
        markerEnd="url(#l2arr)"
      />
      <line
        x1={460}
        y1={150}
        x2={528}
        y2={150}
        stroke="#1B1209"
        strokeOpacity={0.35}
        strokeWidth={1.6}
        markerEnd="url(#l2arr)"
      />
      {/* nodes */}
      <g
        fontFamily="Instrument Serif, Fraunces, serif"
        fontWeight={600}
        fontSize={22}
        fill="#1B1209"
        textAnchor="middle"
      >
        <circle
          cx={140}
          cy={150}
          r={58}
          fill="#FBF6EC"
          stroke="rgba(27,18,9,0.14)"
        />
        <text x={140} y={158}>
          Build
        </text>
        <circle
          cx={380}
          cy={150}
          r={58}
          fill="#FBF6EC"
          stroke="rgba(27,18,9,0.14)"
        />
        <text x={380} y={158}>
          Ship
        </text>
        <circle cx={620} cy={150} r={58} fill="#100C07" />
        <text x={620} y={158} fill="#FBF6EC">
          Improve
        </text>
      </g>
    </svg>
  );
}
