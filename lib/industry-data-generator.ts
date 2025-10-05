// Генератор реалистичных данных для разных отраслей

export interface IndustryTransaction {
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export interface IndustryEvent {
  date: string;
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

// РОЗНИЧНАЯ ТОРГОВЛЯ - Сеть магазинов электроники
export const retailData = {
  name: 'Сеть магазинов электроники "TechStore"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-15',
      title: 'Открытие первого магазина',
      impact: 'positive',
      description: 'Запуск первой точки продаж площадью 150 м² в торговом центре',
    },
    {
      date: '2022-06-01',
      title: 'Летний спад продаж',
      impact: 'negative',
      description: 'Сезонное снижение спроса на электронику летом (-25%)',
    },
    {
      date: '2022-11-15',
      title: 'Черная пятница',
      impact: 'positive',
      description: 'Рекордные продажи во время акции (+180% к обычному дню)',
    },
    {
      date: '2023-01-10',
      title: 'Новогодние распродажи',
      impact: 'positive',
      description: 'Высокий спрос на технику после праздников (+120%)',
    },
    {
      date: '2023-03-15',
      title: 'Открытие второго магазина',
      impact: 'positive',
      description: 'Расширение сети - новая точка в другом районе города',
    },
    {
      date: '2023-07-01',
      title: 'Запуск интернет-магазина',
      impact: 'positive',
      description: 'Выход в онлайн, доставка по всему городу',
    },
    {
      date: '2023-09-01',
      title: 'Проблемы с поставками',
      impact: 'negative',
      description: 'Задержки поставок из-за логистических проблем',
    },
    {
      date: '2023-11-20',
      title: 'Черная пятница 2023',
      impact: 'positive',
      description: 'Побит рекорд продаж прошлого года (+250%)',
    },
    {
      date: '2024-01-05',
      title: 'Запуск программы лояльности',
      impact: 'positive',
      description: 'Увеличение повторных покупок на 35%',
    },
    {
      date: '2024-05-15',
      title: 'Открытие третьего магазина',
      impact: 'positive',
      description: 'Выход в соседний город, площадь 200 м²',
    },
    {
      date: '2024-08-01',
      title: 'Сезонный спад',
      impact: 'negative',
      description: 'Традиционный летний спад активности',
    },
  ],

  // Генерация транзакций
  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-12-31');
    
    let baseRevenue = 800000; // Базовая выручка в месяц
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      // Сезонность: высокие продажи в ноябре-декабре, низкие летом
      let seasonalMultiplier = 1.0;
      if (month === 10 || month === 11) seasonalMultiplier = 2.5; // Ноябрь-декабрь
      else if (month === 0) seasonalMultiplier = 1.8; // Январь
      else if (month >= 5 && month <= 7) seasonalMultiplier = 0.6; // Лето
      
      // Рост бизнеса со временем
      const yearMultiplier = 1 + (year - 2022) * 0.4 + (currentDate.getMonth() / 12) * 0.4;
      
      const monthlyRevenue = Math.round(baseRevenue * seasonalMultiplier * yearMultiplier);
      
      // Продажи (более детальные с вариативностью)
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay();
        
        // Недельная вариация (больше в выходные для розницы)
        let dayMultiplier = 1.0;
        if (dayOfWeek === 0) dayMultiplier = 0.7; // Воскресенье
        else if (dayOfWeek === 6) dayMultiplier = 1.8; // Суббота
        else if (dayOfWeek === 5) dayMultiplier = 1.3; // Пятница
        
        // Черная пятница (последняя пятница ноября)
        if (month === 10 && dayOfWeek === 5 && day >= 22) {
          dayMultiplier = 5.0;
        }
        
        // Предновогодний ажиотаж
        if (month === 11 && day >= 20) {
          dayMultiplier *= 2.0;
        }
        
        // Случайные флуктуации
        const randomness = 0.7 + Math.random() * 0.6;
        
        const dailyRevenue = Math.round((monthlyRevenue / daysInMonth) * dayMultiplier * randomness);
        
        // Записываем только если есть продажи
        if (dailyRevenue > 10000) {
          transactions.push({
            date: date.toISOString().split('T')[0],
            description: dayMultiplier > 2 ? 'Пиковые продажи электроники' : 'Продажи электроники',
            amount: dailyRevenue,
            type: 'income',
            category: 'Розничные продажи',
          });
        }
      }
      
      // Закупка товара (40% от выручки)
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
        description: 'Закупка товара у поставщиков',
        amount: -Math.round(monthlyRevenue * 0.4),
        type: 'expense',
        category: 'Закупка товара',
      });
      
      // Аренда (растет с количеством магазинов)
      const storeCount = year === 2022 ? 1 : year === 2023 ? (month >= 2 ? 2 : 1) : (month >= 4 ? 3 : 2);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
        description: `Аренда помещений (${storeCount} магазина)`,
        amount: -storeCount * 120000,
        type: 'expense',
        category: 'Аренда',
      });
      
      // Зарплата
      const employeeCount = storeCount * 5 + 2; // 5 человек на магазин + 2 в офисе
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата сотрудникам (${employeeCount} чел)`,
        amount: -employeeCount * 50000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Маркетинг (больше в сезон)
      const marketingBudget = Math.round(monthlyRevenue * 0.08 * seasonalMultiplier);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString().split('T')[0],
        description: 'Реклама и маркетинг',
        amount: -marketingBudget,
        type: 'expense',
        category: 'Маркетинг',
      });
      
      // Коммунальные услуги
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20).toISOString().split('T')[0],
        description: 'Коммунальные платежи',
        amount: -storeCount * 35000,
        type: 'expense',
        category: 'Коммунальные',
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// УСЛУГИ - Маркетинговое агентство
export const servicesData = {
  name: 'Маркетинговое агентство "BrandBoost"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-10',
      title: 'Основание агентства',
      impact: 'positive',
      description: 'Команда из 4 человек, первые 2 клиента',
    },
    {
      date: '2022-04-15',
      title: 'Крупный контракт',
      impact: 'positive',
      description: 'Подписан годовой контракт с федеральной сетью на 3 млн руб',
    },
    {
      date: '2022-08-01',
      title: 'Расширение команды',
      impact: 'neutral',
      description: 'Наняты 3 дополнительных специалиста',
    },
    {
      date: '2022-12-15',
      title: 'Потеря клиента',
      impact: 'negative',
      description: 'Клиент ушел к конкуренту (-400 тыс руб/мес)',
    },
    {
      date: '2023-02-20',
      title: 'Запуск нового направления',
      impact: 'positive',
      description: 'Добавлен SMM и таргетированная реклама',
    },
    {
      date: '2023-06-10',
      title: '3 новых клиента за месяц',
      impact: 'positive',
      description: 'Успешная рекламная кампания принесла новых клиентов',
    },
    {
      date: '2023-09-01',
      title: 'Открытие офиса',
      impact: 'neutral',
      description: 'Переезд из коворкинга в собственный офис',
    },
    {
      date: '2023-12-01',
      title: 'Проблемы с оплатой',
      impact: 'negative',
      description: 'Крупный клиент задерживает платеж на 2 месяца',
    },
    {
      date: '2024-03-15',
      title: 'Получение отраслевой премии',
      impact: 'positive',
      description: 'Победа в конкурсе "Лучшее агентство года"',
    },
    {
      date: '2024-06-20',
      title: 'Расширение на регионы',
      impact: 'positive',
      description: 'Открыт филиал в Санкт-Петербурге',
    },
    {
      date: '2024-10-01',
      title: 'Запуск AI-инструментов',
      impact: 'positive',
      description: 'Внедрение ИИ для аналитики, рост эффективности на 40%',
    },
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-12-31');
    
    let currentDate = new Date(startDate);
    let clientCount = 2;
    let avgContractValue = 250000;
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // Рост клиентской базы
      if (year === 2022) {
        clientCount = Math.min(2 + Math.floor(month / 2), 8);
      } else if (year === 2023) {
        clientCount = Math.min(8 + Math.floor(month / 2), 15);
      } else {
        clientCount = Math.min(15 + Math.floor(month / 1.5), 25);
      }
      
      // Доходы от клиентов
      for (let i = 0; i < clientCount; i++) {
        const paymentDay = 5 + Math.floor(Math.random() * 20);
        const contractValue = avgContractValue * (0.7 + Math.random() * 0.6);
        
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), paymentDay).toISOString().split('T')[0],
          description: `Оплата услуг от клиента #${i + 1}`,
          amount: Math.round(contractValue),
          type: 'income',
          category: 'Маркетинговые услуги',
        });
      }
      
      // Зарплата команды (растет со временем)
      const teamSize = Math.floor(4 + clientCount * 0.4);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата команде (${teamSize} чел)`,
        amount: -teamSize * 80000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Аренда офиса (с сентября 2023)
      if (year > 2023 || (year === 2023 && month >= 8)) {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
          description: 'Аренда офиса',
          amount: -180000,
          type: 'expense',
          category: 'Аренда',
        });
      } else {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
          description: 'Коворкинг',
          amount: -teamSize * 8000,
          type: 'expense',
          category: 'Аренда',
        });
      }
      
      // Реклама и маркетинг
      const marketingBudget = Math.round(clientCount * avgContractValue * 0.12);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString().split('T')[0],
        description: 'Реклама и лидогенерация',
        amount: -marketingBudget,
        type: 'expense',
        category: 'Маркетинг',
      });
      
      // Подписки на инструменты
      const toolsCount = Math.floor(5 + year - 2022);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
        description: 'Подписки на сервисы и инструменты',
        amount: -toolsCount * 12000,
        type: 'expense',
        category: 'Программное обеспечение',
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// E-COMMERCE - Интернет-магазин одежды
export const ecommerceData = {
  name: 'Интернет-магазин одежды "FashionHub"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-20',
      title: 'Запуск магазина',
      impact: 'positive',
      description: 'Запуск сайта с 500 товарами',
    },
    {
      date: '2022-03-15',
      title: 'Первая вирусная реклама',
      impact: 'positive',
      description: 'Видео в TikTok набрало 2 млн просмотров, рост продаж в 5 раз',
    },
    {
      date: '2022-06-01',
      title: 'Проблемы с качеством',
      impact: 'negative',
      description: 'Партия бракованного товара, возвраты и негатив',
    },
    {
      date: '2022-11-01',
      title: 'Подготовка к Черной пятнице',
      impact: 'positive',
      description: 'Увеличение склада, найм доп. персонала',
    },
    {
      date: '2022-11-25',
      title: 'Рекордная Черная пятница',
      impact: 'positive',
      description: '1200 заказов за день, выручка 4.5 млн руб',
    },
    {
      date: '2023-02-14',
      title: 'День Святого Валентина',
      impact: 'positive',
      description: 'Специальная коллекция, рост на 180%',
    },
    {
      date: '2023-05-01',
      title: 'Запуск мобильного приложения',
      impact: 'positive',
      description: 'Приложение для iOS и Android, +35% к конверсии',
    },
    {
      date: '2023-08-15',
      title: 'Летняя распродажа',
      impact: 'neutral',
      description: 'Очистка склада от летней коллекции',
    },
    {
      date: '2023-11-20',
      title: 'Черная пятница 2023',
      impact: 'positive',
      description: '2500 заказов, выручка 12 млн руб за выходные',
    },
    {
      date: '2024-01-10',
      title: 'Запуск собственного производства',
      impact: 'positive',
      description: 'Начало производства собственной линейки одежды',
    },
    {
      date: '2024-03-08',
      title: '8 марта - пик продаж',
      impact: 'positive',
      description: 'Рекордный день, 8.5 млн руб за сутки',
    },
    {
      date: '2024-06-01',
      title: 'Расширение ассортимента',
      impact: 'positive',
      description: 'Добавлены аксессуары и обувь, +3000 SKU',
    },
    {
      date: '2024-09-01',
      title: 'Проблемы с логистикой',
      impact: 'negative',
      description: 'Срыв сроков доставки, много негативных отзывов',
    },
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    const startDate = new Date('2022-01-20');
    const endDate = new Date('2024-12-31');
    
    let currentDate = new Date(startDate);
    let dailyOrders = 20;
    let avgOrderValue = 3500;
    
    while (currentDate <= endDate) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const day = currentDate.getDate();
      
      // Рост бизнеса
      const monthsSinceStart = (year - 2022) * 12 + month;
      dailyOrders = Math.floor(20 + monthsSinceStart * 3);
      avgOrderValue = 3500 + monthsSinceStart * 50;
      
      // Сезонность
      let seasonalMultiplier = 1.0;
      if (month === 10 || month === 11) seasonalMultiplier = 3.0; // Ноябрь-декабрь
      else if (month === 0 || month === 1) seasonalMultiplier = 1.5; // Январь-февраль
      else if (month === 2) seasonalMultiplier = 2.0; // Март (8 марта)
      else if (month >= 5 && month <= 7) seasonalMultiplier = 0.7; // Лето
      
      // Особые дни
      if (month === 10 && day >= 24 && day <= 27) seasonalMultiplier = 5.0; // Черная пятница
      if (month === 2 && day >= 6 && day <= 9) seasonalMultiplier = 3.5; // 8 марта
      if (month === 1 && day === 14) seasonalMultiplier = 2.5; // День Валентина
      
      const todayOrders = Math.floor(dailyOrders * seasonalMultiplier * (0.8 + Math.random() * 0.4));
      const todayRevenue = Math.round(todayOrders * avgOrderValue * (0.9 + Math.random() * 0.2));
      
      if (todayRevenue > 100000) { // Записываем только значимые дни
        transactions.push({
          date: currentDate.toISOString().split('T')[0],
          description: `Продажи (${todayOrders} заказов)`,
          amount: todayRevenue,
          type: 'income',
          category: 'Интернет-продажи',
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Добавляем ежемесячные расходы
    currentDate = new Date('2022-02-01');
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const monthsSinceStart = (year - 2022) * 12 + month;
      
      // Закупка товара (50% от выручки)
      const monthlyRevenue = dailyOrders * avgOrderValue * 30;
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3).toISOString().split('T')[0],
        description: 'Закупка товара у поставщиков',
        amount: -Math.round(monthlyRevenue * 0.5),
        type: 'expense',
        category: 'Закупка товара',
      });
      
      // Логистика и доставка (8% от выручки)
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
        description: 'Логистика и доставка',
        amount: -Math.round(monthlyRevenue * 0.08),
        type: 'expense',
        category: 'Логистика',
      });
      
      // Маркетинг (15% от выручки)
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: 'Таргетированная реклама',
        amount: -Math.round(monthlyRevenue * 0.15),
        type: 'expense',
        category: 'Маркетинг',
      });
      
      // Зарплата (растет со временем)
      const teamSize = Math.floor(5 + monthsSinceStart * 0.3);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата (${teamSize} чел)`,
        amount: -teamSize * 60000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Аренда склада
      const warehouseSize = Math.floor(100 + monthsSinceStart * 10);
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
        description: `Аренда склада ${warehouseSize} м²`,
        amount: -warehouseSize * 500,
        type: 'expense',
        category: 'Аренда',
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// СТРОИТЕЛЬСТВО - Строительная компания
export const constructionData = {
  name: 'Строительная компания "СтройМастер"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-02-10',
      title: 'Первый крупный проект',
      impact: 'positive',
      description: 'Контракт на строительство торгового центра (25 млн руб)',
    },
    {
      date: '2022-05-15',
      title: 'Срыв сроков',
      impact: 'negative',
      description: 'Задержка поставки материалов, штраф 1.5 млн руб',
    },
    {
      date: '2022-09-01',
      title: 'Завершение первого объекта',
      impact: 'positive',
      description: 'Сдача торгового центра, получение финальных 40%',
    },
    {
      date: '2023-01-20',
      title: 'Два новых контракта',
      impact: 'positive',
      description: 'Жилой комплекс (40 млн) + офисное здание (18 млн)',
    },
    {
      date: '2023-04-10',
      title: 'Покупка спецтехники',
      impact: 'neutral',
      description: 'Приобретение 3 единиц техники в лизинг',
    },
    {
      date: '2023-07-15',
      title: 'Расширение бригад',
      impact: 'neutral',
      description: 'Наняны 2 дополнительные бригады (25 человек)',
    },
    {
      date: '2023-10-01',
      title: 'Авария на объекте',
      impact: 'negative',
      description: 'Несчастный случай, остановка работ на 2 недели',
    },
    {
      date: '2024-01-15',
      title: 'Сдача жилого комплекса',
      impact: 'positive',
      description: 'Досрочная сдача объекта, бонус от заказчика',
    },
    {
      date: '2024-03-20',
      title: 'Государственный тендер',
      impact: 'positive',
      description: 'Победа в тендере на строительство школы (35 млн)',
    },
    {
      date: '2024-06-10',
      title: 'Проблемы с подрядчиком',
      impact: 'negative',
      description: 'Некачественные материалы, переделка работ',
    },
    {
      date: '2024-09-01',
      title: 'Запуск 3 объектов одновременно',
      impact: 'neutral',
      description: 'Пиковая загрузка, 120 человек на объектах',
    },
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    
    // Проект 1: Торговый центр (февраль-сентябрь 2022)
    transactions.push(
      {
        date: '2022-02-15',
        description: 'Аванс 30% - строительство ТЦ',
        amount: 7500000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2022-02-20',
        description: 'Закупка материалов для ТЦ',
        amount: -3200000,
        type: 'expense',
        category: 'Материалы',
      },
      {
        date: '2022-05-20',
        description: 'Промежуточный платеж 30% - ТЦ',
        amount: 7500000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2022-05-25',
        description: 'Штраф за срыв сроков',
        amount: -1500000,
        type: 'expense',
        category: 'Штрафы',
      },
      {
        date: '2022-09-10',
        description: 'Финальный платеж 40% - ТЦ',
        amount: 10000000,
        type: 'income',
        category: 'Строительные работы',
      }
    );
    
    // Проект 2: Жилой комплекс (январь 2023 - январь 2024)
    transactions.push(
      {
        date: '2023-01-25',
        description: 'Аванс 20% - жилой комплекс',
        amount: 8000000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2023-02-05',
        description: 'Закупка материалов для ЖК',
        amount: -4500000,
        type: 'expense',
        category: 'Материалы',
      },
      {
        date: '2023-05-15',
        description: 'Промежуточный платеж - ЖК',
        amount: 12000000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2023-09-20',
        description: 'Промежуточный платеж - ЖК',
        amount: 12000000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2024-01-18',
        description: 'Финальный платеж + бонус - ЖК',
        amount: 9500000,
        type: 'income',
        category: 'Строительные работы',
      }
    );
    
    // Проект 3: Офисное здание (февраль-август 2023)
    transactions.push(
      {
        date: '2023-02-10',
        description: 'Аванс 25% - офисное здание',
        amount: 4500000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2023-05-20',
        description: 'Промежуточный платеж - офис',
        amount: 6750000,
        type: 'income',
        category: 'Строительные работы',
      },
      {
        date: '2023-08-25',
        description: 'Финальный платеж - офис',
        amount: 6750000,
        type: 'income',
        category: 'Строительные работы',
      }
    );
    
    // Проект 4: Школа (март 2024 - декабрь 2024)
    transactions.push(
      {
        date: '2024-03-25',
        description: 'Аванс 30% - строительство школы',
        amount: 10500000,
        type: 'income',
        category: 'Государственный контракт',
      },
      {
        date: '2024-04-05',
        description: 'Закупка материалов для школы',
        amount: -5200000,
        type: 'expense',
        category: 'Материалы',
      },
      {
        date: '2024-07-15',
        description: 'Промежуточный платеж - школа',
        amount: 10500000,
        type: 'income',
        category: 'Государственный контракт',
      }
    );
    
    // Регулярные ежемесячные расходы
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-12-31');
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // Определяем активные проекты
      let activeProjects = 0;
      if (year === 2022 && month >= 1 && month <= 8) activeProjects = 1;
      if (year === 2023) activeProjects = month <= 7 ? 3 : 2;
      if (year === 2024) activeProjects = month <= 8 ? 3 : 2;
      
      // Зарплата (зависит от количества проектов)
      const workersCount = activeProjects * 25 + 10; // 25 человек на проект + 10 офис
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата (${workersCount} чел, ${activeProjects} проектов)`,
        amount: -workersCount * 65000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Аренда офиса и склада
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
        description: 'Аренда офиса и склада',
        amount: -250000,
        type: 'expense',
        category: 'Аренда',
      });
      
      // Лизинг техники (с апреля 2023)
      if (year > 2023 || (year === 2023 && month >= 3)) {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
          description: 'Лизинг спецтехники',
          amount: -320000,
          type: 'expense',
          category: 'Лизинг',
        });
      }
      
      // Коммунальные и расходники
      if (activeProjects > 0) {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString().split('T')[0],
          description: 'Расходные материалы и ГСМ',
          amount: -activeProjects * 180000,
          type: 'expense',
          category: 'Операционные расходы',
        });
      }
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// ПРОИЗВОДСТВО - Производство мебели
export const manufacturingData = {
  name: 'Мебельная фабрика "КомфортДом"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-15',
      title: 'Запуск производства',
      impact: 'positive',
      description: 'Открытие цеха площадью 500 м², 15 сотрудников',
    },
    {
      date: '2022-04-20',
      title: 'Контракт с сетью магазинов',
      impact: 'positive',
      description: 'Регулярные поставки мебели в 12 магазинов',
    },
    {
      date: '2022-07-10',
      title: 'Поломка оборудования',
      impact: 'negative',
      description: 'Выход из строя основного станка, простой 2 недели',
    },
    {
      date: '2022-10-15',
      title: 'Покупка нового оборудования',
      impact: 'positive',
      description: 'Приобретение ЧПУ станка, рост производительности в 2 раза',
    },
    {
      date: '2023-02-01',
      title: 'Запуск собственной линейки',
      impact: 'positive',
      description: 'Дизайнерская коллекция под собственным брендом',
    },
    {
      date: '2023-05-20',
      title: 'Расширение цеха',
      impact: 'neutral',
      description: 'Аренда дополнительных 300 м², найм 10 человек',
    },
    {
      date: '2023-09-01',
      title: 'Рост цен на материалы',
      impact: 'negative',
      description: 'Увеличение стоимости древесины на 35%',
    },
    {
      date: '2023-11-15',
      title: 'Выход на маркетплейсы',
      impact: 'positive',
      description: 'Начало продаж на Ozon и Wildberries',
    },
    {
      date: '2024-01-10',
      title: 'Крупный B2B контракт',
      impact: 'positive',
      description: 'Поставки мебели для сети отелей (20 млн руб/год)',
    },
    {
      date: '2024-04-15',
      title: 'Запуск второй смены',
      impact: 'neutral',
      description: 'Переход на двухсменный режим работы',
    },
    {
      date: '2024-08-01',
      title: 'Сертификация ISO',
      impact: 'positive',
      description: 'Получение сертификата качества ISO 9001',
    },
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-12-31');
    
    let currentDate = new Date(startDate);
    let monthlyProduction = 1200000; // Базовая выручка в месяц
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      // Рост производства
      const monthsSinceStart = (year - 2022) * 12 + month;
      let productionMultiplier = 1 + monthsSinceStart * 0.08;
      
      // Эффект от нового оборудования (с октября 2022)
      if (year > 2022 || (year === 2022 && month >= 9)) {
        productionMultiplier *= 1.8;
      }
      
      // Эффект от расширения (с мая 2023)
      if (year > 2023 || (year === 2023 && month >= 4)) {
        productionMultiplier *= 1.5;
      }
      
      // Эффект от двух смен (с апреля 2024)
      if (year === 2024 && month >= 3) {
        productionMultiplier *= 1.7;
      }
      
      const monthlyRevenue = Math.round(monthlyProduction * productionMultiplier);
      
      // Продажи мебели
      // Розница
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: 'Розничные продажи мебели',
        amount: Math.round(monthlyRevenue * 0.3),
        type: 'income',
        category: 'Розничные продажи',
      });
      
      // Опт (магазины)
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20).toISOString().split('T')[0],
        description: 'Оптовые поставки в магазины',
        amount: Math.round(monthlyRevenue * 0.5),
        type: 'income',
        category: 'Оптовые продажи',
      });
      
      // Маркетплейсы (с ноября 2023)
      if (year > 2023 || (year === 2023 && month >= 10)) {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25).toISOString().split('T')[0],
          description: 'Продажи на маркетплейсах',
          amount: Math.round(monthlyRevenue * 0.2),
          type: 'income',
          category: 'Маркетплейсы',
        });
      }
      
      // Закупка материалов (40% от выручки)
      let materialsCostMultiplier = 1.0;
      // Рост цен с сентября 2023
      if (year > 2023 || (year === 2023 && month >= 8)) {
        materialsCostMultiplier = 1.35;
      }
      
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
        description: 'Закупка древесины и фурнитуры',
        amount: -Math.round(monthlyRevenue * 0.4 * materialsCostMultiplier),
        type: 'expense',
        category: 'Материалы',
      });
      
      // Зарплата (растет с расширением)
      let workersCount = 15;
      if (year > 2023 || (year === 2023 && month >= 4)) workersCount = 25;
      if (year === 2024 && month >= 3) workersCount = 40; // Две смены
      
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата производственному персоналу (${workersCount} чел)`,
        amount: -workersCount * 55000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Аренда цеха
      let areaSize = 500;
      if (year > 2023 || (year === 2023 && month >= 4)) areaSize = 800;
      
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
        description: `Аренда производственного цеха ${areaSize} м²`,
        amount: -areaSize * 400,
        type: 'expense',
        category: 'Аренда',
      });
      
      // Коммунальные (электричество, отопление)
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString().split('T')[0],
        description: 'Коммунальные платежи и электроэнергия',
        amount: -Math.round(areaSize * 150 * (workersCount / 15)),
        type: 'expense',
        category: 'Коммунальные',
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    // Крупные разовые расходы
    transactions.push(
      {
        date: '2022-10-20',
        description: 'Покупка ЧПУ станка',
        amount: -2800000,
        type: 'expense',
        category: 'Оборудование',
      },
      {
        date: '2022-07-15',
        description: 'Ремонт оборудования после поломки',
        amount: -450000,
        type: 'expense',
        category: 'Ремонт',
      },
      {
        date: '2023-05-25',
        description: 'Ремонт и обустройство нового цеха',
        amount: -680000,
        type: 'expense',
        category: 'Ремонт',
      },
      {
        date: '2024-08-10',
        description: 'Получение сертификата ISO 9001',
        amount: -350000,
        type: 'expense',
        category: 'Сертификация',
      }
    );
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// ЛОГИСТИКА - Транспортная компания
export const logisticsData = {
  name: 'Транспортная компания "БыстраяДоставка"',
  period: '2022-01-01 to 2024-12-31',
  
  events: [
    {
      date: '2022-01-20',
      title: 'Основание компании',
      impact: 'positive',
      description: 'Старт с 5 автомобилями и 8 водителями',
    },
    {
      date: '2022-04-10',
      title: 'Первый крупный контракт',
      impact: 'positive',
      description: 'Регулярные перевозки для интернет-магазина',
    },
    {
      date: '2022-07-15',
      title: 'Рост цен на топливо',
      impact: 'negative',
      description: 'Бензин подорожал на 18%, снижение маржи',
    },
    {
      date: '2022-10-01',
      title: 'Расширение автопарка',
      impact: 'neutral',
      description: 'Покупка 3 дополнительных грузовиков в лизинг',
    },
    {
      date: '2023-01-15',
      title: 'Запуск мобильного приложения',
      impact: 'positive',
      description: 'Приложение для клиентов и водителей, +40% эффективности',
    },
    {
      date: '2023-03-20',
      title: 'ДТП с грузовиком',
      impact: 'negative',
      description: 'Авария, ремонт + компенсация за поврежденный груз',
    },
    {
      date: '2023-06-10',
      title: 'Контракт с маркетплейсом',
      impact: 'positive',
      description: 'Доставка для крупного маркетплейса',
    },
    {
      date: '2023-09-01',
      title: 'Открытие склада',
      impact: 'neutral',
      description: 'Собственный распределительный центр 1000 м²',
    },
    {
      date: '2023-11-20',
      title: 'Пиковая нагрузка',
      impact: 'positive',
      description: 'Черная пятница: 3500 доставок за неделю',
    },
    {
      date: '2024-02-15',
      title: 'Выход в регионы',
      impact: 'positive',
      description: 'Межгород: доставка в 15 городов области',
    },
    {
      date: '2024-05-20',
      title: 'Покупка электромобилей',
      impact: 'neutral',
      description: '10 электромобилей для городской доставки',
    },
    {
      date: '2024-09-01',
      title: 'Автоматизация склада',
      impact: 'positive',
      description: 'Внедрение WMS системы, рост скорости на 60%',
    },
  ],

  generateTransactions: () => {
    const transactions: IndustryTransaction[] = [];
    const startDate = new Date('2022-01-20');
    const endDate = new Date('2024-12-31');
    
    let currentDate = new Date(startDate);
    let vehiclesCount = 5;
    let driversCount = 8;
    let avgDeliveryPrice = 450;
    let dailyDeliveries = 30;
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      
      // Рост бизнеса
      const monthsSinceStart = (year - 2022) * 12 + month - 1;
      vehiclesCount = 5 + Math.floor(monthsSinceStart * 0.5);
      driversCount = Math.floor(vehiclesCount * 1.6);
      dailyDeliveries = Math.floor(30 + monthsSinceStart * 4);
      
      // Сезонность
      let seasonalMultiplier = 1.0;
      if (month === 10 || month === 11) seasonalMultiplier = 2.5; // Ноябрь-декабрь
      else if (month === 0) seasonalMultiplier = 1.5; // Январь
      else if (month >= 5 && month <= 7) seasonalMultiplier = 0.8; // Лето
      
      // Пики активности
      if (month === 10 && day >= 20 && day <= 27) seasonalMultiplier = 4.0; // Черная пятница
      
      const todayDeliveries = Math.floor(dailyDeliveries * seasonalMultiplier * (0.85 + Math.random() * 0.3));
      const todayRevenue = Math.round(todayDeliveries * avgDeliveryPrice * (0.9 + Math.random() * 0.2));
      
      if (todayRevenue > 20000) { // Записываем только значимые дни
        transactions.push({
          date: currentDate.toISOString().split('T')[0],
          description: `Доставки (${todayDeliveries} заказов)`,
          amount: todayRevenue,
          type: 'income',
          category: 'Услуги доставки',
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Ежемесячные расходы
    currentDate = new Date('2022-02-01');
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const monthsSinceStart = (year - 2022) * 12 + month - 1;
      
      vehiclesCount = 5 + Math.floor(monthsSinceStart * 0.5);
      driversCount = Math.floor(vehiclesCount * 1.6);
      
      // Топливо (крупная статья расходов)
      let fuelPriceMultiplier = 1.0;
      if (year > 2022 || (year === 2022 && month >= 6)) fuelPriceMultiplier = 1.18;
      if (year >= 2024) fuelPriceMultiplier = 1.25;
      
      const monthlyKm = vehiclesCount * 3000; // 3000 км на машину в месяц
      const fuelCost = Math.round(monthlyKm * 0.1 * 50 * fuelPriceMultiplier); // 10л/100км * 50руб/л
      
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
        description: `Топливо (${vehiclesCount} автомобилей)`,
        amount: -fuelCost,
        type: 'expense',
        category: 'Топливо',
      });
      
      // Зарплата водителям
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString().split('T')[0],
        description: `Зарплата водителям (${driversCount} чел)`,
        amount: -driversCount * 55000,
        type: 'expense',
        category: 'Зарплата',
      });
      
      // Обслуживание автомобилей
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString().split('T')[0],
        description: 'ТО и ремонт автомобилей',
        amount: -vehiclesCount * 25000,
        type: 'expense',
        category: 'Обслуживание',
      });
      
      // Лизинг (с октября 2022)
      if (year > 2022 || (year === 2022 && month >= 9)) {
        const leasedVehicles = Math.floor(vehiclesCount * 0.4);
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString().split('T')[0],
          description: `Лизинг автомобилей (${leasedVehicles} шт)`,
          amount: -leasedVehicles * 85000,
          type: 'expense',
          category: 'Лизинг',
        });
      }
      
      // Аренда склада (с сентября 2023)
      if (year > 2023 || (year === 2023 && month >= 8)) {
        transactions.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
          description: 'Аренда распределительного центра 1000 м²',
          amount: -450000,
          type: 'expense',
          category: 'Аренда',
        });
      }
      
      // Страхование
      transactions.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20).toISOString().split('T')[0],
        description: 'Страхование ОСАГО и КАСКО',
        amount: -vehiclesCount * 18000,
        type: 'expense',
        category: 'Страхование',
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    // Крупные разовые расходы
    transactions.push(
      {
        date: '2023-03-25',
        description: 'Ремонт после ДТП + компенсация',
        amount: -850000,
        type: 'expense',
        category: 'Ремонт',
      },
      {
        date: '2023-09-10',
        description: 'Обустройство распределительного центра',
        amount: -1200000,
        type: 'expense',
        category: 'Инфраструктура',
      },
      {
        date: '2024-05-25',
        description: 'Покупка 10 электромобилей',
        amount: -7500000,
        type: 'expense',
        category: 'Автопарк',
      },
      {
        date: '2024-09-05',
        description: 'Внедрение WMS системы',
        amount: -650000,
        type: 'expense',
        category: 'Программное обеспечение',
      }
    );
    
    return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
};

// Экспорт всех данных
export const industryDatasets = {
  retail: retailData,
  services: servicesData,
  ecommerce: ecommerceData,
  construction: constructionData,
  manufacturing: manufacturingData,
  logistics: logisticsData,
};

