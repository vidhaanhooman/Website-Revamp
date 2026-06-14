import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AgentDemo } from "@/components/sections/AgentDemo";
import { CallsCounter } from "@/components/sections/CallsCounter";
import { JourneyBento } from "@/components/sections/JourneyBento";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAndCall } from "@/components/sections/FaqAndCall";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <Hero />
      <AgentDemo />
      {/* Dark band - calls counter + features */}
      <div className="relative bg-dark text-dark-text">
        <CallsCounter />
        <JourneyBento />
      </div>
      <div className="relative bg-bg-warm text-ink">
        <Testimonials />
        <CtaBanner />
        <FaqAndCall />
      </div>
      <Footer />
    </main>
  );
}
