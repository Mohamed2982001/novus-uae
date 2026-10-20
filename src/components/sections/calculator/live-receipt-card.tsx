"use client";

import * as React from "react";
import {
  MessageSquare,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SetupConfig, CalculationResult } from "@/lib/calculator/types";
import { formatCurrency, generateWhatsAppQuoteUrl } from "@/lib/calculator/engine";
import { Button } from "@/components/ui/button";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface LiveReceiptCardProps {
  config: SetupConfig;
  result: CalculationResult;
  onOpenConsultation?: () => void;
  className?: string;
}

export function LiveReceiptCard({
  config,
  result,
  onOpenConsultation,
  className,
}: LiveReceiptCardProps) {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";

  const [currency, setCurrency] = React.useState<"AED" | "USD">("AED");
  const [isBreakdownExpanded, setIsBreakdownExpanded] = React.useState(true);

  const displayTotal =
    currency === "AED"
      ? formatCurrency(result.totalAED, "AED")
      : formatCurrency(result.totalUSD, "USD");

  const displaySubtotal =
    currency === "AED"
      ? formatCurrency(result.subtotalAED, "AED")
      : formatCurrency(result.subtotalAED / 3.6725, "USD");

  const displayVat =
    currency === "AED"
      ? formatCurrency(result.vatAED, "AED")
      : formatCurrency(result.vatAED / 3.6725, "USD");

  const whatsappUrl = generateWhatsAppQuoteUrl(
    config,
    result,
    BrandConfig.contact.whatsapp,
    locale
  );

  return (
    <div
      className={cn(
        "glass-card relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-glass-border/70 p-6 sm:p-8 text-start shadow-glass-elevated",
        className
      )}
    >
      {/* Subtle Ambient Gold Glow in Receipt Header */}
      <div
        className="pointer-events-none absolute -top-20 -end-20 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ background: "#C5A059" }}
      />

      <div>
        {/* Receipt Header & Currency Switcher */}
        <div className="flex items-center justify-between border-b border-brand-glass-border/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-outfit text-sm font-bold text-brand-text-primary uppercase tracking-wider">
                {t("calculator.receipt.title")}
              </h3>
            </div>
            <p className="mt-0.5 font-jakarta text-[11px] text-brand-text-muted">
              {t("calculator.receipt.subtitle")}
            </p>
          </div>

          {/* Currency Toggle Switch (AED / USD) */}
          <div className="flex items-center rounded-xl border border-brand-glass-border/50 bg-brand-elevated/80 p-0.5">
            <button
              type="button"
              onClick={() => setCurrency("AED")}
              className={cn(
                "rounded-lg px-2.5 py-1 font-mono text-xs font-bold transition-all",
                currency === "AED"
                  ? "bg-brand-gold text-brand-primary shadow-sm"
                  : "text-brand-text-muted hover:text-brand-text-primary"
              )}
            >
              AED
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={cn(
                "rounded-lg px-2.5 py-1 font-mono text-xs font-bold transition-all",
                currency === "USD"
                  ? "bg-brand-gold text-brand-primary shadow-sm"
                  : "text-brand-text-muted hover:text-brand-text-primary"
              )}
            >
              USD
            </button>
          </div>
        </div>

        {/* Primary Investment Hero Block */}
        <div className="py-6 text-center border-b border-brand-glass-border/30">
          <div className="font-mono text-xs font-medium uppercase tracking-wider text-brand-text-muted">
            {t("calculator.receipt.totalLabel")}
          </div>

          <div className="mt-2 font-mono text-4xl sm:text-5xl font-black text-brand-gold tracking-tight">
            {displayTotal}
          </div>

          <div className="mt-2 font-jakarta text-[11px] text-brand-text-muted max-w-xs mx-auto">
            {t("calculator.receipt.vatNotice")}
          </div>

          {/* Timeline Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1 font-mono text-xs text-brand-gold">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {t("calculator.receipt.timeline")}: {result.estimatedTimelineDays.min}–{result.estimatedTimelineDays.max} {isAr ? "أيام عمل" : "Business Days"}
            </span>
          </div>
        </div>

        {/* Collapsible Itemized Fee Schedule */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
            className="flex w-full items-center justify-between font-outfit text-xs font-semibold uppercase tracking-wider text-brand-text-secondary hover:text-brand-gold transition-colors py-1"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-brand-gold" />
              {t("calculator.receipt.feeSchedule")} ({result.itemizedBreakdown.length})
            </span>
            {isBreakdownExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isBreakdownExpanded && (
            <div className="mt-3 space-y-2.5 max-h-[220px] overflow-y-auto pe-1">
              {result.itemizedBreakdown.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 text-xs border-b border-brand-glass-border/15 pb-2 font-jakarta"
                >
                  <span className="text-brand-text-secondary leading-snug">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                  <span className="font-mono font-medium text-brand-text-primary shrink-0">
                    {currency === "AED"
                      ? formatCurrency(item.amountAED, "AED")
                      : formatCurrency(item.amountUSD, "USD")}
                  </span>
                </div>
              ))}

              {result.vatAED > 0 && (
                <div className="flex items-center justify-between text-xs text-brand-text-muted pt-1">
                  <span>{isAr ? "ضريبة القيمة المضافة القانونية (5%):" : "Statutory 5% UAE VAT:"}</span>
                  <span className="font-mono">{displayVat}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer & Direct Conversion CTAs */}
      <div className="space-y-3 pt-4 border-t border-brand-glass-border/30">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3 font-outfit text-sm font-semibold text-brand-primary shadow-gold-subtle transition-all duration-200 hover:bg-brand-gold-hover hover:shadow-gold-glow active:scale-98 select-none"
        >
          <MessageSquare className="h-4 w-4" />
          {t("calculator.receipt.whatsAppCta")}
        </a>

        <Button
          variant="glass"
          className="w-full min-h-[44px]"
          icon={<Calendar className="h-4 w-4" />}
          onClick={() => {
            if (onOpenConsultation) {
              onOpenConsultation();
            } else {
              const el = document.querySelector("#consultation");
              el?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {t("calculator.receipt.proposalCta")}
        </Button>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-jakarta text-brand-text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
          <span>{t("calculator.receipt.guarantee")}</span>
        </div>
      </div>
    </div>
  );
}
