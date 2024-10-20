import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';
import { BaseRepository } from '../../shared/database/base.repo';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  private projectTable = 'projects';
  private orgUser = 'organization_user';
  constructor(private readonly knexService: KnexService) {
    super(knexService.getKnexInstance(), 'tasks');
  }
  async getProjectById(id: string) {
    return await this.knex(this.projectTable)
      .select('*')
      .where('id', id)
      .returning("*")
      .first();
  }
  async checkUserToOrg(org_id: string, user_id: string) {
    return await this.knex(this.orgUser)
      .select('*')
      .where({
        org_id,
        user_id
      })
      .returning("*")
      .first()
  }
}
