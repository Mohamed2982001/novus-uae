import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-jakarta text-xs font-semibold tracking-wide text-brand-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${textareaId}-error`
                : helperText
                ? `${textareaId}-helper`
                : undefined
            }
            className={cn(
              "flex min-h-[100px] w-full rounded-xl border bg-brand-elevated/80 p-3.5 text-base font-jakarta text-brand-text-primary placeholder:text-brand-text-muted/60 transition-all duration-200 outline-none resize-y",
              "focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40 focus:bg-brand-elevated",
              hasError
                ? "border-brand-error focus:border-brand-error focus:ring-brand-error/30 pe-10"
                : "border-brand-glass-border hover:border-brand-gold/50",
              disabled && "opacity-50 cursor-not-allowed bg-brand-elevated/40",
              className
            )}
            {...props}
          />

          {hasError && (
            <div className="pointer-events-none absolute top-3.5 end-3.5 flex items-center justify-center text-brand-error">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={`${textareaId}-error`}
            role="alert"
            className="flex items-center gap-1 font-jakarta text-xs text-brand-error animate-in fade-in"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${textareaId}-helper`}
            className="font-jakarta text-xs text-brand-text-muted"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
