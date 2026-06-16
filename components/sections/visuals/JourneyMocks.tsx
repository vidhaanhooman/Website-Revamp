"use client";

import { Check } from "lucide-react";

/* ─── Shared kit ──────────────────────────────────────────────── */

/* Little voice-waveform glyph - the signature element on every bubble. */
function Wave({ tone = "muted" }: { tone?: "muted" | "coral" }) {
  const color = tone === "coral" ? "#F77E5C" : "rgba(255,255,255,0.4)";
  const bars = [4, 8, 5, 10, 6, 9, 4, 7, 5, 8, 4];
  return (
    <span className="flex items-center gap-[2px]" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full"
          style={{ height: `${h}px`, backgroundColor: color }}
        />
      ))}
    </span>
  );
}

/* Coral diamond - the agent avatar. */
function AgentDot() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
      <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#F77E5C]" />
    </span>
  );
}

/* Initials circle - the customer avatar. */
function UserDot({ initials }: { initials: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans text-[9px] font-semibold text-white/80">
      {initials}
    </span>
  );
}

/* Chat bubble - agent (left) or customer (right). */
function Bubble({
  side,
  text,
  initials,
  withWave = true
}: {
  side: "agent" | "user";
  text: string;
  initials?: string;
  withWave?: boolean;
}) {
  const isAgent = side === "agent";
  return (
    <div
      className={
        "flex items-start gap-2 " + (isAgent ? "" : "flex-row-reverse")
      }
    >
      {isAgent ? <AgentDot /> : <UserDot initials={initials ?? "··"} />}
      <div className="max-w-[78%] rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
        {withWave ? (
          <div className="mb-1">
            <Wave tone={isAgent ? "coral" : "muted"} />
          </div>
        ) : null}
        <p className="font-sans text-[11px] leading-snug text-white/85">
          {text}
        </p>
      </div>
    </div>
  );
}

/* Generic inset widget card. */
function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
      {children}
    </div>
  );
}

/* Frame - dotted canvas the mock sits on. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-center gap-2 overflow-hidden border-b border-white/10 bg-[#0a0a0d] p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0.7px, transparent 0.7px)",
          backgroundSize: "13px 13px"
        }}
      />
      <div className="relative flex flex-col gap-2">{children}</div>
    </div>
  );
}

/* ─── Per-step mocks ──────────────────────────────────────────── */

function MockPromptFlow() {
  // 01 - one prompt → branching flow
  const nodes = [
    { label: "Greeting", x: "8%", tone: "#34D399" },
    { label: "Qualify", x: "40%", tone: "#F77E5C" },
    { label: "Book", x: "72%", tone: "#4877D8" }
  ];
  return (
    <Frame>
      <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
 <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
          Prompt
        </div>
        <p className="mt-1 font-sans text-[11px] text-white/85">
          &ldquo;Qualify the lead, then book a callback.&rdquo;
        </p>
      </div>
      <div className="relative h-12">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <line x1="16" y1="20" x2="48" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <line x1="48" y1="20" x2="80" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </svg>
        {nodes.map((n) => (
          <span
            key={n.label}
            className="absolute top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-[#15151a] px-2 py-1 font-sans text-[9px] font-medium text-white/80"
            style={{ left: n.x }}
          >
            <span
              className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{ backgroundColor: n.tone }}
            />
            {n.label}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function MockContext() {
  // 02 - knows who's calling
  return (
    <Frame>
      <Widget>
        <div className="flex items-center gap-2.5">
          <UserDot initials="RP" />
          <div className="min-w-0">
            <div className="font-sans text-[11px] font-semibold text-white">
              Ravi Patel · returning
            </div>
            <div className="font-mono text-[9px] text-white/45">
              CRM · 3 past calls · Hindi
            </div>
          </div>
        </div>
      </Widget>
      <Bubble side="agent" text="Welcome back, Ravi, calling about your loan?" />
    </Frame>
  );
}

function MockTools() {
  // 03 - takes action mid-call
  const tools = [
    { name: "book_slot", status: "done" },
    { name: "verify_kyc", status: "done" },
    { name: "calc_emi", status: "run" }
  ];
  return (
    <Frame>
      <Bubble side="user" text="Can you book me for Tuesday?" initials="AK" />
      <Widget>
 <div className="mb-1.5 font-sans text-[9px] tracking-[0.04em] text-white/40">
          Tools · live
        </div>
        <div className="space-y-1">
          {tools.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between font-mono text-[10px] text-white/75"
            >
              <span>{t.name}()</span>
              {t.status === "done" ? (
                <span className="flex items-center gap-1 text-emerald-300">
                  <Check size={9} strokeWidth={3} /> ok
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-400" />
                  running
                </span>
              )}
            </div>
          ))}
        </div>
      </Widget>
    </Frame>
  );
}

function MockAnalysis() {
  // 04 - feeds your systems (outcomes + webhooks)
  return (
    <Frame>
      <Widget>
 <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
          Outcome
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-sans text-[11px] font-semibold text-white">
            Qualified · callback booked
          </span>
 <span className="rounded-sm border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-[1px] font-sans text-[8.5px] tracking-[0.04em] text-emerald-300">
            won
          </span>
        </div>
      </Widget>
      <div className="flex items-center gap-2 font-mono text-[10px] text-white/55">
        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
          POST /webhook
        </span>
        <span className="text-white/30">→</span>
        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1">
          CRM · Slack
        </span>
      </div>
    </Frame>
  );
}

function MockSimulate() {
  // 05 - hear it before they do
  const rows = [
    { label: "Interrupts mid-sentence", pass: true },
    { label: "Code-switch Hindi → English", pass: true },
    { label: "Refuses to verify", pass: false }
  ];
  return (
    <Frame>
      <div className="flex items-center justify-between">
 <span className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.04em] text-white/45">
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-400" />
          Simulating
        </span>
        <span className="font-mono text-[9px] text-white/40">128 personas</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <Widget key={r.label}>
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10.5px] text-white/80">
                {r.label}
              </span>
              <span
                className={
 "font-sans text-[9px] font-medium tracking-[0.04em] " +
                  (r.pass ? "text-emerald-300" : "text-[#FF8A7A]")
                }
              >
                {r.pass ? "pass" : "fail"}
              </span>
            </div>
          </Widget>
        ))}
      </div>
    </Frame>
  );
}

function MockTelephony() {
  // 06 - your number or ours
  const carriers = [
    { label: "Plivo", color: "#5B47E0" },
    { label: "Exotel", color: "#1F89C8" },
    { label: "Tata", color: "#1E5BBA" },
    { label: "Twilio", color: "#E1162D" }
  ];
  return (
    <Frame>
      <Widget>
 <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
          Active line
        </div>
        <div className="mt-1 font-sans text-[14px] font-semibold tabular-nums text-white">
          +91 98765 43210
        </div>
        <div className="font-mono text-[9px] text-white/45">
          Mumbai · SIP routed
        </div>
      </Widget>
      <div className="grid grid-cols-4 gap-1.5">
        {carriers.map((c) => (
          <div
            key={c.label}
            className="flex items-center justify-center gap-1 rounded-md border border-white/10 bg-white/[0.04] py-1.5"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="font-sans text-[9px] font-medium text-white/70">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function MockGoLive() {
  // 07 - inbound + outbound at scale
  return (
    <Frame>
      <div className="grid grid-cols-2 gap-2">
        <Widget>
 <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
            Inbound
          </div>
          <div className="mt-1 font-sans text-[18px] font-bold text-white">
            3 rings
          </div>
          <div className="font-mono text-[9px] text-white/45">avg pickup</div>
        </Widget>
        <Widget>
 <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
            Outbound
          </div>
          <div className="mt-1 font-sans text-[18px] font-bold text-white">
            12,480
          </div>
          <div className="font-mono text-[9px] text-white/45">queued today</div>
        </Widget>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-1 flex-1 rounded-full bg-emerald-500/70" />
        <span className="h-1 flex-1 rounded-full bg-emerald-500/50" />
        <span className="h-1 flex-1 rounded-full bg-amber-400/60" />
        <span className="h-1 flex-1 rounded-full bg-white/10" />
      </div>
    </Frame>
  );
}

function MockMetrics() {
  // 08 - every call measured
  const rows = [
    { label: "Latency / turn", value: "412ms", pct: 30 },
    { label: "Talk ratio", value: "46%", pct: 46 },
    { label: "EOU accuracy", value: "98%", pct: 98 }
  ];
  return (
    <Frame>
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-center justify-between font-mono text-[9.5px] text-white/55">
 <span className="tracking-[0.04em]">{r.label}</span>
            <span className="tabular-nums text-white/80">{r.value}</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
            <span
              className="block h-full rounded-full bg-[#F77E5C]"
              style={{ width: `${r.pct}%` }}
            />
          </div>
        </div>
      ))}
    </Frame>
  );
}

function MockQA() {
  // 09 - LLM-judge pass rate
  return (
    <Frame>
      <Widget>
        <div className="flex items-center justify-between">
 <span className="font-sans text-[9px] tracking-[0.04em] text-white/40">
            Pass rate
          </span>
          <span className="font-mono text-[9px] text-emerald-300">
            ↗ +2.4
          </span>
        </div>
        <div className="mt-1 font-sans text-[24px] font-bold tabular-nums text-white">
          96.2%
        </div>
      </Widget>
      <svg viewBox="0 0 100 26" className="h-8 w-full" aria-hidden>
        <path
          d="M0,22 L16,18 L30,20 L44,12 L58,15 L74,8 L88,10 L100,5"
          stroke="#34D399"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M0,22 L16,18 L30,20 L44,12 L58,15 L74,8 L88,10 L100,5 L100,26 L0,26 Z"
          fill="rgba(52,211,153,0.12)"
        />
      </svg>
    </Frame>
  );
}

function MockAlerts() {
  // 10 - dashboards & alerts
  return (
    <Frame>
      <Widget>
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F77E5C]/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F77E5C]" />
          </span>
          <span className="font-sans text-[11px] font-semibold text-white">
            Escalation rate &gt; 8%
          </span>
        </div>
        <div className="mt-1 font-mono text-[9px] text-white/45">
          Threshold alert · fired 12:36
        </div>
      </Widget>
      <div className="grid grid-cols-3 gap-1.5">
        {["CSAT", "AHT", "Esc."].map((m, i) => (
          <div
            key={m}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5"
          >
 <div className="font-sans text-[8px] tracking-[0.04em] text-white/40">
              {m}
            </div>
            <div className="mt-0.5 font-sans text-[12px] font-bold text-white">
              {["94%", "2:14", "8.3%"][i]}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function MockVersions() {
  // 11 - branch · A/B · promote
  return (
    <Frame>
      <Widget>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-white/80">main</span>
 <span className="rounded-sm border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-[1px] font-sans text-[8.5px] tracking-[0.04em] text-emerald-300">
            live
          </span>
        </div>
      </Widget>
      <div className="flex items-center gap-2">
        <Widget>
          <div className="font-mono text-[10px] text-white/80">v-next</div>
          <div className="mt-0.5 font-mono text-[8.5px] text-amber-300">
            A/B · 50%
          </div>
        </Widget>
        <span className="font-mono text-[10px] text-white/30">vs</span>
        <Widget>
          <div className="font-mono text-[10px] text-white/80">main</div>
          <div className="mt-0.5 font-mono text-[8.5px] text-white/45">
            50%
          </div>
        </Widget>
      </div>
    </Frame>
  );
}

/* ─── Registry ────────────────────────────────────────────────── */
const MOCKS: Record<string, () => JSX.Element> = {
  "01": MockPromptFlow,
  "02": MockContext,
  "03": MockTools,
  "04": MockAnalysis,
  "05": MockSimulate,
  "06": MockTelephony,
  "07": MockGoLive,
  "08": MockMetrics,
  "09": MockQA,
  "10": MockAlerts,
  "11": MockVersions
};

export function StepMock({ n }: { n: string }) {
  const Mock = MOCKS[n];
  return Mock ? <Mock /> : null;
}
