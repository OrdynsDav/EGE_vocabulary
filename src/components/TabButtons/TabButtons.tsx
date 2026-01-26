"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageProvider/LanguageProvider";

export function TabButtons() {
  const [activeTab, setActiveTab] = useState<"russian" | "english">("russian");
  const { switchLanguage } = useLanguage();

  const activeStyles =
    "active pb-4 px-2 text-lg font-semibold text-gray-800 transition-colors relative";
  const inactiveStyles =
    "pb-4 px-2 text-lg font-semibold text-gray-500 transition-colors relative";

  const handleTabClick = (tab: "russian" | "english") => {
    setActiveTab(tab);

    if (tab === "russian") {
      switchLanguage("russian");
    } else {
      switchLanguage("english");
    }
  };
  return (
    <div className="tab flex justify-center gap-8 mb-12 border-b border-gray-200">
      <button
        className={`tab-button ${activeTab === "russian" ? activeStyles : inactiveStyles}`}
        onClick={() => handleTabClick("russian")}
      >
        Русский язык
      </button>
      <button
        className={`tab-button ${activeTab === "english" ? activeStyles : inactiveStyles}`}
        onClick={() => handleTabClick("english")}
      >
        Английский язык
      </button>
    </div>
  );
}
