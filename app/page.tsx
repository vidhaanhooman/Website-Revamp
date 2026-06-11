import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CustomerCarousel } from "@/components/sections/CustomerCarousel";
import { Categories } from "@/components/sections/Categories";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAndCall } from "@/components/sections/FaqAndCall";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <Hero />
      <CustomerCarousel />
      <Categories />
      <ProductReveal />
      <ProductShowcase />
      <Testimonials />
      <CtaBanner />
      <FaqAndCall />
      <Footer />
    </main>
  );
}
