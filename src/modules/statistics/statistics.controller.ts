
import { Controller, Post, Body, Get, Param, Patch, Delete, UsePipes , ValidationPipe } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags("/statistics")
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  
  @Get('/by-org/:org_id')
  async getOrgAnalys(@Param('org_id') org_id: string) {
    return await this.statisticsService.getOrgAnalys(org_id);
  }
  @Get('/by-project/:project_id')
  async getProjectAnalys(@Param('project_id') project_id: string) {
    return await this.statisticsService.getProjectAnalys(project_id);
  }

  @Get('/overall')
  async getOverallAnalays() {
    return await this.statisticsService.getOverallAnalays();
  }
}
