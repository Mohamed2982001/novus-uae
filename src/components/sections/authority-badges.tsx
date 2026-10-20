"use client";

import * as React from "react";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export interface AuthorityPartner {
  code: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
}

export const AUTHORITIES: AuthorityPartner[] = [
  {
    code: "DET / DED",
    nameEn: "Dubai Economy & Tourism",
    nameAr: "دائرة الاقتصاد والسياحة في دبي",
    roleEn: "Mainland Licensure & Commercial Approvals",
    roleAr: "تراخيص الأنشطة والتسجيل في البر الرئيسي",
  },
  {
    code: "MOHRE",
    nameEn: "Ministry of Human Resources",
    nameAr: "وزارة الموارد البشرية والتوطين",
    roleEn: "Establishment Cards & Corporate Quotas",
    roleAr: "بطاقات المنشأة وحصص تصاريح العمل",
  },
  {
    code: "ICP",
    nameEn: "Federal Authority for Identity & Citizenship",
    nameAr: "الهيئة الاتحادية للهوية والجنسية",
    roleEn: "10-Year Golden Visas & Emirates ID",
    roleAr: "الإقامة الذهبية 10 سنوات وبطاقات الهوية",
  },
  {
    code: "MOFA",
    nameEn: "Ministry of Foreign Affairs",
    nameAr: "وزارة الخارجية والتعاون الدولي",
    roleEn: "Diplomatic & Commercial Attestation",
    roleAr: "التصديقات الدبلوماسية والوثائق الدولية",
  },
  {
    code: "Amer & Tasheel",
    nameEn: "Tasheel & Amer VIP Centers",
    nameAr: "مراكز تسهيل وعامر الذكية VIP",
    roleEn: "Expedited Public Service Processing",
    roleAr: "المسار السريع VIP للمعاملات الحكومية",
  },
];

export function AuthorityBadges() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="authorities"
      aria-label={t("authorities.title")}
      className="relative z-10 mx-auto max-w-[1152px] px-4 py-10 sm:px-6 border-y border-brand-glass-border/20 scroll-mt-36"
    >
      <div className="text-center mb-6">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-brand-gold/80">
          {t("authorities.sectionPill")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {AUTHORITIES.map((auth) => (
          <div
            key={auth.code}
            className="group relative flex flex-col justify-between rounded-xl border border-brand-glass-border/30 bg-brand-elevated/30 p-3.5 text-start backdrop-blur-sm transition-all duration-300 hover:border-brand-gold/50 hover:bg-brand-elevated/70 hover:shadow-gold-subtle"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-brand-gold">
                {auth.code}
              </span>
              <Shield className="h-3.5 w-3.5 text-brand-gold/50 transition-colors group-hover:text-brand-gold" />
            </div>

            <div className="font-outfit text-xs font-semibold text-brand-text-primary leading-tight">
              {locale === "ar" ? auth.nameAr : auth.nameEn}
            </div>

            <div className="mt-1 font-jakarta text-[11px] text-brand-text-muted leading-tight">
              {locale === "ar" ? auth.roleAr : auth.roleEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
