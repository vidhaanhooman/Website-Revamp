"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md";
type Shape = "pill" | "rounded";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-10 px-5 text-[14.5px]"
};

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-soft active:bg-black border border-ink dark:bg-white dark:text-ink dark:border-white dark:hover:bg-dark-text",
  outline:
    "bg-white text-ink border border-hairline hover:border-ink/40 hover:bg-bg-soft dark:bg-dark-soft dark:text-dark-text dark:border-dark-edge dark:hover:bg-dark-edge dark:hover:border-dark-muted",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 border border-transparent dark:text-dark-text dark:hover:bg-white/5"
};

const shapes: Record<Shape, string> = {
  pill: "rounded-full",
  rounded: "rounded-xl2"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shape = "pill",
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center gap-2 font-medium transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizes[size],
          shapes[shape],
          variants[variant],
          className
        )}
        {...props}
      >
        {iconLeft ? <span className="-ml-0.5 flex">{iconLeft}</span> : null}
        <span>{children}</span>
        {iconRight ? <span className="-mr-0.5 flex">{iconRight}</span> : null}
      </button>
    );
  }
);

Button.displayName = "Button";
