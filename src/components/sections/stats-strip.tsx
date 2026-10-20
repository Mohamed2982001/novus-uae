"use client";

import * as React from "react";
import { FileCheck, Building2, Award, ShieldCheck } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useLanguage } from "@/context/language-context";

export function StatsStrip() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 mx-auto max-w-[1152px] px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatedCounter
          value={10000}
          suffix="+"
          label={t("stats.visasLabel")}
          sublabel={t("stats.visasSub")}
          icon={<FileCheck className="h-5 w-5" />}
        />

        <AnimatedCounter
          value={800}
          suffix="+"
          label={t("stats.companiesLabel")}
          sublabel={t("stats.companiesSub")}
          icon={<Building2 className="h-5 w-5" />}
        />

        <AnimatedCounter
          value={10}
          suffix="+"
          label={t("stats.yearsLabel")}
          sublabel={t("stats.yearsSub")}
          icon={<Award className="h-5 w-5" />}
        />

        <AnimatedCounter
          value={100}
          suffix="%"
          label={t("stats.complianceLabel")}
          sublabel={t("stats.complianceSub")}
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>
    </section>
  );
}
