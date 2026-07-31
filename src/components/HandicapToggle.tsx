"use client";

import { useTranslation } from "react-i18next";
import { HandicapMode } from "@/types/handicapMode";

interface HandicapToggleProps {
  handicapMode: HandicapMode;
  onChange: (mode: HandicapMode) => void;
}

export default function HandicapToggle({ handicapMode, onChange }: HandicapToggleProps) {
  const { t } = useTranslation();
  const isHandicapOn = handicapMode === "handicap";

  return (
    <label className="flex items-center gap-2 text-sm font-bold text-bezel dark:text-white">
      <input
        type="checkbox"
        checked={isHandicapOn}
        onChange={() => onChange(isHandicapOn ? "no-handicap" : "handicap")}
        className="h-4 w-4 accent-accent"
      />
      {t("welcome.handicapCheckbox")}
    </label>
  );
}