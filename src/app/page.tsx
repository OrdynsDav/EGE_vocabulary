import { CardList } from "@/components/CardList/CardList";
import { LanguageProvider } from "@/components/LanguageProvider/LanguageProvider";
import { TabButtons } from "@/components/TabButtons/TabButtons";
import { getInitialLanguage } from "@/utils/cookie";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const initialLanguage = getInitialLanguage(cookieStore) as
    | "russian"
    | "english";
  return (
    <section className="pt-12">
      <div className="container">
        <LanguageProvider initialLanguage={initialLanguage}>
          <TabButtons />
          <CardList/>
        </LanguageProvider>
      </div>
    </section>
  );
}
