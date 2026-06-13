import { RetroHero } from "@/components/sections/RetroHero";

export const metadata = {
  title: "Retro Landing Preview - HoomanLabs",
  description:
    "Retro 90s landing - IE6 chrome, chunky orange type, retro phone hero."
};

export default function RetroPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <RetroHero />
    </main>
  );
}
