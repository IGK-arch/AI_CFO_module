'use client';

import { useAppStoreHydrated } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

export default function RecommendationsPage() {
  const { 
    kpiMetrics, 
    selectedIndustry,
    bankStatements,
    arAp,
    loans,
    forecasts,
    aiAnalysis,
    scenarios,
    financingOptions
  } = useAppStoreHydrated();

  // Немедленные рекомендации
  const immediateRecommendations = [
    {
      id: '1',
      title: 'Оптимизация дебиторской задолженности',
      description: 'Сократить DSO с 30 до 15 дней для улучшения денежного потока',
      impact: 'Высокий',
      effort: 'Средний',
      timeframe: '1-2 месяца',
      priority: 'high',
      actions: [
        'Внедрить систему предоплаты для новых клиентов',
        'Ужесточить условия оплаты в договорах',
        'Автоматизировать напоминания о платежах',
        'Ввести скидки за раннюю оплату'
      ],
      expectedBenefit: 'Увеличение денежного потока на 15-20%'
    },
    {
      id: '2',
      title: 'Создание резервного фонда',
      description: 'Сформировать резерв на 3-6 месяцев операционных расходов',
      impact: 'Критический',
      effort: 'Высокий',
      timeframe: '3-6 месяцев',
      priority: 'high',
      actions: [
        'Откладывать 10-15% от ежемесячной выручки',
        'Рассмотреть краткосрочные инвестиции',
        'Оптимизировать расходы для ускорения накопления',
        'Создать отдельный счет для резерва'
      ],
      expectedBenefit: 'Снижение риска кассовых разрывов на 80%'
    },
    {
      id: '3',
      title: 'Оптимизация товарных запасов',
      description: 'Сократить DIO с 45 до 30 дней для высвобождения средств',
      impact: 'Средний',
      effort: 'Средний',
      timeframe: '2-3 месяца',
      priority: 'medium',
      actions: [
        'Внедрить систему управления запасами',
        'Оптимизировать ассортимент',
        'Улучшить прогнозирование спроса',
        'Рассмотреть дропшиппинг для части товаров'
      ],
      expectedBenefit: 'Высвобождение 500,000-800,000 ₽'
    }
  ];

  // Краткосрочные рекомендации
  const shortTermRecommendations = [
    {
      id: '1',
      title: 'Диверсификация клиентской базы',
      description: 'Снизить зависимость от крупных клиентов',
      impact: 'Высокий',
      effort: 'Высокий',
      timeframe: '3-6 месяцев',
      priority: 'high',
      actions: [
        'Разработать стратегию привлечения новых клиентов',
        'Создать программы лояльности',
        'Расширить каналы продаж',
        'Инвестировать в маркетинг'
      ],
      expectedBenefit: 'Снижение риска на 40-50%'
    },
    {
      id: '2',
      title: 'Оптимизация операционных расходов',
      description: 'Сократить расходы на 10-15% без потери качества',
      impact: 'Средний',
      effort: 'Средний',
      timeframe: '2-4 месяца',
      priority: 'medium',
      actions: [
        'Провести аудит всех расходов',
        'Пересмотреть договоры с поставщиками',
        'Автоматизировать рутинные процессы',
        'Оптимизировать штат'
      ],
      expectedBenefit: 'Экономия 150,000-300,000 ₽ в месяц'
    },
    {
      id: '3',
      title: 'Улучшение системы прогнозирования',
      description: 'Внедрить более точные методы прогнозирования',
      impact: 'Средний',
      effort: 'Средний',
      timeframe: '1-3 месяца',
      priority: 'medium',
      actions: [
        'Внедрить AI-алгоритмы прогнозирования',
        'Улучшить сбор данных',
        'Создать систему раннего предупреждения',
        'Обучить персонал работе с новыми инструментами'
      ],
      expectedBenefit: 'Повышение точности прогнозов на 30%'
    }
  ];

  // Долгосрочные рекомендации
  const longTermRecommendations = [
    {
      id: '1',
      title: 'Стратегическое финансирование',
      description: 'Получить долгосрочное финансирование для развития',
      impact: 'Критический',
      effort: 'Высокий',
      timeframe: '6-12 месяцев',
      priority: 'high',
      actions: [
        'Подготовить бизнес-план развития',
        'Выбрать оптимальный инструмент финансирования',
        'Подготовить пакет документов',
        'Провести переговоры с банками'
      ],
      expectedBenefit: 'Привлечение 2-5 млн ₽ для развития'
    },
    {
      id: '2',
      title: 'Цифровая трансформация',
      description: 'Внедрить современные технологии для повышения эффективности',
      impact: 'Высокий',
      effort: 'Высокий',
      timeframe: '6-18 месяцев',
      priority: 'medium',
      actions: [
        'Внедрить CRM-систему',
        'Автоматизировать учет',
        'Создать мобильное приложение',
        'Внедрить аналитику данных'
      ],
      expectedBenefit: 'Повышение эффективности на 25-40%'
    },
    {
      id: '3',
      title: 'Расширение бизнеса',
      description: 'Выйти на новые рынки или расширить ассортимент',
      impact: 'Высокий',
      effort: 'Критический',
      timeframe: '12-24 месяца',
      priority: 'low',
      actions: [
        'Провести маркетинговые исследования',
        'Разработать стратегию выхода',
        'Создать команду для нового направления',
        'Инвестировать в развитие'
      ],
      expectedBenefit: 'Увеличение выручки на 50-100%'
    }
  ];

  // Данные для графиков
  const priorityData = [
    { name: 'Немедленные', value: immediateRecommendations.length, color: '#ef4444' },
    { name: 'Краткосрочные', value: shortTermRecommendations.length, color: '#f59e0b' },
    { name: 'Долгосрочные', value: longTermRecommendations.length, color: '#10b981' },
  ];

  const impactData = [
    { name: 'Критический', value: [...immediateRecommendations, ...shortTermRecommendations, ...longTermRecommendations].filter(r => r.impact === 'Критический').length },
    { name: 'Высокий', value: [...immediateRecommendations, ...shortTermRecommendations, ...longTermRecommendations].filter(r => r.impact === 'Высокий').length },
    { name: 'Средний', value: [...immediateRecommendations, ...shortTermRecommendations, ...longTermRecommendations].filter(r => r.impact === 'Средний').length },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Неизвестно';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Критический': return 'text-red-600 bg-red-100';
      case 'Высокий': return 'text-orange-600 bg-orange-100';
      case 'Средний': return 'text-yellow-600 bg-yellow-100';
      case 'Низкий': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI-рекомендации</h2>
          <p className="text-gray-600">Персональные рекомендации на основе комплексного анализа</p>
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Zap className="h-4 w-4 mr-2 text-red-600" />
              Немедленные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {immediateRecommendations.length}
            </div>
            <p className="text-xs text-gray-600">Рекомендаций</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-600" />
              Краткосрочные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {shortTermRecommendations.length}
            </div>
            <p className="text-xs text-gray-600">Рекомендаций</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Долгосрочные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {longTermRecommendations.length}
            </div>
            <p className="text-xs text-gray-600">Рекомендаций</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
              Общий потенциал
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +25%
            </div>
            <p className="text-xs text-gray-600">Рост эффективности</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600" />
              Распределение по приоритетам
            </CardTitle>
            <CardDescription>
              Количество рекомендаций по срочности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
              Анализ воздействия
            </CardTitle>
            <CardDescription>
              Распределение рекомендаций по уровню воздействия
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Immediate Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-red-600" />
            Немедленные рекомендации
          </CardTitle>
          <CardDescription>
            Действия, которые необходимо выполнить в ближайшее время
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {immediateRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {getPriorityLabel(rec.priority)}
                    </Badge>
                    <Badge className={getImpactColor(rec.impact)}>
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Воздействие:</span>
                    <p className="font-medium">{rec.impact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Сложность:</span>
                    <p className="font-medium">{rec.effort}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Срок:</span>
                    <p className="font-medium">{rec.timeframe}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Конкретные действия:</h4>
                  <ul className="space-y-1">
                    {rec.actions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800">Ожидаемый результат:</span>
                  </div>
                  <p className="text-sm text-green-700">{rec.expectedBenefit}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Short-term Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-orange-600" />
            Краткосрочные рекомендации
          </CardTitle>
          <CardDescription>
            Действия на период 1-6 месяцев
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {shortTermRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {getPriorityLabel(rec.priority)}
                    </Badge>
                    <Badge className={getImpactColor(rec.impact)}>
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Воздействие:</span>
                    <p className="font-medium">{rec.impact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Сложность:</span>
                    <p className="font-medium">{rec.effort}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Срок:</span>
                    <p className="font-medium">{rec.timeframe}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Конкретные действия:</h4>
                  <ul className="space-y-1">
                    {rec.actions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Target className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">Ожидаемый результат:</span>
                  </div>
                  <p className="text-sm text-blue-700">{rec.expectedBenefit}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Long-term Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            Долгосрочные рекомендации
          </CardTitle>
          <CardDescription>
            Стратегические действия на период 6+ месяцев
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {longTermRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {getPriorityLabel(rec.priority)}
                    </Badge>
                    <Badge className={getImpactColor(rec.impact)}>
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Воздействие:</span>
                    <p className="font-medium">{rec.impact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Сложность:</span>
                    <p className="font-medium">{rec.effort}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Срок:</span>
                    <p className="font-medium">{rec.timeframe}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Конкретные действия:</h4>
                  <ul className="space-y-1">
                    {rec.actions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="font-semibold text-purple-800">Ожидаемый результат:</span>
                  </div>
                  <p className="text-sm text-purple-700">{rec.expectedBenefit}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              Итоговые рекомендации AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Ключевые возможности
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.opportunities?.map((opp, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {opp}
                    </li>
                  )) || (
                    <li className="text-sm text-gray-600">
                      Анализ возможностей в процессе...
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Стратегические направления
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
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
    </div>
  );
}
