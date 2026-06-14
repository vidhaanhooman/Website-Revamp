"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const TESTIMONIALS = [
  {
    quote:
      "Working with HoomanLabs was a game-changer. The voice felt natural, our patients couldn't tell, and we cut after-hours staffing entirely in week one.",
    author: "Priya Narayanan",
    role: "Ops Lead, Brightside Dental"
  },
  {
    quote:
      "We were live in three days. The agent picked up Hindi, English, and Hinglish without us touching a single prompt.",
    author: "Marcus Lobo",
    role: "Founder, Apex Home Services"
  },
  {
    quote:
      "Compliance review was the easiest part. BAA day one, audit trail per call, DPDP covered.",
    author: "Dr. Lena Fernandes",
    role: "Clinical Director, Brookside Care"
  }
];

function GoogleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.96 1.6-3.13 1.5-.15-1.13.41-2.32 1.07-3.06.74-.84 2.02-1.46 3.24-1.52zM21.05 17.66c-.51 1.17-.75 1.69-1.41 2.72-.91 1.45-2.2 3.25-3.79 3.27-1.42.02-1.79-.93-3.72-.92-1.93.01-2.33.94-3.75.92-1.59-.02-2.81-1.65-3.72-3.1-2.55-4.05-2.82-8.81-1.25-11.34 1.12-1.8 2.88-2.85 4.54-2.85 1.69 0 2.75.92 4.15.92 1.35 0 2.18-.92 4.13-.92 1.48 0 3.04.81 4.16 2.2-3.65 2-3.06 7.2-.34 9.1z" />
    </svg>
  );
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close login dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[1040px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0d] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
        >
          <X size={15} strokeWidth={2.25} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* ─── LEFT — sign-in form ────────────────────────── */}
          <div className="flex flex-col justify-center px-7 py-12 md:px-12 md:py-14">
            <div className="mx-auto w-full max-w-sm">
              <h2
                id="login-title"
                className="text-center font-serif text-[26px] font-normal leading-[1.15] tracking-tight text-white md:text-[28px]"
              >
                Welcome to HoomanLabs.
              </h2>
              <p className="mt-2 text-center text-[13px] leading-[1.55] text-white/55">
                Please enter your details to sign in to the platform.
              </p>

              {/* OAuth buttons */}
              <div className="mt-8 space-y-2.5">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/[0.05] py-2.5 font-sans text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.09]"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/[0.05] py-2.5 font-sans text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.09]"
                >
                  <AppleIcon />
                  Continue with Apple
                </button>
              </div>

              {/* Divider */}
 <div className="my-6 flex items-center gap-3 font-sans text-[11px] tracking-[0.04em] text-white/35">
                <span className="h-px flex-1 bg-white/10" />
                Or sign in with
                <span className="h-px flex-1 bg-white/10" />
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  /* hook up auth here */
                }}
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="block font-sans text-[12px] font-medium text-white/80"
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-sans text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="login-password"
                    className="block font-sans text-[12px] font-medium text-white/80"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="minimum 8 characters"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 pr-10 font-sans text-[13.5px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-white py-2.5 font-sans text-[13.5px] font-semibold text-ink transition-colors hover:bg-white/85"
                >
                  Sign In
                </button>

                <div className="mt-3 text-center">
                  <a
                    href="#"
                    className="font-sans text-[12px] text-white/55 transition-colors hover:text-white"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* ─── RIGHT — image + testimonial (desktop only) ─── */}
          <div className="relative hidden min-h-[560px] overflow-hidden md:block">
            {/* Background image */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/Login.png')" }}
            />
            {/* Soft scrim to keep the testimonial readable */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.85) 100%)"
              }}
            />

            {/* HoomanLabs wordmark — sits above the mountain in the sky area */}
            <div className="absolute left-1/2 top-[22%] z-10 -translate-x-1/2 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
              <Wordmark tone="dark" size={34} />
            </div>

            {/* Pagination dots */}
            <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={
                    "h-1.5 rounded-full transition-all " +
                    (i === testimonialIdx
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/60")
                  }
                />
              ))}
            </div>

            {/* Quote + author + arrows */}
            <div className="absolute inset-x-8 bottom-8 flex flex-col gap-5 text-white">
              <p className="font-sans text-[15.5px] font-medium leading-[1.45] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-sans text-[14px] font-semibold text-white">
                    {t.author}
                  </div>
                  <div className="font-sans text-[12.5px] text-white/70">
                    {t.role}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setTestimonialIdx((i) =>
                        i === 0 ? TESTIMONIALS.length - 1 : i - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                  >
                    <ArrowLeft size={14} strokeWidth={2.25} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() =>
                      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                  >
                    <ArrowRight size={14} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
