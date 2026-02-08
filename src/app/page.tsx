import { fetchWords } from "@/api/fetches";
import { TabProvider, useTab } from "@/components/Providers/TabProvider/TabProvider";
import { WordsSection } from "@/components/WordsSection/WordsSection";

export default async function Home() {
  const response = await fetchWords();

  return (
    <>
    <h1 className="visually-hidden">Это справочник по русскому для ЕГЭ. С ней можно подготовиться ко всему</h1>
      <TabProvider initialTab="accent">
        <section className="pt-6">
          <div className="container">
            <WordsSection initialWords={response.words} />
          </div>
        </section>
      </TabProvider>
    </>
  );
}
