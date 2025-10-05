'use client';

import { useAppStoreHydrated } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Zap, 
  Shield, 
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function WelcomePage() {
  const { setCurrentPage } = useAppStoreHydrated();

  const handleGetStarted = () => {
    setCurrentPage('personalization');
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'AI-анализ денежных потоков',
      description: 'Интеллектуальное прогнозирование с интервалами доверия P5/P50/P95',
      color: 'bg-blue-500',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Сценарии и стресс-тесты',
      description: 'Персонализированные сценарии с AI-рекомендациями',
      color: 'bg-green-500',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Оптимизация платежей',
      description: 'MILP алгоритмы для приоритизации и управления сроками',
      color: 'bg-yellow-500',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Подбор финансирования',
      description: 'Отраслевые пресеты с Learning-to-Rank рекомендациями',
      color: 'bg-purple-500',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'AI-ассистент Chat-CFO',
      description: 'RAG-система для контекстных ответов и быстрых действий',
      color: 'bg-red-500',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Персонализация',
      description: 'Адаптация под отрасль с индивидуальными рекомендациями',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CFO-AI
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Умное казначейство для малого и среднего бизнеса
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Интеллектуальный анализ денежных потоков
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${feature.color} p-2 rounded-lg text-white`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">
            Ключевые преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Снижение рисков</h3>
              <p className="text-sm text-gray-600">Предотвращение кассовых разрывов</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Оптимизация</h3>
              <p className="text-sm text-gray-600">Улучшение денежных потоков</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">AI-решения</h3>
              <p className="text-sm text-gray-600">Умные рекомендации</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Быстрота</h3>
              <p className="text-sm text-gray-600">Мгновенные решения</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Начать работу
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Данные уже загружены и готовы к анализу
          </p>
        </div>
      </div>
    </div>
  );
}
