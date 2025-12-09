import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { getTransactionSummaryQuerry } from '../../schemas/transactions.schema';
import type { categorySummary } from '../../types/category.types';
import type { TransactionSummary } from './../../types/transactions.type';
dayjs.extend(utc);
export const GetTransactionsSummary = async (
  req: FastifyRequest<{ Querystring: getTransactionSummaryQuerry }>,
  res: FastifyReply
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).send({ message: 'User not authenticated' });
  }

  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).send({ message: 'Month and year are required' });
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
  const endtDate = dayjs.utc(startDate).endOf('month').toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endtDate },
      },
      orderBy: { date: 'desc' },
      include: {
        category: true,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;

    const groupedExpenses = new Map<string, categorySummary>();

    for (const transaction of transactions) {
      const existing = groupedExpenses.get(transaction.categoryId) ?? {
        categoryId: transaction.categoryId,
        categoryName: transaction.category.name,
        categoryColor: transaction.category.color,
        amount: 0,
        percentage: 0,
      };
      existing.amount += transaction.amount;

      groupedExpenses.set(transaction.categoryId, existing);

      if (transaction.type === TransactionType.EXPENSE) {
        totalExpenses += transaction.amount;
      } else {
        totalIncomes += transaction.amount;
      }
    }

    const summary: TransactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: Number((totalIncomes - totalExpenses).toFixed(2)),
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          percentage: totalExpenses
            ? parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2))
            : 0,
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    res.send({ summary });
    console.log({ groupedExpenses, totalExpenses, totalIncomes });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
