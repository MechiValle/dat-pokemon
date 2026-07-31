"use client";

import { useTranslation } from "react-i18next";
import { SpriteMode } from "@/types/spriteMode";

interface SpriteModeSwitchProps {
  spriteMode: SpriteMode;
  onChange: (mode: SpriteMode) => void;
}

export default function SpriteModeSwitch({ spriteMode, onChange }: SpriteModeSwitchProps) {
  const { t } = useTranslation();

  return (
    <div className="flex rounded-lg bg-bezel/10 dark:bg-white/10 p-1 gap-1">
      <button
        type="button"
        onClick={() => onChange("silhouette")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          spriteMode === "silhouette" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.silhouetteMode")}
      </button>
      <button
        type="button"
        onClick={() => onChange("cropped")}
        className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
          spriteMode === "cropped" ? "bg-accent text-bezel" : "text-bezel dark:text-white"
        }`}
      >
        {t("welcome.croppedMode")}
      </button>
    </div>
  );
}