import { Navbar } from "@/components/sections/Navbar";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { FaqAndCall } from "@/components/sections/FaqAndCall";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Pricing — HoomanLabs",
  description:
    "Usage-based pricing for AI voice agents. Launch from ₹3.50/min, Grow at ₹2.50/min with QA + simulation, Scale on volume contracts."
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-dark text-dark-text">
      <Navbar />
      <PricingTiers />
      <FaqAndCall />
      <Footer />
    </main>
  );
}
