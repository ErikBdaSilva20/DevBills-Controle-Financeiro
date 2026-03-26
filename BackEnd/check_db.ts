import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categoriesCount = await prisma.category.count();
  console.log('Categories count:', categoriesCount);
  const categories = await prisma.category.findMany();
  console.log('Categories data:', JSON.stringify(categories, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
