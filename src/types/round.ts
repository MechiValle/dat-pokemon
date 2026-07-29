import { Pokemon } from "./pokemon";

export type RoundStatus = "pending" | "correct" | "incorrect" | "passed";

export interface Round {
  pokemon: Pokemon;
  status: RoundStatus;
}