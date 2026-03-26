import './src/config/env.js';
import prisma from './src/config/prisma.js';

async function main() {
  const categories = await prisma.category.findMany();
  console.log('Categories found:', categories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
