'use client';

import { useState, useEffect } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export default function AIWelcomePage() {
  const { 
    selectedIndustry, 
    kpiMetrics, 
    aiAnalysis, 
    setCurrentPage,
    addChatMessage 
  } = useAppStoreHydrated();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    'Анализирую ваши данные...',
    'Рассчитываю ключевые показатели...',
    'Определяю риски и возможности...',
    'Формирую персональные рекомендации...',
    'Готово!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setIsAnalyzing(false);
          clearInterval(timer);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    // Добавляем приветственное сообщение в чат
    addChatMessage({
      id: 'welcome-1',
      role: 'assistant',
      content: `Привет! Я ваш AI-ассистент CFO. Я проанализировал ваши данные и готов помочь с управлением денежными потоками. Что вас интересует в первую очередь?`,
      timestamp: new Date().toISOString(),
      actions: [
        { id: 'forecast', label: 'Посмотреть прогноз', action: 'forecast', icon: '📊' },
        { id: 'scenarios', label: 'Проанализировать сценарии', action: 'scenarios', icon: '🎯' },
        { id: 'financing', label: 'Подобрать финансирование', action: 'financing', icon: '💰' },
      ]
    });
    setCurrentPage('dashboard');
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600';
    if (risk < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return 'Низкий';
    if (risk < 60) return 'Средний';
    return 'Высокий';
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl mb-8">
            <Brain className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold text-white mb-4">
              AI-анализ ваших данных
            </h1>
            <p className="text-blue-100 text-lg">
              {analysisSteps[analysisStep]}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-4">
              {analysisSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 ${
                    index <= analysisStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index < analysisStep ? 'bg-green-500 text-white' : 
                    index === analysisStep ? 'bg-blue-500 text-white animate-pulse' : 
                    'bg-gray-200'
                  }`}>
                    {index < analysisStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={index <= analysisStep ? 'font-medium' : ''}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Добро пожаловать в CFO-AI!
          </h1>
          <p className="text-xl text-gray-600">
            Ваш персональный AI-ассистент готов к работе
          </p>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Industry Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2" />
                Ваша отрасль: {selectedIndustry?.name}
              </CardTitle>
              <CardDescription>
                {selectedIndustry?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Сезонность:</span>
                  <Badge variant="outline">
                    {Math.round((selectedIndustry?.characteristics.seasonality || 0) * 100)}%      
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Волатильность:</span>
                  <Badge variant="outline">
                    {Math.round((selectedIndustry?.characteristics.volatility || 0) * 100)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">DSO:</span>
                  <Badge variant="outline">
                    {selectedIndustry?.characteristics.dso || 0} дней
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Ключевые показатели
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Денежный поток:</span>
                  <span className="font-semibold text-green-600">
                    {kpiMetrics?.cashFlow.toLocaleString()} ₽
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Burn Rate:</span>
                  <span className="font-semibold">
                    {kpiMetrics?.burnRate.toLocaleString()} ₽/мес
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Runway:</span>
                  <span className="font-semibold">
                    {kpiMetrics?.runway && isFinite(kpiMetrics.runway) 
                      ? `${kpiMetrics.runway} месяцев` 
                      : 'Н/Д'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Риск:</span>
                  <Badge 
                    variant="outline" 
                    className={getRiskColor(kpiMetrics?.riskScore || 0)}
                  >
                    {getRiskLabel(kpiMetrics?.riskScore || 0)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              AI-анализ и рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Сильные стороны
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis?.insights.slice(0, 2).map((insight, index) => (
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
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Рекомендации
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis?.recommendations.slice(0, 2).map((rec, index) => (
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

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Быстрые действия
            </CardTitle>
            <CardDescription>
              Начните с этих действий для оптимизации вашего бизнеса
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setCurrentPage('dashboard')}
              >
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <span className="font-semibold">Прогноз ДДС</span>
                <span className="text-sm text-gray-600">Анализ денежных потоков</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setCurrentPage('dashboard')}
              >
                <Target className="h-8 w-8 text-green-600" />
                <span className="font-semibold">Сценарии</span>
                <span className="text-sm text-gray-600">Стресс-тесты и планирование</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setCurrentPage('dashboard')}
              >
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <span className="font-semibold">Финансирование</span>
                <span className="text-sm text-gray-600">Подбор инструментов</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Перейти к дашборду
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
