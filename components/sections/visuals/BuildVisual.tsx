/* Build feature visual — no-code agent builder canvas with a fuller node graph
   than the bento version. macOS chrome + dotted grid + 6 connected nodes. */

export function BuildVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      {/* macOS chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C841]" />
        </div>
        <span className="font-sans text-[12px] font-medium text-white/85">
          HoomanLabs No-Code Agent Builder
        </span>
        <span className="font-mono text-[10.5px] text-white/40">100%</span>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[16/8]">
        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0.7px, transparent 0.7px)",
            backgroundSize: "16px 16px"
          }}
        />

        {/* Connectors — viewBox 100x56 matches 16:9 aspect (16/9 ≈ 100/56.25).
            Coordinates are percentages along x; y is css_percent × 0.56. */}
        <svg
          aria-hidden
          viewBox="0 0 100 56"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* Trigger → AI Agent (green) */}
          <line
            x1="20"
            y1="28"
            x2="35"
            y2="28"
            stroke="#34D399"
            strokeWidth="0.32"
          />
          <circle cx="20" cy="28" r="0.7" fill="#34D399" />
          <circle cx="27.5" cy="28" r="0.7" fill="#34D399" />
          <circle cx="35" cy="28" r="0.7" fill="#34D399" />

          {/* AI Agent single output port */}
          <circle cx="65" cy="28" r="0.85" fill="#F77E5C" />

          {/* AI Agent → Result (top right) */}
          <line
            x1="65"
            y1="28"
            x2="78"
            y2="10"
            stroke="#4877D8"
            strokeWidth="0.32"
          />
          <circle cx="78" cy="10" r="0.7" fill="#4877D8" />

          {/* AI Agent → Tool (right middle) */}
          <line
            x1="65"
            y1="28"
            x2="78"
            y2="28"
            stroke="#4877D8"
            strokeWidth="0.32"
          />
          <circle cx="78" cy="28" r="0.7" fill="#4877D8" />

          {/* AI Agent → Handoff (bottom right, dashed = fallback) */}
          <line
            x1="65"
            y1="28"
            x2="78"
            y2="46"
            stroke="#4877D8"
            strokeWidth="0.32"
            strokeDasharray="1.1 0.8"
          />
          <circle cx="78" cy="46" r="0.7" fill="#4877D8" />

          {/* Knowledge Base → AI Agent (bottom up, violet) */}
          <line
            x1="50"
            y1="48"
            x2="50"
            y2="36"
            stroke="#7257C7"
            strokeWidth="0.32"
          />
          <circle cx="50" cy="48" r="0.7" fill="#7257C7" />
          <circle cx="50" cy="36" r="0.7" fill="#7257C7" />
        </svg>

        {/* Nodes ─────────────────────────────────────────────── */}

        {/* TRIGGER (left, css y=50%) */}
        <div
          className="absolute"
          style={{
            left: "5%",
            top: "50%",
            width: "15%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border border-white/15 bg-[#15151a] px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#34D399] text-[9px] font-bold text-black">
                ⚡
              </span>
              <span className="font-sans text-[10.5px] font-semibold text-white">
                Trigger
              </span>
            </div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <div className="font-sans text-[10px] font-medium text-white/90">
                Webhook
              </div>
              <div className="font-mono text-[8.5px] text-white/45">
                on call.received
              </div>
            </div>
          </div>
        </div>

        {/* AI AGENT (center, highlighted, css y=50%) */}
        <div
          className="absolute"
          style={{
            left: "35%",
            top: "50%",
            width: "30%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border-[1.5px] border-[#F77E5C] bg-[#15151a] px-3 py-2.5 shadow-[0_0_36px_-4px_rgba(247,126,92,0.6),0_8px_20px_-8px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#7257C7] text-[8px] font-bold text-white">
                AI
              </span>
              <span className="font-sans text-[11px] font-semibold text-white">
                Maya · Receptionist
              </span>
            </div>
            <div className="mt-2 space-y-1 border-t border-white/10 pt-2">
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-mono text-white/45">Voice</span>
                <span className="font-sans text-white/85">Hindi · English</span>
              </div>
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-mono text-white/45">Model</span>
                <span className="font-sans text-white/85">Reasoning · v2</span>
              </div>
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-mono text-white/45">Tools</span>
                <span className="font-sans text-white/85">3 connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULT (top right, css y=18%) */}
        <div
          className="absolute"
          style={{
            left: "78%",
            top: "18%",
            width: "17%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border border-white/15 bg-[#15151a] px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#4877D8] text-[9px] font-bold text-white">
                #
              </span>
              <span className="font-sans text-[10.5px] font-semibold text-white">
                Send to CRM
              </span>
            </div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <div className="font-sans text-[10px] font-medium text-white/90">
                HubSpot
              </div>
              <div className="font-mono text-[8.5px] text-white/45">
                create.contact
              </div>
            </div>
          </div>
        </div>

        {/* TOOL (right middle, css y=50%) */}
        <div
          className="absolute"
          style={{
            left: "78%",
            top: "50%",
            width: "17%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border border-white/15 bg-[#15151a] px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#FFB02E] text-[9px] font-bold text-black">
                ⚙
              </span>
              <span className="font-sans text-[10.5px] font-semibold text-white">
                Calendar
              </span>
            </div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <div className="font-sans text-[10px] font-medium text-white/90">
                Cal.com
              </div>
              <div className="font-mono text-[8.5px] text-white/45">
                book.slot
              </div>
            </div>
          </div>
        </div>

        {/* HUMAN HANDOFF (bottom right, css y=82%) */}
        <div
          className="absolute"
          style={{
            left: "78%",
            top: "82%",
            width: "17%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border border-white/15 bg-[#15151a] px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#4877D8] text-[9px] font-bold text-white">
                #
              </span>
              <span className="font-sans text-[10.5px] font-semibold text-white">
                Human Handoff
              </span>
            </div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <div className="font-sans text-[10px] font-medium text-white/90">
                Dr. Patel
              </div>
              <div className="font-mono text-[8.5px] text-white/45">
                slack · #clinical
              </div>
            </div>
          </div>
        </div>

        {/* KNOWLEDGE BASE (below AI agent, css y=86%) */}
        <div
          className="absolute"
          style={{
            left: "40%",
            top: "86%",
            width: "20%",
            transform: "translateY(-50%)"
          }}
        >
          <div className="rounded-md border border-white/15 bg-[#15151a] px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#7257C7] text-[8px] font-bold text-white">
                K
              </span>
              <span className="font-sans text-[10.5px] font-semibold text-white">
                Knowledge Base
              </span>
            </div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5">
              <div className="font-sans text-[10px] font-medium text-white/90">
                Brightside SOP · v4
              </div>
              <div className="font-mono text-[8.5px] text-white/45">
                1,284 chunks · synced
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
