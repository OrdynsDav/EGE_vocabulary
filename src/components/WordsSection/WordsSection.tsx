"use client";

import { Card } from "@/components/Card/Card";
import { useTab } from "../Providers/TabProvider/TabProvider";
import { UnavailableSection } from "../UnavailableSection/UnavailableSection";
import { useWords } from "./WordsProvider";

export function WordsSection() {
  const { tab, animate } = useTab();
  const { words } = useWords();

  if (tab === "spelling") {
    return <UnavailableSection animate={animate} />;
  }

  return <Card words={words} />;
}
