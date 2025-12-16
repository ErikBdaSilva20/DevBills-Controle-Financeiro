import { api } from './api';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories');
  return response.data;
};
