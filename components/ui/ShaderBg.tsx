"use client";

import dynamic from "next/dynamic";
import type { ComponentType, PropsWithChildren } from "react";

/**
 * Lazy-loaded shader-gradient surface (Three.js under the hood, ~400kB).
 * Loaded client-side only — the Canvas needs the DOM.
 *
 * The package's TS declarations are missing several runtime-supported
 * props (axesHelper, envPreset, lightType, etc.), so we cast the lazy
 * components to a permissive prop type before using them.
 */
// next.config.mjs aliases @shadergradient/react to its dist entry,
// so the resolver bypass happens once for both imports here.
const ShaderGradientCanvasRaw = dynamic(
  () =>
    import("@shadergradient/react").then((m) => ({
      default: m.ShaderGradientCanvas
    })),
  { ssr: false }
);

const ShaderGradientRaw = dynamic(
  () =>
    import("@shadergradient/react").then((m) => ({
      default: m.ShaderGradient
    })),
  { ssr: false }
);

const ShaderGradientCanvas = ShaderGradientCanvasRaw as ComponentType<
  PropsWithChildren<Record<string, unknown>>
>;
const ShaderGradient = ShaderGradientRaw as ComponentType<
  Record<string, unknown>
>;

export interface ShaderBgPreset {
  color1: string;
  color2: string;
  color3: string;
  cAzimuthAngle?: number;
  cPolarAngle?: number;
  cDistance?: number;
  uDensity?: number;
  uStrength?: number;
  uSpeed?: number;
  positionY?: number;
  positionZ?: number;
  rotationX?: number;
  brightness?: number;
}

/** Preset matching the README spec. */
export const PEACH_PRESET: ShaderBgPreset = {
  color1: "#ffdb63",
  color2: "#fcfffa",
  color3: "#ff9f38",
  cAzimuthAngle: 170,
  cPolarAngle: 70,
  cDistance: 4.41,
  uDensity: 1.2,
  uStrength: 3.4,
  uSpeed: 0.2,
  positionY: 0.9,
  positionZ: -0.3,
  rotationX: 45,
  brightness: 1.2
};

/** Cool variant for the Enterprise card. */
export const BLUE_PRESET: ShaderBgPreset = {
  color1: "#7AB6F0",
  color2: "#fcfffa",
  color3: "#3B6BD8",
  cAzimuthAngle: 220,
  cPolarAngle: 70,
  cDistance: 4.41,
  uDensity: 1.2,
  uStrength: 3.4,
  uSpeed: 0.2,
  positionY: 0.9,
  positionZ: -0.3,
  rotationX: 45,
  brightness: 1.1
};

/* ---------- Categories cards — saturated, painterly --------- */

/** Coral / orange — Bring Your Own Telephony */
export const CORAL_PRESET: ShaderBgPreset = {
  color1: "#FF6B3A",
  color2: "#E73779",
  color3: "#FFB28A",
  cAzimuthAngle: 180,
  cPolarAngle: 80,
  cDistance: 3.8,
  uDensity: 1.4,
  uStrength: 4.0,
  uSpeed: 0.25,
  positionY: 0.6,
  positionZ: -0.1,
  rotationX: 50,
  brightness: 1.15
};

/** Hot pink / magenta — Self Evaluations */
export const PINK_PRESET: ShaderBgPreset = {
  color1: "#E73779",
  color2: "#B23BD0",
  color3: "#FF6B9E",
  cAzimuthAngle: 145,
  cPolarAngle: 75,
  cDistance: 3.8,
  uDensity: 1.4,
  uStrength: 3.8,
  uSpeed: 0.22,
  positionY: 0.7,
  positionZ: -0.2,
  rotationX: 48,
  brightness: 1.1
};

/** Violet / lavender — Lowest Latency */
export const VIOLET_PRESET: ShaderBgPreset = {
  color1: "#9B89D8",
  color2: "#7B5AE0",
  color3: "#C2A8FF",
  cAzimuthAngle: 200,
  cPolarAngle: 72,
  cDistance: 3.9,
  uDensity: 1.3,
  uStrength: 3.6,
  uSpeed: 0.2,
  positionY: 0.75,
  positionZ: -0.25,
  rotationX: 46,
  brightness: 1.15
};

export function ShaderBg({
  preset,
  className,
  animate = true
}: {
  preset: ShaderBgPreset;
  className?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={"pointer-events-none absolute inset-0 " + (className ?? "")}
      aria-hidden
    >
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <ShaderGradient
          animate={animate ? "on" : "off"}
          axesHelper="off"
          brightness={preset.brightness ?? 1.2}
          cAzimuthAngle={preset.cAzimuthAngle ?? 170}
          cDistance={preset.cDistance ?? 4.41}
          cPolarAngle={preset.cPolarAngle ?? 70}
          cameraZoom={1}
          color1={preset.color1}
          color2={preset.color2}
          color3={preset.color3}
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={preset.positionY ?? 0.9}
          positionZ={preset.positionZ ?? -0.3}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={preset.rotationX ?? 45}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={preset.uDensity ?? 1.2}
          uFrequency={0}
          uSpeed={preset.uSpeed ?? 0.2}
          uStrength={preset.uStrength ?? 3.4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
