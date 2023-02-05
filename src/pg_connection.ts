import { Pool } from 'pg';
import 'dotenv/config';

const url = process.env.PG_URL as string;

export const dbConnect = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE
});
