"use client";

import { useTranslation } from "react-i18next";
import { getRatingTier } from "@/lib/ratingTiers";
import { formatTime } from "@/lib/formatTime";
import Header from "./Header";

interface ResultsScreenProps {
  correctCount: number;
  total: number;
  elapsedSeconds: number;
  onPlayAgain: () => void;
}

export default function ResultsScreen({
  correctCount,
  total,
  elapsedSeconds,
  onPlayAgain,
}: ResultsScreenProps) {
  const { t } = useTranslation();
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const tier = getRatingTier(percent);

  return (
    <div className="flex flex-col items-center gap-6 py-6 w-full">
      <Header />
      <div className="w-full max-w-sm rounded-[18px] bg-bezel dark:bg-bezel-dark p-5">
        <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark p-6 flex flex-col items-center text-center gap-1">
          <span className="text-xs font-bold text-bezel/50 dark:text-white/50">
            {tier.minPercent}-{tier.maxPercent}%
          </span>
          <span className="text-lg font-bold text-bezel dark:text-white mt-1">
            {t(tier.titleKey)}
          </span>
          <span className="text-xs text-bezel/70 dark:text-white/70 leading-relaxed mt-1">
            {t(tier.descriptionKey)}
          </span>
          <div className="flex gap-8 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-accent">{correctCount}/{total}</span>
              <span className="text-[10px] text-bezel/50 dark:text-white/50">{t("results.correct")}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-bezel dark:text-white">{formatTime(elapsedSeconds)}</span>
              <span className="text-[10px] text-bezel/50 dark:text-white/50">{t("results.time")}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onPlayAgain}
            className="mt-4 rounded-lg bg-accent text-bezel dark:text-bezel-dark font-bold text-sm px-6 py-2.5"
          >
            {t("results.playAgain")}
          </button>
        </div>
      </div>
    </div>
  );
}