import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/tasks/task.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    SharedModule, 
    UserModule, 
    OrganizationModule, 
    ProjectModule, 
    TaskModule, 
    StatisticsModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
