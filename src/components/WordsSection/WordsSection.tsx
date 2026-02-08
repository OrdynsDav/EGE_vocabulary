"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/Card/Card";
import { TabButtons } from "@/components/TabButtons/TabButtons";
import { AddWordModal } from "@/components/AddWordModal/AddWordModal";
import { CardProps } from "@/interfaces";
import { addWord } from "@/api/fetches";
import { useTab } from "../Providers/TabProvider/TabProvider";
import { UnavailableSection } from "../SpellingSection/UnavailableSection";

interface WordsSectionProps {
  initialWords: CardProps[];
}

export function WordsSection({ initialWords }: WordsSectionProps) {
  const [words, setWords] = useState(initialWords);
  const [modalOpen, setModalOpen] = useState(false);
  const {tab, animate} = useTab()

  const handleAddWord = useCallback(async (word: CardProps) => {
    try {
      const data = await addWord(word);
      setWords(data.words);
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to add word:", err);
    }
  }, []);

  return (
    <>
      <TabButtons onAddWord={() => setModalOpen(true)} />
      {tab == "spelling" ? <UnavailableSection animate={animate}/> : <Card words={words}/>}
      <AddWordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddWord}
      />
    </>
  );
}
