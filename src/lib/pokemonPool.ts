import { Pokemon } from "@/types/pokemon";
import { fetchGenerationSpeciesList, fetchPokemonSprite } from "./pokeapi";
import { getCachedGeneration, setCachedGeneration } from "./cache";

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
      fetchGenerationSpeciesList(generation).then((species) => ({
        generation,
        species,
      }))
    )
  );

  const cachedCount = [...cachedByGeneration.values()].reduce(
    (sum, list) => sum + list.length,
    0
  );
  const toFetchCount = speciesLists.reduce(
    (sum, entry) => sum + entry.species.length,
    0
  );
  const total = cachedCount + toFetchCount;

  let loaded = cachedCount;
  onProgress?.(loaded, total);

  const freshlyFetched: Pokemon[] = [];

  for (const { generation, species } of speciesLists) {
    const generationPokemon = await fetchInBatches(
      species,
      SPRITE_FETCH_CONCURRENCY,
      async (entry) => {
        const spriteUrl = await fetchPokemonSprite(entry.id);
        const pokemon: Pokemon = {
          id: entry.id,
          name: entry.name,
          spriteUrl,
          generation,
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

  return [...cachedByGeneration.values(), freshlyFetched]
    .flat()
    .sort((a, b) => a.id - b.id);
}