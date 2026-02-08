"use client";

import { useState, useCallback, useEffect } from "react";
import { CardProps } from "@/interfaces";

const VOWEL_REG = /[аеёиоуыэюяАЕЁИОУЫЭЮЯ]/;

type Step = "input" | "stress";

interface AddWordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (word: CardProps) => void;
}

export function AddWordModal({ open, onClose, onSave }: AddWordModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [inputValue, setInputValue] = useState("");
  const [word, setWord] = useState("");

  // Управляем монтированием и анимацией
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = setTimeout(() => {
        setAnimateIn(true);
      }, 0);
      return () => clearTimeout(frame);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setStep("input");
    setTimeout(() => setInputValue(""), 300)
    setWord("");
    onClose();
  }, [onClose]);

  const handleSpecifyStress = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) return;
    setWord(trimmed);
    setStep("stress");
  };

  const handleVowelClick = (stressIndex: number) => {
    onSave({ accent: word, stress_index: stressIndex });
    handleClose();
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ease-out ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-word-modal-title"
    >
      <div
        className={`bg-neutral-800 rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 transform transition-all duration-300 ease-out ${
          animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-word-modal-title" className="text-xl font-semibold text-gray-200">
          Добавить слово
        </h2>

        {step === "input" && (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSpecifyStress()}
              placeholder="Введите слово"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-gray-100 placeholder-gray-400 border border-neutral-600 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-neutral-700"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleSpecifyStress}
                disabled={!inputValue.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Указать ударение
              </button>
            </div>
          </>
        )}

        {step === "stress" && (
          <>
            <p className="text-sm text-gray-400">
              Нажмите на гласную букву, на которую падает ударение
            </p>
            <div className="flex gap-1 flex-wrap text-3xl font-bold justify-center py-4">
              <WordStressSelector word={word} onVowelClick={handleVowelClick} />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep("input")}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-neutral-700"
              >
                Назад
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WordStressSelector({
  word,
  onVowelClick,
}: {
  word: string;
  onVowelClick: (index: number) => void;
}) {
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (VOWEL_REG.test(char)) {
      parts.push(
        <button
          key={i}
          type="button"
          className="text-blue-500 font-bold border-b-2 border-blue-500 uppercase inline-block hover:bg-blue-500/20 rounded px-0.5"
          onClick={() => onVowelClick(i)}
        >
          {char.toLowerCase()}
        </button>
      );
    } else {
      parts.push(
        <span key={i} className="text-gray-500">
          {char}
        </span>
      );
    }
  }
  return <>{parts}</>;
}