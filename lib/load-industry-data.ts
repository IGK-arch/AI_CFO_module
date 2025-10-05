// Загрузка и преобразование реалистичных данных для отраслей

import { industryDatasets, IndustryTransaction } from './industry-data-generator';
import { BankStatement, ARAP, Loan, KPIMetrics, AIAnalysis, DailyForecast } from './types';
import { generateAdvancedForecast } from './generate-forecast';
import { getIndustryScenarios } from './generate-scenarios';
import { industryPresets } from './industry-presets';

export function loadIndustryData(industryId: string) {
  console.log(`🎯 loadIndustryData called with: ${industryId}`);
  console.log(`📋 Available datasets:`, Object.keys(industryDatasets));
  
  const dataset = industryDatasets[industryId as keyof typeof industryDatasets];
  
  if (!dataset) {
    console.warn(`⚠️ Отрасль ${industryId} не найдена`);
    return null;
  }

  console.log(`📊 Загрузка данных для: ${dataset.name}`);
  
  const transactions = dataset.generateTransactions();
  
  // Преобразуем транзакции в формат BankStatement
  const bankStatements: BankStatement[] = [];
  let runningBalance = 0;
  let idCounter = 1;
  
  transactions.forEach((t) => {
    runningBalance += t.amount;
    
    bankStatements.push({
      id: String(idCounter++),
      date: t.date,
      amount: t.amount,
      description: t.description,
      category: t.category,
      type: t.type,
      balance: runningBalance,
    });
  });
  
  // Генерируем дебиторскую и кредиторскую задолженность
  const arAp = generateARAPFromTransactions(transactions, dataset.name);
  
  // Генерируем займы (если были крупные разовые расходы)
  const loans = generateLoansFromData(transactions, dataset.name);
  
  // Вычисляем KPI метрики
  const kpiMetrics = calculateKPIMetrics(bankStatements);
  
  // Генерируем прогноз на основе реальных данных
  const industryCharacteristics = {
    seasonality: 0.5,
    volatility: 0.3,
  };
  
  // Для разных отраслей - разная сезонность и волатильность
  if (industryId === 'retail' || industryId === 'ecommerce') {
    industryCharacteristics.seasonality = 0.7;
    industryCharacteristics.volatility = 0.4;
  } else if (industryId === 'construction') {
    industryCharacteristics.seasonality = 0.6;
    industryCharacteristics.volatility = 0.5;
  } else if (industryId === 'services') {
    industryCharacteristics.seasonality = 0.3;
    industryCharacteristics.volatility = 0.2;
  }
  
  const forecasts = generateAdvancedForecast(bankStatements, industryCharacteristics);
  
  // Загружаем сценарии для отрасли
  const scenarios = getIndustryScenarios(industryId);
  
  // Загружаем опции финансирования для отрасли
  const preset = industryPresets.find(p => p.id === industryId);
  const financingOptions = preset?.financingOptions || [];
  
  console.log(`✅ Загружено: ${bankStatements.length} транзакций`);
  console.log(`   💰 Итоговый баланс: ${(runningBalance / 1000000).toFixed(2)} млн руб`);
  console.log(`   📊 События: ${dataset.events.length}`);
  console.log(`   📈 Прогноз: ${forecasts.length} дней`);
  console.log(`   🎲 Сценарии: ${scenarios.length}`);
  console.log(`   💳 Финансирование: ${financingOptions.length} опций`);
  
  return {
    bankStatements,
    arAp,
    loans,
    kpiMetrics,
    events: dataset.events,
    forecasts,
    scenarios,
    financingOptions,
  };
}

function generateARAPFromTransactions(transactions: IndustryTransaction[], companyName: string): ARAP[] {
  const arAp: ARAP[] = [];
  let arCounter = 1;
  let apCounter = 1;
  
  // Берем крупные транзакции и создаем из них дебиторку/кредиторку
  const recentTransactions = transactions.slice(-90); // Последние ~3 месяца
  
  recentTransactions.forEach((t) => {
    // Дебиторская задолженность (крупные доходы)
    if (t.type === 'income' && t.amount > 500000) {
      const dueDate = new Date(t.date);
      dueDate.setDate(dueDate.getDate() + 30);
      
      const paidAmount = Math.random() > 0.3 ? t.amount : t.amount * 0.7;
      
      arAp.push({
        id: `ar-${arCounter++}`,
        counterparty: getCounterpartyName(t.category, 'income'),
        type: 'receivable',
        amount: t.amount,
        paidAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: paidAmount >= t.amount ? 'paid' : 'overdue',
      });
    }
    
    // Кредиторская задолженность (крупные расходы)
    if (t.type === 'expense' && Math.abs(t.amount) > 300000) {
      const dueDate = new Date(t.date);
      dueDate.setDate(dueDate.getDate() + 20);
      
      const paidAmount = Math.random() > 0.2 ? Math.abs(t.amount) : Math.abs(t.amount) * 0.6;
      
      arAp.push({
        id: `ap-${apCounter++}`,
        counterparty: getCounterpartyName(t.category, 'expense'),
        type: 'payable',
        amount: Math.abs(t.amount),
        paidAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: paidAmount >= Math.abs(t.amount) ? 'paid' : 'pending',
      });
    }
  });
  
  return arAp;
}

function getCounterpartyName(category: string, type: 'income' | 'expense'): string {
  if (type === 'income') {
    const clients = [
      'ООО "Торговый Дом"',
      'ИП Иванов А.С.',
      'ООО "Розничные Сети"',
      'ПАО "Корпорация"',
      'ИП Петров В.М.',
      'ООО "Партнер Плюс"',
    ];
    return clients[Math.floor(Math.random() * clients.length)];
  } else {
    const suppliers: Record<string, string[]> = {
      'Материалы': ['ООО "СтройМатериалы"', 'ИП Сидоров', 'ООО "МетТорг"'],
      'Закупка товара': ['ООО "Оптовик"', 'ИП Поставщик', 'ООО "ТоварыПлюс"'],
      'Оборудование': ['ООО "ТехПром"', 'ИП Техника', 'ООО "ПромОборудование"'],
      'Лизинг': ['АО "Лизинговая компания"', 'ООО "АвтоЛизинг"'],
      'Аренда': ['ООО "Недвижимость"', 'ИП Арендодатель'],
    };
    
    const categorySuppliers = suppliers[category] || ['ООО "Поставщик"'];
    return categorySuppliers[Math.floor(Math.random() * categorySuppliers.length)];
  }
}

function generateLoansFromData(transactions: IndustryTransaction[], companyName: string): Loan[] {
  const loans: Loan[] = [];
  
  // Ищем крупные разовые расходы (покупка оборудования, ремонт и т.д.)
  const largeExpenses = transactions.filter(
    t => t.type === 'expense' && Math.abs(t.amount) > 1000000
  );
  
  largeExpenses.forEach((expense, index) => {
    const loanDate = new Date(expense.date);
    loanDate.setDate(loanDate.getDate() - 7); // Займ был взят за неделю до покупки
    
    const maturityDate = new Date(loanDate);
    maturityDate.setMonth(maturityDate.getMonth() + 24); // На 2 года
    
    const monthsPassed = Math.floor(
      (new Date().getTime() - loanDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    
    const monthlyPayment = Math.abs(expense.amount) / 24;
    const paidAmount = monthlyPayment * Math.min(monthsPassed, 24);
    
    loans.push({
      id: `loan-${index + 1}`,
      lender: index % 2 === 0 ? 'ПАО Сбербанк' : 'АО Альфа-Банк',
      amount: Math.abs(expense.amount),
      interestRate: 12 + Math.random() * 4,
      startDate: loanDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      monthlyPayment,
      remainingBalance: Math.max(0, Math.abs(expense.amount) - paidAmount),
      purpose: expense.description,
    });
  });
  
  return loans;
}

function calculateKPIMetrics(bankStatements: BankStatement[]): KPIMetrics {
  // Берем последние 90 дней
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);
  
  const recentStatements = bankStatements.filter(
    s => new Date(s.date) >= threeMonthsAgo
  );
  
  const totalIncome = recentStatements
    .filter(s => s.type === 'income')
    .reduce((sum, s) => sum + s.amount, 0);
  
  const totalExpense = Math.abs(
    recentStatements
      .filter(s => s.type === 'expense')
      .reduce((sum, s) => sum + s.amount, 0)
  );
  
  const netCashFlow = totalIncome - totalExpense;
  const avgMonthlyExpense = totalExpense / 3;
  
  const currentBalance = bankStatements[bankStatements.length - 1]?.balance || 0;
  
  // Защита от деления на ноль (если нет расходов, берем минимальные расходы)
  const minMonthlyExpense = Math.max(avgMonthlyExpense, 100000); // Минимум 100k расходов
  const runway = currentBalance / minMonthlyExpense;
  
  // Liquidity Ratio (Current Ratio approximation)
  const liquidityRatio = currentBalance / minMonthlyExpense;
  
  // Risk Score (0-100, где 100 = максимальный риск)
  let riskScore = 0;
  if (runway < 3) riskScore += 40;
  else if (runway < 6) riskScore += 20;
  
  if (netCashFlow < 0) riskScore += 30;
  else if (netCashFlow < avgMonthlyExpense * 0.2) riskScore += 15;
  
  if (liquidityRatio < 1) riskScore += 30;
  else if (liquidityRatio < 2) riskScore += 10;
  
  return {
    cashFlow: Math.round(netCashFlow),
    runway: Math.round(runway * 10) / 10,
    riskScore: Math.min(100, riskScore),
    liquidityRatio: Math.round(liquidityRatio * 10) / 10,
    burnRate: Math.round(avgMonthlyExpense),
    revenue: Math.round(totalIncome),
  };
}

// Генерация AI анализа на основе данных
export function generateAIAnalysis(
  kpiMetrics: KPIMetrics,
  industryId: string,
  events: any[]
): AIAnalysis {
  const dataset = industryDatasets[industryId as keyof typeof industryDatasets];
  
  const analysis: AIAnalysis = {
    cashFlowHealth: kpiMetrics.cashFlow > 0 ? 'good' : 'warning',
    liquidityStatus: kpiMetrics.liquidityRatio > 2 ? 'good' : kpiMetrics.liquidityRatio > 1 ? 'warning' : 'critical',
    riskLevel: kpiMetrics.riskScore < 30 ? 'low' : kpiMetrics.riskScore < 60 ? 'medium' : 'high',
    
    insights: [
      {
        type: 'cashflow',
        severity: kpiMetrics.cashFlow > 0 ? 'info' : 'warning',
        title: kpiMetrics.cashFlow > 0 ? 'Положительный денежный поток' : 'Отрицательный денежный поток',
        description: `За последние 3 месяца денежный поток составил ${(kpiMetrics.cashFlow / 1000000).toFixed(2)} млн руб.`,
        recommendation: kpiMetrics.cashFlow < 0 
          ? 'Необходимо сократить расходы или увеличить доходы'
          : 'Продолжайте поддерживать положительную динамику',
      },
      {
        type: 'runway',
        severity: kpiMetrics.runway < 3 ? 'critical' : kpiMetrics.runway < 6 ? 'warning' : 'info',
        title: `Runway: ${kpiMetrics.runway} месяцев`,
        description: `При текущих расходах денег хватит на ${kpiMetrics.runway} месяцев.`,
        recommendation: kpiMetrics.runway < 6
          ? 'Рекомендуется рассмотреть варианты привлечения финансирования'
          : 'Runway находится на безопасном уровне',
      },
    ],
    
    recommendations: [
      {
        category: 'financing',
        priority: kpiMetrics.cashFlow < 0 ? 'high' : 'medium',
        title: 'Оптимизация денежного потока',
        description: 'Рассмотрите факторинг или кредитную линию для стабилизации денежного потока',
        expectedImpact: '+20% ликвидности',
        timeframe: '1-3 месяца',
      },
    ],
    
    forecastSummary: {
      next30Days: {
        expectedInflow: (kpiMetrics.revenue || 0) / 3,
        expectedOutflow: kpiMetrics.burnRate,
        netChange: ((kpiMetrics.revenue || 0) / 3) - kpiMetrics.burnRate,
        confidence: 0.85,
      },
      next90Days: {
        expectedInflow: kpiMetrics.revenue || 0,
        expectedOutflow: kpiMetrics.burnRate * 3,
        netChange: (kpiMetrics.revenue || 0) - (kpiMetrics.burnRate * 3),
        confidence: 0.70,
      },
    },
  };
  
  return analysis;
}

