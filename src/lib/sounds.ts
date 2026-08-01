type SoundName = "correct" | "incorrect" | "click";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const SOUND_PATHS: Record<SoundName, string> = {
  correct: `${BASE_PATH}/sounds/correct.mp3`,
  incorrect: `${BASE_PATH}/sounds/incorrect.mp3`,
  click: `${BASE_PATH}/sounds/click.mp3`,
};

export function playSound(name: SoundName): void {
  if (typeof window === "undefined") return;
  const audio = new Audio(SOUND_PATHS[name]);
  audio.play().catch(() => {
  });
}