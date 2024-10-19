import { Injectable } from '@nestjs/common';
import { KnexService } from '../../shared/database/knex.service';
import { BaseRepository } from '../../shared/database/base.repo';
import { Organization } from './organization.entity';
import { AddRemoveUserDto } from './dto/add-remove-user.dto'
@Injectable()
export class OrganizationRepository extends BaseRepository<Organization> {
  private orguserTable = 'organization_user';
  constructor(private readonly knexService: KnexService) {
    super(knexService.getKnexInstance(), 'organizations');
  }
  async getCheckExists(data: AddRemoveUserDto) {
    const knex = this.knexService.getKnexInstance();
    return await knex(this.orguserTable).select('*').where({
      org_id: data.org_id,
      user_id: data.user_id,
    }).first();
  }
  async addUser(data: AddRemoveUserDto) {
    const knex = this.knexService.getKnexInstance();
    return await knex(this.orguserTable).insert(data).returning('*');
  }
  async delUserOrg(data: AddRemoveUserDto) {
    const knex = this.knexService.getKnexInstance();
    return await knex(this.orguserTable).where(data).del();  
  }
  async getOrgUsers(id: string) {
    const knex = this.knexService.getKnexInstance();
    const data = await knex(this.orguserTable).select('u.*')
    .leftJoin('users as u', `${this.orguserTable}.user_id`, 'u.id')
    .where({
      org_id: id,
    });
    return data;
  }
}
