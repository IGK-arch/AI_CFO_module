import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  BankStatement, 
  ARAP, 
  Loan, 
  PurposeMapping, 
  DailyForecast, 
  IndustryPreset, 
  KPIMetrics, 
  AIAnalysis,
  ChatMessage,
  UserPreferences,
  Scenario,
  FinancingOption
} from './types';

interface AppState {
  // Данные
  bankStatements: BankStatement[];
  arAp: ARAP[];
  loans: Loan[];
  purposeMappings: PurposeMapping[];
  forecasts: DailyForecast[];
  
  // Пользовательские настройки
  userPreferences: UserPreferences | null;
  selectedIndustry: IndustryPreset | null;
  
  // Аналитика
  kpiMetrics: KPIMetrics | null;
  aiAnalysis: AIAnalysis | null;
  
  // Чат
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  
  // Сценарии и финансирование
  scenarios: Scenario[];
  financingOptions: FinancingOption[];
  
  // UI состояние
  currentPage: string;
  isLoading: boolean;
  
  // Действия
  setUserPreferences: (preferences: UserPreferences) => void;
  setSelectedIndustry: (industry: IndustryPreset) => void;
  setBankStatements: (statements: BankStatement[]) => void;
  setARAP: (arap: ARAP[]) => void;
  setLoans: (loans: Loan[]) => void;
  setForecasts: (forecasts: DailyForecast[]) => void;
  setKPIMetrics: (metrics: KPIMetrics) => void;
  setAIAnalysis: (analysis: AIAnalysis) => void;
  addChatMessage: (message: ChatMessage) => void;
  setChatOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  setLoading: (loading: boolean) => void;
  setScenarios: (scenarios: Scenario[]) => void;
  setFinancingOptions: (options: FinancingOption[]) => void;
  
  // Сброс состояния
  reset: () => void;
}

const initialState = {
  bankStatements: [],
  arAp: [],
  loans: [],
  purposeMappings: [],
  forecasts: [],
  userPreferences: null,
  selectedIndustry: null,
  kpiMetrics: null,
  aiAnalysis: null,
  chatMessages: [],
  isChatOpen: false,
  scenarios: [],
  financingOptions: [],
  currentPage: 'welcome',
  isLoading: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUserPreferences: (preferences) => set({ userPreferences: preferences }),
      setSelectedIndustry: (industry) => set({ selectedIndustry: industry }),
      setBankStatements: (statements) => set({ bankStatements: statements }),
      setARAP: (arap) => set({ arAp: arap }),
      setLoans: (loans) => set({ loans: loans }),
      setForecasts: (forecasts) => set({ forecasts: forecasts }),
      setKPIMetrics: (metrics) => set({ kpiMetrics: metrics }),
      setAIAnalysis: (analysis) => set({ aiAnalysis: analysis }),
      addChatMessage: (message) => set((state) => ({ 
        chatMessages: [...state.chatMessages, message] 
      })),
      setChatOpen: (open) => set({ isChatOpen: open }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setLoading: (loading) => set({ isLoading: loading }),
      setScenarios: (scenarios) => set({ scenarios: scenarios }),
      setFinancingOptions: (options) => set({ financingOptions: options }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'cfo-ai-storage',
      partialize: (state) => ({
        userPreferences: state.userPreferences,
        selectedIndustry: state.selectedIndustry,
        currentPage: state.currentPage,
      }),
      skipHydration: true,
    }
  )
);
