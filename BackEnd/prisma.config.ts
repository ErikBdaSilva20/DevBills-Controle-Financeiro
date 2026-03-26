import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  // @ts-ignore - Prisma 6 config types can be strict with experimental features
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
