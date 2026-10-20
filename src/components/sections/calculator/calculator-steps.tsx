"use client";

import * as React from "react";
import {
  Building2,
  Globe2,
  ShieldCheck,
  Briefcase,
  Factory,
  Sparkles,
  Award,
  Plus,
  Minus,
  Check,
  Landmark,
  FileSpreadsheet,
  Building,
} from "lucide-react";
import { SetupConfig, JurisdictionType, ActivityCategory } from "@/lib/calculator/types";
import {
  JURISDICTIONS,
  ACTIVITIES,
  ADDONS_CATALOG,
  RESIDENCE_VISA_UNIT_FEE_AED,
  GOLDEN_VISA_ASSISTANCE_FEE_AED,
} from "@/lib/calculator/constants";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface CalculatorStepsProps {
  config: SetupConfig;
  onChange: (newConfig: SetupConfig) => void;
}

export function CalculatorSteps({ config, onChange }: CalculatorStepsProps) {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";

  const setJurisdiction = (jurisdiction: JurisdictionType) => {
    onChange({ ...config, jurisdiction });
  };

  const setActivity = (activity: ActivityCategory) => {
    onChange({ ...config, activity });
  };

  const setVisaCount = (delta: number) => {
    const next = Math.max(0, Math.min(10, config.visaCount + delta));
    onChange({ ...config, visaCount: next });
  };

  const toggleGoldenVisa = () => {
    onChange({ ...config, goldenVisa: !config.goldenVisa });
  };

  const toggleAddon = (addonId: keyof SetupConfig["addons"]) => {
    onChange({
      ...config,
      addons: {
        ...config.addons,
        [addonId]: !config.addons[addonId],
      },
    });
  };

  return (
    <div className="space-y-12">
      {/* Step 1: Jurisdiction Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold font-mono text-xs font-bold text-brand-primary">
            01
          </span>
          <div>
            <h3 className="font-outfit text-lg font-bold text-brand-text-primary sm:text-xl">
              {t("calculator.step1Title")}
            </h3>
            <p className="font-jakarta text-xs text-brand-text-muted">
              {t("calculator.step1Desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {JURISDICTIONS.map((j) => {
            const isSelected = config.jurisdiction === j.id;
            const Icon = j.id === "mainland" ? Building2 : j.id === "freezone" ? Globe2 : ShieldCheck;
            const title = isAr ? j.titleAr : j.titleEn;
            const badge = isAr ? j.badgeAr : j.badgeEn;
            const desc = isAr ? j.descAr : j.descEn;
            const perks = isAr ? j.perksAr : j.perksEn;

            return (
              <button
                key={j.id}
                type="button"
                onClick={() => setJurisdiction(j.id)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border p-5 text-start transition-all duration-200 outline-none select-none",
                  isSelected
                    ? "border-brand-gold bg-brand-elevated shadow-gold-subtle ring-1 ring-brand-gold/60"
                    : "border-brand-glass-border/40 bg-brand-secondary/40 hover:border-brand-gold/50 hover:bg-brand-elevated/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                        isSelected
                          ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                          : "border-brand-glass-border bg-brand-primary text-brand-text-muted group-hover:text-brand-gold"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border flex items-center justify-center",
                        isSelected
                          ? "border-brand-gold bg-brand-gold text-brand-primary"
                          : "border-brand-glass-border"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                  </div>

                  <h4 className="font-outfit text-base font-bold text-brand-text-primary">
                    {title}
                  </h4>

                  <span className="mt-1 inline-block rounded-md bg-brand-gold/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-gold">
                    {badge}
                  </span>

                  <p className="mt-3 font-jakarta text-xs leading-relaxed text-brand-text-secondary">
                    {desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-brand-glass-border/20 pt-3">
                  <div className="space-y-1.5 text-[11px] font-jakarta text-brand-text-muted">
                    {perks.slice(0, 2).map((perk, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 shrink-0 text-brand-gold" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between font-mono text-xs">
                    <span className="text-brand-text-muted">
                      {isAr ? "الأساس الحكومي:" : "Base License:"}
                    </span>
                    <span className="font-bold text-brand-gold">
                      AED {j.baseFeeAED.toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Activity Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold font-mono text-xs font-bold text-brand-primary">
            02
          </span>
          <div>
            <h3 className="font-outfit text-lg font-bold text-brand-text-primary sm:text-xl">
              {t("calculator.step2Title")}
            </h3>
            <p className="font-jakarta text-xs text-brand-text-muted">
              {t("calculator.step2Desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ACTIVITIES.map((act) => {
            const isSelected = config.activity === act.id;
            const Icon = act.id === "commercial" ? Briefcase : act.id === "professional" ? Sparkles : act.id === "industrial" ? Factory : Building2;
            const title = isAr ? act.titleAr : act.titleEn;
            const desc = isAr ? act.descAr : act.descEn;

            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setActivity(act.id)}
                className={cn(
                  "group flex items-start gap-4 rounded-xl border p-4 text-start transition-all duration-200 outline-none select-none",
                  isSelected
                    ? "border-brand-gold bg-brand-elevated shadow-gold-subtle ring-1 ring-brand-gold/60"
                    : "border-brand-glass-border/40 bg-brand-secondary/40 hover:border-brand-gold/50 hover:bg-brand-elevated/40"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors mt-0.5",
                    isSelected
                      ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                      : "border-brand-glass-border bg-brand-primary text-brand-text-muted group-hover:text-brand-gold"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-outfit text-sm font-bold text-brand-text-primary truncate">
                      {title}
                    </h4>
                    {act.surchargeAED > 0 && (
                      <span className="font-mono text-[10px] font-semibold text-brand-gold shrink-0">
                        +AED {act.surchargeAED.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 font-jakarta text-xs leading-relaxed text-brand-text-secondary">
                    {desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Visas & Golden Visa */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold font-mono text-xs font-bold text-brand-primary">
            03
          </span>
          <div>
            <h3 className="font-outfit text-lg font-bold text-brand-text-primary sm:text-xl">
              {t("calculator.step3Title")}
            </h3>
            <p className="font-jakarta text-xs text-brand-text-muted">
              {t("calculator.step3Desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Residence Visa Stepper Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-brand-glass-border/40 bg-brand-secondary/40 p-5">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-outfit text-sm font-bold text-brand-text-primary">
                  {isAr ? "تأشيرات الإقامة (مستثمر / موظفون)" : "Standard Investor & Employment Visas"}
                </h4>
                <span className="font-mono text-xs font-bold text-brand-gold">
                  AED {RESIDENCE_VISA_UNIT_FEE_AED.toLocaleString()} / {isAr ? "تأشيرة" : "visa"}
                </span>
              </div>
              <p className="mt-1 font-jakarta text-xs text-brand-text-secondary leading-relaxed">
                {isAr
                  ? `تشمل التأشيرة الإلكترونية، وتعديل الوضع، والفحص الطبي VIP، وبطاقة الهوية سنتين (${RESIDENCE_VISA_UNIT_FEE_AED.toLocaleString()} درهم لكل تأشيرة).`
                  : `Includes e-visa, status change, VIP medical fitness, and 2-year Emirates ID (AED ${RESIDENCE_VISA_UNIT_FEE_AED.toLocaleString()} per visa).`}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-brand-glass-border/20 pt-4">
              <span className="font-mono text-xs text-brand-text-muted">
                {isAr ? "العدد المختار:" : "Selected Quota:"}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease Visa Count"
                  onClick={() => setVisaCount(-1)}
                  disabled={config.visaCount === 0}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border bg-brand-elevated text-brand-text-primary transition-all hover:border-brand-gold active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="min-w-[32px] text-center font-mono text-xl font-bold text-brand-gold tabular-nums">
                  {config.visaCount}
                </span>

                <button
                  type="button"
                  aria-label="Increase Visa Count"
                  onClick={() => setVisaCount(1)}
                  disabled={config.visaCount >= 10}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border bg-brand-elevated text-brand-text-primary transition-all hover:border-brand-gold active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Golden Visa Card Toggle */}
          <button
            type="button"
            onClick={toggleGoldenVisa}
            className={cn(
              "group flex flex-col justify-between rounded-2xl border p-5 text-start transition-all duration-200 outline-none select-none",
              config.goldenVisa
                ? "border-brand-gold bg-brand-elevated shadow-gold-subtle ring-1 ring-brand-gold/60"
                : "border-brand-glass-border/40 bg-brand-secondary/40 hover:border-brand-gold/50 hover:bg-brand-elevated/40"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-bold text-brand-gold">
                  <Award className="h-4 w-4" />
                  {t("calculator.goldenVisaTitle")}
                </span>
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                    config.goldenVisa
                      ? "border-brand-gold bg-brand-gold text-brand-primary"
                      : "border-brand-glass-border"
                  )}
                >
                  {config.goldenVisa && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
              </div>

              <p className="font-jakarta text-xs leading-relaxed text-brand-text-secondary">
                {t("calculator.goldenVisaDesc")}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-glass-border/20 flex items-center justify-between">
              <span className="font-mono text-xs text-brand-text-muted">
                {isAr ? "رسوم الترشيح والمتابعة:" : "Nomination Concierge:"}
              </span>
              <span className="font-mono text-xs font-bold text-brand-gold">
                +AED {GOLDEN_VISA_ASSISTANCE_FEE_AED.toLocaleString()}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Step 4: Premium Corporate Addons */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold font-mono text-xs font-bold text-brand-primary">
            04
          </span>
          <div>
            <h3 className="font-outfit text-lg font-bold text-brand-text-primary sm:text-xl">
              {t("calculator.step4Title")}
            </h3>
            <p className="font-jakarta text-xs text-brand-text-muted">
              {t("calculator.step4Desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ADDONS_CATALOG.map((addon) => {
            const isSelected = Boolean(config.addons[addon.id]);
            const Icon = addon.id === "bankAccountAssistance" ? Landmark : addon.id === "corporateTaxVat" ? FileSpreadsheet : Building;
            const title = isAr ? addon.titleAr : addon.titleEn;
            const desc = isAr ? addon.descAr : addon.descEn;
            const badge = isAr ? addon.badgeAr : addon.badgeEn;

            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl border p-4 text-start transition-all duration-200 outline-none select-none",
                  isSelected
                    ? "border-brand-gold bg-brand-elevated shadow-gold-subtle ring-1 ring-brand-gold/60"
                    : "border-brand-glass-border/40 bg-brand-secondary/40 hover:border-brand-gold/50 hover:bg-brand-elevated/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                        isSelected
                          ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                          : "border-brand-glass-border bg-brand-primary text-brand-text-muted group-hover:text-brand-gold"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border flex items-center justify-center",
                        isSelected
                          ? "border-brand-gold bg-brand-gold text-brand-primary"
                          : "border-brand-glass-border"
                      )}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                  </div>

                  <h4 className="font-outfit text-sm font-bold text-brand-text-primary">
                    {title}
                  </h4>

                  <span className="mt-1 inline-block rounded-md bg-brand-gold/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-brand-gold">
                    {badge}
                  </span>

                  <p className="mt-2 font-jakarta text-xs leading-relaxed text-brand-text-secondary">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-brand-glass-border/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-brand-text-muted">{isAr ? "الرسوم:" : "Fee:"}</span>
                  <span className="font-bold text-brand-gold">
                    AED {addon.feeAED.toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
