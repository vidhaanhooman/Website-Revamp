import { LayoutDashboard } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata = {
  title: "Dashboard - HoomanLabs"
};

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <PagePlaceholder
        chipIcon={<LayoutDashboard size={13} strokeWidth={1.75} />}
        chipLabel="Dashboard"
        title="Sign in to your dashboard."
        description="The production dashboard lives behind auth. We'll wire the sign-in flow next - for now this is a placeholder route."
        ctaLabel="Sign In"
        ctaHref="/signup"
      />
    </main>
  );
}
