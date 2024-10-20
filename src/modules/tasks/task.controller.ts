
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: CreateTaskDto) {
    //created_by_id must be get from  inside decoded token. I get from frontend temporary
    const result = await this.taskService.createTask(data);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.taskService.getAllTasks();
    return result;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.taskService.getTaskById(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    const result = await this.taskService.updateTask(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

}
