"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CardProps } from "@/interfaces";
import { addWord } from "@/api/fetches";
import { AddWordModal } from "@/components/AddWordModal/AddWordModal";

interface WordsContextValue {
  words: CardProps[];
  openAddModal: () => void;
}

const WordsContext = createContext<WordsContextValue | undefined>(undefined);

interface WordsProviderProps {
  initialWords: CardProps[];
  children: ReactNode;
}

export function WordsProvider({ initialWords, children }: WordsProviderProps) {
  const [words, setWords] = useState<CardProps[]>(initialWords);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddWord = useCallback(async (word: CardProps) => {
    try {
      const data = await addWord(word);
      setWords(data.words);
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to add word:", err);
    }
  }, []);

  const openAddModal = () => setModalOpen(true);

  const value: WordsContextValue = {
    words,
    openAddModal,
  };

  return (
    <WordsContext.Provider value={value}>
      {children}
      <AddWordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddWord}
      />
    </WordsContext.Provider>
  );
}

export function useWords(): WordsContextValue {
  const ctx = useContext(WordsContext);
  if (!ctx) {
    throw new Error("useWords must be used within WordsProvider");
  }
  return ctx;
}

