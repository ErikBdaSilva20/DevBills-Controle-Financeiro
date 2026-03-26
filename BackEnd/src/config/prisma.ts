import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
  } catch (err) {}
}

export default prisma