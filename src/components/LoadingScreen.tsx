"use client";

import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  loaded: number;
  total: number;
}

export default function LoadingScreen({ loaded, total }: LoadingScreenProps) {
  const { t } = useTranslation();
  const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div className="rounded-[18px] bg-bezel dark:bg-bezel-dark p-4 w-full max-w-sm">
      <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark flex flex-col items-center justify-center gap-3 py-10 px-6">
        <span className="text-sm font-bold text-bezel dark:text-white">{t("loading.label")}</span>
        <div className="w-full max-w-xs h-2 rounded-full bg-bezel/20 dark:bg-white/10 overflow-hidden">
          <div className="h-full bg-accent transition-all duration-200" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-xs text-bezel/70 dark:text-white/70">{loaded} / {total}</span>
      </div>
    </div>
  );
}