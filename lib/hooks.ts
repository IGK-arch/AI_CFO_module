import { useEffect, useState } from 'react';
import { useAppStore } from './store';

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};

export const useAppStoreHydrated = () => {
  const store = useAppStore();
  const isHydrated = useHydration();

  if (!isHydrated) {
    return {
      currentPage: 'welcome',
      userPreferences: null,
      selectedIndustry: null,
      bankStatements: [],
      arAp: [],
      loans: [],
      forecasts: [],
      kpiMetrics: null,
      aiAnalysis: null,
      chatMessages: [],
      isChatOpen: false,
      scenarios: [],
      financingOptions: [],
      isLoading: false,
      setUserPreferences: () => {},
      setSelectedIndustry: () => {},
      setBankStatements: () => {},
      setARAP: () => {},
      setLoans: () => {},
      setForecasts: () => {},
      setKPIMetrics: () => {},
      setAIAnalysis: () => {},
      addChatMessage: () => {},
      setChatOpen: () => {},
      setCurrentPage: () => {},
      setLoading: () => {},
      setScenarios: () => {},
      setFinancingOptions: () => {},
      reset: () => {},
    };
  }

  return store;
};
