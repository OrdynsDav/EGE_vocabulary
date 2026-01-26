'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'russian' | 'english';

type LanguageContextType = {
  language: Language;
  switchLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('app-language', language);
  }, [language]);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
