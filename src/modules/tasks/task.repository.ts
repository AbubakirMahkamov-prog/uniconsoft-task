import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';
import { BaseRepository } from '../../shared/database/base.repo';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private readonly knexService: KnexService) {
    super(knexService.getKnexInstance(), 'tasks');
  }
}
