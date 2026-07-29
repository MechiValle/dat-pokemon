"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGenerationPool } from "@/hooks/useGenerationPool";
import { GameMode } from "@/types/gameMode";
import { selectQuickPool, DEFAULT_QUICK_ROUND_COUNT, QuickRoundCount } from "@/lib/quickRounds";
import WelcomeScreen from "@/components/WelcomeScreen";
import LoadingScreen from "@/components/LoadingScreen";
import GameScreen from "@/components/GameScreen";
import ResultsScreen from "@/components/ResultsScreen";
import GameOverScreen from "@/components/GameOverScreen";

interface MatchResult {
  correctCount: number;
  total: number;
  elapsedSeconds: number;
}

export default function Home() {
  const { t } = useTranslation();
  const { status, pokemon, loaded, total, load, reset } = useGenerationPool();
  const [mode, setMode] = useState<GameMode>("quick");
  const [roundCount, setRoundCount] = useState<QuickRoundCount>(DEFAULT_QUICK_ROUND_COUNT);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleStart = useCallback(
    (generations: number[], selectedMode: GameMode, selectedRoundCount: QuickRoundCount) => {
      setResult(null);
      setIsGameOver(false);
      setMode(selectedMode);
      setRoundCount(selectedRoundCount);
      load(generations);
    },
    [load]
  );

  const handleFinish = useCallback(
    (correctCount: number, matchTotal: number, elapsedSeconds: number) => {
      setResult({ correctCount, total: matchTotal, elapsedSeconds });
    },
    []
  );

  const handleTimeout = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const handleBackToMenu = useCallback(() => {
    setResult(null);
    setIsGameOver(false);
    reset();
  }, [reset]);

  const handlePlayAgain = useCallback(() => {
    window.location.reload();
  }, []);

  const activePool = mode === "quick" ? selectQuickPool(pokemon, roundCount) : pokemon;

  return (
    <main className="min-h-screen bg-page-light dark:bg-page-dark flex items-center justify-center px-4">
      {status === "idle" && <WelcomeScreen onStart={handleStart} />}
      {status === "loading" && <LoadingScreen loaded={loaded} total={total} />}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 text-bezel dark:text-white">
          <p className="text-sm">{t("error.message")}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-accent text-bezel font-bold text-sm px-6 py-2.5"
          >
            {t("error.retry")}
          </button>
        </div>
      )}
      {status === "ready" && !result && !isGameOver && (
        <GameScreen
          pool={activePool}
          mode={mode}
          onFinish={handleFinish}
          onTimeout={handleTimeout}
          onBackToMenu={handleBackToMenu}
        />
      )}
      {status === "ready" && isGameOver && <GameOverScreen onBackToMenu={handleBackToMenu} />}
      {status === "ready" && result && (
        <ResultsScreen
          correctCount={result.correctCount}
          total={result.total}
          elapsedSeconds={result.elapsedSeconds}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </main>
  );
}