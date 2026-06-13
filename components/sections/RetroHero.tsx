"use client";

/* ───────────────────────────────────────────────────────────────
   Retro hero - uses the prebuilt PNGs in /public/retro/:
     Win.png       - IE6 / Win95 browser chrome
     BG.png        - sky + clouds backdrop
     Phone.png     - orange handset, right side
     Button.png    - CONNECT NOW pixel button
     Features.png  - bottom 4-feature pill row

   All positions are percentage-based so the composition scales
   with viewport. Tweak any `style={{ inset, top, left }}` to nudge.
   ─────────────────────────────────────────────────────────────── */
export function RetroHero() {
  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ background: "#1F1F23" }}
    >
      <div className="relative mx-auto w-full max-w-[1380px]">
        {/* Browser chrome frame */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/retro/Win.png"
          alt=""
          className="block w-full"
          draggable={false}
        />

        {/*
          The chrome PNG has a content slot somewhere in the middle.
          These percentages frame that slot - adjust if the chrome
          PNG dimensions change. They assume:
            top    ≈ 14% (below title bar / menu / toolbar / address)
            bottom ≈  4% (above status bar)
            left/right ≈ 1%
        */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "14%",
            left: "1%",
            right: "1%",
            bottom: "4%"
          }}
        >
          {/* Sky backdrop */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/retro/BG.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* Orange handset on the right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/retro/Phone.png"
            alt=""
            className="pointer-events-none absolute right-0 top-0 h-full object-contain object-right"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))"
            }}
            draggable={false}
          />

          {/* CTA button (clickable) - overlay on top of BG */}
          <a
            href="/#agent-demo"
            className="absolute z-10 inline-block transition-transform hover:translate-y-[2px]"
            style={{
              left: "4%",
              bottom: "22%",
              width: "32%"
            }}
            aria-label="Connect now"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/retro/Button.png"
              alt="Connect now"
              className="block w-full"
              draggable={false}
            />
          </a>

          {/* Bottom feature row */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/retro/Features.png"
            alt=""
            className="absolute z-10"
            style={{
              left: "4%",
              bottom: "5%",
              width: "55%"
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
