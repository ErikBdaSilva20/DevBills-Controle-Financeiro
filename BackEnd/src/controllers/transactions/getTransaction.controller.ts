import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import type { GetTransactionQuerry } from '../../schemas/transactions.schema';
import type { TransactionFilter } from '../../types/transactions.type';

dayjs.extend(utc);

export const GetTransactions = async (
  req: FastifyRequest<{ Querystring: GetTransactionQuerry }>,
  res: FastifyReply
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).send({ message: 'User not authenticated' });
  }

  const { month, year, type, categoryId } = req.query;

  const filter: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf('month').toDate();
    const endtDate = dayjs.utc(startDate).endOf('month').toDate();

    filter.date = { gte: startDate, lte: endtDate };
  }

  if (type) {
    filter.type = type;
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filter,
      orderBy: { date: 'desc' },
      include: {
        category: {
          select: {
            name: true,
            color: true,
            type: true,
          },
        },
      },
    });
    res.send({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
