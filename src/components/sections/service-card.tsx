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
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-brand-secondary/60 p-5 sm:p-8 backdrop-blur-md transition-all duration-300 cursor-pointer text-start select-none outline-none",
        "hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_12px_35px_rgba(10,17,40,0.6)]",
        "focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary",
        isFeatured
          ? "lg:col-span-2 border-brand-gold/40 bg-gradient-to-br from-brand-secondary/80 via-brand-elevated/50 to-brand-secondary/90 shadow-gold-subtle"
          : "border-brand-glass-border/40",
        className
      )}
    >
      {/* Background Subtle Accent Glow for Featured Cards */}
      {isFeatured && (
        <div
          className="pointer-events-none absolute -top-24 -end-24 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
          style={{ background: "#C5A059" }}
        />
      )}

      {/* Top Header Row: Icon & Timeline Pill */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-brand-glass-border bg-brand-elevated text-brand-gold shadow-gold-subtle transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-gold">
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            {isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-brand-gold">
                <Sparkles className="h-3 w-3" />
                {isAr ? "ركيزة استراتيجية مميزة" : "Featured Strategic Pillar"}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl border border-brand-glass-border/30 bg-brand-elevated/40 px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs text-brand-text-muted">
            <Clock className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
            <span>{service.timeline}</span>
          </div>
        </div>

        {/* Title & Description (Zero Ellipsis, Natural Wrapping) */}
        <h3 className="font-outfit text-xl font-bold tracking-tight text-brand-text-primary transition-colors duration-200 group-hover:text-brand-gold sm:text-2xl">
          {title}
        </h3>

        <div
          className="mt-1 font-tajawal text-xs font-medium text-brand-gold/80"
          dir={isAr ? "ltr" : "rtl"}
        >
          {subtitle}
        </div>

        <p className="mt-4 font-jakarta text-sm leading-relaxed text-brand-text-secondary sm:text-base">
          {shortDesc}
        </p>

        {/* Deliverables Preview Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {deliverables.slice(0, isFeatured ? 3 : 2).map((item, idx) => (
            <span
              key={idx}
              className="inline-flex max-w-full items-center rounded-lg border border-brand-glass-border/40 bg-brand-elevated/50 px-2.5 py-1 text-xs font-jakarta text-brand-text-muted transition-colors duration-200 group-hover:border-brand-glass-border/70 group-hover:text-brand-text-secondary break-words whitespace-normal text-start leading-normal"
            >
              {item}
            </span>
          ))}
          {deliverables.length > (isFeatured ? 3 : 2) && (
            <span className="inline-flex items-center rounded-lg border border-brand-glass-border/20 px-2 py-1 text-xs font-mono text-brand-gold">
              +{deliverables.length - (isFeatured ? 3 : 2)} {isAr ? "المزيد" : "More"}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-brand-glass-border/30 pt-5">
        <div className="font-mono text-xs text-brand-text-muted">
          {isAr ? "الجهة:" : "Liaison:"}{" "}
          <span className="text-brand-text-secondary">{service.authorities[0]}</span>
        </div>

        <span className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-transparent px-3 py-2 font-outfit text-sm font-semibold text-brand-gold transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand-gold-hover rtl:group-hover:-translate-x-1">
          <span>{t("services.viewScope")}</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </span>
      </div>
    </div>
  );
}
