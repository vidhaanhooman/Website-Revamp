"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

function HoomanMark({ size = 12 }: { size?: number }) {
  const w = Math.round((size * 86) / 95);
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 86 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Interactive Fibonacci-sphere dots → cursor tilts, idle rotates.
function DottedSphere() {
  const N = 600;
  const basePoints = useMemo(() => {
    const arr: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      arr.push({ x, y, z });
    }
    return arr;
  }, []);

  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mirror the placeholder's viewport rect onto the fixed portal container so
  // the sphere stays anchored to its slot in the card.
  useEffect(() => {
    if (!mounted) return;
    const ph = placeholderRef.current;
    const portal = portalRef.current;
    if (!ph || !portal) return;

    const updateRect = () => {
      const r = ph.getBoundingClientRect();
      portal.style.left = `${r.left}px`;
      portal.style.top = `${r.top}px`;
      portal.style.width = `${r.width}px`;
      portal.style.height = `${r.height}px`;
    };

    updateRect();

    const ro = new ResizeObserver(updateRect);
    ro.observe(ph);

    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateRect);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateRect);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateRect);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const container = portalRef.current;
    if (!container) return;

    let rotY = 0;
    let rotX = 0;
    let targetY = 0;
    let targetX = 0;
    let warmth = 0; // 0 = white, 1 = warm coral
    let targetWarmth = 0;
    let auto = true;
    let raf = 0;

    // BLAST state - 1 at moment of click, decays toward 0
    let blast = 0;
    let jitters: { x: number; y: number; z: number }[] = [];

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetY = nx * Math.PI * 0.55;
      targetX = -ny * Math.PI * 0.35;
      targetWarmth = 1;
      auto = false;
    };

    const onLeave = () => {
      auto = true;
      targetX = 0;
      targetWarmth = 0;
    };

    const onClick = () => {
      // Fresh random jitter per dot so each click feels distinct.
      jitters = basePoints.map(() => ({
        x: (Math.random() - 0.5) * 1.2,
        y: (Math.random() - 0.5) * 1.2,
        z: (Math.random() - 0.5) * 1.2
      }));
      blast = 1;
      targetWarmth = 1; // flash coral on blast
    };

    const tick = () => {
      if (auto) {
        targetY += 0.0035; // gentle idle drift
      }
      rotY += (targetY - rotY) * 0.08;
      rotX += (targetX - rotX) * 0.08;
      warmth += (targetWarmth - warmth) * 0.07;

      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);

      // Lerp white → coral (#ff8a5a). R stays 255; G/B drop with warmth.
      const r = 255;
      const g = Math.round(255 - warmth * (255 - 138));
      const b = Math.round(255 - warmth * (255 - 90));
      const fill = `rgb(${r},${g},${b})`;

      // Exponential decay - change is fast at the start (blast near 1) and
      // slows toward the end (blast near 0). Classic ease-out feel.
      if (blast > 0.001) blast *= 0.93;
      else blast = 0;

      for (let i = 0; i < basePoints.length; i++) {
        const p = basePoints[i];

        // INWARD collapse - opposite direction from the previous outward blast.
        // At blast=1 dots are scrunched 15% from center; at blast=0 they're at
        // the base sphere. The exponential decay means they SPRING back fast
        // and ease into rest, which is the "start fast, end slow" cadence.
        const radial = 1 - blast * 0.85;
        const j = jitters[i];
        const jBlast = blast * 0.45; // small scatter on the way in
        const px = j ? p.x * radial + j.x * jBlast : p.x * radial;
        const py = j ? p.y * radial + j.y * jBlast : p.y * radial;
        const pz = j ? p.z * radial + j.z * jBlast : p.z * radial;

        // Y-axis rotation
        const x1 = px * cy - pz * sy;
        const z1 = px * sy + pz * cy;
        // X-axis rotation
        const y2 = py * cx - z1 * sx;
        const z2 = py * sx + z1 * cx;

        const depth = (z2 + 1) / 2; // 0 back → 1 front
        // Silhouette-edge fade - |z2| is 0 at the sphere's rim and 1 at the front/back.
        // Multiplying opacity by edgeFade quietens dots near the outline so the
        // sphere reads as a soft globe instead of a hard-edged disc.
        const edgeFade = Math.pow(Math.abs(z2), 0.85);
        const size = 0.007 + depth * 0.013;
        const opacity = (0.16 + depth * 0.78) * (0.18 + edgeFade * 0.82);

        const el = circleRefs.current[i];
        if (el) {
          el.setAttribute("cx", x1.toFixed(4));
          el.setAttribute("cy", (-y2).toFixed(4));
          el.setAttribute("r", size.toFixed(4));
          el.setAttribute("opacity", opacity.toFixed(3));
          el.setAttribute("fill", fill);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    container.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("click", onClick);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [basePoints, mounted]);

  const overlay = (
    <div
      ref={portalRef}
      className="cursor-grab touch-none active:cursor-grabbing"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: 40,
        pointerEvents: "auto"
      }}
    >
      <svg
        viewBox="-1.15 -1.15 2.3 2.3"
        overflow="visible"
        style={{ overflow: "visible", height: "100%", width: "100%" }}
        role="img"
        aria-label="Voice agent visualization"
      >
        <defs>
          <radialGradient id="sphere-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="1.05" fill="url(#sphere-glow)" />
        {basePoints.map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              circleRefs.current[i] = el;
            }}
            cx={0}
            cy={0}
            r={0.008}
            fill="#ffffff"
          />
        ))}
      </svg>
    </div>
  );

  return (
    <>
      {/* Layout placeholder - reserves the sphere's slot inside the card. */}
      <div ref={placeholderRef} className="h-full w-full" />
      {/* Portal - sphere SVG lives on document.body so it can blast freely. */}
      {mounted && typeof document !== "undefined"
        ? createPortal(overlay, document.body)
        : null}
    </>
  );
}

const USE_CASES = [
  { id: "receptionist", label: "Receptionist", agent: "Asha" },
  { id: "appointments", label: "Appointment Setter", agent: "Riya" },
  { id: "leads", label: "Lead Qualification", agent: "Kabir" },
  { id: "support", label: "Customer Service", agent: "Meera" },
  { id: "collections", label: "Debt Collection", agent: "Arjun" },
  { id: "survey", label: "Survey", agent: "Diya" }
] as const;

type UseCaseId = (typeof USE_CASES)[number]["id"];

export function AgentDemo() {
  const [useCase, setUseCase] = useState<UseCaseId>("receptionist");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const active = USE_CASES.find((u) => u.id === useCase) ?? USE_CASES[0];

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="agent-demo" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        {/* Eyebrow + headline - single editorial line */}
        <div className="mb-12 flex items-baseline justify-between border-b border-white/10 pb-6">
 <p className="font-sans text-[11px] tracking-[0.04em] text-white/45">
            [01] &nbsp; Live Demo
          </p>
 <p className="hidden font-sans text-[11px] tracking-[0.04em] text-white/45 md:block">
            India · 22 languages
          </p>
        </div>

        <div className="mb-14 max-w-2xl">
          <h2 className="font-sans text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-white">
            Hear it before you build it.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-white/60">
            Pick a use case, drop your number. Our agent calls you in under a minute.
          </p>
        </div>

        {/* Two panels - square, single hairline divider */}
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] md:grid-cols-[1fr_1.05fr]">
          {/* LEFT - dotted sphere panel */}
          <div className="relative flex min-h-[520px] flex-col overflow-hidden border-b border-white/10 px-6 py-7 md:border-b-0 md:border-r md:px-9 md:py-9">
            {/* Ambient glow - soft coral/violet wash behind the sphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 58%, rgba(247,126,92,0.10), transparent 70%), radial-gradient(ellipse 50% 50% at 30% 30%, rgba(114,87,199,0.08), transparent 65%)"
              }}
            />

            {/* Card header - Hooman mark + caps label */}
            <div className="relative flex items-center gap-2 text-white/85">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-white">
                <HoomanMark size={11} />
              </span>
              <span className="text-[13px] font-medium tracking-tight">
                Live agent
              </span>
            </div>

            {/* Bold headline + small caption - tracks the selected agent */}
            <h3 className="relative mt-4 max-w-xs text-[20px] font-semibold leading-[1.25] tracking-tight text-white md:text-[22px]">
              Hear how {active.agent} handles a real conversation.
            </h3>
            <p className="relative mt-3 text-[13px] text-white/45">
              Customer voices, 22 languages, sub-second latency.
            </p>

            {/* Dotted sphere - fills the remaining card space */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-6 flex flex-1 items-center justify-center"
            >
              <div className="aspect-square w-[260px] md:w-[320px]">
                <DottedSphere />
              </div>
            </motion.div>

            {/* Footer caption - reacts to selected chip, with live equalizer */}
            <div className="relative mt-6 flex items-center justify-between">
 <div className="flex items-center gap-2.5 font-sans text-[11px] tracking-[0.04em] text-white/55">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {active.agent} · {active.label}
              </div>
              {/* Live equalizer - signals the agent is "speaking" */}
              <div
                aria-hidden
                className="flex items-end gap-[3px]"
                style={{ height: 14 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-[2.5px] rounded-full bg-emerald-400/70 motion-reduce:!animate-none"
                    style={{
                      height: "100%",
                      transformOrigin: "bottom",
                      animation: `eq 1s ease-in-out ${i * 0.13}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - focused form, Gilroy medium */}
          <form
            className="flex flex-col font-gilroy font-medium"
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line no-console
              console.log({ useCase, name, phone });
            }}
          >
            <div className="flex-1 px-6 py-10 md:px-12 md:py-12">
              {/* Use case - custom dropdown with visible options panel */}
              <div ref={dropdownRef} className="relative">
 <label className="block font-sans text-[10px] tracking-[0.04em] text-white/45">
                  01 · Use case
                </label>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  className="mt-2 flex w-full items-center justify-between border-b border-white/15 bg-transparent py-2.5 text-left font-gilroy text-[15px] font-medium text-white outline-none transition-colors hover:border-white/30"
                >
                  <span className="flex items-center gap-2">
                    {active.label}
                    <span className="font-mono text-[11px] tracking-wide text-white/40">
                      / {active.agent}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={
                      "text-white/55 transition-transform duration-200 " +
                      (open ? "rotate-180" : "")
                    }
                  />
                </button>

                {open ? (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]"
                  >
                    {USE_CASES.map((u) => {
                      const isActive = u.id === useCase;
                      return (
                        <li key={u.id} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onClick={() => {
                              setUseCase(u.id);
                              setOpen(false);
                            }}
                            className={
                              "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors " +
                              (isActive
                                ? "bg-white/[0.06] text-white"
                                : "text-white/75 hover:bg-white/[0.04] hover:text-white")
                            }
                          >
                            <span className="font-gilroy text-[14px] font-medium">
                              {u.label}
                            </span>
                            <span className="font-mono text-[11px] tracking-wide text-white/40">
                              {u.agent}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>

              {/* Name */}
              <div className="mt-9">
                <label
                  htmlFor="name"
 className="block font-sans text-[10px] tracking-[0.04em] text-white/45"
                >
                  02 · Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full border-b border-white/15 bg-transparent py-2.5 font-gilroy text-[15px] font-medium text-white placeholder:font-medium placeholder:text-white/30 outline-none transition-colors focus:border-white/50"
                />
              </div>

              {/* Phone - with India country-code prefix */}
              <div className="mt-7">
                <label
                  htmlFor="phone"
 className="block font-sans text-[10px] tracking-[0.04em] text-white/45"
                >
                  03 · Phone number
                </label>
                <div className="mt-2 flex items-center border-b border-white/15 transition-colors focus-within:border-white/50">
                  <span className="flex shrink-0 items-center gap-1.5 pr-3 font-gilroy text-[15px] font-medium text-white/45">
                    <span className="text-[13px]">🇮🇳</span> +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-transparent py-2.5 font-gilroy text-[15px] font-medium tabular-nums text-white placeholder:font-medium placeholder:text-white/30 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit row */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 md:px-12">
 <span className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.04em] text-white/40">
                <Check size={12} strokeWidth={2.5} className="text-emerald-400/70" />
                Free · No card
              </span>
              <button
                type="submit"
                className="group/cta inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-gilroy text-[13.5px] font-medium text-ink shadow-[0_8px_24px_-10px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.55)]"
              >
                Call me now
                <ArrowRight
                  size={14}
                  strokeWidth={2.25}
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
