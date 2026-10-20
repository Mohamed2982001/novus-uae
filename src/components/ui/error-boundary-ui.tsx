import * as React from "react";
import { AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandConfig } from "@/config/brand.config";
import { cn } from "@/lib/utils";

export interface ErrorBoundaryUIProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showWhatsAppFallback?: boolean;
  className?: string;
  incidentRef?: string;
}

export function ErrorBoundaryUI({
  title = "Service Interruption",
  message = "An unexpected condition occurred while processing this request. Our engineering advisory team has been alerted.",
  onRetry,
  showWhatsAppFallback = true,
  className,
  incidentRef,
}: ErrorBoundaryUIProps) {
  const whatsappUrl = `https://wa.me/${BrandConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hello Novus Team, I encountered a technical issue on the executive portal: "${title}" (Ref: ${
      incidentRef || "SYS_ERR"
    }).`
  )}`;

  return (
    <div
      role="alert"
      className={cn(
        "glass-card mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-3xl p-8 sm:p-10 text-center shadow-gold-subtle",
        className
      )}
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-error/30 bg-brand-error/10 text-brand-error">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h3 className="mb-2 font-outfit text-xl font-bold tracking-tight text-brand-text-primary sm:text-2xl">
        {title}
      </h3>

      <p className="mb-6 font-jakarta text-sm leading-relaxed text-brand-text-secondary">
        {message}
      </p>

      {incidentRef && (
        <div className="mb-6 rounded-xl border border-brand-glass-border bg-brand-elevated/60 px-4 py-2 font-mono text-xs text-brand-text-muted">
          Incident Ref: <span className="text-brand-gold">{incidentRef}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center">
        {onRetry && (
          <Button
            variant="gold"
            size="md"
            onClick={onRetry}
            icon={<RefreshCw className="h-4 w-4" />}
          >
            Retry Action
          </Button>
        )}

        {showWhatsAppFallback && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-brand-glass-border bg-brand-elevated px-5 py-2.5 font-outfit text-sm font-semibold text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-elevated/80 active:scale-95 w-full sm:w-auto"
          >
            <MessageSquare className="h-4 w-4" />
            Support via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
