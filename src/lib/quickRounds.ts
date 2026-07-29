import { Pokemon } from "@/types/pokemon";
import { shuffle } from "./shuffle";

export const QUICK_ROUND_OPTIONS = [20, 30, 40] as const;
export type QuickRoundCount = (typeof QUICK_ROUND_OPTIONS)[number];
export const DEFAULT_QUICK_ROUND_COUNT: QuickRoundCount = 30;
export const QUICK_ROUND_SECONDS = 240;

export function selectQuickPool(fullPool: Pokemon[], count: QuickRoundCount): Pokemon[] {
  return shuffle(fullPool).slice(0, count);
}