"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: DrawerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ESC key handler
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
  };

  const drawerContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
      aria-describedby={description ? "drawer-description" : undefined}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-brand-primary/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-over panel positioned at `end-0` for automatic RTL support */}
      <div className="fixed inset-y-0 end-0 flex max-w-full">
        <div
          className={cn(
            "relative flex w-screen flex-col overflow-y-auto border-s border-brand-glass-border bg-brand-secondary/95 p-6 sm:p-8 text-start text-brand-text-primary shadow-2xl backdrop-blur-2xl transition-all duration-300 animate-in slide-in-from-right rtl:slide-in-from-left",
            sizeClasses[size],
            className
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-brand-glass-border/30 pb-5">
            <div className="pe-4">
              {title && (
                <h2
                  id="drawer-title"
                  className="font-outfit text-xl font-bold tracking-tight text-brand-text-primary"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="drawer-description"
                  className="mt-1 font-jakarta text-sm leading-relaxed text-brand-text-secondary"
                >
                  {description}
                </p>
              )}
            </div>

            {/* Close Button with >= 44x44px touch target */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close drawer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-glass-border/40 bg-brand-elevated/60 text-brand-text-muted transition-all duration-200 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-elevated active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="relative flex-1 py-6">{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
