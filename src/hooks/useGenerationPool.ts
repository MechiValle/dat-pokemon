"use client";

import { useState, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";
import { loadGenerations } from "@/lib/pokemonPool";

interface PoolState {
  status: "idle" | "loading" | "ready" | "error";
  pokemon: Pokemon[];
  loaded: number;
  total: number;
}

const initialState: PoolState = { status: "idle", pokemon: [], loaded: 0, total: 0 };

export function useGenerationPool() {
  const [state, setState] = useState<PoolState>(initialState);

  const load = useCallback(async (generations: number[]) => {
    setState({ status: "loading", pokemon: [], loaded: 0, total: 0 });

    try {
      const pokemon = await loadGenerations(generations, (loaded, total) => {
        setState((prev) => ({ ...prev, loaded, total }));
      });
      setState({ status: "ready", pokemon, loaded: pokemon.length, total: pokemon.length });
    } catch {
      setState((prev) => ({ ...prev, status: "error" }));
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, load, reset };
}