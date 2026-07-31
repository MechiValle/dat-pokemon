import { Pokemon } from "@/types/pokemon";
import { fetchGenerationSpeciesList, fetchPokemonDetail } from "./pokeapi";
import { getCachedGeneration, setCachedGeneration } from "./cache";
import { preloadImage } from "./preloadImage";
import { computeSpriteSamples } from "./spriteSamples";

export type ProgressCallback = (loaded: number, total: number) => void;

const SPRITE_FETCH_CONCURRENCY = 5;

async function fetchInBatches<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
  onEach: () => void
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        const result = await fn(item);
        onEach();
        return result;
      })
    );
    results.push(...batchResults);
  }
  return results;
}

export async function loadGenerations(
  generations: number[],
  onProgress?: ProgressCallback
): Promise<Pokemon[]> {
  const cachedByGeneration = new Map<number, Pokemon[]>();
  const generationsToFetch: number[] = [];

  for (const generation of generations) {
    const cached = getCachedGeneration(generation);
    if (cached) {
      cachedByGeneration.set(generation, cached);
    } else {
      generationsToFetch.push(generation);
    }
  }

  const speciesLists = await Promise.all(
    generationsToFetch.map((generation) =>
      fetchGenerationSpeciesList(generation).then((species) => ({ generation, species }))
    )
  );

  const cachedPokemon = [...cachedByGeneration.values()].flat();
  const toFetchCount = speciesLists.reduce((sum, entry) => sum + entry.species.length, 0);
  const total = cachedPokemon.length + toFetchCount;

  let loaded = 0;
  onProgress?.(loaded, total);

  await fetchInBatches(
    cachedPokemon,
    SPRITE_FETCH_CONCURRENCY,
    async (p) => {
      await preloadImage(p.spriteUrl);
      return null;
    },
    () => {
      loaded += 1;
      onProgress?.(loaded, total);
    }
  );

  const freshlyFetched: Pokemon[] = [];

  for (const { generation, species } of speciesLists) {
    const generationPokemon = await fetchInBatches(
      species,
      SPRITE_FETCH_CONCURRENCY,
      async (entry) => {
        const detail = await fetchPokemonDetail(entry.id);
        const spriteSamples = await computeSpriteSamples(detail.spriteUrl);
        const pokemon: Pokemon = {
          id: entry.id,
          name: entry.name,
          spriteUrl: detail.spriteUrl,
          cryUrl: detail.cryUrl,
          generation,
          spriteSamples,
        };
        return pokemon;
      },
      () => {
        loaded += 1;
        onProgress?.(loaded, total);
      }
    );

    setCachedGeneration(generation, generationPokemon);
    freshlyFetched.push(...generationPokemon);
  }

  return [...cachedPokemon, ...freshlyFetched].sort((a, b) => a.id - b.id);
}