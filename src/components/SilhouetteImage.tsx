"use client";

import { useTranslation } from "react-i18next";
import { Pokemon } from "@/types/pokemon";

interface SilhouetteImageProps {
  pokemon: Pokemon;
  isRevealed: boolean;
}

export default function SilhouetteImage({ pokemon, isRevealed }: SilhouetteImageProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        key={pokemon.id}
        src={pokemon.spriteUrl}
        alt={isRevealed ? pokemon.name : t("game.silhouetteAlt")}
        className={`w-40 h-40 object-contain animate-[fade-in_400ms_ease-out] transition-[filter] duration-500 ${
          isRevealed ? "" : "brightness-0 dark:brightness-0 dark:invert"
        }`}
      />
      <span className="h-5 text-sm font-bold text-bezel dark:text-white capitalize">
        {isRevealed ? pokemon.name : ""}
      </span>
    </div>
  );
}