"use client";

import { CardProps } from "@/interfaces";
import { TabButtons } from "@/components/TabButtons/TabButtons";
import { WordsSection } from "./WordsSection";
import { WordsProvider } from "./WordsProvider";

interface WordsClientProps {
  initialWords: CardProps[];
}

export function WordsClient({ initialWords }: WordsClientProps) {
  return (
    <WordsProvider initialWords={initialWords}>
      <section className="mb-4">
        <TabButtons />
      </section>

      <section>
        <WordsSection />
      </section>
    </WordsProvider>
  );
}

