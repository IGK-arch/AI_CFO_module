import { BankStatement, ARAP, Loan, PurposeMapping, DailyForecast, KPIMetrics, AIAnalysis } from './types';

// Демо-данные для розничной торговли
export const demoBankStatements: BankStatement[] = [
  // Январь 2024
  { id: '1', date: '2024-01-02', amount: 150000, description: 'Поступление от ООО "Торговый дом"', category: 'Выручка', type: 'income', balance: 150000 },
  { id: '2', date: '2024-01-03', amount: -25000, description: 'Аренда помещения', category: 'Аренда', type: 'expense', balance: 125000 },
  { id: '3', date: '2024-01-05', amount: 200000, description: 'Поступление от ИП Иванов', category: 'Выручка', type: 'income', balance: 325000 },
  { id: '4', date: '2024-01-08', amount: -50000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 275000 },
  { id: '5', date: '2024-01-10', amount: -15000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 260000 },
  { id: '6', date: '2024-01-12', amount: 180000, description: 'Поступление от ООО "Розница"', category: 'Выручка', type: 'income', balance: 440000 },
  { id: '7', date: '2024-01-15', amount: -30000, description: 'Коммунальные услуги', category: 'Коммунальные', type: 'expense', balance: 410000 },
  { id: '8', date: '2024-01-18', amount: 220000, description: 'Поступление от ООО "Торговый центр"', category: 'Выручка', type: 'income', balance: 630000 },
  { id: '9', date: '2024-01-20', amount: -40000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 590000 },
  { id: '10', date: '2024-01-22', amount: -20000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 570000 },
  { id: '11', date: '2024-01-25', amount: 190000, description: 'Поступление от ИП Петров', category: 'Выручка', type: 'income', balance: 760000 },
  { id: '12', date: '2024-01-28', amount: -25000, description: 'Аренда помещения', category: 'Аренда', type: 'expense', balance: 735000 },
  { id: '13', date: '2024-01-30', amount: -10000, description: 'Налоги и сборы', category: 'Налоги', type: 'expense', balance: 725000 },
  
  // Февраль 2024
  { id: '14', date: '2024-02-02', amount: 160000, description: 'Поступление от ООО "Торговый дом"', category: 'Выручка', type: 'income', balance: 885000 },
  { id: '15', date: '2024-02-05', amount: -30000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 855000 },
  { id: '16', date: '2024-02-08', amount: 210000, description: 'Поступление от ООО "Розница"', category: 'Выручка', type: 'income', balance: 1065000 },
  { id: '17', date: '2024-02-10', amount: -15000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 1050000 },
  { id: '18', date: '2024-02-12', amount: -25000, description: 'Аренда помещения', category: 'Аренда', type: 'expense', balance: 1025000 },
  { id: '19', date: '2024-02-15', amount: 175000, description: 'Поступление от ИП Иванов', category: 'Выручка', type: 'income', balance: 1200000 },
  { id: '20', date: '2024-02-18', amount: -35000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 1165000 },
  { id: '21', date: '2024-02-20', amount: -20000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 1145000 },
  { id: '22', date: '2024-02-22', amount: 195000, description: 'Поступление от ООО "Торговый центр"', category: 'Выручка', type: 'income', balance: 1340000 },
  { id: '23', date: '2024-02-25', amount: -30000, description: 'Коммунальные услуги', category: 'Коммунальные', type: 'expense', balance: 1310000 },
  { id: '24', date: '2024-02-28', amount: 180000, description: 'Поступление от ИП Петров', category: 'Выручка', type: 'income', balance: 1490000 },
  
  // Март 2024
  { id: '25', date: '2024-03-02', amount: 170000, description: 'Поступление от ООО "Торговый дом"', category: 'Выручка', type: 'income', balance: 1660000 },
  { id: '26', date: '2024-03-05', amount: -40000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 1620000 },
  { id: '27', date: '2024-03-08', amount: 200000, description: 'Поступление от ООО "Розница"', category: 'Выручка', type: 'income', balance: 1820000 },
  { id: '28', date: '2024-03-10', amount: -15000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 1805000 },
  { id: '29', date: '2024-03-12', amount: -25000, description: 'Аренда помещения', category: 'Аренда', type: 'expense', balance: 1780000 },
  { id: '30', date: '2024-03-15', amount: 185000, description: 'Поступление от ИП Иванов', category: 'Выручка', type: 'income', balance: 1965000 },
  { id: '31', date: '2024-03-18', amount: -30000, description: 'Закупка товара у поставщика', category: 'Закупки', type: 'expense', balance: 1935000 },
  { id: '32', date: '2024-03-20', amount: -20000, description: 'Зарплата сотрудников', category: 'Зарплата', type: 'expense', balance: 1915000 },
  { id: '33', date: '2024-03-22', amount: 220000, description: 'Поступление от ООО "Торговый центр"', category: 'Выручка', type: 'income', balance: 2135000 },
  { id: '34', date: '2024-03-25', amount: -35000, description: 'Коммунальные услуги', category: 'Коммунальные', type: 'expense', balance: 2100000 },
  { id: '35', date: '2024-03-28', amount: 190000, description: 'Поступление от ИП Петров', category: 'Выручка', type: 'income', balance: 2290000 },
  { id: '36', date: '2024-03-30', amount: -15000, description: 'Налоги и сборы', category: 'Налоги', type: 'expense', balance: 2275000 },
];

export const demoARAP: ARAP[] = [
  {
    id: '1',
    counterparty: 'ООО "Торговый дом"',
    amount: 150000,
    dueDate: '2024-04-15',
    type: 'receivable',
    status: 'open',
    description: 'Оплата за поставленный товар',
  },
  {
    id: '2',
    counterparty: 'ООО "Розница"',
    amount: 200000,
    dueDate: '2024-04-20',
    type: 'receivable',
    status: 'open',
    description: 'Оплата за поставленный товар',
  },
  {
    id: '3',
    counterparty: 'ИП Иванов',
    amount: 180000,
    dueDate: '2024-04-25',
    type: 'receivable',
    status: 'open',
    description: 'Оплата за поставленный товар',
  },
  {
    id: '4',
    counterparty: 'ООО "Поставщик товаров"',
    amount: 300000,
    dueDate: '2024-04-10',
    type: 'payable',
    status: 'open',
    description: 'Оплата за поставленный товар',
  },
  {
    id: '5',
    counterparty: 'ООО "Логистика"',
    amount: 50000,
    dueDate: '2024-04-05',
    type: 'payable',
    status: 'open',
    description: 'Услуги по доставке',
  },
  {
    id: '6',
    counterparty: 'ООО "Маркетинг"',
    amount: 75000,
    dueDate: '2024-04-12',
    type: 'payable',
    status: 'open',
    description: 'Рекламные услуги',
  },
];

export const demoLoans: Loan[] = [
  {
    id: '1',
    name: 'Торговый кредит',
    amount: 2000000,
    interestRate: 12,
    term: 12,
    monthlyPayment: 177000,
    remainingBalance: 1500000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'credit',
  },
  {
    id: '2',
    name: 'Овердрафт',
    amount: 500000,
    interestRate: 18,
    term: 1,
    monthlyPayment: 0,
    remainingBalance: 200000,
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    type: 'overdraft',
  },
];

export const demoPurposeMappings: PurposeMapping[] = [
  { id: '1', description: 'Поступление от ООО "Торговый дом"', category: 'Выручка', subcategory: 'Оптовая торговля', isIncome: true },
  { id: '2', description: 'Поступление от ООО "Розница"', category: 'Выручка', subcategory: 'Розничная торговля', isIncome: true },
  { id: '3', description: 'Поступление от ИП Иванов', category: 'Выручка', subcategory: 'Розничная торговля', isIncome: true },
  { id: '4', description: 'Закупка товара у поставщика', category: 'Закупки', subcategory: 'Товары для перепродажи', isIncome: false },
  { id: '5', description: 'Аренда помещения', category: 'Аренда', subcategory: 'Торговое помещение', isIncome: false },
  { id: '6', description: 'Зарплата сотрудников', category: 'Зарплата', subcategory: 'Основная зарплата', isIncome: false },
  { id: '7', description: 'Коммунальные услуги', category: 'Коммунальные', subcategory: 'Электроэнергия', isIncome: false },
  { id: '8', description: 'Налоги и сборы', category: 'Налоги', subcategory: 'НДС', isIncome: false },
];

export const demoForecasts: DailyForecast[] = [
  { date: '2024-04-01', p5: 180000, p50: 220000, p95: 280000, confidence: 0.85 },
  { date: '2024-04-02', p5: 190000, p50: 230000, p95: 290000, confidence: 0.87 },
  { date: '2024-04-03', p5: 200000, p50: 240000, p95: 300000, confidence: 0.89 },
  { date: '2024-04-04', p5: 210000, p50: 250000, p95: 310000, confidence: 0.91 },
  { date: '2024-04-05', p5: 220000, p50: 260000, p95: 320000, confidence: 0.93 },
  { date: '2024-04-06', p5: 230000, p50: 270000, p95: 330000, confidence: 0.95 },
  { date: '2024-04-07', p5: 240000, p50: 280000, p95: 340000, confidence: 0.97 },
  { date: '2024-04-08', p5: 250000, p50: 290000, p95: 350000, confidence: 0.98 },
  { date: '2024-04-09', p5: 260000, p50: 300000, p95: 360000, confidence: 0.99 },
  { date: '2024-04-10', p5: 270000, p50: 310000, p95: 370000, confidence: 0.99 },
  { date: '2024-04-11', p5: 280000, p50: 320000, p95: 380000, confidence: 0.99 },
  { date: '2024-04-12', p5: 290000, p50: 330000, p95: 390000, confidence: 0.99 },
  { date: '2024-04-13', p5: 300000, p50: 340000, p95: 400000, confidence: 0.99 },
  { date: '2024-04-14', p5: 310000, p50: 350000, p95: 410000, confidence: 0.99 },
  { date: '2024-04-15', p5: 320000, p50: 360000, p95: 420000, confidence: 0.99 },
  { date: '2024-04-16', p5: 330000, p50: 370000, p95: 430000, confidence: 0.99 },
  { date: '2024-04-17', p5: 340000, p50: 380000, p95: 440000, confidence: 0.99 },
  { date: '2024-04-18', p5: 350000, p50: 390000, p95: 450000, confidence: 0.99 },
  { date: '2024-04-19', p5: 360000, p50: 400000, p95: 460000, confidence: 0.99 },
  { date: '2024-04-20', p5: 370000, p50: 410000, p95: 470000, confidence: 0.99 },
  { date: '2024-04-21', p5: 380000, p50: 420000, p95: 480000, confidence: 0.99 },
  { date: '2024-04-22', p5: 390000, p50: 430000, p95: 490000, confidence: 0.99 },
  { date: '2024-04-23', p5: 400000, p50: 440000, p95: 500000, confidence: 0.99 },
  { date: '2024-04-24', p5: 410000, p50: 450000, p95: 510000, confidence: 0.99 },
  { date: '2024-04-25', p5: 420000, p50: 460000, p95: 520000, confidence: 0.99 },
  { date: '2024-04-26', p5: 430000, p50: 470000, p95: 530000, confidence: 0.99 },
  { date: '2024-04-27', p5: 440000, p50: 480000, p95: 540000, confidence: 0.99 },
  { date: '2024-04-28', p5: 450000, p50: 490000, p95: 550000, confidence: 0.99 },
  { date: '2024-04-29', p5: 460000, p50: 500000, p95: 560000, confidence: 0.99 },
  { date: '2024-04-30', p5: 470000, p50: 510000, p95: 570000, confidence: 0.99 },
];

export const demoKPIMetrics: KPIMetrics = {
  cashFlow: 2275000,
  burnRate: 150000,
  runway: 15,
  dso: 15,
  dpo: 30,
  dio: 45,
  liquidityRatio: 2.5,
  riskScore: 25,
};

export const demoAIAnalysis: AIAnalysis = {
  cashFlowHealth: 'good',
  liquidityStatus: 'good',
  riskLevel: 'low',
  
  insights: [
    {
      type: 'growth',
      severity: 'info',
      title: 'Стабильный рост выручки',
      description: 'Ваш бизнес показывает стабильный рост выручки на 15% в месяц',
      recommendation: 'Продолжайте поддерживать текущую динамику роста',
    },
    {
      type: 'seasonality',
      severity: 'info',
      title: 'Низкая сезонность',
      description: 'Сезонность в розничной торговле выражена слабо, что говорит о стабильном спросе',
      recommendation: 'Используйте стабильность для планирования долгосрочных инвестиций',
    },
    {
      type: 'dso',
      severity: 'info',
      title: 'Отличный DSO показатель',
      description: 'Коэффициент оборачиваемости дебиторской задолженности (DSO) составляет 15 дней - это отличный показатель',
      recommendation: 'Поддерживайте текущую политику работы с дебиторами',
    },
  ],
  
  recommendations: [
    {
      category: 'inventory',
      priority: 'medium',
      title: 'Увеличение товарных запасов',
      description: 'Рассмотрите возможность увеличения товарных запасов для роста продаж',
      expectedImpact: '+10-15% выручки',
      timeframe: '2-3 месяца',
    },
    {
      category: 'operations',
      priority: 'medium',
      title: 'Оптимизация работы с поставщиками',
      description: 'Оптимизируйте работу с поставщиками для улучшения условий поставки',
      expectedImpact: '-5% себестоимости',
      timeframe: '1-2 месяца',
    },
    {
      category: 'financing',
      priority: 'low',
      title: 'Торговый кредит',
      description: 'Рассмотрите возможность получения торгового кредита для расширения',
      expectedImpact: 'Ускорение роста',
      timeframe: '1 месяц',
    },
  ],
  
  forecastSummary: {
    next30Days: {
      expectedInflow: 5000000,
      expectedOutflow: 4200000,
      netChange: 800000,
      confidence: 0.85,
    },
    next90Days: {
      expectedInflow: 16500000,
      expectedOutflow: 13800000,
      netChange: 2700000,
      confidence: 0.70,
    },
  },
  
  risks: [
    'Риск кассового разрыва в случае задержки платежей от крупных клиентов',
    'Сезонные колебания спроса могут повлиять на денежный поток',
    'Зависимость от ограниченного круга поставщиков',
  ],
  
  opportunities: [
    'Возможность расширения ассортимента товаров',
    'Выход на новые рынки сбыта',
    'Оптимизация логистических процессов',
    'Внедрение цифровых технологий для повышения эффективности',
  ],
  
  confidence: 0.92,
};
