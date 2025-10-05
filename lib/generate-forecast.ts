// Генерация реалистичного прогноза ДДС на основе исторических данных

import { BankStatement, DailyForecast } from './types';

interface ForecastParams {
  historicalData: BankStatement[];
  daysAhead: number;
  seasonality?: number;
  volatility?: number;
}

export function generateRealisticForecast({
  historicalData,
  daysAhead = 90,
  seasonality = 0.5,
  volatility = 0.3,
}: ForecastParams): DailyForecast[] {
  if (!historicalData || historicalData.length === 0) {
    return generateDefaultForecast(daysAhead);
  }

  // Анализируем исторические данные
  const analysis = analyzeHistoricalData(historicalData);
  
  // Генерируем прогноз
  const forecasts: DailyForecast[] = [];
  const startDate = new Date();
  
  for (let i = 0; i < daysAhead; i++) {
    const forecastDate = new Date(startDate);
    forecastDate.setDate(forecastDate.getDate() + i);
    
    // Базовый тренд
    const dayOfWeek = forecastDate.getDay();
    const dayOfMonth = forecastDate.getDate();
    const weekOfMonth = Math.floor(dayOfMonth / 7);
    
    // Недельная сезонность (выше в будние дни)
    let weeklyMultiplier = 1.0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weeklyMultiplier = 0.4; // Выходные
    } else if (dayOfWeek === 5) {
      weeklyMultiplier = 1.3; // Пятница
    } else {
      weeklyMultiplier = 1.0 + (dayOfWeek - 1) * 0.05; // Рост к концу недели
    }
    
    // Месячная сезонность (пики в начале и конце месяца)
    let monthlyMultiplier = 1.0;
    if (dayOfMonth <= 5 || dayOfMonth >= 25) {
      monthlyMultiplier = 1.4; // Начало и конец месяца
    } else if (dayOfMonth >= 10 && dayOfMonth <= 20) {
      monthlyMultiplier = 0.8; // Середина месяца
    }
    
    // Общая сезонность отрасли
    const seasonalEffect = 1.0 + Math.sin((i / 30) * Math.PI) * seasonality;
    
    // Тренд роста
    const growthTrend = 1.0 + (i / daysAhead) * 0.15; // 15% рост за период
    
    // Случайная волатильность
    const randomFactor = 1.0 + (Math.random() - 0.5) * volatility;
    
    // Базовое значение из анализа
    const baseValue = analysis.avgDailyBalance;
    
    // Итоговое значение
    const p50 = Math.round(
      baseValue * 
      weeklyMultiplier * 
      monthlyMultiplier * 
      seasonalEffect * 
      growthTrend * 
      randomFactor
    );
    
    // Доверительные интервалы (расширяются со временем)
    const confidenceSpread = 1.0 + (i / daysAhead) * 0.5; // Растет неопределенность
    const p5 = Math.round(p50 * (0.7 - volatility * 0.3) * confidenceSpread);
    const p95 = Math.round(p50 * (1.3 + volatility * 0.3) * confidenceSpread);
    
    // Уверенность снижается со временем
    const confidence = Math.max(0.5, 0.95 - (i / daysAhead) * 0.45);
    
    forecasts.push({
      date: forecastDate.toISOString().split('T')[0],
      p5,
      p50,
      p95,
      confidence: Math.round(confidence * 100) / 100,
    });
  }
  
  return forecasts;
}

function analyzeHistoricalData(data: BankStatement[]) {
  // Берем последние 90 дней
  const recentData = data.slice(-90);
  
  if (recentData.length === 0) {
    return {
      avgDailyBalance: 500000,
      trend: 'stable',
      volatility: 0.3,
    };
  }
  
  // Средний баланс
  const avgDailyBalance = recentData.reduce((sum, d) => sum + d.balance, 0) / recentData.length;
  
  // Тренд (растет/падает)
  const firstBalance = recentData[0]?.balance || 0;
  const lastBalance = recentData[recentData.length - 1]?.balance || 0;
  const trend = lastBalance > firstBalance * 1.1 ? 'growing' : 
                lastBalance < firstBalance * 0.9 ? 'declining' : 'stable';
  
  // Волатильность
  const balances = recentData.map(d => d.balance);
  const mean = avgDailyBalance;
  const variance = balances.reduce((sum, b) => sum + Math.pow(b - mean, 2), 0) / balances.length;
  const stdDev = Math.sqrt(variance);
  const volatility = stdDev / mean;
  
  return {
    avgDailyBalance: Math.max(avgDailyBalance, 100000), // Минимум 100k
    trend,
    volatility: Math.min(volatility, 1.0), // Ограничиваем
  };
}

function generateDefaultForecast(daysAhead: number): DailyForecast[] {
  const forecasts: DailyForecast[] = [];
  const startDate = new Date();
  const baseValue = 500000;
  
  for (let i = 0; i < daysAhead; i++) {
    const forecastDate = new Date(startDate);
    forecastDate.setDate(forecastDate.getDate() + i);
    
    const dayOfWeek = forecastDate.getDay();
    const multiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.5 : 1.0;
    const trend = 1.0 + (i / daysAhead) * 0.1;
    const random = 0.9 + Math.random() * 0.2;
    
    const p50 = Math.round(baseValue * multiplier * trend * random);
    const p5 = Math.round(p50 * 0.7);
    const p95 = Math.round(p50 * 1.3);
    const confidence = Math.max(0.5, 0.9 - (i / daysAhead) * 0.4);
    
    forecasts.push({
      date: forecastDate.toISOString().split('T')[0],
      p5,
      p50,
      p95,
      confidence: Math.round(confidence * 100) / 100,
    });
  }
  
  return forecasts;
}

// Генерация прогноза с аномалиями и событиями
export function generateAdvancedForecast(
  historicalData: BankStatement[],
  industryCharacteristics: { seasonality: number; volatility: number }
): DailyForecast[] {
  const baseForecast = generateRealisticForecast({
    historicalData,
    daysAhead: 90,
    seasonality: industryCharacteristics.seasonality,
    volatility: industryCharacteristics.volatility,
  });
  
  // Добавляем события и аномалии
  return baseForecast.map((forecast, index) => {
    const date = new Date(forecast.date);
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    
    let adjustedForecast = { ...forecast };
    
    // Крупные поступления в определенные дни
    if (dayOfMonth === 5 || dayOfMonth === 20) {
      // Дни крупных платежей
      adjustedForecast.p50 = Math.round(forecast.p50 * 1.5);
      adjustedForecast.p95 = Math.round(forecast.p95 * 1.6);
      adjustedForecast.confidence = Math.min(0.95, forecast.confidence + 0.1);
    }
    
    // Просадки в середине месяца
    if (dayOfMonth >= 12 && dayOfMonth <= 18) {
      adjustedForecast.p50 = Math.round(forecast.p50 * 0.7);
      adjustedForecast.p5 = Math.round(forecast.p5 * 0.6);
    }
    
    // Резкие скачки в пятницу
    if (dayOfWeek === 5 && Math.random() > 0.5) {
      adjustedForecast.p95 = Math.round(forecast.p95 * 1.4);
    }
    
    // Неожиданные события (5% вероятность)
    if (Math.random() < 0.05) {
      const eventMultiplier = Math.random() > 0.5 ? 1.8 : 0.5;
      adjustedForecast.p50 = Math.round(forecast.p50 * eventMultiplier);
      adjustedForecast.confidence = Math.max(0.4, forecast.confidence - 0.2);
    }
    
    return adjustedForecast;
  });
}

