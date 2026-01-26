import { CardProps } from "@/interfaces";

export async function fetchWords(language: 'russian' | 'english'): Promise<CardProps[]> {
  console.log(language);
  return await fetch(`/mocks/words-${language}.json`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
}
