"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  Landmark,
  ArrowRight,
  Briefcase,
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
          "group relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-3xl border-2 border-brand-gold/60 bg-gradient-to-br from-brand-elevated/90 via-brand-secondary/80 to-brand-elevated/90 p-7 sm:p-9 backdrop-blur-2xl shadow-gold-glow transition-all duration-300 hover:border-brand-gold",
          className
        )}
      >
        {/* Subtle Sovereign Watermark Background Pattern */}
        <div
          className="pointer-events-none absolute -end-10 -bottom-10 h-64 w-64 rounded-full opacity-10 blur-2xl"
          style={{ background: "#C5A059" }}
        />

        {/* Left Side: Founder Crest, Identity, and Bio */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-gold bg-brand-primary font-outfit text-2xl font-extrabold tracking-wider text-brand-gold shadow-gold-subtle group-hover:scale-105 transition-transform duration-300">
              {leader.monogram}
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                <Award className="h-3.5 w-3.5" />
                <span>{isAr ? "المؤسس والرئيس التنفيذي" : "Founder & CEO Spotlight"}</span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
                  {name}
                </h3>
                <span className="font-alexandria text-sm font-semibold text-brand-gold">
                  ({secondaryName})
                </span>
              </div>
            </div>
          </div>

          <p className="font-jakarta text-sm sm:text-base font-medium text-brand-gold">
            {title}
          </p>

          <p className="font-jakarta text-sm sm:text-base leading-relaxed text-brand-text-secondary max-w-2xl">
            {bio}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-brand-gold/90">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span>
              {leader.experienceYears}+ {t("leadership.trackRecord")} • {isAr ? "الريادة السيادية وتأسيس الأعمال" : "Sovereign Market-Entry Pioneer"}
            </span>
          </div>
        </div>

        {/* Right Side: Credentials, Liaisons, and Direct Consultation CTA */}
        <div className="lg:w-[380px] shrink-0 space-y-5 rounded-2xl border border-brand-glass-border/40 bg-brand-primary/60 p-5 sm:p-6 backdrop-blur-md">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-primary">
              <Briefcase className="h-3.5 w-3.5 text-brand-gold" />
              <span>{t("leadership.credentials")}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border border-brand-glass-border/40 bg-brand-secondary/40 px-3 py-1.5 font-jakarta text-xs text-brand-text-secondary"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-gold shrink-0" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-brand-glass-border/30 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-primary">
              <Landmark className="h-3.5 w-3.5 text-brand-gold" />
              <span>{t("leadership.liaisons")}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {leader.keyLiaisons.map((liaison, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-brand-gold/30 bg-brand-gold/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-gold"
                >
                  {liaison}
                </span>
              ))}
            </div>
          </div>

          <Button
            variant="gold"
            size="md"
            className="w-full justify-center shadow-gold-subtle"
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
        "group relative flex flex-col justify-between rounded-2xl border border-brand-glass-border/60 bg-brand-elevated/75 p-6 sm:p-7 backdrop-blur-xl shadow-glass transition-all duration-300 hover:border-brand-gold/60 hover:shadow-gold-glow",
        className
      )}
    >
      {/* Top Header: Monogram Avatar & Experience Badge */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Executive Monogram Crest */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-gold/50 bg-gradient-to-br from-brand-secondary to-brand-primary font-outfit text-xl font-bold tracking-wider text-brand-gold shadow-gold-subtle group-hover:scale-105 transition-transform duration-300">
            {leader.monogram}
          </div>

          {/* Track Record Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 font-mono text-xs font-semibold text-brand-gold">
            <Award className="h-3.5 w-3.5" />
            <span>
              {leader.experienceYears}+ {t("leadership.trackRecord")}
            </span>
          </div>
        </div>

        {/* Identity & Executive Title */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <h3 className="font-outfit text-xl font-bold text-brand-text-primary tracking-tight">
              {name}
            </h3>
            <span className="font-alexandria text-sm font-semibold text-brand-gold/80">
              ({secondaryName})
            </span>
          </div>

          <p className="mt-1 font-jakarta text-xs sm:text-sm font-medium text-brand-gold">
            {title}
          </p>
        </div>

        {/* Bio Copy (Zero Ellipsis - softWrap enabled) */}
        <p className="mt-4 font-jakarta text-xs sm:text-sm leading-relaxed text-brand-text-secondary">
          {bio}
        </p>

        {/* Credentials Highlights */}
        <div className="mt-5 space-y-2 border-t border-brand-glass-border/30 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-primary">
            <Briefcase className="h-3.5 w-3.5 text-brand-gold" />
            <span>{t("leadership.credentials")}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md border border-brand-glass-border/40 bg-brand-primary/50 px-2.5 py-1 font-jakarta text-[11px] font-medium text-brand-text-muted"
              >
                <ShieldCheck className="h-3 w-3 text-brand-gold shrink-0" />
                <span>{cred}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Key Sovereign Liaisons */}
        <div className="mt-4 space-y-2 border-t border-brand-glass-border/20 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-primary">
            <Landmark className="h-3.5 w-3.5 text-brand-gold" />
            <span>{t("leadership.liaisons")}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {leader.keyLiaisons.map((liaison, idx) => (
              <span
                key={idx}
                className="rounded-md border border-brand-gold/25 bg-brand-gold/5 px-2 py-0.5 font-mono text-[10px] font-medium text-brand-gold"
              >
                {liaison}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 border-t border-brand-glass-border/30 pt-4">
        <Button
          variant="glass"
          size="md"
          className="w-full justify-center group-hover:border-brand-gold/50 group-hover:text-brand-gold"
          icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
          iconPosition="end"
          onClick={handleScheduleClick}
        >
          {t("leadership.scheduleAdvisory")}
        </Button>
      </div>
    </article>
  );
}
