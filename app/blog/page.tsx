import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata = {
  title: "Blog — HoomanLabs",
  description:
    "Field notes from building voice agents for healthcare and service teams."
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <PagePlaceholder
        chipIcon={<Newspaper size={13} strokeWidth={1.75} />}
        chipLabel="Blog"
        title="Field notes from shipping voice agents."
        description="Engineering deep-dives, customer stories, and the small decisions that compound into a real product. First posts go up shortly."
      />
    </main>
  );
}
