import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export class BaseRepository<T> {
  constructor(protected readonly knex: Knex, protected readonly tableName: string) {}

  async findAll(): Promise<T[]> {
    return await this.knex<T>(this.tableName).select('*') as T[];
  }

  async findById(id: string): Promise<T | undefined> {
    const data = await this.knex<T>(this.tableName).where('id', id).first() as Promise<T | undefined>;
    return data;
  }

  async create(data: Partial<T> & { id?: string }): Promise<T | undefined> {
    if (!data.id) {
      const id = uuidv4() as string;
      data.id = id.substring(0, 30);
    }
    const result = await this.knex(this.tableName).insert(data).returning('*');
    return result[0] as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const result = await this.knex<T>(this.tableName).where('id', id).update(data as any).returning('*');
    return result[0] as T;
  }

  async delete(id: string): Promise<number> {
    return await this.knex<T>(this.tableName).where('id', id).del();
  }
}
