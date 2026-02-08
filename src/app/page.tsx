import { fetchWords } from "@/api/fetches";
import { WordsSection } from "@/components/WordsSection/WordsSection";

export default async function Home() {
  const response = await fetchWords();

  return (
    <section className="pt-6">
      <div className="container">
        <WordsSection initialWords={response.words} />
      </div>
    </section>
  );
}
