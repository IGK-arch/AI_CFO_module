'use client';

import { useAppStoreHydrated } from '@/lib/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  DollarSign,
  Clock,
  Target,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
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

export default function RisksPage() {
  const { 
    kpiMetrics, 
    selectedIndustry,
    bankStatements,
    arAp,
    loans,
    forecasts,
    aiAnalysis 
  } = useAppStoreHydrated();

  // Анализ рисков ликвидности
  const liquidityRisks = [
    {
      id: '1',
      title: 'Низкая ликвидность',
      description: 'Коэффициент ликвидности ниже рекомендуемого уровня',
      severity: (kpiMetrics?.liquidityRatio || 0) < 1.5 ? 'high' : 'medium',
      impact: 'Высокий',
      probability: 'Средняя',
      mitigation: 'Создать резервный фонд, оптимизировать дебиторскую задолженность'
    },
    {
      id: '2',
      title: 'Короткий runway',
      description: 'Время до исчерпания средств менее 6 месяцев',
      severity: (kpiMetrics?.runway || 0) < 6 ? 'high' : 'medium',
      impact: 'Критический',
      probability: 'Высокая',
      mitigation: 'Срочно найти источники финансирования, сократить расходы'
    },
    {
      id: '3',
      title: 'Кассовые разрывы',
      description: 'Прогнозируются дни с отрицательным денежным потоком',
      severity: forecasts.some(f => f.p5 < 0) ? 'high' : 'low',
      impact: 'Высокий',
      probability: 'Средняя',
      mitigation: 'Настроить кредитную линию, оптимизировать платежи'
    }
  ];

  // Анализ кредитных рисков
  const creditRisks = [
    {
      id: '1',
      title: 'Просроченная дебиторская задолженность',
      description: 'Клиенты задерживают оплату',
      severity: arAp.filter(a => a.status === 'overdue').length > 0 ? 'high' : 'low',
      impact: 'Средний',
      probability: 'Средняя',
      mitigation: 'Ужесточить условия оплаты, ввести предоплату'
    },
    {
      id: '2',
      title: 'Концентрация риска',
      description: 'Зависимость от ограниченного круга клиентов',
      severity: 'medium',
      impact: 'Высокий',
      probability: 'Средняя',
      mitigation: 'Диверсифицировать клиентскую базу'
    }
  ];

  // Анализ рыночных рисков
  const marketRisks = [
    {
      id: '1',
      title: 'Сезонность',
      description: 'Высокая зависимость от сезонных факторов',
      severity: (selectedIndustry?.characteristics.seasonality || 0) > 0.6 ? 'high' : 'medium',
      impact: 'Средний',
      probability: 'Высокая',
      mitigation: 'Создать резервы на низкие периоды, диверсифицировать доходы'
    },
    {
      id: '2',
      title: 'Волатильность',
      description: 'Высокая волатильность денежных потоков',
      severity: (selectedIndustry?.characteristics.volatility || 0) > 0.6 ? 'high' : 'medium',
      impact: 'Средний',
      probability: 'Средняя',
      mitigation: 'Стабилизировать доходы, создать буферные резервы'
    }
  ];

  // Анализ операционных рисков
  const operationalRisks = [
    {
      id: '1',
      title: 'Высокий общий риск',
      description: 'Общий уровень риска превышает допустимые значения',
      severity: (kpiMetrics?.riskScore || 0) > 60 ? 'high' : 'medium',
      impact: 'Высокий',
      probability: 'Средняя',
      mitigation: 'Комплексная программа снижения рисков'
    },
    {
      id: '2',
      title: 'Зависимость от поставщиков',
      description: 'Ограниченное количество поставщиков',
      severity: 'medium',
      impact: 'Средний',
      probability: 'Средняя',
      mitigation: 'Диверсифицировать поставщиков, создать альтернативы'
    }
  ];

  // Данные для графиков
  const riskDistributionData = [
    { name: 'Ликвидность', value: liquidityRisks.filter(r => r.severity === 'high').length, color: '#ef4444' },
    { name: 'Кредитные', value: creditRisks.filter(r => r.severity === 'high').length, color: '#f59e0b' },
    { name: 'Рыночные', value: marketRisks.filter(r => r.severity === 'high').length, color: '#8b5cf6' },
    { name: 'Операционные', value: operationalRisks.filter(r => r.severity === 'high').length, color: '#06b6d4' },
  ];

  const riskTrendData = forecasts.map(f => ({
    date: new Date(f.date).toLocaleDateString('ru-RU', { day: 'numeric' }),
    risk: Math.round((1 - f.confidence) * 100),
    confidence: Math.round(f.confidence * 100)
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Неизвестно';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Анализ рисков</h2>
          <p className="text-gray-600">Комплексная оценка всех видов рисков</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Brain className="h-4 w-4 mr-1" />
            AI-анализ
          </Badge>
          <Badge className={getSeverityColor(
            (kpiMetrics?.riskScore || 0) > 60 ? 'high' : 
            (kpiMetrics?.riskScore || 0) > 30 ? 'medium' : 'low'
          )}>
            Общий риск: {kpiMetrics?.riskScore}%
          </Badge>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Ликвидность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiMetrics?.liquidityRatio && isFinite(kpiMetrics.liquidityRatio) 
                ? `${kpiMetrics.liquidityRatio}x` 
                : 'Н/Д'}
            </div>
            <p className="text-xs text-gray-600">
              {(kpiMetrics?.liquidityRatio || 0) < 1.5 ? 'Ниже нормы' : 'В норме'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-600" />
              Runway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiMetrics?.runway && isFinite(kpiMetrics.runway) 
                ? `${kpiMetrics.runway} мес` 
                : 'Н/Д'}
            </div>
            <p className="text-xs text-gray-600">
              {(kpiMetrics?.runway || 0) < 6 ? 'Критично' : 'Нормально'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
              Критические дни
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {forecasts.filter(f => f.p5 < 0).length}
            </div>
            <p className="text-xs text-gray-600">Дней с риском</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-purple-600" />
              Общий риск
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpiMetrics?.riskScore}%
            </div>
            <p className="text-xs text-gray-600">
              {getSeverityLabel((kpiMetrics?.riskScore || 0) > 60 ? 'high' : 
                (kpiMetrics?.riskScore || 0) > 30 ? 'medium' : 'low')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600" />
              Распределение рисков
            </CardTitle>
            <CardDescription>
              Количество высокорисковых факторов по категориям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskDistributionData.map((entry, index) => (
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

        {/* Risk Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-green-600" />
              Динамика рисков
            </CardTitle>
            <CardDescription>
              Изменение уровня риска по дням прогноза
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`, 
                      name === 'risk' ? 'Риск' : 'Уверенность'
                    ]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} name="Риск" />
                  <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={2} name="Уверенность" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Categories */}
      <div className="space-y-6">
        {/* Liquidity Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Риски ликвидности
            </CardTitle>
            <CardDescription>
              Риски, связанные с недостатком денежных средств
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityRisks.map((risk) => (
                <div key={risk.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${getSeverityColor(risk.severity)}`}>
                    {getSeverityIcon(risk.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {getSeverityLabel(risk.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Воздействие:</span>
                        <span className="ml-2 font-medium">{risk.impact}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Вероятность:</span>
                        <span className="ml-2 font-medium">{risk.probability}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Меры снижения:</span>
                      <p className="text-sm text-gray-700 mt-1">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credit Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-orange-600" />
              Кредитные риски
            </CardTitle>
            <CardDescription>
              Риски, связанные с невозвратом дебиторской задолженности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditRisks.map((risk) => (
                <div key={risk.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${getSeverityColor(risk.severity)}`}>
                    {getSeverityIcon(risk.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {getSeverityLabel(risk.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Воздействие:</span>
                        <span className="ml-2 font-medium">{risk.impact}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Вероятность:</span>
                        <span className="ml-2 font-medium">{risk.probability}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Меры снижения:</span>
                      <p className="text-sm text-gray-700 mt-1">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Рыночные риски
            </CardTitle>
            <CardDescription>
              Риски, связанные с изменениями на рынке
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketRisks.map((risk) => (
                <div key={risk.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${getSeverityColor(risk.severity)}`}>
                    {getSeverityIcon(risk.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {getSeverityLabel(risk.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Воздействие:</span>
                        <span className="ml-2 font-medium">{risk.impact}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Вероятность:</span>
                        <span className="ml-2 font-medium">{risk.probability}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Меры снижения:</span>
                      <p className="text-sm text-gray-700 mt-1">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operational Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              Операционные риски
            </CardTitle>
            <CardDescription>
              Риски, связанные с внутренними процессами
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationalRisks.map((risk) => (
                <div key={risk.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className={`p-2 rounded-full ${getSeverityColor(risk.severity)}`}>
                    {getSeverityIcon(risk.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {getSeverityLabel(risk.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Воздействие:</span>
                        <span className="ml-2 font-medium">{risk.impact}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Вероятность:</span>
                        <span className="ml-2 font-medium">{risk.probability}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Меры снижения:</span>
                      <p className="text-sm text-gray-700 mt-1">{risk.mitigation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              AI-рекомендации по снижению рисков
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Немедленные действия
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <div className="font-semibold">{rec.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{rec.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Долгосрочные меры
                </h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Создать резервный фонд на 3-6 месяцев расходов
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Диверсифицировать источники дохода
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Внедрить систему мониторинга рисков
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
