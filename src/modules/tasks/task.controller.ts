
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags("Tasks")
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBody({
		type: CreateTaskDto,
		description: "CreateTask",
	})
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

  @ApiBody({
		type: UpdateTaskDto,
		description: "UpdateTask",
	})
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

  @Patch('/mark-done/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async markDone(@Param('id') id: string) {
    const result = await this.taskService.markDone(id);
    return result;
  }

  @Patch('/mark-inprogress/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async markInProgress(@Param('id') id: string) {
    const result = await this.taskService.markInProgress(id);
    return result;
  }

  @Get('/worker-projects/:worker_id/:project_id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getByWorkerProjectId(
    @Param('worker_id') worker_id: string, 
    @Param('project_id') project_id: string)
  {
    //worker_id should get from decoded user
    const result = await this.taskService.getTasksByProject(worker_id, project_id);
    return result;
  }
  
  @Get('/worker-projects-by-status/:worker_id/:status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getByWorkerStatus(
    @Param('worker_id') worker_id: string, 
    @Param('status') status: 'CREATED'|'IN_PROCESS'|'DONE')
  {
    //worker_id should get from decoded user
    const result = await this.taskService.getTasksByStatus(worker_id, status);
    return result;
  }
}
