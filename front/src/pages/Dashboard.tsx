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
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../components/Card';
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

  //MonthlyItem

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

  const renderPieChartLabel = (props: any): string => {
    return `${props.name}: ${(props.percent * 100).toFixed(1)}%`;
  };

  const formatToolTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === 'number' ? value : parseFloat(value));
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container-app py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <MonthYearSelect
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
          />
        </div>
      </div>

      {/* Card 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container-app ">
        <Card
          glowEffect={summary.balance > 0}
          hover
          title="Saldo"
          icon={<DollarSign className="text-green-600" size={20} />}
          className="bg-white/5"
        >
          <p
            className={`text-2xl font-semibold mt-2 
          ${summary.balance > 0 ? 'text-green-500' : 'text-red-400'}
          ${summary.balance < 0 ? 'text-red-600' : ''}
          `}
          >
            {formatCurrency(summary.balance)}
          </p>
        </Card>

        {/* Card 2 */}
        <Card hover title="Receitas" icon={<ArrowUp className="text-green-600" size={20} />}>
          <p
            className={`text-2xl font-semibold mt-2 
          ${summary.balance > 0 ? 'text-green-500' : 'text-red-400'}
          ${summary.balance < 0 ? 'text-red-600' : ''}
          `}
          >
            {formatCurrency(summary.totalIncomes)}
          </p>
        </Card>

        {/* Card 3 */}
        <Card hover title="Despesas" icon={<ArrowDown className="text-red-700" size={20} />}>
          <p className={`text-2xl font-semibold mt-2 text-red-700 `}>
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6 mt-3">
        <Card
          icon={<TrendingUp className="text-primary-500" size={20} />}
          title="Despesas por categoria"
          className="min-h-80"
        >
          <div className="h-72 mt-4 ">
            {summary.expensesByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label={renderPieChartLabel}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.categoryId} fill={entry.categoryColor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatToolTipValue} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex items-center justify-center h-64 text-gray-100">
                Nenhuma despesa para o período selecionado.
              </p>
            )}
          </div>
        </Card>

        <Card icon={<Calendar className="text-primary-500" size={20} />} title="Histórico Mensal">
          <div className="h-72 mt-4 p-2.5">
            {monthlyItemsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyItemsData} margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255, 0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ style: { textTransform: 'capitalize' } }}
                  />
                  <YAxis stroke="#94a3b8" tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={formatToolTipValue}
                    contentStyle={{
                      backgroundColor: '#1A1A1A',
                      borderColor: '#2A2A2A',
                    }}
                    labelStyle={{ color: '#f8f8f8' }}
                  />
                  <Legend />
                  <Bar
                    dataKey="expenses"
                    name="Despesas"
                    fill="#09ff00"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="incomes"
                    name="Receitas"
                    fill="#ff0000"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex items-center justify-center h-64 text-gray-100">
                Nenhum histórico mensal para o período selecionado.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;

/* 




 
          
          
          
          
          */
