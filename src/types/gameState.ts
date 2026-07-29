import { Round } from "./round";

export type GameStatus = "idle" | "loading" | "playing" | "finished";

export interface GameState {
  status: GameStatus;
  selectedGenerations: number[];
  rounds: Round[];
  currentIndex: number;
  correctCount: number;
  startTime: number | null;
  elapsedSeconds: number;
}