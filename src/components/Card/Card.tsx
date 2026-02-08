'use client'

import { CardProps } from "@/interfaces";
import { formatAccent } from "@/utils/format-accent";
import { LoaderDots } from "../Loaders/Dots";
import { shuffle } from "@/utils/shuffle";
import { AutoNextCountdown } from "../AutoNextCountdown/AutoNextCountdown";
import { useState, useEffect, useRef, useCallback } from "react";

const AUTO_NEXT_SEC = 15;
const AUTO_NEXT_MS = AUTO_NEXT_SEC * 1000;

export function Card({ words }: { words: CardProps[] }) {
  const [currentWord, setCurrentWord] = useState<CardProps | null>(null);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [revealedWrongIndex, setRevealedWrongIndex] = useState<number | null>(null);
  const nextWordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoNextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCurrentWord(shuffle(words));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only pick random word once on mount
  }, []);

  const goToNextWord = useCallback(() => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setRevealedWrongIndex(null);
    setIsLoadingNext(true);
    const nextWord = shuffle(words, currentWord);
    nextWordTimerRef.current = setTimeout(() => {
      setCurrentWord(nextWord);
      setIsLoadingNext(false);
      nextWordTimerRef.current = null;
    }, 400);
  }, [words, currentWord]);

  useEffect(() => {
    return () => {
      if (nextWordTimerRef.current) clearTimeout(nextWordTimerRef.current);
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    };
  }, []);

  const handleCorrect = () => {
    setRevealedWrongIndex(null);
    setIsLoadingNext(true);
    const nextWord = shuffle(words, currentWord);
    nextWordTimerRef.current = setTimeout(() => {
      setCurrentWord(nextWord);
      setIsLoadingNext(false);
      nextWordTimerRef.current = null;
    }, 400);
  };

  const handleWrong = (wrongIndex: number) => {
    setRevealedWrongIndex(wrongIndex);
    autoNextTimerRef.current = setTimeout(goToNextWord, AUTO_NEXT_MS);
  };

  if (!currentWord || isLoadingNext) {
    return <LoaderDots />;
  }

  const isRevealed = revealedWrongIndex !== null;

  return (
    <div className="flex flex-col h-full items-center gap-6">
      <div className="card__title flex gap-1 flex-wrap text-4xl font-bold">
        {formatAccent(currentWord.accent, currentWord.stress_index, {
          onCorrect: handleCorrect,
          onWrong: handleWrong,
          revealedWrongIndex: revealedWrongIndex ?? undefined,
        })}
      </div>
      {isRevealed && (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={goToNextWord}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Следующее слово
          </button>
          <AutoNextCountdown initialSeconds={AUTO_NEXT_SEC} />
        </div>
      )}
    </div>
  );
}