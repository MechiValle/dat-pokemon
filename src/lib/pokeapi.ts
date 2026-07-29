import { Pokemon } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

interface SpeciesListItem {
  name: string;
  url: string;
}

interface GenerationResponse {
  pokemon_species: SpeciesListItem[];
}

interface PokemonDetailResponse {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) {
    throw new Error(`Could not extract id from url: ${url}`);
  }
  return Number(match[1]);
}

export async function fetchGenerationSpeciesList(
  generation: number
): Promise<{ id: number; name: string }[]> {
  const response = await fetch(`${BASE_URL}/generation/${generation}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch generation ${generation}`);
  }
  const data: GenerationResponse = await response.json();

  return data.pokemon_species
    .map((species) => ({
      id: extractIdFromUrl(species.url),
      name: species.name,
    }))
    .sort((a, b) => a.id - b.id);
}

export async function fetchPokemonSprite(id: number): Promise<string> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon ${id}`);
  }
  const data: PokemonDetailResponse = await response.json();
  const sprite = data.sprites.other["official-artwork"].front_default;

  if (!sprite) {
    throw new Error(`No sprite found for pokemon ${id}`);
  }
  return sprite;
}