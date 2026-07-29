import { Pokemon } from "@/types/pokemon";
import { shuffle } from "./shuffle";

export const QUICK_ROUND_COUNT = 30;
export const QUICK_ROUND_SECONDS = 240;

export function selectQuickPool(fullPool: Pokemon[]): Pokemon[] {
  return shuffle(fullPool).slice(0, QUICK_ROUND_COUNT);
}