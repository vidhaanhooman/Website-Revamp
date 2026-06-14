"use client";

/* Inline visuals for the 11 JourneyBento cards.
   Aesthetic: dark canvas, rectangular/geometric clusters.
   ONE coral-filled element marks the active item, the rest are muted
   (#15151A fill, white/10 border, white/70 text). No discs. */

import type { LucideIcon } from "lucide-react";
import {
  MessageSquareText,
  Workflow,
  GitBranch,
  Layers,
  Plug,
  FileText,
  Link as LinkIcon,
  Calendar,
  Search,
  CreditCard,
  ShieldCheck,
  PhoneOutgoing,
  MessageSquare,
  Database,
  AudioLines,
  PhoneIncoming,
  AlertTriangle,
  Hash,
  Mail,
  Phone,
  Bell,
  Check,
  ArrowUpRight
} from "lucide-react";

/* ============================================================
   PRIMITIVES - all rectangular
   ============================================================ */

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6 md:p-8">
      {/* Subtle coral floor wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(247,126,92,0.05) 0%, transparent 70%)"
        }}
      />
      <div className="relative w-full">{children}</div>
    </div>
  );
}

/* Rounded square tile with icon + caption. */
function IconTile({
  Icon,
  label,
  active = false,
  size = "md"
}: {
  Icon: LucideIcon;
  label?: string;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const px = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const iconPx = size === "lg" ? 26 : size === "sm" ? 16 : 20;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={
          "flex items-center justify-center rounded-xl border " +
          px +
          " " +
          (active
            ? "border-[#F77E5C] bg-[#F77E5C] text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.55)]"
            : "border-white/10 bg-[#15151A] text-white/70")
        }
      >
        <Icon size={iconPx} strokeWidth={1.7} />
      </div>
      {label && (
        <span
          className={
            "font-mono text-[9.5px] uppercase tracking-[0.12em] " +
            (active ? "text-white" : "text-white/40")
          }
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* Stacked row - rectangular bar with icon left, label center, suffix right. */
function StackRow({
  Icon,
  label,
  suffix,
  active = false,
  shift = 0
}: {
  Icon: LucideIcon;
  label: string;
  suffix?: string;
  active?: boolean;
  shift?: number;
}) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-lg border px-3 py-2.5 " +
        (active
          ? "border-[#F77E5C] bg-[#F77E5C] text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.45)]"
          : "border-white/10 bg-[#15151A] text-white/80")
      }
      style={{ marginLeft: `${shift}px` }}
    >
      <Icon
        size={14}
        strokeWidth={1.75}
        className={active ? "" : "opacity-65"}
      />
      <span className="flex-1 truncate font-sans text-[12px] font-medium">
        {label}
      </span>
      {suffix && (
        <span
          className={
            "font-mono text-[10px] " +
            (active ? "text-[#0a0a0d]/70" : "text-white/40")
          }
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

/* Rectangular pill chip with icon. */
function Chip({
  Icon,
  label,
  active = false,
  tone = "default"
}: {
  Icon?: LucideIcon;
  label: string;
  active?: boolean;
  tone?: "default" | "green" | "red";
}) {
  const cls = active
    ? "border-[#F77E5C] bg-[#F77E5C] text-[#0a0a0d]"
    : tone === "green"
    ? "border-[#34D399]/40 bg-[#34D399]/[0.08] text-[#34D399]"
    : tone === "red"
    ? "border-[#E5413B]/45 bg-[#E5413B]/[0.08] text-[#E5413B]"
    : "border-white/10 bg-[#15151A] text-white/75";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-sans text-[11.5px] font-medium " +
        cls
      }
    >
      {Icon && <Icon size={12} strokeWidth={2} />}
      {label}
    </span>
  );
}

/* ============================================================
   01 - Prompt -> Flow
   Row of 4 icon tiles, one active.
   ============================================================ */
export function V01Flow() {
  return (
    <Stage>
      <div className="flex items-end justify-center gap-3">
        <IconTile Icon={MessageSquareText} label="Prompt" size="lg" />
        <IconTile Icon={Workflow} label="Flow" size="lg" active />
        <IconTile Icon={GitBranch} label="Branch" size="lg" />
        <IconTile Icon={Layers} label="Version" size="lg" />
      </div>
    </Stage>
  );
}

/* ============================================================
   02 - Context & memory
   Stacked file/source rows, last row active.
   ============================================================ */
export function V02Context() {
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[360px] space-y-1.5">
        <StackRow Icon={FileText} label="patient_records.json" suffix="1,247 rows" shift={0} />
        <StackRow Icon={FileText} label="Brightside_SOP.pdf" suffix="32 pages" shift={6} />
        <StackRow Icon={Plug} label="crm.brightside.com" suffix="live" shift={12} />
        <StackRow Icon={LinkIcon} label="calendly.com/dr-mehta" suffix="synced" shift={18} active />
      </div>
    </Stage>
  );
}

/* ============================================================
   03 - Tools
   Wrapping grid of pill chips, one active.
   ============================================================ */
export function V03Tools() {
  return (
    <Stage>
      <div className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-2">
        <Chip Icon={Calendar} label="Book slot" />
        <Chip Icon={Search} label="Pull records" active />
        <Chip Icon={CreditCard} label="Take payment" />
        <Chip Icon={ShieldCheck} label="Verify ID" />
        <Chip Icon={PhoneOutgoing} label="Transfer call" />
        <Chip Icon={MessageSquare} label="Send SMS" />
      </div>
    </Stage>
  );
}

/* ============================================================
   04 - Analysis & actions
   Rectangular card with coral square avatar + JSON snippet.
   ============================================================ */
export function V04Outcomes() {
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[380px] rounded-xl border border-white/10 bg-[#15151A] p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F77E5C] text-[#0a0a0d]">
            <Database size={15} strokeWidth={1.8} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F77E5C]">
            agent &nbsp;[12:21]
          </span>
        </div>
        <div className="mt-3 space-y-0.5 font-mono text-[11.5px] leading-[1.65]">
          <div>
            <span className="text-[#F77E5C]">outcome</span>
            <span className="text-white/55">: </span>
            <span className="text-white/85">&quot;booking_confirmed&quot;</span>
          </div>
          <div>
            <span className="text-[#F77E5C]">name</span>
            <span className="text-white/55">: </span>
            <span className="text-white/85">&quot;Priya R.&quot;</span>
          </div>
          <div>
            <span className="text-[#F77E5C]">phone</span>
            <span className="text-white/55">: </span>
            <span className="text-white/85">&quot;+91 98xxx xxxxx&quot;</span>
          </div>
          <div>
            <span className="text-[#F77E5C]">slot</span>
            <span className="text-white/55">: </span>
            <span className="text-white/85">&quot;2026-06-18T17:30&quot;</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   05 - Simulate
   Two rectangular cards side by side, right one active.
   ============================================================ */
export function V05Simulate() {
  const wave = (color: string, seed: number) => {
    const W = 100;
    const H = 22;
    const pts = Array.from({ length: 60 }, (_, i) => {
      const s = seed + i;
      const amp =
        Math.sin(s * 0.32) * 0.5 +
        Math.sin(s * 0.71) * 0.25 +
        Math.cos(s * 1.13) * 0.15;
      const y = H / 2 + amp * (H / 2 - 2);
      return `${(i / 59) * W},${y.toFixed(2)}`;
    }).join(" ");
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-7 w-full"
      >
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={0.55}
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return (
    <Stage>
      <div className="mx-auto grid w-full max-w-[420px] grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-[#15151A] p-3">
          <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/50">
            <span>v1.3.0</span>
            <span className="text-white/30">baseline</span>
          </div>
          <div className="mt-2">{wave("rgba(255,255,255,0.6)", 7)}</div>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9.5px] text-white/65">
              4.6
            </span>
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9.5px] text-white/65">
              412ms
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-[#F77E5C] bg-[#F77E5C] p-3 text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.5)]">
          <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em]">
            <span>v1.3.1</span>
            <span className="opacity-65">candidate</span>
          </div>
          <div className="mt-2">{wave("#0a0a0d", 13)}</div>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded bg-[#0a0a0d]/15 px-1.5 py-0.5 font-mono text-[9.5px]">
              +8%
            </span>
            <span className="rounded bg-[#0a0a0d]/15 px-1.5 py-0.5 font-mono text-[9.5px]">
              -22ms
            </span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   06 - Telephony
   Row of carrier brand tiles, BYO SIP is active.
   ============================================================ */
function CarrierTile({
  letter,
  label,
  active = false
}: {
  letter: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={
          "flex h-14 w-14 items-center justify-center rounded-xl border " +
          (active
            ? "border-[#F77E5C] bg-[#F77E5C] text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.55)]"
            : "border-white/10 bg-[#15151A] text-white/85")
        }
      >
        <span className="font-sans text-[20px] font-bold">{letter}</span>
      </div>
      <span
        className={
          "font-mono text-[9.5px] uppercase tracking-[0.12em] " +
          (active ? "text-white" : "text-white/40")
        }
      >
        {label}
      </span>
    </div>
  );
}
export function V06Telephony() {
  return (
    <Stage>
      <div className="flex items-end justify-center gap-3">
        <CarrierTile letter="P" label="Plivo" />
        <CarrierTile letter="E" label="Exotel" />
        <CarrierTile letter="T" label="Tata" />
        <CarrierTile letter="T" label="Twilio" />
        <CarrierTile letter="S" label="BYO SIP" active />
      </div>
    </Stage>
  );
}

/* ============================================================
   07 - Go live
   Single phone-call card with red decline + coral accept.
   ============================================================ */
export function V07GoLive() {
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[360px] rounded-xl border border-white/10 bg-[#15151A] p-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          <PhoneIncoming size={11} strokeWidth={2} />
          incoming · Hindi
        </div>
        <div className="mt-2 font-sans text-[15px] font-semibold tracking-tight text-white">
          Priya R. · +91 98765 43210
        </div>
        <div className="font-sans text-[11.5px] text-white/45">
          Brightside Dental
        </div>
        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5413B] text-white"
          >
            <Phone size={16} strokeWidth={2} className="rotate-[135deg]" />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F77E5C] text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.55)]"
          >
            <Phone size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   08 - Objective metrics
   Stat panel: big number + coral area chart + 3 metric chips.
   ============================================================ */
export function V08Metrics() {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const v =
      0.45 +
      0.35 * Math.abs(Math.sin(i * 0.38)) +
      0.25 * Math.abs(Math.cos(i * 0.71 + 1)) +
      (i > 14 && i < 19 ? 0.18 : 0);
    return Math.min(1, v);
  });
  const W = 100;
  const H = 24;
  const line = pts
    .map(
      (v, i) =>
        `${(i / (pts.length - 1)) * W},${(H - v * (H - 2) - 1).toFixed(2)}`
    )
    .join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[400px]">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              calls · last 24h
            </div>
            <div className="mt-1 font-serif text-[36px] leading-none text-white">
              184,290
            </div>
          </div>
          <span className="rounded-md bg-[#F77E5C] px-2 py-1 font-mono text-[10px] text-[#0a0a0d]">
            +12.4%
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="mt-3 h-12 w-full"
        >
          <polygon points={area} fill="rgba(247,126,92,0.20)" />
          <polyline
            points={line}
            fill="none"
            stroke="#F77E5C"
            strokeWidth={0.6}
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <span className="rounded-md border border-white/10 bg-[#15151A] px-2 py-1.5 text-center font-mono text-[11px] text-white/75">
            412 ms
          </span>
          <span className="rounded-md border border-white/10 bg-[#15151A] px-2 py-1.5 text-center font-mono text-[11px] text-white/75">
            78.4%
          </span>
          <span className="rounded-md border border-white/10 bg-[#15151A] px-2 py-1.5 text-center font-mono text-[11px] text-white/75">
            4.6 / 5
          </span>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   09 - Subjective metrics
   Stacked rubric rows, last one is red (regression).
   ============================================================ */
export function V09Quality() {
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[360px] space-y-1.5">
        {[
          { label: "empathy", v: "4.6", tone: "green" as const },
          { label: "policy adherence", v: "0.92", tone: "green" as const },
          { label: "resolution", v: "0.88", tone: "green" as const }
        ].map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-[#15151A] px-3 py-2.5"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/65">
              {r.label}
            </span>
            <Chip label={r.v} tone={r.tone} />
          </div>
        ))}
        <div className="flex items-center justify-between rounded-lg border border-[#E5413B]/45 bg-[#E5413B]/[0.08] px-3 py-2.5">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#E5413B]">
            <AlertTriangle size={12} strokeWidth={2} />
            latency p95
          </span>
          <Chip label="910 ms" tone="red" />
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   10 - Dashboards & alerts
   Rule-builder sentence as 3 stacked pill rows.
   ============================================================ */
export function V10Alerts() {
  const tag = (t: string) => (
    <span className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/55">
      {t}
    </span>
  );
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[440px] space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {tag("IF")}
          <Chip Icon={Bell} label="p95 latency" />
          <Chip label=">" />
          <Chip label="800 ms" active />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {tag("FOR")}
          <Chip label="5 minutes" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {tag("THEN")}
          <Chip Icon={Hash} label="Slack #ops" />
          {tag("AND")}
          <Chip Icon={Mail} label="Page on-call" />
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   11 - Branch · A/B · promote
   Stack of 3 version cards, candidate is coral with promote arrow.
   ============================================================ */
export function V11Branch() {
  return (
    <Stage>
      <div className="mx-auto w-full max-w-[380px] space-y-1.5">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#15151A] px-3 py-2.5">
          <span className="font-mono text-[11.5px] text-white/65">
            main · v1.2.4
          </span>
          <Chip label="stable" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#15151A] px-3 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[11.5px] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
            main · v1.3.0
          </span>
          <Chip label="live · 100%" tone="green" />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#F77E5C] bg-[#F77E5C] px-3 py-2.5 text-[#0a0a0d] shadow-[0_10px_30px_-8px_rgba(247,126,92,0.5)]">
          <span className="font-mono text-[11.5px] font-semibold">
            candidate · v1.3.1
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#0a0a0d]/15 px-2 py-1 font-mono text-[10.5px]">
            <Check size={11} strokeWidth={2.5} />
            promote
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Stage>
  );
}

/* ============================================================
   Map for the JourneyBento card array.
   ============================================================ */
export const JOURNEY_VISUALS = {
  "01": V01Flow,
  "02": V02Context,
  "03": V03Tools,
  "04": V04Outcomes,
  "05": V05Simulate,
  "06": V06Telephony,
  "07": V07GoLive,
  "08": V08Metrics,
  "09": V09Quality,
  "10": V10Alerts,
  "11": V11Branch
} as const;
