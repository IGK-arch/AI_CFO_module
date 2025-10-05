# 📊 Генерация реалистичных данных

## Быстрый старт

### Просмотр всех данных
```bash
npx tsx scripts/generate-industry-data.ts
```

Вывод покажет:
- Количество транзакций
- Общую выручку и расходы
- Чистую прибыль
- Количество ключевых событий
- Примеры транзакций

## Использование в приложении

### Автоматическая загрузка
При выборе отрасли в персонализации данные загружаются автоматически:

```typescript
// app/page.tsx
useEffect(() => {
  if (isClient && selectedIndustry) {
    import('@/lib/load-industry-data').then(({ loadIndustryData, generateAIAnalysis }) => {
      const industryData = loadIndustryData(selectedIndustry.id);
      
      if (industryData) {
        setBankStatements(industryData.bankStatements);
        setARAP(industryData.arAp);
        setLoans(industryData.loans);
        setKPIMetrics(industryData.kpiMetrics);
        
        const aiAnalysis = generateAIAnalysis(
          industryData.kpiMetrics,
          selectedIndustry.id,
          industryData.events
        );
        setAIAnalysis(aiAnalysis);
      }
    });
  }
}, [isClient, selectedIndustry]);
```

### Ручная генерация данных

```typescript
import { industryDatasets } from '@/lib/industry-data-generator';

// Получаем данные для розницы
const retailData = industryDatasets.retail;

// Генерируем транзакции
const transactions = retailData.generateTransactions();

// Получаем события
const events = retailData.events;

// Информация о компании
console.log(retailData.name);       // "Сеть магазинов электроники "TechStore""
console.log(retailData.period);     // "2022-01-01 to 2024-12-31"
```

## Структура данных

### IndustryTransaction
```typescript
interface IndustryTransaction {
  date: string;          // ISO дата (YYYY-MM-DD)
  description: string;   // Описание операции
  amount: number;        // Сумма (положительная для дохода, отрицательная для расхода)
  type: 'income' | 'expense';
  category: string;      // Категория операции
}
```

### IndustryEvent
```typescript
interface IndustryEvent {
  date: string;
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}
```

## Доступные отрасли

### Retail (Розничная торговля)
- **ID**: `retail`
- **Компания**: Сеть магазинов электроники "TechStore"
- **Особенности**: Сезонность, Черная пятница, расширение сети

### Services (Услуги/Маркетинг)
- **ID**: `services`
- **Компания**: Маркетинговое агентство "BrandBoost"
- **Особенности**: Рост клиентской базы, переменная выручка

### E-commerce
- **ID**: `ecommerce`
- **Компания**: Интернет-магазин одежды "FashionHub"
- **Особенности**: Ежедневные продажи, пики в праздники, вирусный маркетинг

### Construction (Строительство)
- **ID**: `construction`
- **Компания**: Строительная компания "СтройМастер"
- **Особенности**: Крупные нерегулярные платежи, штрафы/бонусы

### Manufacturing (Производство)
- **ID**: `manufacturing`
- **Компания**: Мебельная фабрика "КомфортДом"
- **Особенности**: Стабильный рост, инвестиции в оборудование

### Logistics (Логистика)
- **ID**: `logistics`
- **Компания**: Транспортная компания "БыстраяДоставка"
- **Особенности**: Ежедневные доходы, высокие расходы на топливо

## Преобразование в формат приложения

### Функция loadIndustryData
```typescript
import { loadIndustryData } from '@/lib/load-industry-data';

const data = loadIndustryData('retail');

// data содержит:
// {
//   bankStatements: BankStatement[],  // Выписки
//   arAp: ARAP[],                     // Дебиторка/кредиторка
//   loans: Loan[],                    // Займы
//   kpiMetrics: KPIMetrics,           // Метрики
//   events: Event[]                   // События
// }
```

### Генерация AI анализа
```typescript
import { generateAIAnalysis } from '@/lib/load-industry-data';

const aiAnalysis = generateAIAnalysis(
  kpiMetrics,
  'retail',
  events
);

// aiAnalysis содержит:
// {
//   cashFlowHealth: 'good' | 'warning' | 'critical',
//   liquidityStatus: 'good' | 'warning' | 'critical',
//   riskLevel: 'low' | 'medium' | 'high',
//   insights: Insight[],
//   recommendations: Recommendation[],
//   forecastSummary: ForecastSummary
// }
```

## Кастомизация данных

### Добавление новой отрасли

1. Создайте новый объект в `lib/industry-data-generator.ts`:

```typescript
export const myIndustryData = {
  name: 'Моя компания',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-15',
      title: 'Событие 1',
      impact: 'positive',
      description: 'Описание события',
    },
    // ... больше событий
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    
    // Ваша логика генерации транзакций
    
    return transactions.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },
};
```

2. Добавьте в экспорт:

```typescript
export const industryDatasets = {
  retail: retailData,
  services: servicesData,
  // ...
  myindustry: myIndustryData,
};
```

3. Создайте пресет в `lib/industry-presets.ts`

## Особенности генерации

### Сезонность
```typescript
let seasonalMultiplier = 1.0;
if (month === 10 || month === 11) seasonalMultiplier = 2.5; // Ноябрь-декабрь
else if (month === 0) seasonalMultiplier = 1.8; // Январь
else if (month >= 5 && month <= 7) seasonalMultiplier = 0.6; // Лето
```

### Рост бизнеса
```typescript
const yearMultiplier = 1 + (year - 2022) * 0.4;
```

### Случайные вариации
```typescript
const dailyRevenue = Math.round(
  monthlyRevenue / 5 + Math.random() * monthlyRevenue * 0.2
);
```

## Примеры использования

### Получить все транзакции за период
```typescript
const transactions = industryDatasets.retail.generateTransactions();
const yearTransactions = transactions.filter(t => 
  new Date(t.date).getFullYear() === 2023
);
```

### Вычислить выручку за год
```typescript
const year2023Income = transactions
  .filter(t => 
    t.type === 'income' && 
    new Date(t.date).getFullYear() === 2023
  )
  .reduce((sum, t) => sum + t.amount, 0);
```

### Найти крупнейший расход
```typescript
const largestExpense = transactions
  .filter(t => t.type === 'expense')
  .reduce((max, t) => 
    Math.abs(t.amount) > Math.abs(max.amount) ? t : max
  );
```

## Отладка

Все функции выводят логи в консоль:

```typescript
console.log(`📊 Загрузка данных для: ${dataset.name}`);
console.log(`✅ Загружено: ${bankStatements.length} транзакций`);
console.log(`   💰 Итоговый баланс: ${(runningBalance / 1000000).toFixed(2)} млн руб`);
```

Включите консоль браузера для мониторинга загрузки данных.

---

**Готово! Теперь у вас есть реалистичные данные для всех отраслей! 🎉**

