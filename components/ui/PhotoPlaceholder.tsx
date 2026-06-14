import { cn } from "@/lib/cn";
import { ImageIcon } from "lucide-react";
import type { CSSProperties } from "react";

type Tone =
  | "peach"
  | "blush"
  | "ember"
  | "cream"
  | "rose"
  | "dark"
  | "care"
  | "flow"
  | "reach"
  | "aurora";

interface PhotoPlaceholderProps {
  /** Hex/url of a real image to render; when present, overrides the gradient. */
  src?: string;
  /** Alt text - required for accessibility when src is set. */
  alt?: string;
  /** Filename hint shown in the corner so we know what to drop in. */
  caption?: string;
  tone?: Tone;
  className?: string;
  /** When true, render a grain overlay for a film-photo feel. */
  grain?: boolean;
  /** Aspect ratio (Tailwind aspect-*). Defaults handled by parent. */
  aspect?: string;
  style?: CSSProperties;
}

const gradients: Record<Tone, string> = {
  peach:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FCE5C5_0%,#F4B189_45%,#C46B4A_100%)]",
  blush:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FCD4D0_0%,#F09A9C_55%,#B43D58_100%)]",
  ember:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FBB283_0%,#EB5C45_50%,#8E1E2C_100%)]",
  cream:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FBF1DE_0%,#E8D2AE_55%,#A78859_100%)]",
  rose:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FBD4DF_0%,#E58FA8_50%,#923957_100%)]",
  dark:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#3A323F_0%,#1C1820_55%,#08070C_100%)]",
  care:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#CDEBC2_0%,#7BCB87_55%,#2D5F3A_100%)]",
  flow:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FBD4DF_0%,#F08FB1_55%,#7B294C_100%)]",
  reach:
    "bg-[radial-gradient(120%_80%_at_30%_20%,#FBE0BB_0%,#F4A85E_55%,#7A4316_100%)]",
  aurora: "bg-grad-aurora"
};

export function PhotoPlaceholder({
  src,
  alt = "",
  caption,
  tone = "peach",
  className,
  grain = true,
  aspect,
  style
}: PhotoPlaceholderProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", aspect, className)}
        style={style}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full items-end overflow-hidden",
        gradients[tone],
        aspect,
        className
      )}
      style={style}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      {/* Subtle highlight for shape */}
      <div className="pointer-events-none absolute -top-1/3 left-1/4 h-3/4 w-3/4 rounded-full bg-white/20 blur-3xl" />

      {/* Grain */}
      {grain ? (
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.08] mix-blend-overlay"
          aria-hidden
        >
          <filter id="ph-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ph-grain)" />
        </svg>
      ) : null}

      {caption ? (
 <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 font-sans text-[10px] tracking-[0.04em] text-white/90 backdrop-blur-sm">
          <ImageIcon size={11} strokeWidth={1.75} />
          {caption}
        </span>
      ) : null}
    </div>
  );
}
