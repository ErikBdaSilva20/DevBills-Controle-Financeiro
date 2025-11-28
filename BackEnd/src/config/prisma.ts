import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try{
    await prisma.$connect()
  console.log("DB connected")
  } catch (err) {
    console.log(err)
  }
}

export default prisma