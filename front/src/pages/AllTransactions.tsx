import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { deleteTransaction, getTransactions } from '../services/transactionsService';
import type { Transaction } from '../types/transactions';
import { formatCurrency } from '../utils/formateValue';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    async function loadTransactions() {
      const data = await getTransactions(month, year);
      setTransactions(data);
    }

    loadTransactions();
  }, [month, year]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const date = dayjs(t.date);
        return date.month() + 1 === month && date.year() === year;
      })
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
  }, [transactions, month, year]);
  async function handleDeleteTransaction(id: string) {
    console.log('DELETE CLICKADO:', id);

    const confirmDelete = window.confirm('Tem certeza que deseja excluir essa transação?');
    if (!confirmDelete) return;

    await deleteTransaction(id);

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold mb-6">Transações</h1>

      {/* Filtro */}
      <div className="flex gap-4 mb-6">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {dayjs().month(i).format('MMMM')}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 4 }).map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filteredTransactions.map((t) => (
          <div key={t.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
            <div>
              <p className="font-medium" style={{ color: t.category.color }}>
                {t.description}
              </p>
              <span className="text-sm flex items-center gap-2">
                <span className="text-gray-500 font-bold">
                  {dayjs(t.date).format('DD/MM/YYYY')}
                </span>

                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: t.category.color }}
                >
                  <span style={{ color: t.category.color }}>•</span>
                  {t.category.name}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  t.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {t.type === 'INCOME' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
              <button
                onClick={() => handleDeleteTransaction(t.id)}
                className="text-red-400 hover:text-red-600 text-sm hover:cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
