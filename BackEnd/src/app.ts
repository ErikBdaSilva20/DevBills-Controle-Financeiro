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

app.register(cors);

app.register(routes, { prefix: '/api' });
app.register(transactionsRoutes, { prefix: '/transactions' });

export default app;
