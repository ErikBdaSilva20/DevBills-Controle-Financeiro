import app from "./app.ts";
import { env } from "./config/env.js";
import { prismaConnect } from "./config/prisma.js";
import { initializeGlobalCategories } from "./services/globalCategories.service.js";

const PORT = env.PORT;
const startServer = async () => {
  try {
    await prismaConnect() 

    await initializeGlobalCategories()
    
    await app
      .listen({
        port: Number(process.env.PORT) || 3001,
      })
      .then(() => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
  } catch (err) {
    app.log.error(err);
  }
};

startServer();
