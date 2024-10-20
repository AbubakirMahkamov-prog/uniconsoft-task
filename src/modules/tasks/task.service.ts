import { Injectable, ConflictException, HttpException} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto  } from './dto/create-task.dto';
import { Task } from './task.entity';
import { PostgresErrorCode } from '../../shared/database/postgres.error.code'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  
  async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.create(data);
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
      return await this.taskRepository.update(id, data);
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

  async deleteTask(id: string): Promise<number> {
    const old = await this.taskRepository.findById(id);
    if (!old) {
      throw new HttpException(`Task not found`, 404);
    }
    return this.taskRepository.delete(id);
  }
}
