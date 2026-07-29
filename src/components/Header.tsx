"use client";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  useDocumentTitle();

  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  }

  return (
    <div className="w-full max-w-2xl flex items-center justify-between mb-4 px-1">
      <h1 className="font-pixel text-[10px] sm:text-xs text-bezel dark:text-white leading-relaxed">
        {t("header.title")}
      </h1>
      <div className="flex items-center gap-3 text-bezel dark:text-white shrink-0">
        <button
          type="button"
          onClick={toggleLanguage}
          className="text-xs font-bold w-7 h-7 rounded-full bg-bezel/10 dark:bg-white/10"
        >
          {i18n.language === "en" ? "ES" : "EN"}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-7 h-7 rounded-full bg-bezel/10 dark:bg-white/10 flex items-center justify-center text-sm"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}