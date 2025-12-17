import cors from '@fastify/cors';
import fastify, { type FastifyInstance } from 'fastify';
import { env } from 'process';
import routes from './routes';
import transactionsRoutes from './routes/transactions.routes';

const app: FastifyInstance = fastify({
  logger: {
    level: env.NODE_ENV === 'development' ? 'info' : 'error',
  },
});

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(routes, { prefix: '/api' });
app.register(transactionsRoutes, { prefix: '/transactions' });

export default app;