import type { Category, categorySummary } from './category';

export const TransactionType = {
  EXPENSE: 'expense',
  INCOME: 'income',
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string | Date;
  categoryId: string;
  category: Category;
  type: TransactionType;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface transactionsFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: categorySummary[];
}

export interface MonthlyItem {
  name: string;
  expense: number;
  income: number;
}