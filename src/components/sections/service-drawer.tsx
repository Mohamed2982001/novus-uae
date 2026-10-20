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
  CheckCircle2,
  Shield,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ServiceItem } from "@/data/services.data";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";

export interface ServiceDrawerProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
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

export function ServiceDrawer({ service, isOpen, onClose }: ServiceDrawerProps) {
  const { locale, t } = useLanguage();
  if (!service) return null;

  const IconComponent = ICON_MAP[service.icon] || Building2;
  const isAr = locale === "ar";

  const title = isAr ? service.titleAr : service.titleEn;
  const subtitle = isAr ? service.titleEn : service.titleAr;
  const fullOverview = isAr ? service.fullOverviewAr : service.fullOverviewEn;
  const deliverables = isAr ? service.deliverablesAr : service.deliverablesEn;

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً فريق نوفوس، أود الاستفسار عن تفاصيل خدمة "${service.titleAr}" (${service.id}). يرجى تزويدي بمستشار تنفيذي.`
      : `Hello Novus Team, I would like to inquire about your services for "${service.titleEn}" (${service.id}). Please connect me with a senior advisor.`
  );
  const whatsappUrl = `https://wa.me/${BrandConfig.contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={title}
      description={subtitle}
    >
      <div className="space-y-8 text-start pb-6">
        {/* Service Identity & Timeline Header */}
        <div className="flex items-center justify-between rounded-2xl border border-brand-glass-border/40 bg-brand-elevated/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-glass-border bg-brand-elevated text-brand-gold shadow-gold-subtle">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-brand-gold">
                {isAr ? "ركيزة خدمة استراتيجية" : "Strategic Service Pillar"}
              </div>
              <div className="font-outfit text-sm font-bold text-brand-text-primary">
                {service.id.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-xl border border-brand-glass-border bg-brand-primary/60 px-3 py-1.5 font-mono text-xs text-brand-text-secondary">
            <Clock className="h-3.5 w-3.5 text-brand-gold" />
            <span>{service.timeline}</span>
          </div>
        </div>

        {/* Full Operational Overview */}
        <div className="space-y-3">
          <h4 className="font-outfit text-base font-bold text-brand-text-primary flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {isAr ? "نظرة عامة تشغيلية وقانونية" : "Operational & Legal Overview"}
          </h4>
          <p className="font-jakarta text-sm leading-relaxed text-brand-text-secondary">
            {fullOverview}
          </p>
        </div>

        {/* Itemized Deliverables & Scope Checklist */}
        <div className="space-y-4">
          <h4 className="font-outfit text-base font-bold text-brand-text-primary flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {t("services.drawer.deliverablesTitle")}
          </h4>
          <div className="space-y-2.5">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-brand-glass-border/30 bg-brand-elevated/30 p-3 transition-colors hover:border-brand-gold/40"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-gold mt-0.5" />
                <div className="font-jakarta text-xs font-medium text-brand-text-primary leading-relaxed">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant UAE Authorities Strip */}
        <div className="space-y-3">
          <h4 className="font-outfit text-base font-bold text-brand-text-primary flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {t("services.drawer.authoritiesTitle")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.authorities.map((auth, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-3 py-1.5 font-mono text-xs text-brand-gold"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>{auth}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Conversion Action Buttons */}
        <div className="space-y-3 pt-6 border-t border-brand-glass-border/40">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3 font-outfit text-sm font-semibold text-brand-primary shadow-gold-subtle transition-all duration-200 hover:bg-brand-gold-hover hover:shadow-gold-glow active:scale-98"
          >
            <MessageSquare className="h-4 w-4" />
            {t("services.drawer.inquireWhatsApp")}
          </a>

          <Button
            variant="glass"
            className="w-full min-h-[48px]"
            icon={<Calendar className="h-4 w-4" />}
            onClick={() => {
              onClose();
              const el = document.querySelector("#consultation");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("services.drawer.bookConsultation")}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
