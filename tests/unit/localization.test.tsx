import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";
import { dictionaries } from "@/locales";
import { LanguageProvider, useLanguage } from "@/context/language-context";

function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value as Record<string, unknown>, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

function TestConsumer() {
  const { locale, isRTL, toggleLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="isRTL">{isRTL ? "true" : "false"}</span>
      <span data-testid="text">{t("nav.bookConsultation")}</span>
      <button onClick={toggleLocale}>Toggle</button>
    </div>
  );
}

describe("Bilingual Localization Parity (EN ↔ AR)", () => {
  const enKeys = getAllKeys(en as unknown as Record<string, unknown>);
  const arKeys = getAllKeys(ar as unknown as Record<string, unknown>);

  it("ensures all English keys exist in Arabic dictionary (100% key parity)", () => {
    const missingInAr = enKeys.filter((key) => !arKeys.includes(key));
    expect(missingInAr).toEqual([]);
  });

  it("ensures all Arabic keys exist in English dictionary (no extraneous keys)", () => {
    const missingInEn = arKeys.filter((key) => !enKeys.includes(key));
    expect(missingInEn).toEqual([]);
  });

  it("ensures no English translation strings are empty or untranslated", () => {
    for (const key of enKeys) {
      const val = getValueByPath(en as unknown as Record<string, unknown>, key);
      expect(typeof val).toBe("string");
      expect((val as string).trim().length).toBeGreaterThan(0);
    }
  });

  it("ensures no Arabic translation strings are empty or untranslated", () => {
    for (const key of arKeys) {
      const val = getValueByPath(ar as unknown as Record<string, unknown>, key);
      expect(typeof val).toBe("string");
      expect((val as string).trim().length).toBeGreaterThan(0);
    }
  });

  it("resolves nested keys accurately for both locales", () => {
    expect(en.nav.bookConsultation).toBe("Book Consultation");
    expect(ar.nav.bookConsultation).toBe("حجز استشارة");
    expect(en.consultation.submitBtn).toContain("Submit");
    expect(ar.consultation.submitBtn).toContain("إرسال");
  });

  it("verifies dictionary bundle contains both locales", () => {
    expect(dictionaries.en).toBeDefined();
    expect(dictionaries.ar).toBeDefined();
  });
});

describe("LanguageProvider React Context", () => {
  it("provides initial English state and toggles to Arabic dynamically without page reload", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
    expect(screen.getByTestId("isRTL").textContent).toBe("false");
    expect(screen.getByTestId("text").textContent).toBe("Book Consultation");

    fireEvent.click(screen.getByRole("button", { name: "Toggle" }));

    expect(screen.getByTestId("locale").textContent).toBe("ar");
    expect(screen.getByTestId("isRTL").textContent).toBe("true");
    expect(screen.getByTestId("text").textContent).toBe("حجز استشارة");
  });
});
