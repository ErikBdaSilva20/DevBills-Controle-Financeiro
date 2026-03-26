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
    const errorDetails = result.error.flatten();
    console.error('❌ Validation error details:', errorDetails);
    
    return res.status(400).send({ 
      message: 'Dados inválidos na transação',
      errors: errorDetails.fieldErrors 
    });
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

    // Usa T12:00:00Z para evitar que o fuso brasileiro (UTC-3) cause regressão de dia
    const parsedDate = new Date(`${transaction.date}T12:00:00.000Z`);

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
