import { cn } from "@/lib/cn";

interface WordmarkProps {
  className?: string;
  tone?: "light" | "dark";
  /** Visual size of the mark in px. The word scales with it. */
  size?: number;
}

export function Wordmark({ className, tone = "light", size = 22 }: WordmarkProps) {
  const color = tone === "dark" ? "text-mock-text" : "text-ink";
  // Original SVG is 86×95 → keep aspect ratio
  const w = Math.round((size * 86) / 95);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans font-semibold tracking-snug",
        color,
        className
      )}
      style={{ fontSize: `${Math.max(15, Math.round(size * 0.82))}px` }}
    >
      <svg
        width={w}
        height={size}
        viewBox="0 0 86 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={color}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
          fill="currentColor"
        />
      </svg>
      <span>HoomanLabs</span>
    </span>
  );
}
