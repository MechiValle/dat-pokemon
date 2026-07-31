"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pokemon } from "@/types/pokemon";

interface CryStageProps {
  pokemon: Pokemon;
  isRevealed: boolean;
}

export default function CryStage({ pokemon, isRevealed }: CryStageProps) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isRevealed && pokemon.cryUrl) {
      audioRef.current?.play().catch(() => {
        // Autoplay may be blocked by the browser; the manual button still works.
      });
    }
  }, [pokemon.id, isRevealed, pokemon.cryUrl]);

  return (
    <div className="flex flex-col items-center gap-3">
      {pokemon.cryUrl && <audio key={pokemon.id} ref={audioRef} src={pokemon.cryUrl} />}
      {!isRevealed ? (
        <button
          type="button"
          onClick={() => audioRef.current?.play().catch(() => {})}
          aria-label={t("game.playSound")}
          className="w-40 h-40 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-4xl"
        >
          🔊
        </button>
      ) : (
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          className="w-40 h-40 object-contain animate-[fade-in_400ms_ease-out]"
        />
      )}
      <span className="h-5 text-sm font-bold text-bezel dark:text-white capitalize">
        {isRevealed ? pokemon.name : ""}
      </span>
    </div>
  );
}