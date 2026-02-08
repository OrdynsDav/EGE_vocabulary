'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Tab = 'spelling' | 'accent';

type TabContextType = {
  tab: Tab;
  switchTab: (tab: Tab ) => void;
  animate: boolean;
  setAnimate: (state: boolean) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children, initialTab, initialTabFromParent }: { children: ReactNode; initialTab: Tab; initialTabFromParent?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTabFromParent ?? initialTab);
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Сохраняем в localStorage
    localStorage.setItem('app-tab', tab);
  }, [tab]);

  const switchTab = (switchedTab: Tab) => {
    setTab(switchedTab);
    setAnimate(prev => !prev)
  };

  return (
    <TabContext.Provider value={{ tab, switchTab, animate, setAnimate }}>
      {children}
    </TabContext.Provider>
  );
}

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within TabProvider');
  }
  return context;
};
