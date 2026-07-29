import { CachedGeneration } from "@/types/cache";
import { Pokemon } from "@/types/pokemon";

const CACHE_PREFIX = "dat-pokemon:generation:";

export function getCachedGeneration(generation: number): Pokemon[] | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(`${CACHE_PREFIX}${generation}`);
  if (!raw) return null;

  try {
    const parsed: CachedGeneration = JSON.parse(raw);
    return parsed.pokemon;
  } catch {
    return null;
  }
}

export function setCachedGeneration(generation: number, pokemon: Pokemon[]): void {
  if (typeof window === "undefined") return;

  const entry: CachedGeneration = {
    generation,
    fetchedAt: Date.now(),
    pokemon,
  };
  localStorage.setItem(`${CACHE_PREFIX}${generation}`, JSON.stringify(entry));
}

export function clearAllCache(): void {
  if (typeof window === "undefined") return;

  Object.keys(localStorage)
    .filter((key) => key.startsWith(CACHE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
}