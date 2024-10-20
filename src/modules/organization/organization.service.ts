import { Injectable, ConflictException, HttpException} from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organization.entity';
import { PostgresErrorCode } from '../../shared/database/postgres.error.code'
import { AddRemoveUserDto } from './dto/add-remove-user.dto'

@Injectable()
export class OrganizationService {
  constructor(private readonly organizationRepository: OrganizationRepository) {}
  
  async createOrganization(data: CreateOrganizationDto): Promise<Organization> {
    try {
      return await this.organizationRepository.create(data);
    } catch (error: any) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id "${data.created_by_id}" is not available in users`);
      }
      throw new HttpException(error.message, 500);
    }
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async getOrganizationById(id: string): Promise<Organization | undefined> {
    const model = await await this.organizationRepository.findById(id);
    if (!model) {
      throw new HttpException(`Organization not found`, 404);
    }
    return model;
  }

  async updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
    try {
      const old = await this.organizationRepository.findById(id);
      if (!old) {
        throw new HttpException(`Organization not found`, 404);
      }
      return await this.organizationRepository.update(id, data);
    } catch (error: any) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id "${data.created_by_id}" is not available in users`);
      }
      throw new HttpException(error.message, error.status ?? error.code);
    }
  }

  async deleteOrganization(id: string): Promise<number> {
    const old = await this.organizationRepository.findById(id);
    if (!old) {
      throw new HttpException(`Organization not found`, 404);
    }
    return await this.organizationRepository.delete(id);
  }


  //logics for user
  async addUser(data: AddRemoveUserDto) {
    try {
      return await this.organizationRepository.addUser(data);
    } catch (error: any) {
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The user_id or org_id is not available`);
      }
      if(error.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new ConflictException(`The user_id is already in this organization!`);
      }
      throw new HttpException(error.message, 500);
    }
  }
  async getOrgUsers(id: string) {
    return this.organizationRepository.getOrgUsers(id);
  }
  async delUserOrg(data: AddRemoveUserDto) {
    try {
      await this.organizationRepository.delUserOrg(data)
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
