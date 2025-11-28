import { FastifyInstance } from 'fastify';
import zodToJsonSchema from 'zod-to-json-schema';
import createTransaction from '../controllers/transactions/createTransaction.controller';
import deleteTransaction from '../controllers/transactions/DeleteTransaction.controller';
import { GetTransactions } from '../controllers/transactions/getTransaction.controller';
import { GetTransactionsSummary } from '../controllers/transactions/getTransactionSummary.controller';
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionsSchema,
  getTransactionSummarySchema,
} from '../schemas/transactions.schema';

// Rotas de transações
const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
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
    url: '/Summary',
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
};


export default transactionsRoutes;
