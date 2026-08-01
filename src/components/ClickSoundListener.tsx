"use client";

import { useEffect } from "react";
import { playSound } from "@/lib/sounds";

export default function ClickSoundListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const button = target.closest("button");
      if (button && !button.hasAttribute("data-skip-click-sound")) {
        playSound("click");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}