import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // Change to your database type, e.g., 'pg' for PostgreSQL
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './src/shared/database/migrations',
      extension: 'ts',  // Use TypeScript for migrations
    },
    seeds: {
      directory: './src/shared/database/seeds',
      extension: 'ts',  // Use TypeScript for seeds
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './dist/shared/database/migrations',
      extension: 'js',  // In production, compiled JS files are used
    },
    seeds: {
      directory: './dist/shared/database/seeds',
      extension: 'js',
    },
  },
};

export default config;
