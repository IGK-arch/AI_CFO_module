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
  ResponsiveContainer
} from 'recharts';
import { 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Brain,
  Lightbulb,
  CheckCircle,
  Zap,
  Clock,
  BarChart3
} from 'lucide-react';

export default function AdvancedScenarios() {
  const { scenarios, selectedIndustry, kpiMetrics } = useAppStoreHydrated();
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setIsAnalyzing(true);
    
    // Симуляция AI-анализа
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'optimistic': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'pessimistic': return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'stress': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default: return <Target className="h-5 w-5 text-blue-600" />;
    }
  };

  const getScenarioColor = (type: string) => {
    switch (type) {
      case 'optimistic': return 'text-green-600 bg-green-100';
      case 'pessimistic': return 'text-red-600 bg-red-100';
      case 'stress': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'short': return 'Краткосрочный (1-3 мес)';
      case 'medium': return 'Среднесрочный (3-12 мес)';
      case 'long': return 'Долгосрочный (1+ год)';
      default: return 'Неопределенный';
    }
  };

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case 'short': return <Zap className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'long': return <BarChart3 className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);

  // Генерируем данные для графика на основе выбранного сценария
  const generateChartData = (scenario: any) => {
    if (!scenario) return [];
    
    const baseAmount = kpiMetrics?.cashFlow || 500000;
    const months = scenario.timeframe === 'short' ? 3 : scenario.timeframe === 'medium' ? 12 : 24;
    
    // Определяем мультипликаторы из parameters или impact
    let revenueChange = 0;
    let costChange = 0;
    
    if (scenario.parameters) {
      revenueChange = scenario.parameters.revenueChange || 0;
      costChange = scenario.parameters.costChange || 0;
    } else if (scenario.impact) {
      revenueChange = (scenario.impact.revenue - 1); // Конвертируем мультипликатор в изменение
      costChange = (scenario.impact.costs - 1);
    }
    
    const riskScore = scenario.results?.riskScore || (scenario.probability ? (1 - scenario.probability) * 100 : 50);
    
    return Array.from({ length: months }, (_, i) => ({
      month: `Месяц ${i + 1}`,
      cashFlow: baseAmount * (1 + revenueChange - costChange) * (1 + i * 0.1),
      risk: riskScore,
      confidence: Math.max(0.5, 1 - (i * 0.05))
    }));
  };

  const chartData = selectedScenarioData ? generateChartData(selectedScenarioData) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Продвинутые сценарии</h2>
          <p className="text-gray-600">Персонализированные сценарии с AI-анализом</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Brain className="h-4 w-4 mr-1" />
            AI-анализ
          </Badge>
          <Badge variant="outline" className="text-sm">
            {selectedIndustry?.name}
          </Badge>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedScenario === scenario.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getScenarioIcon(scenario.type || 'custom')}
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                </div>
                <Badge className={getScenarioColor(scenario.type || 'custom')}>
                  {scenario.type === 'optimistic' ? 'Оптимистичный' :
                   scenario.type === 'pessimistic' ? 'Пессимистичный' :
                   scenario.type === 'stress' ? 'Стресс-тест' : 
                   scenario.probability ? `Вероятность ${Math.round(scenario.probability * 100)}%` : 'Пользовательский'}
                </Badge>
              </div>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Временной горизонт:</span>
                  <div className="flex items-center space-x-1">
                    {getTimeframeIcon(scenario.timeframe)}
                    <span>{getTimeframeLabel(scenario.timeframe)}</span>
                  </div>
                </div>
                
                {(scenario.results?.riskScore !== undefined || scenario.probability !== undefined) && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Риск:</span>
                    <Badge 
                      className={
                        (scenario.results?.riskScore || (scenario.probability ? (1 - scenario.probability) * 100 : 50)) < 30 ? 'text-green-600 bg-green-100' :
                        (scenario.results?.riskScore || (scenario.probability ? (1 - scenario.probability) * 100 : 50)) < 60 ? 'text-yellow-600 bg-yellow-100' :
                        'text-red-600 bg-red-100'
                      }
                    >
                      {Math.round(scenario.results?.riskScore || (scenario.probability ? (1 - scenario.probability) * 100 : 50))}%
                    </Badge>
                  </div>
                )}

                {scenario.impact && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Выручка:</span>
                      <span className={`font-medium ${scenario.impact.revenue > 1 ? 'text-green-600' : 'text-red-600'}`}>
                        {scenario.impact.revenue > 1 ? '+' : ''}{Math.round((scenario.impact.revenue - 1) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Расходы:</span>
                      <span className={`font-medium ${scenario.impact.costs > 1 ? 'text-red-600' : 'text-green-600'}`}>
                        {scenario.impact.costs > 1 ? '+' : ''}{Math.round((scenario.impact.costs - 1) * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                {scenario.parameters && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Изменение выручки:</span>
                    <span className={`font-medium ${
                      scenario.parameters.revenueChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {scenario.parameters.revenueChange > 0 ? '+' : ''}{Math.round(scenario.parameters.revenueChange * 100)}%
                    </span>
                  </div>
                )}

                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyzeScenario(scenario.id);
                  }}
                  className="w-full"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-spin" />
                      Анализирую...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      AI-анализ
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Scenario Analysis */}
      {selectedScenarioData && !isAnalyzing && (
        <div className="space-y-6">
          {/* Scenario Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Анализ сценария: {selectedScenarioData.name}
              </CardTitle>
              <CardDescription>
                {selectedScenarioData.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedScenarioData.parameters && (
                  <>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(selectedScenarioData.parameters.revenueChange * 100)}%
                      </div>
                      <p className="text-sm text-gray-600">Изменение выручки</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {Math.round(selectedScenarioData.parameters.costChange * 100)}%
                      </div>
                      <p className="text-sm text-gray-600">Изменение затрат</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedScenarioData.parameters.paymentDelay}д
                      </div>
                      <p className="text-sm text-gray-600">Задержка платежей</p>
                    </div>
                  </>
                )}
                
                {selectedScenarioData.impact && (
                  <>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        x{selectedScenarioData.impact.revenue}
                      </div>
                      <p className="text-sm text-gray-600">Выручка</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        x{selectedScenarioData.impact.costs}
                      </div>
                      <p className="text-sm text-gray-600">Расходы</p>
                    </div>
                  </>
                )}
                
                {selectedScenarioData.probability && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(selectedScenarioData.probability * 100)}%
                    </div>
                    <p className="text-sm text-gray-600">Вероятность</p>
                  </div>
                )}
                
                {selectedScenarioData.results && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedScenarioData.results.riskScore}%
                    </div>
                    <p className="text-sm text-gray-600">Уровень риска</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Прогноз денежных потоков</CardTitle>
              <CardDescription>
                Динамика денежных потоков в рамках выбранного сценария
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${Number(value).toLocaleString()} ₽`, 
                        name === 'cashFlow' ? 'Денежный поток' : 'Риск'
                      ]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="cashFlow" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                AI-рекомендации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Рекомендации по управлению
                  </h4>
                  <ul className="space-y-2">
                    {(selectedScenarioData.results?.recommendations || selectedScenarioData.recommendations || []).map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Дополнительные меры
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Рассмотрите возможность получения кредитной линии для покрытия кассовых разрывов
                    </li>
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Оптимизируйте работу с дебиторской задолженностью
                    </li>
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Внедрите систему мониторинга денежных потоков в реальном времени
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
