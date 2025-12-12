import type { TransactionType } from './transactions';

export interface Category {
  id?: string;
  name: string;
  color: string;
  type: TransactionType;
}

export interface categorySummary {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentage: number;
}
