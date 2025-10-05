'use client';

import { useEffect, useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import WelcomePage from '@/components/WelcomePage';
import PersonalizationPage from '@/components/PersonalizationPage';
import AIWelcomePage from '@/components/AIWelcomePage';
import MainDashboard from '@/components/MainDashboard';
import SettingsPage from '@/components/SettingsPage';
import { loadIndustryData, generateAIAnalysis } from '@/lib/load-industry-data';
import { industryPresets } from '@/lib/industry-presets';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { 
    currentPage, 
    userPreferences, 
    selectedIndustry,
    kpiMetrics,
    bankStatements,
    setCurrentPage,
    setUserPreferences,
    setSelectedIndustry,
    setBankStatements, 
    setARAP, 
    setLoans, 
    setForecasts, 
    setKPIMetrics, 
    setAIAnalysis,
    setScenarios,
    setFinancingOptions
  } = useAppStoreHydrated();

  // Устанавливаем флаг клиентской стороны
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Если нет выбранной отрасли, показываем персонализацию
  useEffect(() => {
    if (isClient && !selectedIndustry && currentPage !== 'welcome' && currentPage !== 'personalization') {
      console.log('📋 Нет выбранной отрасли, переходим на персонализацию');
      setCurrentPage('personalization');
    }
  }, [isClient, selectedIndustry, currentPage, setCurrentPage]);

  // Загружаем реалистичные демо-данные при первом запуске
  useEffect(() => {
    console.log('🔄 useEffect triggered:', { 
      isClient, 
      selectedIndustry: selectedIndustry?.id,
      hasKpiMetrics: !!kpiMetrics,
      hasBankStatements: bankStatements.length > 0
    });
    
    // Загружаем данные если:
    // 1. Мы на клиенте
    // 2. Отрасль выбрана
    // 3. Данные еще не загружены (нет kpiMetrics или bankStatements)
    if (isClient && selectedIndustry && (!kpiMetrics || bankStatements.length === 0)) {
      console.log(`📊 Загрузка реалистичных данных для отрасли: ${selectedIndustry.id}`);
      
      try {
        const industryData = loadIndustryData(selectedIndustry.id);
        console.log('📦 industryData:', industryData);
        
        if (industryData) {
          console.log('✅ Данные успешно загружены!');
          console.log('💾 Сохраняем bankStatements:', industryData.bankStatements.length, 'записей');
          console.log('💾 Сохраняем kpiMetrics:', industryData.kpiMetrics);
          
          setBankStatements(industryData.bankStatements);
          setARAP(industryData.arAp);
          setLoans(industryData.loans);
          setKPIMetrics(industryData.kpiMetrics);
          
          // Проверяем, что данные действительно сохранились
          setTimeout(() => {
            console.log('🔍 Проверка после сохранения - kpiMetrics:', kpiMetrics);
            console.log('🔍 Проверка после сохранения - bankStatements:', bankStatements.length);
          }, 100);
          
          // Используем прогнозы из индустриальных данных
          if (industryData.forecasts) {
            setForecasts(industryData.forecasts);
            console.log('📈 Прогноз основан на реальных данных отрасли');
          }
          
          // Используем сценарии из индустриальных данных
          if (industryData.scenarios) {
            setScenarios(industryData.scenarios);
            console.log('🎲 Сценарии загружены для отрасли');
          }
          
          const aiAnalysis = generateAIAnalysis(
            industryData.kpiMetrics,
            selectedIndustry.id,
            industryData.events
          );
          setAIAnalysis(aiAnalysis);
          
          // Загружаем финансирование для отрасли
          if (industryData.financingOptions) {
            setFinancingOptions(industryData.financingOptions);
            console.log('💰 Опции финансирования загружены');
          }
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки данных:', error);
      }
    } else if (isClient && !selectedIndustry) {
      console.warn('⚠️ selectedIndustry не установлен!');
    }
  }, [isClient, selectedIndustry, kpiMetrics, bankStatements, setBankStatements, setARAP, setLoans, setForecasts, setKPIMetrics, setAIAnalysis, setScenarios, setFinancingOptions]);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage />;
      case 'personalization':
        return <PersonalizationPage />;
      case 'ai-welcome':
        return <AIWelcomePage />;
      case 'dashboard':
        return <MainDashboard />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <WelcomePage />;
    }
  };

  // Показываем загрузку до инициализации клиента
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderPage()}
    </div>
  );
}
