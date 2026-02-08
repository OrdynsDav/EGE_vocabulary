import { WordsSchema } from "./interfaces";
import type { CardProps } from "@/interfaces";

const BASE_URL = "http://localhost:3001"

export async function fetchWords(): Promise<WordsSchema> {
  try {
    const res = await fetch(`${BASE_URL}/words`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch words");
    return res.json();
  } catch (err) {
    try {
      const res = await fetch('../..mocks/words.json', {
        cache: "no-store",
      });
      return res.json()
    } catch (error) {
      return {words: []}
    }
  }
}

export async function addWord(word: CardProps): Promise<WordsSchema> {
  const res = await fetch(`${BASE_URL}/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(word),
  });
  if (!res.ok) throw new Error("Failed to add word");
  return res.json();
}
