import cors from '@fastify/cors';
import fastify, { type FastifyInstance } from 'fastify';
import { env } from './config/env.js';
import routes from './routes/index.js';
import transactionsRoutes from './routes/transactions.routes.js';

const app: FastifyInstance = fastify({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'info' : 'error',
  },
});

app.register(cors, {
  origin: env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(routes, { prefix: '/api' });
app.register(transactionsRoutes, { prefix: '/transactions' });

export default app;