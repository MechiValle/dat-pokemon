"use client";

import { useMemo } from "react";
import { Pokemon } from "@/types/pokemon";

interface CroppedImageProps {
  pokemon: Pokemon;
  isRevealed: boolean;
}

const ZOOM_SCALE = 5.5;

export default function CroppedImage({ pokemon, isRevealed }: CroppedImageProps) {
  const offset = useMemo(() => {
    const samples = pokemon.spriteSamples.length > 0 ? pokemon.spriteSamples : [{ xPct: 50, yPct: 50 }];
    const point = samples[Math.floor(Math.random() * samples.length)];
    return {
      x: (0.5 - point.xPct / 100) * 100,
      y: (0.5 - point.yPct / 100) * 100,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.id]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        key={pokemon.id}
        className="w-40 h-40 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 animate-[fade-in_400ms_ease-out]"
      >
        <img
          src={pokemon.spriteUrl}
          alt={isRevealed ? pokemon.name : "Cropped Pokémon fragment"}
          draggable={false}
          className="w-full h-full object-contain transition-transform duration-500"
          style={{
            transform: isRevealed
              ? "scale(1) translate(0, 0)"
              : `scale(${ZOOM_SCALE}) translate(${offset.x}%, ${offset.y}%)`,
          }}
        />
      </div>
      <span className="h-5 text-sm font-bold text-bezel dark:text-white capitalize">
        {isRevealed ? pokemon.name : ""}
      </span>
    </div>
  );
}