import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import { getHistoricalTransactionsQuery } from '../../schemas/transactions.schema';
dayjs.locale('pt-br');
dayjs.extend(utc);

const getHistoricalTransactions = async (
  req: FastifyRequest<{ Querystring: getHistoricalTransactionsQuery }>,
  res: FastifyReply
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).send({ message: 'User not authenticated' });
  }

  const { month, year, months = 6 } = req.query;

  const baseDate = new Date(year, month - 1, 1);

  const startDate = dayjs
    .utc(baseDate)
    .subtract(months - 1, 'month')
    .startOf('month')
    .toDate();

  const endDate = dayjs.utc(baseDate).endOf('month').toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
    });

    type MonthlyDataItem = { name: string; income: number; expense: number };
    const monthlyData: MonthlyDataItem[] = Array.from(
      { length: months } as ArrayLike<unknown>,
      (_, i) => {
        const date = dayjs.utc(startDate).add(i, 'month');

        return {
          name: date.format('MMM/YYYY'),
          income: 0,
          expense: 0,
        };
      }
    );

    transactions.forEach((transaction) => {
      const monthKey = dayjs.utc(transaction.date).format('MMM/YYYY');
      const monthData = monthlyData.find((m) => m.name === monthKey);

      if (monthData) {
        if (transaction.type === 'INCOME') {
          monthData.income += transaction.amount;
        } else if (transaction.type === 'EXPENSE') {
          monthData.expense += transaction.amount;
        }
      }
    });

    return res.status(200).send({ history: monthlyData });
  } catch (error) {
    return res.status(500).send({ message: 'Error retrieving transactions' });
  }
};

export default getHistoricalTransactions;
