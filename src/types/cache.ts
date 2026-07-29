import { Pokemon } from "./pokemon";

export interface CachedGeneration {
  generation: number;
  fetchedAt: number;
  pokemon: Pokemon[];
}