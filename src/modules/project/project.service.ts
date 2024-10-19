import { Injectable, ConflictException, HttpException} from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto  } from './dto/create-project.dto';
import { Project } from './project.entity';
import { PostgresErrorCode } from '../../shared/database/postgres.error.code'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  
  async createProject(data: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectRepository.create(data);
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id "${data.created_by_id}" is not available in users`);
      }
      throw new HttpException(error.message, 500);
    }
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const model = await this.projectRepository.findById(id);
    if (!model) {
      throw new HttpException(`Project not found`, 404);
    }
    return model;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    try {
      const old = await this.projectRepository.findById(id);
      if (!old) {
        throw new HttpException(`Project not found`, 404);
      }
      return await this.projectRepository.update(id, data);
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id "${data.created_by_id}" is not available in users`);
      }
      throw new HttpException(error.message, error.status ?? error.code);
    }
  }

  async deleteProject(id: string): Promise<number> {
    const old = await this.projectRepository.findById(id);
    if (!old) {
      throw new HttpException(`Project not found`, 404);
    }
    return this.projectRepository.delete(id);
  }
}
