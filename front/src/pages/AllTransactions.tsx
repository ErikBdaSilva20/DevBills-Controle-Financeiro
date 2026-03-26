import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
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
    const confirmDelete = window.confirm('Deseja excluir esta transação?');
    if (!confirmDelete) return;

    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">Transações</h1>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="
                bg-gray-800 border border-gray-700 rounded-md
                px-4 py-2 text-sm
                focus:outline-none focus:ring-1 focus:ring-cyan-400
                transition
              "
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1} className="bg-gray-900">
                  {dayjs().month(i).format('MMMM')}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="
                bg-gray-800 border border-gray-700 rounded-md
                px-4 py-2 text-sm
                focus:outline-none focus:ring-1 focus:ring-cyan-400
                transition
              "
            >
              {Array.from({ length: 4 }).map((_, i) => {
                const y = new Date().getFullYear() - i;
                return (
                  <option key={y} value={y} className="bg-gray-900">
                    {y}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Lista de transações */}
        <div className="space-y-3">
          {filteredTransactions.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              Nenhuma transação encontrada neste período.
            </p>
          )}

          {filteredTransactions.map((t) => (
            <div
              key={t.id}
              className="
                flex flex-col gap-3
                sm:flex-row sm:justify-between sm:items-center
                bg-gray-800/50 p-4 rounded-lg
                hover:bg-gray-800/80
                transition-all duration-300
              "
            >
              {/* Informações */}
              <div className="flex flex-col gap-1">
                <span className="font-medium text-base sm:text-lg text-green-500">
                  {t.description}
                </span>

                <div className="text-sm">
                  <span className="text-gray-400 mr-2">{dayjs(t.date).format('DD/MM/YYYY')}</span>
                  <span style={{ color: t.category.color }}>• {t.category.name}</span>
                </div>
              </div>

              {/* Valor e ações */}
              <div
                className="
                flex justify-between items-center
                sm:justify-end sm:gap-6
              "
              >
                <span
                  className={`font-semibold text-base sm:text-lg ${
                    t.type === 'INCOME' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                </span>

                <button
                  onClick={() => handleDeleteTransaction(t.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Excluir transação"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
