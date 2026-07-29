"use client";

import { useTranslation } from "react-i18next";
import { GENERATIONS } from "@/lib/generations";

interface GenerationSelectorProps {
  selected: number[];
  onChange: (next: number[]) => void;
}

export default function GenerationSelector({ selected, onChange }: GenerationSelectorProps) {
  const { t } = useTranslation();
  const allIds = GENERATIONS.map((g) => g.id);
  const allSelected = allIds.every((id) => selected.includes(id));

  function toggleGeneration(id: number) {
    onChange(selected.includes(id) ? selected.filter((g) => g !== id) : [...selected, id].sort((a, b) => a - b));
  }

  function toggleAll() {
    onChange(allSelected ? [] : allIds);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm font-bold text-bezel dark:text-white">
        <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 accent-accent" />
        {t("welcome.allGenerations")}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {GENERATIONS.map((generation) => (
          <label key={generation.id} className="flex items-center gap-2 text-sm text-bezel dark:text-white">
            <input
              type="checkbox"
              checked={selected.includes(generation.id)}
              onChange={() => toggleGeneration(generation.id)}
              className="h-4 w-4 accent-accent"
            />
            {t("welcome.generation", { number: generation.id })}
          </label>
        ))}
      </div>
    </div>
  );
}