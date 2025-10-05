'use client';

import { useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  ArrowLeft, 
  User, 
  Bell, 
  Palette, 
  Building2,
  Shield,
  Clock,
  Brain,
  CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
  const { 
    userPreferences, 
    selectedIndustry, 
    setUserPreferences, 
    setCurrentPage,
    reset 
  } = useAppStoreHydrated();
  
  const [preferences, setPreferences] = useState(userPreferences || {
    industry: 'retail',
    companySize: 'medium' as const,
    riskTolerance: 'medium' as const,
    timeHorizon: 'medium' as const,
    notifications: true,
    theme: 'light' as const,
  });

  const handleSave = () => {
    setUserPreferences(preferences);
    setCurrentPage('dashboard');
  };

  const handleReset = () => {
    reset();
    setCurrentPage('welcome');
  };

  const sizeOptions = [
    { value: 'small', label: 'Малый бизнес', description: 'До 50 сотрудников' },
    { value: 'medium', label: 'Средний бизнес', description: '50-250 сотрудников' },
    { value: 'large', label: 'Крупный бизнес', description: 'Свыше 250 сотрудников' },
  ];

  const riskOptions = [
    { value: 'low', label: 'Консервативный', description: 'Минимальные риски' },
    { value: 'medium', label: 'Сбалансированный', description: 'Умеренные риски' },
    { value: 'high', label: 'Агрессивный', description: 'Высокие риски' },
  ];

  const timeHorizonOptions = [
    { value: 'short', label: 'Краткосрочный', description: '1-3 месяца' },
    { value: 'medium', label: 'Среднесрочный', description: '3-12 месяцев' },
    { value: 'long', label: 'Долгосрочный', description: '1+ год' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Светлая', description: 'Классическая светлая тема' },
    { value: 'dark', label: 'Темная', description: 'Темная тема для работы' },
    { value: 'auto', label: 'Авто', description: 'Автоматический выбор' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
                  <p className="text-sm text-gray-600">Персонализация и конфигурация системы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Current Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Текущие настройки
              </CardTitle>
              <CardDescription>
                Активная конфигурация системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Отрасль:</span>
                  <Badge variant="outline">{selectedIndustry?.name}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Размер компании:</span>
                  <Badge variant="outline">
                    {sizeOptions.find(s => s.value === preferences.companySize)?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Толерантность к риску:</span>
                  <Badge variant="outline">
                    {riskOptions.find(r => r.value === preferences.riskTolerance)?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Временной горизонт:</span>
                  <Badge variant="outline">
                    {timeHorizonOptions.find(t => t.value === preferences.timeHorizon)?.label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                Настройки компании
              </CardTitle>
              <CardDescription>
                Основные параметры вашего бизнеса
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Размер компании
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sizeOptions.map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        preferences.companySize === option.value 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPreferences({...preferences, companySize: option.value as any})}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Risk Tolerance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Толерантность к риску
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {riskOptions.map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        preferences.riskTolerance === option.value 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPreferences({...preferences, riskTolerance: option.value as any})}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Time Horizon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Временной горизонт планирования
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {timeHorizonOptions.map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        preferences.timeHorizon === option.value 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPreferences({...preferences, timeHorizon: option.value as any})}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-purple-600" />
                Системные настройки
              </CardTitle>
              <CardDescription>
                Персонализация интерфейса и уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Тема интерфейса
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {themeOptions.map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        preferences.theme === option.value 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPreferences({...preferences, theme: option.value as any})}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Уведомления
                </label>
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    preferences.notifications 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setPreferences({...preferences, notifications: !preferences.notifications})}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Включить уведомления</h3>
                        <p className="text-sm text-gray-600">Получать уведомления о важных событиях</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.notifications ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Сбросить настройки
            </Button>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('dashboard')}
              >
                Отмена
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Сохранить настройки
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
