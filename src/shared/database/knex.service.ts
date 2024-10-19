import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class KnexService {
  private readonly knex: Knex;

    constructor() {
    this.knex = knex({
        client: "postgresql",
        debug: false,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        }
    });
    this.checkConnection()
  }
  async checkConnection(): Promise<boolean> {
    try {
      await this.knex.raw('SELECT 1');
      console.log('Connection established successfully');
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }

  getKnexInstance(): Knex {
    return this.knex;
  }
}
