import type { FastifyReply, FastifyRequest } from 'fastify';
import admin from 'firebase-admin';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Auth thoken not founded' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
console.log('UID do token recebido:', decodedToken.uid); // <- adicione isso
req.userId = decodedToken.uid;

  } catch (error) {
    return res.status(401).send({ message: 'Auth thoken not valid' });
  }
};
