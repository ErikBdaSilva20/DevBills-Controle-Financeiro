import { FastifyInstance } from 'fastify';
import zodToJsonSchema from 'zod-to-json-schema';
import createTransaction from '../controllers/transactions/createTransaction.controller';
import deleteTransaction from '../controllers/transactions/DeleteTransaction.controller';
import getHistoricalTransactions from '../controllers/transactions/getHistoricalTransactions.controller';
import { GetTransactions } from '../controllers/transactions/getTransaction.controller';
import { GetTransactionsSummary } from '../controllers/transactions/getTransactionSummary.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getTransactionsSchema,
  getTransactionSummarySchema,
} from '../schemas/transactions.schema';

// Rotas de transações
const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.addHook('preHandler', authMiddleware);

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // Buscar com filtros
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: GetTransactions,
  });

  // Resumo das transações

  fastify.route({
    method: 'GET',
    url: '/summary',
    schema: {
      querystring: zodToJsonSchema(getTransactionSummarySchema),
    },
    handler: GetTransactionsSummary,
  });

  // Deletar uma transação
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });

  // Hsitorico das transações

  fastify.route({
    method: 'GET',
    url: '/historical',
    schema: {
      querystring: zodToJsonSchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
  });
};


export default transactionsRoutes;
