// Скрипт для генерации реалистичных данных для каждой отрасли

import { industryDatasets } from '../lib/industry-data-generator';

// Генерируем данные для всех отраслей
console.log('🚀 Генерация реалистичных данных для отраслей...\n');

Object.entries(industryDatasets).forEach(([industryId, industryData]) => {
  console.log(`📊 ${industryData.name}`);
  console.log(`   Период: ${industryData.period}`);
  
  const transactions = industryData.generateTransactions();
  console.log(`   ✅ Сгенерировано транзакций: ${transactions.length}`);
  
  // Вычисляем статистику
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const netProfit = totalIncome - totalExpense;
  
  console.log(`   💰 Общая выручка: ${(totalIncome / 1000000).toFixed(2)} млн руб`);
  console.log(`   💸 Общие расходы: ${(totalExpense / 1000000).toFixed(2)} млн руб`);
  console.log(`   📈 Чистая прибыль: ${(netProfit / 1000000).toFixed(2)} млн руб`);
  console.log(`   📅 Ключевых событий: ${industryData.events.length}`);
  console.log('');
});

console.log('✅ Генерация завершена!\n');

// Пример использования для одной отрасли
console.log('📋 Пример данных (Розничная торговля):');
const retailTransactions = industryDatasets.retail.generateTransactions();
console.log('\nПервые 5 транзакций:');
retailTransactions.slice(0, 5).forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} - ${t.description}: ${t.amount.toLocaleString()} ₽`);
});

console.log('\nПоследние 5 транзакций:');
retailTransactions.slice(-5).forEach((t, i) => {
  console.log(`${i + 1}. ${t.date} - ${t.description}: ${t.amount.toLocaleString()} ₽`);
});

console.log('\n🎉 События розничной торговли:');
industryDatasets.retail.events.slice(0, 5).forEach((e, i) => {
  const emoji = e.impact === 'positive' ? '✅' : e.impact === 'negative' ? '⚠️' : 'ℹ️';
  console.log(`${i + 1}. ${emoji} ${e.date} - ${e.title}`);
  console.log(`   ${e.description}`);
});

