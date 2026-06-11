"use client";

interface DotsFieldProps {
  rows?: number;
  cols?: number;
  dot?: number;
  gap?: number;
  className?: string;
  /** Color of the dots. Pale gold by default. */
  color?: string;
}

/**
 * Grid of LED-style dots whose brightness falls off radially from the
 * centre of the field — mirrors the circular halo in the Luminous Labs CTA.
 */
export function DotsField({
  rows = 12,
  cols = 16,
  dot = 6,
  gap = 14,
  color = "#FFE7C7",
  className
}: DotsFieldProps) {
  const w = cols * (dot + gap);
  const h = rows * (dot + gap);
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height="100%"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const dx = c - cx;
          const dy = r - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = 1 - Math.min(1, dist / maxDist);
          // Higher floor + steeper curve so the center reads as a bright halo
          const opacity = 0.12 + Math.pow(t, 1.4) * 0.88;
          const x = c * (dot + gap) + dot / 2 + gap / 2;
          const y = r * (dot + gap) + dot / 2 + gap / 2;
          const delay = ((r * cols + c) % 14) * 0.18;
          return (
            <circle
              key={`${r}-${c}`}
              cx={x}
              cy={y}
              r={dot / 2}
              fill={color}
              opacity={opacity}
              style={{ animationDelay: `${delay}s` }}
              className="animate-dot-pulse motion-reduce:animate-none"
            />
          );
        })
      )}
    </svg>
  );
}
