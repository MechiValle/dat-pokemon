"use client";

import { useTranslation } from "react-i18next";
import { GameMode } from "@/types/gameMode";

interface GameModeSwitchProps {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
}

export default function GameModeSwitch({ mode, onChange }: GameModeSwitchProps) {
  const { t } = useTranslation();

  return (
    <div className="flex rounded-lg bg-bezel/10 dark:bg-white/10 p-1 gap-1">
      <button
        type="button"
        onClick={() => onChange("full")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          mode === "full" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.fullMode")}
      </button>
      <button
        type="button"
        onClick={() => onChange("quick")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          mode === "quick" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.quickMode")}
      </button>
    </div>
  );
}