import type { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../config/prisma';
import { DeleteTransactionParams } from '../../schemas/transactions.schema';

const deleteTransaction = async (
  req: FastifyRequest<{ Params: DeleteTransactionParams }>,
  res: FastifyReply
): Promise<void> => {
  const userID = req.userId;

  const { id } = req.params;

  if (!userID) {
    return res.status(401).send({ message: 'User not authenticated' });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: id,
        userId: userID,
      },
    });

    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    return res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch {
    return res.status(500).send({ message: 'Internal server error, fail to delete transaction' });
  }
};

export default deleteTransaction;
