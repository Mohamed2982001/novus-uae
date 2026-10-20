"use client";

import * as React from "react";
import { Calculator, MessageSquare } from "lucide-react";
import { SetupConfig } from "@/lib/calculator/types";
import { calculateSetupCost, formatCurrency, generateWhatsAppQuoteUrl } from "@/lib/calculator/engine";
import { CalculatorSteps } from "./calculator-steps";
import { LiveReceiptCard } from "./live-receipt-card";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";

export function SetupCalculator() {
  const { locale, t } = useLanguage();

  const [config, setConfig] = React.useState<SetupConfig>({
    jurisdiction: "mainland",
    activity: "commercial",
    visaCount: 1,
    goldenVisa: false,
    addons: {
      bankAccountAssistance: true,
      corporateTaxVat: true,
      physicalOfficeFlexi: true,
    },
  });

  const result = React.useMemo(() => calculateSetupCost(config), [config]);

  const mobileWhatsAppUrl = React.useMemo(
    () => generateWhatsAppQuoteUrl(config, result, BrandConfig.contact.whatsapp, locale),
    [config, result, locale]
  );

  return (
    <section
      id="calculator"
      aria-label={t("calculator.headline")}
      className="scroll-mt-36 py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-15 blur-[150px]"
        style={{ background: "#C5A059" }}
      />

      <div className="container relative z-10 mx-auto max-w-[1152px] px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-glass-border/70 bg-brand-glass px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-brand-gold shadow-gold-subtle backdrop-blur-md">
            <Calculator className="h-3.5 w-3.5" />
            <span>{t("calculator.sectionPill")}</span>
          </div>

          <h2 className="font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl lg:text-5xl leading-tight">
            {t("calculator.headline")}{" "}
            <span className="text-brand-gold">{t("calculator.headlineGradient")}</span>
          </h2>

          <p className="mt-4 font-jakarta text-base leading-relaxed text-brand-text-secondary sm:text-lg">
            {t("calculator.subtitle")}
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Configuration Steps (7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CalculatorSteps config={config} onChange={setConfig} />
          </div>

          {/* Right Column: Sticky Live Receipt Card (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <LiveReceiptCard config={config} result={result} />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Summary Bar for Mobile (< 768px) */}
      <div className="fixed bottom-0 inset-x-0 z-40 block border-t border-brand-glass-border/60 bg-brand-primary/95 p-4 backdrop-blur-xl shadow-2xl lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] text-brand-text-muted uppercase">
              {locale === "ar" ? "الإجمالي التقديري" : "Estimated Total"}
            </div>
            <div className="font-mono text-lg font-bold text-brand-gold">
              {formatCurrency(result.totalAED, "AED")}
            </div>
          </div>

          <a
            href={mobileWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-2.5 font-outfit text-xs font-bold text-brand-primary shadow-gold-subtle active:scale-95"
          >
            <MessageSquare className="h-4 w-4" />
            {locale === "ar" ? "تصدير العرض" : "Export Quote"}
          </a>
        </div>
      </div>
    </section>
  );
}
