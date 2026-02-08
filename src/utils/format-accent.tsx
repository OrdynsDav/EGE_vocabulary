"use client";

import { ReactNode } from "react";

const VOWEL_REG = /[аеёиоуыэюяАЕЁИОУЫЭЮЯ]/;

export interface FormatAccentOptions {
  onCorrect: () => void;
  onWrong?: (wrongIndex: number) => void;
  /** When set, show wrong letter red, correct green (no click handlers). */
  revealedWrongIndex?: number;
}

export function formatAccent(
  accent: string,
  stress_index: number,
  options: FormatAccentOptions | (() => void),
): ReactNode {
  const opts: FormatAccentOptions =
    typeof options === "function"
      ? { onCorrect: options }
      : options;
  const { onCorrect, onWrong, revealedWrongIndex } = opts;
  const isRevealed = revealedWrongIndex !== undefined;
  const parts: ReactNode[] = [];

  for (let i = 0; i < accent.length; i++) {
    const char = accent[i];
    if (VOWEL_REG.test(char)) {
      const lowerLetter = char.toLowerCase();
      if (isRevealed) {
        const isWrong = i === revealedWrongIndex;
        const isCorrect = i === stress_index;
        const className = isWrong
          ? "text-red-500 font-bold border-b-2 border-red-500 uppercase inline-block"
          : isCorrect
            ? "text-green-500 font-bold border-b-2 border-green-500 uppercase inline-block"
            : "text-gray-500 uppercase inline-block";
        parts.push(
          <span key={i} className={className}>
            {lowerLetter}
          </span>,
        );
      } else {
        parts.push(
          <button
            key={i}
            className="text-blue-500 font-bold border-b-2 border-blue-500 uppercase inline-block"
            type="button"
            onClick={() => {
              if (i === stress_index) {
                onCorrect();
              } else if (onWrong) {
                onWrong(i);
              }
            }}
          >
            {lowerLetter}
          </button>,
        );
      }
    } else {
      parts.push(<span key={i}>{char}</span>);
    }
  }

  return <>{parts}</>;
}
