import type {
  MonthlyItem,
  Transaction,
  transactionsFilter,
  TransactionSummary,
} from '../types/transactions';

import { api } from './api';

export const getTransactions = async (
  month: number,
  year: number,
  filter?: Partial<transactionsFilter>
): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/transactions', {
    params: {
      month,
      year,
      ...filter,
    },
  });
  return response.data;
};

export const getTransactionSummary = async (
  month: number,
  year: number,
  filter?: Partial<transactionsFilter>
): Promise<TransactionSummary> => {
  console.log('Front enviando:', { month, year, ...filter });

  const response = await api.get('/transactions/summary', {
    params: {
      month,
      year,
      ...filter, // se não existir, não quebra
    },
  });

  console.log('Front recebeu:', response.data);

  return response.data.summary;
};

export const getTransactionMonthly = async (
  month: number,
  year: number,
  months?: number
): Promise<MonthlyItem[]> => {
  const response = await api.get<{ history: MonthlyItem[] }>('/transactions/historical', {
    params: {
      month,
      year,
      months,
    },
  });
  return response.data.history;
};
