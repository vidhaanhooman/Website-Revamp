/** Editorial chapter marker - placed between sections to give the page rhythm. */
export function SectionLabel({
  number,
  name,
  tone = "dark"
}: {
  number: string;
  name: string;
  tone?: "dark" | "light";
}) {
  const colors =
    tone === "light"
      ? "border-black/10 text-black/55"
      : "border-white/10 text-white/55";
  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-14 md:pt-20">
      <div
        className={
          "flex items-baseline justify-between gap-4 border-t pt-5 " + colors
        }
      >
 <span className="font-sans text-[11px] font-medium tracking-[0.04em]">
          [{number}] &nbsp; {name}
        </span>
 <span className="font-sans text-[11px] font-medium tracking-[0.04em]">
          HoomanLabs
        </span>
      </div>
    </div>
  );
}
