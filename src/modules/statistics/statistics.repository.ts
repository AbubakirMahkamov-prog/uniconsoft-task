import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';

@Injectable()
export class StatisticsRepository{
  private knex;
  constructor(private readonly knexService: KnexService) {
    this.knex = this.knexService.getKnexInstance()
  }
  async getOrgAnalys(org_id: string) {
    return await this.knex(`organizations as org`)
      .select(`org.*`)
      .count('pr.id as project_count')
      .count('tk.id as task_count')
      .leftJoin(`projects as pr`, `org.id`, `pr.org_id`)
      .leftJoin(`tasks as tk`, `pr.id`, `tk.project_id`)
      .where(`org.id`, org_id)
      .groupBy(`org.id`)
  } 
  async getProjectAnalys(project_id: string) {
    return await this.knex(`projects as pr`)
      .select('pr.*', 'org.name as organization_name')
      .count('tk.id as task_count')
      .leftJoin(`tasks as tk`, `pr.id`, `tk.project_id`)
      .leftJoin(`organizations as org`, `pr.org_id`, `org.id`)
      .where('pr.id', project_id)
      .groupBy(`pr.id`, 'org.name')
  }
}
