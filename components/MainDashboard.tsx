'use client';

import { useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ForecastChart from '@/components/ForecastChart';
import AdvancedScenarios from '@/components/AdvancedScenarios';
import AdvancedFinancing from '@/components/AdvancedFinancing';
import SmartAssistant from '@/components/SmartAssistant';
import RisksPage from '@/components/RisksPage';
import RecommendationsPage from '@/components/RecommendationsPage';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Settings,
  MessageCircle,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Shield
} from 'lucide-react';

export default function MainDashboard() {
  const { 
    kpiMetrics, 
    aiAnalysis, 
    selectedIndustry,
    isChatOpen,
    setChatOpen,
    setCurrentPage 
  } = useAppStoreHydrated();
  const [activeTab, setActiveTab] = useState('forecast');

  // Debug: проверяем, что данные загрузились
  console.log('🔍 MainDashboard render - kpiMetrics:', kpiMetrics);
  console.log('🔍 MainDashboard render - selectedIndustry:', selectedIndustry);
  
  // Если данных нет, показываем предупреждение
  if (!kpiMetrics) {
    console.warn('⚠️ kpiMetrics отсутствует в MainDashboard!');
  }
  if (!selectedIndustry) {
    console.warn('⚠️ selectedIndustry отсутствует в MainDashboard!');
  }
  
  // Добавляем возможность принудительной перезагрузки для отладки
  if (!kpiMetrics && typeof window !== 'undefined') {
    console.warn('⚠️ kpiMetrics отсутствует! Возможно, данные не загрузились');
    console.log('💡 Попробуйте очистить localStorage: localStorage.clear() и перезагрузить страницу');
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600 bg-green-100';
    if (risk < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 30) return 'Низкий';
    if (risk < 60) return 'Средний';
    return 'Высокий';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CFO-AI</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedIndustry?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => setChatOpen(!isChatOpen)}
                className="relative"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                AI-ассистент
                {!isChatOpen && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    1
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage('settings')}
              >
                <Settings className="h-5 w-5 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Денежный поток</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {kpiMetrics ? kpiMetrics.cashFlow.toLocaleString() : '0'} ₽
              </div>
              <p className="text-xs text-muted-foreground">
                {kpiMetrics ? '+12% с прошлого месяца' : 'Загрузка данных...'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiMetrics ? kpiMetrics.burnRate.toLocaleString() : '0'} ₽/мес
              </div>
              <p className="text-xs text-muted-foreground">
                Runway: {kpiMetrics && isFinite(kpiMetrics.runway) 
                  ? `${kpiMetrics.runway.toFixed(1)} месяцев` 
                  : 'Загрузка...'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Риск</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiMetrics?.riskScore ?? 0}%
              </div>
              <Badge className={getRiskColor(kpiMetrics?.riskScore || 0)}>
                {kpiMetrics ? getRiskLabel(kpiMetrics?.riskScore || 0) : 'Загрузка...'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ликвидность</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiMetrics?.liquidityRatio && isFinite(kpiMetrics.liquidityRatio) 
                  ? `${kpiMetrics.liquidityRatio}x` 
                  : 'Н/Д'}
              </div>
              <p className="text-xs text-muted-foreground">
                DSO: {kpiMetrics?.dso}д, DPO: {kpiMetrics?.dpo}д
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="forecast" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Прогноз
                </TabsTrigger>
                <TabsTrigger value="scenarios" className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Сценарии
                </TabsTrigger>
                <TabsTrigger value="financing" className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Финансирование
                </TabsTrigger>
                <TabsTrigger value="risks" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Риски
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Рекомендации
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forecast" className="mt-6">
                <ForecastChart />
              </TabsContent>

              <TabsContent value="scenarios" className="mt-6">
                <AdvancedScenarios />
              </TabsContent>

              <TabsContent value="financing" className="mt-6">
                <AdvancedFinancing />
              </TabsContent>

              <TabsContent value="risks" className="mt-6">
                <RisksPage />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                <RecommendationsPage />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1 h-[calc(100vh-12rem)] sticky top-24">
            <SmartAssistant />
          </div>
        </div>
      </div>

      {/* AI Chat Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI-ассистент CFO</h3>
                  <p className="text-sm text-gray-600">Ваш персональный финансовый консультант</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatOpen(false)}
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <SmartAssistant isFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
