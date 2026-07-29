"use client";

import { QUICK_ROUND_OPTIONS, QuickRoundCount } from "@/lib/quickRounds";

interface RoundCountSelectorProps {
  count: QuickRoundCount;
  onChange: (count: QuickRoundCount) => void;
}

export default function RoundCountSelector({ count, onChange }: RoundCountSelectorProps) {
  return (
    <div className="flex rounded-lg bg-bezel/10 dark:bg-white/10 p-1 gap-1">
      {QUICK_ROUND_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${
            count === option ? "bg-accent text-bezel" : "text-bezel dark:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}