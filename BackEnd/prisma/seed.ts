import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    // EXPENSE
    { name: 'Alimentação',      color: '#E74C3C', type: 'EXPENSE' as const },
    { name: 'Transporte',       color: '#E67E22', type: 'EXPENSE' as const },
    { name: 'Moradia',          color: '#8E44AD', type: 'EXPENSE' as const },
    { name: 'Saúde',            color: '#1ABC9C', type: 'EXPENSE' as const },
    { name: 'Educação',         color: '#3498DB', type: 'EXPENSE' as const },
    { name: 'Lazer',            color: '#F39C12', type: 'EXPENSE' as const },
    { name: 'Roupas',           color: '#E91E63', type: 'EXPENSE' as const },
    { name: 'Serviços',         color: '#95A5A6', type: 'EXPENSE' as const },
    { name: 'Outros (Despesa)', color: '#7F8C8D', type: 'EXPENSE' as const },

    // INCOME
    { name: 'Salário',          color: '#2ECC71', type: 'INCOME' as const },
    { name: 'Freelance',        color: '#27AE60', type: 'INCOME' as const },
    { name: 'Investimentos',    color: '#F1C40F', type: 'INCOME' as const },
    { name: 'Presente',         color: '#16A085', type: 'INCOME' as const },
    { name: 'Outros (Receita)', color: '#2980B9', type: 'INCOME' as const },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name_type: { name: cat.name, type: cat.type } },
      update: {},
      create: cat,
    });
  }

  console.log(`✅ Seed concluído: ${categories.length} categorias inseridas/atualizadas.`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
