"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import GenerationSelector from "./GenerationSelector";
import Header from "./Header";

interface WelcomeScreenProps {
  onStart: (generations: number[]) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number[]>([1]);

  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <Header />
      <div className="w-full max-w-sm rounded-[18px] bg-bezel dark:bg-bezel-dark p-5">
        <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark p-5 flex flex-col gap-6">
          <GenerationSelector selected={selected} onChange={setSelected} />
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => onStart(selected)}
            className="w-full rounded-lg bg-accent text-bezel dark:text-bezel-dark font-bold text-sm py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("welcome.start")}
          </button>
        </div>
      </div>
    </div>
  );
}