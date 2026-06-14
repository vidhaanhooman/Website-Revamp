import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Journey } from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "How it works - HoomanLabs",
  description:
    "Build, ship, improve - the 11-step journey from a single prompt to a million calls. The live agent keeps answering while you test the next version."
};

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-dark text-dark-text">
      <Navbar />
      <Journey />
      <Footer />
    </main>
  );
}
