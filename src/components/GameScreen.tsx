"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "@/hooks/useGame";
import { useTimer } from "@/hooks/useTimer";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { Pokemon } from "@/types/pokemon";
import { GameMode } from "@/types/gameMode";
import { QUICK_ROUND_SECONDS } from "@/lib/quickRounds";
import { formatTime } from "@/lib/formatTime";
import SilhouetteImage from "./SilhouetteImage";
import AutocompleteInput from "./AutocompleteInput";
import Header from "./Header";

interface GameScreenProps {
  pool: Pokemon[];
  mode: GameMode;
  onFinish: (correctCount: number, total: number, elapsedSeconds: number) => void;
  onTimeout: () => void;
  onBackToMenu: () => void;
}

export default function GameScreen({
  pool,
  mode,
  onFinish,
  onTimeout,
  onBackToMenu,
}: GameScreenProps) {
  const { t } = useTranslation();
  const { currentRound, correctCount, total, matchStatus, isRevealed, submitGuess, pass } =
    useGame(pool);

  const isPlaying = matchStatus === "playing";
  const elapsedUp = useTimer(mode === "full" && isPlaying);
  const remaining = useCountdownTimer(QUICK_ROUND_SECONDS, mode === "quick" && isPlaying, onTimeout);

  const displaySeconds = mode === "quick" ? remaining : elapsedUp;
  const elapsedForResults = mode === "quick" ? QUICK_ROUND_SECONDS - remaining : elapsedUp;

  const pokemonNames = pool.map((p) => p.name);

  useEffect(() => {
    if (matchStatus === "finished") {
      onFinish(correctCount, total, elapsedForResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchStatus]);

  if (!currentRound) return null;

  const isCorrect = isRevealed && currentRound.status === "correct";
  const isWrong =
    isRevealed && (currentRound.status === "incorrect" || currentRound.status === "passed");

  const feedbackClass = isCorrect
    ? "animate-[pop_400ms_ease-out] ring-4 ring-accent"
    : isWrong
    ? "animate-[shake_500ms_ease-in-out] ring-4 ring-pass"
    : "";

  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full">
      <Header />
      <div
        key={`${currentRound.pokemon.id}-${isRevealed}`}
        className={`w-full max-w-2xl rounded-[18px] bg-bezel dark:bg-bezel-dark p-5 ${feedbackClass}`}
      >
        <div className="flex justify-between px-1 pb-3 text-sm font-bold text-white">
          <span>{formatTime(displaySeconds)}</span>
          <span>
            {correctCount}/{total}
          </span>
        </div>
        <div className="rounded-xl bg-screen-light-inner dark:bg-screen-dark p-5 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1 flex justify-center">
            <SilhouetteImage pokemon={currentRound.pokemon} isRevealed={isRevealed} />
          </div>
          <div className="flex-1">
            <AutocompleteInput
              pokemonNames={pokemonNames}
              onSubmit={submitGuess}
              onPass={pass}
              disabled={isRevealed}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onBackToMenu}
        className="text-xs font-bold text-bezel/60 dark:text-white/60 hover:text-bezel dark:hover:text-white underline underline-offset-2"
      >
        {t("game.backToMenu")}
      </button>
    </div>
  );
}