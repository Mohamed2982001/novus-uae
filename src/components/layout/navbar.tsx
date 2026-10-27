"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Globe, Calendar, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/ui/monogram";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { BrandConfig } from "@/config/brand.config";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export interface NavItem {
  labelEn: string;
  labelAr: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelEn: "Core Services", labelAr: "الخدمات الرئيسية", href: "#services" },
  { labelEn: "Leadership", labelAr: "القيادة التنفيذية", href: "#leadership" },
  { labelEn: "Testimonials", labelAr: "آراء العملاء", href: "#testimonials" },
  { labelEn: "Consultation", labelAr: "حجز استشارة", href: "#consultation" },
  { labelEn: "Contact", labelAr: "اتصل بنا", href: "#contact" },
];

export function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 h-[64px] sm:h-[72px] flex items-center",
        isScrolled
          ? "border-b border-brand-glass-border/50 bg-brand-primary/95 backdrop-blur-xl shadow-glass-elevated"
          : "border-b border-brand-glass-border/20 bg-brand-primary/85 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto max-w-[1152px] w-full min-w-0 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Monogram */}
          <Monogram href="/" size="md" />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 font-jakarta text-sm font-medium text-brand-text-secondary transition-colors duration-200 hover:bg-brand-elevated/50 hover:text-brand-gold"
              >
                {locale === "ar" ? item.labelAr : item.labelEn}
              </a>
            ))}
          </nav>

          {/* Desktop Action Cluster */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Language Switcher - Globe Icon Only */}
            <button
              onClick={toggleLocale}
              type="button"
              aria-label="Toggle Language"
              title={locale === "en" ? "التبديل إلى العربية" : "Switch to English"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border/50 bg-brand-elevated/40 text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-elevated/70 active:scale-95 shadow-sm"
            >
              <Globe className="h-4.5 w-4.5 text-brand-gold" />
            </button>

            {/* Consultation CTA */}
            <Button
              variant="gold"
              size="md"
              icon={<Calendar className="h-4 w-4" />}
              onClick={() => {
                const el = document.querySelector("#consultation");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {locale === "ar" ? "حجز استشارة" : "Book Consultation"}
            </Button>
          </div>

          {/* Mobile & Tablet Controls Cluster */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Language Toggle for mobile */}
            <button
              onClick={toggleLocale}
              type="button"
              aria-label="Toggle Language"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border/50 bg-brand-elevated/40 text-brand-text-primary transition-all duration-200 hover:border-brand-gold active:scale-95"
            >
              <Globe className="h-4 w-4 text-brand-gold" />
            </button>

            {/* Mobile Hamburger Trigger (>= 44x44px) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              type="button"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-glass-border bg-brand-elevated/80 text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:text-brand-gold active:scale-95"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-over Drawer Menu */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title={BrandConfig.name}
        description={locale === "ar" ? BrandConfig.taglineAr : BrandConfig.taglineEn}
      >
        <div className="flex flex-col justify-between h-full space-y-8">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-brand-glass-border/30 bg-brand-elevated/30 px-4 py-3 font-outfit text-base font-medium text-brand-text-primary transition-all duration-200 hover:border-brand-gold hover:bg-brand-elevated/80 hover:text-brand-gold active:scale-98"
              >
                <span>{locale === "ar" ? item.labelAr : item.labelEn}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-gold rtl:rotate-[-90deg]" />
              </a>
            ))}
          </nav>

          {/* Quick Contact & Action in Drawer */}
          <div className="space-y-4 pt-6 border-t border-brand-glass-border/30">
            <div className="space-y-2 font-jakarta text-xs text-brand-text-secondary">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-gold" />
                <span>{BrandConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-gold" />
                <span>{BrandConfig.contact.email}</span>
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full"
              icon={<Calendar className="h-4 w-4" />}
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.querySelector("#consultation");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {locale === "ar" ? "حجز استشارة تنفيذية" : "Book Consultation"}
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
