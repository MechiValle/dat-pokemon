"use client";

import { useState, useCallback, useRef } from "react";
import { Pokemon } from "@/types/pokemon";
import { Round, RoundStatus } from "@/types/round";
import { shuffle } from "@/lib/shuffle";

export type MatchStatus = "playing" | "finished";

const REVEAL_DELAY_MS = 900;

export function useGame(pool: Pokemon[]) {
  const [rounds] = useState<Round[]>(() =>
    shuffle(pool).map((pokemon) => ({ pokemon, status: "pending" as RoundStatus }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [resolvedRounds, setResolvedRounds] = useState<Round[]>(rounds);
  const advanceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentRound = resolvedRounds[currentIndex] ?? null;
  const correctCount = resolvedRounds.filter((r) => r.status === "correct").length;
  const matchStatus: MatchStatus =
    currentIndex >= resolvedRounds.length ? "finished" : "playing";

  const resolveRound = useCallback(
    (status: RoundStatus) => {
      setResolvedRounds((prev) => {
        const next = [...prev];
        next[currentIndex] = { ...next[currentIndex], status };
        return next;
      });
      setIsRevealed(true);

      advanceTimeout.current = setTimeout(() => {
        setIsRevealed(false);
        setCurrentIndex((i) => i + 1);
      }, REVEAL_DELAY_MS);
    },
    [currentIndex]
  );

  const submitGuess = useCallback(
    (name: string) => {
      if (!currentRound || isRevealed) return;
      const isCorrect =
        name.trim().toLowerCase() === currentRound.pokemon.name.toLowerCase();
      resolveRound(isCorrect ? "correct" : "incorrect");
    },
    [currentRound, isRevealed, resolveRound]
  );

  const pass = useCallback(() => {
    if (!currentRound || isRevealed) return;
    resolveRound("passed");
  }, [currentRound, isRevealed, resolveRound]);

  return {
    rounds: resolvedRounds,
    currentIndex,
    currentRound,
    correctCount,
    total: rounds.length,
    matchStatus,
    isRevealed,
    submitGuess,
    pass,
  };
}