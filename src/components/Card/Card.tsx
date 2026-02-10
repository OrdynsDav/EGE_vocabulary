'use client'

import { CardProps } from "@/interfaces";
import { formatAccent } from "@/utils/format-accent";
import { DotsLoader } from "../Loaders/DotsLoader/DotsLoader";
import { AutoNextCountdown } from "../AutoNextCountdown/AutoNextCountdown";
import { useTab } from "@/components/Providers/TabProvider/TabProvider";
import { useState, useEffect, useRef, useCallback } from "react";

const AUTO_NEXT_SEC = 15;
const AUTO_NEXT_MS = AUTO_NEXT_SEC * 1000;

export function Card({ words }: { words: CardProps[] }) {
  const { tab } = useTab();
  const activeTab = tab === "accent" ? "accents" : "spelling";

  const [order, setOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [revealedWrongIndex, setRevealedWrongIndex] = useState<number | null>(null);
  const nextWordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoNextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // При первом монтировании (и при изменении набора слов) один раз
  // перемешиваем индексы слов (Fisher–Yates), чтобы пройти все без повторов.
  useEffect(() => {
    if (!words.length) {
      setOrder([]);
      setCurrentIndex(0);
      return;
    }
    const indexes = words.map((_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    setOrder(indexes);
    setCurrentIndex(0);
  }, [words]);

  const currentWord =
    order.length && words.length ? words[order[currentIndex] % words.length] : null;

  const goToNextWord = useCallback(() => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setRevealedWrongIndex(null);
    setIsLoadingNext(true);

    const nextIndex =
      order.length > 0 ? (currentIndex + 1) % order.length : 0;

    nextWordTimerRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsLoadingNext(false);
      nextWordTimerRef.current = null;
    }, 400);
  }, [currentIndex, order.length]);

  useEffect(() => {
    return () => {
      if (nextWordTimerRef.current) clearTimeout(nextWordTimerRef.current);
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    };
  }, []);

  const handleCorrect = () => {
    setRevealedWrongIndex(null);
    setIsLoadingNext(true);

    const nextIndex =
      order.length > 0 ? (currentIndex + 1) % order.length : 0;

    nextWordTimerRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsLoadingNext(false);
      nextWordTimerRef.current = null;
    }, 400);
  };

  const handleWrong = (wrongIndex: number) => {
    setRevealedWrongIndex(wrongIndex);
    autoNextTimerRef.current = setTimeout(goToNextWord, AUTO_NEXT_MS);
  };

  if (!currentWord || isLoadingNext) {
    return <DotsLoader />;
  }

  const isRevealed = revealedWrongIndex !== null;

  return (
    <div className="section-animate flex flex-col h-full items-center gap-6 w-fit m-auto">
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