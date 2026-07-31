"use client";

import { useTranslation } from "react-i18next";
import { RoundSource } from "@/types/roundSource";

interface RoundSourceSwitchProps {
  source: RoundSource;
  onChange: (source: RoundSource) => void;
}

export default function RoundSourceSwitch({ source, onChange }: RoundSourceSwitchProps) {
  const { t } = useTranslation();

  return (
    <div className="flex rounded-lg bg-bezel/10 dark:bg-white/10 p-1 gap-1">
      <button
        type="button"
        onClick={() => onChange("sprites")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          source === "sprites" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.spritesMode")}
      </button>
      <button
        type="button"
        onClick={() => onChange("cries")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          source === "cries" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.criesMode")}
      </button>
    </div>
  );
}