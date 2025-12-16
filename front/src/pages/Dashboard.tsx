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

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncomes: 0,
  expensesByCategory: [],
};

const DashBoard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransactionsSummary() {
      const response = await getTransactionSummary(month, year);
      setSummary(response);
    }
    loadTransactionsSummary();
  }, [month, year]);

  useEffect(() => {
    async function loadTransactionsMonthly() {
      const response = await getTransactionMonthly(month, year, 4);
      setMonthlyItemsData(response);
    }
    loadTransactionsMonthly();
  }, [month, year]);

  const chartData = summary.expensesByCategory.map((item) => ({
    ...item,
    name: item.categoryName,
    value: item.amount,
  }));

  const formatToolTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === 'number' ? value : parseFloat(value));
  };

  return (
    <div className="bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-12 py-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
          <p
            className={`text-xl sm:text-2xl font-semibold mt-2 ${
              summary.balance > 0 ? 'text-green-500' : 'text-red-400'
            } ${summary.balance < 0 ? 'text-red-600' : ''}`}
          >
            {formatCurrency(summary.totalIncomes)}
          </p>
        </Card>

        <Card hover title="Despesas" icon={<ArrowDown className="text-red-700" size={20} />}>
          <p className="text-xl sm:text-2xl font-semibold mt-2 text-red-700">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PieChart */}
        <Card
          icon={<TrendingUp className="text-primary-500" size={20} />}
          title="Despesas por categoria"
          className="min-h-80 sm:min-h-96 lg:min-h-112"
        >
          {summary.expensesByCategory.length > 0 ? (
            <div className="h-64 sm:h-72 lg:h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(1)}%`}
                    labelLine={true}
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
            <p className="flex items-center justify-center h-64 text-gray-100">
              Nenhuma despesa para o período selecionado.
            </p>
          )}
        </Card>

        {/* BarChart */}
        <Card
          icon={<Calendar className="text-primary-500" size={20} />}
          title="Histórico Mensal"
          className="min-h-80 sm:min-h-96 lg:min-h-112"
        >
          {monthlyItemsData.length > 0 ? (
            <div className="h-64 sm:h-72 lg:h-80 mt-4 p-2.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyItemsData} margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 42, 0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#48ff00"
                    tick={{ style: { textTransform: 'capitalize', fontSize: '0.75rem' } }}
                  />
                  <YAxis stroke="#00ff80" tickFormatter={formatToolTipValue} />
                  <Tooltip
                    formatter={formatToolTipValue}
                    contentStyle={{
                      backgroundColor: '#1A1A1A',
                      borderColor: '#2A2A2A',
                    }}
                    labelStyle={{ color: '#f8f8f8' }}
                  />
                  <Legend />
                  <Bar dataKey="expense" name="Despesas" fill="#00f7ff" />
                  <Bar dataKey="income" name="Receitas" fill="#ff0000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="flex items-center justify-center h-64 text-gray-100">
              Nenhum histórico mensal para o período selecionado.
            </p>
          )}
        </Card>
      </div>

      <CreateTransaction />
    </div>
  );
};

export default DashBoard;
