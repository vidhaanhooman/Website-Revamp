import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FeatureBento } from "@/components/sections/FeatureBento";

export const metadata: Metadata = {
  title: "Features — HoomanLabs",
  description:
    "Voice studio, live call console, real-time transcripts, telephony, audit trails. Everything you need to ship a voice agent that picks up."
};

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-dark text-dark-text">
      <Navbar />
      <FeatureBento />
      <Footer />
    </main>
  );
}
