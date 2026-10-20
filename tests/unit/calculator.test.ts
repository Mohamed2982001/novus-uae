import { describe, it, expect } from "vitest";
import { calculateSetupCost, formatCurrency, generateWhatsAppQuoteUrl } from "@/lib/calculator/engine";
import { SetupConfig } from "@/lib/calculator/types";
import { AED_TO_USD_RATE } from "@/lib/calculator/constants";

describe("Sprint 5: UAE Business Setup Cost Calculator Engine", () => {
  it("calculates Mainland baseline accurately (0 visas, no addons)", () => {
    const config: SetupConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: 0,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const result = calculateSetupCost(config);

    expect(result.baseLicenseFee).toBe(18500);
    expect(result.activitySurcharge).toBe(0);
    expect(result.visaTotalFee).toBe(0);
    expect(result.officeFee).toBe(0);
    expect(result.addonsTotal).toBe(0);
    expect(result.totalAED).toBe(18500);
    expect(result.totalUSD).toBe(Math.round(18500 / AED_TO_USD_RATE));
    expect(result.estimatedTimelineDays).toEqual({ min: 3, max: 5 });
    expect(result.itemizedBreakdown.length).toBe(1);
    expect(result.itemizedBreakdown[0].id).toBe("base-license");
  });

  it("calculates Free Zone with 2 residence visas and corporate bank account addon", () => {
    const config: SetupConfig = {
      jurisdiction: "freezone",
      activity: "commercial",
      visaCount: 2,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: true,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const result = calculateSetupCost(config);

    expect(result.baseLicenseFee).toBe(12500);
    expect(result.visaTotalFee).toBe(7000); // 2 * 3500
    expect(result.addonsTotal).toBe(3500);
    // Taxable portion: 3500 (bank addon), VAT = 175
    expect(result.vatAED).toBe(175);
    expect(result.totalAED).toBe(12500 + 7000 + 3500 + 175);
    expect(result.totalUSD).toBe(Math.round(result.totalAED / AED_TO_USD_RATE));
    // Timeline expanded due to visas (+2 min, +3 max)
    expect(result.estimatedTimelineDays.min).toBe(4);
    expect(result.estimatedTimelineDays.max).toBe(7);
  });

  it("calculates Offshore configuration with zero visas", () => {
    const config: SetupConfig = {
      jurisdiction: "offshore",
      activity: "professional",
      visaCount: 0,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const result = calculateSetupCost(config);

    expect(result.baseLicenseFee).toBe(9500);
    expect(result.totalAED).toBe(9500);
    expect(result.estimatedTimelineDays).toEqual({ min: 5, max: 7 });
  });

  it("calculates Golden Visa assistance package fee addition", () => {
    const config: SetupConfig = {
      jurisdiction: "mainland",
      activity: "professional",
      visaCount: 1,
      goldenVisa: true,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const result = calculateSetupCost(config);

    // Visas fee = 1 * 3500 + 6500 (Golden Visa) = 10000
    expect(result.visaTotalFee).toBe(10000);
    expect(result.totalAED).toBe(18500 + 10000);
  });

  it("applies activity regulatory surcharges for industrial and general trading", () => {
    const industrialConfig: SetupConfig = {
      jurisdiction: "mainland",
      activity: "industrial",
      visaCount: 0,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const industrialResult = calculateSetupCost(industrialConfig);
    expect(industrialResult.activitySurcharge).toBe(5000);
    expect(industrialResult.totalAED).toBe(18500 + 5000);

    const generalTradingConfig: SetupConfig = {
      jurisdiction: "mainland",
      activity: "general_trading",
      visaCount: 0,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const gtResult = calculateSetupCost(generalTradingConfig);
    expect(gtResult.activitySurcharge).toBe(8000);
    expect(gtResult.totalAED).toBe(18500 + 8000);
  });

  it("formats currency strings consistently for AED and USD", () => {
    expect(formatCurrency(18500, "AED")).toBe("AED 18,500");
    expect(formatCurrency(5037.44, "USD")).toBe("USD 5,037");
  });

  it("generates correctly formatted and escaped WhatsApp quote URL in English and Arabic", () => {
    const config: SetupConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: 2,
      goldenVisa: true,
      addons: {
        bankAccountAssistance: true,
        corporateTaxVat: true,
        physicalOfficeFlexi: true,
      },
    };

    const result = calculateSetupCost(config);
    const urlEn = generateWhatsAppQuoteUrl(config, result, "+971 50 000 0000", "en");
    expect(urlEn).toContain("https://wa.me/971500000000");
    const decodedEn = decodeURIComponent(urlEn);
    expect(decodedEn).toContain("*Quote Ref:* NVS-");
    expect(decodedEn).toContain("Dubai Mainland (DET / DED)");

    const urlAr = generateWhatsAppQuoteUrl(config, result, "+971 50 000 0000", "ar");
    const decodedAr = decodeURIComponent(urlAr);
    expect(decodedAr).toContain("عرض سعر لتأسيس شركة");
    expect(decodedAr).toContain("البر الرئيسي في دبي");
  });

  // ==========================================
  // ABNORMAL / EDGE CASE STRESS TESTS
  // ==========================================

  it("handles negative visa count defensively by clamping to 0", () => {
    const abnormalConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: -5,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    } as SetupConfig;

    const result = calculateSetupCost(abnormalConfig);
    expect(result.visaTotalFee).toBe(0);
    expect(result.totalAED).toBe(18500);
    // Should NOT have negative visas in breakdown
    expect(result.itemizedBreakdown.some((item) => item.id === "residence-visas")).toBe(false);
  });

  it("handles floating-point fractional visa count defensively by flooring", () => {
    const floatConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: 3.8,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    } as SetupConfig;

    const result = calculateSetupCost(floatConfig);
    // 3 visas * 3500 = 10500
    expect(result.visaTotalFee).toBe(10500);
  });

  it("handles extreme high-volume corporate visas without numeric overflow", () => {
    const highVolumeConfig: SetupConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: 50,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: false,
        corporateTaxVat: false,
        physicalOfficeFlexi: false,
      },
    };

    const result = calculateSetupCost(highVolumeConfig);
    expect(result.visaTotalFee).toBe(50 * 3500); // 175,000 AED
    expect(result.totalAED).toBe(18500 + 175000);
    expect(result.totalUSD).toBe(Math.round((18500 + 175000) / AED_TO_USD_RATE));
  });

  it("handles unknown or malformed jurisdiction gracefully with default fallback", () => {
    const malformedConfig = {
      jurisdiction: "unknown_metaverse_zone",
      activity: "commercial",
      visaCount: 1,
      goldenVisa: false,
      addons: {},
    } as unknown as SetupConfig;

    const result = calculateSetupCost(malformedConfig);
    // Safely falls back to mainland default
    expect(result.baseLicenseFee).toBe(18500);
    expect(result.totalAED).toBeGreaterThan(0);
  });

  it("handles unknown or malformed activity gracefully with default fallback", () => {
    const malformedActivityConfig = {
      jurisdiction: "freezone",
      activity: "unregistered_space_mining",
      visaCount: 0,
      goldenVisa: false,
      addons: {},
    } as unknown as SetupConfig;

    const result = calculateSetupCost(malformedActivityConfig);
    expect(result.baseLicenseFee).toBe(12500);
    expect(result.activitySurcharge).toBe(0);
  });

  it("handles missing or partially undefined addons object safely without error", () => {
    const emptyAddonsConfig = {
      jurisdiction: "mainland",
      activity: "commercial",
      visaCount: 0,
      goldenVisa: false,
      addons: undefined as unknown as SetupConfig["addons"],
    } as SetupConfig;

    const result = calculateSetupCost(emptyAddonsConfig);
    expect(result.officeFee).toBe(0);
    expect(result.addonsTotal).toBe(0);
    expect(result.vatAED).toBe(0);
    expect(result.totalAED).toBe(18500);
  });

  it("calculates statutory 5% VAT exclusively on taxable services while government fees remain exempt", () => {
    const allAddonsConfig: SetupConfig = {
      jurisdiction: "mainland", // 18,500 government fee (0% VAT)
      activity: "commercial",
      visaCount: 0,
      goldenVisa: false,
      addons: {
        bankAccountAssistance: true, // 3,500
        corporateTaxVat: true, // 2,000
        physicalOfficeFlexi: true, // 2,500
      },
    };

    const result = calculateSetupCost(allAddonsConfig);
    const taxableTotal = 3500 + 2000 + 2500; // 8,000 AED
    const expectedVAT = Math.round(8000 * 0.05); // 400 AED
    expect(result.vatAED).toBe(400);
    expect(result.totalAED).toBe(18500 + 8000 + expectedVAT);
  });
});
