"use client";

import * as React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer
      id="contact"
      className="border-t border-brand-glass-border/40 bg-brand-secondary/80 py-12"
    >
      <div className="container mx-auto max-w-[1152px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-outfit text-base font-bold text-brand-text-primary">
              {locale === "ar" ? BrandConfig.legalNameAr : BrandConfig.legalNameEn}
            </div>
            <div
              className="mt-1 font-tajawal text-xs text-brand-text-muted"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              {locale === "ar" ? BrandConfig.legalNameEn : BrandConfig.legalNameAr}
            </div>
            <div className="mt-2 font-jakarta text-xs text-brand-text-secondary max-w-md">
              {t("footer.description")}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-jakarta text-brand-text-secondary">
            <a
              href={`tel:${BrandConfig.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-gold" />
              <span>{BrandConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${BrandConfig.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Mail className="h-4 w-4 text-brand-gold" />
              <span>{BrandConfig.contact.email}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-gold" />
              <span>
                {locale === "ar"
                  ? BrandConfig.contact.addressAr
                  : BrandConfig.contact.addressEn}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-glass-border/20 flex flex-col sm:flex-row items-center justify-between text-[11px] font-jakarta text-brand-text-muted gap-2">
          <div>
            &copy; {new Date().getFullYear()} {BrandConfig.name} UAE.{" "}
            {t("footer.allRightsReserved")}
          </div>
          <div className="font-mono text-brand-gold/70">
            {t("footer.licensedEntity")}
          </div>
        </div>
      </div>
    </footer>
  );
}
