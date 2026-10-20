import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      options,
      placeholder,
      id,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label
            htmlFor={selectId}
            className="block font-jakarta text-xs font-semibold tracking-wide text-brand-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            className={cn(
              "flex h-11 min-h-[44px] w-full appearance-none rounded-xl border bg-brand-elevated/80 px-4 pe-11 py-2 text-base font-jakarta text-brand-text-primary transition-all duration-200 outline-none cursor-pointer",
              "focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40 focus:bg-brand-elevated",
              hasError
                ? "border-brand-error focus:border-brand-error focus:ring-brand-error/30"
                : "border-brand-glass-border hover:border-brand-gold/50",
              disabled && "opacity-50 cursor-not-allowed bg-brand-elevated/40",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-brand-elevated text-brand-text-muted">
                {placeholder}
              </option>
            )}

            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-brand-elevated text-brand-text-primary py-1"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="pointer-events-none absolute end-3.5 flex items-center justify-center text-brand-text-muted">
            {hasError ? (
              <AlertCircle className="h-4 w-4 text-brand-error" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>

        {hasError ? (
          <p
            id={`${selectId}-error`}
            role="alert"
            className="flex items-center gap-1 font-jakarta text-xs text-brand-error animate-in fade-in"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${selectId}-helper`}
            className="font-jakarta text-xs text-brand-text-muted"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
