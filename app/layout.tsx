import type { Metadata } from "next";
import {
  Inter,
  DM_Sans,
  JetBrains_Mono,
  Instrument_Serif,
  Fraunces,
  Manrope,
  Anton,
  VT323
} from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

// DM Sans - geometric low-contrast sans, used for the hero display headline.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

// Fraunces - premium variable soft-serif display. Optical sizing + a touch
// of contrast give headlines an editorial, luxe feel.
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap"
});

// Manrope as a Gilroy-Medium substitute - closest free Google Fonts geometric
// humanist sans. Swap to a local Gilroy via @next/font/local if you license it.
const gilroy = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gilroy",
  display: "swap"
});

// Anton - condensed bold display sans, used for retro 90s headlines.
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap"
});

// VT323 - pixel-mono terminal font, used for retro subtitles + chrome.
const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HoomanLabs - One platform for all your voice agents",
  description:
    "Build, test, deploy, and monitor production-grade AI voice agents. Orchestration, real-time monitoring, and enterprise-grade configurability for healthcare and service businesses.",
  metadataBase: new URL("https://hoomanlabs.ai"),
  openGraph: {
    title: "HoomanLabs",
    description:
      "One platform for all your voice agents. Build, test, deploy, monitor.",
    type: "website",
    url: "https://hoomanlabs.ai"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Dark theme is the default - every dark: Tailwind variant fires.
      className={`dark ${sans.variable} ${dmSans.variable} ${mono.variable} ${serif.variable} ${display.variable} ${gilroy.variable} ${anton.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-dark text-dark-text">{children}</body>
    </html>
  );
}
