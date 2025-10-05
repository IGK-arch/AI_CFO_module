import { BankStatement, ARAP, Loan, KPIMetrics, DailyForecast, IndustryPreset, Scenario, FinancingOption } from './types';

export interface ComprehensiveAnalysis {
  cashFlowAnalysis: {
    trends: string[];
    seasonality: string[];
    volatility: string[];
    criticalDays: string[];
  };
  riskAssessment: {
    liquidityRisks: string[];
    creditRisks: string[];
    marketRisks: string[];
    operationalRisks: string[];
  };
  scenarioInsights: {
    optimistic: string[];
    pessimistic: string[];
    stress: string[];
  };
  financingRecommendations: {
    suitable: string[];
    alternatives: string[];
    timing: string[];
  };
  industrySpecific: {
    characteristics: string[];
    opportunities: string[];
    threats: string[];
  };
  actionableInsights: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export class AIAnalyzer {
  private bankStatements: BankStatement[];
  private arAp: ARAP[];
  private loans: Loan[];
  private forecasts: DailyForecast[];
  private kpiMetrics: KPIMetrics;
  private industry: IndustryPreset;
  private scenarios: Scenario[];
  private financingOptions: FinancingOption[];

  constructor(
    bankStatements: BankStatement[],
    arAp: ARAP[],
    loans: Loan[],
    forecasts: DailyForecast[],
    kpiMetrics: KPIMetrics,
    industry: IndustryPreset,
    scenarios: Scenario[],
    financingOptions: FinancingOption[]
  ) {
    this.bankStatements = bankStatements;
    this.arAp = arAp;
    this.loans = loans;
    this.forecasts = forecasts;
    this.kpiMetrics = kpiMetrics;
    this.industry = industry;
    this.scenarios = scenarios;
    this.financingOptions = financingOptions;
  }

  analyzeCashFlow(): string[] {
    const insights: string[] = [];
    
    // Анализ трендов
    const recentStatements = this.bankStatements.slice(-30);
    const income = recentStatements.filter(s => s.type === 'income').reduce((sum, s) => sum + s.amount, 0);
    const expenses = recentStatements.filter(s => s.type === 'expense').reduce((sum, s) => sum + Math.abs(s.amount), 0);
    
    if (income > expenses * 1.2) {
      insights.push(`Отличная прибыльность: доходы превышают расходы на ${Math.round((income/expenses - 1) * 100)}%`);
    } else if (income < expenses) {
      insights.push(`⚠️ Критическая ситуация: расходы превышают доходы на ${Math.round((expenses/income - 1) * 100)}%`);
    }

    // Анализ сезонности
    const monthlyData = this.groupByMonth(recentStatements);
    const seasonality = this.calculateSeasonality(monthlyData);
    if (seasonality > 0.3) {
      insights.push(`Высокая сезонность (${Math.round(seasonality * 100)}%): планируйте резервы на низкие периоды`);
    }

    // Анализ волатильности
    const volatility = this.calculateVolatility(monthlyData);
    if (volatility > 0.4) {
      insights.push(`Высокая волатильность денежных потоков (${Math.round(volatility * 100)}%): рассмотрите стабилизацию`);
    }

    return insights;
  }

  analyzeRisks(): string[] {
    const risks: string[] = [];
    
    // Риски ликвидности
    if (this.kpiMetrics.liquidityRatio < 1.5) {
      risks.push(`Низкая ликвидность (${this.kpiMetrics.liquidityRatio}x): риск кассового разрыва`);
    }
    
    if (this.kpiMetrics.runway < 3) {
      risks.push(`Критический runway (${this.kpiMetrics.runway} мес): срочно нужны дополнительные средства`);
    }

    // Кредитные риски
    const overdueReceivables = this.arAp.filter(a => a.status === 'overdue' && a.type === 'receivable');
    if (overdueReceivables.length > 0) {
      risks.push(`${overdueReceivables.length} просроченных дебиторских задолженностей на сумму ${overdueReceivables.reduce((sum, a) => sum + a.amount, 0).toLocaleString()} ₽`);
    }

    // Рыночные риски
    if (this.industry.characteristics.volatility > 0.6) {
      risks.push(`Высокая волатильность отрасли (${Math.round(this.industry.characteristics.volatility * 100)}%): диверсифицируйте риски`);
    }

    return risks;
  }

  analyzeScenarios(): string[] {
    const insights: string[] = [];
    
    this.scenarios.forEach(scenario => {
      if (scenario.results && scenario.results.riskScore > 70) {
        insights.push(`Сценарий "${scenario.name}" имеет высокий риск (${scenario.results.riskScore}%): ${scenario.results.recommendations[0]}`);
      } else if (scenario.probability && scenario.probability > 0.7) {
        insights.push(`Сценарий "${scenario.name}" имеет высокую вероятность (${Math.round(scenario.probability * 100)}%)`);
      }
    });

    return insights;
  }

  analyzeFinancing(): string[] {
    const recommendations: string[] = [];
    
    const suitableOptions = this.financingOptions.filter(option => option.suitability > 80);
    if (suitableOptions.length > 0) {
      recommendations.push(`Рекомендуем ${suitableOptions[0].name}: подходит на ${suitableOptions[0].suitability}% для вашей отрасли`);
    }

    if (this.kpiMetrics.cashFlow < 0) {
      recommendations.push(`Срочно рассмотрите ${this.industry.name === 'retail' ? 'торговый кредит' : 'овердрафт'} для покрытия кассового разрыва`);
    }

    return recommendations;
  }

  generateComprehensiveAnalysis(): ComprehensiveAnalysis {
    return {
      cashFlowAnalysis: {
        trends: this.analyzeCashFlow(),
        seasonality: [`Сезонность отрасли: ${Math.round(this.industry.characteristics.seasonality * 100)}%`],
        volatility: [`Волатильность: ${Math.round(this.industry.characteristics.volatility * 100)}%`],
        criticalDays: this.forecasts.filter(f => f.p5 < 0).map(f => 
          `Критический день ${new Date(f.date).toLocaleDateString()}: ${f.p5.toLocaleString()} ₽`
        )
      },
      riskAssessment: {
        liquidityRisks: this.analyzeRisks(),
        creditRisks: this.arAp.filter(a => a.status === 'overdue').map(a => 
          `Просрочка ${a.counterparty}: ${a.amount.toLocaleString()} ₽`
        ),
        marketRisks: [`Рыночный риск отрасли: ${Math.round(this.industry.characteristics.volatility * 100)}%`],
        operationalRisks: [`Операционный риск: ${this.kpiMetrics.riskScore}%`]
      },
      scenarioInsights: {
        optimistic: this.scenarios.filter(s => s.type === 'optimistic').map(s => 
          `Оптимистичный сценарий: ${s.results?.recommendations[0] || s.recommendations?.[0] || s.description}`
        ),
        pessimistic: this.scenarios.filter(s => s.type === 'pessimistic').map(s => 
          `Пессимистичный сценарий: ${s.results?.recommendations[0] || s.recommendations?.[0] || s.description}`
        ),
        stress: this.scenarios.filter(s => s.type === 'stress').map(s => 
          `Стресс-тест: ${s.results?.recommendations[0] || s.recommendations?.[0] || s.description}`
        )
      },
      financingRecommendations: {
        suitable: this.analyzeFinancing(),
        alternatives: this.financingOptions.slice(0, 3).map(option => 
          `Альтернатива: ${option.name} (${option.suitability}%)`
        ),
        timing: [`Рекомендуемое время: ${this.getOptimalFinancingTiming()}`]
      },
      industrySpecific: {
        characteristics: [
          `DSO: ${this.industry.characteristics.dso} дней`,
          `DPO: ${this.industry.characteristics.dpo} дней`,
          `DIO: ${this.industry.characteristics.dio} дней`
        ],
        opportunities: this.identifyOpportunities(),
        threats: this.identifyThreats()
      },
      actionableInsights: {
        immediate: this.getImmediateActions(),
        shortTerm: this.getShortTermActions(),
        longTerm: this.getLongTermActions()
      }
    };
  }

  private groupByMonth(statements: BankStatement[]): { [key: string]: number } {
    const monthly: { [key: string]: number } = {};
    statements.forEach(statement => {
      const month = new Date(statement.date).toISOString().slice(0, 7);
      monthly[month] = (monthly[month] || 0) + statement.amount;
    });
    return monthly;
  }

  private calculateSeasonality(monthlyData: { [key: string]: number }): number {
    const values = Object.values(monthlyData);
    if (values.length < 2) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance) / Math.abs(mean);
  }

  private calculateVolatility(monthlyData: { [key: string]: number }): number {
    const values = Object.values(monthlyData);
    if (values.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < values.length; i++) {
      returns.push((values[i] - values[i-1]) / values[i-1]);
    }
    
    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / returns.length;
    return Math.sqrt(variance);
  }

  private identifyOpportunities(): string[] {
    const opportunities: string[] = [];
    
    if (this.kpiMetrics.dso && this.kpiMetrics.dso < 20) {
      opportunities.push('Отличная работа с дебиторской задолженностью - можно увеличить объемы');
    }
    
    if (this.kpiMetrics.liquidityRatio > 2) {
      opportunities.push('Высокая ликвидность - можно инвестировать в развитие');
    }
    
    return opportunities;
  }

  private identifyThreats(): string[] {
    const threats: string[] = [];
    
    if (this.kpiMetrics.riskScore > 60) {
      threats.push('Высокий общий риск требует внимания');
    }
    
    if (this.forecasts.some(f => f.p5 < 0)) {
      threats.push('Прогнозируются кассовые разрывы');
    }
    
    return threats;
  }

  private getImmediateActions(): string[] {
    const actions: string[] = [];
    
    if (this.kpiMetrics.cashFlow < 0) {
      actions.push('Срочно найти источники финансирования');
    }
    
    const overdueCount = this.arAp.filter(a => a.status === 'overdue').length;
    if (overdueCount > 0) {
      actions.push(`Взыскать ${overdueCount} просроченных задолженностей`);
    }
    
    return actions;
  }

  private getShortTermActions(): string[] {
    return [
      'Оптимизировать работу с дебиторской задолженностью',
      'Рассмотреть варианты краткосрочного финансирования',
      'Провести анализ операционных расходов'
    ];
  }

  private getLongTermActions(): string[] {
    return [
      'Разработать стратегию долгосрочного финансирования',
      'Диверсифицировать источники дохода',
      'Создать резервный фонд'
    ];
  }

  private getOptimalFinancingTiming(): string {
    const currentMonth = new Date().getMonth();
    const seasonality = this.industry.characteristics.seasonality;
    
    if (seasonality > 0.7) {
      return 'За 2-3 месяца до пикового сезона';
    } else if (this.kpiMetrics.runway < 6) {
      return 'Немедленно';
    } else {
      return 'В течение 1-2 месяцев';
    }
  }
}
