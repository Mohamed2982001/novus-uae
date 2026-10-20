import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
}

export function Skeleton({
  className,
  variant = "rectangular",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangular: "rounded-xl",
    circular: "rounded-full",
    text: "rounded-md h-4 w-full",
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "skeleton-shimmer bg-brand-elevated/70 border border-brand-glass-border/20",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
