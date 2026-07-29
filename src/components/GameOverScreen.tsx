"use client";

import { useTranslation } from "react-i18next";
import Header from "./Header";

interface GameOverScreenProps {
  onBackToMenu: () => void;
}

export default function GameOverScreen({ onBackToMenu }: GameOverScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <Header />
      <div className="w-full max-w-sm rounded-[18px] bg-bezel dark:bg-bezel-dark p-5">
        <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark p-6 flex flex-col items-center text-center gap-3">
          <span className="text-lg font-bold text-bezel dark:text-white">
            {t("gameOver.title")}
          </span>
          <span className="text-xs text-bezel/70 dark:text-white/70">
            {t("gameOver.subtitle")}
          </span>
          <button
            type="button"
            onClick={onBackToMenu}
            className="mt-2 rounded-lg bg-accent text-bezel dark:text-bezel-dark font-bold text-sm px-6 py-2.5"
          >
            {t("game.backToMenu")}
          </button>
        </div>
      </div>
    </div>
  );
}