"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import GenerationSelector from "./GenerationSelector";
import GameModeSwitch from "./GameModeSwitch";
import RoundCountSelector from "./RoundCountSelector";
import RoundSourceSwitch from "./RoundSourceSwitch";
import SpriteModeSwitch from "./SpriteModeSwitch";
import HandicapToggle from "./HandicapToggle";
import Header from "./Header";
import { GameMode } from "@/types/gameMode";
import { RoundSource } from "@/types/roundSource";
import { SpriteMode } from "@/types/spriteMode";
import { HandicapMode } from "@/types/handicapMode";
import { DEFAULT_QUICK_ROUND_COUNT, QuickRoundCount } from "@/lib/quickRounds";

export interface StartOptions {
  generations: number[];
  mode: GameMode;
  roundCount: QuickRoundCount;
  roundSource: RoundSource;
  spriteMode: SpriteMode;
  handicapMode: HandicapMode;
}

interface WelcomeScreenProps {
  onStart: (options: StartOptions) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number[]>([1]);
  const [mode, setMode] = useState<GameMode>("quick");
  const [roundCount, setRoundCount] = useState<QuickRoundCount>(DEFAULT_QUICK_ROUND_COUNT);
  const [roundSource, setRoundSource] = useState<RoundSource>("sprites");
  const [spriteMode, setSpriteMode] = useState<SpriteMode>("silhouette");
  const [handicapMode, setHandicapMode] = useState<HandicapMode>("handicap");

  return (
    <div className="flex flex-col items-center gap-6 py-10 w-full">
      <Header />
      <div className="w-full max-w-sm rounded-[18px] bg-bezel dark:bg-bezel-dark p-5">
        <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark p-5 flex flex-col gap-6">
          <RoundSourceSwitch source={roundSource} onChange={setRoundSource} />
          {roundSource === "sprites" && (
            <div className="flex flex-col gap-3">
              <SpriteModeSwitch spriteMode={spriteMode} onChange={setSpriteMode} />
              <HandicapToggle handicapMode={handicapMode} onChange={setHandicapMode} />
            </div>
          )}
          <GameModeSwitch mode={mode} onChange={setMode} />
          {mode === "quick" && (
            <RoundCountSelector count={roundCount} onChange={setRoundCount} />
          )}
          <GenerationSelector selected={selected} onChange={setSelected} />
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() =>
              onStart({ generations: selected, mode, roundCount, roundSource, spriteMode, handicapMode })
            }
            className="w-full rounded-lg bg-accent text-bezel dark:text-bezel-dark font-bold text-sm py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("welcome.start")}
          </button>
        </div>
      </div>
    </div>
  );
}