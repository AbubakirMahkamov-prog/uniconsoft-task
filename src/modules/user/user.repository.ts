// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';
import { BaseRepository } from '../../shared/database/base.repo';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly knexService: KnexService) {
    super(knexService.getKnexInstance(), 'users');
  }
}
