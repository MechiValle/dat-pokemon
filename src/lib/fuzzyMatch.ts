import { normalizeName } from "./normalizeName";
import { levenshteinDistance } from "./levenshtein";

function maxAllowedDistance(nameLength: number): number {
  if (nameLength <= 4) return 0;
  if (nameLength <= 7) return 1;
  return 2;
}

export function isFuzzyMatch(guess: string, correctName: string, allNames: string[]): boolean {
  const normalizedGuess = normalizeName(guess);
  const normalizedCorrect = normalizeName(correctName);

  const distanceToCorrect = levenshteinDistance(normalizedGuess, normalizedCorrect);
  if (distanceToCorrect === 0) return true;

  const threshold = maxAllowedDistance(normalizedCorrect.length);
  if (distanceToCorrect > threshold) return false;

  for (const name of allNames) {
    const normalizedOther = normalizeName(name);
    if (normalizedOther === normalizedCorrect) continue;

    const distanceToOther = levenshteinDistance(normalizedGuess, normalizedOther);
    if (distanceToOther <= distanceToCorrect) {
      return false; // the guess is at least as close to a different real Pokémon
    }
  }

  return true;
}