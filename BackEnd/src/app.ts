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
  origin: (origin, cb) => {
    if (!origin || env.ALLOWED_ORIGIN === '*') {
      cb(null, true);
      return;
    }
    
    // Remove barras finais para comparação justa
    const normalizedOrigin = origin.replace(/\/$/, '');
    const allowed = env.ALLOWED_ORIGIN.split(',').map(o => o.trim().replace(/\/$/, ''));

    if (allowed.includes(normalizedOrigin)) {
      cb(null, true);
      return;
    }
    
    cb(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(routes, { prefix: '/api' });
app.register(transactionsRoutes, { prefix: '/transactions' });

export default app;