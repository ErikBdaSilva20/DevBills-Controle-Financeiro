import app from "./app.js";
import { env } from "./config/env.js";
import initializeFirebaseAdmin from './config/firebase.js';
import { prismaConnect } from './config/prisma.js';
import { initializeGlobalCategories } from './services/globalCategories.service.js';

const PORT = env.PORT;

initializeFirebaseAdmin();
const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });
    console.log(`HTTP server running on port ${env.PORT}! 🚀`);
  } catch (err) {
    app.log.error(err);
  }
};

startServer();
