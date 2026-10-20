import { en, TranslationDictionary } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";

export const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  ar,
};

export { en, ar };
export type { TranslationDictionary };
