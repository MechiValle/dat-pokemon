export interface SpriteSamplePoint {
  xPct: number;
  yPct: number;
}

export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
  cryUrl: string | null;
  generation: number;
  spriteSamples: SpriteSamplePoint[];
}