/**
 * Novus UAE — Decoupled Brand Configuration (The 60-Second Rebrander)
 * Single Source of Truth for brand telemetry, interim logo, and luxury Dubai executive colors.
 * Editing this file propagates across the entire platform in under 60 seconds.
 */
export const BrandConfig = {
  name: "Novus",
  legalNameEn: "Novus Government & Business Setup Services LLC",
  legalNameAr: "نوفوس لخدمات تأسيس الأعمال والعلاقات الحكومية ذ.م.م",
  domain: "novusuae.co",
  taglineEn: "Premier UAE Government Relations & Business Setup",
  taglineAr: "الريادة في تأسيس الأعمال والخدمات الحكومية في الإمارات",
  contact: {
    phone: "+971 4 000 0000",
    whatsapp: "971500000000",
    email: "info@novusuae.co",
    addressEn: "Downtown Dubai, Sheikh Zayed Road, UAE",
    addressAr: "وسط مدينة دبي، شارع الشيخ زايد، الإمارات العربية المتحدة",
    workingHoursEn: "Mon - Fri: 8:30 AM - 6:00 PM",
    workingHoursAr: "الإثنين - الجمعة: 8:30 ص - 6:00 م",
  },
  // Official Novus UAE Sovereign Palette from Brand Identity Guide:
  colors: {
    primaryCanvas: "#101e32",       // Official Deep Midnight Navy
    secondaryCanvas: "#0c1726",     // Deeper Slate Navy
    elevatedSurface: "#182c47",     // Raised Glass Layer
    accentGold: "#b6965e",          // Official Warm Champagne Desert Gold
    accentGoldHover: "#c5a059",     // Radiant Imperial Gold
    accentGoldGlow: "rgba(182, 150, 94, 0.25)",
    surfaceGlass: "rgba(16, 30, 50, 0.75)",
    surfaceBorder: "rgba(182, 150, 94, 0.20)",
    textPrimary: "#f4eee3",         // Official Pearl Ivory
    textSecondary: "#cbd5e1",       // Silver Mist
    textMuted: "#94a3b8",           // Platinum Slate
  },
  logo: {
    type: "monogram" as const, // 'monogram' | 'custom_svg' | 'image'
    symbol: "N",
    customPath: "/assets/brand/novus-icon-dark.svg",
    iconDark: "/assets/brand/novus-icon-dark.svg",
    iconLight: "/assets/brand/novus-icon-light.svg",
    logoEn: "/assets/brand/novus-logo-en.svg",
    logoAr: "/assets/brand/novus-logo-ar.svg",
    logoHorizontalEn: "/assets/brand/novus-logo-h-en.svg",
  },
  metrics: {
    visasProcessed: "10,000+",
    companiesFormed: "800+",
    yearsExperience: "10+",
    complianceRate: "100%",
  },
};

export type BrandConfigType = typeof BrandConfig;
