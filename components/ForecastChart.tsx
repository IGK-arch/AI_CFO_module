'use client';

import { useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Brain,
  Lightbulb,
  BarChart3,
  PieChart as PieChartIcon,
  ScatterChart as ScatterChartIcon,
  Download,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  AreaChart as AreaIcon
} from 'lucide-react';

export default function ForecastChart() {
  const { forecasts, kpiMetrics, aiAnalysis, bankStatements, selectedIndustry } = useAppStoreHydrated();
  const [viewMode, setViewMode] = useState<'area' | 'line' | 'bar'>('area');
  const [showConfidence, setShowConfidence] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Подготавливаем данные для графика
  const chartData = forecasts.map(forecast => ({
    date: new Date(forecast.date).toLocaleDateString('ru-RU', { 
      month: 'short', 
      day: 'numeric' 
    }),
    fullDate: forecast.date,
    p5: forecast.p5,
    p50: forecast.p50,
    p95: forecast.p95,
    confidence: Math.round(forecast.confidence * 100),
    variance: forecast.p95 - forecast.p5,
    risk: Math.round((1 - forecast.confidence) * 100)
  }));

  // Находим критические дни (когда P5 < 0)
  const criticalDays = forecasts.filter(f => f.p5 < 0);
  
  // Рассчитываем средний риск
  const avgRisk = forecasts.reduce((sum, f) => sum + (1 - f.confidence), 0) / forecasts.length * 100;

  // Анализ сезонности
  const seasonalityData = bankStatements.reduce((acc, statement) => {
    const month = new Date(statement.date).getMonth();
    acc[month] = (acc[month] || 0) + statement.amount;
    return acc;
  }, {} as { [key: number]: number });

  const seasonalityChartData = Object.entries(seasonalityData).map(([month, amount]) => ({
    month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'][parseInt(month)],
    amount: amount,
    trend: amount > 0 ? 'positive' : 'negative'
  }));

  // Анализ волатильности
  const volatilityData = forecasts.map(f => ({
    date: new Date(f.date).toLocaleDateString('ru-RU', { day: 'numeric' }),
    volatility: f.p95 - f.p5,
    confidence: f.confidence
  }));

  // Цвета для графиков
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600 bg-green-100';
    if (risk < 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 20) return 'Низкий';
    if (risk < 40) return 'Средний';
    return 'Высокий';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Прогноз денежных потоков</h2>
          <p className="text-gray-600">Вероятностное прогнозирование с интервалами доверия</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Brain className="h-4 w-4 mr-1" />
            AI-анализ
          </Badge>
          <Badge className={getRiskColor(avgRisk)}>
            Риск: {getRiskLabel(avgRisk)}
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Вид:</span>
            <Button
              variant={viewMode === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('area')}
            >
              <AreaIcon className="h-4 w-4 mr-1" />
              Область
            </Button>
            <Button
              variant={viewMode === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('line')}
            >
              <Line className="h-4 w-4 mr-1" />
              Линия
            </Button>
            <Button
              variant={viewMode === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('bar')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Столбцы
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Период:</span>
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              Неделя
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              Месяц
            </Button>
            <Button
              variant={timeRange === 'quarter' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('quarter')}
            >
              Квартал
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfidence(!showConfidence)}
          >
            {showConfidence ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showConfidence ? 'Скрыть' : 'Показать'} доверие
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Экспорт
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Обновить
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-600" />
              Средний прогноз
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(forecasts.reduce((sum, f) => sum + f.p50, 0) / forecasts.length).toLocaleString()} ₽
            </div>
            <p className="text-xs text-gray-600">P50 интервал</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
              Критические дни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {criticalDays.length}
            </div>
            <p className="text-xs text-gray-600">Дней с риском</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Уверенность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length * 100)}%
            </div>
            <p className="text-xs text-gray-600">Средняя точность</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Вероятностный прогноз денежных потоков</CardTitle>
          <CardDescription>
            P5 (пессимистичный), P50 (наиболее вероятный), P95 (оптимистичный) интервалы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'area' ? (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()} ₽`, 
                      name === 'p5' ? 'Пессимистичный (P5)' :
                      name === 'p50' ? 'Наиболее вероятный (P50)' :
                      'Оптимистичный (P95)'
                    ]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="p95"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    name="p95"
                  />
                  <Area
                    type="monotone"
                    dataKey="p50"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="p50"
                  />
                  <Area
                    type="monotone"
                    dataKey="p5"
                    stackId="3"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.1}
                    name="p5"
                  />
                </AreaChart>
              ) : viewMode === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()} ₽`, 
                      name === 'p5' ? 'Пессимистичный (P5)' :
                      name === 'p50' ? 'Наиболее вероятный (P50)' :
                      'Оптимистичный (P95)'
                    ]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="p5" stroke="#ef4444" strokeWidth={2} name="P5" />
                  <Line type="monotone" dataKey="p50" stroke="#3b82f6" strokeWidth={3} name="P50" />
                  <Line type="monotone" dataKey="p95" stroke="#10b981" strokeWidth={2} name="P95" />
                </LineChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()} ₽`, 
                      name === 'p5' ? 'Пессимистичный (P5)' :
                      name === 'p50' ? 'Наиболее вероятный (P50)' :
                      'Оптимистичный (P95)'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="p5" fill="#ef4444" name="P5" />
                  <Bar dataKey="p50" fill="#3b82f6" name="P50" />
                  <Bar dataKey="p95" fill="#10b981" name="P95" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonality Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              Сезонность денежных потоков
            </CardTitle>
            <CardDescription>
              Анализ по месяцам за последний период
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} ₽`, 'Сумма']} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Volatility Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ScatterChartIcon className="h-5 w-5 mr-2 text-purple-600" />
              Анализ волатильности
            </CardTitle>
            <CardDescription>
              Разброс прогнозов и уверенность
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={volatilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="volatility" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'volatility' ? `${Number(value).toLocaleString()} ₽` : `${Number(value)}%`,
                      name === 'volatility' ? 'Волатильность' : 'Уверенность'
                    ]}
                  />
                  <Scatter dataKey="volatility" fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              AI-анализ прогноза
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Положительные тренды
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.insights.slice(0, 2).map((insight, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <div className="font-semibold">{insight.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{insight.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Рекомендации
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.recommendations.slice(0, 2).map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <div className="font-semibold">{rec.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{rec.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical Days Alert */}
      {criticalDays.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Внимание: Критические дни
            </CardTitle>
            <CardDescription className="text-red-700">
              Обнаружены дни с высоким риском кассового разрыва
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalDays.slice(0, 3).map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div>
                    <span className="font-medium">{new Date(day.date).toLocaleDateString('ru-RU')}</span>
                    <p className="text-sm text-gray-600">Пессимистичный сценарий: {day.p5.toLocaleString()} ₽</p>
                  </div>
                  <Badge variant="destructive">Критично</Badge>
                </div>
              ))}
              {criticalDays.length > 3 && (
                <p className="text-sm text-red-600">
                  И еще {criticalDays.length - 3} критических дней...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
