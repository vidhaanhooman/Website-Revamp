/* Simulate feature visual — top: side-by-side vibe-check (v1.3.0 vs v1.3.1).
   Bottom: regression summary by category. */

/* ─── helpers ─────────────────────────────────────────────── */

const W = 100;
const H = 14;
const SAMPLES = 64;

function wavePath(seed: number, jitter = 0): { line: string; fill: string } {
  const points = Array.from({ length: SAMPLES }, (_, i) => {
    const x = (i / (SAMPLES - 1)) * W;
    const s = seed + i;
    const amp =
      Math.sin(s * 0.32) * 0.5 +
      Math.sin(s * 0.71) * 0.25 +
      Math.cos(s * 1.13) * 0.15 +
      // jitter adds extra small wobble for the "before" version
      Math.sin(s * 2.3) * jitter;
    const y = H / 2 + amp * (H / 2 - 1);
    return { x, y };
  });
  const line = points
    .map((p, i) => (i === 0 ? "M" : "L") + ` ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const fill = `${line} L ${W} ${H} L 0 ${H} Z`;
  return { line, fill };
}

/* ─── vibe-check lane ─────────────────────────────────────── */

function Lane({
  version,
  badge,
  color,
  fillColor,
  transcript,
  latency,
  highlighted,
  seed,
  jitter,
  pauseAt
}: {
  version: string;
  badge: string;
  color: string;
  fillColor: string;
  transcript: string;
  latency: string;
  highlighted?: boolean;
  seed: number;
  jitter?: number;
  /** Optional x-position (0-100) where a faint "pause" marker is drawn. */
  pauseAt?: number;
}) {
  const { line, fill } = wavePath(seed, jitter ?? 0);
  return (
    <div
      className={
        "rounded-xl border p-3.5 transition " +
        (highlighted
          ? "border-[#F77E5C]/40 bg-[#F77E5C]/[0.04] shadow-[0_0_28px_-8px_rgba(247,126,92,0.35)]"
          : "border-white/10 bg-white/[0.02]")
      }
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10.5px] tabular-nums text-white/70">
            {version}
          </span>
          <span
            className={
              "font-sans text-[9.5px] font-semibold uppercase tracking-[0.2em] " +
              (highlighted ? "text-[#F77E5C]" : "text-white/35")
            }
          >
            {badge}
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-white/55">
          {latency}
        </span>
      </div>

      {/* Waveform */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block h-8 w-full"
        aria-hidden
      >
        <path d={fill} fill={fillColor} />
        <path
          d={line}
          stroke={color}
          strokeWidth="0.35"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pauseAt !== undefined ? (
          <g>
            {/* Pause marker — vertical dim line */}
            <line
              x1={pauseAt}
              x2={pauseAt}
              y1="2"
              y2={H - 2}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.25"
              strokeDasharray="0.6 0.4"
            />
          </g>
        ) : null}
      </svg>

      {/* Transcript */}
      <p
        className={
          "mt-2 font-sans text-[12.5px] leading-[1.4] " +
          (highlighted ? "text-white/90" : "text-white/55")
        }
      >
        &ldquo;{transcript}&rdquo;
      </p>
    </div>
  );
}

/* ─── regression row ──────────────────────────────────────── */

function DeltaRow({
  category,
  before,
  after
}: {
  category: string;
  before: number;
  after: number;
}) {
  const delta = +(after - before).toFixed(1);
  const dir: "up" | "down" | "flat" =
    delta > 0.05 ? "up" : delta < -0.05 ? "down" : "flat";

  const tone =
    dir === "up"
      ? "text-emerald-300"
      : dir === "down"
        ? "text-[#FF8A7A]"
        : "text-white/45";
  const dotTone =
    dir === "up"
      ? "bg-emerald-400"
      : dir === "down"
        ? "bg-[#E5413B]"
        : "bg-white/30";
  const arrow = dir === "up" ? "↑" : dir === "down" ? "↓" : "—";

  // Bar widths visualize the rate (0–100%)
  return (
    <li className="grid items-center gap-x-4 gap-y-1 py-2.5 md:grid-cols-[1.4fr_1fr_120px]">
      <div className="flex items-center gap-2.5">
        <span className={"h-1.5 w-1.5 shrink-0 rounded-full " + dotTone} />
        <span className="font-sans text-[12.5px] font-medium text-white/90">
          {category}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-sans text-[11.5px] tabular-nums text-white/40">
          {before.toFixed(1)}%
        </span>
        <span className="text-white/30">→</span>
        <span className="font-sans text-[11.5px] font-semibold tabular-nums text-white/85">
          {after.toFixed(1)}%
        </span>
      </div>
      <div
        className={
          "flex items-center justify-end gap-1.5 font-sans text-[11.5px] font-medium tabular-nums " +
          tone
        }
      >
        <span>{arrow}</span>
        <span>{delta === 0 ? "—" : `${Math.abs(delta).toFixed(1)} pts`}</span>
      </div>
    </li>
  );
}

/* ─── main ────────────────────────────────────────────────── */

export function SimulateVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      {/* Chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C841]" />
        </div>
        <span className="font-sans text-[12px] font-medium text-white/85">
          Vibe-check · Maya · v1.3.0 → v1.3.1
        </span>
        <span className="flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-300" />
          Simulating
        </span>
      </div>

      {/* TOP — vibe-check */}
      <div className="border-b border-white/10 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/45">
              Side-by-side vibe-check
            </p>
            <h4 className="mt-1.5 font-sans text-[14px] font-semibold tracking-tight text-white">
              Patient asks to reschedule mid-confirmation
            </h4>
          </div>
          <span className="shrink-0 rounded-full border border-emerald-400/45 bg-emerald-500/15 px-2 py-[3px] font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="mr-1">↑</span>
            Better
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {/* v1.3.0 — before */}
          <Lane
            version="v1.3.0"
            badge="Before"
            color="rgba(255,255,255,0.55)"
            fillColor="rgba(255,255,255,0.04)"
            transcript="Okay, let me check our schedule… uh, hold on a second… Tuesday at 2:15 PM works."
            latency="428 ms"
            seed={31}
            jitter={0.18}
            pauseAt={47}
          />

          {/* v1.3.1 — after */}
          <Lane
            version="v1.3.1"
            badge="After"
            color="#F77E5C"
            fillColor="rgba(247,126,92,0.08)"
            transcript="Tuesday at 2:15 PM with Dr. Patel — confirmed."
            latency="248 ms"
            highlighted
            seed={59}
          />
        </div>
      </div>

      {/* BOTTOM — regression deltas */}
      <div className="p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
            Regression summary · by category
          </span>
          <span className="font-mono text-[10px] tabular-nums text-white/40">
            4,219 / 16,231 scenarios
          </span>
        </div>

        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          <DeltaRow
            category="Interruptions & barge-in"
            before={99.4}
            after={99.7}
          />
          <DeltaRow
            category="Code-switches (Hi ↔ En)"
            before={98.6}
            after={99.1}
          />
          <DeltaRow category="Noisy lines" before={96.0} after={94.8} />
          <DeltaRow category="Off-script asks" before={99.1} after={99.1} />
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-[10.5px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-1.5 text-emerald-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Improved
          </span>
          <span className="flex items-center gap-1.5 text-[#FF8A7A]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5413B]" />
            Regressed · blocks promotion
          </span>
          <span className="flex items-center gap-1.5 text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            Flat
          </span>
        </div>
      </div>
    </div>
  );
}
