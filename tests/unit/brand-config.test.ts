import { describe, it, expect } from "vitest";
import { BrandConfig } from "@/config/brand.config";

describe("Brand Configuration (Single Source of Truth)", () => {
  it("should have the correct primary brand identity", () => {
    expect(BrandConfig.name).toBe("Novus");
    expect(BrandConfig.domain).toBe("novusuae.co");
    expect(BrandConfig.legalNameEn).toContain("Novus Government & Business Setup");
    expect(BrandConfig.legalNameAr).toContain("نوفوس");
  });

  it("should define the interim monogram symbol correctly", () => {
    expect(BrandConfig.logo.type).toBe("monogram");
    expect(BrandConfig.logo.symbol).toBe("N");
    expect(typeof BrandConfig.logo.symbol).toBe("string");
    expect(BrandConfig.logo.symbol.length).toBeGreaterThan(0);
  });

  it("should contain mathematically valid color formats for all color tokens", () => {
    const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;

    const colorEntries = Object.entries(BrandConfig.colors);
    expect(colorEntries.length).toBeGreaterThan(0);

    for (const [key, value] of colorEntries) {
      const isHex = hexPattern.test(value);
      const isRgba = rgbaPattern.test(value);

      expect(
        isHex || isRgba,
        `Color token "${key}" has invalid format: "${value}". Expected valid HEX (#RRGGBB) or RGBA.`
      ).toBe(true);
    }
  });

  it("should have comprehensive contact and operational telemetry", () => {
    expect(BrandConfig.contact.email).toBe("info@novusuae.co");
    expect(BrandConfig.contact.whatsapp).toMatch(/^\d+$/);
    expect(BrandConfig.contact.phone).toBeDefined();
    expect(BrandConfig.contact.addressEn).toBeDefined();
    expect(BrandConfig.contact.addressAr).toBeDefined();
  });

  it("should define authority metrics and proof points", () => {
    expect(BrandConfig.metrics.visasProcessed).toBe("10,000+");
    expect(BrandConfig.metrics.companiesFormed).toBe("800+");
    expect(BrandConfig.metrics.yearsExperience).toBe("10+");
    expect(BrandConfig.metrics.complianceRate).toBe("100%");
  });
});
