"use client";

import * as React from "react";
import { Shield, Sparkles } from "lucide-react";
import { LEADERSHIP_PROFILES } from "@/data/leadership.data";
import { LeadershipCard } from "./leadership-card";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface LeadershipGridProps {
  className?: string;
}

export function LeadershipGrid({ className }: LeadershipGridProps) {
  const { t } = useLanguage();

  return (
    <section
      id="leadership"
      aria-label={t("leadership.headline")}
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-brand-primary via-brand-secondary/40 to-brand-primary scroll-mt-36",
        className
      )}
    >
      {/* Ambient Lighting & Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 h-72 w-full max-w-4xl rounded-full bg-brand-gold/5 blur-[120px]"
      />

      <div className="container mx-auto max-w-[1152px] px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-gold shadow-gold-subtle">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("leadership.sectionPill")}</span>
          </div>

          <h2 className="mt-4 font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl lg:text-5xl">
            {t("leadership.headline")}{" "}
            <span className="text-gradient-gold">
              {t("leadership.headlineGradient")}
            </span>
          </h2>

          <p className="mt-4 font-jakarta text-sm sm:text-base leading-relaxed text-brand-text-secondary">
            {t("leadership.subtitle")}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-brand-gold">
            <Shield className="h-4 w-4" />
            <span>{t("leadership.accreditation")}</span>
          </div>
        </div>

        {/* Dedicated Founder & CEO Spotlight Card */}
        {(() => {
          const founder = LEADERSHIP_PROFILES.find((p) => p.isFounder);
          const executiveTeam = LEADERSHIP_PROFILES.filter((p) => !p.isFounder);

          return (
            <>
              {founder && (
                <div className="mb-10">
                  <LeadershipCard leader={founder} isFeatured={true} />
                </div>
              )}

              {/* Executive Directorate Grid: 1-col Mobile, 2-col dedicated Tablet, 3-col Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {executiveTeam.map((leader) => (
                  <LeadershipCard key={leader.id} leader={leader} />
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </section>
  );
}
