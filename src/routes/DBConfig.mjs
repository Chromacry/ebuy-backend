import dotenv from 'dotenv';
dotenv.config({ path: `.env.local`, override: true });
const DBConfig = {
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_SCHEMA,
   port: process.env.DATABASE_PORT,
}

export default DBConfig;