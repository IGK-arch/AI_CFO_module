// Основные типы данных
export interface BankStatement {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  balance: number;
}

export interface ARAP {
  id: string;
  counterparty: string;
  amount: number;
  paidAmount?: number;
  dueDate: string;
  type: 'receivable' | 'payable';
  status: 'open' | 'overdue' | 'paid' | 'pending';
  description?: string;
}

export interface Loan {
  id: string;
  name?: string;
  lender?: string;
  amount: number;
  interestRate: number;
  term?: number;
  monthlyPayment: number;
  remainingBalance: number;
  startDate: string;
  endDate?: string;
  maturityDate?: string;
  type?: 'credit' | 'loan' | 'overdraft';
  purpose?: string;
}

export interface PurposeMapping {
  id: string;
  description: string;
  category: string;
  subcategory: string;
  isIncome: boolean;
}

export interface DailyForecast {
  date: string;
  p5: number;
  p50: number;
  p95: number;
  actual?: number;
  confidence: number;
}

export interface IndustryPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  characteristics: {
    seasonality: number;
    volatility: number;
    dso: number;
    dpo: number;
    dio: number;
  };
  financingOptions: FinancingOption[];
  typicalScenarios: Scenario[];
}

export interface FinancingOption {
  id: string;
  name: string;
  type: 'credit' | 'factoring' | 'leasing' | 'overdraft' | 'investment';
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  term: number;
  requirements: string[];
  advantages: string[];
  disadvantages: string[];
  suitability: number; // 0-100
  industrySpecific: boolean;
}

export interface Scenario {
  id: string;
  name: string;
  type?: 'optimistic' | 'pessimistic' | 'stress' | 'custom';
  description: string;
  impact?: {
    revenue: number;
    costs: number;
    cashFlow: number;
  };
  probability?: number;
  parameters?: {
    revenueChange: number;
    costChange: number;
    paymentDelay: number;
    seasonalityFactor: number;
  };
  results?: {
    cashFlow: number[];
    riskScore: number;
    recommendations: string[];
  };
  recommendations?: string[];
  risks?: string[];
  timeframe: 'short' | 'medium' | 'long';
}

export interface KPIMetrics {
  cashFlow: number;
  burnRate: number;
  runway: number;
  dso?: number;
  dpo?: number;
  dio?: number;
  liquidityRatio: number;
  riskScore: number;
  revenue?: number;
}

export interface Insight {
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  recommendation: string;
}

export interface Recommendation {
  category: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  expectedImpact: string;
  timeframe: string;
}

export interface ForecastSummary {
  next30Days: {
    expectedInflow: number;
    expectedOutflow: number;
    netChange: number;
    confidence: number;
  };
  next90Days: {
    expectedInflow: number;
    expectedOutflow: number;
    netChange: number;
    confidence: number;
  };
}

export interface AIAnalysis {
  cashFlowHealth: 'good' | 'warning' | 'critical';
  liquidityStatus: 'good' | 'warning' | 'critical';
  riskLevel: 'low' | 'medium' | 'high';
  insights: Insight[];
  recommendations: Recommendation[];
  forecastSummary: ForecastSummary;
  risks?: string[];
  opportunities?: string[];
  confidence?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon: string;
}

export interface UserPreferences {
  industry: string;
  companySize: 'small' | 'medium' | 'large';
  riskTolerance: 'low' | 'medium' | 'high';
  timeHorizon: 'short' | 'medium' | 'long';
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}
