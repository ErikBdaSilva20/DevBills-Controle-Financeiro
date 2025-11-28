import dotenv from "dotenv";
import z from "zod";
import { number } from "zod/v4/classic/coerce.cjs";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3001"),
  DATABASE_URL: z.string().min(5, "Database URL is required"),
  NODE_ENV: z.enum(["development", "test", "production"], {
    message: "O Node ENV deve ser development, test ou production",
  }),
});


const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());
  process.exit(1)

}

export const env = _env.data;