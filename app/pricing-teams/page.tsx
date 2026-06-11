import { Navbar } from "@/components/sections/Navbar";
import { PricingTeams } from "@/components/sections/PricingTeams";
import { FaqAndCall } from "@/components/sections/FaqAndCall";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Pricing for teams — HoomanLabs",
  description:
    "Solo, Practice, and Team plans for HoomanLabs voice agents. Free to try."
};

export default function PricingTeamsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F5DDD0] text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <PricingTeams />
      <FaqAndCall />
      <Footer />
    </main>
  );
}
