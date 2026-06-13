import { AudioLines } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata = {
  title: "Agents - HoomanLabs",
  description:
    "Production-ready voice agents: receptionist, rescheduler, lead qualifier, support."
};

export default function AgentsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink dark:bg-dark dark:text-dark-text">
      <Navbar />
      <PagePlaceholder
        chipIcon={<AudioLines size={13} strokeWidth={1.75} />}
        chipLabel="Agents"
        title="One agent for every call your team can't keep up with."
        description="Receptionist, appointment rescheduler, billing, lead qualification - all in one workspace. The full agent catalogue is on its way."
      />
    </main>
  );
}
