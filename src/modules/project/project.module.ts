import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
