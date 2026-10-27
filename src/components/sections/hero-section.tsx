"use client";

import * as React from "react";
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="overview" className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 scroll-mt-36">
      {/* Background Luxury Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-48 start-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-25 blur-[160px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #C5A059 0%, #162038 50%, #0A1128 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -end-48 h-[400px] w-[400px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #D4AF37 0%, #0A1128 70%)",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(to right, #C5A059 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-[1152px] px-4 sm:px-6 text-center">
        {/* Trust Authority Pill */}
        <div className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-glass-border/70 bg-brand-glass px-3.5 py-1.5 backdrop-blur-md shadow-gold-subtle text-center">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-gold" />
          <span className="font-mono text-[11px] sm:text-xs font-medium tracking-normal sm:tracking-wide text-brand-text-primary">
            {t("hero.authorityBadge")}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-success animate-pulse" />
        </div>

        {/* Executive Headline */}
        <h1 className="mx-auto max-w-4xl font-outfit text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl leading-[1.15] break-words">
          {t("hero.titlePart1")}{" "}
          <span className="relative inline-block text-brand-gold">
            {t("hero.titleGradient")}
            <span
              className="absolute -bottom-1 start-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60"
            />
          </span>{" "}
          {t("hero.titlePart2")}
        </h1>

        {/* Executive Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl font-jakarta text-base leading-relaxed text-brand-text-secondary sm:text-lg lg:text-xl">
          {t("hero.subtitle")}
        </p>

        {/* Dual High-Conversion Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="gold"
            icon={<Calendar className="h-5 w-5" />}
            onClick={() => {
              const el = document.querySelector("#consultation");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto shadow-gold-glow"
          >
            {t("hero.consultationCta")}
          </Button>

          <Button
            size="lg"
            variant="glass"
            icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
            iconPosition="end"
            onClick={() => {
              const el = document.querySelector("#services");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto"
          >
            {t("hero.exploreCta")}
          </Button>
        </div>

        {/* Trust Points Mini-Strip */}
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 pt-8 border-t border-brand-glass-border/20 text-xs font-jakarta text-brand-text-muted">
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-gold" />
            <span>{t("hero.trustPoint1")}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-gold" />
            <span>{t("hero.trustPoint2")}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-gold" />
            <span>{t("hero.trustPoint3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
