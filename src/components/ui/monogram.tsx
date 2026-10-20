import * as React from "react";
import Link from "next/link";
import { BrandConfig } from "@/config/brand.config";
import { cn } from "@/lib/utils";

export interface MonogramProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

export function Monogram({
  size = "md",
  showText = true,
  href,
  className,
  ...props
}: MonogramProps) {
  const sizeMap = {
    sm: { box: "h-8 w-8", svg: 32, fontTitle: "text-lg", fontSub: "text-[9px]" },
    md: { box: "h-11 w-11", svg: 44, fontTitle: "text-xl", fontSub: "text-[10px]" },
    lg: { box: "h-14 w-14", svg: 56, fontTitle: "text-2xl", fontSub: "text-xs" },
  };

  const current = sizeMap[size];

  const content = (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
      {...props}
    >
      {/* Geometric Luxury "N" Monogram */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-xl border border-brand-glass-border/60 bg-brand-elevated/90 shadow-gold-subtle backdrop-blur-md transition-all duration-300 group-hover:border-brand-gold group-hover:shadow-gold-glow",
          current.box
        )}
      >
        <svg
          width={current.svg * 0.72}
          height={current.svg * 0.72}
          viewBox="0 0 316 308"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Official Novus Ring */}
          <path
            d="M 219.30 90.92 C 197.43 68.45 165.22 61.80 137.19 77.49 C 96.26 100.40 90.94 158.19 126.96 188.48 C 172.27 226.59 239.06 189.56 235.40 132.14 C 235.15 128.23 232.52 120.68 234.01 117.47 L 273.76 81.44 C 280.39 92.02 285.05 104.97 287.22 117.27 C 307.51 232.09 156.01 299.40 79.54 212.21 C 8.00 130.63 79.32 8.00 182.68 17.17 L 219.30 90.92 Z"
            fill="var(--brand-text-primary, #f4eee3)"
            fillRule="evenodd"
          />
          {/* Official Novus Gold Diamond */}
          <path
            d="M 243.92 80.49 L 241.98 79.91 L 210.78 16.08 C 236.14 15.40 263.18 19.08 282.35 36.90 L 243.92 80.49 Z"
            fill="var(--brand-accent-gold, #b6965e)"
            fillRule="evenodd"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-start leading-tight">
          <span
            className={cn(
              "font-outfit font-extrabold uppercase tracking-widest text-brand-text-primary transition-colors duration-200 group-hover:text-brand-gold",
              current.fontTitle
            )}
          >
            {BrandConfig.name}
          </span>
          <span
            className={cn(
              "font-mono uppercase tracking-wider text-brand-gold/90 font-medium hidden sm:inline-block",
              current.fontSub
            )}
          >
            UAE Govt &amp; Business Setup
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
