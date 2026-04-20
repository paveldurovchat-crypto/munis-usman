import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ru } from "@/locales/ru";
import { en } from "@/locales/en";

export type Lang = "ru" | "en";
type Dict = typeof ru;

const dictionaries: Record<Lang, Dict> = { ru, en };

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "munis-lang";

function resolveKey(dict: Dict, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const p of parts) {
    if (current && typeof current === "object" && p in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[p];
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ru" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const t = (key: string) => resolveKey(dictionaries[lang], key);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
