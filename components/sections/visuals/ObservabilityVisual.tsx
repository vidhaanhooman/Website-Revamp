/* Observability feature visual — top: multi-series line chart (metrics).
   Bottom: compact event log (QA). */

const SERIES = [
  {
    label: "Inbound",
    color: "#8B5CF6",
    values: [0, 0, 0, 12, 6, 0, 0]
  },
  {
    label: "Outbound",
    color: "#C4B5FD",
    values: [0, 0, 4, 6, 5, 5.5, 6]
  },
  {
    label: "Web",
    color: "#FFFFFF",
    values: [0, 0, 1, 8, 1, 6, 0]
  },
  {
    label: "Tasks Created",
    color: "#9CA3AF",
    values: [2, 2, 3, 5, 5, 8, 6]
  }
];

const DAYS = ["Jun 7", "Jun 8", "Jun 9", "Jun 10", "Jun 11", "Jun 12", "Jun 13"];
const Y_MAX = 12;
const Y_TICKS = [0, 3, 6, 9, 12];

/* Chart viewBox geometry */
const VB_W = 800;
const VB_H = 300;
const PAD_L = 36;
const PAD_R = 16;
const PAD_T = 14;
const PAD_B = 14;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;

const xPx = (i: number) =>
  PAD_L + (i / (DAYS.length - 1)) * PLOT_W;
const yPx = (v: number) => PAD_T + PLOT_H - (v / Y_MAX) * PLOT_H;

/* Catmull-Rom-style smooth cubic-bezier path through a set of points. */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  const tension = 0.22;
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 2] ?? points[i - 1];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[i + 1] ?? points[i];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="font-sans text-[11px] font-medium text-white/75">
        {label}
      </span>
    </span>
  );
}

export function ObservabilityVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      {/* ─── METRICS CHART ────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
          <span className="font-sans text-[13px] font-semibold tracking-tight text-white">
            Conversations &amp; Tasks
          </span>
          <div className="flex flex-wrap items-center gap-3.5">
            {SERIES.map((s) => (
              <LegendDot key={s.label} color={s.color} label={s.label} />
            ))}
          </div>
        </div>

        <div className="px-3 pb-3">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="block h-[240px] w-full md:h-[280px]"
            aria-hidden
          >
            {/* Y-axis tick labels + horizontal dashed gridlines */}
            {Y_TICKS.map((tick) => {
              const y = yPx(tick);
              return (
                <g key={tick}>
                  <line
                    x1={PAD_L}
                    y1={y}
                    x2={VB_W - PAD_R}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={PAD_L - 10}
                    y={y + 3}
                    textAnchor="end"
                    fill="rgba(255,255,255,0.4)"
                    fontFamily="var(--font-sans), system-ui, sans-serif"
                    fontSize="11"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Series lines */}
            {SERIES.map((s) => {
              const pts = s.values.map((v, i) => ({ x: xPx(i), y: yPx(v) }));
              return (
                <path
                  key={s.label}
                  d={smoothPath(pts)}
                  stroke={s.color}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}

            {/* Data point dots */}
            {SERIES.map((s) =>
              s.values.map((v, i) => (
                <circle
                  key={`${s.label}-${i}`}
                  cx={xPx(i)}
                  cy={yPx(v)}
                  r="3"
                  fill={s.color}
                  stroke="#0a0a0d"
                  strokeWidth="1.5"
                />
              ))
            )}

            {/* X-axis day labels */}
            {DAYS.map((d, i) => (
              <text
                key={d}
                x={xPx(i)}
                y={VB_H - 1}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontFamily="var(--font-sans), system-ui, sans-serif"
                fontSize="11"
              >
                {d}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* ─── EVENT LOG (QA) ───────────────────────────────────── */}
      <div className="relative">
        {/* Dotted grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 0.7px, transparent 0.7px)",
            backgroundSize: "12px 12px"
          }}
        />
        <div className="relative grid gap-6 p-5 md:grid-cols-[1.1fr_1fr] md:p-6">
          {/* Highlighted action */}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] tabular-nums text-white/45">
                12:37:16
              </span>
              <span className="flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-emerald-300/85">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <h4 className="mt-2 font-sans text-[15px] font-semibold leading-[1.3] tracking-tight text-emerald-300">
              Booked Tuesday 2:15 PM with Dr. Patel.
            </h4>
            <p className="mt-1 font-sans text-[12.5px] leading-[1.5] text-white/55">
              SMS sent to +91 98765 43210.
            </p>
          </div>

          {/* Event timeline */}
          <ul className="space-y-1 self-center md:border-l md:border-white/[0.06] md:pl-6">
            {[
              { t: "12:34:47", msg: "Greeted patient in Hindi." },
              { t: "12:35:14", msg: "Verified caller identity." },
              { t: "12:35:58", msg: "Pulled appointment with Dr. Patel." },
              { t: "12:36:21", msg: "Offered Tuesday 2:15 PM slot." },
              { t: "12:37:14", msg: "Patient confirmed slot." }
            ].map((e) => (
              <li key={e.t} className="flex gap-3 font-sans text-[11.5px]">
                <span className="w-14 shrink-0 tabular-nums text-white/40">
                  {e.t}
                </span>
                <span className="truncate text-white/75">{e.msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
