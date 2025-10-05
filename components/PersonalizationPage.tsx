'use client';

import { useState } from 'react';
import { useAppStoreHydrated } from '@/lib/hooks';
import { industryPresets } from '@/lib/industry-presets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Check, 
  Building2, 
  Users, 
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

export default function PersonalizationPage() {
  const { setSelectedIndustry, setUserPreferences, setCurrentPage } = useAppStoreHydrated();
  const [selectedIndustry, setSelectedIndustryLocal] = useState<string>('');
  const [companySize, setCompanySize] = useState<'small' | 'medium' | 'large'>('medium');
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');

  const handleContinue = () => {
    if (selectedIndustry) {
      const industry = industryPresets.find(p => p.id === selectedIndustry);
      if (industry) {
        setSelectedIndustry(industry);
        setUserPreferences({
          industry: selectedIndustry,
          companySize,
          riskTolerance,
          timeHorizon: 'medium',
          notifications: true,
          theme: 'light',
        });
        setCurrentPage('ai-welcome');
      }
    }
  };

  const sizeOptions = [
    { value: 'small', label: 'Малый бизнес', description: 'До 50 сотрудников', icon: <Users className="h-5 w-5" /> },
    { value: 'medium', label: 'Средний бизнес', description: '50-250 сотрудников', icon: <Building2 className="h-5 w-5" /> },
    { value: 'large', label: 'Крупный бизнес', description: 'Свыше 250 сотрудников', icon: <Building2 className="h-5 w-5" /> },
  ];

  const riskOptions = [
    { value: 'low', label: 'Консервативный', description: 'Минимальные риски', icon: <Shield className="h-5 w-5" /> },
    { value: 'medium', label: 'Сбалансированный', description: 'Умеренные риски', icon: <TrendingUp className="h-5 w-5" /> },
    { value: 'high', label: 'Агрессивный', description: 'Высокие риски', icon: <TrendingUp className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Персонализация
          </h1>
          <p className="text-xl text-gray-600">
            Настройте систему под вашу отрасль и бизнес
          </p>
        </div>

        {/* Industry Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-6 w-6 mr-2" />
              Выберите отрасль
            </CardTitle>
            <CardDescription>
              Это поможет нам адаптировать рекомендации и анализ под ваш бизнес
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industryPresets.map((industry) => (
                <Card 
                  key={industry.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedIndustry === industry.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedIndustryLocal(industry.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{industry.icon}</span>
                      {selectedIndustry === industry.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{industry.name}</h3>
                    <p className="text-sm text-gray-600">{industry.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        DSO: {industry.characteristics.dso}д
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        DPO: {industry.characteristics.dpo}д
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Size */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Размер компании
            </CardTitle>
            <CardDescription>
              Это влияет на доступные инструменты финансирования
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sizeOptions.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    companySize === option.value 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCompanySize(option.value as 'small' | 'medium' | 'large')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-blue-600">{option.icon}</div>
                      {companySize === option.value && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Tolerance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Толерантность к риску
            </CardTitle>
            <CardDescription>
              Это влияет на рекомендации по финансированию и сценариям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {riskOptions.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    riskTolerance === option.value 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setRiskTolerance(option.value as 'low' | 'medium' | 'high')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-blue-600">{option.icon}</div>
                      {riskTolerance === option.value && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedIndustry}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Продолжить
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
