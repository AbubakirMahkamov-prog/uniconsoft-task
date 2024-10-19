
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: CreateProjectDto) {
    //created_by_id must be get from  inside decoded token. I get from frontend temporary
    const result = await this.projectService.createProject(data);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.projectService.getAllProjects();
    return result;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.projectService.getProjectById(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProjectDto) {
    const result = await this.projectService.updateProject(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.projectService.deleteProject(id);
    return { message: 'Project deleted successfully' };
  }

}
