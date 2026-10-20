import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-jakarta text-xs font-semibold tracking-wide text-brand-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <div className="pointer-events-none absolute start-3.5 flex items-center justify-center text-brand-text-muted">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "flex h-11 min-h-[44px] w-full rounded-xl border bg-brand-elevated/80 px-4 py-2 text-base font-jakarta text-brand-text-primary placeholder:text-brand-text-muted/60 transition-all duration-200 outline-none",
              "focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40 focus:bg-brand-elevated",
              startIcon && "ps-11",
              endIcon && "pe-11",
              hasError
                ? "border-brand-error focus:border-brand-error focus:ring-brand-error/30"
                : "border-brand-glass-border hover:border-brand-gold/50",
              disabled && "opacity-50 cursor-not-allowed bg-brand-elevated/40",
              className
            )}
            {...props}
          />

          {endIcon && !hasError && (
            <div className="pointer-events-none absolute end-3.5 flex items-center justify-center text-brand-text-muted">
              {endIcon}
            </div>
          )}

          {hasError && (
            <div className="pointer-events-none absolute end-3.5 flex items-center justify-center text-brand-error">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-1 font-jakarta text-xs text-brand-error animate-in fade-in"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="font-jakarta text-xs text-brand-text-muted"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
