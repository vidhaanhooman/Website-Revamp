/* Deploy feature visual — top: managed-vs-BYO telephony comparison.
   Bottom: recent deployment activity log. */

const MANAGED_NUMBERS = [
  { city: "Mumbai", number: "+91 98765 43210", status: "active" as const },
  { city: "Bengaluru", number: "+91 80 4567 8901", status: "active" as const },
  { city: "Chennai", number: "+91 44 3210 9876", status: "active" as const },
  { city: "Delhi", number: "+91 11 8765 4321", status: "active" as const }
];

const BYO_TRUNKS = [
  { label: "Plivo", short: "P", color: "#7B6AE5", status: "Live" as const },
  { label: "Exotel", short: "E", color: "#3FA8E3", status: "Live" as const },
  { label: "Tata Tele", short: "T", color: "#4076CB", status: "Standby" as const },
  { label: "Twilio", short: "T", color: "#F0354A", status: "Standby" as const }
];

const ACTIVITY = [
  {
    t: "14:32:18",
    tag: "PROVISIONED",
    msg: "Mumbai number live · +91 98765 43210",
    tone: "ok" as const
  },
  {
    t: "14:30:04",
    tag: "PROMOTED",
    msg: "Maya · v1.3.1 → production · 100% rolled out",
    tone: "ok" as const
  },
  {
    t: "14:28:55",
    tag: "CONNECTED",
    msg: "BYO trunk · Plivo SIP authenticated",
    tone: "info" as const
  },
  {
    t: "14:27:41",
    tag: "READY",
    msg: "Knowledge base indexed · 1,284 chunks",
    tone: "ok" as const
  }
];

function StatusDot({ tone }: { tone: "ok" | "warn" | "info" }) {
  const cls =
    tone === "ok"
      ? "bg-emerald-400"
      : tone === "warn"
        ? "bg-amber-400"
        : "bg-sky-400";
  return <span className={"h-1.5 w-1.5 shrink-0 rounded-full " + cls} />;
}

export function DeployVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      {/* macOS-ish chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C841]" />
        </div>
        <span className="font-sans text-[12px] font-medium text-white/85">
          Telephony Console · Brightside Dental
        </span>
        <span className="flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
          <span className="h-1 w-1 animate-pulse rounded-full bg-white" />
          Live · 4 numbers
        </span>
      </div>

      {/* ─── TWO PATHS ─────────────────────────────────────── */}
      <div className="grid border-b border-white/10 md:grid-cols-2">
        {/* LEFT — HoomanLabs Managed (preferred) */}
        <div className="relative overflow-hidden border-b border-white/10 p-5 md:border-b-0 md:border-r md:p-6">
          {/* Subtle neutral glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.05), transparent 55%)"
            }}
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/45">
                  HoomanLabs Telephony
                </p>
                <h4 className="mt-1.5 font-sans text-[14px] font-semibold tracking-tight text-white">
                  Managed Indian numbers
                </h4>
              </div>
              <span className="shrink-0 rounded-full border border-white/35 bg-white/10 px-2 py-[3px] font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white">
                Preferred
              </span>
            </div>

            <ul className="mt-4 space-y-1.5">
              {MANAGED_NUMBERS.map((n) => (
                <li
                  key={n.city}
                  className="flex items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-white/[0.025] px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/85" />
                    <span className="font-sans text-[12px] font-medium text-white/85">
                      {n.city}
                    </span>
                  </div>
                  <span className="font-sans text-[11.5px] font-medium tabular-nums tracking-tight text-white/85">
                    {n.number}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-sans text-[10.5px] uppercase tracking-[0.2em] text-white/35">
              50+ circles available · billed by the minute
            </p>
          </div>
        </div>

        {/* RIGHT — BYO trunks */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/45">
                Bring your own
              </p>
              <h4 className="mt-1.5 font-sans text-[14px] font-semibold tracking-tight text-white">
                BYO trunks
              </h4>
            </div>
            <span className="shrink-0 rounded-full border border-white/12 bg-white/[0.03] px-2 py-[3px] font-sans text-[9.5px] font-medium uppercase tracking-[0.18em] text-white/55">
              SIP
            </span>
          </div>

          <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-md border border-white/[0.06] bg-white/[0.015]">
            {BYO_TRUNKS.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-3 px-3 py-2.5"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]"
                  style={{
                    boxShadow: `inset 0 -8px 14px -10px ${c.color}88`
                  }}
                >
                  <span
                    className="font-sans text-[12.5px] font-bold leading-none"
                    style={{ color: c.color }}
                  >
                    {c.short}
                  </span>
                </span>
                <span className="font-sans text-[12.5px] font-medium text-white/90">
                  {c.label}
                </span>
                <span
                  className={
                    "ml-auto flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] " +
                    (c.status === "Live"
                      ? "text-white/70"
                      : "text-white/35")
                  }
                >
                  <span
                    className={
                      "h-1 w-1 rounded-full " +
                      (c.status === "Live" ? "bg-white/70" : "bg-white/25")
                    }
                  />
                  {c.status}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-3 font-sans text-[10.5px] uppercase tracking-[0.2em] text-white/35">
            Keep your DIDs, pricing, contracts
          </p>
        </div>
      </div>

      {/* ─── DEPLOYMENT ACTIVITY LOG ────────────────────────── */}
      <div className="relative px-5 py-4 md:px-6 md:py-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
            Deployment activity · last 5 min
          </span>
          <span className="font-mono text-[10px] tabular-nums text-white/40">
            14:32:18 UTC
          </span>
        </div>

        <ul className="space-y-1.5">
          {ACTIVITY.map((e) => (
            <li
              key={e.t}
              className="grid items-center gap-x-3 font-sans text-[12px] md:grid-cols-[68px_minmax(120px,max-content)_minmax(0,1fr)]"
            >
              <span className="tabular-nums text-white/40">{e.t}</span>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.04] px-1.5 py-[2px] font-sans text-[9.5px] font-medium uppercase tracking-[0.18em] text-white/65">
                <StatusDot tone={e.tone} />
                {e.tag}
              </span>
              <span className="min-w-0 truncate text-white/75">{e.msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
