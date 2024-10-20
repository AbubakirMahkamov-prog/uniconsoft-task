import { Injectable, ConflictException, HttpException} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto  } from './dto/create-task.dto';
import { Task } from './task.entity';
import { PostgresErrorCode } from '../../shared/database/postgres.error.code'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository ) {}
  
  async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      const project = await this.taskRepository.getProjectById(data.project_id)
      if (!project) {
        throw new ConflictException(`The project doesn't exists.`);
      }
      const user = await this.taskRepository.checkUserToOrg(project.org_id, data.worker_user_id);
      if(!user) {
        throw new ConflictException(`The Worker user cannot work this project because user doesn't belongs to project's organization.`);
      }
      return await this.taskRepository.create(data);
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id or worker_user_id or project_id "${data.created_by_id}" is not available`);
      }
      throw new HttpException(error.message, error.status ?? error.code);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    const model = await this.taskRepository.findById(id);
    if (!model) {
      throw new HttpException(`Task not found`, 404);
    }
    return model;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const old = await this.taskRepository.findById(id);
      if (!old) {
        throw new HttpException(`Task not found`, 404);
      }
      const project = await this.taskRepository.getProjectById(data.project_id)
      if (!project) {
        throw new ConflictException(`The project doesn't exists.`);
      }
      const user = await this.taskRepository.checkUserToOrg(project.org_id, data.worker_user_id);
      if(!user) {
        throw new ConflictException(`The Worker user cannot work this project because user doesn't belongs to project's organization.`);
      }
      return await this.taskRepository.update(id, data);
    } catch (error) {
      if (error.code === PostgresErrorCode.UNIQUE_VIOLATION ) {
        throw new ConflictException(`The name "${data.name}" is already taken.`);
      }
      if (error.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) {
        throw new ConflictException(`The created_by_id or worker_user_id or project_id "${data.created_by_id}" is not available`);
      }
      throw new HttpException(error.message, error.status ?? error.code);
    }
  }

  async deleteTask(id: string): Promise<number> {
    const old = await this.taskRepository.findById(id);
    if (!old) {
      throw new HttpException(`Task not found`, 404);
    }
    return this.taskRepository.delete(id);
  }
  async markInProgress(id: string) {
    try {
      //should receive also worker_id from token and then check if task belongs to user;
      return await this.taskRepository.update(id, {
        status: 'IN_PROCESS',
    })
      
    } catch (error) {
      throw new HttpException(error.message, error.code)
    }
  }
  async markDone(id: string) {
    try {
      //should receive also worker_id from token and then check if task belongs to user;
      return await this.taskRepository.update(id, {
        status: 'DONE',
        done_at: Math.floor(new Date().getTime() / 1000),
    })
      
    } catch (error) {
      throw new HttpException(error.message, error.code)
    }
  }
  async getTasksByProject(user_id: string, project_id: string) {
    return await this.taskRepository.getTasksByProjectId(user_id, project_id);
  }

  async getTasksByStatus(user_id: string, status: 'CREATED'|'IN_PROCESS'|'DONE') {
    return await this.taskRepository.getTasksByStatus(user_id, status)
  }
}
