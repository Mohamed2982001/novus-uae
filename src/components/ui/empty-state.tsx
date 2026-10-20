import * as React from "react";
import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "glass-card flex flex-col items-center justify-center rounded-3xl p-8 sm:p-12 text-center",
        className
      )}
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-glass-border bg-brand-elevated text-brand-gold shadow-gold-subtle">
        {icon || <FolderSearch className="h-8 w-8" />}
      </div>

      <h3 className="mb-2 font-outfit text-xl font-bold tracking-tight text-brand-text-primary sm:text-2xl">
        {title}
      </h3>

      <p className="mb-6 max-w-md font-jakarta text-sm leading-relaxed text-brand-text-secondary">
        {description}
      </p>

      {action && <div className="inline-flex items-center justify-center">{action}</div>}
    </div>
  );
}
