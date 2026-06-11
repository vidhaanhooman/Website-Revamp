import { Navbar } from "@/components/sections/Navbar";
import { PricingHero } from "@/components/sections/PricingHero";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { PricingSocial } from "@/components/sections/PricingSocial";
import { FaqAndCall } from "@/components/sections/FaqAndCall";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Pricing — HoomanLabs",
  description:
    "Usage-based pricing for AI voice agents. Start at ₹7,999 / month, scale per call volume, contact us for enterprise."
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <PricingHero />
      <PricingPlans />
      <PricingSocial />
      <FaqAndCall />
      <Footer />
    </main>
  );
}
