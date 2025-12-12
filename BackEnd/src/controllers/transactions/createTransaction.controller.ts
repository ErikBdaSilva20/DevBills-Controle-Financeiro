import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import {
  CreateTransactionBody,
  createTransactionSchema,
} from './../../schemas/transactions.schema';

const createTransaction = async (
  req: FastifyRequest<{ Body: CreateTransactionBody }>,
  res: FastifyReply
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).send({ message: 'User not authenticated' });
  }

  const result = createTransactionSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = result.error.issues?.[0]?.message || 'Validation invalid';

    return res.status(400).send({ error: errorMessage });
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });
    if (!category) {
      return res.status(404).send({ message: 'Category invalid' });
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        description: transaction.description,
        amount: transaction.amount,
        date: parsedDate,
        type: transaction.type,
        userId: userId,
        categoryId: transaction.categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).send(newTransaction);
  } catch (err) {
    req.log.error(err);
    return res.status(500).send({ message: 'Internal server error: unable to create transaction' });
  }
};

export default createTransaction;
