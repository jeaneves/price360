import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "sua_senha",
  database: process.env.DB_NAME || "postgres",
});
 
//banco criado via docker
//Docker PostgresSql
//docker run --name docker-postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
