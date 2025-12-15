import { TransactionType } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

const isValidObjectId = (id: string) => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, 'Descrição obrigatória').max(100, 'Descrição muito longa'),

  amount: z.number().positive('Valor deve ser positivo'),

  date: z.coerce.date({
    errorMap: () => ({ message: 'Data inválida' }),
  }),

  categoryId: z.string().refine(isValidObjectId, { message: 'Categoria inválida' }),

  type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME], {
    errorMap: () => ({ message: 'Tipo inválido' }),
  }),
});

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([TransactionType.EXPENSE, TransactionType.INCOME], {
      errorMap: () => ({ message: 'Tipo inválido' }),
    })
    .optional(),
  categoryId: z.string().refine(isValidObjectId, { message: 'Categoria inválida' }).optional(),
});

export const getTransactionSummarySchema = z.object({
  month: z.string({ message: 'Mês obrigatório' }),
  year: z.string({ message: 'Ano obrigatório' }),
});

export const deleteTransactionSchema = z.object({
  id: z.string().refine(isValidObjectId, { message: 'ID de transação inválido' }),
});

export const getHistoricalTransactionsSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000).max(2100),
  months: z.coerce.number().min(1).max(12).optional,
});

export type getHistoricalTransactionsQuery = z.infer<typeof getHistoricalTransactionsSchema>;

export type CreateTransactionBody = z.infer<typeof createTransactionSchema>;

export type GetTransactionQuerry = z.infer<typeof getTransactionsSchema>;

export type getTransactionSummaryQuerry = z.infer<typeof getTransactionSummarySchema>;

export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>;
