import { ArrowDown, ArrowUp, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Card from '../components/Card';
import CreateTransaction from '../components/CreateTransaction';
import MonthYearSelect from '../components/MonthYearSelect';
import { getTransactionMonthly, getTransactionSummary } from '../services/transactionsService';
import type { MonthlyItem, TransactionSummary } from '../types/transactions';
import { formatCurrency } from '../utils/formateValue';
import { formatYAxisValue } from '../utils/formatYAxisValue';

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
};

const DashBoard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

  async function reloadDashboardData() {
    const [summaryResponse, monthlyResponse] = await Promise.all([
      getTransactionSummary(month, year),
      getTransactionMonthly(month, year, 4),
    ]);

    setSummary(summaryResponse);
    setMonthlyItemsData(monthlyResponse);
  }

  useEffect(() => {
    reloadDashboardData();
  }, [month, year]);

  const chartData = summary.expensesByCategory.map((item) => ({
    ...item,
    name: item.categoryName,
    value: item.amount,
  }));

  const formatToolTipValue = (value: number | string): string =>
    formatCurrency(typeof value === 'number' ? value : parseFloat(value));

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
        {/* ================= HEADER ================= */}
        <div
          className="
          flex flex-col gap-4
          md:flex-row md:items-center md:justify-between
          mb-8
        "
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-500">Gráficos</h1>

          <div className="w-full md:w-auto">
            <MonthYearSelect
              month={month}
              year={year}
              onMonthChange={setMonth}
              onYearChange={setYear}
            />
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div
          className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 lg:gap-6
          mb-10
        "
        >
          <Card
            glowEffect={summary.balance > 0}
            hover
            title="Saldo"
            icon={<DollarSign className="text-green-600" size={20} />}
            className="bg-white/5"
          >
            <p
              className={`text-xl sm:text-2xl font-semibold mt-2 ${
                summary.balance > 0 ? 'text-green-500' : 'text-red-400'
              }`}
            >
              {formatCurrency(summary.balance)}
            </p>
          </Card>

          <Card hover title="Receitas" icon={<ArrowUp className="text-green-600" size={20} />}>
            <p className="text-xl sm:text-2xl font-semibold mt-2 text-green-500">
              {formatCurrency(summary.totalIncomes)}
            </p>
          </Card>

          <Card hover title="Despesas" icon={<ArrowDown className="text-red-700" size={20} />}>
            <p className="text-xl sm:text-2xl font-semibold mt-2 text-red-600">
              {formatCurrency(summary.totalExpenses)}
            </p>
          </Card>
        </div>

        {/* ================= CHARTS ================= */}
        <div
          className="
          grid grid-cols-1
          lg:grid-cols-2
          gap-6 lg:gap-8
        "
        >
          {/* ===== PIE CHART ===== */}
          <Card
            icon={<TrendingUp className="text-primary-500" size={20} />}
            title="Despesas por categoria"
            className="min-h-[280px] sm:min-h-[360px] lg:min-h-[440px]"
          >
            {summary.expensesByCategory.length > 0 ? (
              <div className="h-60 sm:h-72 lg:h-80 mt-4 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      nameKey="name"
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.categoryId} fill={entry.categoryColor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatToolTipValue} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="flex items-center justify-center h-60 text-gray-300">
                Nenhuma despesa para o período selecionado.
              </p>
            )}
          </Card>

          {/* ===== BAR CHART (TORRES) ===== */}
          <Card
            icon={<Calendar className="text-primary-500" size={20} />}
            title="Histórico Mensal"
            className="min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]"
          >
            {monthlyItemsData.length > 0 ? (
              <div
                className="
        mt-4
        h-[260px]
        sm:h-[320px]
        lg:h-[360px]
        w-full
        overflow-hidden
      "
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyItemsData}
                    margin={{ top: 16, right: 12, left: 0, bottom: 16 }}
                    barGap={8}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 42, 0.08)" />

                    {/* X */}
                    <XAxis
                      dataKey="name"
                      interval={0}
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      stroke="#48ff00"
                    />

                    {/* Y */}
                    <YAxis
                      tickFormatter={formatYAxisValue}
                      tick={{ fontSize: 11, fill: '#e5e7eb' }}
                      stroke="#9ca3af"
                      width={40}
                    />

                    <Tooltip
                      formatter={formatToolTipValue}
                      contentStyle={{
                        backgroundColor: '#1A1A1A',
                        borderColor: '#2A2A2A',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#f8f8f8' }}
                    />

                    {/* Legend apenas no desktop */}
                    <Legend className="hidden md:flex" verticalAlign="top" />

                    {/* Barras */}
                    <Bar
                      dataKey="expense"
                      name="Despesas"
                      fill="#ff0000"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />

                    <Bar
                      dataKey="income"
                      name="Receitas"
                      fill="#00f7ff"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="flex items-center justify-center h-[260px] text-gray-300">
                Nenhum histórico mensal para o período selecionado.
              </p>
            )}
          </Card>
        </div>

        {/* ================= CREATE TRANSACTION ================= */}
        <div className="mt-10">
          <CreateTransaction onSuccess={reloadDashboardData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
