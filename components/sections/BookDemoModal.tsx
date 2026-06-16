"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Video,
  X
} from "lucide-react";
interface BookDemoModalProps {
  open: boolean;
  onClose: () => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SLOTS_24 = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30"
];

const USE_CASES = [
  "Receptionist",
  "Appointment setter",
  "Lead qualification",
  "Customer support",
  "Debt collection",
  "Surveys",
  "Other"
];

/* ─── helpers ───────────────────────────────────────────── */

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function sameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function format12(t: string) {
  const [h, m] = t.split(":").map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  const suffix = h >= 12 ? "pm" : "am";
  return `${hour}:${m.toString().padStart(2, "0")}${suffix}`;
}

/* ─── component ─────────────────────────────────────────── */

export function BookDemoModal({ open, onClose }: BookDemoModalProps) {
  const [today, setToday] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [hour12, setHour12] = useState(true);
  const [step, setStep] = useState<"calendar" | "details">("calendar");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState<string>("");

  // Init clock-dependent state on mount
  useEffect(() => {
    if (!open) return;
    const now = new Date();
    setToday(now);
    if (!selectedDate) setSelectedDate(now);
    if (!viewMonth) setViewMonth({ year: now.getFullYear(), month: now.getMonth() });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const grid = useMemo(
    () => (viewMonth ? buildMonthGrid(viewMonth.year, viewMonth.month) : []),
    [viewMonth]
  );

  if (!open) return null;

  const goPrevMonth = () => {
    if (!viewMonth) return;
    const d = new Date(viewMonth.year, viewMonth.month - 1, 1);
    setViewMonth({ year: d.getFullYear(), month: d.getMonth() });
  };
  const goNextMonth = () => {
    if (!viewMonth) return;
    const d = new Date(viewMonth.year, viewMonth.month + 1, 1);
    setViewMonth({ year: d.getFullYear(), month: d.getMonth() });
  };

  const isPast = (d: Date) => {
    if (!today) return false;
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d.getTime() < t.getTime();
  };

  const slotLabel = (t: string) => (hour12 ? format12(t) : t);

  const dateHeader = selectedDate
    ? `${DAY_HEADERS[selectedDate.getDay()]} ${selectedDate.getDate()}`
    : "Select a date";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close demo dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[1180px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0d] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
        >
          <X size={15} strokeWidth={2.25} />
        </button>

        {step === "calendar" ? (
          <div className="grid md:grid-cols-[260px_1fr_280px]">
            {/* ─── LEFT - host info ─────────────────────────────── */}
            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r md:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink">
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 86 95"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
                  />
                </svg>
              </div>
 <p className="mt-5 font-sans text-[11px] font-medium tracking-[0.04em] text-white/45">
                HoomanLabs
              </p>
              <h2
                id="demo-title"
                className="mt-2 font-dmsans text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-white"
              >
                Product Demo
              </h2>

              <ul className="mt-7 space-y-3 font-sans text-[13px] text-white/75">
                <li className="flex items-center gap-2.5">
                  <CheckSquare size={14} className="text-white/45" />
                  Requires confirmation
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock size={14} className="text-white/45" />
                  25 minutes
                </li>
                <li className="flex items-center gap-2.5">
                  <Video size={14} className="text-white/45" />
                  Google Meet
                </li>
                <li className="flex items-center gap-2.5">
                  <Globe size={14} className="text-white/45" />
                  Asia / Kolkata
                </li>
              </ul>

              <p className="mt-7 font-sans text-[12.5px] leading-[1.55] text-white/55">
                A 25-minute walkthrough of HoomanLabs - we&apos;ll route a
                live call to one of your numbers and you&apos;ll hear the
                agent in your own language.
              </p>
            </div>

            {/* ─── MIDDLE - calendar ─────────────────────────────── */}
            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r md:p-8">
              <div className="flex items-center justify-between">
                <div className="font-sans">
                  <span className="text-[18px] font-semibold text-white">
                    {viewMonth ? MONTHS[viewMonth.month] : ""}
                  </span>{" "}
                  <span className="text-[16px] tabular-nums text-white/45">
                    {viewMonth?.year}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={goPrevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={goNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="mt-5 grid grid-cols-7 gap-1.5">
                {DAY_HEADERS.map((d) => (
                  <div
                    key={d}
 className="py-1 text-center font-sans text-[10px] font-medium tracking-[0.04em] text-white/40"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="mt-1 grid grid-cols-7 gap-1.5">
                {grid.map((d, i) => {
                  if (d === null || !viewMonth) {
                    return <div key={`empty-${i}`} className="aspect-square" />;
                  }
                  const date = new Date(viewMonth.year, viewMonth.month, d);
                  const isSelected = sameDay(date, selectedDate);
                  const isToday = sameDay(date, today);
                  const past = isPast(date);

                  return (
                    <button
                      type="button"
                      key={`d-${d}`}
                      disabled={past}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      className={
                        "relative flex aspect-square items-center justify-center rounded-md font-sans text-[13.5px] font-medium tabular-nums transition-colors " +
                        (past
                          ? "cursor-not-allowed text-white/20"
                          : isSelected
                            ? "bg-white text-ink shadow-[0_4px_18px_-6px_rgba(255,255,255,0.45)]"
                            : "bg-white/[0.04] text-white hover:bg-white/[0.09]")
                      }
                    >
                      {d}
                      {isToday && !isSelected ? (
                        <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-white/70" />
                      ) : null}
                      {isSelected ? (
                        <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-ink" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT - time slots ────────────────────────────── */}
            <div className="p-7 md:p-8">
              {/* pr-12 leaves clearance for the absolute-positioned close
                  button so the 12h/24h toggle doesn't sit underneath it */}
              <div className="flex items-center justify-between pr-12">
                <span className="font-sans text-[15px] font-semibold tracking-tight text-white">
                  {dateHeader}
                </span>
                <div className="flex items-center rounded-md border border-white/10 bg-white/[0.04] p-0.5 font-sans text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setHour12(true)}
                    className={
                      "rounded px-2 py-1 transition-colors " +
                      (hour12 ? "bg-white text-ink" : "text-white/65")
                    }
                  >
                    12h
                  </button>
                  <button
                    type="button"
                    onClick={() => setHour12(false)}
                    className={
                      "rounded px-2 py-1 transition-colors " +
                      (!hour12 ? "bg-white text-ink" : "text-white/65")
                    }
                  >
                    24h
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-1.5">
                {SLOTS_24.map((s) => {
                  const active = selectedTime === s;
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedTime(s)}
                      className={
                        "flex items-center justify-center rounded-md border py-2.5 font-sans text-[13.5px] font-medium tabular-nums transition-colors " +
                        (active
                          ? "border-white bg-white/[0.06] text-white"
                          : "border-white/10 bg-white/[0.025] text-white/80 hover:border-white/25 hover:bg-white/[0.05] hover:text-white")
                      }
                    >
                      {slotLabel(s)}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!selectedTime || !selectedDate}
                onClick={() => setStep("details")}
                className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 font-sans text-[13.5px] font-semibold text-ink transition-colors hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-ink/40"
              >
                Continue
                <ArrowRight size={14} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        ) : (
          /* ─── DETAILS STEP ─────────────────────────────────── */
          <div className="grid md:grid-cols-[1fr_300px]">
            <div className="p-7 md:p-10">
              <button
                type="button"
                onClick={() => setStep("calendar")}
 className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-medium tracking-[0.04em] text-white/55 transition-colors hover:text-white"
              >
                <ArrowLeft size={13} strokeWidth={2.25} />
                Back to time
              </button>

              <h3 className="mt-5 font-dmsans text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Your details
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-white/55">
                We&apos;ll send a Google Meet invite once we confirm.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // hook the booking API here
                }}
                className="mt-7 space-y-3.5"
              >
                <div>
                  <label
                    htmlFor="demo-name"
                    className="block font-sans text-[12px] font-medium text-white/80"
                  >
                    Full name
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="Priya Narayanan"
                    required
                    className="mt-1.5 w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 font-sans text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.09]"
                  />
                </div>

                <div className="grid gap-3.5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="demo-email"
                      className="block font-sans text-[12px] font-medium text-white/80"
                    >
                      Work email
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="priya@company.com"
                      required
                      className="mt-1.5 w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 font-sans text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.09]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="demo-company"
                      className="block font-sans text-[12px] font-medium text-white/80"
                    >
                      Company
                    </label>
                    <input
                      id="demo-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      placeholder="Brightside Dental"
                      required
                      className="mt-1.5 w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 font-sans text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.09]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[12px] font-medium text-white/80">
                    Use case
                  </label>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {USE_CASES.map((u) => {
                      const active = useCase === u;
                      return (
                        <button
                          type="button"
                          key={u}
                          onClick={() => setUseCase(u)}
                          aria-pressed={active}
                          className={
                            "rounded-full px-3 py-1.5 font-sans text-[11.5px] font-medium transition-colors " +
                            (active
                              ? "bg-white text-ink"
                              : "bg-white/[0.05] text-white/75 hover:bg-white/[0.09]")
                          }
                        >
                          {u}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 font-sans text-[13.5px] font-semibold text-ink transition-colors hover:bg-white/85"
                >
                  Confirm booking
                  <ArrowRight size={14} strokeWidth={2.25} />
                </button>

                <p className="text-center font-sans text-[11px] text-white/40">
                  Free 25-minute walkthrough. No card required.
                </p>
              </form>
            </div>

            {/* Booking summary side panel */}
            <aside className="border-t border-white/10 bg-white/[0.02] p-7 md:border-l md:border-t-0 md:p-8">
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/45">
                Booking summary
              </p>
              <div className="mt-4 space-y-3">
                <div>
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/40">
                    Event
                  </p>
                  <p className="mt-1 font-sans text-[13.5px] font-semibold text-white">
                    HoomanLabs Product Demo
                  </p>
                </div>
                <div>
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/40">
                    Date
                  </p>
                  <p className="mt-1 font-sans text-[13.5px] text-white">
                    {selectedDate
                      ? `${DAY_HEADERS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                      : "-"}
                  </p>
                </div>
                <div>
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/40">
                    Time
                  </p>
                  <p className="mt-1 font-sans text-[13.5px] tabular-nums text-white">
                    {selectedTime
                      ? `${hour12 ? format12(selectedTime) : selectedTime} - Asia / Kolkata`
                      : "-"}
                  </p>
                </div>
                <div>
 <p className="font-sans text-[11px] font-medium tracking-[0.04em] text-white/40">
                    Where
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-sans text-[13.5px] text-white">
                    <Video size={13} className="text-white/55" />
                    Google Meet
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
