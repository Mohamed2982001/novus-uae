"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  Landmark,
  ArrowRight,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { LeaderProfile } from "@/data/leadership.data";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface LeadershipCardProps {
  leader: LeaderProfile;
  className?: string;
  isFeatured?: boolean;
}

export function LeadershipCard({ leader, className, isFeatured = false }: LeadershipCardProps) {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";

  const handleScheduleClick = () => {
    const el = document.querySelector("#consultation");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const name = isAr ? leader.nameAr : leader.nameEn;
  const secondaryName = isAr ? leader.nameEn : leader.nameAr;
  const title = isAr ? leader.titleAr : leader.titleEn;
  const bio = isAr ? leader.bioAr : leader.bioEn;
  const credentials = isAr ? leader.credentialsAr : leader.credentialsEn;

  if (isFeatured) {
    return (
      <article
        className={cn(
          "group relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10 rounded-3xl border-2 border-brand-gold/70 bg-gradient-to-br from-brand-secondary via-brand-elevated/90 to-brand-primary p-7 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(182,150,94,0.30)] transition-all duration-500 hover:border-brand-gold hover:shadow-gold-glow",
          className
        )}
      >
        {/* Top Animated Golden Shimmer Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

        {/* Ambient Golden Radial Glow */}
        <div
          className="pointer-events-none absolute -end-12 -bottom-12 h-80 w-80 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
          style={{ background: "#b6965e" }}
        />

        {/* Left Side: Founder Crest, Identity, and Narrative Bio */}
        <div className="flex-1 space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sovereign Crest Monogram */}
            <div className="relative flex h-18 w-18 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-brand-gold bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary font-outfit text-2xl sm:text-3xl font-extrabold tracking-wider text-brand-gold shadow-gold-glow group-hover:scale-105 transition-transform duration-500">
              {leader.monogram}
              <div className="absolute -top-1 -end-1 h-3.5 w-3.5 rounded-full bg-brand-gold border-2 border-brand-primary animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/50 bg-brand-gold/15 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-brand-gold shadow-gold-subtle">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>{isAr ? "المؤسس والرئيس التنفيذي • قيادة سيادية" : "Founder & CEO Spotlight • Sovereign Leadership"}</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h3 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-text-primary tracking-tight">
                  {name}
                </h3>
                <span className="font-tajawal text-sm sm:text-base font-semibold text-brand-gold/90">
                  ({secondaryName})
                </span>
              </div>
            </div>
          </div>

          <p className="font-outfit text-base sm:text-lg font-bold text-gradient-gold">
            {title}
          </p>

          <p className="font-jakarta text-sm sm:text-base leading-relaxed text-brand-text-secondary max-w-2xl">
            {bio}
          </p>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-brand-gold/90 pt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gold animate-ping" />
            <span className="font-semibold">
              {leader.experienceYears}+ {t("leadership.trackRecord")} • {isAr ? "الريادة السيادية وتأسيس الأعمال" : "Sovereign Market-Entry Pioneer"}
            </span>
          </div>
        </div>

        {/* Right Side: Credentials, Liaisons, and Direct Consultation Action */}
        <div className="lg:w-[400px] shrink-0 space-y-5 rounded-2xl border border-brand-gold/40 bg-brand-primary/80 p-6 sm:p-7 backdrop-blur-xl shadow-glass-elevated relative z-10">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-text-primary">
              <Briefcase className="h-4 w-4 text-brand-gold" />
              <span>{t("leadership.credentials")}</span>
            </div>
            <div className="flex flex-col gap-2">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 rounded-xl border border-brand-glass-border/50 bg-brand-secondary/60 px-3.5 py-2 font-jakarta text-xs text-brand-text-secondary transition-colors duration-200 hover:border-brand-gold/30 hover:text-brand-text-primary"
                >
                  <ShieldCheck className="h-4 w-4 text-brand-gold shrink-0" />
                  <span className="leading-snug">{cred}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-brand-glass-border/40 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-text-primary">
              <Landmark className="h-4 w-4 text-brand-gold" />
              <span>{t("leadership.liaisons")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {leader.keyLiaisons.map((liaison, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-2.5 py-1 font-mono text-[11px] font-bold text-brand-gold transition-colors duration-200 hover:bg-brand-gold/20"
                >
                  {liaison}
                </span>
              ))}
            </div>
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full justify-center shadow-gold-glow mt-4"
            icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
            iconPosition="end"
            onClick={handleScheduleClick}
          >
            {isAr ? "حجز جلسة استراتيجية مع المؤسس" : "Consult with Founder & CEO"}
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl border border-brand-glass-border/60 bg-gradient-to-b from-brand-secondary/90 via-brand-elevated/70 to-brand-primary/95 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500",
        "hover:-translate-y-2 hover:border-brand-gold/70 hover:shadow-[0_20px_50px_-10px_rgba(182,150,94,0.22)]",
        className
      )}
    >
      {/* Top Animated Golden Shimmer Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent transition-all duration-700 group-hover:via-brand-gold group-hover:h-[3px]" />

      {/* Ambient Radial Hover Glow */}
      <div className="pointer-events-none absolute -top-20 -end-20 h-48 w-48 rounded-full bg-brand-gold opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25" />

      {/* Top Header: Monogram Avatar & Track Record Pill */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Executive Seal Monogram */}
          <div className="relative flex h-15 w-15 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-brand-gold/50 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary font-outfit text-xl font-bold tracking-wider text-brand-gold shadow-gold-subtle transition-all duration-500 group-hover:scale-108 group-hover:border-brand-gold group-hover:shadow-gold-glow">
            {leader.monogram}
          </div>

          {/* Track Record Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3.5 py-1 font-mono text-xs font-semibold text-brand-gold backdrop-blur-md transition-colors duration-300 group-hover:border-brand-gold">
            <Award className="h-3.5 w-3.5 text-brand-gold" />
            <span>
              {leader.experienceYears}+ {t("leadership.trackRecord")}
            </span>
          </div>
        </div>

        {/* Identity & Executive Title */}
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="font-outfit text-xl font-bold text-brand-text-primary tracking-tight transition-colors duration-300 group-hover:text-brand-gold">
              {name}
            </h3>
            <span className="font-tajawal text-xs sm:text-sm font-semibold text-brand-gold/80">
              ({secondaryName})
            </span>
          </div>

          <p className="mt-1 font-jakarta text-xs sm:text-sm font-semibold text-brand-gold">
            {title}
          </p>
        </div>

        {/* Bio Copy (Zero Ellipsis - softWrap enabled) */}
        <p className="mt-4 font-jakarta text-xs sm:text-sm leading-relaxed text-brand-text-secondary">
          {bio}
        </p>

        {/* Credentials Highlights */}
        <div className="mt-6 space-y-2.5 border-t border-brand-glass-border/40 pt-5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-text-primary">
            <Briefcase className="h-3.5 w-3.5 text-brand-gold" />
            <span>{t("leadership.credentials")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-glass-border/50 bg-brand-elevated/40 px-3 py-1.5 font-jakarta text-[11px] font-medium text-brand-text-secondary transition-colors duration-200 group-hover:border-brand-gold/20 group-hover:text-brand-text-primary"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold shrink-0" />
                <span>{cred}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Key Sovereign Liaisons */}
        <div className="mt-4 space-y-2.5 border-t border-brand-glass-border/30 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-text-primary">
            <Landmark className="h-3.5 w-3.5 text-brand-gold" />
            <span>{t("leadership.liaisons")}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {leader.keyLiaisons.map((liaison, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-gold transition-colors duration-200 group-hover:bg-brand-gold/15"
              >
                {liaison}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-8 border-t border-brand-glass-border/40 pt-5">
        <Button
          variant="glass"
          size="md"
          className="w-full justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-primary group-hover:shadow-gold-glow transition-all duration-300"
          icon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />}
          iconPosition="end"
          onClick={handleScheduleClick}
        >
          {t("leadership.scheduleAdvisory")}
        </Button>
      </div>
    </article>
  );
}
