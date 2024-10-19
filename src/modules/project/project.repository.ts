import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';
import { BaseRepository } from '../../shared/database/base.repo';
import { Project } from './project.entity';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(private readonly knexService: KnexService) {
    super(knexService.getKnexInstance(), 'projects');
  }
}
