import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
  Manrope
} from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
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

// Manrope as a Gilroy-Medium substitute — closest free Google Fonts geometric
// humanist sans. Swap to a local Gilroy via @next/font/local if you license it.
const gilroy = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gilroy",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HoomanLabs — One platform for all your voice agents",
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
      // Dark theme is the default — every dark: Tailwind variant fires.
      className={`dark ${sans.variable} ${mono.variable} ${serif.variable} ${gilroy.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-dark text-dark-text">{children}</body>
    </html>
  );
}
