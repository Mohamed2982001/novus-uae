"use client";

import * as React from "react";
import {
  Building2,
  Briefcase,
  Award,
  Languages,
  ShieldAlert,
  FileCheck2,
  Landmark,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { ServiceItem } from "@/data/services.data";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Briefcase,
  Award,
  Languages,
  ShieldAlert,
  FileCheck2,
  Landmark,
};

export function ServiceCard({ service, onSelect, className }: ServiceCardProps) {
  const { locale, t } = useLanguage();
  const IconComponent = ICON_MAP[service.icon] || Building2;
  const isFeatured = Boolean(service.featured);
  const isAr = locale === "ar";

  const deliverables = isAr ? service.deliverablesAr : service.deliverablesEn;
  const title = isAr ? service.titleAr : service.titleEn;
  const subtitle = isAr ? service.titleEn : service.titleAr;
  const shortDesc = isAr ? service.shortDescAr : service.shortDescEn;

  return (
    <div
      onClick={() => onSelect(service)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(service);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-b from-brand-secondary/90 via-brand-elevated/70 to-brand-primary/95 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 cursor-pointer text-start select-none outline-none",
        "hover:-translate-y-2 hover:border-brand-gold/70 hover:shadow-[0_22px_55px_-12px_rgba(182,150,94,0.22)]",
        "focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary",
        isFeatured
          ? "lg:col-span-2 border-brand-gold/50 bg-gradient-to-br from-brand-secondary via-brand-elevated/80 to-brand-primary shadow-gold-subtle"
          : "border-brand-glass-border/50",
        className
      )}
    >
      {/* Top Animated Golden Shimmer Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transition-all duration-700 group-hover:via-brand-gold group-hover:h-[3px]" />

      {/* Ambient Radial Glow on Hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-24 -end-24 h-56 w-56 rounded-full blur-3xl transition-opacity duration-700",
          isFeatured
            ? "opacity-25 group-hover:opacity-60 bg-brand-gold"
            : "opacity-0 group-hover:opacity-30 bg-brand-gold"
        )}
      />

      {/* Top Header Row: Icon Insignia & Timeline Pill */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Sovereign Crest Icon */}
            <div className="relative flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-gold/40 bg-gradient-to-br from-brand-primary via-brand-elevated to-brand-secondary text-brand-gold shadow-gold-subtle transition-all duration-500 group-hover:scale-110 group-hover:border-brand-gold group-hover:shadow-gold-glow">
              <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:rotate-3" />
              <div className="absolute inset-0 rounded-2xl bg-brand-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {isFeatured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-brand-gold shadow-gold-subtle">
                <Sparkles className="h-3 w-3 animate-pulse" />
                {isAr ? "ركيزة استراتيجية مميزة" : "Featured Strategic Pillar"}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-glass-border/50 bg-brand-primary/70 px-3 py-1 font-mono text-xs text-brand-text-muted backdrop-blur-md transition-colors duration-300 group-hover:border-brand-gold/40 group-hover:text-brand-text-secondary">
            <Clock className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
            <span>{service.timeline}</span>
          </div>
        </div>

        {/* Title & Description (Zero Ellipsis, Natural Wrapping) */}
        <h3 className="font-outfit text-xl font-bold tracking-tight text-brand-text-primary transition-colors duration-300 group-hover:text-brand-gold sm:text-2xl">
          {title}
        </h3>

        <div
          className="mt-1 font-tajawal text-xs font-semibold text-brand-gold/80 tracking-wide"
          dir={isAr ? "ltr" : "rtl"}
        >
          {subtitle}
        </div>

        <p className="mt-4 font-jakarta text-sm leading-relaxed text-brand-text-secondary sm:text-base">
          {shortDesc}
        </p>

        {/* Deliverables Preview Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {deliverables.slice(0, isFeatured ? 4 : 2).map((item, idx) => (
            <span
              key={idx}
              className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-brand-glass-border/50 bg-brand-elevated/40 px-3 py-1.5 text-xs font-jakarta text-brand-text-secondary transition-all duration-300 group-hover:border-brand-gold/30 group-hover:bg-brand-elevated/70 group-hover:text-brand-text-primary break-words whitespace-normal text-start leading-normal"
            >
              <span className="text-brand-gold/80 text-[10px]">◆</span>
              <span>{item}</span>
            </span>
          ))}
          {deliverables.length > (isFeatured ? 4 : 2) && (
            <span className="inline-flex items-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-2.5 py-1 text-xs font-mono font-semibold text-brand-gold">
              +{deliverables.length - (isFeatured ? 4 : 2)} {isAr ? "المزيد" : "More"}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-brand-glass-border/40 pt-5 transition-colors duration-300 group-hover:border-brand-gold/30">
        <div className="font-mono text-xs text-brand-text-muted">
          {isAr ? "الجهة المختصة:" : "Regulatory Liaison:"}{" "}
          <span className="font-semibold text-brand-text-secondary group-hover:text-brand-gold transition-colors duration-200">
            {service.authorities[0]}
          </span>
        </div>

        {/* Interactive Action Capsule */}
        <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-brand-glass-border/40 bg-brand-elevated/40 px-4 py-2 font-outfit text-sm font-semibold text-brand-gold transition-all duration-300 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-primary group-hover:shadow-gold-glow">
          <span>{t("services.viewScope")}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </div>
  );
}
