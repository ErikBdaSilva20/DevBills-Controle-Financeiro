import dotenv from "dotenv";
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3001'),
  DATABASE_URL: z.string().min(5, 'Database URL is required'),
  NODE_ENV: z.enum(['development', 'test', 'production'], {
    message: 'O Node ENV deve ser development, test ou production',
  }),

  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
});


const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());
  process.exit(1)

}

export const env = _env.data;