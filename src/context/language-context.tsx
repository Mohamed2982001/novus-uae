"use client";

import * as React from "react";
import { dictionaries, Locale, TranslationDictionary } from "@/locales";

export interface LanguageContextValue {
  locale: Locale;
  isRTL: boolean;
  toggleLocale: () => void;
  setLocale: (newLocale: Locale) => void;
  t: (path: string, fallback?: string) => string;
}

const LOCAL_STORAGE_KEY = "novus_preferred_locale";

// Resilient default context value (useful for SSR & standalone component tests)
const defaultLookup = (path: string, fallback?: string): string => {
  const keys = path.split(".");
  let current: unknown = dictionaries.en;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return fallback !== undefined ? fallback : path;
    }
  }
  return typeof current === "string" ? current : fallback !== undefined ? fallback : path;
};

const defaultContextValue: LanguageContextValue = {
  locale: "en",
  isRTL: false,
  toggleLocale: () => {},
  setLocale: () => {},
  t: defaultLookup,
};

const LanguageContext = React.createContext<LanguageContextValue>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");

  // Read saved locale preference upon mounting
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "ar") {
        setLocaleState(saved);
        document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLocale);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "ar" : "en";
      if (typeof document !== "undefined") {
        document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = next;
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  // Nested translation lookup helper
  const t = React.useCallback(
    (path: string, fallback?: string): string => {
      const activeDict = dictionaries[locale] || dictionaries.en;
      const keys = path.split(".");

      // 1. Attempt lookup in active dictionary
      let current: unknown = activeDict;
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          current = undefined;
          break;
        }
      }

      if (typeof current === "string") {
        return current;
      }

      // 2. Fallback to English dictionary if active was Arabic and key wasn't string
      if (locale !== "en") {
        let enCurrent: unknown = dictionaries.en;
        for (const k of keys) {
          if (enCurrent && typeof enCurrent === "object" && k in enCurrent) {
            enCurrent = (enCurrent as Record<string, unknown>)[k];
          } else {
            enCurrent = undefined;
            break;
          }
        }
        if (typeof enCurrent === "string") {
          return enCurrent;
        }
      }

      // 3. Return explicit fallback or path itself
      return fallback !== undefined ? fallback : path;
    },
    [locale]
  );

  const isRTL = locale === "ar";

  const value = React.useMemo<LanguageContextValue>(
    () => ({
      locale,
      isRTL,
      toggleLocale,
      setLocale,
      t,
    }),
    [locale, isRTL, toggleLocale, setLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext);
  return context || defaultContextValue;
}
