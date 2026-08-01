'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pokemon } from '@/types/pokemon';
import { shuffle } from '@/lib/shuffle';

interface CryChoicesProps {
  pokemon: Pokemon;
  pool: Pokemon[];
  isRevealed: boolean;
  onSubmit: (name: string) => void;
  onPass: () => void;
}

const CHOICE_COUNT = 4;

export default function CryChoices({
  pokemon,
  pool,
  isRevealed,
  onSubmit,
  onPass,
}: CryChoicesProps) {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const choices = useMemo(() => {
    const decoys = shuffle(pool.filter((p) => p.id !== pokemon.id)).slice(
      0,
      CHOICE_COUNT - 1,
    );
    return shuffle([pokemon, ...decoys]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.id]);

  useEffect(() => {
    setSelectedName(null);
    if (pokemon.cryUrl) {
      audioRef.current?.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.id]);

  function handleChoice(choice: Pokemon) {
    if (isRevealed) return;
    setSelectedName(choice.name);
    onSubmit(choice.name);
  }

  return (
    <div className='flex flex-col items-center gap-4 w-full'>
      {pokemon.cryUrl && (
        <audio key={pokemon.id} ref={audioRef} src={pokemon.cryUrl} />
      )}

      <button
        type='button'
        onClick={() => audioRef.current?.play().catch(() => {})}
        aria-label={t('game.playSound')}
        className='w-20 h-20 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-3xl'
      >
        🔊
      </button>

      <div className='grid grid-cols-2 gap-3 w-full max-w-xs'>
        {choices.map((choice) => {
          const isCorrectChoice = isRevealed && choice.id === pokemon.id;
          const isWrongPick =
            isRevealed &&
            selectedName === choice.name &&
            choice.id !== pokemon.id;

          return (
            <button
              key={choice.id}
              type='button'
              onClick={() => handleChoice(choice)}
              disabled={isRevealed}
              data-skip-click-sound
              className={`rounded-xl bg-black/5 dark:bg-white/5 p-2 flex items-center justify-center ${
                isCorrectChoice
                  ? 'ring-2 ring-accent'
                  : isWrongPick
                    ? 'ring-2 ring-pass'
                    : ''
              }`}
            >
              <img
                src={choice.spriteUrl}
                alt={choice.name}
                className='w-16 h-16 object-contain'
              />
            </button>
          );
        })}
      </div>

      <button
        type='button'
        onClick={onPass}
        disabled={isRevealed}
        data-skip-click-sound
        className='rounded-lg bg-pass text-white text-sm font-bold px-6 py-2 disabled:opacity-50'
      >
        {t('game.pass')}
      </button>
    </div>
  );
}
