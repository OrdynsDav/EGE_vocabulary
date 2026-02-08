"use client";

import { useState } from "react";

interface TabButtonsProps {
  onAddWord?: () => void;
}

export function TabButtons({ onAddWord }: TabButtonsProps) {
  const [activeTab, setActiveTab] = useState<"spelling" | "accents">(
    "accents",
  );

  const activeStyles =
    "active px-2 text-lg font-semibold text-gray-200 transition-colors relative";
  const inactiveStyles =
    "px-2 text-lg font-semibold text-gray-400 transition-colors relative";

  const handleTabClick = (tab: "spelling" | "accents") => {
    setActiveTab(tab);
  };

  return (
    <div className="tab flex items-center justify-between pb-2.5 mb-12 border-b border-gray-400">
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
      {onAddWord && (
        <button
          type="button"
          onClick={onAddWord}
          className="flex items-center justify-center p-2 rounded-md bg-blue-500 text-gray-300 w-12 h-12 max-[400px]:w-8 max-[400px]:h-8 hover:bg-gray-700 hover:text-gray-100 transition-colors text-4xl max-[400px]:text-3xl"
          title="Добавить слово"
          aria-label="Добавить слово"
        >
          <span>+</span>
        </button>
      )}
    </div>
  );
}
