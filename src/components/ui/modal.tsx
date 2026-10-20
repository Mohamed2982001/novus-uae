"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: ModalProps) {
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

  // Lock body scroll when modal is open
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
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-brand-primary/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Dialog Card */}
      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-3xl border border-brand-glass-border bg-brand-secondary/95 p-6 sm:p-8 text-start text-brand-text-primary shadow-gold-subtle backdrop-blur-xl transition-all duration-300 animate-in zoom-in-95 fade-in",
          sizeClasses[size],
          className
        )}
      >
        {/* Close Button with >= 44x44px touch target */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 end-5 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border/40 bg-brand-elevated/60 text-brand-text-muted transition-all duration-200 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-elevated active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>

        {title && (
          <div className="mb-4 pe-10">
            <h2
              id="modal-title"
              className="font-outfit text-xl font-bold tracking-tight text-brand-text-primary sm:text-2xl"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="mt-1 font-jakarta text-sm leading-relaxed text-brand-text-secondary"
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
