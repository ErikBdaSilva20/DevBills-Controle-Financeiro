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
      port: Number(process.env.PORT) || 3001,
    });
  } catch (err) {
    app.log.error(err);
  }
};

startServer();
