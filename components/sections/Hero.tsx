"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ImageCard } from "@/components/ui/ImageCard";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { heroContent } from "@/content/hero";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

export function Hero() {
  const c = heroContent;
  const cardRef = useRef<HTMLDivElement | null>(null);

  /**
   * Drives two CSS custom properties on the card:
   *   --mx, --my  → -1 .. 1 normalised mouse position from card centre
   * The translate/scale lives in CSS so we get GPU-accelerated motion
   * without re-rendering. Disabled under prefers-reduced-motion.
   */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let raf: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      // simple eased follow — 8% per frame
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.setProperty("--mx", curX.toFixed(3));
      el.style.setProperty("--my", curY.toFixed(3));
      frame += 1;
      el.style.setProperty("--t", (frame / 60).toFixed(2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative px-3 pt-24 sm:px-4 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1240px]"
      >
        <div ref={cardRef} className="hero-card">
          <ImageCard radius="2xl">
            <div className="aspect-[16/10] w-full sm:aspect-[16/9] md:aspect-[16/8.5]">
              {/* Aurora background, parallax-shifted by mouse */}
              <div className="hero-parallax absolute inset-0">
                <PhotoPlaceholder
                  src={c.photo.src}
                  alt={c.photo.alt}
                  caption={c.photo.caption}
                  tone="aurora"
                  grain={false}
                />
              </div>

              {/* Drifting magenta blob */}
              <div
                aria-hidden
                className="hero-blob hero-blob--a pointer-events-none absolute h-[55%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(255,120,180,0.55),transparent_70%)] mix-blend-screen blur-2xl"
              />
              {/* Drifting violet blob */}
              <div
                aria-hidden
                className="hero-blob hero-blob--b pointer-events-none absolute h-[60%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(155,110,240,0.5),transparent_70%)] mix-blend-screen blur-2xl"
              />

              {/* Cursor spotlight — only visible when mouse is on card */}
              <div
                aria-hidden
                className="hero-spotlight pointer-events-none absolute inset-0"
              />
            </div>

            {/* Dim radial wash for text legibility */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_0%,rgba(15,13,18,0.25)_75%,rgba(15,13,18,0.45)_100%)]"
            />

            {/* Centered content stack */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
              <motion.h1
                {...fadeUp(0.05)}
                className="max-w-4xl font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-tight text-white"
              >
                {c.headline}
              </motion.h1>

              <motion.p
                {...fadeUp(0.15)}
                className="mt-7 max-w-xl text-[15.5px] leading-[1.55] text-white/90 sm:text-[16px]"
              >
                {c.description}
              </motion.p>

              <motion.div
                {...fadeUp(0.25)}
                className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
              >
                <a href={c.primary.href}>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-ink-soft">
                    {c.primary.label}
                    <ArrowRight size={14} strokeWidth={2.25} />
                  </button>
                </a>
                <a href={c.secondary.href}>
                  <button className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-ink">
                      <Play size={8} fill="currentColor" />
                    </span>
                    {c.secondary.label}
                  </button>
                </a>
              </motion.div>
            </div>
          </ImageCard>
        </div>
      </motion.div>

      <style jsx>{`
        .hero-card {
          --mx: 0;
          --my: 0;
          --t: 0;
        }
        .hero-parallax {
          transform: translate3d(
              calc(var(--mx) * -14px),
              calc(var(--my) * -14px),
              0
            )
            scale(1.06);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .hero-blob {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: blob-drift 18s ease-in-out infinite;
        }
        .hero-blob--a {
          top: 30%;
          left: 28%;
          animation-delay: 0s;
        }
        .hero-blob--b {
          top: 60%;
          left: 70%;
          animation-delay: -9s;
          animation-duration: 22s;
        }
        @keyframes blob-drift {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          25% {
            transform: translate(-40%, -55%) scale(1.08);
          }
          50% {
            transform: translate(-55%, -45%) scale(0.94);
          }
          75% {
            transform: translate(-48%, -52%) scale(1.04);
          }
        }
        .hero-spotlight {
          background: radial-gradient(
            260px 260px at calc(50% + var(--mx) * 50%) calc(50% + var(--my) * 50%),
            rgba(255, 255, 255, 0.18),
            transparent 70%
          );
          opacity: calc(min(1, abs(var(--mx) + var(--my)) * 0.6 + 0.3));
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-parallax {
            transform: scale(1.02);
          }
          .hero-blob {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
