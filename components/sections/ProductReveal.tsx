"use client";

import { motion } from "framer-motion";
import {
  Languages,
  ShieldCheck,
  Cable,
  IndianRupee,
  Check,
  PhoneCall
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ---------- Card shell - subtle static coral tint, dual theme - */
function DarkCard({
  className,
  children,
  accentX = 78,
  accentY = 14
}: {
  className?: string;
  children: React.ReactNode;
  /** Static position of the soft accent gradient as 0..100 percent. */
  accentX?: number;
  accentY?: number;
}) {
  const accentLight = `radial-gradient(60% 50% at ${accentX}% ${accentY}%, rgba(255,128,140,0.12), rgba(255,168,148,0.06) 40%, transparent 75%)`;
  const counterLight = `radial-gradient(45% 45% at ${100 - accentX}% ${100 - accentY}%, rgba(255,200,170,0.10), transparent 70%)`;
  const accentDark = `radial-gradient(55% 55% at ${accentX}% ${accentY}%, rgba(255,90,106,0.30), transparent 70%)`;
  const counterDark = `radial-gradient(45% 50% at ${100 - accentX}% ${100 - accentY}%, rgba(255,154,106,0.18), transparent 70%)`;

  return (
    <div
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-[28px]",
        "border border-hairline bg-white shadow-[0_18px_48px_-24px_rgba(15,17,21,0.18)]",
        "dark:border-white/10 dark:bg-[#0A0810] dark:shadow-none",
        className
      )}
    >
      <div
        aria-hidden
        style={{ background: accentLight }}
        className="pointer-events-none absolute inset-0 dark:hidden"
      />
      <div
        aria-hidden
        style={{ background: accentDark }}
        className="pointer-events-none absolute inset-0 hidden dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100 [background-image:radial-gradient(rgb(15_17_21/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_120%_100%_at_50%_50%,black_60%,transparent_100%)] dark:opacity-60 dark:[background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        style={{ background: counterLight }}
        className="pointer-events-none absolute inset-0 dark:hidden"
      />
      <div
        aria-hidden
        style={{ background: counterDark }}
        className="pointer-events-none absolute inset-0 hidden dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent dark:via-white/15"
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full opacity-[0.05] mix-blend-overlay dark:block"
      >
        <filter id="card-bg-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.65 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#card-bg-grain)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[40%] bg-gradient-to-t from-black/55 to-transparent dark:block"
      />

      <div className="relative z-20 flex h-full flex-col">{children}</div>
    </div>
  );
}

function CardLabel({
  icon,
  title,
  body
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-2.5 text-ink dark:text-dark-text">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline bg-ink/[0.04] text-ink/85 dark:border-white/10 dark:bg-white/5 dark:text-white/85">
          {icon}
        </span>
        <h3 className="font-sans text-[18.5px] font-medium leading-none tracking-snug text-ink dark:text-dark-text">
          {title}
        </h3>
      </div>
      <p className="mt-3.5 text-[14px] leading-[1.6] text-ink/75 dark:text-white/85">
        {body}
      </p>
    </div>
  );
}

/* ---------- Visuals ----------------------------------------- */

function HindiSwitchMock() {
  return (
    <div className="relative h-full w-full">
      <div className="relative flex h-full flex-col justify-center gap-4 p-7 sm:p-9">
        {/* Row 1 - Patient pill + bubble */}
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#F0E0D2,#D9A984)] text-[11px] font-semibold text-ink shadow-[0_6px_14px_-8px_rgba(15,17,21,0.2)] dark:text-white"
          >
            PA
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-hairline bg-white px-2.5 py-0.5 text-[10.5px] font-medium text-ink shadow-[0_4px_10px_-6px_rgba(15,17,21,0.15)] dark:border-white/15 dark:bg-white/90 dark:text-ink">
              Patient
              <span className="font-mono text-[9px] text-ink/50">हिन्दी</span>
            </span>
            <div className="max-w-[280px] rounded-2xl rounded-tl-md border border-hairline bg-white px-3.5 py-2.5 text-[12.5px] leading-snug text-ink shadow-[0_10px_24px_-12px_rgba(15,17,21,0.12)] dark:border-white/15 dark:bg-black/55 dark:text-white dark:shadow-none">
              मेरा अपॉइंटमेंट गुरुवार से बदलना है, अगर हो सके to next Tuesday.
            </div>
          </div>
        </div>

        {/* Dashed connector */}
        <svg
          aria-hidden
          className="ml-[18px] h-3 w-[2px] self-start text-ink/25 dark:text-white/30"
          viewBox="0 0 2 12"
          preserveAspectRatio="none"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
        </svg>

        {/* Row 2 - Maya pill + bubble */}
        <div className="flex items-start justify-end gap-2.5">
          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center gap-1.5 self-end rounded-full bg-[#3B6BD8] px-2.5 py-0.5 text-[10.5px] font-medium text-white shadow-[0_6px_14px_-6px_rgba(59,107,216,0.55)]">
              Maya
              <span className="font-mono text-[9px] text-white/75">284ms</span>
            </span>
            <div className="max-w-[290px] rounded-2xl rounded-tr-md bg-[#3B6BD8] px-3.5 py-2.5 text-[12.5px] leading-snug text-white shadow-[0_14px_28px_-10px_rgba(59,107,216,0.45)]">
              ज़रूर - Tuesday 19th, 2:15 PM with Dr. Patel. Confirm karu?
            </div>
          </div>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3B6BD8,#1E3A8A)] text-[11px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(59,107,216,0.5)]"
          >
            M
          </span>
        </div>
      </div>
    </div>
  );
}

function HoomanLogoMark({ size = 36 }: { size?: number }) {
  // 86×95 viewBox preserved
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

function TelephonyMock() {
  const partners: { name: string; src?: string }[] = [
    { name: "Plivo", src: "/Brand/Plivo.svg" },
    { name: "Exotel", src: "/Brand/exotel-seeklogo.svg" },
    { name: "Tata Tele" },
    { name: "Twilio", src: "/Brand/twilio-icon.svg" }
  ];
  return (
    <div className="relative h-full w-full">
      {/* warm halo behind the hub - only in dark */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[radial-gradient(closest-side_at_50%_38%,rgba(255,154,106,0.32),transparent_60%)] dark:block"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-5 px-5 py-5">
        {/* Featured HoomanLabs hub pill */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(247,126,92,0.22),transparent_70%)] blur-md dark:bg-[radial-gradient(closest-side,#F77E5C66,transparent_70%)]"
          />
          <div className="relative inline-flex items-center gap-2 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_14px_30px_-12px_rgba(15,17,21,0.18)] dark:border-white/20 dark:bg-white/[0.08] dark:shadow-[0_8px_24px_rgba(247,126,92,0.25)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white dark:bg-white dark:text-ink">
              <HoomanLogoMark size={14} />
            </span>
            <span className="text-[11.5px] font-semibold text-ink dark:text-white">
              HoomanLabs Telephony
            </span>
          </div>
        </div>

        {/* Dashed flow: hub → 4 partner nodes via SVG connectors */}
        <div className="relative w-full max-w-[300px]">
          <svg
            aria-hidden
            viewBox="0 0 300 30"
            className="absolute inset-x-0 -top-1 h-7 w-full text-ink/30 dark:text-white/35"
            preserveAspectRatio="none"
          >
            {/* center anchor */}
            <line x1="150" y1="0" x2="150" y2="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
            {/* horizontal bus */}
            <line x1="32" y1="6" x2="268" y2="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
            {/* drops to each tile (4 columns) */}
            <line x1="32" y1="6" x2="32" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
            <line x1="111" y1="6" x2="111" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
            <line x1="189" y1="6" x2="189" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
            <line x1="268" y1="6" x2="268" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
          </svg>

          {/* Partner pills */}
          <div className="mt-6 grid grid-cols-4 gap-1.5">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex h-[36px] items-center justify-center rounded-xl border border-hairline bg-white shadow-[0_6px_14px_-8px_rgba(15,17,21,0.14)] dark:border-white/15 dark:bg-black/40 dark:shadow-none dark:backdrop-blur-md"
                title={p.name}
              >
                {p.src ? (
                  <picture>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.name}
                      className="h-3.5 w-auto object-contain partner-logo"
                    />
                  </picture>
                ) : (
                  <span className="font-sans text-[9px] font-semibold tracking-tight text-ink dark:text-white">
                    TATA
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .partner-logo {
          filter: none;
        }
        :global(.dark) .partner-logo {
          filter: brightness(0) invert(1);
        }
      `}</style>
    </div>
  );
}

function ComplianceMock() {
  const items: { label: string; icon: React.ReactNode }[] = [
    { label: "DPDP", icon: <ShieldCheck size={13} strokeWidth={1.75} /> },
    { label: "HIPAA-ready", icon: <ShieldCheck size={13} strokeWidth={1.75} /> },
    { label: "PHI redaction", icon: <ShieldCheck size={13} strokeWidth={1.75} /> }
  ];
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[radial-gradient(closest-side_at_50%_45%,rgba(122,225,164,0.18),transparent_70%)] dark:block"
      />
      <div className="relative flex h-full items-center justify-center p-4">
        <div className="relative grid w-full max-w-[300px] gap-1.5">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={cn(
                "relative flex items-center justify-between rounded-xl border border-hairline bg-white px-3 py-2",
                "shadow-[0_8px_18px_-12px_rgba(15,17,21,0.14)]",
                "dark:border-white/15 dark:bg-black/45 dark:shadow-none dark:backdrop-blur-md"
              )}
              style={{ zIndex: items.length - i }}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/[0.06] text-ink dark:bg-white/8 dark:text-white">
                  {it.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-[11.5px] font-medium leading-tight text-ink dark:text-white">
                    {it.label}
                  </span>
                  <span className="font-mono text-[9px] leading-tight text-ink/55 dark:text-white/55">
                    {i === 0
                      ? "audit-2025-07"
                      : i === 1
                        ? "BAA on file"
                        : "auto-redact · live"}
                  </span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-700 dark:border-white/15 dark:bg-black/70 dark:text-[#7AE1A4]">
                <Check size={8} strokeWidth={3} />
                live
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ----------------------------------------- */
export function ProductReveal() {
  return (
    <section className="relative overflow-hidden bg-bg py-20 dark:bg-dark md:py-28">
      {/* Ambient gradients - warm on the upper-left, cool on the lower-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_18%_22%,rgba(247,126,92,0.10),transparent_70%),radial-gradient(40%_40%_at_82%_78%,rgba(122,140,255,0.08),transparent_70%)] dark:bg-[radial-gradient(45%_35%_at_18%_22%,rgba(247,126,92,0.18),transparent_70%),radial-gradient(40%_40%_at_82%_78%,rgba(122,140,255,0.14),transparent_70%)]"
      />
      {/* Dot grid (same recipe as ProductShowcase for cohesion) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(rgb(15_17_21/0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,black,transparent_80%)] dark:[background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)]"
      />

      <div className="relative">
      <div className="container">
        {/* Section heading */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16"
        >
          <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-ink dark:text-dark-text">
            Why <span className="italic">India</span> teams pick HoomanLabs.
          </h2>
        </motion.header>

        {/* Top wide card - text left, visual right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <DarkCard className="min-h-[300px]" accentX={75} accentY={18}>
            <div className="grid items-stretch md:grid-cols-[1.1fr_1fr]">
              <div className="flex items-center p-8 md:p-10">
                <CardLabel
                  icon={<Languages size={14} strokeWidth={1.75} />}
                  title="Speaks 11 Indian languages - mid-sentence."
                  body={
                    <>
                      Hindi, Tamil, Telugu, Marathi, Bengali, Kannada,
                      Gujarati, Malayalam, Punjabi, Urdu, and English -
                      code-switched in the same call. Patients keep talking the
                      way they actually talk.
                    </>
                  }
                />
              </div>
              <div className="min-h-[300px] md:min-h-0">
                <HindiSwitchMock />
              </div>
            </div>
          </DarkCard>
        </motion.div>

        {/* 2-up grid - Raycast pattern: visual on top, label below */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <DarkCard accentX={50} accentY={15}>
              <div className="h-[180px] shrink-0">
                <TelephonyMock />
              </div>
              <div className="px-8 pb-7 pt-2">
                <CardLabel
                  icon={<Cable size={14} strokeWidth={1.75} />}
                  title="Use HoomanLabs Telephony."
                  body={
                    <>
                      Numbers, SIP routing, and DID pools managed for you on
                      day one - or plug in your existing Plivo, Exotel, Tata
                      Tele, or Twilio line if you&rsquo;d rather keep it.
                    </>
                  }
                />
              </div>
            </DarkCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <DarkCard accentX={78} accentY={20}>
              <div className="h-[180px] shrink-0">
                <ComplianceMock />
              </div>
              <div className="px-8 pb-7 pt-2">
                <CardLabel
                  icon={<ShieldCheck size={14} strokeWidth={1.75} />}
                  title="DPDP-ready, audit-trailed."
                  body={
                    <>
                      PHI redaction on every transcript, per-call audit
                      trail, and DPDP-aligned consent flow - exportable in a
                      format your security team can actually read.
                    </>
                  }
                />
              </div>
            </DarkCard>
          </motion.div>
        </div>

        {/* Affordance row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink dark:border-dark-edge dark:bg-dark-soft dark:text-dark-text">
            <IndianRupee size={12} strokeWidth={2} />
            From ₹0.40 / min
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink dark:border-dark-edge dark:bg-dark-soft dark:text-dark-text">
            <PhoneCall size={12} strokeWidth={2} />
            Live in &lt;24 hours
          </span>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
