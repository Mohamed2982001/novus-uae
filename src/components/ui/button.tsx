import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "gold",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "start",
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Size styles enforcing >= 44px touch targets on md and lg per MDS rules
    const sizeStyles = {
      sm: "min-h-[38px] px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
      md: "min-h-[44px] px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "min-h-[50px] px-7 py-3 text-base rounded-2xl gap-2.5",
    };

    // Variant styles matching Luxury Dubai Executive aesthetic
    const variantStyles = {
      gold: "bg-brand-gold text-brand-primary font-semibold shadow-gold-subtle hover:bg-brand-gold-hover hover:shadow-[0_0_20px_rgba(197,160,89,0.35)] border border-transparent",
      outline:
        "border border-brand-glass-border bg-transparent text-brand-text-primary hover:border-brand-gold hover:text-brand-gold hover:bg-brand-elevated/30",
      ghost:
        "bg-transparent text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-elevated/40 border border-transparent",
      glass:
        "glass-card text-brand-text-primary hover:border-brand-gold hover:text-brand-gold shadow-gold-subtle hover:bg-brand-elevated/70",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          "relative inline-flex items-center justify-center font-outfit select-none font-medium tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary active:scale-[0.98]",
          sizeStyles[size],
          variantStyles[variant],
          isDisabled &&
            "opacity-50 cursor-not-allowed pointer-events-none active:scale-100",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current me-2" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "start" && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {icon}
              </span>
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === "end" && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
