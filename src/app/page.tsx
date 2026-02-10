import { fetchWords } from "@/api/fetches";
import { TabProvider } from "@/components/Providers/TabProvider/TabProvider";
import { WordsProvider } from "@/components/WordsSection/WordsProvider";
import { TabButtons } from "@/components/TabButtons/TabButtons";
import { WordsSection } from "@/components/WordsSection/WordsSection";
import { PageTransition } from "@/components/PageTransition/PageTransition";

export default async function Home() {
  const response = await fetchWords();

  return (
    <PageTransition>
      <h1 className="visually-hidden">
        Это справочник по русскому для ЕГЭ. С ней можно подготовиться ко всему
      </h1>
      <TabProvider initialTab="accent">
        <WordsProvider initialWords={response.words}>
          <div className="pt-6">
            <section className="tabs mb-12">
              <div className="container">
                <TabButtons />
              </div>
            </section>
            <section className="words">
              <div className="container">
                <WordsSection />
              </div>
            </section>
          </div>
        </WordsProvider>
      </TabProvider>
    </PageTransition>
  );
}
