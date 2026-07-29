"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@/hooks/useDebounce";

interface AutocompleteInputProps {
  pokemonNames: string[];
  onSubmit: (name: string) => void;
  onPass: () => void;
  disabled?: boolean;
}

const MAX_SUGGESTIONS = 5;
const DEBOUNCE_MS = 200;

export default function AutocompleteInput({
  pokemonNames,
  onSubmit,
  onPass,
  disabled,
}: AutocompleteInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedValue = useDebounce(value, DEBOUNCE_MS);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    debouncedValue.trim().length === 0
      ? []
      : pokemonNames
          .filter((name) => name.toLowerCase().startsWith(debouncedValue.trim().toLowerCase()))
          .slice(0, MAX_SUGGESTIONS);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [debouncedValue]);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  function handleSelect(name: string) {
    onSubmit(name);
    setValue("");
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const index = highlightedIndex >= 0 ? highlightedIndex : 0;
      handleSelect(suggestions[index]);
    } else if (e.key === "Escape") {
      setValue("");
      setHighlightedIndex(-1);
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={t("game.placeholder")}
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-autocomplete="list"
          className="flex-1 h-10 rounded-lg px-3 text-sm bg-screen-light-inner dark:bg-screen-dark text-bezel dark:text-white placeholder:text-bezel/40 dark:placeholder:text-white/40 outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={onPass}
          disabled={disabled}
          className="shrink-0 h-10 px-4 rounded-lg bg-pass text-white text-sm font-bold disabled:opacity-50"
        >
          {t("game.pass")}
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 rounded-lg bg-screen-light-inner dark:bg-screen-dark overflow-hidden shadow-lg z-10"
        >
          {suggestions.map((name, index) => (
            <li key={name} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onClick={() => handleSelect(name)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-3 py-2 text-sm capitalize text-bezel dark:text-white ${
                  index === highlightedIndex ? "bg-accent/30" : "hover:bg-accent/20"
                }`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}