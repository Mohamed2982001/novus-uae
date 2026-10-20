"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // duration in ms (default 2000)
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  sublabel,
  icon,
  className,
  ...props
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Viewport IntersectionObserver with fallback
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Eased counting animation via requestAnimationFrame
  React.useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out cubic curve: 1 - pow(1 - x, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    const frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted, value, duration]);

  // Format with thousand separators
  const formattedCount = count.toLocaleString();

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card glass-card-hover group relative flex flex-col justify-between rounded-2xl p-6 text-start transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-glass-border/40 bg-brand-elevated/70 text-brand-gold transition-colors duration-300 group-hover:border-brand-gold group-hover:bg-brand-elevated">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="font-mono text-3xl font-extrabold tracking-tight text-brand-gold tabular-nums sm:text-4xl">
          <span>{prefix}</span>
          <span>{formattedCount}</span>
          <span>{suffix}</span>
        </div>

        <div className="mt-2 font-outfit text-sm font-semibold text-brand-text-primary">
          {label}
        </div>

        {sublabel && (
          <div className="mt-1 font-jakarta text-xs text-brand-text-secondary leading-relaxed">
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
