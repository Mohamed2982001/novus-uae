"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import { BrandConfig } from "@/config/brand.config";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Audit logging in staging/production telemetry
    console.error("Critical Application Error:", error);
  }, [error]);

  const whatsappUrl = `https://wa.me/${BrandConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello Novus Team, I encountered a technical issue on the platform (Code: ${
      error.digest || "SYS_ERR"
    }).`
  )}`;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand-primary p-6">
      <div className="glass-card w-full max-w-lg rounded-3xl p-8 text-center shadow-gold-subtle sm:p-10">
        {/* Error Icon badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-error/30 bg-brand-error/10 text-brand-error">
          <AlertCircle className="h-8 w-8" />
        </div>

        <h1 className="mb-3 font-outfit text-2xl font-bold tracking-tight text-brand-text-primary sm:text-3xl">
          System Interruption
        </h1>
        <p className="mb-6 font-jakarta text-sm leading-relaxed text-brand-text-secondary sm:text-base">
          Our sovereign advisory services platform encountered an unexpected
          condition. Our engineering team has been notified.
        </p>

        {error.digest && (
          <div className="mb-8 rounded-xl border border-brand-glass-border bg-brand-elevated/50 px-4 py-2 font-mono text-xs text-brand-text-muted">
            Incident Reference: <span className="text-brand-gold">{error.digest}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3 font-outfit text-sm font-semibold text-brand-primary shadow-gold-subtle transition-all duration-200 hover:bg-brand-gold-hover hover:shadow-gold-glow active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Action
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-glass-border bg-brand-elevated px-6 py-3 font-outfit text-sm font-semibold text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            Support via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
