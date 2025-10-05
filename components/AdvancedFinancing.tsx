'use client';

import { useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Brain,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
  Star,
  BarChart3,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';

export default function AdvancedFinancing() {
  const { financingOptions, selectedIndustry, kpiMetrics } = useAppStoreHydrated();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeOption = (optionId: string) => {
    setSelectedOption(optionId);
    setIsAnalyzing(true);
    
    // Симуляция AI-анализа
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit': return <DollarSign className="h-5 w-5 text-blue-600" />;
      case 'factoring': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'leasing': return <BarChart3 className="h-5 w-5 text-purple-600" />;
      case 'overdraft': return <Zap className="h-5 w-5 text-orange-600" />;
      case 'investment': return <Target className="h-5 w-5 text-indigo-600" />;
      default: return <DollarSign className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'credit': return 'Кредит';
      case 'factoring': return 'Факторинг';
      case 'leasing': return 'Лизинг';
      case 'overdraft': return 'Овердрафт';
      case 'investment': return 'Инвестиции';
      default: return 'Финансирование';
    }
  };

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return 'text-green-600 bg-green-100';
    if (suitability >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSuitabilityLabel = (suitability: number) => {
    if (suitability >= 90) return 'Отлично подходит';
    if (suitability >= 70) return 'Хорошо подходит';
    return 'Не рекомендуется';
  };

  const selectedOptionData = financingOptions.find(option => option.id === selectedOption);

  // Сортируем опции по пригодности
  const sortedOptions = [...financingOptions].sort((a, b) => b.suitability - a.suitability);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Подбор финансирования</h2>
          <p className="text-gray-600">Отраслевые инструменты финансирования с AI-рекомендациями</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Brain className="h-4 w-4 mr-1" />
            Learning-to-Rank
          </Badge>
          <Badge variant="outline" className="text-sm">
            {selectedIndustry?.name}
          </Badge>
        </div>
      </div>

      {/* Current Financial Position */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Текущее финансовое положение
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {kpiMetrics?.cashFlow.toLocaleString()} ₽
              </div>
              <p className="text-sm text-gray-600">Денежный поток</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {kpiMetrics?.runway && isFinite(kpiMetrics.runway) 
                  ? `${kpiMetrics.runway} мес` 
                  : 'Н/Д'}
              </div>
              <p className="text-sm text-gray-600">Runway</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {kpiMetrics?.liquidityRatio && isFinite(kpiMetrics.liquidityRatio) 
                  ? `${kpiMetrics.liquidityRatio}x` 
                  : 'Н/Д'}
              </div>
              <p className="text-sm text-gray-600">Ликвидность</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {kpiMetrics?.riskScore}%
              </div>
              <p className="text-sm text-gray-600">Риск</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financing Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedOption === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(option.type)}
                  <div>
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getSuitabilityColor(option.suitability)}>
                    {getSuitabilityLabel(option.suitability)}
                  </Badge>
                  <Badge variant="outline">
                    {getTypeLabel(option.type)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Key Parameters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {option.interestRate}%
                    </div>
                    <p className="text-xs text-gray-600">Ставка</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {option.term} мес
                    </div>
                    <p className="text-xs text-gray-600">Срок</p>
                  </div>
                </div>

                {/* Amount Range */}
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Сумма финансирования</div>
                  <div className="text-lg font-bold">
                    {option.minAmount.toLocaleString()} - {option.maxAmount.toLocaleString()} ₽
                  </div>
                </div>

                {/* Advantages */}
                <div>
                  <h4 className="font-semibold text-sm text-green-600 mb-2">Преимущества:</h4>
                  <ul className="space-y-1">
                    {option.advantages.slice(0, 2).map((advantage, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industry Specific */}
                {option.industrySpecific && (
                  <Badge variant="outline" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Специально для {selectedIndustry?.name}
                  </Badge>
                )}

                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyzeOption(option.id);
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

      {/* Selected Option Analysis */}
      {selectedOptionData && !isAnalyzing && (
        <div className="space-y-6">
          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Детальный анализ: {selectedOptionData.name}
              </CardTitle>
              <CardDescription>
                {selectedOptionData.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Требования
                  </h4>
                  <ul className="space-y-2">
                    {selectedOptionData.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advantages & Disadvantages */}
                <div>
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Преимущества
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {selectedOptionData.advantages.map((adv, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {adv}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Недостатки
                  </h4>
                  <ul className="space-y-2">
                    {selectedOptionData.disadvantages.map((dis, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
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
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Почему это подходит для вас
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-green-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Ваша отрасль ({selectedIndustry?.name}) имеет специфические потребности в финансировании
                    </li>
                    <li className="text-sm text-green-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Текущий денежный поток позволяет обслуживать данное финансирование
                    </li>
                    <li className="text-sm text-green-700 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Срок и условия соответствуют вашим бизнес-целям
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Следующие шаги
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-blue-700 flex items-start">
                      <span className="text-blue-500 mr-2">1.</span>
                      Подготовьте необходимые документы согласно требованиям
                    </li>
                    <li className="text-sm text-blue-700 flex items-start">
                      <span className="text-blue-500 mr-2">2.</span>
                      Обратитесь к нескольким банкам для сравнения условий
                    </li>
                    <li className="text-sm text-blue-700 flex items-start">
                      <span className="text-blue-500 mr-2">3.</span>
                      Рассмотрите возможность получения предварительного одобрения
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
