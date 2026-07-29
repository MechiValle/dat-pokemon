"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGenerationPool } from "@/hooks/useGenerationPool";
import WelcomeScreen from "@/components/WelcomeScreen";
import LoadingScreen from "@/components/LoadingScreen";
import GameScreen from "@/components/GameScreen";
import ResultsScreen from "@/components/ResultsScreen";

interface MatchResult {
  correctCount: number;
  total: number;
  elapsedSeconds: number;
}

export default function Home() {
  const { t } = useTranslation();
  const { status, pokemon, loaded, total, load, reset } = useGenerationPool();
  const [result, setResult] = useState<MatchResult | null>(null);

  const handleStart = useCallback((generations: number[]) => {
    setResult(null);
    load(generations);
  }, [load]);

  const handleFinish = useCallback((correctCount: number, matchTotal: number, elapsedSeconds: number) => {
    setResult({ correctCount, total: matchTotal, elapsedSeconds });
  }, []);

  const handleBackToMenu = useCallback(() => {
    setResult(null);
    reset();
  }, [reset]);

  const handlePlayAgain = useCallback(() => {
    window.location.reload();
  }, []);

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
      {status === "ready" && !result && (
        <GameScreen pool={pokemon} onFinish={handleFinish} onBackToMenu={handleBackToMenu} />
      )}
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