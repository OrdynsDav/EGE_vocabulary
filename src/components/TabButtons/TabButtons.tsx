"use client";

import { useTab } from "@/components/Providers/TabProvider/TabProvider";
import { useState } from "react";
import { useWords } from "@/components/WordsSection/WordsProvider";

export function TabButtons() {
  const { tab, switchTab } = useTab();
  const { openAddModal } = useWords();
  const [pressed, setPressed] = useState(false);

  const activeTab = tab === 'accent' ? 'accents' : 'spelling';

  const activeStyles =
    "active px-2 text-lg font-semibold text-gray-200 transition-colors relative";
  const inactiveStyles =
    "px-2 text-lg font-semibold text-gray-400 transition-colors relative";

  const handleTabClick = (tab: "spelling" | "accents") => {
    switchTab(tab === 'accents' ? 'accent' : 'spelling');
  };

  return (
    <div className="tab flex items-center justify-between pb-2.5 border-b border-gray-400">
      <div className="flex gap-8">
        <button
          className={`tab-button ${activeTab === "accents" ? activeStyles : inactiveStyles}`}
          onClick={() => handleTabClick("accents")}
        >
          Ударения
        </button>
        <button
          className={`tab-button ${activeTab === "spelling" ? activeStyles : inactiveStyles}`}
          onClick={() => handleTabClick("spelling")}
        >
          Правописание
        </button>
      </div>
      <button
        type="button"
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        onClick={openAddModal}
        className={
          `flex items-center justify-center p-2 rounded-md bg-blue-500 text-gray-300 w-12 h-12 max-[400px]:w-8 max-[400px]:h-8 
          hover:bg-gray-700 hover:text-gray-100 
          ${pressed ? 'bg-gray-700 text-gray-100' : ''} transition-colors 
          text-4xl max-[400px]:text-3xl`}
        title="Добавить слово"
        aria-label="Добавить слово"
      >
        <span>+</span>
      </button>
    </div>
  );
}
