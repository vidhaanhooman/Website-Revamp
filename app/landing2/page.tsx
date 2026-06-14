import type { Metadata } from "next";
import { L2Banner } from "@/components/sections/Landing2/L2Banner";
import { L2Navbar } from "@/components/sections/Landing2/L2Navbar";
import { L2Hero } from "@/components/sections/Landing2/L2Hero";
import { L2Journey } from "@/components/sections/Landing2/L2Journey";
import { L2Footer } from "@/components/sections/Landing2/L2Footer";

export const metadata: Metadata = {
  title: "HoomanLabs - The voice operating system for India",
  description:
    "Build, simulate, deploy, and observe AI voice agents in 22 languages. Trusted by 1,200+ teams across India."
};

export default function Landing2Page() {
  return (
    <main className="bg-[#F4EDDF] text-[#1B1209]">
      <L2Banner />
      <L2Navbar />
      <L2Hero />
      <L2Journey />
      <L2Footer />
    </main>
  );
}
