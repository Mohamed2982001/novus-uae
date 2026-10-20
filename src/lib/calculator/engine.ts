import { SetupConfig, CalculationResult, ItemizedFee } from "./types";
import {
  AED_TO_USD_RATE,
  JURISDICTIONS,
  ACTIVITIES,
  RESIDENCE_VISA_UNIT_FEE_AED,
  GOLDEN_VISA_ASSISTANCE_FEE_AED,
  ADDONS_CATALOG,
} from "./constants";

export function formatCurrency(amount: number, currency: "AED" | "USD" = "AED"): string {
  const formatted = Math.round(amount).toLocaleString();
  return `${currency} ${formatted}`;
}

export function calculateSetupCost(config: SetupConfig): CalculationResult {
  const jurisdictionMeta =
    JURISDICTIONS.find((j) => j.id === config.jurisdiction) || JURISDICTIONS[0];
  const activityMeta =
    ACTIVITIES.find((a) => a.id === config.activity) || ACTIVITIES[0];

  const baseLicenseFee = jurisdictionMeta.baseFeeAED;
  const activitySurcharge = activityMeta.surchargeAED;

  const safeVisaCount = Math.max(0, Math.floor(Number(config.visaCount) || 0));
  const residenceVisasFee = safeVisaCount * RESIDENCE_VISA_UNIT_FEE_AED;
  const goldenVisaFee = config.goldenVisa ? GOLDEN_VISA_ASSISTANCE_FEE_AED : 0;
  const visaTotalFee = residenceVisasFee + goldenVisaFee;

  let officeFee = 0;
  let addonsTotal = 0;

  const itemizedBreakdown: ItemizedFee[] = [];

  // 1. Government Base License
  itemizedBreakdown.push({
    id: "base-license",
    labelEn: `${jurisdictionMeta.titleEn} Base License`,
    labelAr: `الرسوم الأساسية لرخصة ${jurisdictionMeta.titleAr}`,
    amountAED: baseLicenseFee,
    amountUSD: Math.round(baseLicenseFee / AED_TO_USD_RATE),
    category: "government",
  });

  // 2. Activity Regulatory Surcharge (if any)
  if (activitySurcharge > 0) {
    itemizedBreakdown.push({
      id: "activity-surcharge",
      labelEn: `${activityMeta.titleEn} Regulatory Approval Fee`,
      labelAr: `رسوم الموافقات التنظيمية لـ ${activityMeta.titleAr}`,
      amountAED: activitySurcharge,
      amountUSD: Math.round(activitySurcharge / AED_TO_USD_RATE),
      category: "government",
    });
  }

  // 3. Residence Visas
  if (safeVisaCount > 0) {
    itemizedBreakdown.push({
      id: "residence-visas",
      labelEn: `${safeVisaCount}x UAE Residence Visa Package (Medical + EID)`,
      labelAr: `${safeVisaCount}x باقة إقامة وتأشيرة عمل (فحص طبي + هوية)`,
      amountAED: residenceVisasFee,
      amountUSD: Math.round(residenceVisasFee / AED_TO_USD_RATE),
      category: "visas",
    });
  }

  // 4. Golden Visa Nomination
  if (config.goldenVisa) {
    itemizedBreakdown.push({
      id: "golden-visa",
      labelEn: "10-Year Golden Visa Nomination & Processing Concierge",
      labelAr: "ملف ترشيح ومعاملات الإقامة الذهبية لـ 10 سنوات",
      amountAED: goldenVisaFee,
      amountUSD: Math.round(goldenVisaFee / AED_TO_USD_RATE),
      category: "visas",
    });
  }

  // 5. Addons
  for (const addon of ADDONS_CATALOG) {
    if (config.addons && config.addons[addon.id]) {
      const isOffice = addon.id === "physicalOfficeFlexi";
      if (isOffice) {
        officeFee += addon.feeAED;
      } else {
        addonsTotal += addon.feeAED;
      }

      itemizedBreakdown.push({
        id: addon.id,
        labelEn: addon.titleEn,
        labelAr: addon.titleAr,
        amountAED: addon.feeAED,
        amountUSD: Math.round(addon.feeAED / AED_TO_USD_RATE),
        category: isOffice ? "office" : "advisory",
      });
    }
  }

  const subtotalAED =
    baseLicenseFee +
    activitySurcharge +
    visaTotalFee +
    officeFee +
    addonsTotal;

  // Realistic VAT (5% on advisory & commercial lease services)
  const taxablePortion = officeFee + addonsTotal;
  const vatAED = Math.round(taxablePortion * 0.05);

  const totalAED = subtotalAED + vatAED;
  const totalUSD = Math.round(totalAED / AED_TO_USD_RATE);

  // Timeline calculation
  let minDays = jurisdictionMeta.timeline.min;
  let maxDays = jurisdictionMeta.timeline.max;

  if (safeVisaCount > 0 || config.goldenVisa) {
    minDays += 2;
    maxDays += 3;
  }
  if (activitySurcharge > 0) {
    minDays += 1;
    maxDays += 2;
  }

  return {
    baseLicenseFee,
    activitySurcharge,
    visaTotalFee,
    officeFee,
    addonsTotal,
    subtotalAED,
    vatAED,
    totalAED,
    totalUSD,
    estimatedTimelineDays: {
      min: minDays,
      max: maxDays,
    },
    itemizedBreakdown,
  };
}

export function generateWhatsAppQuoteUrl(
  config: SetupConfig,
  result: CalculationResult,
  phone: string,
  lang: "en" | "ar" = "en"
): string {
  const jurisdictionMeta =
    JURISDICTIONS.find((j) => j.id === config.jurisdiction) || JURISDICTIONS[0];
  const activityMeta =
    ACTIVITIES.find((a) => a.id === config.activity) || ACTIVITIES[0];

  const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const quoteRef = `NVS-${dateCode}-${Math.floor(1000 + Math.random() * 9000)}`;

  let text = "";

  if (lang === "ar") {
    text =
      `مرحباً فريق نوفوس (Novus UAE)،\n` +
      `أود الاستفسار واعتماد عرض سعر لتأسيس شركة بالبيانات التالية:\n\n` +
      `📌 *رمز العرض:* ${quoteRef}\n` +
      `🏢 *الولاية القضائية:* ${jurisdictionMeta.titleAr}\n` +
      `💼 *نوع النشاط:* ${activityMeta.titleAr}\n` +
      `🛂 *عدد الإقامات:* ${config.visaCount} تأشيرة\n` +
      `⭐ *الإقامة الذهبية (10 سنوات):* ${config.goldenVisa ? "نعم" : "لا"}\n` +
      `🏦 *فتح حساب بنكي:* ${config.addons.bankAccountAssistance ? "نعم" : "لا"}\n` +
      `📑 *التسجيل الضريبي (VAT):* ${config.addons.corporateTaxVat ? "نعم" : "لا"}\n` +
      `🏢 *عقد إيجاري / مكتب:* ${config.addons.physicalOfficeFlexi ? "نعم" : "لا"}\n\n` +
      `💰 *إجمالي التقدير:* ${formatCurrency(result.totalAED, "AED")} (${formatCurrency(result.totalUSD, "USD")})\n` +
      `⏱️ *المدة المتوقعة:* ${result.estimatedTimelineDays.min} إلى ${result.estimatedTimelineDays.max} أيام عمل\n\n` +
      `يرجى التواصل معي لتنسيق الخطوات وبدء الإجراءات.`;
  } else {
    text =
      `Hello Novus Team,\n` +
      `I have configured a UAE Business Setup quote on your executive platform:\n\n` +
      `📌 *Quote Ref:* ${quoteRef}\n` +
      `🏢 *Jurisdiction:* ${jurisdictionMeta.titleEn}\n` +
      `💼 *Activity:* ${activityMeta.titleEn}\n` +
      `🛂 *Residence Visas:* ${config.visaCount}\n` +
      `⭐ *10-Year Golden Visa:* ${config.goldenVisa ? "Yes" : "No"}\n` +
      `🏦 *Corporate Bank Account:* ${config.addons.bankAccountAssistance ? "Yes" : "No"}\n` +
      `📑 *Corporate Tax & VAT Pack:* ${config.addons.corporateTaxVat ? "Yes" : "No"}\n` +
      `🏢 *Commercial Ejari Lease:* ${config.addons.physicalOfficeFlexi ? "Yes" : "No"}\n\n` +
      `💰 *Estimated Total:* ${formatCurrency(result.totalAED, "AED")} (${formatCurrency(result.totalUSD, "USD")})\n` +
      `⏱️ *Estimated Timeline:* ${result.estimatedTimelineDays.min}–${result.estimatedTimelineDays.max} Business Days\n\n` +
      `Please connect me with a senior licensing director to proceed.`;
  }

  const encoded = encodeURIComponent(text);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
