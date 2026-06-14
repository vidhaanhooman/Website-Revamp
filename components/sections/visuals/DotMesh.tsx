"use client";

import { useEffect, useRef } from "react";

/* Animated dot-grid mesh. A field of faint dots; a handful of "active"
   coral nodes pulse and link to their nearest neighbours with short
   fading lines - like calls connecting across a network. Canvas-based,
   DPR-aware, pauses when off-screen / reduced-motion. */
export function DotMesh({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GAP = 34; // grid spacing
    const DOT = 1.1; // base dot radius
    const CORAL = "247,126,92";

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;

    // Active "pulses" travelling the grid - each lights a node + links.
    type Pulse = { col: number; row: number; t: number; life: number };
    let pulses: Pulse[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    }

    // Deterministic-ish pseudo-random so SSR/CSR don't fight; seeded by index.
    let seed = 1;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    function spawnPulse() {
      pulses.push({
        col: Math.floor(rand() * cols),
        row: Math.floor(rand() * rows),
        t: 0,
        life: 90 + Math.floor(rand() * 90)
      });
    }

    function nodeXY(col: number, row: number) {
      return { x: col * GAP, y: row * GAP };
    }

    let frame = 0;
    let raf = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Base dot field
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const { x, y } = nodeXY(c, r);
          ctx.beginPath();
          ctx.arc(x, y, DOT, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          ctx.fill();
        }
      }

      // Maintain pulse population
      if (!reduce) {
        if (frame % 14 === 0 && pulses.length < 10) spawnPulse();
      } else if (pulses.length === 0) {
        // static: a few fixed lit nodes
        for (let i = 0; i < 6; i++) spawnPulse();
        pulses.forEach((p) => (p.t = p.life * 0.5));
      }

      // Draw pulses + links to neighbours
      pulses.forEach((p) => {
        const prog = p.t / p.life; // 0..1
        const ease = Math.sin(prog * Math.PI); // up then down
        const { x, y } = nodeXY(p.col, p.row);

        // Links to the 4 orthogonal neighbours
        const neighbours = [
          [p.col + 1, p.row],
          [p.col - 1, p.row],
          [p.col, p.row + 1],
          [p.col, p.row - 1]
        ];
        neighbours.forEach(([nc, nr]) => {
          if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return;
          const n = nodeXY(nc, nr);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `rgba(${CORAL},${0.16 * ease})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          // lit neighbour dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, DOT + 0.6 * ease, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CORAL},${0.35 * ease})`;
          ctx.fill();
        });

        // Glow + core of the active node
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 14 * ease + 2);
        glow.addColorStop(0, `rgba(${CORAL},${0.45 * ease})`);
        glow.addColorStop(1, `rgba(${CORAL},0)`);
        ctx.beginPath();
        ctx.arc(x, y, 14 * ease + 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, DOT + 1.4 * ease, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CORAL},${0.5 + 0.5 * ease})`;
        ctx.fill();

        if (!reduce) p.t += 1;
      });

      pulses = pulses.filter((p) => p.t < p.life);

      frame++;
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduce) draw();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
    />
  );
}
