import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogIndex } from "@/components/sections/BlogIndex";

export const metadata = {
  title: "Blog — HoomanLabs",
  description:
    "Field notes from building voice agents in India — customer stories, engineering deep-dives, and product updates."
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <BlogIndex />
      <Footer />
    </main>
  );
}
